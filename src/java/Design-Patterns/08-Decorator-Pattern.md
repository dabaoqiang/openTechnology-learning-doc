---
title: 装饰器模式
icon: article
category:
- 设计模式

---
# 装饰器模式

>装饰器模式是对代码包装的一种模式，在前提不改变的基础下，新增功能。
>
>属于结构型模式。
>
>本文将对装饰者模式的创建，流程进行详细描述。

## 简介

装饰器模式的核心是功能扩展。

用一个新的包装类用来装饰原有的类，并且进行功能扩展。

不需要使用继承就能给类进行功能扩展。

## 场景

动态增加一个类的动能以及撤销

## 优点

装饰类跟被装饰类可以独立发展。

装饰器模式是继承的一个替代方案，可以动态扩展一个类的功能。

## 缺点

多层装饰比较复杂

## 栗子

~~~java
/**
 * Created by @author dabaoqiang on 2023/5/14.
 * 抽象组件
 */
public abstract class AbstractBattercake {

    protected abstract String getMsg();

    protected abstract int getPrice();
}

~~~

~~~java
/**
 * Created by @author dabaoqiang on 2023/5/14.
 * 具体组件
 */
public class BaseBattercake extends AbstractBattercake {

    @Override
    protected String getMsg() {
        return "煎饼";
    }

    @Override
    public int getPrice() {
        return 5;
    }
}
~~~

~~~java
/**
 * Created by @author dabaoqiang on 2023/5/14.
 * 抽象装饰器
 */
public class BattercakeDecorator extends BaseBattercake {

    private AbstractBattercake abstractBattercake;

    public BattercakeDecorator(AbstractBattercake abstractBattercake) {
        this.abstractBattercake = abstractBattercake;
    }

    @Override
    protected String getMsg() {
        return this.abstractBattercake.getMsg();
    }

    @Override
    public int getPrice() {
        return this.abstractBattercake.getPrice();
    }

}
~~~

~~~java
/**
 * Created by @author dabaoqiang on 2023/5/14.
 * 具体装饰器
 */
public class EggDecorator extends BattercakeDecorator {

    public EggDecorator(AbstractBattercake abstractBattercake) {
        super(abstractBattercake);
    }

    @Override
    protected String getMsg() {
        return super.getMsg() + "+1个鸡蛋";
    }

    @Override
    public int getPrice() {
        return super.getPrice() + 1;
    }
}
~~~

~~~java
public class DemoTest {
    public static void main(String[] args) {
        BaseBattercake baseBattercake = new BaseBattercake();
        System.out.println(baseBattercake.getMsg());
        System.out.println(baseBattercake.getPrice());

        EggDecorator eggDecorator = new EggDecorator(baseBattercake);
        System.out.println(eggDecorator.getMsg());
        System.out.println(eggDecorator.getPrice());

    }
}
~~~

~~~
煎饼
5
煎饼+1个鸡蛋
6
~~~

## 装饰器和代理模式对比

装饰器模式更多的是强调功能的增强.

代理模式更多的是强调帮代理类进行业务处理。

## 项目源码地址

[https://github.com/dabaoqiang/openTechnology-learning.git](https://github.com/dabaoqiang/openTechnology-learning.git)