import { StyleSheet } from "react-native";
import { themes } from "../../global/themes";

export const style = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: themes.colors.background,
  },
  header: {
    backgroundColor: themes.colors.primary,
    paddingTop: 60,
    paddingBottom: 20,
    paddingHorizontal: themes.spacing.lg,
    borderBottomLeftRadius: 24,
    borderBottomRightRadius: 24,
    elevation: 4,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.15,
    shadowRadius: 8,
  },
  headerTitle: {
    fontSize: themes.typography.fontSize.header,
    fontWeight: themes.typography.fontWeight.bold,
    color: themes.colors.surface,
  },
  content: {
    flex: 1,
    padding: themes.spacing.lg,
  },
  sectionTitle: {
    fontSize: themes.typography.fontSize.title,
    fontWeight: themes.typography.fontWeight.bold,
    color: themes.colors.text,
    marginBottom: themes.spacing.sm,
  },
  description: {
    fontSize: themes.typography.fontSize.small,
    color: themes.colors.textLight,
    marginBottom: themes.spacing.lg,
    lineHeight: 20,
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
    marginBottom: themes.spacing.lg,
  },
  input: {
    flex: 1,
    fontSize: themes.typography.fontSize.regular,
    color: themes.colors.text,
    marginRight: themes.spacing.sm,
  },
  saveButton: {
    backgroundColor: themes.colors.primary,
    height: 50,
    borderRadius: 8,
    alignItems: "center",
    justifyContent: "center",
    flexDirection: "row",
  },
  saveButtonText: {
    color: themes.colors.surface,
    fontSize: themes.typography.fontSize.regular,
    fontWeight: themes.typography.fontWeight.bold,
    marginLeft: 8,
  },
  infoCard: {
    backgroundColor: themes.colors.lighGray || "#E0E0E0",
    padding: themes.spacing.md,
    borderRadius: 8,
    marginTop: themes.spacing.xl,
    borderLeftWidth: 4,
    borderLeftColor: themes.colors.secondary,
  },
  infoText: {
    fontSize: themes.typography.fontSize.small,
    color: themes.colors.text,
    lineHeight: 20,
  },
});
