---
title: 七大软件设计原则
icon: article
category:
- 设计模式

---
# 七大软件设计原则

>设计模式是近现代编码项目实施过程中经验的总结，主要是为了应对程序的耦合，内聚，维护性，灵活性的应用。
>
>本文中将对业界流行的七中设计模式进行阐述，归纳。

## 开闭原则

### 概述

> 强调的是用抽象构建框架，用实现扩展细节

### 场景

> 我们版本更新，尽可能不修改原代码，但是可以增加新功能。

### 优点

>保持软件产品的稳定性
>
>不影响原有测试代码的运行
>
>使代码更具模块化，易于维护
>
>提高开发效率

### 栗子

~~~java
public interface Icourse {
    /**
     * getId
     *
     * @return
     */
    Long getId();

    /**
     * getName
     *
     * @return
     */
    String getName();

    /**
     * getPrice
     *
     * @return
     */
    Double getPrice();
}
~~~

~~~java
public class JavaCourse implements Icourse {

    private Long id;

    private String name;

    private Double price;


    public JavaCourse(Long id, String name, Double price) {
        this.id = id;
        this.name = name;
        this.price = price;
    }

    @Override
    public Long getId() {
        return id;
    }

    @Override
    public String getName() {
        return name;
    }

    @Override
    public Double getPrice() {
        return price;
    }
}
~~~

~~~java
public class JavaDiscountCourse extends JavaCourse {
    
    public JavaDiscountCourse(Long id, String name, Double price) {
        super(id, name, price);
    }

    public Double getOriginalPrice() {
        return super.getPrice();
    }

    @Override
    public Double getPrice() {
        return super.getPrice() * 0.1;
    }
}

~~~

~~~java
public class OpenCloseDemoTest {

    public static void main(String[] args) {
        /**
         * 开闭原则，定义一个接口，不同的实现，可以做到， 对新增开放，对修改关闭，低耦合
         */

        Icourse icourse = new JavaDiscountCourse(1L, "sz", 1D);
        Double price = icourse.getPrice();
        System.out.println(price);

        Icourse original = new JavaCourse(1L, "sz", 1D);
        Double price1 = original.getPrice();
        System.out.println(price1);
    }
}
~~~

## 依赖倒置

### 概述

>`高层模块不应该依赖低层模块`,二者都应该依赖其抽象。
>抽象不应该依赖细节，细节应该依赖抽象。
>针对接口编程，不要针对实现编程。

### 场景

>A a =new A(new B());
>

### 优点

>减少类之间的耦合性。
>
>提高系统的稳定性。
>
>提高代码可读性和可维护性。
>
>可降低修改程序所造成的风险。

### 栗子

~~~java
public interface Icourse {
    /**
     * study
     */
    void study();
}
~~~

~~~java
public class JavaCourse implements Icourse {

    @Override
    public void study() {
        System.out.println("xq正在学习java课程");
    }
}
~~~

~~~java
public class PythonCourse implements Icourse {
    @Override
    public void study() {
        System.out.println("xq正在学习python课程");
    }
}

~~~

~~~java
public class Tom {

    /**
     * 啥是依赖倒置了，就是本来我是tom，我要去学课程，我直接在tom的类里面去写，我要学java，我要学python，
     * 学习课程，是抽象的，还是行为，于是，课程抽象为接口，java，phthotn是其实现，
     * tom学那个课程，应该是那个课程的抽象，她不应该依赖是具体的那门课程
     * <p>
     * 即，高层模块不依赖底层模块，二者依赖其抽象，
     * 抽象不依赖细节，细节依赖抽象，
     * 减少耦合，提高稳定，增强，代码可读性，可维护性
     */

    private Icourse icourse;

    public void setIcourse(Icourse icourse) {
        this.icourse = icourse;
    }

    public void studyJavaCourse() {
        System.out.println("xq正在学习java课程");
    }

    public void studyPythonCourse() {
        System.out.println("xq正在学习python课程");
    }

    // 未有依赖倒置前 1.0 版本
//    public static void main(String[] args) {
//        Tom tom = new Tom();
//        tom.studyJavaCourse();
//        tom.studyPythonCourse();
//    }


    public void study(Icourse icourse) {
        icourse.study();
    }

    public void studyTwo() {
        icourse.study();
    }

    // 2.0 版本
//    public static void main(String[] args) {
//        Tom tom = new Tom();
    // 直接new
//        tom.study(new JavaCourse());
//    }

    // 3.0版本
    public static void main(String[] args) {
        Tom tom = new Tom();
        // 依赖注入通过setter
        tom.setIcourse(new JavaCourse());
        tom.studyTwo();
    }
}
~~~

## 单一职责&接口隔离

### 概述

> 不要存在多于一个导致类变更的原因。
>
> 一个类/接口/方法只负责一项职责。

### 场景

> 支付业务的service就不需要写上发邮件的具体代码。

### 优点

>降低类的复杂度。
>
>提高类的可读性。
>
>提高系统的可维护性。
>
>降低变更引起的风险。

### 栗子

~~~java
public interface IAnimal {
    /**
     * eat
     */
    void eat();

    /**
     * fly
     */
    void fly();

    /**
     * swim
     */
    void swim();

}
~~~

~~~java
public class Dog implements IAnimal {
    /**
     * eat
     */
    @Override
    public void eat() {

    }

    /**
     * fly
     */
    @Override
    public void fly() {
        // 此时，狗根本就不能飞！，如果用一个统一的接口的话,接口定义行为错误

    }

    @Override
    public void swim() {

    }
}
~~~

~~~java
public class Bird implements IAnimal {

    @Override
    public void eat() {

    }

    @Override
    public void fly() {

    }

    @Override
    public void swim() {
        // 此时，鸟根本就不能泳！，如果用一个统一的接口的话,会出现脏的行为
    }
}
~~~

+ 接口隔离后

~~~java
public interface IEatAnimal {
    /**
     * eat
     */
    void eat();
}
~~~

~~~java
public interface ISwimAnimal {
    /**
     * swim
     */
    void swim();
}
~~~

~~~java
public interface FlyAnimal {
    /**
     * fly
     */
    void fly();
}
~~~

~~~java
public class DogTow implements IEatAnimal, ISwimAnimal {

    @Override
    public void eat() {
        System.out.println("狗会吃");
    }

    @Override
    public void swim() {
        System.out.println("狗会游");
    }
}
~~~

+ 接口隔离，根据不同的行为，制定不定的接口，不用一个单一的接口，确定所有的行为.

## 迪米特法则

### 概述

> 只和朋友交流（成员变量、方法输入输出参数），不和陌生人说话，控制好访问修饰符

### 场景

> 老板让项目经理做事，不需要知道具体做的逻辑

### 优点

> 降低类与类之间的耦合

### 栗子

~~~java
public class Course {}
~~~

~~~java
public class Employee {
    public void checkNumberOfCourses(List<Course> courses) {
        System.out.println("目前已经发布的课程数量:" + courses.size());
    }
}
~~~

~~~java
public class TeamLeader {

    public void commandCheckNumber(Employee employee) {
        List<Course> list = new ArrayList<Course>();
        for (int i = 0; i < 20; i++) {
            // 迪米特法则，有些对象，与我产生不了关系，就不应该放在这里
            list.add(new Course());
        }
        employee.checkNumberOfCourses(list);
    }

    public static void main(String[] args) {

        TeamLeader teamLeader = new TeamLeader();

        Employee employee = new Employee();
        teamLeader.commandCheckNumber(employee);

    }
}
~~~

+ 修改后

~~~java
public class EmployeeTow {

    public void checkNumberOfCourses() {
        List<Course> list = new ArrayList<Course>();
        for (int i = 0; i < 20; i++) {
            // 迪米特法则，有些对象，与我产生不了关系，就不应该放在这里
            list.add(new Course());
        }
        System.out.println("目前已经发布的课程数量:" + list.size());
    }
}
~~~

~~~java
public class TeamLeaderTow {

    public void commandCheckNumber(EmployeeTow employeeTow) {
        employeeTow.checkNumberOfCourses();
    }

    public static void main(String[] args) {
        /**
         * 这些修改以后，就是符合迪米特法则，我是leader我只需要知道，
         * 我的小弟，在干啥，至于，我小弟在具体干什么，我不需要知道
         * 最少知道原则
         *
         */
        TeamLeaderTow teamLeader = new TeamLeaderTow();
        teamLeader.commandCheckNumber(new EmployeeTow());

    }
}
~~~

## 里氏替换

### 概述

> 在程序中将一个父类的对象改成其继承类，并不影响程序运行。
>
> 将子类适应的程序改成父类，则程序可能会出现异常。

### 场景

>用来对类跟类之间继承的一种约束

### 优点

>规范使用继承

### 栗子

~~~java
public class Rectangle {

    private Long height;

    private Long width;

    public Long getHeight() {
        return height;
    }

    public void setHeight(Long height) {
        this.height = height;
    }

    public Long getWidth() {
        return width;
    }

    public void setWidth(Long width) {
        this.width = width;
    }
}
~~~

~~~java
public class Square extends Rectangle {

    private Long length;

    public Long getLength() {
        return length;
    }

    public void setLength(Long length) {
        this.length = length;
    }

    @Override
    public Long getHeight() {
        return getLength();
    }

    @Override
    public void setHeight(Long height) {
     setLength(height);
    }

    @Override
    public Long getWidth() {
        return getLength();
    }

    @Override
    public void setWidth(Long width) {
        setLength(width);
    }
}
~~~

~~~java
public class Test01 {

    public static void reSize(Rectangle rectangle) {
        while (rectangle.getWidth() >= rectangle.getHeight()) {
            rectangle.setHeight(rectangle.getHeight() + 1);
            System.out.println("width:" + rectangle.getWidth() + ",height:" + rectangle.getHeight());
        }
        System.out.println("resize end ,width:" + rectangle.getWidth() + ",height:" + rectangle.getHeight());

    }

//    public static void main(String[] args) {
//        Rectangle rectangle = new Rectangle();
//        rectangle.setWidth(20L);
//        rectangle.setHeight(10L);
//        reSize(rectangle);
//    }

    // 出现了死循环 约束继承泛滥
    public static void main(String[] args) {
        Square square = new Square();
        square.setLength(10L);
        reSize(square);
    }
}
~~~

+ 修改后

~~~java
public interface QuadRangle {
    /**
     * getWidth
     * @return
     */
    long getWidth();

    /**
     * getHeight
     * @return
     */
    long getHeight();

}
~~~

~~~java
public class RectRangleTwo implements QuadRangle{

    private long width;

    private long height;

    public void setWidth(long width) {
        this.width = width;
    }

    public void setHeight(long height) {
        this.height = height;
    }

    @Override
    public long getWidth() {
        return width;
    }

    @Override
    public long getHeight() {
        return height;
    }
}

~~~

~~~java
public class SquareTwo implements QuadRangle {

    private long length;

    public long getLength() {
        return length;
    }

    public void setLength(long length) {
        this.length = length;
    }

    @Override
    public long getWidth() {
        return length;
    }

    @Override
    public long getHeight() {
        return length;
    }
}
~~~

~~~java
public class TestSubstitutuinDemo {

    public static void reSize(RectRangleTwo rectangle) {
        while (rectangle.getWidth() >= rectangle.getHeight()) {
            rectangle.setHeight(rectangle.getHeight() + 1);
            System.out.println("width:" + rectangle.getWidth() + ",height:" + rectangle.getHeight());
        }
        System.out.println("resize end ,width:" + rectangle.getWidth() + ",height:" + rectangle.getHeight());

    }

    public static void main(String[] args) {
        SquareTwo rectRangleTwo = new SquareTwo();
        rectRangleTwo.setLength(10);
        // 为了约束继承泛滥！
//        reSize(rectRangleTwo);
    }
}
~~~

## 合成复用

### 概述

>多使用has-a对象组合；聚合 contains-a 聚合 而不是继承 ，因为继承是白盒，暴露了很多信息。
>聚合，组合，则是黑盒，可以降低，类之间的耦合关系，一个类对另一个类影响较少继承会暴露信息。

### 场景

> 获取数据库连接的时候，同一个行为，不同的实现，根据不同的实现来判断行为。

### 优点

>降低，类之间的耦合关系。

### 栗子

~~~java
public class DbConnection {
    public String getConnection() {
        return "返回mysql数据链接";
    }
}
~~~

~~~java
public class ProductDao {

    private DbConnection dbConnection;

    public ProductDao(DbConnection dbConnection) {
        this.dbConnection = dbConnection;
    }

    public void addProduct() {
        String conncetion = dbConnection.getConnection();
        System.out.println("获取 " + conncetion + ",加入产品");
    }
}
~~~

~~~java
public class CompositeReUseTest {
    // 1.0版本
    public static void main(String[] args) {
       ProductDao productDao = new ProductDao(new DbConnection());
       productDao.addProduct();
   }
}
~~~

+ 修改后

~~~java
public abstract class DbConnection2 {
    /**
     * getDbConnection
     * @return
     */
    public abstract String getDbConnection();

}
~~~

~~~java
public class MysqlConnection extends DbConnection2 {

    @Override
    public String getDbConnection() {
        return "返回mysql数据库链接";
    }
}
~~~

~~~java
public class OracleConnection extends DbConnection2 {

    @Override
    public String getDbConnection() {
        return "返回oracle数据库链接";
    }
}

~~~

~~~java
public class ProductDao1 {

    private DbConnection2 dbConnection2;

    public ProductDao1(DbConnection2 dbConnection2) {
        this.dbConnection2 = dbConnection2;
    }

    public void addProduct() {
        System.out.println("获取链接：" + dbConnection2.getDbConnection() + "插入产品");
    }

}
~~~

~~~java
public class CompositeReUseTest {

    public static void main(String[] args) {
        ProductDao1 productDao1 = new ProductDao1(new MysqlConnection());
        productDao1.addProduct();

        ProductDao1 productDao2 = new ProductDao1(new OracleConnection());
        productDao2.addProduct();

    }
}
~~~

## 项目源码地址

[https://github.com/dabaoqiang/openTechnology-learning.git](https://github.com/dabaoqiang/openTechnology-learning.git)
