import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  Alert,
  KeyboardAvoidingView,
  Platform,
  Keyboard,
  ActivityIndicator,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import * as SecureStore from "expo-secure-store";
import { style } from "./styles";
import { MaterialIcons } from "@expo/vector-icons";
import { themes } from "../../global/themes";
import { useNavigation } from "@react-navigation/native";

export default function Configuracoes() {
  const navigation = useNavigation();
  const [token, setToken] = useState("");
  const [processando, setProcessando] = useState(false);

  useEffect(() => {
    carregarTokenLocal();
  }, []);

  // Leitura assíncrona do cofre de segurança do dispositivo
  async function carregarTokenLocal() {
    try {
      const tokenGuardado =
        await SecureStore.getItemAsync("devflow_github_pat");
      if (tokenGuardado) {
        setToken(tokenGuardado);
      }
    } catch (error) {
      console.error("Falha ao aceder ao SecureStore:", error);
    }
  }

  // Persistência com encriptação de hardware
  async function salvarToken() {
    Keyboard.dismiss();
    setProcessando(true);

    try {
      if (!token.trim()) {
        // Se o campo estiver vazio, removemos a chave de segurança para limpeza de estado
        await SecureStore.deleteItemAsync("devflow_github_pat");
        Alert.alert(
          "Sucesso",
          "Token removido. O sistema voltará a utilizar o limite padrão da API (60 requisições/hora).",
        );
      } else {
        // Gravação no Secure Enclave (iOS) ou Keystore (Android)
        await SecureStore.setItemAsync("devflow_github_pat", token.trim());
        Alert.alert(
          "Segurança",
          "Token encriptado e guardado com sucesso. O limite da API foi expandido para 5.000 requisições/hora.",
        );
      }
    } catch (error) {
      Alert.alert(
        "Erro Criptográfico",
        "Falha ao tentar gravar os dados de forma segura no dispositivo.",
      );
    } finally {
      setProcessando(false);
    }
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
        <Text style={style.headerTitle}>Configurações de API</Text>
      </View>

      <KeyboardAvoidingView
        style={style.content}
        behavior={Platform.OS === "ios" ? "padding" : undefined}
        keyboardVerticalOffset={Platform.OS === "ios" ? 40 : 0}
      >
        <Text style={style.sectionTitle}>Autenticação do GitHub</Text>
        <Text style={style.description}>
          Para contornar o limite de visualização de repositórios no módulo
          Explorar, insira o seu Personal Access Token (PAT).
        </Text>

        <View style={style.inputContainer}>
          <MaterialIcons
            name="vpn-key"
            size={20}
            color={themes.colors.textLight}
            style={{ marginLeft: 8 }}
          />
          <TextInput
            style={style.input}
            placeholder="Cole aqui o seu token (ex: ghp_...)"
            value={token}
            onChangeText={setToken}
            autoCapitalize="none"
            autoCorrect={false}
            secureTextEntry={true} // Oculta o token durante a digitação para prevenir 'shoulder surfing'
          />
        </View>

        <TouchableOpacity
          style={style.saveButton}
          onPress={salvarToken}
          disabled={processando}
        >
          {processando ? (
            <ActivityIndicator color={themes.colors.surface} />
          ) : (
            <>
              <MaterialIcons
                name="security"
                size={20}
                color={themes.colors.surface}
              />
              <Text style={style.saveButtonText}>Guardar Token Seguro</Text>
            </>
          )}
        </TouchableOpacity>

        <View style={style.infoCard}>
          <Text
            style={[style.infoText, { fontWeight: "bold", marginBottom: 4 }]}
          >
            Porquê isto é seguro?
          </Text>
          <Text style={style.infoText}>
            O DevFlow não armazena este token em texto limpo. Ele utiliza o
            Keystore (Android) ou o Keychain (iOS) para aplicar encriptação a
            nível de hardware, garantindo que outras aplicações não tenham
            acesso à sua credencial.
          </Text>
        </View>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}
