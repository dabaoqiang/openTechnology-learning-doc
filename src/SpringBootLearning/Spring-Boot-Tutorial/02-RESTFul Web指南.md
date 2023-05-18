---
title: RESTful Web 教程
icon: article
category:
- Spring Boot

---
# RESTful Web 指南

>RESTful  资源表现层状态转移，资源操作。
>
>在本文中会描述符合RESful接口标准。

## 是什么

使用Spring Boot项目实现Http 四种状态改变动作

## 怎么办

### RESTful风格

前端根据请求返回的HttpStatus确定接口是否请求成功。

API统一返回字段：code，data，msg。

+ code：给开发人员看的状态码。
+ data：给前端的数据。
+ msg：给前端提示信息。

### 创建项目

![image-20230516231243362](/assets/springBootLearning/Spring-Boot-Tutorial/image-02-build-project.png)

### 项目结构

![image-20230516234644705](/assets/springBootLearning/Spring-Boot-Tutorial/image-02-arch.png)

### 设置统一返回结果

~~~java
public interface IResultCode extends Serializable {
    /**
     * 消息
     * @return String
     */
    String getMessage();

    /**
     * 状态码
     * @return int
     */
    int getCode();
}
~~~

~~~java

/**
 * Created by @author dabaoqiang on 2023/5/16.
 */
@Getter
public enum ResultCode implements IResultCode {

  SUCCESS(1001, HttpStatus.OK, "操作成功"),
  FAILURE(1002, HttpStatus.BAD_REQUEST, "业务异常"),
  UN_AUTHORIZED(1003, HttpStatus.UNAUTHORIZED, "请求未授权"),
  NOT_FOUND(1004, HttpStatus.NOT_FOUND, "404 没找到请求"),
  MSG_NOT_READABLE(1005, HttpStatus.BAD_REQUEST, "消息不能读取"),
  METHOD_NOT_SUPPORTED(1006, HttpStatus.METHOD_NOT_ALLOWED, "不支持当前请求方法"),
  MEDIA_TYPE_NOT_SUPPORTED(1007, HttpStatus.UNSUPPORTED_MEDIA_TYPE, "不支持当前媒体类型"),
  REQ_REJECT(1008,HttpStatus.FORBIDDEN ,"请求被拒绝"),
  INTERNAL_SERVER_ERROR(1009,HttpStatus.INTERNAL_SERVER_ERROR, "服务器异常"),
  PARAM_MISS(1010,HttpStatus.BAD_REQUEST, "缺少必要的请求参数"),
  PARAM_TYPE_ERROR(1011,HttpStatus.BAD_REQUEST, "请求参数类型错误"),
  PARAM_BIND_ERROR(1012,HttpStatus.BAD_REQUEST, "请求参数绑定错误"),
  PARAM_VALID_ERROR(1013,HttpStatus.BAD_REQUEST, "参数校验失败");

  /**
   * code 内部系统查询异常
   */
  private final int code;
  /**
   * HttpStatus
   */
  private final HttpStatus status;
  /**
   * 提示信息
   */
  private final String message;

  ResultCode(int code, HttpStatus status, String message) {
    this.code = code;
    this.status = status;
    this.message = message;
  }

  @Override
  public String toString() {
    return "ResultCode{" +
            "code=" + code +
            ", status=" + status +
            ", message='" + message + '\'' +
            '}';
  }
}
~~~

~~~java

/**
 * Created by @author dabaoqiang on 2023/5/16.
 */
@Data
public class Result<T> implements Serializable {

  private static final long serialVersionUID = 434357098727622813L;
  /**
   * 给开发人员看的状态码
   */
  private int code;
  /**
   * 给前端的数据
   */
  private T data;
  /**
   * 给前端提示信息
   */
  private String msg;

  private Result(IResultCode resultCode) {
    this(resultCode, null, resultCode.getMessage());
  }

  private Result(IResultCode resultCode, String msg) {
    this(resultCode, null, msg);
  }

  private Result(IResultCode resultCode, T data) {
    this(resultCode, data, resultCode.getMessage());
  }

  private Result(IResultCode resultCode, T data, String msg) {
    this(resultCode.getCode(), data, msg);
  }

  private Result(int code, T data, String msg) {
    this.code = code;
    this.data = data;
    this.msg = msg;
  }

  public static <T> Result<T> success(String msg) {
    return new Result<>(ResultCode.SUCCESS, msg);
  }

  public static <T> Result<T> success(T data) {
    return new Result<>(ResultCode.SUCCESS, data, ResultConstant.DEFAULT_SUCCESS_MESSAGE);
  }

  public static <T> Result<T> success(IResultCode resultCode) {
    return new Result<>(resultCode);
  }

  public static <T> Result<T> success(IResultCode resultCode, String msg) {
    return new Result<>(resultCode, msg);
  }

  public static <T> Result<T> fail(String msg) {
    return new Result<>(ResultCode.FAILURE, msg);
  }

  public static <T> Result<T> fail(int code, String msg) {
    return new Result<>(code, null, msg);
  }

  public static <T> Result<T> fail(IResultCode resultCode) {
    return new Result<>(resultCode);
  }

  public static <T> Result<T> fail(IResultCode resultCode, String msg) {
    return new Result<>(resultCode, msg);
  }

}
~~~

~~~java

/**
 * Created by @author dabaoqiang on 2023/5/16.
 */
public interface ResultConstant
{
    /**
     * 默认为空消息
     */
    String DEFAULT_NULL_MESSAGE = "暂无数据";
    /**
     * 默认成功消息
     */
    String DEFAULT_SUCCESS_MESSAGE = "操作成功";
    /**
     * 默认失败消息
     */
    String DEFAULT_FAILURE_MESSAGE = "操作失败";
}

~~~

### 新建符合RESTful接口

~~~java
/**
 * Created by @author dabaoqiang on 2023/5/16.
 */
@RestController
@RequestMapping("/api")
public class BookController {

    private List<Book> books = new ArrayList<>();

    @PostMapping("/v1/books")
    public Result<List<Book>> addBook(@RequestBody Book book) {
        books.add(book);
        return Result.success(books);
    }

    @DeleteMapping("/v1//books/{id}")
    public Result deleteBookById(@PathVariable("id") int id) {
        books.remove(id);
        return Result.success(books);
    }

    @GetMapping("/v1/books")
    public Result getBookByName(@RequestParam("name") String name) {
        List<Book> results = books.stream().filter(book -> book.getName().equals(name)).collect(Collectors.toList());
        return Result.success(results);
    }
}
~~~

### 结果调用

+ POST /api/v1/books

  带请求体发起请求http://localhost:8080/api/v1/books

  body {...}

![image-20230516235058343](/assets/springBootLearning/Spring-Boot-Tutorial/image-02-add-result.png)

+ GET /v1/books?name=xq

  >使用查询参数 http://localhost:8080/api/v1/books?name=xq

![image-20230516235314449](/assets/springBootLearning/Spring-Boot-Tutorial/image-02-filter.png)

+ DELETE /v1/books/1

  >使用路径http://localhost:8080/api/v1/books/1

![image-20230516235726900](/assets/springBootLearning/Spring-Boot-Tutorial/image-02-delete.png)

### 代码解释

1. `@RestController` **将返回的对象数据直接以 JSON 或 XML 形式写入 HTTP 响应(Response)中。**绝大部分情况下都是直接以 JSON 形式返回给客户端，很少的情况下才会以 XML 形式返回。转换成 XML 形式还需要额为的工作，上面代码中演示的直接就是将对象数据直接以 JSON 形式写入 HTTP 响应(Response)中。关于`@Controller`和`@RestController` 的对比，我会在下一篇文章中单独介绍到（`@Controller` +`@ResponseBody`= `@RestController`）。
2. `@RequestMapping` :上面的示例中没有指定 GET 与 PUT、POST 等，因为**`@RequestMapping`默认映射所有HTTP Action**，你可以使用`@RequestMapping(method=ActionType)`来缩小这个映射。
3. `@PostMapping`实际上就等价于 `@RequestMapping(method = RequestMethod.POST)`，同样的 ` @DeleteMapping` ,`@GetMapping`也都一样，常用的 HTTP Action 都有一个这种形式的注解所对应。
4. `@PathVariable` :取url地址中的参数。`@RequestParam ` url的查询参数值。
5. `@RequestBody`:可以**将 \*HttpRequest\* body 中的 JSON 类型数据反序列化为合适的 Java 类型。**

## 项目地址

[https://github.com/dabaoqiang/openTechnology-learning.git](https://github.com/dabaoqiang/openTechnology-learning.git)

<div align=left>
<img src="/banner/qrcode_for_xq_258.jpg"><br></div>
