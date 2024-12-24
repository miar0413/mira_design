export const locales = {
  zh: {
    home: "首页",
    about: "关于",
    projects: "项目",
    switchLanguage: "English",
    lightMode: "lightMode",
    darkMode: "darkMode",
  },
  en: {
    home: "Home",
    about: "About",
    projects: "Projects",
    switchLanguage: "中文",
    lightMode: "lightMode",
    darkMode: "darkMode",
  },
};

export type LocaleType = keyof typeof locales; 