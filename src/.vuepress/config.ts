import { defineUserConfig } from "vuepress";
import theme from "./theme.js";

export default defineUserConfig({
  base: "/doc/",

  locales: {
    "/": {
      lang: "zh-CN",
      title: "学习教程",
      description: "学习教程",
    },
  },

  theme,

  shouldPrefetch: false,

  // Enable it with pwa
  // shouldPrefetch: false,
});
