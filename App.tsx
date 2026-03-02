import { StatusBar } from "expo-status-bar";
import { StyleSheet, Text, View } from "react-native";
import Login from "./src/pages/cadastro";
import Cadastro from "./src/pages/cadastro";

export default function App() {
  return (
    <View style={styles.container}>
      <StatusBar style="auto" />
      <Cadastro />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
});
