import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  FlatList,
  ActivityIndicator,
  Alert,
  Keyboard,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import * as WebBrowser from "expo-web-browser";
import * as SecureStore from "expo-secure-store";
import { style } from "./styles";
import { MaterialIcons } from "@expo/vector-icons";
import { themes } from "../../global/themes";
import { useNavigation } from "@react-navigation/native";

interface Repositorio {
  id: number;
  name: string;
  description: string | null;
  html_url: string;
  language: string | null;
  updated_at: string;
}

export default function Explorar() {
  const navigation = useNavigation();
  const [repositoriosOriginais, setRepositoriosOriginais] = useState<
    Repositorio[]
  >([]);
  const [repositoriosFiltrados, setRepositoriosFiltrados] = useState<
    Repositorio[]
  >([]);
  const [termoBusca, setTermoBusca] = useState("");
  const [carregando, setCarregando] = useState(true);

  const MEU_USUARIO_GITHUB = "rogelio-fraga-dev";

  // Dispara a busca automaticamente ao montar a tela na memória
  useEffect(() => {
    buscarMeusRepositorios();
  }, []);

  async function buscarMeusRepositorios() {
    try {
      const tokenGuardado =
        await SecureStore.getItemAsync("devflow_github_pat");

      const headers: HeadersInit = {
        Accept: "application/vnd.github.v3+json",
      };

      if (tokenGuardado) {
        headers["Authorization"] = `Bearer ${tokenGuardado}`;
      }

      const resposta = await fetch(
        `https://api.github.com/users/${MEU_USUARIO_GITHUB}/repos?sort=updated`,
        {
          method: "GET",
          headers: headers,
        },
      );

      if (!resposta.ok) {
        if (resposta.status === 401)
          throw new Error("Token de acesso inválido.");
        if (resposta.status === 403)
          throw new Error(
            "Limite da API excedido. Adicione um Token nas Configurações.",
          );
        throw new Error("Falha de comunicação com o servidor.");
      }

      const dados = await resposta.json();
      setRepositoriosOriginais(dados);
      setRepositoriosFiltrados(dados); // Inicializa a lista visível
    } catch (error: any) {
      Alert.alert(
        "Falha na Sincronização",
        error.message || "Não foi possível carregar os seus repositórios.",
      );
    } finally {
      setCarregando(false);
    }
  }

  // Algoritmo de busca linear em memória (Client-side)
  function aplicarFiltroLocal(texto: string) {
    setTermoBusca(texto);
    if (!texto.trim()) {
      setRepositoriosFiltrados(repositoriosOriginais);
      return;
    }

    const filtro = repositoriosOriginais.filter((repo) =>
      repo.name.toLowerCase().includes(texto.toLowerCase()),
    );
    setRepositoriosFiltrados(filtro);
  }

  const abrirNoApp = async (url: string) => {
    try {
      await WebBrowser.openBrowserAsync(url);
    } catch (error) {
      Alert.alert("Erro", "Não foi possível inicializar o navegador embutido.");
    }
  };

  function formatarDataIso(dataIso: string): string {
    const data = new Date(dataIso);
    return data.toLocaleDateString("pt-BR", {
      day: "2-digit",
      month: "short",
      year: "numeric",
    });
  }

  return (
    <SafeAreaView style={style.container} edges={["top"]}>
      <View
        style={[
          style.header,
          { flexDirection: "row", alignItems: "center", paddingHorizontal: 20 },
        ]}
      >
        <TouchableOpacity
          onPress={() => navigation.goBack()}
          style={{ marginRight: 15 }}
        >
          <MaterialIcons
            name="arrow-back"
            size={28}
            color={themes.colors.surface}
          />
        </TouchableOpacity>
        <Text style={style.headerTitle}>Meus Repositórios</Text>
      </View>

      <View style={style.content}>
        {/* O input agora atua apenas como filtro local, sem fazer chamadas à rede */}
        <View style={style.searchContainer}>
          <TextInput
            style={style.input}
            placeholder="Filtrar meus repositórios por nome..."
            value={termoBusca}
            onChangeText={aplicarFiltroLocal}
            autoCapitalize="none"
          />
          <View
            style={[
              style.searchButton,
              {
                backgroundColor: themes.colors.surface,
                borderWidth: 1,
                borderColor: themes.colors.border,
              },
            ]}
          >
            <MaterialIcons
              name="filter-list"
              size={24}
              color={themes.colors.primary}
            />
          </View>
        </View>

        {carregando ? (
          <View
            style={{ flex: 1, justifyContent: "center", alignItems: "center" }}
          >
            <ActivityIndicator size="large" color={themes.colors.primary} />
            <Text style={{ marginTop: 12, color: themes.colors.textLight }}>
              A carregar o seu portfólio...
            </Text>
          </View>
        ) : (
          <FlatList
            data={repositoriosFiltrados}
            keyExtractor={(item) => item.id.toString()}
            showsVerticalScrollIndicator={false}
            ListEmptyComponent={() => (
              <View
                style={{
                  alignItems: "center",
                  marginTop: 40,
                  paddingHorizontal: 20,
                }}
              >
                <MaterialIcons
                  name="folder-off"
                  size={48}
                  color={themes.colors.border}
                />
                <Text
                  style={{
                    textAlign: "center",
                    marginTop: 16,
                    color: themes.colors.textLight,
                  }}
                >
                  Nenhum repositório encontrado com esse nome.
                </Text>
              </View>
            )}
            renderItem={({ item }) => (
              <TouchableOpacity
                style={style.repoCard}
                onPress={() => abrirNoApp(item.html_url)}
                activeOpacity={0.7}
              >
                <View
                  style={{
                    flexDirection: "row",
                    justifyContent: "space-between",
                    alignItems: "center",
                  }}
                >
                  <Text
                    style={[style.repoTitle, { flex: 1, marginRight: 10 }]}
                    numberOfLines={1}
                  >
                    {item.name}
                  </Text>
                  <MaterialIcons
                    name="open-in-new"
                    size={20}
                    color={themes.colors.primary}
                  />
                </View>

                <Text style={style.repoDescription} numberOfLines={2}>
                  {item.description || "Sem descrição fornecida."}
                </Text>

                <View
                  style={{
                    flexDirection: "row",
                    marginTop: 12,
                    alignItems: "center",
                  }}
                >
                  {item.language && (
                    <View
                      style={{
                        flexDirection: "row",
                        alignItems: "center",
                        marginRight: 16,
                      }}
                    >
                      <MaterialIcons
                        name="code"
                        size={16}
                        color={themes.colors.primary}
                      />
                      <Text
                        style={{
                          fontSize: 12,
                          color: themes.colors.textLight,
                          marginLeft: 4,
                          fontWeight: "bold",
                        }}
                      >
                        {item.language}
                      </Text>
                    </View>
                  )}
                  <View style={{ flexDirection: "row", alignItems: "center" }}>
                    <MaterialIcons
                      name="update"
                      size={16}
                      color={themes.colors.textLight}
                    />
                    <Text
                      style={{
                        fontSize: 12,
                        color: themes.colors.textLight,
                        marginLeft: 4,
                      }}
                    >
                      Atualizado a {formatarDataIso(item.updated_at)}
                    </Text>
                  </View>
                </View>
              </TouchableOpacity>
            )}
          />
        )}
      </View>
    </SafeAreaView>
  );
}
