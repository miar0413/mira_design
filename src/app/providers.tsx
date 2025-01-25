"use client";

import { ThemeProvider as NextThemeProvider } from "next-themes";
import { atom, useAtom } from "jotai";
import { atomWithStorage } from "jotai/utils";
import { useEffect, useState } from "react";
import type { LocaleType } from "@/locales";

// 修复序列化问题
const storage = {
  getItem: (key: string): LocaleType => {
    try {
      const item = localStorage.getItem(key);
      return item ? (item.replace(/['"]/g, '') as LocaleType) : "zh";
    } catch {
      return "zh";
    }
  },
  setItem: (key: string, value: LocaleType) => {
    try {
      localStorage.setItem(key, value);
    } catch (error) {
      console.warn('Failed to save language preference:', error);
    }
  },
  removeItem: (key: string) => {
    try {
      localStorage.removeItem(key);
    } catch (error) {
      console.warn('Failed to remove item:', error);
    }
  }
};

export const localeAtom = atomWithStorage<LocaleType>("locale", "zh", storage);

// 创建一个派生原子来处理文档语言
const documentLangAtom = atom(
  (get) => get(localeAtom),
  (get, set, newLocale: LocaleType) => {
    set(localeAtom, newLocale);
    if (typeof document !== "undefined") {
      document.documentElement.lang = newLocale;
    }
  }
);

export function ThemeProvider({ children }: { children: React.ReactNode }) {
  const [mounted, setMounted] = useState(false);
  const [, setLocale] = useAtom(documentLangAtom);

  useEffect(() => {
    setMounted(true);
    // 初始化时设置文档语言
    const savedLocale = localStorage.getItem("locale") as LocaleType;
    if (savedLocale) {
      setLocale(savedLocale);
    }
  }, [setLocale]);

  if (!mounted) {
    return null;
  }

  return (
    <NextThemeProvider
      attribute="class"
      defaultTheme="system"
      enableSystem
      disableTransitionOnChange
    >
      {children}
    </NextThemeProvider>
  );
}
