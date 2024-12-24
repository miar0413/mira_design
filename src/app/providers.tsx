"use client";

import React, { createContext, useContext, useEffect, useState } from "react";
import { atom, useAtom } from "jotai";
import { Theme as RadixThemeProvider } from "@radix-ui/themes";
import { ThemeProvider as NextThemeProvider } from "next-themes";

import "@radix-ui/themes/styles.css";

type ThemeProviderProps = {
  children: React.ReactNode;
};

type ThemeContextType = {
  isDark: boolean;
  toggleDarkMode: () => void;
  language: string;
  setLanguage: (lang: string) => void;
};

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);
const isDarkAtom = atom(false);
const languageAtom = atom("zh");

export function ThemeProvider({ children }: ThemeProviderProps) {
  const [isDark, setIsDark] = useAtom(isDarkAtom);
  const [mounted, setMounted] = useState(false);
  const [language, setLanguage] = useAtom(languageAtom);

  const toggleDarkMode = () => {
    const newIsDark = !isDark;
    setIsDark(newIsDark);
    localStorage.setItem("isDark", String(newIsDark));
  };

  useEffect(() => {
    const isDarkMode =
      localStorage.getItem("isDark") === "true" ||
      (!localStorage.getItem("isDark") &&
        window.matchMedia("(prefers-color-scheme: dark)").matches);

    setIsDark(isDarkMode);
    if (isDarkMode) {
      document.documentElement.classList.add("dark");
    }

    const savedLanguage = localStorage.getItem("language");
    if (savedLanguage) {
      setLanguage(savedLanguage);
    }

    setMounted(true);
  }, [setIsDark, setLanguage]);

  if (!mounted) return null;

  return (
    <ThemeContext.Provider
      value={{ isDark, toggleDarkMode, language, setLanguage }}
    >
      <NextThemeProvider attribute="class">
        <RadixThemeProvider>{children}</RadixThemeProvider>
      </NextThemeProvider>
    </ThemeContext.Provider>
  );
}

export const useTheme = () => {
  const context = useContext(ThemeContext);
  if (context === undefined) {
    throw new Error("useTheme must be used within a ThemeProvider");
  }
  return context;
};
