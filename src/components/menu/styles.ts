import { StyleSheet } from "react-native";
import { themes } from "../../global/themes";

export const style = StyleSheet.create({
  menuContainer: {
    flexDirection: "row",
    justifyContent: "space-around",
    backgroundColor: themes.colors.surface,
    paddingVertical: themes.spacing.sm,
    borderBottomWidth: 1,
    borderBottomColor: themes.colors.border,
    elevation: 3,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
  },
  menuItem: {
    alignItems: "center",
    justifyContent: "center",
    padding: themes.spacing.sm,
  },
  menuText: {
    fontSize: themes.typography.fontSize.small,
    fontWeight: themes.typography.fontWeight.semiBold,
    color: themes.colors.textLight,
    marginTop: 4,
  },
});
