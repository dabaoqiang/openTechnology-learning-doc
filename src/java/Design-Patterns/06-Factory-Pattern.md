---
title: 工厂模式
icon: note
category:
- 设计模式

---
# 工厂模式

>工厂模式是`java`中常用的设计模式之一，主要用于创建对象的最优方式。
>
>本文将对工厂模式的3个大类进行诠释，以及代码讲解。

## 简单工厂

### 概述

> 由一个工厂对象决定创建出哪一种产品类的实例。

### 使用场景

> 工厂类负责创建的对象较少。
>
> 客户端只需要传入工厂类的参数，对于如何创建对象的逻辑不需要知道。

### 优点

> 只需传入一个参数，就得到对象，不需知道细节。

### 缺点

> 工厂类职责相对过重，赠加新的产品时，违反了开闭原则。
>
> 不易于扩展。

### 栗子

~~~java
public interface Course {
    /**
     * study
     */
    void study();
}
~~~

~~~java
public class JavaCourse implements Course{
    @Override
    public void study() {
        System.out.println("java课程学习");
    }
}
~~~

~~~java
public class PythonCourse implements Course {
    @Override
    public void study() {
        System.out.println("Python课程学习");
    }
}
~~~

~~~java
/**
 * Created by @author dabaoqiang on 2023/5/13.
 * 简单工厂，根据参数获取相对应的实例
 */
public class CourseSimpleFactory {

    /**
     * study
     *
     * @param name
     * @return
     */
    public static Course study(String name) {
        if ("java".equals(name)) {
            return new JavaCourse();
        } else {
            return new PythonCourse();
        }
    }

    public static Course study2Version(Class className) throws IllegalAccessException, InstantiationException {
        return (Course) className.newInstance();

    }

    public static void main(String[] args) throws InstantiationException, IllegalAccessException {
        Course java = CourseSimpleFactory.study("java");
        java.study();

        // 通过反射
        Course course = CourseSimpleFactory.study2Version(JavaCourse.class);
        course.study();
    }
}
~~~

~~~console
java课程学习
java课程学习
~~~

## 工厂方法

### 概述

>简单工厂是对某一种活动的一种具体实现的规则访问，在调用时，用户还是需要理解其细节，
>
>为了完成用户创建对象只关心调用什么工厂，产生什么对象，就其其实现也进行抽象。
>
>定义一个创建工厂对象的接口，但让实现这个接口的类来决定实例化哪个类。
>
>工厂方法让类的是实例化推迟到子类中进行。

### 场景

> 创建对象需要大量的代码，`IloggerFactory`。
>
> 客户端不依赖于产品类实例来创建。

### 优点

>用户只需关所需产品对应的工厂，无须关系创建细节。
>
>加入新产品符合开闭原则，提高系统可扩展性。

### 缺点

>类个数过多，增加了代码结构复杂性。
>增加了系统的抽象，和理解难度。

### 栗子

~~~java
/**
 * Created by @author dabaoqiang on 2023/5/13.
 * 对某行为进行抽象
 */
public interface CourseFactory {
    /**
     * create
     * @return
     */
    Course create();
}
~~~

~~~java
public class JavaCourseFactory implements CourseFactory{
    @Override
    public Course create() {
        return new JavaCourse();
    }
}
~~~

~~~java
public class PythonCourseFactory implements CourseFactory {
    @Override
    public Course create() {
        return new PythonCourse();
    }
}
~~~

~~~java
public class FactoryMethodDemo {
    public static void main(String[] args) {
        CourseFactory courseFactory = new JavaCourseFactory();
        Course javaCourse = courseFactory.create();
        javaCourse.study();

        CourseFactory courseFactory1 = new PythonCourseFactory();
        Course pythonCourse = courseFactory1.create();
        pythonCourse.study();

    }
}
~~~

## 抽象工厂

### 概述

>提供一个创建一系列相关或相互依赖对象的接口，无须指定他们的具体的类。
>
>是一系列的相关联系的行为，进行抽象。
>
>抽象性更强。

### 场景

>  是一个产品族的抽象

### 优点

>整合抽象，利于编码，结构清晰

### 缺点

>抽象太强，不利于维护，系统结构变得复杂

### 栗子

~~~java
public class JavaCourseAbstract implements IcourseFactory {
    @Override
    public IVideo play() {
        System.out.println("java播放");
        return null;
    }

    @Override
    public IBook readBook() {
        System.out.println("java读书");
        return null;
    }

    @Override
    public IStudy study() {
        System.out.println("java用心学习");
        return null;
    }
}
~~~

~~~java
public interface IVideo {
    /**
     * play
     */
    void play();
}
~~~

~~~java
public interface IStudy {
    /**
     * inMind
     */
    void inMind();
}
~~~

~~~java
public interface IBook {
    /**
     * read
     */
    void read();
}
~~~

~~~java
public interface IcourseFactory {

    /**
     * 看视频
     * @return
     */
    IVideo play();

    /**
     * 看书
     * @return
     */
    IBook readBook();

    /**
     * 学习
     * @return
     */
    IStudy study();
}
~~~

~~~java
public class AbstractFactoryDemo {

    public static void main(String[] args) {
        JavaCourseAbstract javaCourseAbstract = new JavaCourseAbstract();
        javaCourseAbstract.play();
        javaCourseAbstract.readBook();
        javaCourseAbstract.study();

    }
}
~~~

## 项目源码地址

[https://github.com/dabaoqiang/openTechnology-learning.git](https://github.com/dabaoqiang/openTechnology-learning.git)