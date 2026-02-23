import { Dimensions, StyleSheet } from "react-native";

export const style = StyleSheet.create({
  container: {
    flex: 1,
    width: "100%",
    backgroundColor: "#a4c639",
    alignItems: "center",
  },
  boxTop: {
    height: Dimensions.get("window").height / 3,
    width: "100%",
    justifyContent: "center",
    alignItems: "center",
  },
  boxMid: {
    height: Dimensions.get("window").height / 2,
    width: "100%",
    paddingHorizontal: 20,
    justifyContent: "center",
  },
  boxInput: {
    width: "100%",
    height: 45,
    backgroundColor: "#f0f0f0",
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 8,
    marginTop: 10,
    marginBottom: 20,
  },
});
