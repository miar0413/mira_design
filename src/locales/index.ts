export const locales = {
  zh: {
    home: "首页",
    about: "关于",
    projects: "项目",
    language: "English",
  },
  en: {
    home: "Home",
    about: "About",
    projects: "Projects",
    language: "中文",
  },
};

export type LocaleType = keyof typeof locales; 