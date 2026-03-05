import React from "react";
import { useNavigation } from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { RootStackParamList } from "../../pages/AppNavigation";
import { TouchableOpacity, View, Text } from "react-native";
import { style } from "./styles";
import { MaterialIcons } from "@expo/vector-icons"; // Usando ícones para ficar igual ao slide

type NavigationProps = NativeStackNavigationProp<RootStackParamList>;

export default function Menu() {
  const navigation = useNavigation<NavigationProps>(); // Hook de navegação [cite: 947]

  return (
    <View style={style.menuContainer}>
      <TouchableOpacity
        onPress={() => navigation.navigate("Home")}
        style={{ alignItems: "center" }}
      >
        <MaterialIcons name="home" size={24} color="black" />
        <Text style={style.menuItem}>Home</Text>
      </TouchableOpacity>

      <TouchableOpacity
        onPress={() => navigation.navigate("Login")}
        style={{ alignItems: "center" }}
      >
        <MaterialIcons name="login" size={24} color="orange" />
        <Text style={style.menuItem}>Login</Text>
      </TouchableOpacity>

      <TouchableOpacity
        onPress={() => navigation.navigate("Cadastro")}
        style={{ alignItems: "center" }}
      >
        <MaterialIcons name="edit" size={24} color="orange" />
        <Text style={style.menuItem}>Cadastro</Text>
      </TouchableOpacity>
    </View>
  );
}
