import React, { useEffect, useState, useCallback } from "react";
import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  ActivityIndicator,
  Image,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useNavigation, useFocusEffect } from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { MaterialIcons } from "@expo/vector-icons";

import { style } from "./styles";
import Menu from "../../components/menu/menu";
import { themes } from "../../global/themes";
import { RootStackParamList } from "../AppNavigation";

type NavigationProps = NativeStackNavigationProp<RootStackParamList>;

interface GitHubProfile {
  name: string;
  public_repos: number;
  followers: number;
  login: string;
  avatar_url: string;
}

export default function Home() {
  const navigation = useNavigation<NavigationProps>();
  const [gitData, setGitData] = useState<GitHubProfile | null>(null);
  const [readme, setReadme] = useState<string>("");
  const [loadingGit, setLoadingGit] = useState(true);

  const [tarefasPendentes, setTarefasPendentes] = useState<number>(0);
  const [tarefasConcluidas, setTarefasConcluidas] = useState<number>(0);

  const githubUser = "rogelio-fraga-dev";

  useEffect(() => {
    async function fetchDashboardData() {
      try {
        const [profileRes, readmeRes] = await Promise.all([
          fetch(`https://api.github.com/users/${githubUser}`),
          fetch(
            `https://raw.githubusercontent.com/${githubUser}/${githubUser}/main/README.md`,
          ),
        ]);

        if (profileRes.ok) {
          const profileData = await profileRes.json();
          setGitData(profileData);
        }

        if (readmeRes.ok) {
          const readmeText = await readmeRes.text();
          const cleanText = readmeText.replace(/<[^>]*>?/gm, "").trim();
          setReadme(cleanText);
        } else {
          setReadme(
            "Ficheiro README.md não localizado no repositório principal.",
          );
        }
      } catch (error) {
        console.error("Erro na camada de rede:", error);
        setReadme("Falha ao sincronizar dados com o servidor.");
      } finally {
        setLoadingGit(false);
      }
    }
    fetchDashboardData();
  }, []);

  useFocusEffect(
    useCallback(() => {
      async function carregarContagemTarefas() {
        try {
          const salvas = await AsyncStorage.getItem("@devflow_tasks");
          if (salvas) {
            const lista = JSON.parse(salvas);
            setTarefasPendentes(lista.filter((t: any) => !t.concluida).length);
            setTarefasConcluidas(lista.filter((t: any) => t.concluida).length);
          } else {
            setTarefasPendentes(0);
            setTarefasConcluidas(0);
          }
        } catch (error) {
          console.error("Erro ao ler sistema de ficheiros", error);
        }
      }
      carregarContagemTarefas();
    }, []),
  );

  return (
    <SafeAreaView style={style.container} edges={["top"]}>
      <View style={style.header}>
        <View style={style.profileContainer}>
          {gitData?.avatar_url ? (
            <Image source={{ uri: gitData.avatar_url }} style={style.avatar} />
          ) : (
            <View
              style={[
                style.avatar,
                {
                  backgroundColor: themes.colors.surface,
                  justifyContent: "center",
                  alignItems: "center",
                },
              ]}
            >
              <MaterialIcons
                name="person"
                size={30}
                color={themes.colors.primary}
              />
            </View>
          )}
          <View>
            <Text style={style.headerTitle}>
              {loadingGit ? "A carregar..." : gitData?.name || gitData?.login}
            </Text>
            <Text style={style.headerSubtitle}>Engenheiro de Software</Text>
          </View>
        </View>
      </View>

      <ScrollView style={style.content} showsVerticalScrollIndicator={false}>
        <Text style={style.sectionTitle}>Métricas de Fluxo</Text>

        <View
          style={{
            flexDirection: "row",
            justifyContent: "space-between",
            marginBottom: 20,
          }}
        >
          <TouchableOpacity
            style={[
              style.taskWidget,
              {
                flex: 1,
                marginRight: 8,
                marginBottom: 0,
                flexDirection: "column",
                alignItems: "flex-start",
              },
            ]}
            onPress={() => navigation.navigate("Tarefas")}
            activeOpacity={0.8}
          >
            <MaterialIcons
              name="pending-actions"
              size={28}
              color={themes.colors.surface}
            />
            <Text
              style={[
                style.taskWidgetText,
                { marginLeft: 0, marginTop: 8, fontSize: 18 },
              ]}
            >
              {tarefasPendentes}
            </Text>
            <Text
              style={[
                style.taskWidgetText,
                {
                  marginLeft: 0,
                  marginTop: 2,
                  fontSize: 12,
                  fontWeight: "normal",
                },
              ]}
            >
              Pendentes
            </Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={[
              style.taskWidget,
              {
                flex: 1,
                marginLeft: 8,
                marginBottom: 0,
                backgroundColor: themes.colors.primary,
                flexDirection: "column",
                alignItems: "flex-start",
              },
            ]}
            onPress={() => navigation.navigate("Tarefas")}
            activeOpacity={0.8}
          >
            <MaterialIcons
              name="check-circle"
              size={28}
              color={themes.colors.surface}
            />
            <Text
              style={[
                style.taskWidgetText,
                { marginLeft: 0, marginTop: 8, fontSize: 18 },
              ]}
            >
              {tarefasConcluidas}
            </Text>
            <Text
              style={[
                style.taskWidgetText,
                {
                  marginLeft: 0,
                  marginTop: 2,
                  fontSize: 12,
                  fontWeight: "normal",
                },
              ]}
            >
              Concluídas
            </Text>
          </TouchableOpacity>
        </View>

        <Text style={style.sectionTitle}>Estatísticas Globais</Text>
        <View style={style.cardRow}>
          <View style={style.statsCard}>
            <MaterialIcons
              name="folder-copy"
              size={28}
              color={themes.colors.primary}
            />
            <Text style={[style.statsValue, { color: themes.colors.primary }]}>
              {loadingGit ? (
                <ActivityIndicator size="small" color={themes.colors.primary} />
              ) : (
                gitData?.public_repos || 0
              )}
            </Text>
            <Text style={style.statsLabel}>Repositórios</Text>
          </View>
          <View style={style.statsCard}>
            <MaterialIcons
              name="people-alt"
              size={28}
              color={themes.colors.secondary}
            />
            <Text
              style={[style.statsValue, { color: themes.colors.secondary }]}
            >
              {loadingGit ? (
                <ActivityIndicator
                  size="small"
                  color={themes.colors.secondary}
                />
              ) : (
                gitData?.followers || 0
              )}
            </Text>
            <Text style={style.statsLabel}>Seguidores</Text>
          </View>
        </View>

        <Text style={style.sectionTitle}>Perfil (README.md)</Text>
        <View style={style.readmeContainer}>
          {loadingGit ? (
            <ActivityIndicator size="small" color={themes.colors.textLight} />
          ) : (
            <ScrollView
              nestedScrollEnabled={true}
              showsVerticalScrollIndicator={true}
            >
              <Text style={style.readmeText}>{readme}</Text>
            </ScrollView>
          )}
        </View>

        <Text style={style.sectionTitle}>Ações Rápidas</Text>

        <TouchableOpacity
          style={style.actionCard}
          onPress={() => navigation.navigate("Explorar")}
          activeOpacity={0.7}
        >
          <View style={style.actionIconContainer}>
            <MaterialIcons
              name="search"
              size={24}
              color={themes.colors.primary}
            />
          </View>
          <View style={style.actionTextContainer}>
            <Text style={style.actionTitle}>Explorar GitHub</Text>
            <Text style={style.actionDescription}>
              Pesquisar utilizadores e analisar repositórios.
            </Text>
          </View>
        </TouchableOpacity>

        <TouchableOpacity
          style={style.actionCard}
          onPress={() => navigation.navigate("Tarefas")}
          activeOpacity={0.7}
        >
          <View style={style.actionIconContainer}>
            <MaterialIcons
              name="assignment"
              size={24}
              color={themes.colors.primary}
            />
          </View>
          <View style={style.actionTextContainer}>
            <Text style={style.actionTitle}>Demandas Salvas</Text>
            <Text style={style.actionDescription}>
              Gerir tarefas técnicas e fluxo de trabalho.
            </Text>
          </View>
        </TouchableOpacity>

        {/* Novo Ponto de Acesso: Configurações */}
        <TouchableOpacity
          style={style.actionCard}
          onPress={() => navigation.navigate("Configuracoes")}
          activeOpacity={0.7}
        >
          <View style={style.actionIconContainer}>
            <MaterialIcons
              name="settings"
              size={24}
              color={themes.colors.primary}
            />
          </View>
          <View style={style.actionTextContainer}>
            <Text style={style.actionTitle}>Configurações de API</Text>
            <Text style={style.actionDescription}>
              Gerir tokens de segurança e limites de requisição.
            </Text>
          </View>
        </TouchableOpacity>
      </ScrollView>

      <Menu />
    </SafeAreaView>
  );
}
