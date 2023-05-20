---
title: Spring Boot集成Mybatis
icon: frame
category:
- Spring Boot

---

# Spring Boot集成Mybatis

>Mybatis 是数据持久化的框架，市场上用的主流ROM框架。
>
>在本文中，将会介绍如何集成，以及CRUD，分页查询操作。

## 是什么

MyBatis 是一款优秀的持久层框架，它支持自定义 SQL、存储过程以及高级映射。

MyBatis 免除了几乎所有的 JDBC 代码以及设置参数和获取结果集的工作。

MyBatis 可以通过简单的 XML 或注解来配置和映射原始类型、接口和 Java POJO（Plain Old Java Objects，普通老式 Java 对象）为数据库中的记录。

## 怎么办

### 新建项目

![image-20230520115316000](/assets/springBootLearning/Spring-Boot-Tutorial/image-20230520-mybatis-build.png)

### 依赖配置

~~~xml
 <dependencies>
        <dependency>
            <groupId>org.springframework.boot</groupId>
            <artifactId>spring-boot-starter-web</artifactId>
        </dependency>
     
        <dependency>
            <groupId>org.mybatis.spring.boot</groupId>
            <artifactId>mybatis-spring-boot-starter</artifactId>
            <version>2.3.0</version>
        </dependency>

        <dependency>
            <groupId>mysql</groupId>
            <artifactId>mysql-connector-java</artifactId>
            <scope>runtime</scope>
        </dependency>

        <dependency>
            <groupId>org.projectlombok</groupId>
            <artifactId>lombok</artifactId>
            <optional>true</optional>
        </dependency>
     
        <dependency>
            <groupId>org.springframework.boot</groupId>
            <artifactId>spring-boot-starter-test</artifactId>
            <scope>test</scope>
        </dependency>
    </dependencies>
~~~

### 数据库配置

~~~yaml
server:
  port: 8080

spring:
  datasource:
    driver-class-name: com.mysql.jdbc.Driver
    username: xq
    password: XXXX
    url: jdbc:mysql://101.43.18.117:3306/db_example
mybatis:
  mapper-locations: classpath:mapper/*.xml
~~~

+ mapper-locations

  xml语句，resources 目录下不会被  MyBatis 自动扫描到，所以需要在 application.yml 配置文件中告诉 MyBatis 具体的扫描路径

### 实体类配置

~~~java
/**
 * Created by @author dabaoqiang on 2023/5/20.
 */
@Data
public class Article {

    private Integer id;

    private String title;

    private String author;
}
~~~

### Mybatis接口配置

~~~java
/**
 * Created by @author dabaoqiang on 2023/5/20.
 */
@Mapper
public interface ArticleMapper {

    /**
     * insert
     * @param user
     */
    @Insert("INSERT INTO article(title,author) VALUES(#{title}, #{author})")
    void insertAnnotation(Article user);
    List<Article> getAll();
    Article getOne(Long id);
    void insert(Article post);
    void update(Article post);
    void delete(Long id);

}
~~~

###  xml 配置

> 比较适合更加复杂的 SQL，接口层只定义空的方法，然后在 xml 中编写对应的 SQL。

+ xml sql语句编写

~~~xml
<?xml version="1.0" encoding="UTF-8"?>
<!DOCTYPE mapper PUBLIC "-//mybatis.org//DTD Mapper 3.0//EN" "http://mybatis.org/dtd/mybatis-3-mapper.dtd">
<mapper namespace="com.dbq.mybatis.ArticleMapper">
    <resultMap id="BaseResultMap" type="com.dbq.entity.Article">
        <id column="id" property="id"/>
        <result column="title" property="title"/>
        <result column="author" property="author"/>
    </resultMap>

    <sql id="Base_Column_List">
        id, title, author
    </sql>

    <select id="getAll" resultMap="BaseResultMap">
        select
        <include refid="Base_Column_List" />
        from article;
    </select>

    <select id="getOne" parameterType="java.lang.Long" resultMap="BaseResultMap" >
        SELECT
        <include refid="Base_Column_List" />
        FROM article
        WHERE id = #{id}
    </select>

    <insert id="insert" parameterType="com.dbq.entity.Article">
        insert into
            article
            (title,author)
        values
            (#{title},#{author});
    </insert>

    <update id="update" parameterType="com.dbq.entity.Article">
        update
        article
        set
        <if test="title != null">title=#{title},</if>
        <if test="author != null">author=#{author},</if>
        where id=#{id}
    </update>
    <delete id="delete">
        delete from
            article
        where
            id=#{id}
    </delete>
</mapper>
~~~

+ 位置：

![image-20230520115732924](/assets/springBootLearning/Spring-Boot-Tutorial/image-20230520-mybaits-xml-resource.png)

+ xml打包配置
  > Maven 打包的时候默认会忽略 xml 文件，为了避免这种情况发生，我们需要在 pom.xml 文件中添加配置。

~~~xml
    <build>
        <resources>
            <resource>
                <directory>src/main/java</directory>
                <includes>
                    <include>**/*.xml</include>
                </includes>
            </resource>
            <resource>
                <directory>src/main/resources</directory>
            </resource>
        </resources>
    </build>
~~~

### 服务&控制层配置

+ 接口

~~~java
/**
 * Created by @author dabaoqiang on 2023/5/20.
 */
public interface ArticleService {

    List<Article> getAll();
    Article getOne(Long id);
    void insert(Article post);
    void update(Article post);
    void delete(Long id);
}
~~~

+ 实现

~~~java
/**
 * Created by @author dabaoqiang on 2023/5/20.
 */
@Service
public class ArticleServiceimpl implements ArticleService {

    @Resource
    private ArticleMapper articleMapper;

    @Override
    public List<Article> getAll() {
        return articleMapper.getAll();
    }

    @Override
    public Article getOne(Long id) {
        return articleMapper.getOne(id);
    }

    @Override
    public void insert(Article post) {
        articleMapper.insert(post);
    }

    @Override
    public void update(Article post) {
        articleMapper.update(post);
    }

    @Override
    public void delete(Long id) {
        articleMapper.delete(id);
    }
}
~~~

+ 控制层

~~~java
/**
 * Created by @author dabaoqiang on 2023/5/20.
 */
@RestController
@RequestMapping("/api")
public class ArticleController {

    @Resource
    private ArticleService articleService;

    @PostMapping(path = "/v1/article")
    public Result addArticle(@RequestParam String author, @RequestParam String title) {
        Article n = new Article();
        n.setAuthor(author);
        n.setTitle(title);
        articleService.insert(n);
        return Result.success(n);
    }

    @GetMapping(path = "/v1/article/{id}")
    public Result addArticle(@PathVariable(value = "id") Long id) {
        return Result.success(articleService.getOne(id));
    }
}
~~~

### 启动类配置

~~~java
/**
 * @author dabaoqiang
 */
@MapperScan("com.dbq.mybatis")
@SpringBootApplication
public class StudySpringBootMybatisApplication {

	public static void main(String[] args) {
		SpringApplication.run(StudySpringBootMybatisApplication.class, args);
	}

}
~~~

+ @MapperScan("com.dbq.mybatis")

  >针对Autowired注入Service变成的Mapper代理，指定扫描范围。

## PostMan测试

+ 新增

  POST `http://localhost:8080/api/v1/article?author=xq&title=myabtis`

  ![image-20230520120703074](/assets/springBootLearning/Spring-Boot-Tutorial/image-20230520-mybatis-add.png)

+ 查询

  GET` http://localhost:8080/api/v1/article/2`

  ![image-20230520120829211](/assets/springBootLearning/Spring-Boot-Tutorial/image-20230520-myabtis-query.png)

## MyBatis-Plus

+ [MyBatis-Plus (opens new window)](https://github.com/baomidou/mybatis-plus)（简称 MP）是一个 [MyBatis (opens new window)](https://www.mybatis.org/mybatis-3/)的增强工具，在 MyBatis 的基础上只做增强不做改变，为简化开发、提高效率而生。
+ 为你简化生成  Mapper 、 Model 、 Service 、 Controller 层代码。

## 官网地址

[https://mybatis.org/mybatis-3/zh/index.html](https://mybatis.org/mybatis-3/zh/index.html)

[https://www.baomidou.com/](https://www.baomidou.com/)

## 项目地址
[https://github.com/dabaoqiang/openTechnology-learning.git](https://github.com/dabaoqiang/openTechnology-learning.git)

<div align=left>
<img src="/banner/qrcode_for_xq_258.jpg"><br></div>