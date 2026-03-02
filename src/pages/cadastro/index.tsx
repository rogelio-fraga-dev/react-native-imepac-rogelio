import React, { useState } from "react";
import { Text, View, TextInput, TouchableOpacity, Alert } from "react-native";
import { MaterialIcons } from "@expo/vector-icons";
import { style } from "./styles";

export default function Cadastro() {
  const [nome, setNome] = useState("");
  const [email, setEmail] = useState("");
  const [senha, setSenha] = useState("");

  function handleCadastro() {
    try {
      // Validação simples de campos vazios
      if (!nome || !email || !senha) {
        return Alert.alert("Preencha todos os campos");
      }
      Alert.alert("Cadastro realizado com sucesso!");
    } catch (error) {
      console.log("Erro ao cadastrar:", error);
    }
  }

  return (
    <View style={style.container}>
      <Text style={style.title}>Página de Cadastro</Text>

      {/* Campo Nome */}
      <Text style={style.label}>Nome</Text>
      <View style={style.inputContainer}>
        <TextInput
          style={style.input}
          value={nome}
          onChangeText={(text) => setNome(text)}
          placeholder="Digite seu nome"
        />
        <MaterialIcons name="person" size={20} color="gray" />
      </View>

      {/* Campo Email */}
      <Text style={style.label}>Email</Text>
      <View style={style.inputContainer}>
        <TextInput
          style={style.input}
          value={email}
          onChangeText={(text) => setEmail(text)}
          placeholder="Digite seu email"
          keyboardType="email-address"
        />
        <MaterialIcons name="email" size={20} color="gray" />
      </View>

      {/* Campo Senha */}
      <Text style={style.label}>Senha</Text>
      <View style={style.inputContainer}>
        <TextInput
          style={style.input}
          value={senha}
          onChangeText={(text) => setSenha(text)}
          placeholder="Digite sua senha"
          secureTextEntry={true}
        />
        <MaterialIcons name="lock" size={20} color="gray" />
      </View>

      {/* Botão de Cadastro */}
      <TouchableOpacity style={style.button} onPress={handleCadastro}>
        <Text style={style.buttonText}>Cadastrar</Text>
      </TouchableOpacity>
    </View>
  );
}
