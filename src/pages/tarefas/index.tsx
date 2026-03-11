import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  FlatList,
  SafeAreaView,
  Alert,
  KeyboardAvoidingView,
  Platform,
} from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { style } from "./styles";
import { MaterialIcons } from "@expo/vector-icons";
import { themes } from "../../global/themes";
import { useNavigation } from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { RootStackParamList } from "../AppNavigation";

// Tipagem de navegação rigorosa para garantir a passagem de parâmetros corretos
type TarefasNavigationProp = NativeStackNavigationProp<
  RootStackParamList,
  "Tarefas"
>;

interface Tarefa {
  id: string;
  titulo: string;
  concluida: boolean;
}

export default function Tarefas() {
  const navigation = useNavigation<TarefasNavigationProp>();
  const [novaTarefa, setNovaTarefa] = useState("");
  const [tarefas, setTarefas] = useState<Tarefa[]>([]);

  useEffect(() => {
    carregarTarefas();
  }, []);

  async function carregarTarefas() {
    try {
      const salvas = await AsyncStorage.getItem("@devflow_tasks");
      if (salvas) {
        setTarefas(JSON.parse(salvas));
      }
    } catch (e) {
      console.error("Erro ao ler o sistema de ficheiros", e);
    }
  }

  async function salvarTarefas(lista: Tarefa[]) {
    try {
      await AsyncStorage.setItem("@devflow_tasks", JSON.stringify(lista));
      setTarefas(lista);
    } catch (e) {
      Alert.alert("Erro", "Falha na persistência de dados.");
    }
  }

  function adicionarTarefa() {
    if (!novaTarefa.trim()) return;

    const nova: Tarefa = {
      id: String(Date.now()),
      titulo: novaTarefa,
      concluida: false,
    };

    salvarTarefas([...tarefas, nova]);
    setNovaTarefa("");
  }

  function alternarStatusTarefa(id: string) {
    const atualizadas = tarefas.map((t) =>
      t.id === id ? { ...t, concluida: !t.concluida } : t,
    );
    salvarTarefas(atualizadas);
  }

  function removerTarefa(id: string) {
    const filtradas = tarefas.filter((t) => t.id !== id);
    salvarTarefas(filtradas);
  }

  // Função de Delegação (Delegation Pattern) para invocar o Módulo de Telemetria
  function iniciarFocoNaDemanda(tarefa: Tarefa) {
    if (tarefa.concluida) {
      Alert.alert(
        "Ação Inválida",
        "Esta demanda já se encontra concluída. Inicie o foco numa demanda pendente.",
      );
      return;
    }

    // Passagem de parâmetros pela Pilha de Navegação (Navigation Stack)
    navigation.navigate("Telemetria", {
      tarefaId: tarefa.id,
      tituloTarefa: tarefa.titulo,
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
        <Text style={style.headerTitle}>Gestão de Demandas</Text>
      </View>

      <KeyboardAvoidingView
        style={style.content}
        behavior={Platform.OS === "ios" ? "padding" : undefined}
        keyboardVerticalOffset={Platform.OS === "ios" ? 40 : 0}
      >
        <View style={style.searchContainer}>
          <TextInput
            style={style.input}
            placeholder="Descreva a nova demanda técnica..."
            value={novaTarefa}
            onChangeText={setNovaTarefa}
            onSubmitEditing={adicionarTarefa}
          />
          <TouchableOpacity
            style={style.searchButton}
            onPress={adicionarTarefa}
          >
            <MaterialIcons name="add" size={24} color={themes.colors.surface} />
          </TouchableOpacity>
        </View>

        <FlatList
          data={tarefas}
          keyExtractor={(item) => item.id}
          showsVerticalScrollIndicator={false}
          renderItem={({ item }) => (
            <View
              style={[style.repoCard, { opacity: item.concluida ? 0.6 : 1 }]}
            >
              {/* Linha 1: Título e Status */}
              <TouchableOpacity
                onPress={() => alternarStatusTarefa(item.id)}
                activeOpacity={0.7}
                style={{
                  flexDirection: "row",
                  justifyContent: "space-between",
                  alignItems: "center",
                  paddingBottom: 8,
                }}
              >
                <View
                  style={{
                    flexDirection: "row",
                    alignItems: "center",
                    flex: 1,
                    paddingRight: 10,
                  }}
                >
                  <MaterialIcons
                    name={
                      item.concluida ? "check-circle" : "radio-button-unchecked"
                    }
                    size={24}
                    color={
                      item.concluida
                        ? themes.colors.primary
                        : themes.colors.textLight
                    }
                    style={{ marginRight: 12 }}
                  />
                  <Text
                    style={[
                      style.repoTitle,
                      {
                        textDecorationLine: item.concluida
                          ? "line-through"
                          : "none",
                        color: item.concluida
                          ? themes.colors.textLight
                          : themes.colors.text,
                        flex: 1,
                        marginBottom: 0,
                      },
                    ]}
                  >
                    {item.titulo}
                  </Text>
                </View>
              </TouchableOpacity>

              {/* Linha 2: Ações Separadas (Foco e Eliminar) */}
              <View
                style={{
                  flexDirection: "row",
                  justifyContent: "flex-end",
                  alignItems: "center",
                  borderTopWidth: 1,
                  borderTopColor: themes.colors.border,
                  paddingTop: 12,
                  marginTop: 4,
                }}
              >
                {/* Botão de Telemetria (Apenas visível para demandas pendentes) */}
                {!item.concluida && (
                  <TouchableOpacity
                    onPress={() => iniciarFocoNaDemanda(item)}
                    style={{
                      flexDirection: "row",
                      alignItems: "center",
                      backgroundColor: themes.colors.secondary,
                      paddingHorizontal: 12,
                      paddingVertical: 6,
                      borderRadius: 16,
                      marginRight: 12,
                    }}
                    activeOpacity={0.7}
                  >
                    <MaterialIcons
                      name="timer"
                      size={16}
                      color={themes.colors.surface}
                      style={{ marginRight: 4 }}
                    />
                    <Text
                      style={{
                        color: themes.colors.surface,
                        fontSize: 12,
                        fontWeight: "bold",
                      }}
                    >
                      Focar
                    </Text>
                  </TouchableOpacity>
                )}

                {/* Botão de Eliminar */}
                <TouchableOpacity
                  onPress={() => removerTarefa(item.id)}
                  style={{ padding: 4 }}
                >
                  <MaterialIcons
                    name="delete-outline"
                    size={24}
                    color={themes.colors.error}
                  />
                </TouchableOpacity>
              </View>
            </View>
          )}
        />
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}
