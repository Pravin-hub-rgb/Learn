"use client";

import { ThemeState } from "@/types/theme";
import { createContext } from "react";

const defaultState: ThemeState = {
  theme: "light",
  fontSize: 16,
};

export const ThemeContext = createContext<ThemeState>(defaultState);