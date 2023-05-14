---
title: 代理模式
icon: note
category:
- 设计模式

---
# 代理模式

>代理模式属于结构型设计模式，是对被代理对象的一种增强。
>
>本文将对代理模式的创建，流程进行详细描述。

## 简介

代理对象在目标对象与增强逻辑之间的一种行为类联合方式。

对某一种对象，又具有普遍性特征或者行为，做一致性的增强处理。

对某一种行为的抽象即是接口，一致性的处理即是代理逻辑，某一种对象即是真实对象。

## 场景

中介找房

打印请求响应日志

黄牛党买票

## 优点

代理模式能将代理对象与真实被调用的目标对象分离，一定程度上降低了系统的耦合程度,易于扩展。

代理可以起到保护目标对象的作用，增强目标对象的职责。

## 缺点

增加系统设计中代理类的数量，增加了复杂度

代理模式基于字节码技术生成会影响性能

## 栗子

### 静态代理

> 找女朋友为例

~~~java
 public interface IPerson {
    /**
     * findLove
     */
    void findLove();
}
~~~

~~~java
public class ZhangSan implements IPerson {
    @Override
    public void findLove() {
        System.out.println("儿子要求：肤白貌美大长腿");
    }
}
~~~

~~~java
public class ZhangLaosan implements IPerson {

    private ZhangSan zhangSan;

    /**
     * 构造函数
     *
     * @param zhangSan
     */
    public ZhangLaosan(ZhangSan zhangSan) {
        this.zhangSan = zhangSan;
    }

    @Override
    public void findLove() {
        System.out.println("张老三开始物色");
        zhangSan.findLove();
        System.out.println("开始交往");
    }
    
}
~~~

~~~java
public class ZhaoLiu implements IPerson{
    @Override
    public void findLove() {
        System.out.println("zl 找小姐姐");
    }
}

~~~

~~~java
/**
 * Created by @author dabaoqiang on 2023/5/14.
 * zhangLaosan因为注入的是具体对象实例，只能为zhangsan找对象，其他zhaoliu就找不到对象，
 * 对zhanglaosan进行抽象，使得能为大家找对象
 */
public class TestDemo {

    public static void main(String[] args) {
        ZhangLaosan zhangLaosan = new ZhangLaosan(new ZhangSan());
        zhangLaosan.findLove();

    }
}
~~~

+ 总结

  > 代理对象的创建方式，就是代理对象构建的时候持有真实对象。
  >
  > 代理对象与真实对象有相同的行为即实现相同接口。

+ 缺点

  > 创建代理对象的时候，构造函数需要依赖具体的对象，而不是依赖其抽象。
  >
  > 静态代理对象使用起来就会局限。

### 动态代理#JDK

>通过JDK动态代理，我们需要解决在生成代理对象的时候，不依赖具体的对象，要依赖对象的共性即接口，
>
>然后通过接口实现类的不同，通过字节码技术`Proxy.newInstance()`生成临时类。

~~~java
 public interface IPerson {
    /**
     * findLove
     */
    void findLove();

    /**
     * buyInsure
     */
    void buyInsure();
}
~~~

~~~java
 public class Zhangsan implements IPerson {
    @Override
    public void findLove() {
        System.out.println("张三要求：肤白貌美大长腿");
    }

    @Override
    public void buyInsure() {
        System.out.println("20万");
    }
}
~~~

~~~java
 public class ZhaoLiu implements IPerson{
    @Override
    public void findLove() {
        System.out.println("赵六要求：位高金多");
    }

    @Override
    public void buyInsure() {
        System.out.println("100W");
    }
}
~~~

~~~java
 public class JdkMeipo implements InvocationHandler {
    /**
     * 真实对象
     */
    private IPerson target;

    /**
     * 回去代理对象
     * @param target
     * @return
     */
    public IPerson getInstance(IPerson target) {
        this.target = target;
        Class<? extends IPerson> aClass = target.getClass();
        return (IPerson) Proxy.newProxyInstance(aClass.getClassLoader(), aClass.getInterfaces(), this);

    }

    @Override
    public Object invoke(Object o, Method method, Object[] objects) throws Throwable {
        after();
        Object invoke = method.invoke(target, objects);
        before();
        return invoke;
    }

    private void after() {
        System.out.println("双方同意，开始交往");
    }

    private void before() {
        System.out.println("我是媒婆，已经收集到你的需求，开始物色");
    }
}
~~~

~~~java
public class Test {

    public static void main(String[] args) {
        JdkMeipo jdkMeipo = new JdkMeipo();
        IPerson instance = jdkMeipo.getInstance(new Zhangsan());
        instance.findLove();

        IPerson instance2 = jdkMeipo.getInstance(new ZhaoLiu());
        instance2.findLove();
        
        // 打印代理类内容
        try {
            byte[] bytes = ProxyGenerator.generateProxyClass("$Proxy0", new Class[]{IPerson.class});
            FileOutputStream file0utputStream = new FileOutputStream("D://developer//document//test//$Proxy0.class");
            file0utputStream.write(bytes);
            file0utputStream.flush();
            file0utputStream.close();
        } catch (Exception e) {
        }        
        
    }
}
~~~

小结

+ 跟静态代理相比，静态代理更加依赖具体对象，然后再进行代码的增强。
+ 动态代理的实现，主要还是依赖了接口，是对某一种特征行为然后衍生的含有一定规律的代码增强。
+ JDK动态代理，主要是使用`Proxy.newInstance()`类加载，类所实现的接口，以及代理类。

### 动态代理#CGlib

~~~java
public class Customer {

    public void findLove(){
        System.out.println("儿子要求：肤白貌美大长腿");
    }
}
~~~

~~~java
public class CGlibMeipo implements MethodInterceptor {

    /**
     * 获取实例
     * @param clazz
     * @return
     * @throws Exception
     */
    public Object getInstance(Class<?> clazz) throws Exception {
        //相当于Proxy，代理的工具类
        Enhancer enhancer = new Enhancer();
        enhancer.setSuperclass(clazz);
        enhancer.setCallback(this);
        return enhancer.create();
    }

    @Override
    public Object intercept(Object o, Method method, Object[] objects, MethodProxy methodProxy) throws Throwable {
        before();
        Object o1 = methodProxy.invokeSuper(o, objects);
        after();
        return o1;

    }

    private void before() {
        System.out.println("我是媒婆，我要给你找对象，现在已经确认你的需求");
    }

    private void after() {
        System.out.println("OK的话，准备办事");
    }
}
~~~

~~~java
public class CglibTest {

    public static void main(String[] args) throws Exception {
        String address = "D://developer//document//test//cglib_proxy_classes";
        System.setProperty(DebuggingClassWriter.DEBUG_LOCATION_PROPERTY, address);
        Customer obj = (Customer) new CGlibMeipo().getInstance(Customer.class);
        System.out.println(obj);
        obj.findLove();
    }
}
~~~

## 源码解析

### JDK代理源码

~~~java
//
// Source code recreated from a .class file by IntelliJ IDEA
// (powered by FernFlower decompiler)
//

import com.dbq.design.proxy.dynamicproxy.jdkproxy.IPerson;
import java.lang.reflect.InvocationHandler;
import java.lang.reflect.Method;
import java.lang.reflect.Proxy;
import java.lang.reflect.UndeclaredThrowableException;

public final class $Proxy0 extends Proxy implements IPerson {
    private static Method m1;
    private static Method m4;
    private static Method m2;
    private static Method m3;
    private static Method m0;
    
    // 构造函数
    public $Proxy0(InvocationHandler var1) throws  {
        super(var1);
    }

    public final boolean equals(Object var1) throws  {
        try {
            return (Boolean)super.h.invoke(this, m1, new Object[]{var1});
        } catch (RuntimeException | Error var3) {
            throw var3;
        } catch (Throwable var4) {
            throw new UndeclaredThrowableException(var4);
        }
    }
    
    // 方法findLove
    public final void findLove() throws  {
        try {
            // 代理$Proxy0调用findLove()
            // 调用父类h是媒婆类
            // 生成的代理类调用媒婆类的方法，媒婆类含有
            super.h.invoke(this, m4, (Object[])null);
        } catch (RuntimeException | Error var2) {
            throw var2;
        } catch (Throwable var3) {
            throw new UndeclaredThrowableException(var3);
        }
    }

    public final String toString() throws  {
        try {
            return (String)super.h.invoke(this, m2, (Object[])null);
        } catch (RuntimeException | Error var2) {
            throw var2;
        } catch (Throwable var3) {
            throw new UndeclaredThrowableException(var3);
        }
    }

    public final void buyInsure() throws  {
        try {
            super.h.invoke(this, m3, (Object[])null);
        } catch (RuntimeException | Error var2) {
            throw var2;
        } catch (Throwable var3) {
            throw new UndeclaredThrowableException(var3);
        }
    }

    public final int hashCode() throws  {
        try {
            return (Integer)super.h.invoke(this, m0, (Object[])null);
        } catch (RuntimeException | Error var2) {
            throw var2;
        } catch (Throwable var3) {
            throw new UndeclaredThrowableException(var3);
        }
    }

    static {
        try {
            m1 = Class.forName("java.lang.Object").getMethod("equals", Class.forName("java.lang.Object"));
            m4 = Class.forName("com.dbq.design.proxy.dynamicproxy.jdkproxy.IPerson").getMethod("findLove");
            m2 = Class.forName("java.lang.Object").getMethod("toString");
            m3 = Class.forName("com.dbq.design.proxy.dynamicproxy.jdkproxy.IPerson").getMethod("buyInsure");
            m0 = Class.forName("java.lang.Object").getMethod("hashCode");
        } catch (NoSuchMethodException var2) {
            throw new NoSuchMethodError(var2.getMessage());
        } catch (ClassNotFoundException var3) {
            throw new NoClassDefFoundError(var3.getMessage());
        }
    }
}
~~~

### CGlib源码

~~~java
public class Customer$$EnhancerByCGLIB$$7a2d4dfa extends Customer implements Factory {
    
    final void CGLIB$findLove$0() {
        super.findLove();
    }

    public final void findLove() {
        MethodInterceptor var10000 = this.CGLIB$CALLBACK_0;
        if (var10000 == null) {
            CGLIB$BIND_CALLBACKS(this);
            var10000 = this.CGLIB$CALLBACK_0;
        }

        if (var10000 != null) {
            var10000.intercept(this, CGLIB$findLove$0$Method, CGLIB$emptyArgs, CGLIB$findLove$0$Proxy);
        } else {
            super.findLove();
        }
    }    
}
~~~

+ 总结

>初始化媒婆的时候，实现`methodIntecepotr`，创建对象的时候，参数传目标对象的`clazz`对象。
>
>使用Enhancer，设置`supperCalss`,`setCallBack `(这个是当前的媒婆对象),然后实现interceptor方法。
>
>Cglib是基于继承的方式重写父类的方法然后去实现。

## JDK动态代理跟CGLIB动态代理的区别

+ 相同点

> 都是基于字节码生产一个新类然然后调用父类的方法去调用目标对象实例的方法;

+ 不同点

> `JDK`是需要接口的，`CGLIB`是不需要接口的，单独的类也行。
> `JDK`是基于反射的性能较低，`CGLIB`是由fast机制，优化的。
> `JDk`对于用户而言依赖更强，调用更复杂。

## 项目源码地址

[https://github.com/dabaoqiang/openTechnology-learning.git](https://github.com/dabaoqiang/openTechnology-learning.git)
