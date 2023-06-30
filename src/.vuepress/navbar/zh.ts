import { navbar } from "vuepress-theme-hope";

export const zhNavbar = navbar([
  "/",

  { text: "Java学习教程", icon: "code", link: "/java/" },

  { text: "SpringBoot学习教程", icon: "discover", link: "/SpringBootLearning/README.md" },

  { text: "SpringCloud学习教程", icon: "discover", link: "/SpringCloudLearning/" },

  { text: "SpringCloudAlibaba学习教程", icon: "code", link: "/SpringCloudAlibabaLearning/README.md" },

  // {
  //   text: "更多",
  //   icon: "creative",
  //   prefix: "/zh/other/",
  //   children: [
  //     {
  //       text: "k8s学习教程",
  //       icon: "config",
  //       prefix: "/",
  //       link:"k8s"
  //     },
  //     {
  //       text: "MQ学习教程",
  //       icon: "config",
  //       prefix: "/",
  //       link:"MQ"
  //     },
  //   ],
  // },
]);
