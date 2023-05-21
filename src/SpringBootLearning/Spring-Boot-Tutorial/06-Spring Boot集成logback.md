---
title: Spring Boot 集成logback
icon: note
category:
- Spring Boot

---

# Spring Boot 集成logback

>打印线上志框架 `logback`，打印日志信息标准化。

## 是什么

[Logback](https://logback.qos.ch/)是log4j框架的作者开发的新一代日志框架，它效率更高、能够适应诸多的运行环境，同时天然支持SLF4J。

## 怎么办

### 新建项目

![image-20230521160542358](/assets/springBootLearning/Spring-Boot-Tutorial/image-20230521-logback-build.png)

### 新增依赖

~~~xml
		<dependency>
			<groupId>ch.qos.logback</groupId>
			<artifactId>logback-classic</artifactId>
			<version>1.2.3</version>
		</dependency>
~~~

Logback 会在 classpath 路径下先寻找 logback-test.xml 文件，没有找到的话，寻找 logback.groovy 文件，还没有的话，寻找 logback.xml 文件，都找不到的话，就输出到控制台。

会在本地环境中配置 logback-test.xml，在生产环境下配置 logback.xml。

### 配置科普

+ `logback-test.xml`

~~~xml
<configuration debug="true">
    <appender name="STDOUT" class="ch.qos.logback.core.ConsoleAppender">
        <encoder>
            <pattern>%d{HH:mm:ss.SSS} %relative [%thread] %-5level %logger{36} - %msg%n</pattern>
        </encoder>
    </appender>

    <root level="debug">
        <appender-ref ref="STDOUT" />
    </root>
</configuration>
~~~

>  解释

Logback 的配置文件非常灵活，最基本的结构为 `<configuration>` 元素，包含 0 或多个 `<appender>` 元素，其后跟 0 或多个 `<logger>` 元素，其后再跟最多只能存在一个的 `<root>` 元素。

0 个或多个 appender，0 个或多个 logger，最多只有一个 root。

### 配置appender

配置日志的输出目的地，通过 name 属性指定名字，通过 class 属性指定目的地：

- ch.qos.logback.core.ConsoleAppender：输出到控制台。
- ch.qos.logback.core.FileAppender：输出到文件。
- ch.qos.logback.core.rolling.RollingFileAppender：文件大小超过阈值时产生一个新文件。

>除了输出到本地，还可以通过 SocketAppender 和 SSLSocketAppender 输出到远程设备，通过 SMTPAppender 输出到邮件。甚至可以通过 DBAppender 输出到数据库中。

**encoder**

负责把日志信息转换成字节数组，并且把字节数组写到输出流。

**pattern**

用来指定日志的输出格式：

- `%d`：输出的时间格式。
- `%thread`：日志的线程名。
- `%-5level`：日志的输出级别，填充到 5 个字符。比如说 info 只有 4 个字符，就填充一个空格，这样日志信息就对齐了。
- `%logger{length}`：logger 的名称，length 用来缩短名称。没有指定表示完整输出；0 表示只输出 logger 最右边点号之后的字符串；其他数字表示输出小数点最后边点号之前的字符数量。
- `%msg`：日志的具体信息。
- `%n`：换行符。
- `%relative`：输出从程序启动到创建日志记录的时间，单位为毫秒。

### 配置root

它只支持一个属性——level，值可以为：TRACE、DEBUG、INFO、WARN、ERROR、ALL、OFF。

appender-ref 用来指定具体的 appender。

### RollingFileAppender 配置

RollingFileAppender 需要指定 RollingPolicy 和 TriggeringPolicy，前者负责日志的滚动功能，后者负责日志滚动的时机。

如果 RollingPolicy 也实现了 TriggeringPolicy 接口，那么只需要设置 RollingPolicy 就好了。

`TimeBasedRollingPolicy` 和 `SizeAndTimeBasedRollingPolicy `是两种最常用的滚动策略。

`TimeBasedRollingPolicy `同时实现了` RollingPolicy `与 `TriggeringPolicy `接口，因此使用` TimeBasedRollingPolicy` 的时候就可以不指定 `TriggeringPolicy`。

TimeBasedRollingPolicy 可以指定以下属性：

- fileNamePattern，用来定义文件的名字（必选项）。它的值应该由文件名加上一个 `%d` 的占位符。`%d` 应该包含 `java.text.SimpleDateFormat` 中规定的日期格式，缺省是 `yyyy-MM-dd`。滚动周期是通过 fileNamePattern 推断出来的。
- maxHistory，最多保留多少数量的日志文件（可选项），将会通过异步的方式删除旧的文件。比如，你指定按月滚动，指定 `maxHistory = 6`，那么 6 个月内的日志文件将会保留，超过 6 个月的将会被删除。
- totalSizeCap，所有日志文件的大小（可选项）。超出这个大小时，旧的日志文件将会被异步删除。需要配合 maxHistory 属性一起使用，并且是第二条件。

### 日志配置

~~~xml
<configuration>
    <appender name="stdout" class="ch.qos.logback.core.ConsoleAppender">
        <Target>System.out</Target>
        <encoder>
            <pattern>%d{HH:mm:ss.SSS} [%thread] %level %logger{36} - %msg%n</pattern>
        </encoder>
    </appender>
    <appender name="debug" class="ch.qos.logback.core.rolling.RollingFileAppender">
        <Append>true</Append>
        <File>debug.log</File>
        <rollingPolicy class="ch.qos.logback.core.rolling.TimeBasedRollingPolicy">
            <!--            按天轮转 -->
            <fileNamePattern>debug.%d{yyyy-MM-dd}.log</fileNamePattern>
            <!--            保存 30 天的历史记录，最大大小为 30GB -->
            <maxHistory>30</maxHistory>
            <totalSizeCap>3GB</totalSizeCap>
        </rollingPolicy>
        <encoder>
            <pattern>%relative [%thread] %-5level %logger{35} - %msg%n</pattern>
        </encoder>
    </appender>
    <appender name="error" class="ch.qos.logback.core.rolling.RollingFileAppender">
        <File>error.log</File>
        <rollingPolicy class="ch.qos.logback.core.rolling.TimeBasedRollingPolicy">
            <!--            按天轮转 -->
            <fileNamePattern>error.%d{yyyy-MM-dd}.log</fileNamePattern>
            <!--            保存 30 天的历史记录，最大大小为 30GB -->
            <maxHistory>30</maxHistory>
            <totalSizeCap>3GB</totalSizeCap>
        </rollingPolicy>
        <encoder>
            <pattern>%d{yyyy-MM-dd HH:mm:ss} [ %t:%r ] - [ %p ] %m%n</pattern>
        </encoder>
        <filter class="ch.qos.logback.classic.filter.ThresholdFilter">
            <level>ERROR</level>
        </filter>
    </appender>
    <root level="debug">
        <appender-ref ref="stdout"/>
        <appender-ref ref="debug"/>
        <appender-ref ref="error"/>
    </root>
</configuration>
~~~

### 测试方法

~~~java
/**
 * Created by @author dabaoqiang on 2023/5/21.
 */
@Slf4j
public class TestLog {

//    static Logger logger = LoggerFactory.getLogger(TestLog.class);

    public static void main(String[] args) {
        LoggerContext lc = (LoggerContext) LoggerFactory.getILoggerFactory();
        StatusPrinter.print(lc);
        System.out.println("sb");
        log.debug("logback");
    }
}
~~~

~~~tex
18:11:10.840 [main] DEBUG com.dbq.TestLog - logback
~~~

## 参考

[https://logback.qos.ch/manual/index.html](https://logback.qos.ch/manual/index.html)

## 项目地址
[https://github.com/dabaoqiang/openTechnology-learning.git](https://github.com/dabaoqiang/openTechnology-learning.git)

<div align=left>
<img src="/banner/qrcode_for_xq_258.jpg"><br></div>