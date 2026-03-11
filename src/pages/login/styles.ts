import { StyleSheet } from "react-native";
import { themes } from "../../global/themes";

export const style = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: themes.colors.background,
    paddingHorizontal: themes.spacing.lg,
    justifyContent: "center",
  },
  boxTop: {
    alignItems: "center",
    marginBottom: themes.spacing.xl,
  },
  title: {
    fontSize: themes.typography.fontSize.header,
    fontWeight: themes.typography.fontWeight.bold,
    color: themes.colors.text,
    marginTop: themes.spacing.md,
  },
  label: {
    fontSize: themes.typography.fontSize.regular,
    fontWeight: themes.typography.fontWeight.semiBold,
    color: themes.colors.textLight,
    marginBottom: themes.spacing.sm,
    marginTop: themes.spacing.md,
  },
  inputContainer: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: themes.colors.surface,
    borderWidth: 1,
    borderColor: themes.colors.border,
    borderRadius: 8,
    paddingHorizontal: themes.spacing.md,
    height: 50,
  },
  input: {
    flex: 1,
    fontSize: themes.typography.fontSize.regular,
    color: themes.colors.text,
  },
  button: {
    backgroundColor: themes.colors.secondary,
    paddingVertical: themes.spacing.md,
    borderRadius: 8,
    alignItems: "center",
    marginTop: themes.spacing.xl,
  },
  buttonText: {
    color: themes.colors.surface,
    fontSize: themes.typography.fontSize.regular,
    fontWeight: themes.typography.fontWeight.bold,
  },
  linkText: {
    color: themes.colors.textLight,
    textAlign: "center",
    marginTop: themes.spacing.lg,
  },
  linkHighlight: {
    color: themes.colors.secondary,
    fontWeight: themes.typography.fontWeight.bold,
  },
});
