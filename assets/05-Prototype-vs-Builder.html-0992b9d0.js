import{_ as a,X as p,Y as e,Z as n,$ as t,a0 as o,a1 as c,F as i}from"./framework-48078774.js";const l={},u=c(`<h1 id="建造者模式" tabindex="-1"><a class="header-anchor" href="#建造者模式" aria-hidden="true">#</a> 建造者模式</h1><blockquote><p>建造者模式是将对复杂对象的创建，根据不同的的构建过程创建不同的职能对象。</p><p>本文将对建造者模式的创建进行解释。</p></blockquote><h2 id="简介" tabindex="-1"><a class="header-anchor" href="#简介" aria-hidden="true">#</a> 简介</h2><p>将复杂对应的构建过程表示分离，使得创建不同的表示</p><h2 id="场景" tabindex="-1"><a class="header-anchor" href="#场景" aria-hidden="true">#</a> 场景</h2><p>当初始化一个对象特别复杂，参数很多，并且参数具有一定的顺序性。</p><p>产品类非常复杂，不同的调用顺序产生不同的作用。</p><h2 id="优点" tabindex="-1"><a class="header-anchor" href="#优点" aria-hidden="true">#</a> 优点</h2><p>封装好，创建和使用进行分离。</p><p>扩展性好，创建类跟产品类进行分离，解耦。</p><h2 id="缺点" tabindex="-1"><a class="header-anchor" href="#缺点" aria-hidden="true">#</a> 缺点</h2><p>必须要有共同点。</p><p>内部变化多的话，会很多建造类</p><h2 id="代码栗子" tabindex="-1"><a class="header-anchor" href="#代码栗子" aria-hidden="true">#</a> 代码栗子</h2><div class="language-java line-numbers-mode" data-ext="java"><pre class="language-java"><code><span class="token keyword">public</span> <span class="token keyword">class</span> <span class="token class-name">Course</span> <span class="token punctuation">{</span>

    <span class="token keyword">private</span> <span class="token class-name">String</span> name<span class="token punctuation">;</span>

    <span class="token keyword">private</span> <span class="token class-name">String</span> ppt<span class="token punctuation">;</span>

    <span class="token keyword">private</span> <span class="token class-name">String</span> video<span class="token punctuation">;</span>

    <span class="token keyword">private</span> <span class="token class-name">String</span> note<span class="token punctuation">;</span>

    <span class="token keyword">private</span> <span class="token class-name">String</span> homework<span class="token punctuation">;</span>

    <span class="token keyword">public</span> <span class="token class-name">Course</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
    <span class="token punctuation">}</span>


    <span class="token keyword">public</span> <span class="token class-name">String</span> <span class="token function">getName</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
        <span class="token keyword">return</span> name<span class="token punctuation">;</span>
    <span class="token punctuation">}</span>

    <span class="token keyword">public</span> <span class="token keyword">void</span> <span class="token function">setName</span><span class="token punctuation">(</span><span class="token class-name">String</span> name<span class="token punctuation">)</span> <span class="token punctuation">{</span>
        <span class="token keyword">this</span><span class="token punctuation">.</span>name <span class="token operator">=</span> name<span class="token punctuation">;</span>
    <span class="token punctuation">}</span>

    <span class="token keyword">public</span> <span class="token class-name">String</span> <span class="token function">getPpt</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
        <span class="token keyword">return</span> ppt<span class="token punctuation">;</span>
    <span class="token punctuation">}</span>

    <span class="token keyword">public</span> <span class="token keyword">void</span> <span class="token function">setPpt</span><span class="token punctuation">(</span><span class="token class-name">String</span> ppt<span class="token punctuation">)</span> <span class="token punctuation">{</span>
        <span class="token keyword">this</span><span class="token punctuation">.</span>ppt <span class="token operator">=</span> ppt<span class="token punctuation">;</span>
    <span class="token punctuation">}</span>

    <span class="token keyword">public</span> <span class="token class-name">String</span> <span class="token function">getVideo</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
        <span class="token keyword">return</span> video<span class="token punctuation">;</span>
    <span class="token punctuation">}</span>

    <span class="token keyword">public</span> <span class="token keyword">void</span> <span class="token function">setVideo</span><span class="token punctuation">(</span><span class="token class-name">String</span> video<span class="token punctuation">)</span> <span class="token punctuation">{</span>
        <span class="token keyword">this</span><span class="token punctuation">.</span>video <span class="token operator">=</span> video<span class="token punctuation">;</span>
    <span class="token punctuation">}</span>

    <span class="token keyword">public</span> <span class="token class-name">String</span> <span class="token function">getNote</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
        <span class="token keyword">return</span> note<span class="token punctuation">;</span>
    <span class="token punctuation">}</span>

    <span class="token keyword">public</span> <span class="token keyword">void</span> <span class="token function">setNote</span><span class="token punctuation">(</span><span class="token class-name">String</span> note<span class="token punctuation">)</span> <span class="token punctuation">{</span>
        <span class="token keyword">this</span><span class="token punctuation">.</span>note <span class="token operator">=</span> note<span class="token punctuation">;</span>
    <span class="token punctuation">}</span>

    <span class="token keyword">public</span> <span class="token class-name">String</span> <span class="token function">getHomework</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
        <span class="token keyword">return</span> homework<span class="token punctuation">;</span>
    <span class="token punctuation">}</span>

    <span class="token keyword">public</span> <span class="token keyword">void</span> <span class="token function">setHomework</span><span class="token punctuation">(</span><span class="token class-name">String</span> homework<span class="token punctuation">)</span> <span class="token punctuation">{</span>
        <span class="token keyword">this</span><span class="token punctuation">.</span>homework <span class="token operator">=</span> homework<span class="token punctuation">;</span>
    <span class="token punctuation">}</span>

    <span class="token annotation punctuation">@Override</span>
    <span class="token keyword">public</span> <span class="token class-name">String</span> <span class="token function">toString</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
        <span class="token keyword">return</span> <span class="token string">&quot;Course{&quot;</span> <span class="token operator">+</span>
                <span class="token string">&quot;name=&#39;&quot;</span> <span class="token operator">+</span> name <span class="token operator">+</span> <span class="token char">&#39;\\&#39;&#39;</span> <span class="token operator">+</span>
                <span class="token string">&quot;, ppt=&#39;&quot;</span> <span class="token operator">+</span> ppt <span class="token operator">+</span> <span class="token char">&#39;\\&#39;&#39;</span> <span class="token operator">+</span>
                <span class="token string">&quot;, video=&#39;&quot;</span> <span class="token operator">+</span> video <span class="token operator">+</span> <span class="token char">&#39;\\&#39;&#39;</span> <span class="token operator">+</span>
                <span class="token string">&quot;, note=&#39;&quot;</span> <span class="token operator">+</span> note <span class="token operator">+</span> <span class="token char">&#39;\\&#39;&#39;</span> <span class="token operator">+</span>
                <span class="token string">&quot;, homework=&#39;&quot;</span> <span class="token operator">+</span> homework <span class="token operator">+</span> <span class="token char">&#39;\\&#39;&#39;</span> <span class="token operator">+</span>
                <span class="token char">&#39;}&#39;</span><span class="token punctuation">;</span>
    <span class="token punctuation">}</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><div class="language-java line-numbers-mode" data-ext="java"><pre class="language-java"><code><span class="token doc-comment comment">/**
 * Created by @author dabaoqiang on 2023/5/14.
 * 本来直接可以调用course赋值，但是加了层CourseBuilder，负责建造course以及调用它方法
 */</span>
<span class="token keyword">public</span> <span class="token keyword">class</span> <span class="token class-name">CourseBuilder</span> <span class="token punctuation">{</span>

    <span class="token keyword">private</span> <span class="token class-name">Course</span> course <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token class-name">Course</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>

    <span class="token keyword">public</span> <span class="token keyword">void</span> <span class="token function">addName</span><span class="token punctuation">(</span><span class="token class-name">String</span> name<span class="token punctuation">)</span> <span class="token punctuation">{</span>
        course<span class="token punctuation">.</span><span class="token function">setName</span><span class="token punctuation">(</span>name<span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token punctuation">}</span>

    <span class="token keyword">public</span> <span class="token keyword">void</span> <span class="token function">addPPT</span><span class="token punctuation">(</span><span class="token class-name">String</span> ppt<span class="token punctuation">)</span> <span class="token punctuation">{</span>
        course<span class="token punctuation">.</span><span class="token function">setPpt</span><span class="token punctuation">(</span>ppt<span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token punctuation">}</span>

    <span class="token keyword">public</span> <span class="token keyword">void</span> <span class="token function">addVideo</span><span class="token punctuation">(</span><span class="token class-name">String</span> video<span class="token punctuation">)</span> <span class="token punctuation">{</span>
        course<span class="token punctuation">.</span><span class="token function">setVideo</span><span class="token punctuation">(</span>video<span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token punctuation">}</span>

    <span class="token keyword">public</span> <span class="token keyword">void</span> <span class="token function">addNote</span><span class="token punctuation">(</span><span class="token class-name">String</span> note<span class="token punctuation">)</span> <span class="token punctuation">{</span>
        course<span class="token punctuation">.</span><span class="token function">setNote</span><span class="token punctuation">(</span>note<span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token punctuation">}</span>

    <span class="token keyword">public</span> <span class="token keyword">void</span> <span class="token function">addHomework</span><span class="token punctuation">(</span><span class="token class-name">String</span> homework<span class="token punctuation">)</span> <span class="token punctuation">{</span>
        course<span class="token punctuation">.</span><span class="token function">setHomework</span><span class="token punctuation">(</span>homework<span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token punctuation">}</span>

    <span class="token keyword">public</span> <span class="token class-name">Course</span> <span class="token function">build</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
        <span class="token keyword">return</span> course<span class="token punctuation">;</span>
    <span class="token punctuation">}</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><ul><li>升级</li></ul><div class="language-java line-numbers-mode" data-ext="java"><pre class="language-java"><code><span class="token keyword">public</span> <span class="token keyword">class</span> <span class="token class-name">CourseBuilder2</span> <span class="token punctuation">{</span>

    <span class="token keyword">private</span> <span class="token class-name">Course</span> course <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token class-name">Course</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>

    <span class="token keyword">public</span> <span class="token class-name">CourseBuilder2</span> <span class="token function">addName</span><span class="token punctuation">(</span><span class="token class-name">String</span> name<span class="token punctuation">)</span> <span class="token punctuation">{</span>
        course<span class="token punctuation">.</span><span class="token function">setName</span><span class="token punctuation">(</span>name<span class="token punctuation">)</span><span class="token punctuation">;</span>
        <span class="token keyword">return</span> <span class="token keyword">this</span><span class="token punctuation">;</span>
    <span class="token punctuation">}</span>

    <span class="token keyword">public</span> <span class="token class-name">CourseBuilder2</span> <span class="token function">addPPT</span><span class="token punctuation">(</span><span class="token class-name">String</span> ppt<span class="token punctuation">)</span> <span class="token punctuation">{</span>
        course<span class="token punctuation">.</span><span class="token function">setPpt</span><span class="token punctuation">(</span>ppt<span class="token punctuation">)</span><span class="token punctuation">;</span>
        <span class="token keyword">return</span> <span class="token keyword">this</span><span class="token punctuation">;</span>
    <span class="token punctuation">}</span>

    <span class="token keyword">public</span> <span class="token class-name">CourseBuilder2</span> <span class="token function">addVideo</span><span class="token punctuation">(</span><span class="token class-name">String</span> video<span class="token punctuation">)</span> <span class="token punctuation">{</span>
        course<span class="token punctuation">.</span><span class="token function">setVideo</span><span class="token punctuation">(</span>video<span class="token punctuation">)</span><span class="token punctuation">;</span>
        <span class="token keyword">return</span> <span class="token keyword">this</span><span class="token punctuation">;</span>
    <span class="token punctuation">}</span>

    <span class="token keyword">public</span> <span class="token class-name">CourseBuilder2</span> <span class="token function">addNote</span><span class="token punctuation">(</span><span class="token class-name">String</span> note<span class="token punctuation">)</span> <span class="token punctuation">{</span>
        course<span class="token punctuation">.</span><span class="token function">setNote</span><span class="token punctuation">(</span>note<span class="token punctuation">)</span><span class="token punctuation">;</span>
        <span class="token keyword">return</span> <span class="token keyword">this</span><span class="token punctuation">;</span>
    <span class="token punctuation">}</span>

    <span class="token keyword">public</span> <span class="token class-name">CourseBuilder2</span> <span class="token function">addHomework</span><span class="token punctuation">(</span><span class="token class-name">String</span> homework<span class="token punctuation">)</span> <span class="token punctuation">{</span>
        course<span class="token punctuation">.</span><span class="token function">setHomework</span><span class="token punctuation">(</span>homework<span class="token punctuation">)</span><span class="token punctuation">;</span>
        <span class="token keyword">return</span> <span class="token keyword">this</span><span class="token punctuation">;</span>
    <span class="token punctuation">}</span>

    <span class="token keyword">public</span> <span class="token class-name">Course</span> <span class="token function">build</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
        <span class="token keyword">return</span> <span class="token keyword">this</span><span class="token punctuation">.</span>course<span class="token punctuation">;</span>
    <span class="token punctuation">}</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><div class="language-java line-numbers-mode" data-ext="java"><pre class="language-java"><code><span class="token keyword">public</span> <span class="token keyword">class</span> <span class="token class-name">Demo</span> <span class="token punctuation">{</span>

    <span class="token keyword">public</span> <span class="token keyword">static</span> <span class="token keyword">void</span> <span class="token function">main</span><span class="token punctuation">(</span><span class="token class-name">String</span><span class="token punctuation">[</span><span class="token punctuation">]</span> args<span class="token punctuation">)</span> <span class="token punctuation">{</span>
        <span class="token class-name">CourseBuilder</span> courseBuilder <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token class-name">CourseBuilder</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
        <span class="token class-name">Course</span> build <span class="token operator">=</span> courseBuilder<span class="token punctuation">.</span><span class="token function">build</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
        build<span class="token punctuation">.</span><span class="token function">setName</span><span class="token punctuation">(</span><span class="token string">&quot;xq&quot;</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
        build<span class="token punctuation">.</span><span class="token function">setHomework</span><span class="token punctuation">(</span><span class="token string">&quot;link&quot;</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
        <span class="token class-name">System</span><span class="token punctuation">.</span>out<span class="token punctuation">.</span><span class="token function">println</span><span class="token punctuation">(</span>build<span class="token punctuation">.</span><span class="token function">toString</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">;</span>

        <span class="token comment">// 链式调用</span>
        <span class="token class-name">CourseBuilder2</span> courseBuilder2 <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token class-name">CourseBuilder2</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">.</span><span class="token function">addName</span><span class="token punctuation">(</span><span class="token string">&quot;设计模式&quot;</span><span class="token punctuation">)</span>
                <span class="token punctuation">.</span><span class="token function">addPPT</span><span class="token punctuation">(</span><span class="token string">&quot;【PPT课件】&quot;</span><span class="token punctuation">)</span>
                <span class="token punctuation">.</span><span class="token function">addVideo</span><span class="token punctuation">(</span><span class="token string">&quot;【回放视频】&quot;</span><span class="token punctuation">)</span>
                <span class="token punctuation">.</span><span class="token function">addNote</span><span class="token punctuation">(</span><span class="token string">&quot;【课堂笔记】&quot;</span><span class="token punctuation">)</span>
                <span class="token punctuation">.</span><span class="token function">addHomework</span><span class="token punctuation">(</span><span class="token string">&quot;【课后作业】&quot;</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
        <span class="token class-name">System</span><span class="token punctuation">.</span>out<span class="token punctuation">.</span><span class="token function">println</span><span class="token punctuation">(</span>courseBuilder2<span class="token punctuation">.</span><span class="token function">build</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token punctuation">}</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h2 id="项目源码地址" tabindex="-1"><a class="header-anchor" href="#项目源码地址" aria-hidden="true">#</a> 项目源码地址</h2>`,20),k={href:"https://github.com/dabaoqiang/openTechnology-learning.git",target:"_blank",rel:"noopener noreferrer"};function d(r,v){const s=i("ExternalLinkIcon");return p(),e("div",null,[u,n("p",null,[n("a",k,[t("https://github.com/dabaoqiang/openTechnology-learning.git"),o(s)])])])}const b=a(l,[["render",d],["__file","05-Prototype-vs-Builder.html.vue"]]);export{b as default};
