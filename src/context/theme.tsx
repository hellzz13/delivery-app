"use client";

import { ThemeProvider, createTheme } from "@mui/material";
import * as React from "react";

interface IContext {}

interface IProvider {
  children: React.ReactNode;
}

const Context = React.createContext<IContext>({});

const ThemeContext: React.FC<IProvider> = ({ children }) => {
  const value = React.useMemo(() => {}, []);
  const theme = createTheme({
    palette: {
      primary: {
        main: "#8B6CFC",
      },

      secondary: {
        main: "#19212C",
      },
      background: {
        default: "#1e2535",
      },
      text: {
        primary: "#000",
        secondary: "#c2c2c2",
      },
    },
    components: {
      MuiTextField: {
        styleOverrides: {
          root: { backgroundColor: "#fff" },
        },
      },
    },
  });
  return (
    <Context.Provider value={{ value }}>
      <ThemeProvider theme={theme}>{children}</ThemeProvider>
    </Context.Provider>
  );
};

export type { IContext };

export { ThemeContext };
