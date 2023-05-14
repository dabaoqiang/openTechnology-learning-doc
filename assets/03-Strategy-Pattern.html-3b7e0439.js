import{_ as s,X as e,Y as t,Z as n,$ as p,a0 as c,a1 as o,F as l}from"./framework-48078774.js";const i={},u=o(`<h1 id="策略模式" tabindex="-1"><a class="header-anchor" href="#策略模式" aria-hidden="true">#</a> 策略模式</h1><blockquote><p>策略模式是行为型模式，创建的各种对象依据某种规则进行创建不同的对象。</p><p>在本文中，阐述了策略模式的使用。</p></blockquote><h2 id="简介" tabindex="-1"><a class="header-anchor" href="#简介" aria-hidden="true">#</a> 简介</h2><p>同一个行为不同的实现，将实现封装起来，起到可相互替换作用。</p><h2 id="场景" tabindex="-1"><a class="header-anchor" href="#场景" aria-hidden="true">#</a> 场景</h2><p>旅游方式，选车还是坐飞机</p><h2 id="优点" tabindex="-1"><a class="header-anchor" href="#优点" aria-hidden="true">#</a> 优点</h2><p>实例实现自有切换。</p><p>避免多种判断。</p><p>扩展性很好。</p><h2 id="缺点" tabindex="-1"><a class="header-anchor" href="#缺点" aria-hidden="true">#</a> 缺点</h2><p>会新增一个策略类进维护。</p><p>策略类也会暴露。</p><h2 id="栗子" tabindex="-1"><a class="header-anchor" href="#栗子" aria-hidden="true">#</a> 栗子</h2><div class="language-java line-numbers-mode" data-ext="java"><pre class="language-java"><code><span class="token keyword">public</span> <span class="token keyword">interface</span> <span class="token class-name">Strategy</span> <span class="token punctuation">{</span>
    <span class="token doc-comment comment">/**
     * doOperation
     * <span class="token keyword">@param</span> <span class="token parameter">num1</span>
     * <span class="token keyword">@param</span> <span class="token parameter">num2</span>
     * <span class="token keyword">@return</span>
     */</span>
    <span class="token keyword">int</span> <span class="token function">doOperation</span><span class="token punctuation">(</span><span class="token keyword">int</span> num1<span class="token punctuation">,</span> <span class="token keyword">int</span> num2<span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><div class="language-java line-numbers-mode" data-ext="java"><pre class="language-java"><code><span class="token keyword">public</span> <span class="token keyword">class</span> <span class="token class-name">OperationAdd</span> <span class="token keyword">implements</span> <span class="token class-name">Strategy</span> <span class="token punctuation">{</span>
    <span class="token annotation punctuation">@Override</span>
    <span class="token keyword">public</span> <span class="token keyword">int</span> <span class="token function">doOperation</span><span class="token punctuation">(</span><span class="token keyword">int</span> num1<span class="token punctuation">,</span> <span class="token keyword">int</span> num2<span class="token punctuation">)</span> <span class="token punctuation">{</span>
        <span class="token keyword">return</span> num1 <span class="token operator">+</span> num2<span class="token punctuation">;</span>
    <span class="token punctuation">}</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><div class="language-java line-numbers-mode" data-ext="java"><pre class="language-java"><code><span class="token keyword">public</span> <span class="token keyword">class</span> <span class="token class-name">OperationSubtract</span> <span class="token keyword">implements</span> <span class="token class-name">Strategy</span> <span class="token punctuation">{</span>
    <span class="token annotation punctuation">@Override</span>
    <span class="token keyword">public</span> <span class="token keyword">int</span> <span class="token function">doOperation</span><span class="token punctuation">(</span><span class="token keyword">int</span> num1<span class="token punctuation">,</span> <span class="token keyword">int</span> num2<span class="token punctuation">)</span> <span class="token punctuation">{</span>
        <span class="token keyword">return</span> num1 <span class="token operator">-</span> num2<span class="token punctuation">;</span>
    <span class="token punctuation">}</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><div class="language-java line-numbers-mode" data-ext="java"><pre class="language-java"><code><span class="token keyword">public</span> <span class="token keyword">class</span> <span class="token class-name">Context</span> <span class="token punctuation">{</span>
    <span class="token keyword">private</span> <span class="token class-name">Strategy</span> strategy<span class="token punctuation">;</span>

    <span class="token keyword">public</span> <span class="token class-name">Context</span><span class="token punctuation">(</span><span class="token class-name">Strategy</span> strategy<span class="token punctuation">)</span><span class="token punctuation">{</span>
        <span class="token keyword">this</span><span class="token punctuation">.</span>strategy <span class="token operator">=</span> strategy<span class="token punctuation">;</span>
    <span class="token punctuation">}</span>

    <span class="token keyword">public</span> <span class="token keyword">int</span> <span class="token function">executeStrategy</span><span class="token punctuation">(</span><span class="token keyword">int</span> num1<span class="token punctuation">,</span> <span class="token keyword">int</span> num2<span class="token punctuation">)</span><span class="token punctuation">{</span>
        <span class="token keyword">return</span> strategy<span class="token punctuation">.</span><span class="token function">doOperation</span><span class="token punctuation">(</span>num1<span class="token punctuation">,</span> num2<span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token punctuation">}</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><div class="language-java line-numbers-mode" data-ext="java"><pre class="language-java"><code><span class="token keyword">public</span> <span class="token keyword">class</span> <span class="token class-name">StrategyPatternDemo</span> <span class="token punctuation">{</span>

    <span class="token keyword">public</span> <span class="token keyword">static</span> <span class="token keyword">void</span> <span class="token function">main</span><span class="token punctuation">(</span><span class="token class-name">String</span><span class="token punctuation">[</span><span class="token punctuation">]</span> args<span class="token punctuation">)</span> <span class="token punctuation">{</span>
        <span class="token class-name">Context</span> context <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token class-name">Context</span><span class="token punctuation">(</span><span class="token keyword">new</span> <span class="token class-name">OperationAdd</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
        <span class="token class-name">System</span><span class="token punctuation">.</span>out<span class="token punctuation">.</span><span class="token function">println</span><span class="token punctuation">(</span>context<span class="token punctuation">.</span><span class="token function">executeStrategy</span><span class="token punctuation">(</span><span class="token number">1</span><span class="token punctuation">,</span> <span class="token number">1</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
        <span class="token class-name">Context</span> context2 <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token class-name">Context</span><span class="token punctuation">(</span><span class="token keyword">new</span> <span class="token class-name">OperationSubtract</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
        <span class="token class-name">System</span><span class="token punctuation">.</span>out<span class="token punctuation">.</span><span class="token function">println</span><span class="token punctuation">(</span>context2<span class="token punctuation">.</span><span class="token function">executeStrategy</span><span class="token punctuation">(</span><span class="token number">1</span><span class="token punctuation">,</span> <span class="token number">1</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token punctuation">}</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h2 id="项目源码地址" tabindex="-1"><a class="header-anchor" href="#项目源码地址" aria-hidden="true">#</a> 项目源码地址</h2>`,20),r={href:"https://github.com/dabaoqiang/openTechnology-learning.git",target:"_blank",rel:"noopener noreferrer"};function d(k,v){const a=l("ExternalLinkIcon");return e(),t("div",null,[u,n("p",null,[n("a",r,[p("https://github.com/dabaoqiang/openTechnology-learning.git"),c(a)])])])}const b=s(i,[["render",d],["__file","03-Strategy-Pattern.html.vue"]]);export{b as default};