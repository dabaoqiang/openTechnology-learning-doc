---
title: 原型与建造者模式
icon: note
category:
- 设计模式

---
# 建造者模式

>建造者模式是将对复杂对象的创建，根据不同的的构建过程创建不同的职能对象。
>
>本文将对建造者模式的创建进行解释。

## 简介

将复杂对应的构建过程表示分离，使得创建不同的表示

## 场景

当初始化一个对象特别复杂，参数很多，并且参数具有一定的顺序性。

产品类非常复杂，不同的调用顺序产生不同的作用。

## 优点

封装好，创建和使用进行分离。

扩展性好，创建类跟产品类进行分离，解耦。

## 缺点

必须要有共同点。

内部变化多的话，会很多建造类

## 代码栗子

~~~java
public class Course {

    private String name;

    private String ppt;

    private String video;

    private String note;

    private String homework;

    public Course() {
    }


    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public String getPpt() {
        return ppt;
    }

    public void setPpt(String ppt) {
        this.ppt = ppt;
    }

    public String getVideo() {
        return video;
    }

    public void setVideo(String video) {
        this.video = video;
    }

    public String getNote() {
        return note;
    }

    public void setNote(String note) {
        this.note = note;
    }

    public String getHomework() {
        return homework;
    }

    public void setHomework(String homework) {
        this.homework = homework;
    }

    @Override
    public String toString() {
        return "Course{" +
                "name='" + name + '\'' +
                ", ppt='" + ppt + '\'' +
                ", video='" + video + '\'' +
                ", note='" + note + '\'' +
                ", homework='" + homework + '\'' +
                '}';
    }
}
~~~

~~~java
/**
 * Created by @author dabaoqiang on 2023/5/14.
 * 本来直接可以调用course赋值，但是加了层CourseBuilder，负责建造course以及调用它方法
 */
public class CourseBuilder {

    private Course course = new Course();

    public void addName(String name) {
        course.setName(name);
    }

    public void addPPT(String ppt) {
        course.setPpt(ppt);
    }

    public void addVideo(String video) {
        course.setVideo(video);
    }

    public void addNote(String note) {
        course.setNote(note);
    }

    public void addHomework(String homework) {
        course.setHomework(homework);
    }

    public Course build() {
        return course;
    }
}
~~~

+ 升级

~~~java
public class CourseBuilder2 {

    private Course course = new Course();

    public CourseBuilder2 addName(String name) {
        course.setName(name);
        return this;
    }

    public CourseBuilder2 addPPT(String ppt) {
        course.setPpt(ppt);
        return this;
    }

    public CourseBuilder2 addVideo(String video) {
        course.setVideo(video);
        return this;
    }

    public CourseBuilder2 addNote(String note) {
        course.setNote(note);
        return this;
    }

    public CourseBuilder2 addHomework(String homework) {
        course.setHomework(homework);
        return this;
    }

    public Course build() {
        return this.course;
    }
}
~~~

~~~java
public class Demo {

    public static void main(String[] args) {
        CourseBuilder courseBuilder = new CourseBuilder();
        Course build = courseBuilder.build();
        build.setName("xq");
        build.setHomework("link");
        System.out.println(build.toString());

        // 链式调用
        CourseBuilder2 courseBuilder2 = new CourseBuilder2().addName("设计模式")
                .addPPT("【PPT课件】")
                .addVideo("【回放视频】")
                .addNote("【课堂笔记】")
                .addHomework("【课后作业】");
        System.out.println(courseBuilder2.build());
    }
}
~~~

## 项目源码地址

[https://github.com/dabaoqiang/openTechnology-learning.git](https://github.com/dabaoqiang/openTechnology-learning.git)
