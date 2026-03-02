import { StyleSheet, Dimensions } from "react-native";

export const style = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 30, // Aumentado para centralizar melhor no iPhone
    justifyContent: "center",
    backgroundColor: "#f5f5f5",
  },
  title: {
    fontSize: 28, // Um pouco maior para destaque
    fontWeight: "bold",
    textAlign: "center",
    marginBottom: 40,
  },
  label: {
    fontSize: 16,
    marginBottom: 8,
    marginTop: 15,
    fontWeight: "600",
  },
  inputContainer: {
    flexDirection: "row",
    alignItems: "center",
    borderWidth: 1,
    borderColor: "#ddd",
    borderRadius: 12, // Bordas mais suaves
    paddingHorizontal: 15,
    backgroundColor: "#fff",
    height: 55, // Altura maior para facilitar o toque no iPhone
    width: "100%", // Garante que use toda a largura disponível
  },
  input: {
    flex: 1,
    height: "100%",
    fontSize: 16,
  },
  button: {
    marginTop: 40,
    backgroundColor: "#007bff",
    padding: 18,
    borderRadius: 12,
    alignItems: "center",
    width: "100%", // Botão largo ocupando a tela
  },
  buttonText: {
    color: "#fff",
    fontSize: 18,
    fontWeight: "bold",
  },
});
