export const themes = {
  colors: {
    primary: "#24292e", // Cor principal
    secondary: "#2ea44f", // Cor de destaque/ações (Verde GitHub)
    background: "#f6f8fa", // Fundo geral
    surface: "#ffffff", // Fundo de cartões
    text: "#24292e", // Texto principal
    textLight: "#586069", // Texto secundário
    border: "#e1e4e8", // Bordas
    error: "#cb2431", // Alertas de erro
  },
  spacing: {
    sm: 8,
    md: 16,
    lg: 24,
    xl: 32,
  },
  typography: {
    fontSize: {
      small: 12,
      regular: 16,
      title: 20,
      header: 28,
    },
    fontWeight: {
      regular: "400" as const,
      semiBold: "600" as const,
      bold: "700" as const,
    },
  },
};
