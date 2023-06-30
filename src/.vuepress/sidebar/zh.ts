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
            icon: "read",
            text: "Java-Base",
            prefix: "Java-Base/",
            link: "Java-Base/",
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
        {
            icon: "build",
            text: "Spring-Boot-Tutorial",
            prefix: "Spring-Boot-Tutorial/",
            link: "Spring-Boot-Tutorial/",
            collapsible: true,
            children: "structure",
        },
        {
            icon: "read",
            text: "Spring-Security-Tutorial",
            prefix: "Spring-Security-Tutorial/",
            link: "Spring-Security-Tutorial/",
            collapsible: true,
            children: "structure",
        },
        {
            icon: "leaf",
            text: "Spring-Resource",
            prefix: "Spring-Resource/",
            link: "Spring-Resource/",
            collapsible: true,
            children: "structure",
        },
    ],

    "/SpringCloudLearning/": [
        "",

        {
            icon: "build",
            text: "Spring Cloud",
            prefix: "Spring Cloud/",
            link: "Spring Cloud/",
            collapsible: true,
            children: "structure",
        },
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
