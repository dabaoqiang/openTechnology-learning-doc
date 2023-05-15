import{_ as t,X as l,Y as c,Z as e,$ as a,a0 as s,a1 as i,F as d}from"./framework-48078774.js";const o={},r=i('<h1 id="restful-api教程" tabindex="-1"><a class="header-anchor" href="#restful-api教程" aria-hidden="true">#</a> RestFul API教程</h1><blockquote><p>探讨如何设计一套合理、好用的API。</p><p>本文将介绍如何定义请求的url命名规范。</p></blockquote><h2 id="是什么" tabindex="-1"><a class="header-anchor" href="#是什么" aria-hidden="true">#</a> 是什么</h2><p>如果一个架构符合REST原则，就称它为RESTful架构。</p><p>Fielding将他对互联网软件的架构原则，定名为REST，即Representational State Transfer的缩写。翻译是&quot;表现层状态转化&quot;。</p><p>REST的名称&quot;表现层状态转化&quot;中，省略了主语，&quot;表现层&quot;其实指的是&quot;资源&quot;（Resources）的&quot;表现层&quot;。</p><h3 id="资源" tabindex="-1"><a class="header-anchor" href="#资源" aria-hidden="true">#</a> 资源</h3><p>&quot;资源&quot;，就是网络上的一个实体，或者说是网络上的一个具体信息。</p><blockquote><p>它可以是一段文本、一张图片、一首歌曲、一种服务，总之就是一个具体的实在。</p></blockquote><h3 id="表现层" tabindex="-1"><a class="header-anchor" href="#表现层" aria-hidden="true">#</a> 表现层</h3><p>&quot;资源&quot;是一种信息实体，它可以有多种外在表现形式。我们把&quot;资源&quot;具体呈现出来的形式，叫做它的&quot;表现层&quot;（Representation）。</p><blockquote><p>比如，文本可以用txt格式表现，也可以用HTML格式、XML格式、JSON格式表现，甚至可以采用二进制格式；图片可以用JPG格式表现，也可以用PNG格式表现。</p></blockquote><h3 id="状态转化" tabindex="-1"><a class="header-anchor" href="#状态转化" aria-hidden="true">#</a> 状态转化</h3><p>如果客户端想要操作服务器，必须通过某种手段，让服务器端发生&quot;状态转化&quot;（State Transfer）。</p><p>而这种转化是建立在表现层之上的，所以就是&quot;表现层状态转化&quot;。</p><blockquote><p>访问一个网站，就代表了客户端和服务器的一个互动过程。在这个过程中，势必涉及到数据和状态的变化。</p></blockquote><h3 id="状态转换的动作" tabindex="-1"><a class="header-anchor" href="#状态转换的动作" aria-hidden="true">#</a> 状态转换的动作</h3><p>客户端用到的手段，只能是HTTP协议。具体来说，就是HTTP协议里面，四个表示操作方式的动词：GET、POST、PUT、DELETE。</p><blockquote><p>它们分别对应四种基本操作：</p><p>GET用来获取资源，POST用来新建资源（也可以用于更新资源），PUT用来更新资源，DELETE用来删除资源。</p></blockquote><h2 id="怎么办" tabindex="-1"><a class="header-anchor" href="#怎么办" aria-hidden="true">#</a> 怎么办</h2><h3 id="简介" tabindex="-1"><a class="header-anchor" href="#简介" aria-hidden="true">#</a> 简介</h3><blockquote><p>表现形式</p></blockquote>',22),u={href:"https://api.example.com/v1/zoos",target:"_blank",rel:"noopener noreferrer"},p=e("blockquote",null,[e("p",null,"协议+域名+版本+路径")],-1),h=e("h3",{id:"协议",tabindex:"-1"},[e("a",{class:"header-anchor",href:"#协议","aria-hidden":"true"},"#"),a(" 协议")],-1),v={href:"https://www.ruanyifeng.com/blog/2014/02/ssl_tls.html",target:"_blank",rel:"noopener noreferrer"},b=i(`<h3 id="域名" tabindex="-1"><a class="header-anchor" href="#域名" aria-hidden="true">#</a> 域名</h3><blockquote><p>API部署在专用域名之下。</p></blockquote><h3 id="版本号" tabindex="-1"><a class="header-anchor" href="#版本号" aria-hidden="true">#</a> 版本号</h3><blockquote><p>将API版本号放入URL。</p></blockquote><h3 id="路径资源-接口命名" tabindex="-1"><a class="header-anchor" href="#路径资源-接口命名" aria-hidden="true">#</a> 路径资源(接口命名)</h3><blockquote><ul><li><p>路径代表访问的资源，所以访问不能有动词，只能是名词，数据库中的表示同种记录的集合，名词用复数。</p></li><li><p>不用大写字母，建议用中杠 - 不用下杠 _ 。</p></li><li><p>接口尽量使用名词，避免使用动词。</p></li></ul></blockquote><h3 id="http行为" tabindex="-1"><a class="header-anchor" href="#http行为" aria-hidden="true">#</a> HTTP行为</h3><div class="language-tex line-numbers-mode" data-ext="tex"><pre class="language-tex"><code>- GET（SELECT）：从服务器取出资源（一项或多项）。
- POST（CREATE）：在服务器新建一个资源。
- PUT（UPDATE）：在服务器更新资源（客户端提供改变后的完整资源）。
- PATCH（UPDATE）：在服务器更新资源（客户端提供改变的属性）。
- DELETE（DELETE）：从服务器删除资源。
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>不常用的HTTP动词。</p><div class="language-tex line-numbers-mode" data-ext="tex"><pre class="language-tex"><code>- HEAD：获取资源的元数据。
- OPTIONS：获取信息，关于资源的哪些属性是客户端可以改变的。
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="其他" tabindex="-1"><a class="header-anchor" href="#其他" aria-hidden="true">#</a> 其他</h3>`,11),m={href:"https://www.ruanyifeng.com/blog/2014/05/oauth_2_0.html",target:"_blank",rel:"noopener noreferrer"},T=e("li",null,[e("p",null,"服务器返回的数据格式，应该尽量使用JSON，避免使用XML。")],-1),k=i(`<h2 id="栗子" tabindex="-1"><a class="header-anchor" href="#栗子" aria-hidden="true">#</a> 栗子</h2><h3 id="基础" tabindex="-1"><a class="header-anchor" href="#基础" aria-hidden="true">#</a> 基础</h3><div class="language-tex line-numbers-mode" data-ext="tex"><pre class="language-tex"><code>- GET /zoos：列出所有动物园
- POST /zoos：新建一个动物园
- GET /zoos/ID：获取某个指定动物园的信息
- PUT /zoos/ID：更新某个指定动物园的信息（提供该动物园的全部信息）
- PATCH /zoos/ID：更新某个指定动物园的信息（提供该动物园的部分信息）
- DELETE /zoos/ID：删除某个动物园
- GET /zoos/ID/animals：列出某个指定动物园的所有动物
- DELETE /zoos/ID/animals/ID：删除某个指定动物园的指定动物
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="查询" tabindex="-1"><a class="header-anchor" href="#查询" aria-hidden="true">#</a> 查询</h3><div class="language-te line-numbers-mode" data-ext="te"><pre class="language-te"><code>- ?limit=10：指定返回记录的数量
- ?offset=10：指定返回记录的开始位置。
- ?page=2&amp;per_page=100：指定第几页，以及每页的记录数。
- ?sortby=name&amp;order=asc：指定返回结果按照哪个属性排序，以及排序顺序。
- ?animal_type_id=1：指定筛选条件
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="状态码-status-codes" tabindex="-1"><a class="header-anchor" href="#状态码-status-codes" aria-hidden="true">#</a> 状态码（Status Codes）</h3><blockquote><p>服务器向用户返回的状态码和提示信息，常见的有以下一些（方括号中是该状态码对应的HTTP动词）。</p></blockquote><div class="language-tex line-numbers-mode" data-ext="tex"><pre class="language-tex"><code>- 200 OK - <span class="token punctuation">[</span>GET<span class="token punctuation">]</span>：服务器成功返回用户请求的数据，该操作是幂等的（Idempotent）。
- 201 CREATED - <span class="token punctuation">[</span>POST/PUT/PATCH<span class="token punctuation">]</span>：用户新建或修改数据成功。
- 202 Accepted - <span class="token punctuation">[</span>*<span class="token punctuation">]</span>：表示一个请求已经进入后台排队（异步任务）
- 204 NO CONTENT - <span class="token punctuation">[</span>DELETE<span class="token punctuation">]</span>：用户删除数据成功。
- 400 INVALID REQUEST - <span class="token punctuation">[</span>POST/PUT/PATCH<span class="token punctuation">]</span>：用户发出的请求有错误，服务器没有进行新建或修改数据的操作，该操作是幂等的。
- 401 Unauthorized - <span class="token punctuation">[</span>*<span class="token punctuation">]</span>：表示用户没有权限（令牌、用户名、密码错误）。
- 403 Forbidden - <span class="token punctuation">[</span>*<span class="token punctuation">]</span> 表示用户得到授权（与401错误相对），但是访问是被禁止的。
- 404 NOT FOUND - <span class="token punctuation">[</span>*<span class="token punctuation">]</span>：用户发出的请求针对的是不存在的记录，服务器没有进行操作，该操作是幂等的。
- 406 Not Acceptable - <span class="token punctuation">[</span>GET<span class="token punctuation">]</span>：用户请求的格式不可得（比如用户请求JSON格式，但是只有XML格式）。
- 410 Gone -<span class="token punctuation">[</span>GET<span class="token punctuation">]</span>：用户请求的资源被永久删除，且不会再得到的。
- 422 Unprocesable entity - <span class="token punctuation">[</span>POST/PUT/PATCH<span class="token punctuation">]</span> 当创建一个对象时，发生一个验证错误。
- 500 INTERNAL SERVER ERROR - <span class="token punctuation">[</span>*<span class="token punctuation">]</span>：服务器发生错误，用户将无法判断发出的请求是否成功。
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="错误处理-error-handling" tabindex="-1"><a class="header-anchor" href="#错误处理-error-handling" aria-hidden="true">#</a> 错误处理（Error handling）</h3><blockquote><p>如果状态码是4xx，就应该向用户返回出错信息。一般来说，返回的信息中将error作为键名，出错信息作为键值即可。</p></blockquote><div class="language-json line-numbers-mode" data-ext="json"><pre class="language-json"><code><span class="token punctuation">{</span>
    error<span class="token operator">:</span> <span class="token string">&quot;Invalid API key&quot;</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="返回数据" tabindex="-1"><a class="header-anchor" href="#返回数据" aria-hidden="true">#</a> 返回数据</h3><div class="language-tex line-numbers-mode" data-ext="tex"><pre class="language-tex"><code>- GET /collection：返回资源对象的列表（数组）
- GET /collection/resource：返回单个资源对象
- POST /collection：返回新生成的资源对象
- PUT /collection/resource：返回完整的资源对象
- PATCH /collection/resource：返回完整的资源对象
- DELETE /collection/resource：返回一个空文档
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="完整实例" tabindex="-1"><a class="header-anchor" href="#完整实例" aria-hidden="true">#</a> 完整实例</h3><div class="language-tex line-numbers-mode" data-ext="tex"><pre class="language-tex"><code>GET    https://api.example.com/v1/classes：列出所有班级
POST   https://api.example.com/v1/classes：新建一个班级
GET    https://api.example.com/v1/classes/<span class="token punctuation">{</span>classId<span class="token punctuation">}</span>：获取某个指定班级的信息
PUT    https://api.example.com/v1/classes/<span class="token punctuation">{</span>classId<span class="token punctuation">}</span>：更新某个指定班级的信息（一般倾向整体更新）
PATCH  https://api.example.com/v1/classes/<span class="token punctuation">{</span>classId<span class="token punctuation">}</span>：更新某个指定班级的信息（一般倾向部分更新）
DELETE https://api.example.com/v1/classes/<span class="token punctuation">{</span>classId<span class="token punctuation">}</span>：删除某个班级
GET    https://api.example.com/v1/classes/<span class="token punctuation">{</span>classId<span class="token punctuation">}</span>/teachers：列出某个指定班级的所有老师的信息
GET    https://api.example.com/v1/classes/<span class="token punctuation">{</span>classId<span class="token punctuation">}</span>/students：列出某个指定班级的所有学生的信息
DELETE https://api.example.com/v1/classes/<span class="token punctuation">{</span>classId<span class="token punctuation">}</span>/teachers/<span class="token punctuation">{</span>ID<span class="token punctuation">}</span>：删除某个指定班级下的指定的老师的信息
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h2 id="总结" tabindex="-1"><a class="header-anchor" href="#总结" aria-hidden="true">#</a> 总结</h2><p>接口命名方式行为由Http动作决定。</p><p>接口命名按照协议+域名+版本号+路径。</p><p>接口路径命名是名词，不是动词，是名词的复数形式。</p>`,19);function E(x,g){const n=d("ExternalLinkIcon");return l(),c("div",null,[r,e("p",null,[e("a",u,[a("https://api.example.com/v1/zoos"),s(n)])]),p,h,e("blockquote",null,[e("p",null,[a("API与用户的通信协议，总是使用"),e("a",v,[a("HTTPs协议"),s(n)]),a("。")])]),b,e("ul",null,[e("li",null,[e("p",null,[a("API的身份认证应该使用"),e("a",m,[a("OAuth 2.0"),s(n)]),a("框架。")])]),T]),k])}const f=t(o,[["render",E],["__file","01-RestFul-Interface-Naming.html.vue"]]);export{f as default};
