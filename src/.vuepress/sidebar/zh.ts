import {sidebar} from "vuepress-theme-hope";

export const zhSidebar = sidebar({

    "/java/": [
        "",
        {
            icon: "leaf",
            text: "Design-Patterns",
            prefix: "Design-Patterns/",
            link: "Design-Patterns/",
            collapsible: true,
            children: "structure",
        },
        {
            icon: "build",
            text: "System-Design",
            prefix: "System-Design/",
            link: "System-Design/",
            collapsible: true,
            children: "structure",
        },
    ],

    "/SpringBootLearning/": [
        "",
        // {
        //     icon: "code",
        //     text: "SpringBootLearning",
        //     prefix: "/",
        //     link: "/",
        //     collapsible: true,
        //     children: "structure",
        // },
    ],

    "/SpringCloudLearning/": [
        "",
        // {
        //     icon: "code",
        //     text: "SpringCloudLearning",
        //     prefix: "/",
        //     link: "/",
        //     collapsible: true,
        //     children: "structure",
        // },
    ],


    "/SpringCloudAlibabaLearning/": [
        "",
        // {
        //     icon: "code",
        //     text: "SpringCloudAlibabaLearning",
        //     prefix: "/",
        //     link: "/",
        //     collapsible: true,
        //     children: "structure",
        // },
    ],


});
