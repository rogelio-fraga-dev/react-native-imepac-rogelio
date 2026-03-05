import React from "react";
import { Text, View, SafeAreaView } from "react-native";
import { style } from "./styles";
import Menu from "../../components/menu/Menu.tsx"; // Importando o Menu criado [cite: 1014]

export default function Home() {
  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: "#ddd" }}>
      <View style={style.container}>
        <Menu />
        <View
          style={{ flex: 1, justifyContent: "center", alignItems: "center" }}
        >
          <Text style={{ fontSize: 24, fontWeight: "bold" }}>Página Home</Text>
        </View>
      </View>
    </SafeAreaView>
  );
}
