---
title: Spring Boot集成Mybatis生成代码及分页
icon: note
category:
- Spring Boot

---

# Spring Boot集成Mybatis生成代码及分页

>生成ORM映射文件工具类`mybatis-generator-core`，解放研发人员的双手。
>
>`pagehelper`, MyBatis，建议尝试该分页插件， 最方便使用的分页插件。

## 是什么

`MyBatis Generate `可以理解为一个插件，可以帮助你使用 SSM框架，根据数据库中的表，自动的生成JavaBean文件、对应的mapper接口、以及对应的mapper配置文件中大部分查询语句。

如果你也在用 `MyBatis`，建议尝试`pagehelper`分页插件，这一定是最方便使用的分页插件。分页插件支持任何复杂的单表、多表分页。

## 怎么办

### 新建项目

![image-20230521183052021](/assets/springBootLearning/Spring-Boot-Tutorial/image-20230521-mybatis-plus-build.png)

### 增加依赖

~~~xml
		<!-- MyBatis 生成器 -->
		<dependency>
			<groupId>org.mybatis.generator</groupId>
			<artifactId>mybatis-generator-core</artifactId>
			<version>1.3.7</version>
		</dependency>

		<!--Mysql数据库驱动-->
		<dependency>
			<groupId>mysql</groupId>
			<artifactId>mysql-connector-java</artifactId>
			<version>8.0.15</version>
		</dependency>
~~~

### 配置链接数据库配置

+ `generator.properties`

~~~xml
jdbc.driverClass=com.mysql.cj.jdbc.Driver
jdbc.connectionURL=jdbc:mysql://101.43.18.117:3306/db_example?useUnicode=true&characterEncoding=utf-8&serverTimezone=Asia/Shanghai
jdbc.userId=xq
jdbc.password=xxx
~~~

### 配置生成xm文件

+ `generatorConfig.xml`

~~~xml
<?xml version="1.0" encoding="UTF-8"?>
<!DOCTYPE generatorConfiguration
        PUBLIC "-//mybatis.org//DTD MyBatis Generator Configuration 1.0//EN"
        "http://mybatis.org/dtd/mybatis-generator-config_1_0.dtd">

<generatorConfiguration>
    <properties resource="generator.properties"/>
    <context id="MySqlContext" targetRuntime="MyBatis3" defaultModelType="flat">
        <property name="beginningDelimiter" value="`"/>
        <property name="endingDelimiter" value="`"/>
        <property name="javaFileEncoding" value="UTF-8"/>
        <!-- 为模型生成序列化方法-->
        <plugin type="org.mybatis.generator.plugins.SerializablePlugin"/>
        <!-- 为生成的Java模型创建一个toString方法 -->
        <plugin type="org.mybatis.generator.plugins.ToStringPlugin"/>
        <!--生成mapper.xml时覆盖原文件-->
        <plugin type="org.mybatis.generator.plugins.UnmergeableXmlMappersPlugin" />
        <!--可以自定义生成model的代码注释-->
        <commentGenerator type="com.dbq.mybatis.CommentGenerator">
            <!-- 是否去除自动生成的注释 true：是 ： false:否 -->
            <property name="suppressAllComments" value="true"/>
            <property name="suppressDate" value="true"/>
            <property name="addRemarkComments" value="true"/>
        </commentGenerator>
        <!--配置数据库连接-->
        <jdbcConnection driverClass="${jdbc.driverClass}"
                        connectionURL="${jdbc.connectionURL}"
                        userId="${jdbc.userId}"
                        password="${jdbc.password}">
            <!--解决mysql驱动升级到8.0后不生成指定数据库代码的问题-->
            <property name="nullCatalogMeansCurrent" value="true" />
        </jdbcConnection>

        <!--指定生成model的路径-->
        <javaModelGenerator targetPackage="com.dbq.mybatis.model" targetProject="D:\developer\document\openSource\openTechnology-learning\study-spring-boot-logback\src\main\java"/>
        <!--指定生成mapper.xml的路径-->
        <sqlMapGenerator targetPackage="com.dbq.mapper" targetProject="D:\developer\document\openSource\openTechnology-learning\study-spring-boot-logback\src\main\resources"/>
        <!--指定生成mapper接口的的路径-->
        <javaClientGenerator type="XMLMAPPER" targetPackage="com.dbq.mybatis.mapper" targetProject="D:\developer\document\openSource\openTechnology-learning\study-spring-boot-logback\src\main\java"/>
        <!--生成全部表tableName设为%-->
        <table tableName="article">
            <generatedKey column="id" sqlStatement="MySql" identity="true"/>
        </table>
    </context>
</generatorConfiguration>
~~~

### java工具类配置

+ `CommentGenerator`

~~~java
/**
 * Created by @author dabaoqiang on 2023/5/21.
 */
public class CommentGenerator extends DefaultCommentGenerator {

    private boolean addRemarkComments = false;
    private static final String EXAMPLE_SUFFIX = "Example";
//    private static final String API_MODEL_PROPERTY_FULL_CLASS_NAME = "io.swagger.annotations.ApiModelProperty";

    /**
     * 设置用户配置的参数
     */
    @Override
    public void addConfigurationProperties(Properties properties) {
        super.addConfigurationProperties(properties);
        this.addRemarkComments = StringUtility.isTrue(properties.getProperty("addRemarkComments"));
    }

    /**
     * 给字段添加注释
     */
    @Override
    public void addFieldComment(Field field, IntrospectedTable introspectedTable,
                                IntrospectedColumn introspectedColumn) {
        String remarks = introspectedColumn.getRemarks();
        //根据参数和备注信息判断是否添加备注信息
        if (addRemarkComments && StringUtility.stringHasValue(remarks)) {
//            addFieldJavaDoc(field, remarks);
            //数据库中特殊字符需要转义
            if (remarks.contains("\"")) {
                remarks = remarks.replace("\"", "'");
            }
            //给model的字段添加swagger注解
//            field.addJavaDocLine("@ApiModelProperty(value = \"" + remarks + "\")");
        }
    }

    /**
     * 给model的字段添加注释
     */
    private void addFieldJavaDoc(Field field, String remarks) {
        //文档注释开始
        field.addJavaDocLine("/**");
        //获取数据库字段的备注信息
        String[] remarkLines = remarks.split(System.getProperty("line.separator"));
        for (String remarkLine : remarkLines) {
            field.addJavaDocLine(" * " + remarkLine);
        }
        addJavadocTag(field, false);
        field.addJavaDocLine(" */");
    }

    @Override
    public void addJavaFileComment(CompilationUnit compilationUnit) {
        super.addJavaFileComment(compilationUnit);
//        //只在model中添加swagger注解类的导入
//        if (!compilationUnit.isJavaInterface() && !compilationUnit.getType().getFullyQualifiedName().contains(EXAMPLE_SUFFIX)) {
//            compilationUnit.addImportedType(new FullyQualifiedJavaType(API_MODEL_PROPERTY_FULL_CLASS_NAME));
//        }
    }
}
~~~

### 生成类方法

~~~java

/**
 * Created by @author dabaoqiang on 2023/5/21.
 */
public class Generator {

    public static void main(String[] args) throws Exception {
        //  执行过程中的警告信息
        List<String> warnings = new ArrayList<String>();
        //当生成的代码重复时，覆盖原代码
        boolean overwrite = true;
        //读取我们的   配置文件
        InputStream is = Generator.class.getResourceAsStream("/generatorConfig.xml");
        ConfigurationParser cp = new ConfigurationParser(warnings);
        Configuration config = cp.parseConfiguration(is);
        is.close();

        DefaultShellCallback callback = new DefaultShellCallback(overwrite);
        //创建
        MyBatisGenerator myBatisGenerator = new MyBatisGenerator(config, callback, warnings);
        //执行生成代码
        myBatisGenerator.generate(null);

        //输出警告信息
        for (String warning : warnings) {
            System.out.println(warning);
        }
    }
}
~~~

### 生成项目格式

![image-20230521183546248](/assets/springBootLearning/Spring-Boot-Tutorial/image-20230521-mybatis-plus-arch.png)

### 分页插件配置新增依赖

~~~xml
		<!--MyBatis分页插件-->
		<dependency>
			<groupId>com.github.pagehelper</groupId>
			<artifactId>pagehelper-spring-boot-starter</artifactId>
			<version>1.2.10</version>
		</dependency>
~~~

### 分页代码使用

在业务层新增

`  PageHelper.startPage(pageNum, pageSize);`

### 业务层&控制层描写

+ `ArticleService`

~~~java
/**
 * Created by @author dabaoqiang on 2023/5/21.
 */
public interface ArticleService {

    List<Article> getAll();
    List<Article> listArticle(int pageNum, int pageSize);
    Article getOne(Long id);
    void insert(Article article);
    void update(Article article);
    void delete(Long id);

}
~~~

+ `ArticleServiceImpl`

~~~java
/**
 * Created by @author dabaoqiang on 2023/5/21.
 */
@Slf4j
@Service
public class ArticleServiceImpl implements ArticleService {

    @Resource
    private ArticleMapper articleMapper;

    @Override
    public List<Article> getAll() {
        return articleMapper.selectByExample(new ArticleExample());
    }

    @Override
    public List<Article> listArticle(int pageNum, int pageSize) {
        PageHelper.startPage(pageNum, pageSize);
        return articleMapper.selectByExample(new ArticleExample());
    }

    @Override
    public Article getOne(Long id) {
        return articleMapper.selectByPrimaryKey(id.intValue());
    }

    @Override
    public void insert(Article article) {
        articleMapper.insert(article);
    }

    @Override
    public void update(Article article) {
        articleMapper.updateByPrimaryKey(article);
    }

    @Override
    public void delete(Long id) {
        articleMapper.deleteByPrimaryKey(id.intValue());
    }
}
~~~

+ ArticleMapper

  自动生成的mapper类

~~~java
/**
 * @author dabaoqiang
 */
public interface ArticleMapper {
    long countByExample(ArticleExample example);

    int deleteByExample(ArticleExample example);

    int deleteByPrimaryKey(Integer id);

    int insert(Article record);

    int insertSelective(Article record);

    List<Article> selectByExample(ArticleExample example);

    Article selectByPrimaryKey(Integer id);

    int updateByExampleSelective(@Param("record") Article record, @Param("example") ArticleExample example);

    int updateByExample(@Param("record") Article record, @Param("example") ArticleExample example);

    int updateByPrimaryKeySelective(Article record);

    int updateByPrimaryKey(Article record);
}
~~~

+ controller层调用

~~~java
/**
 * Created by @author dabaoqiang on 2023/5/21.
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


    @GetMapping(value = "/v1/article")
    public Result<CommonPage<Article>> listBrand(@RequestParam("pageNum") Integer pageNum,
                                                 @RequestParam("pageSize") Integer pageSize ) {
        List<Article> articles = articleService.listArticle(pageNum, pageSize);
        return Result.success(CommonPage.restPage(articles));
    }
}
~~~

### Postman测试

+ add

![image-20230521184053320](/assets/springBootLearning/Spring-Boot-Tutorial/image-20230521-mybaits-puls-add.png)

+ 分页查询

![image-20230521184138414](/assets/springBootLearning/Spring-Boot-Tutorial/image-20230521-myabtis-plus-page.png)

## 项目地址
[https://github.com/dabaoqiang/openTechnology-learning.git](https://github.com/dabaoqiang/openTechnology-learning.git)

<div align=left>
<img src="/banner/qrcode_for_xq_258.jpg"><br></div>