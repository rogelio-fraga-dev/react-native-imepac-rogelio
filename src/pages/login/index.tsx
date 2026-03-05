import React, { useState } from "react";
import {
  Text,
  View,
  Image,
  TextInput,
  TouchableOpacity,
  Alert,
} from "react-native";
import { style } from "./styles";
import { MaterialIcons } from "@expo/vector-icons";
import { themas } from "../../global/themes";
import Logo from "../../assets/login-9.png";
import { NativeStackScreenProps } from "@react-navigation/native-stack";

type RootStackParamList = {
  Login: undefined;
  Cadastro: undefined;
  Home: undefined;
};

type Props = NativeStackScreenProps<RootStackParamList, "Login">;

export default function Login({ navigation }: Props) {
  const [email, setEmail] = useState("");
  const [senha, setSenha] = useState("");

  function getLogin() {
    try {
      if (!email || !senha) {
        return Alert.alert("Preencha todos os campos");
      }
      Alert.alert("Logado com sucesso!", "", [
        { text: "OK", onPress: () => navigation.navigate("Home") },
      ]); // Navega para a Home após o ok [cite: 890, 891]
    } catch (error) {
      console.log("Erro ao logar: ", error);
    }
  }

  return (
    <View style={style.container}>
      <View style={style.boxTop}>
        <Image source={Logo} />
        <Text style={{ fontWeight: "bold", marginTop: 10 }}>Bem Vindo!!!</Text>
      </View>

      <View style={style.boxMid}>
        <Text style={style.title}>E-mail</Text>
        <View style={style.boxInputEmail}>
          <TextInput
            style={style.input}
            value={email}
            onChangeText={(text) => setEmail(text)}
          />
          <MaterialIcons name="email" size={20} color={themas.colors.gray} />
        </View>

        <Text style={style.title}>Coloque sua Senha</Text>
        <View style={style.boxInputSenha}>
          <TextInput
            style={style.input}
            value={senha}
            onChangeText={(text) => setSenha(text)}
            secureTextEntry={true}
          />
          <MaterialIcons name="password" size={20} color={themas.colors.gray} />
        </View>
      </View>

      <View style={style.boxBottom}>
        <TouchableOpacity style={style.button} onPress={getLogin}>
          <Text style={{ color: themas.colors.secondary, fontWeight: "bold" }}>
            Entrar
          </Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={{ marginTop: 20 }}
          onPress={() => navigation.navigate("Cadastro")}
        >
          <Text style={{ color: themas.colors.gray }}>
            Não tem conta?{" "}
            <Text style={{ color: themas.colors.primary, fontWeight: "bold" }}>
              Cadastre-se aqui!
            </Text>
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}
