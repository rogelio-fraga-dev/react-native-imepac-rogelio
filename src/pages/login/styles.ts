import { Dimensions, StyleSheet } from "react-native";
import { themas } from "../../global/themes";

export const style = StyleSheet.create({
  container: {
    flex: 1,
    width: "100%",
    backgroundColor: themas.colors.corDeFundo,
    alignItems: "center",
    justifyContent: "center",
  },
  boxTop: {
    height: Dimensions.get("window").height / 3,
    width: "100%",
    alignItems: "center",
    justifyContent: "center",
  },
  boxMid: {
    height: Dimensions.get("window").height / 3,
    width: "100%",
    paddingHorizontal: 37,
  },
  title: {
    marginLeft: 20,
    marginTop: 20,
    fontWeight: "bold",
  },
  boxInputEmail: {
    width: "100%",
    height: 40,
    borderWidth: 1,
    borderRadius: 40,
    marginTop: 10,
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 10,
    backgroundColor: themas.colors.lighGray,
    borderColor: themas.colors.lighGray,
  },
  boxInputSenha: {
    width: "100%",
    height: 40,
    borderWidth: 1,
    borderRadius: 40,
    marginTop: 10,
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 10,
    backgroundColor: themas.colors.lighGray,
    borderColor: themas.colors.lighGray,
  },
  input: {
    height: "100%",
    width: "90%",
    borderRadius: 40,
  },
  boxBottom: {
    height: Dimensions.get("window").height / 3,
    width: "100%",
    alignItems: "center",
    justifyContent: "center",
  },
  button: {
    width: 200,
    height: 40,
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 40,
    backgroundColor: themas.colors.primary,
  },
});
