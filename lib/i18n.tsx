"use client";

import React, { createContext, useContext, useEffect, useMemo, useState } from "react";
import en from "@/data/i18n/en.json";
import zh from "@/data/i18n/zh-CN.json";
import type { Locale } from "@/lib/types";

const dictionaries = {
  en,
  "zh-CN": zh
};

type I18nContextValue = {
  locale: Locale;
  setLocale: (value: Locale) => void;
  t: (key: string, fallback?: string) => string;
};

const I18nContext = createContext<I18nContextValue | null>(null);

export function I18nProvider({ children }: { children: React.ReactNode }) {
  const defaultLocale = (process.env.NEXT_PUBLIC_DEFAULT_LOCALE as Locale) || "zh-CN";
  const [locale, setLocale] = useState<Locale>(defaultLocale);

  useEffect(() => {
    const stored = window.localStorage.getItem("steller-locale") as Locale | null;
    if (stored && dictionaries[stored]) {
      setLocale(stored);
    }
  }, []);

  useEffect(() => {
    window.localStorage.setItem("steller-locale", locale);
  }, [locale]);

  const value = useMemo<I18nContextValue>(() => ({
    locale,
    setLocale,
    t: (key, fallback) => dictionaries[locale][key as keyof typeof en] || fallback || key
  }), [locale]);

  return <I18nContext.Provider value={value}>{children}</I18nContext.Provider>;
}

export function useI18n() {
  const value = useContext(I18nContext);
  if (!value) {
    throw new Error("useI18n must be used within I18nProvider");
  }
  return value;
}
