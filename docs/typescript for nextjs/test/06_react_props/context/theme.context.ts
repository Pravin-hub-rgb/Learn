"use client";

import { ThemeState, ThemeAction } from "@/types/theme";
import { createContext } from "react";

type ThemeContextType = {
  state: ThemeState;
  dispatch: React.Dispatch<ThemeAction>;
}

const defaultContext: ThemeContextType = {
  state: {
    theme: "light",
    fontSize: 16
  },
  dispatch: () => {}
}

export const ThemeContext = createContext<ThemeContextType>(defaultContext)