import React, { useState } from "react";
import {
  Text,
  View,
  TextInput,
  TouchableOpacity,
  Alert,
  SafeAreaView,
} from "react-native";
import { MaterialIcons } from "@expo/vector-icons"; //
import { style } from "./styles";

export default function Cadastro() {
  const [nome, setNome] = useState("");
  const [email, setEmail] = useState("");
  const [senha, setSenha] = useState("");

  function handleCadastro() {
    if (!nome || !email || !senha) {
      return Alert.alert("Preencha todos os campos"); // Validação
    }
    Alert.alert("Cadastro realizado com sucesso!"); // Sucesso
  }

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: "#f5f5f5" }}>
      <View style={style.container}>
        <Text style={style.title}>Página de Cadastro</Text>

        <Text style={style.label}>Nome</Text>
        <View style={style.inputContainer}>
          <TextInput
            style={style.input}
            value={nome}
            onChangeText={setNome}
            placeholder="Digite seu nome"
          />
          <MaterialIcons name="person" size={20} color="gray" />
        </View>

        <Text style={style.label}>Email</Text>
        <View style={style.inputContainer}>
          <TextInput
            style={style.input}
            value={email}
            onChangeText={setEmail}
            placeholder="Digite seu email"
            keyboardType="email-address"
          />
          <MaterialIcons name="email" size={20} color="gray" />
        </View>

        <Text style={style.label}>Senha</Text>
        <View style={style.inputContainer}>
          <TextInput
            style={style.input}
            value={senha}
            onChangeText={setSenha}
            placeholder="Digite sua senha"
            secureTextEntry={true}
          />
          <MaterialIcons name="lock" size={20} color="gray" />
        </View>

        <TouchableOpacity style={style.button} onPress={handleCadastro}>
          <Text style={style.buttonText}>Cadastrar</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
}
