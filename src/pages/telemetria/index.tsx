import React, { useState, useEffect } from "react";
import { View, Text, TouchableOpacity, Alert } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useNavigation, useRoute, RouteProp } from "@react-navigation/native";
import { MaterialIcons } from "@expo/vector-icons";

import { style } from "./styles";
import { themes } from "../../global/themes";
import { RootStackParamList } from "../AppNavigation";

// Tipagem rigorosa para os parâmetros extraídos da rota
type TelemetriaRouteProp = RouteProp<RootStackParamList, "Telemetria">;

export default function Telemetria() {
  const navigation = useNavigation();
  const route = useRoute<TelemetriaRouteProp>();

  // Extração segura de dados via desestruturação
  const { tarefaId, tituloTarefa } = route.params;

  // Estado do temporizador: Padrão de 25 minutos (1500 segundos)
  const TEMPO_POMODORO = 25 * 60;
  const [segundosRestantes, setSegundosRestantes] =
    useState<number>(TEMPO_POMODORO);
  const [ativo, setAtivo] = useState<boolean>(false);

  // Efeito colateral (Side-effect) para controlo do relógio do sistema
  useEffect(() => {
    let intervalo: NodeJS.Timeout;

    if (ativo && segundosRestantes > 0) {
      // Executa o decremento assíncrono a cada 1000 milissegundos (1 segundo)
      intervalo = setInterval(() => {
        setSegundosRestantes((prev) => prev - 1);
      }, 1000);
    } else if (segundosRestantes === 0 && ativo) {
      // Condição de paragem quando o tempo se esgota
      setAtivo(false);
      Alert.alert(
        "Ciclo Concluído",
        `Excelente foco na demanda:\n"${tituloTarefa}"\n\nRegiste o seu progresso.`,
      );
    }

    // Função de Limpeza (Cleanup Function)
    return () => {
      if (intervalo) clearInterval(intervalo);
    };
  }, [ativo, segundosRestantes, tituloTarefa]);

  // Funções de manipulação de estado (Handlers)
  const alternarTemporizador = () => setAtivo(!ativo);

  const reiniciarTemporizador = () => {
    setAtivo(false);
    setSegundosRestantes(TEMPO_POMODORO);
  };

  // Formatação matemática do tempo (Algoritmo de conversão de base 60)
  const formatarTempo = (): string => {
    const minutos = Math.floor(segundosRestantes / 60);
    const segundos = segundosRestantes % 60;
    return `${minutos.toString().padStart(2, "0")}:${segundos.toString().padStart(2, "0")}`;
  };

  return (
    <SafeAreaView style={style.container} edges={["top"]}>
      <View
        style={[style.header, { flexDirection: "row", alignItems: "center" }]}
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
        <Text style={style.headerTitle}>Sessão de Foco</Text>
      </View>

      <View style={style.content}>
        {/* Indicador de Contexto (Context Awareness) */}
        <View style={style.taskIndicator}>
          <Text style={style.taskLabel}>A trabalhar na demanda:</Text>
          <Text style={style.taskTitle} numberOfLines={2}>
            {tituloTarefa}
          </Text>
        </View>

        {/* Relógio Central */}
        <View style={style.timerContainer}>
          <Text style={style.timerText}>{formatarTempo()}</Text>
        </View>

        {/* Painel de Controlo */}
        <View style={style.controlsContainer}>
          {/* Botão de Reset */}
          <TouchableOpacity
            style={[style.controlButton, style.buttonSecondary]}
            onPress={reiniciarTemporizador}
            activeOpacity={0.7}
          >
            <MaterialIcons name="replay" size={28} color={themes.colors.text} />
          </TouchableOpacity>

          {/* Botão Principal (Play/Pause) */}
          <TouchableOpacity
            style={[
              style.controlButton,
              ativo ? style.buttonDanger : style.buttonPrimary,
              { width: 80, height: 80, borderRadius: 40 }, // Destaque visual
            ]}
            onPress={alternarTemporizador}
            activeOpacity={0.8}
          >
            <MaterialIcons
              name={ativo ? "pause" : "play-arrow"}
              size={40}
              color={themes.colors.surface}
            />
          </TouchableOpacity>

          {/* Botão Concluir Antecipadamente */}
          <TouchableOpacity
            style={[style.controlButton, style.buttonSecondary]}
            onPress={() => {
              setAtivo(false);
              navigation.goBack();
            }}
            activeOpacity={0.7}
          >
            <MaterialIcons
              name="done"
              size={28}
              color={themes.colors.primary}
            />
          </TouchableOpacity>
        </View>
      </View>
    </SafeAreaView>
  );
}
