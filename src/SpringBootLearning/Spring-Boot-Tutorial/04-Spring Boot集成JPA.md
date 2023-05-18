---
title: Spring Boot集成JPA
icon: note
category:
- Spring Boot

---

# Spring Boot集成JPA

>JPA全名是Java Persistence API，是将数据持久化到数据库的一个框架。
>
>本文将介绍如何集成 JPA，并且完成CRUD操作。

## 是什么

SpringDataJPA 提供了对 JakartaPerstanceAPI (JPA)的存储库支持。它简化了需要访问 JPA 数据源的应用程序的开发。

基于JPA的标准数据进行操作。简化操作持久层的代码。只需要编写接口就可以。

## 怎么办

### 创建项目

![image-20230518211848428](/assets/springBootLearning/Spring-Boot-Tutorial/image-20230518-jpa-new.png)

### 依赖配置

+ jpa

~~~xml
		<dependency>
			<groupId>org.springframework.boot</groupId>
			<artifactId>spring-boot-starter-data-jpa</artifactId>
		</dependency>
~~~

+ 数据库驱动

~~~xml
		<dependency>
			<groupId>mysql</groupId>
			<artifactId>mysql-connector-java</artifactId>
			<scope>runtime</scope>
		</dependency>
~~~

### 数据库配置

~~~properties
server.port=8080

spring.jpa.hibernate.ddl-auto=update
spring.datasource.url=jdbc:mysql://101.43.18.117:3306/db_example
spring.datasource.username=xq
spring.datasource.password=xq123!
spring.datasource.driver-class-name=com.mysql.jdbc.Driver
spring.jpa.show-sql= true
~~~

+ 简述

`jpa:hibernate:ddl-auto: update`是`hibernate`的配置属性.

其主要作用是：自动创建、更新、验证数据库表结构。

该参数的几种配置如下：

1. create：每次加载hibernate时都会删除上一次的生成的表，然后根据你的model类再重新来生成新表，哪怕两次没有任何改变也要这样执行，这就是导致数据库表数据丢失的一个重要原因。
2. create-drop：每次加载hibernate时根据model类生成表，但是sessionFactory一关闭,表就自动删除。
3. update：最常用的属性，第一次加载hibernate时根据model类会自动建立起表的结构（前提是先建立好数据库），以后加载hibernate时根据model类自动更新表结构，即使表结构改变了但表中的行仍然存在不会删除以前的行。要注意的是当部署到服务器后，表结构是不会被马上建立起来的，是要等应用第一次运行起来后才会。
4. validate：每次加载hibernate时，验证创建数据库表结构，只会和数据库中的表进行比较，不会创建新表，但是会插入新值。

### 实体配置

~~~java
/**
 * Created by @author dabaoqiang on 2023/5/18.
 */
@Entity
public class User {

    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private Integer id;

    private String name;

    private String email;

    public Integer getId() {
        return id;
    }

    public void setId(Integer id) {
        this.id = id;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public String getEmail() {
        return email;
    }

    public void setEmail(String email) {
        this.email = email;
    }
}
~~~

### 持久层接口处理

~~~java
/**
 * Created by @author dabaoqiang on 2023/5/18.
 */
public interface UserRepository extends CrudRepository<User, Integer> {

}
~~~

### 控制层处理

~~~java
/**
 * Created by @author dabaoqiang on 2023/5/18.
 */
@RestController
@RequestMapping(value = "/api")
public class MainController {

    @Autowired
    private UserRepository userRepository;

    @PostMapping(path = "/v1/users")
    public Result addNewUser(@RequestParam String name, @RequestParam String email) {
        User n = new User();
        n.setName(name);
        n.setEmail(email);
        userRepository.save(n);
        return Result.success(n);
    }

    @GetMapping(path = "/v1/users")
    public Result getAllUsers() {
        return Result.success(userRepository.findAll());
    }

}

~~~

### postMan请求

+ 新增

  ![image-20230518230829099](/assets/springBootLearning/Spring-Boot-Tutorial/image-20230518-jpa-add.png)



+ 查询

  ![image-20230518230857725](/assets/springBootLearning/Spring-Boot-Tutorial/image-20230518-query.png)

## 参考

[https://spring.io/guides/gs/accessing-data-mysql/](https://spring.io/guides/gs/accessing-data-mysql/)

[https://github.com/spring-guides/gs-accessing-data-mysql/blob/main/README.adoc](https://github.com/spring-guides/gs-accessing-data-mysql/blob/main/README.adoc)

## 项目地址
[https://github.com/dabaoqiang/openTechnology-learning.git](https://github.com/dabaoqiang/openTechnology-learning.git)

<div align=left>
<img src="/banner/qrcode_for_xq_258.jpg"><br></div>