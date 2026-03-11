import React, { useState } from "react";
import {
  Text,
  View,
  TextInput,
  TouchableOpacity,
  Alert,
  SafeAreaView,
  Image,
} from "react-native";
import { style } from "./styles";
import { MaterialIcons } from "@expo/vector-icons";
import { themes } from "../../global/themes";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { RootStackParamList } from "../AppNavigation";
import Logo from "../../assets/login-9.png";
import AsyncStorage from "@react-native-async-storage/async-storage";

type Props = NativeStackScreenProps<RootStackParamList, "Login">;

export default function Login({ navigation }: Props) {
  const [email, setEmail] = useState("");
  const [senha, setSenha] = useState("");

  async function getLogin() {
    if (!email || !senha) {
      return Alert.alert("Atenção", "Preencha todos os campos para continuar.");
    }

    try {
      // Recupera os dados do utilizador guardados no dispositivo
      const storageData = await AsyncStorage.getItem("@devflow_user");

      if (!storageData) {
        return Alert.alert(
          "Erro",
          "Nenhuma conta encontrada. Por favor, registe-se.",
        );
      }

      const usuarioGuardado = JSON.parse(storageData);

      // Validação de credenciais (Regra de Negócio)
      if (email === usuarioGuardado.email && senha === usuarioGuardado.senha) {
        Alert.alert("Sucesso", `Bem-vindo, ${usuarioGuardado.nome}!`, [
          { text: "Entrar", onPress: () => navigation.navigate("Home") },
        ]);
      } else {
        Alert.alert("Erro", "E-mail ou senha incorretos.");
      }
    } catch (error) {
      console.error("Erro ao ler dados:", error);
      Alert.alert("Erro", "Falha técnica ao validar login.");
    }
  }

  return (
    <SafeAreaView
      style={{ flex: 1, backgroundColor: themes.colors.background }}
    >
      <View style={style.container}>
        <View style={style.boxTop}>
          <Image
            source={Logo}
            style={{ width: 100, height: 100 }}
            resizeMode="contain"
          />
          <Text style={style.title}>DevFlow</Text>
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
            placeholder="Digite a sua senha"
            secureTextEntry={true}
          />
          <MaterialIcons
            name="lock"
            size={20}
            color={themes.colors.textLight}
          />
        </View>

        <TouchableOpacity style={style.button} onPress={getLogin}>
          <Text style={style.buttonText}>Entrar</Text>
        </TouchableOpacity>

        <TouchableOpacity onPress={() => navigation.navigate("Cadastro")}>
          <Text style={style.linkText}>
            Não tem conta?{" "}
            <Text style={style.linkHighlight}>Cadastre-se aqui!</Text>
          </Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
}
