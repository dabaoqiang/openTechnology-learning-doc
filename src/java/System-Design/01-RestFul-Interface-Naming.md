---
title: RestFul API教程
icon: article
category:
- 系统设计

---
# RestFul API教程

>探讨如何设计一套合理、好用的API。
>
>本文将介绍如何定义请求的url命名规范。

## 是什么

如果一个架构符合REST原则，就称它为RESTful架构。

Fielding将他对互联网软件的架构原则，定名为REST，即Representational State Transfer的缩写。翻译是"表现层状态转化"。

REST的名称"表现层状态转化"中，省略了主语，"表现层"其实指的是"资源"（Resources）的"表现层"。

### 资源

"资源"，就是网络上的一个实体，或者说是网络上的一个具体信息。

> 它可以是一段文本、一张图片、一首歌曲、一种服务，总之就是一个具体的实在。

### 表现层

"资源"是一种信息实体，它可以有多种外在表现形式。我们把"资源"具体呈现出来的形式，叫做它的"表现层"（Representation）。

> 比如，文本可以用txt格式表现，也可以用HTML格式、XML格式、JSON格式表现，甚至可以采用二进制格式；图片可以用JPG格式表现，也可以用PNG格式表现。

### 状态转化

如果客户端想要操作服务器，必须通过某种手段，让服务器端发生"状态转化"（State Transfer）。

而这种转化是建立在表现层之上的，所以就是"表现层状态转化"。

>访问一个网站，就代表了客户端和服务器的一个互动过程。在这个过程中，势必涉及到数据和状态的变化。

### 状态转换的动作

客户端用到的手段，只能是HTTP协议。具体来说，就是HTTP协议里面，四个表示操作方式的动词：GET、POST、PUT、DELETE。

> 它们分别对应四种基本操作：
>
> GET用来获取资源，POST用来新建资源（也可以用于更新资源），PUT用来更新资源，DELETE用来删除资源。

## 怎么办

### 简介

>表现形式

https://api.example.com/v1/zoos

> 协议+域名+版本+路径

### 协议

>API与用户的通信协议，总是使用[HTTPs协议](https://www.ruanyifeng.com/blog/2014/02/ssl_tls.html)。

### 域名

>API部署在专用域名之下。

### 版本号

> 将API版本号放入URL。

### 路径资源(接口命名)

> + 路径代表访问的资源，所以访问不能有动词，只能是名词，数据库中的表示同种记录的集合，名词用复数。
>
> + 不用大写字母，建议用中杠 - 不用下杠 _ 。
> + 接口尽量使用名词，避免使用动词。

### HTTP行为

~~~tex
- GET（SELECT）：从服务器取出资源（一项或多项）。
- POST（CREATE）：在服务器新建一个资源。
- PUT（UPDATE）：在服务器更新资源（客户端提供改变后的完整资源）。
- PATCH（UPDATE）：在服务器更新资源（客户端提供改变的属性）。
- DELETE（DELETE）：从服务器删除资源。
~~~

不常用的HTTP动词。

~~~tex
- HEAD：获取资源的元数据。
- OPTIONS：获取信息，关于资源的哪些属性是客户端可以改变的。
~~~

### 其他

+ API的身份认证应该使用[OAuth 2.0](https://www.ruanyifeng.com/blog/2014/05/oauth_2_0.html)框架。

+ 服务器返回的数据格式，应该尽量使用JSON，避免使用XML。

## 栗子

### 基础

~~~tex
- GET /zoos：列出所有动物园
- POST /zoos：新建一个动物园
- GET /zoos/ID：获取某个指定动物园的信息
- PUT /zoos/ID：更新某个指定动物园的信息（提供该动物园的全部信息）
- PATCH /zoos/ID：更新某个指定动物园的信息（提供该动物园的部分信息）
- DELETE /zoos/ID：删除某个动物园
- GET /zoos/ID/animals：列出某个指定动物园的所有动物
- DELETE /zoos/ID/animals/ID：删除某个指定动物园的指定动物
~~~

### 查询

~~~te
- ?limit=10：指定返回记录的数量
- ?offset=10：指定返回记录的开始位置。
- ?page=2&per_page=100：指定第几页，以及每页的记录数。
- ?sortby=name&order=asc：指定返回结果按照哪个属性排序，以及排序顺序。
- ?animal_type_id=1：指定筛选条件
~~~

### 状态码（Status Codes）

> 服务器向用户返回的状态码和提示信息，常见的有以下一些（方括号中是该状态码对应的HTTP动词）。

~~~tex
- 200 OK - [GET]：服务器成功返回用户请求的数据，该操作是幂等的（Idempotent）。
- 201 CREATED - [POST/PUT/PATCH]：用户新建或修改数据成功。
- 202 Accepted - [*]：表示一个请求已经进入后台排队（异步任务）
- 204 NO CONTENT - [DELETE]：用户删除数据成功。
- 400 INVALID REQUEST - [POST/PUT/PATCH]：用户发出的请求有错误，服务器没有进行新建或修改数据的操作，该操作是幂等的。
- 401 Unauthorized - [*]：表示用户没有权限（令牌、用户名、密码错误）。
- 403 Forbidden - [*] 表示用户得到授权（与401错误相对），但是访问是被禁止的。
- 404 NOT FOUND - [*]：用户发出的请求针对的是不存在的记录，服务器没有进行操作，该操作是幂等的。
- 406 Not Acceptable - [GET]：用户请求的格式不可得（比如用户请求JSON格式，但是只有XML格式）。
- 410 Gone -[GET]：用户请求的资源被永久删除，且不会再得到的。
- 422 Unprocesable entity - [POST/PUT/PATCH] 当创建一个对象时，发生一个验证错误。
- 500 INTERNAL SERVER ERROR - [*]：服务器发生错误，用户将无法判断发出的请求是否成功。
~~~

### 错误处理（Error handling）

> 如果状态码是4xx，就应该向用户返回出错信息。一般来说，返回的信息中将error作为键名，出错信息作为键值即可。

~~~json
{
    error: "Invalid API key"
}
~~~

### 返回数据

~~~tex
- GET /collection：返回资源对象的列表（数组）
- GET /collection/resource：返回单个资源对象
- POST /collection：返回新生成的资源对象
- PUT /collection/resource：返回完整的资源对象
- PATCH /collection/resource：返回完整的资源对象
- DELETE /collection/resource：返回一个空文档
~~~

### 完整实例

~~~tex
GET    https://api.example.com/v1/classes：列出所有班级
POST   https://api.example.com/v1/classes：新建一个班级
GET    https://api.example.com/v1/classes/{classId}：获取某个指定班级的信息
PUT    https://api.example.com/v1/classes/{classId}：更新某个指定班级的信息（一般倾向整体更新）
PATCH  https://api.example.com/v1/classes/{classId}：更新某个指定班级的信息（一般倾向部分更新）
DELETE https://api.example.com/v1/classes/{classId}：删除某个班级
GET    https://api.example.com/v1/classes/{classId}/teachers：列出某个指定班级的所有老师的信息
GET    https://api.example.com/v1/classes/{classId}/students：列出某个指定班级的所有学生的信息
DELETE https://api.example.com/v1/classes/{classId}/teachers/{ID}：删除某个指定班级下的指定的老师的信息
~~~

## 总结

接口命名方式行为由Http动作决定。

接口命名按照协议+域名+版本号+路径。

接口路径命名是名词，不是动词，是名词的复数形式。


