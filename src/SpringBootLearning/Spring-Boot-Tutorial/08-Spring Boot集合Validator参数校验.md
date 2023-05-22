---
title: Spring Boot集合Validator参数校验
icon: article
category:
- Spring Boot

---

# Spring Boot集合Validator参数校验

>请求参数有些需要验证格式，是否为空，写在代码里面就太low了。
>
>本文将会介绍如何进行请求数据的验证。

## 是什么

`Java API`规范(`JSR303`)定义了`Bean`校验的标准`validation-api`，但没有提供实现。

`hibernate validation`是对这个规范的实现，并增加了校验注解如`@Email`、`@Length`等。

`Spring Validation`是对`hibernate validation`的二次封装，用于支持`spring mvc`参数自动校验。

## 怎么办

### 新建项目

![image-20230522215308419](/assets/springBootLearning/Spring-Boot-Tutorial/image-20230522-validation-build.png)

Spring Boot 2.3 1 之后，`spring-boot-starter-validation` 已经不包括在了 `spring-boot-starter-web` 中，需要我们手动加上！

### 引入依赖

~~~xml
		<!--数据验证-->
		<dependency>
			<groupId>org.springframework.boot</groupId>
			<artifactId>spring-boot-starter-validation</artifactId>
		</dependency>
~~~

### 验证 `Controller`

+ `BookController`

~~~java
/**
 * Created by @author dabaoqiang on 2023/5/22.
 */
@RestController
@RequestMapping("/api")
public class BookController {

    @Resource
    private BookService bookService;

    @PostMapping("/v1/book")
    public ResponseEntity<BookRequest> save(@RequestBody @Valid BookRequest personRequest) {
        return ResponseEntity.ok().body(personRequest);
    }

    @PostMapping("/v2/book")
    public ResponseEntity<BookRequest> saveBookService(@RequestBody BookRequest bookRequest) {
        bookService.saveBook(bookRequest);
        return ResponseEntity.ok().body(bookRequest);
    }

}
~~~

+ `entity`

~~~java

/**
 * Created by @author dabaoqiang on 2023/5/22.
 */
@Data
@Builder
@AllArgsConstructor
@NoArgsConstructor
public class BookRequest  implements Serializable {

    private static final long serialVersionUID = -2005077445556230393L;

    @NotNull(message = "id 不能为空")
    private String id;

    @Size(max = 33)
    @NotEmpty(message = "author 不能为空")
    private String author;

    @Pattern(regexp = "(^Man$|^Woman$|^UGM$)", message = "title 值不在可选范围")
    @NotNull(message = "title 不能为空")
    private String title;

}

~~~

+ `@RequestBody @Valid BookRequest personRequest`

  controller 发挥验证效果

### 测试

![image-20230522222301809](/assets/springBootLearning/Spring-Boot-Tutorial/image-20230522-controller.png)

### 验证请求参数

+ `BookControllerV2`

~~~java
/**
 * Created by @author dabaoqiang on 2023/5/22.
 * @PathVariable path检验
 * @RequestParam 请求参数校验
 */
@RestController
@RequestMapping("/api")
@Validated
public class BookControllerV2 {

    @GetMapping("/v1/book/{id}")
    public ResponseEntity<Integer> getPersonByID(@Valid @PathVariable("id") @Max(value = 110000, message = "超过 id 的范围了") Integer id) {
        return ResponseEntity.ok().body(id);
    }

    @GetMapping("/v1/book")
    public ResponseEntity<String> getPersonByName(@Valid @RequestParam("name") @NotEmpty(message = "name不能为空") String name) {
        return ResponseEntity.ok().body(name);
    }

}
~~~

+ 启动

  controller类新增 @Validated注解。

  @Valid @PathVariable("id") @Max(value = 110000, message = "超过 id 的范围了" 增加对应注解。

### 测试

+ 路径参数

  `@PathVariable`

![image-20230522225106568](/assets/springBootLearning/Spring-Boot-Tutorial/image-20230522-path.png)

+ 请求参数

  `@RequestParam`

![image-20230522225159531](/assets/springBootLearning/Spring-Boot-Tutorial/image-20230522-requestParameter.png)

### 验证 `Service` 中的方法

>推荐使用这种写法，不在`controller`增加不必要注解，应该在业务层增加判断非空处理。
>
>只需要将注解写到service层即可。

+ 接口`BookService`
+ `@Validated `进行注解。
+ `@Valid` 进行注解。

~~~
/**
 * Created by @author dabaoqiang on 2023/5/22.
 */
@Validated
public interface BookService {

    /**
     * saveBook
     * @param bookRequest
     */
   void saveBook(@Valid BookRequest bookRequest);
}

~~~

+ 实现类

  正常实现逻辑，不用注解。

~~~java
/**
 * Created by @author dabaoqiang on 2023/5/22.
 */
@Service
public class BookServiceImpl implements BookService {

    @Override
    public void saveBook(BookRequest bookRequest) {
        System.out.println(bookRequest.toString());
    }
}
~~~

### 测试

![image-20230522225510019](/assets/springBootLearning/Spring-Boot-Tutorial/image-20230522-service-validation.png)

## 常用校验注解总结

`JSR303` 定义了 `Bean Validation`（校验）的标准 `validation-api`，并没有提供实现。`Hibernate Validation`是对这个规范/规范的实现 `hibernate-validator`，并且增加了 `@Email`、`@Length`、`@Range` 等注解。`Spring Validation` 底层依赖的就是`Hibernate Validation`。

**JSR 提供的校验注解**:

- `@Null` 被注释的元素必须为 null
- `@NotNull` 被注释的元素必须不为 null
- `@AssertTrue` 被注释的元素必须为 true
- `@AssertFalse` 被注释的元素必须为 false
- `@Min(value)` 被注释的元素必须是一个数字，其值必须大于等于指定的最小值
- `@Max(value)` 被注释的元素必须是一个数字，其值必须小于等于指定的最大值
- `@DecimalMin(value)` 被注释的元素必须是一个数字，其值必须大于等于指定的最小值
- `@DecimalMax(value)` 被注释的元素必须是一个数字，其值必须小于等于指定的最大值
- `@Size(max=, min=)` 被注释的元素的大小必须在指定的范围内
- `@Digits (integer, fraction)` 被注释的元素必须是一个数字，其值必须在可接受的范围内
- `@Past` 被注释的元素必须是一个过去的日期
- `@Future` 被注释的元素必须是一个将来的日期
- `@Pattern(regex=,flag=)` 被注释的元素必须符合指定的正则表达式

**Hibernate Validator 提供的校验注解**：

- `@NotBlank(message =)` 验证字符串非 null，且长度必须大于 0
- `@Email` 被注释的元素必须是电子邮箱地址
- `@Length(min=,max=)` 被注释的字符串的大小必须在指定的范围内
- `@NotEmpty` 被注释的字符串的必须非空
- `@Range(min=,max=,message=)` 被注释的元素必须在合适的范围内

## 项目地址
[https://github.com/dabaoqiang/openTechnology-learning.git](https://github.com/dabaoqiang/openTechnology-learning.git)

<div align=left>
<img src="/banner/qrcode_for_xq_258.jpg"><br></div>