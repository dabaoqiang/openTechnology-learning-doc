---
title: 单例模式
icon: leaf
category:
- 设计模式

---

# 单例模式

>单例模式是项目中比较多一种设计模式之一，主要用于大对象或者全局唯一对象的使用。
>
>本文将对单例模式的创建，优化迭代流程进行详细描述

## 简介

总书记只有一个

## 场景

适合只需要一个bean的场景，或者内存大的bean

## 优点

在内存中只有一个实例，减少了内存开销。
可以避免对资源的多重占用。
设置全局访问点,严格控制访问

## 缺点

单例模式的缺点没有接口，扩展困难。
如果要扩展单例对象,只有修改代码没有其他途径。

## 代码栗子

### 饿汉式

>不管使用不使用，项目前期都给初始化对象到内存。

+ 写法1

 ~~~java
/**

 * 饿汉式，单例

 * 优点：效率高

 * 缺点：内存浪费
   */
public class HungrySingleton {

    private static final HungrySingleton h = new HungrySingleton();

    /**
     * 私有化构造函数
     */
    private HungrySingleton() {
    }

    /**
     * 统一对外方法
     *
     * @return
     */
    public static HungrySingleton getInstance() {
        return h;
    }
}
 ~~~

+ 写法2

~~~java
public class HungryStaticSingleton2 {

    private static final HungryStaticSingleton2 h;

    /**
     * 使用了静态方法块
     */
    static {
        h = new HungryStaticSingleton2();
    }

    /**
     * 私有化构造函数
     */
    private HungryStaticSingleton2() {
    }

    /**
     * 统一对外方法
     *
     * @return
     */
    public static HungryStaticSingleton2 getInstance() {
        return h;
    }
}
~~~

### 懒汉式

> 只有使用的时候才去初始化，一开始项目初始化的时候不加载到内存。

~~~java
public class HungryStaticSingleton3 {

    private static HungryStaticSingleton3 lazySimpleSingleton;

    /**
     * 私有化构造函数
     */
    private HungryStaticSingleton3() {
    }

    public static HungryStaticSingleton3 getInstance1Version() {
        // 加个判断增加效率，但是出现线程并发问题
        if (lazySimpleSingleton == null) {
            lazySimpleSingleton = new HungryStaticSingleton3();
        }
        return lazySimpleSingleton;
    }

}
~~~

> 方法加速

~~~java
public class HungryStaticSingleton4 {

    private static HungryStaticSingleton4 lazySimpleSingleton;

    /**
     * 私有化构造函数
     */
    private HungryStaticSingleton4() {
    }

    /**
     * 为了解决并发问题，方法级别加锁
     *
     * @return
     */
    public static synchronized HungryStaticSingleton4 getInstance1Version() {
        // 加个判断增加效率
        if (lazySimpleSingleton == null) {
            lazySimpleSingleton = new HungryStaticSingleton4();
        }
        return lazySimpleSingleton;
    }

}
~~~

> 代码块加锁

~~~java
public class HungryStaticSingleton5 {

    private static HungryStaticSingleton5 lazySimpleSingleton;

    /**
     * 私有化构造函数
     */
    private HungryStaticSingleton5() {
    }

    /**
     * 方法级别加锁颗粒度太大，影响性能，对代码进行加锁,
     *
     * @return
     */
    public static synchronized HungryStaticSingleton5 getInstance1Version() {
        // 解决性能问题
        if (lazySimpleSingleton == null) {
            synchronized (HungryStaticSingleton5.class) {
                // 出现问题，A线程走完了，B线程已经到syc这一步了，还是会有问题
                lazySimpleSingleton = new HungryStaticSingleton5();
            }
        }
        return lazySimpleSingleton;
    }
}
~~~

> 双重检查锁

~~~java
public class HungryStaticSingleton6 {

    private static volatile HungryStaticSingleton6 lazySimpleSingleton;

    /**
     * 私有化构造函数
     */
    private HungryStaticSingleton6() {
    }

    /**
     * 方法级别加锁颗粒度太大，影响性能，对代码进行加锁,
     *
     * @return
     */
    public static synchronized HungryStaticSingleton6 getInstance1Version() {
        // 1.检测对象是否是否要阻塞
        if (lazySimpleSingleton == null) {
            synchronized (HungryStaticSingleton6.class) {
                // 2.检查是否要创建
                if (lazySimpleSingleton == null) {
                    lazySimpleSingleton = new HungryStaticSingleton6();
                    // 指令重排序问题lazySimpleSingleten 要变成  volatile
                }
            }
        }
        return lazySimpleSingleton;
    }
}
~~~

### 内部类式

```java
/**
 * 内部类加载 classPath:LazyStaticInnerSingleton.class
 * LazyStaticInnerSingleton$LazyHolder.class
 * 只有使用的时候，jvm才会初始化内部类
 * 优点：写法优雅，利用java本身语法，避免内存浪费，性能高
 * 缺点：能够被反射破坏
 * <p>
 * 2.0版本
 * 优点：处理了反射问题
 * 缺点：代码又不优雅
   */
   public class LazyStaticInnerSingleton implements Serializable {

   private static final long serialVersionUID = -3006601153082299241L;

    /**
     * 私有化构造函数
     *
     * @throws RuntimeException
     */
    private LazyStaticInnerSingleton() throws RuntimeException {
        // 处理反射
        if (LazyHolder.l != null) {
            throw new RuntimeException("不允许非法访问");
        }
    }

    /**
     * 对外获取实例方法
     *
     * @return
     */
    public static LazyStaticInnerSingleton getInstance() {
        return LazyHolder.l;
    }

    /**
     * 内部类使用的时候初始化
     */
    private static class LazyHolder {
        private static final LazyStaticInnerSingleton l = new LazyStaticInnerSingleton();
    }

    /**
     * 序列化的时候不产生新对象
     *
     * @return
     */
    private Object readResolve() {
        return LazyHolder.l;
    }
   }
```

### 容器单例式

```java
/**
 * Created by @author dabaoqiang on 2023/5/13.
 * 前提：处理反射，内部类不优雅的问题
 * 缺点：不安全，反序列号会破坏单例
 */
public class ContainSingleton {

    /**
     * 私有化构造函数
     */
    private ContainSingleton() {
    }

    private static Map<String, Object> ioc = new ConcurrentHashMap<>();

    public static Object getInstance(String className) throws ClassNotFoundException, IllegalAccessException, InstantiationException {
        Object instance = null;
        if (!ioc.containsKey(className)) {
            Class<?> aClass = Class.forName(className);
            instance = aClass.newInstance();
            ioc.put(className, instance);
        } else {
            return ioc.get(className);
        }
        return instance;
    }
}
```

### 枚举式

~~~java
/**
 * Created by @author dabaoqiang on 2023/5/13.
 *  是处理了反射，但是这个本质还是静态加载，又变成了饿汉方式
 */
public enum EnumSingleton {
    INSTANCE;

    private Object data;

    public Object getData() {
        return data;
    }

    public void setData(Object data) {
        this.data = data;
    }

    public static EnumSingleton getInstance() {
        return INSTANCE;
    }

    public static void main(String[] args) throws NoSuchMethodException, IllegalAccessException, InvocationTargetException, InstantiationException {
        //   Enum
        EnumSingleton instance = EnumSingleton.getInstance();
        instance.setData(new Object());

        Class<EnumSingleton> enumSingletonClass = EnumSingleton.class;
        Constructor<EnumSingleton> declaredConstructor = enumSingletonClass.getDeclaredConstructor(String.class, int.class);
        declaredConstructor.setAccessible(true);
        // Cannot reflectively create enum objects
        Object enumSingleton = declaredConstructor.newInstance();
    }
}
~~~

### 序列化单例

```java
/**
 * Created by @author dabaoqiang on 2023/5/13.
 * 解决对象反序列化破解问题
 */
public class SeriableDemo implements Serializable {

    private static final long serialVersionUID = 1370237857614396494L;

    private static final SeriableDemo h = new SeriableDemo();

    private SeriableDemo() {
    }

    public static SeriableDemo getInstance() {
        return h;
    }

    // 重写 readResolve 方法
    private Object readResolve() {
        return h;
    }

    public static void main(String[] args) throws IOException, ClassNotFoundException {
        // 写
        String path = "LazyStaticInnerSingleton.obj";
        SeriableDemo s1 = null;
        SeriableDemo s2 = SeriableDemo.getInstance();

        ObjectOutputStream objectOutputStream = new ObjectOutputStream(new FileOutputStream(path));
        objectOutputStream.writeObject(s2);
        objectOutputStream.close();

        System.out.println(s2);

        // 读
        ObjectInputStream objectInputStream = new ObjectInputStream(new FileInputStream(path));
        s1 = (SeriableDemo) objectInputStream.readObject();
        objectInputStream.close();

        System.out.println(s1);

        // true
        System.out.println(s1 == s2);
    }
}
```

###  `ThreadLocal`单例式


```java
public class ThreadLocalSingleton {
    private static final ThreadLocal<ThreadLocalSingleton> h = new ThreadLocal<ThreadLocalSingleton>() {
        @Override
        protected ThreadLocalSingleton initialValue() {
            return new ThreadLocalSingleton();
        }
    };

    public static ThreadLocalSingleton getInstance() {
        return h.get();
    }

    public static void main(String[] args) {

        ThreadLocalSingleton instance = ThreadLocalSingleton.getInstance();
        ThreadLocalSingleton instance2 = ThreadLocalSingleton.getInstance();
        ThreadLocalSingleton instance3 = ThreadLocalSingleton.getInstance();

        System.out.println(instance);
        System.out.println(instance2);
        System.out.println(instance3); //一样的对象

        Thread t1 = new Thread(new ExecutorDemo());
        Thread t2 = new Thread(new ExecutorDemo());
        t1.start(); // 线程的对象是不一样的
        t2.start();

        System.out.println("end");
    }
}
```


## 总结

>私有化构造器
>
>保证线程安全
>
>延迟加载
>
>防止序列化和反序列化破坏单例
>
>防御反射攻击单例

## 项目源码地址

[https://github.com/dabaoqiang/openTechnology-learning.git](https://github.com/dabaoqiang/openTechnology-learning.git)
