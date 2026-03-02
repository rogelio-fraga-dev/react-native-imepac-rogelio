import { StyleSheet, Dimensions } from "react-native";

export const style = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f5f5f5", // Cor conforme slide
    paddingHorizontal: 20, // Margem lateral para não encostar no vidro
    justifyContent: "center",
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    textAlign: "center",
    marginBottom: 30, // Conforme slide
  },
  label: {
    fontSize: 16,
    marginBottom: 5,
    marginTop: 15, // Conforme slide
  },
  inputContainer: {
    flexDirection: "row",
    alignItems: "center",
    borderWidth: 1,
    borderColor: "#ddd",
    borderRadius: 10, // Arredondamento conforme slide
    paddingHorizontal: 10,
    backgroundColor: "#fff",
    height: 50,
    width: "100%", // Garante que ocupe a largura total disponível
  },
  input: {
    flex: 1,
    height: "100%",
    fontSize: 16,
  },
  button: {
    marginTop: 30,
    backgroundColor: "#007bff", // Azul do slide
    padding: 15,
    borderRadius: 10, // Arredondamento conforme slide
    alignItems: "center",
    width: "100%", // Força o botão a ser largo
  },
  buttonText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "bold", // Conforme slide
  },
});
