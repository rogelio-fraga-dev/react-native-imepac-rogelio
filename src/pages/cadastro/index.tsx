import React, { useState } from "react";
import {
  Text,
  View,
  TextInput,
  TouchableOpacity,
  Alert,
  SafeAreaView,
  ScrollView,
} from "react-native";
import { style } from "./styles";
import { MaterialIcons } from "@expo/vector-icons";
import { themes } from "../../global/themes";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { RootStackParamList } from "../AppNavigation";
import AsyncStorage from "@react-native-async-storage/async-storage";

type Props = NativeStackScreenProps<RootStackParamList, "Cadastro">;

export default function Cadastro({ navigation }: Props) {
  const [nome, setNome] = useState("");
  const [email, setEmail] = useState("");
  const [senha, setSenha] = useState("");

  async function handleCadastro() {
    if (!nome || !email || !senha) {
      return Alert.alert(
        "Erro de Validação",
        "Por favor, preencha todos os campos obrigatórios.",
      );
    }

    try {
      // Criação do objeto do utilizador
      const usuario = { nome, email, senha };

      // Gravação dos dados no armazenamento local do dispositivo
      await AsyncStorage.setItem("@devflow_user", JSON.stringify(usuario));

      Alert.alert("Sucesso", "Conta criada com sucesso no DevFlow!", [
        { text: "OK", onPress: () => navigation.navigate("Login") },
      ]);
    } catch (error) {
      console.error("Erro ao gravar dados:", error);
      Alert.alert("Erro", "Falha ao criar a conta. Tente novamente.");
    }
  }

  return (
    <SafeAreaView
      style={{ flex: 1, backgroundColor: themes.colors.background }}
    >
      <ScrollView
        contentContainerStyle={{ flexGrow: 1 }}
        keyboardShouldPersistTaps="handled"
      >
        <View style={style.container}>
          {/* Novo Cabeçalho com Botão de Voltar (UX Affordance) */}
          <View
            style={{
              flexDirection: "row",
              alignItems: "center",
              marginBottom: themes.spacing.lg,
            }}
          >
            <TouchableOpacity
              onPress={() => navigation.goBack()}
              style={{ padding: 8, marginLeft: -8 }}
            >
              <MaterialIcons
                name="arrow-back-ios"
                size={24}
                color={themes.colors.text}
              />
            </TouchableOpacity>
            <Text style={[style.title, { marginTop: 0, marginLeft: 8 }]}>
              Criar Conta
            </Text>
          </View>

          <Text style={style.label}>Nome Completo</Text>
          <View style={style.inputContainer}>
            <TextInput
              style={style.input}
              value={nome}
              onChangeText={setNome}
              placeholder="Digite o seu nome"
              autoCapitalize="words"
            />
            <MaterialIcons
              name="person"
              size={20}
              color={themes.colors.textLight}
            />
          </View>

          <Text style={style.label}>E-mail</Text>
          <View style={style.inputContainer}>
            <TextInput
              style={style.input}
              value={email}
              onChangeText={setEmail}
              placeholder="Digite o seu e-mail"
              keyboardType="email-address"
              autoCapitalize="none"
            />
            <MaterialIcons
              name="email"
              size={20}
              color={themes.colors.textLight}
            />
          </View>

          <Text style={style.label}>Senha</Text>
          <View style={style.inputContainer}>
            <TextInput
              style={style.input}
              value={senha}
              onChangeText={setSenha}
              placeholder="Crie uma senha"
              secureTextEntry={true}
            />
            <MaterialIcons
              name="lock"
              size={20}
              color={themes.colors.textLight}
            />
          </View>

          <TouchableOpacity style={style.button} onPress={handleCadastro}>
            <Text style={style.buttonText}>Cadastrar</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}
