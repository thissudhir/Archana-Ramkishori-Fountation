import { createTheme } from "@mui/material/styles";

// Premium color palette
export const colors = {
  primary: "#1a1f36", // Deep Space Blue
  secondary: "#00f2ea", // Electric Cyan
  accent: "#ff6b6b", // Coral Red
  gold: "#ffd700", // Premium Gold
  light: "#f8f9fc", // Ethereal White
  dark: "#141729", // Midnight Blue
  gradient: {
    primary: "linear-gradient(135deg, #1a1f36 0%, #141729 100%)",
    accent: "linear-gradient(45deg, #00f2ea, #00d4ff)",
    gold: "linear-gradient(45deg, #ffd700, #ffb347)",
  },
};

const theme = createTheme({
  palette: {
    primary: {
      main: colors.primary,
      light: colors.light,
      dark: colors.dark,
    },
    secondary: {
      main: colors.secondary,
    },
    error: {
      main: colors.accent,
    },
    background: {
      default: colors.light,
      paper: colors.light,
    },
    text: {
      primary: colors.primary,
      secondary: colors.dark,
    },
  },
  typography: {
    fontFamily: '"Poppins", "Arial", sans-serif',
    h1: {
      fontWeight: 800,
      letterSpacing: "0.05em",
      backgroundImage: colors.gradient.gold,
      WebkitBackgroundClip: "text",
      WebkitTextFillColor: "transparent",
    },
    h2: {
      fontWeight: 700,
      letterSpacing: "0.04em",
    },
    h3: {
      fontWeight: 600,
      letterSpacing: "0.03em",
    },
    button: {
      textTransform: "none",
      fontWeight: 600,
      letterSpacing: "0.05em",
    },
  },
  components: {
    MuiButton: {
      styleOverrides: {
        root: {
          borderRadius: "50px",
          padding: "12px 32px",
        },
        contained: {
          background: colors.gradient.accent,
          color: colors.primary,
          "&:hover": {
            boxShadow: `0 0 30px ${colors.secondary}66`,
          },
        },
        outlined: {
          borderWidth: "2px",
          "&:hover": {
            borderWidth: "2px",
            boxShadow: `0 0 20px ${colors.secondary}33`,
          },
        },
      },
    },
    MuiCard: {
      styleOverrides: {
        root: {
          borderRadius: "16px",
          boxShadow: "0 8px 32px rgba(0,0,0,0.1)",
        },
      },
    },
    MuiAppBar: {
      styleOverrides: {
        root: {
          background: colors.gradient.primary,
        },
      },
    },
  },
});

export default theme;
