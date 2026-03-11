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
  searchContainer: {
    flexDirection: "row",
    marginBottom: themes.spacing.lg,
  },
  input: {
    flex: 1,
    backgroundColor: themes.colors.surface,
    borderWidth: 1,
    borderColor: themes.colors.border,
    borderRadius: 8,
    paddingHorizontal: themes.spacing.md,
    height: 50,
    fontSize: themes.typography.fontSize.regular,
    color: themes.colors.text,
    marginRight: themes.spacing.sm,
  },
  searchButton: {
    backgroundColor: themes.colors.secondary,
    width: 50,
    height: 50,
    borderRadius: 8,
    alignItems: "center",
    justifyContent: "center",
  },
  repoCard: {
    backgroundColor: themes.colors.surface,
    padding: themes.spacing.md,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: themes.colors.border,
    marginBottom: themes.spacing.md,
  },
  repoTitle: {
    fontSize: themes.typography.fontSize.title,
    fontWeight: themes.typography.fontWeight.bold,
    color: themes.colors.primary,
    marginBottom: 4,
  },
  repoDescription: {
    fontSize: themes.typography.fontSize.small,
    color: themes.colors.textLight,
    marginTop: 4,
  },
});
