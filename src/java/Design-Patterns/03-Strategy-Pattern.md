---
title: 策略模式
icon: article
category:
- 设计模式

---

# 策略模式

>策略模式是行为型模式，创建的各种对象依据某种规则进行创建不同的对象。
>
>在本文中，阐述了策略模式的使用。

## 简介

同一个行为不同的实现，将实现封装起来，起到可相互替换作用。

## 场景

旅游方式，选车还是坐飞机

## 优点

实例实现自有切换。

避免多种判断。

扩展性很好。

## 缺点

会新增一个策略类进维护。

策略类也会暴露。

## 栗子

~~~java
public interface Strategy {
    /**
     * doOperation
     * @param num1
     * @param num2
     * @return
     */
    int doOperation(int num1, int num2);
}
~~~

~~~java
public class OperationAdd implements Strategy {
    @Override
    public int doOperation(int num1, int num2) {
        return num1 + num2;
    }
}
~~~

~~~java
public class OperationSubtract implements Strategy {
    @Override
    public int doOperation(int num1, int num2) {
        return num1 - num2;
    }
}
~~~

~~~java
public class Context {
    private Strategy strategy;

    public Context(Strategy strategy){
        this.strategy = strategy;
    }

    public int executeStrategy(int num1, int num2){
        return strategy.doOperation(num1, num2);
    }
}
~~~

~~~java
public class StrategyPatternDemo {

    public static void main(String[] args) {
        Context context = new Context(new OperationAdd());
        System.out.println(context.executeStrategy(1, 1));
        Context context2 = new Context(new OperationSubtract());
        System.out.println(context2.executeStrategy(1, 1));
    }
}
~~~

## 项目源码地址

[https://github.com/dabaoqiang/openTechnology-learning.git](https://github.com/dabaoqiang/openTechnology-learning.git)

