import React from "react";
import { Text, View, Image, TextInput } from "react-native";
import { style } from "./styles";
import Logo from "../../assets/login-9.png";

export default function Login() {
  return (
    <View style={style.container}>
      <View style={style.boxTop}>
        <Image source={Logo} />
        <Text>Bem Vindo!!!</Text>
      </View>

      <View style={style.boxMid}>
        <Text>Endereço de E-mail</Text>
        <TextInput style={style.boxInput} />

        <Text>Coloque sua Senha</Text>
        <TextInput style={style.boxInput} />
      </View>

      <View style={style.boxBottom}>
        <Text>Bottom</Text>
      </View>
    </View>
  );
}
