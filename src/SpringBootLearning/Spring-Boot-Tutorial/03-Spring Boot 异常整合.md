---
title: Spring Boot 异常整合
icon: note
category:
- Spring Boot

---

# Spring Boot 异常整合

>程序运行异常处理是针对网络错误或后台业务异常的一种面向客户端请求的一种异常提示。
>
>在本文中将介绍如何使用Spring Boot搭建异常设计。

## 是什么

SpringBoot中，`@ControllerAdvice` 即可开启全局异常处理，使用该注解表示开启了全局异常地捕获。

自定义一个方法使用`@ExceptionHandler`注解然后定义捕获异常的类型即可对这些捕获的异常进行统一的处理。

## 怎么办

### 新建项目

![image-20230517-01-build](/assets/springBootLearning/Spring-Boot-Tutorial/image-20230517-01-build.png)

### 配置接口异常类

+ 编写`ResultCode`

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

+ 编写抽象方法异常类

~~~java
/**
 * Created by @author dabaoqiang on 2023/5/17.
 */
public abstract class BaseException extends RuntimeException {

    private final ResultCode resultCode;

    public BaseException(ResultCode resultCode) {
        super(resultCode.getMessage());
        this.resultCode = resultCode;
    }

    public BaseException(ResultCode resultCode, String message) {
        super(message);
        this.resultCode = resultCode;
    }

    protected BaseException(ResultCode resultCode, Throwable cause) {
        super(resultCode.getMessage(), cause);
        this.resultCode = resultCode;
    }

    public ResultCode getResultCode() {
        return resultCode;
    }

}
~~~

+ 编写业务异常

~~~java
/**
 * Created by @author dabaoqiang on 2023/5/17.
 */
public class BusinessException extends BaseException {

    public BusinessException() { super(ResultCode.FAILURE); }

    public BusinessException(String message) {
        super(ResultCode.FAILURE, message);
    }
}
~~~

+ 编写资源访问异常

~~~java
/**
 * Created by @author dabaoqiang on 2023/5/17.
 */
public class ResourceNotFoundException extends BaseException {

    public ResourceNotFoundException() {
        super(ResultCode.NOT_FOUND);
    }
}

~~~

### 全局异常处理

~~~java
/**
 * Created by @author dabaoqiang on 2023/5/17.
 */
@ControllerAdvice
public class GlobalExceptionHandler {

    @ResponseBody
    @ResponseStatus(value = HttpStatus.NOT_FOUND)
    @ExceptionHandler(value = ResourceNotFoundException.class)
    public Result<?> handleResourceNotFoundException(ResourceNotFoundException e) {
        if (e.getResultCode() != null) {
            return Result.fail(e.getResultCode(), e.getMessage());
        }
        return Result.fail(e.getMessage());
    }

    @ResponseBody
    @ResponseStatus(value = HttpStatus.BAD_REQUEST)
    @ExceptionHandler(value = BusinessException.class)
    public Result<?> handleBusinessException(BusinessException e) {
        if (e.getResultCode() != null) {
            return Result.fail(e.getResultCode(), e.getMessage());
        }
        return Result.fail(e.getMessage());
    }

    @ResponseBody
    @ResponseStatus(value = HttpStatus.INTERNAL_SERVER_ERROR)
    @ExceptionHandler(Exception.class)
    public Result<?> handleAppException(Exception e) {
        return Result.fail(ResultCode.INTERNAL_SERVER_ERROR, e.getMessage());
    }

}
~~~

+ `controller`编写

~~~java
/**
 * Created by @author dabaoqiang on 2023/5/17.
 */
@RestController
@RequestMapping("/api")
public class BookController {

    @GetMapping("/v1/resourceNotFound")
    public Result throwResourceNotFoundException() {
        Book p = new Book("xq", "dbq");
        throw new ResourceNotFoundException();
    }


    @GetMapping("/v1/books/error/{id}")
    public Result throwBusinessException() {
        Book book = new Book("xq", "dbq");
        throw new BusinessException("书籍为空");
    }

    @GetMapping("/v1/books/{id}")
    public Result getUserPath() {
        Book book = new Book("xq", "dbq");
        return Result.success(book);
    }

}
~~~

### Postman测试

+ http://localhost:8080/api/v1/resourceNotFound

  >资源不存在异常

  ![image-20230518170801130](/assets/springBootLearning/Spring-Boot-Tutorial/image-20230518-exception-resorce.png)

+ http://localhost:8080/api/v1/books/error/1

  >业务异常

  ![image-20230518171000195](/assets/springBootLearning/Spring-Boot-Tutorial/image-20230518-exception-buiseness.png)

+ http://localhost:8080/api/v1/books/1

  >请求成功

  ![image-20230518171038296](/assets/springBootLearning/Spring-Boot-Tutorial/image-20230518-exception-ok.png)


## 项目地址
[https://github.com/dabaoqiang/openTechnology-learning.git](https://github.com/dabaoqiang/openTechnology-learning.git)

<div align=left>
<img src="/banner/qrcode_for_xq_258.jpg"><br></div>



