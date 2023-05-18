---
title: 新建Spring Boot项目
icon: leaf
category:
- Spring Boot

---

# 新建Spring Boot项目

>Spring Boot是为了简化开发而集成的众多组件。
>
>本文将描述Spring Boot项目如何新建流程。

## 是什么

SpringBoot 使得创建独立的、基于 Spring 的生产级应用程序变得非常容易，你可以“运行”它。

## 怎么办

### 生成项目

+ 打开网址https://start.spring.io/

![image-20230516215730976](/assets/springBootLearning/Spring-Boot-Tutorial/image-build.png)

选择对应的依赖，然后点击generate生成项目，下载然后解压到目录。

+ idea 新建

![image-20230516221040371](/assets/springBootLearning/Spring-Boot-Tutorial/image-01-idea-Spring-Init.png)

+ 项目设置

![image-20230516221220770](/assets/springBootLearning/Spring-Boot-Tutorial/image-01-idea-spring-init02.png)

新建完成。

### 项目结构

![image-20230516220234871](/assets/springBootLearning/Spring-Boot-Tutorial/image-arch.png)

+ 一般结构

~~~te
com
  +- example
    +- project
      +- Application.java
      |
      +- domain
      |  +- Customer.java
      |  +- CustomerRepository.java
      |
      +- service
      |  +- CustomerService.java
      |
      +- controller
      |  +- CustomerController.java
      |
      +- config
      |  +- swagerConfig.java
      |
~~~

+ Application 启动文件
+ domain 实体类
+ service 服务
+ controller 控制层
+ config 配置信息

### 新建helloWorld

~~~java
@RestController
public class HelloWorldController {

    @GetMapping("api/v1/helloWorld")
    public String helloWorld(){
        return "hello World";
    }

}
~~~

### 启动项目

![image-20230516220849662](/assets/springBootLearning/Spring-Boot-Tutorial/image-01-start.png)

### 打印

~~~tex
  .   ____          _            __ _ _
 /\\ / ___'_ __ _ _(_)_ __  __ _ \ \ \ \
( ( )\___ | '_ | '_| | '_ \/ _` | \ \ \ \
 \\/  ___)| |_)| | | | | || (_| |  ) ) ) )
  '  |____| .__|_| |_|_| |_\__, | / / / /
 =========|_|==============|___/=/_/_/_/
 :: Spring Boot ::        (v2.1.9.RELEASE)

2023-05-16 22:08:50.527  INFO 3876 --- [           main] .s.s.b.s.StudySpringBootStartApplication : Starting StudySpringBootStartApplication on dabaoqiang with PID 3876 (D:\developer\document\openSource\openTechnology-learning\study-spring-boot-start\target\classes started by dabaoqiang in D:\developer\document\openSource\openTechnology-learning\study-spring-boot-start)
2023-05-16 22:08:50.529  INFO 3876 --- [           main] .s.s.b.s.StudySpringBootStartApplication : No active profile set, falling back to default profiles: default
2023-05-16 22:08:51.186  INFO 3876 --- [           main] o.s.b.w.embedded.tomcat.TomcatWebServer  : Tomcat initialized with port(s): 8080 (http)
2023-05-16 22:08:51.207  INFO 3876 --- [           main] o.apache.catalina.core.StandardService   : Starting service [Tomcat]
2023-05-16 22:08:51.207  INFO 3876 --- [           main] org.apache.catalina.core.StandardEngine  : Starting Servlet engine: [Apache Tomcat/9.0.26]
2023-05-16 22:08:51.271  INFO 3876 --- [           main] o.a.c.c.C.[Tomcat].[localhost].[/]       : Initializing Spring embedded WebApplicationContext
2023-05-16 22:08:51.271  INFO 3876 --- [           main] o.s.web.context.ContextLoader            : Root WebApplicationContext: initialization completed in 705 ms
2023-05-16 22:08:51.414  INFO 3876 --- [           main] o.s.s.concurrent.ThreadPoolTaskExecutor  : Initializing ExecutorService 'applicationTaskExecutor'
2023-05-16 22:08:51.552  INFO 3876 --- [           main] o.s.b.w.embedded.tomcat.TomcatWebServer  : Tomcat started on port(s): 8080 (http) with context path ''
2023-05-16 22:08:51.556  INFO 3876 --- [           main] .s.s.b.s.StudySpringBootStartApplication : Started StudySpringBootStartApplication in 1.241 seconds (JVM running for 1.835)

~~~

### curl访问

![image-20230516221821459](/assets/springBootLearning/Spring-Boot-Tutorial/image-01-curl-result.png)

## 项目地址
[https://github.com/dabaoqiang/openTechnology-learning.git](https://github.com/dabaoqiang/openTechnology-learning.git)

<div align=left>
<img src="/banner/qrcode_for_xq_258.jpg"><br></div>
