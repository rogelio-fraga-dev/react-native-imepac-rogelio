import { StyleSheet } from "react-native";

export const style = StyleSheet.create({
  menuContainer: {
    flexDirection: "row", // Coloca os itens lado a lado [cite: 991]
    justifyContent: "space-around", // Espalha os botões igualmente [cite: 992]
    backgroundColor: "#ddd", // Fundo cinza do menu [cite: 994]
    padding: 10, // Preenchimento interno [cite: 996]
    borderBottomWidth: 1, // Borda inferior [cite: 998]
    borderBottomColor: "#aaa", // Cor da borda [cite: 1000]
  },
  menuItem: {
    fontSize: 16, // Tamanho da fonte [cite: 1006]
    fontWeight: "bold", // Negrito [cite: 1008]
  },
});
