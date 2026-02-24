import React, { useState } from "react";
import { Text, View, Image, TextInput, TouchableOpacity } from "react-native";
import { style } from "./styles";
import { MaterialIcons } from "@expo/vector-icons";
import { themas } from "../../global/themes";
import Logo from "../../assets/login-9.png";

export default function Login() {
  const [email, setEmail] = useState("");
  const [senha, setSenha] = useState("");

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
            onChangeText={(e) => setEmail(e)}
          />
          <MaterialIcons name="email" size={20} color={themas.colors.gray} />
        </View>

        <Text style={style.title}>Coloque sua Senha</Text>
        <View style={style.boxInputSenha}>
          <TextInput
            style={style.input}
            value={senha}
            onChangeText={(e) => setSenha(e)}
            secureTextEntry={true}
          />
          <MaterialIcons name="password" size={20} color={themas.colors.gray} />
        </View>
      </View>

      <View style={style.boxBottom}>
        <TouchableOpacity style={style.button}>
          <Text style={{ color: themas.colors.secondary, fontWeight: "bold" }}>
            Entrar
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}
