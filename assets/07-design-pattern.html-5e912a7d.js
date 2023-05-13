import{_ as a,X as e,Y as t,Z as n,$ as p,a0 as c,a1 as o,F as i}from"./framework-48078774.js";const l={},u=o(`<h1 id="七大软件设计原则" tabindex="-1"><a class="header-anchor" href="#七大软件设计原则" aria-hidden="true">#</a> 七大软件设计原则</h1><blockquote><p>设计模式是近现代编码项目实施过程中经验的总结，主要是为了应对程序的耦合，内聚，维护性，灵活性的应用。</p><p>本文中将对业界流行的七中设计模式进行阐述，归纳。</p></blockquote><h2 id="开闭原则" tabindex="-1"><a class="header-anchor" href="#开闭原则" aria-hidden="true">#</a> 开闭原则</h2><h3 id="概述" tabindex="-1"><a class="header-anchor" href="#概述" aria-hidden="true">#</a> 概述</h3><blockquote><p>强调的是用抽象构建框架，用实现扩展细节</p></blockquote><h3 id="场景" tabindex="-1"><a class="header-anchor" href="#场景" aria-hidden="true">#</a> 场景</h3><blockquote><p>我们版本更新，尽可能不修改原代码，但是可以增加新功能。</p></blockquote><h3 id="优点" tabindex="-1"><a class="header-anchor" href="#优点" aria-hidden="true">#</a> 优点</h3><blockquote><p>保持软件产品的稳定性</p><p>不影响原有测试代码的运行</p><p>使代码更具模块化，易于维护</p><p>提高开发效率</p></blockquote><h3 id="栗子" tabindex="-1"><a class="header-anchor" href="#栗子" aria-hidden="true">#</a> 栗子</h3><div class="language-java line-numbers-mode" data-ext="java"><pre class="language-java"><code><span class="token keyword">public</span> <span class="token keyword">interface</span> <span class="token class-name">Icourse</span> <span class="token punctuation">{</span>
    <span class="token doc-comment comment">/**
     * getId
     *
     * <span class="token keyword">@return</span>
     */</span>
    <span class="token class-name">Long</span> <span class="token function">getId</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>

    <span class="token doc-comment comment">/**
     * getName
     *
     * <span class="token keyword">@return</span>
     */</span>
    <span class="token class-name">String</span> <span class="token function">getName</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>

    <span class="token doc-comment comment">/**
     * getPrice
     *
     * <span class="token keyword">@return</span>
     */</span>
    <span class="token class-name">Double</span> <span class="token function">getPrice</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><div class="language-java line-numbers-mode" data-ext="java"><pre class="language-java"><code><span class="token keyword">public</span> <span class="token keyword">class</span> <span class="token class-name">JavaCourse</span> <span class="token keyword">implements</span> <span class="token class-name">Icourse</span> <span class="token punctuation">{</span>

    <span class="token keyword">private</span> <span class="token class-name">Long</span> id<span class="token punctuation">;</span>

    <span class="token keyword">private</span> <span class="token class-name">String</span> name<span class="token punctuation">;</span>

    <span class="token keyword">private</span> <span class="token class-name">Double</span> price<span class="token punctuation">;</span>


    <span class="token keyword">public</span> <span class="token class-name">JavaCourse</span><span class="token punctuation">(</span><span class="token class-name">Long</span> id<span class="token punctuation">,</span> <span class="token class-name">String</span> name<span class="token punctuation">,</span> <span class="token class-name">Double</span> price<span class="token punctuation">)</span> <span class="token punctuation">{</span>
        <span class="token keyword">this</span><span class="token punctuation">.</span>id <span class="token operator">=</span> id<span class="token punctuation">;</span>
        <span class="token keyword">this</span><span class="token punctuation">.</span>name <span class="token operator">=</span> name<span class="token punctuation">;</span>
        <span class="token keyword">this</span><span class="token punctuation">.</span>price <span class="token operator">=</span> price<span class="token punctuation">;</span>
    <span class="token punctuation">}</span>

    <span class="token annotation punctuation">@Override</span>
    <span class="token keyword">public</span> <span class="token class-name">Long</span> <span class="token function">getId</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
        <span class="token keyword">return</span> id<span class="token punctuation">;</span>
    <span class="token punctuation">}</span>

    <span class="token annotation punctuation">@Override</span>
    <span class="token keyword">public</span> <span class="token class-name">String</span> <span class="token function">getName</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
        <span class="token keyword">return</span> name<span class="token punctuation">;</span>
    <span class="token punctuation">}</span>

    <span class="token annotation punctuation">@Override</span>
    <span class="token keyword">public</span> <span class="token class-name">Double</span> <span class="token function">getPrice</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
        <span class="token keyword">return</span> price<span class="token punctuation">;</span>
    <span class="token punctuation">}</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><div class="language-java line-numbers-mode" data-ext="java"><pre class="language-java"><code><span class="token keyword">public</span> <span class="token keyword">class</span> <span class="token class-name">JavaDiscountCourse</span> <span class="token keyword">extends</span> <span class="token class-name">JavaCourse</span> <span class="token punctuation">{</span>
    
    <span class="token keyword">public</span> <span class="token class-name">JavaDiscountCourse</span><span class="token punctuation">(</span><span class="token class-name">Long</span> id<span class="token punctuation">,</span> <span class="token class-name">String</span> name<span class="token punctuation">,</span> <span class="token class-name">Double</span> price<span class="token punctuation">)</span> <span class="token punctuation">{</span>
        <span class="token keyword">super</span><span class="token punctuation">(</span>id<span class="token punctuation">,</span> name<span class="token punctuation">,</span> price<span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token punctuation">}</span>

    <span class="token keyword">public</span> <span class="token class-name">Double</span> <span class="token function">getOriginalPrice</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
        <span class="token keyword">return</span> <span class="token keyword">super</span><span class="token punctuation">.</span><span class="token function">getPrice</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token punctuation">}</span>

    <span class="token annotation punctuation">@Override</span>
    <span class="token keyword">public</span> <span class="token class-name">Double</span> <span class="token function">getPrice</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
        <span class="token keyword">return</span> <span class="token keyword">super</span><span class="token punctuation">.</span><span class="token function">getPrice</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token operator">*</span> <span class="token number">0.1</span><span class="token punctuation">;</span>
    <span class="token punctuation">}</span>
<span class="token punctuation">}</span>

</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><div class="language-java line-numbers-mode" data-ext="java"><pre class="language-java"><code><span class="token keyword">public</span> <span class="token keyword">class</span> <span class="token class-name">OpenCloseDemoTest</span> <span class="token punctuation">{</span>

    <span class="token keyword">public</span> <span class="token keyword">static</span> <span class="token keyword">void</span> <span class="token function">main</span><span class="token punctuation">(</span><span class="token class-name">String</span><span class="token punctuation">[</span><span class="token punctuation">]</span> args<span class="token punctuation">)</span> <span class="token punctuation">{</span>
        <span class="token doc-comment comment">/**
         * 开闭原则，定义一个接口，不同的实现，可以做到， 对新增开放，对修改关闭，低耦合
         */</span>

        <span class="token class-name">Icourse</span> icourse <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token class-name">JavaDiscountCourse</span><span class="token punctuation">(</span><span class="token number">1L</span><span class="token punctuation">,</span> <span class="token string">&quot;sz&quot;</span><span class="token punctuation">,</span> <span class="token number">1D</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
        <span class="token class-name">Double</span> price <span class="token operator">=</span> icourse<span class="token punctuation">.</span><span class="token function">getPrice</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
        <span class="token class-name">System</span><span class="token punctuation">.</span>out<span class="token punctuation">.</span><span class="token function">println</span><span class="token punctuation">(</span>price<span class="token punctuation">)</span><span class="token punctuation">;</span>

        <span class="token class-name">Icourse</span> original <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token class-name">JavaCourse</span><span class="token punctuation">(</span><span class="token number">1L</span><span class="token punctuation">,</span> <span class="token string">&quot;sz&quot;</span><span class="token punctuation">,</span> <span class="token number">1D</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
        <span class="token class-name">Double</span> price1 <span class="token operator">=</span> original<span class="token punctuation">.</span><span class="token function">getPrice</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
        <span class="token class-name">System</span><span class="token punctuation">.</span>out<span class="token punctuation">.</span><span class="token function">println</span><span class="token punctuation">(</span>price1<span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token punctuation">}</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h2 id="依赖倒置" tabindex="-1"><a class="header-anchor" href="#依赖倒置" aria-hidden="true">#</a> 依赖倒置</h2><h3 id="概述-1" tabindex="-1"><a class="header-anchor" href="#概述-1" aria-hidden="true">#</a> 概述</h3><blockquote><p><code>高层模块不应该依赖低层模块</code>,二者都应该依赖其抽象。 抽象不应该依赖细节，细节应该依赖抽象。 针对接口编程，不要针对实现编程。</p></blockquote><h3 id="场景-1" tabindex="-1"><a class="header-anchor" href="#场景-1" aria-hidden="true">#</a> 场景</h3><blockquote><p>A a =new A(new B());</p></blockquote><h3 id="优点-1" tabindex="-1"><a class="header-anchor" href="#优点-1" aria-hidden="true">#</a> 优点</h3><blockquote><p>减少类之间的耦合性。</p><p>提高系统的稳定性。</p><p>提高代码可读性和可维护性。</p><p>可降低修改程序所造成的风险。</p></blockquote><h3 id="栗子-1" tabindex="-1"><a class="header-anchor" href="#栗子-1" aria-hidden="true">#</a> 栗子</h3><div class="language-java line-numbers-mode" data-ext="java"><pre class="language-java"><code><span class="token keyword">public</span> <span class="token keyword">interface</span> <span class="token class-name">Icourse</span> <span class="token punctuation">{</span>
    <span class="token doc-comment comment">/**
     * study
     */</span>
    <span class="token keyword">void</span> <span class="token function">study</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><div class="language-java line-numbers-mode" data-ext="java"><pre class="language-java"><code><span class="token keyword">public</span> <span class="token keyword">class</span> <span class="token class-name">JavaCourse</span> <span class="token keyword">implements</span> <span class="token class-name">Icourse</span> <span class="token punctuation">{</span>

    <span class="token annotation punctuation">@Override</span>
    <span class="token keyword">public</span> <span class="token keyword">void</span> <span class="token function">study</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
        <span class="token class-name">System</span><span class="token punctuation">.</span>out<span class="token punctuation">.</span><span class="token function">println</span><span class="token punctuation">(</span><span class="token string">&quot;xq正在学习java课程&quot;</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token punctuation">}</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><div class="language-java line-numbers-mode" data-ext="java"><pre class="language-java"><code><span class="token keyword">public</span> <span class="token keyword">class</span> <span class="token class-name">PythonCourse</span> <span class="token keyword">implements</span> <span class="token class-name">Icourse</span> <span class="token punctuation">{</span>
    <span class="token annotation punctuation">@Override</span>
    <span class="token keyword">public</span> <span class="token keyword">void</span> <span class="token function">study</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
        <span class="token class-name">System</span><span class="token punctuation">.</span>out<span class="token punctuation">.</span><span class="token function">println</span><span class="token punctuation">(</span><span class="token string">&quot;xq正在学习python课程&quot;</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token punctuation">}</span>
<span class="token punctuation">}</span>

</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><div class="language-java line-numbers-mode" data-ext="java"><pre class="language-java"><code><span class="token keyword">public</span> <span class="token keyword">class</span> <span class="token class-name">Tom</span> <span class="token punctuation">{</span>

    <span class="token doc-comment comment">/**
     * 啥是依赖倒置了，就是本来我是tom，我要去学课程，我直接在tom的类里面去写，我要学java，我要学python，
     * 学习课程，是抽象的，还是行为，于是，课程抽象为接口，java，phthotn是其实现，
     * tom学那个课程，应该是那个课程的抽象，她不应该依赖是具体的那门课程
     * <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>p</span><span class="token punctuation">&gt;</span></span>
     * 即，高层模块不依赖底层模块，二者依赖其抽象，
     * 抽象不依赖细节，细节依赖抽象，
     * 减少耦合，提高稳定，增强，代码可读性，可维护性
     */</span>

    <span class="token keyword">private</span> <span class="token class-name">Icourse</span> icourse<span class="token punctuation">;</span>

    <span class="token keyword">public</span> <span class="token keyword">void</span> <span class="token function">setIcourse</span><span class="token punctuation">(</span><span class="token class-name">Icourse</span> icourse<span class="token punctuation">)</span> <span class="token punctuation">{</span>
        <span class="token keyword">this</span><span class="token punctuation">.</span>icourse <span class="token operator">=</span> icourse<span class="token punctuation">;</span>
    <span class="token punctuation">}</span>

    <span class="token keyword">public</span> <span class="token keyword">void</span> <span class="token function">studyJavaCourse</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
        <span class="token class-name">System</span><span class="token punctuation">.</span>out<span class="token punctuation">.</span><span class="token function">println</span><span class="token punctuation">(</span><span class="token string">&quot;xq正在学习java课程&quot;</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token punctuation">}</span>

    <span class="token keyword">public</span> <span class="token keyword">void</span> <span class="token function">studyPythonCourse</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
        <span class="token class-name">System</span><span class="token punctuation">.</span>out<span class="token punctuation">.</span><span class="token function">println</span><span class="token punctuation">(</span><span class="token string">&quot;xq正在学习python课程&quot;</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token punctuation">}</span>

    <span class="token comment">// 未有依赖倒置前 1.0 版本</span>
<span class="token comment">//    public static void main(String[] args) {</span>
<span class="token comment">//        Tom tom = new Tom();</span>
<span class="token comment">//        tom.studyJavaCourse();</span>
<span class="token comment">//        tom.studyPythonCourse();</span>
<span class="token comment">//    }</span>


    <span class="token keyword">public</span> <span class="token keyword">void</span> <span class="token function">study</span><span class="token punctuation">(</span><span class="token class-name">Icourse</span> icourse<span class="token punctuation">)</span> <span class="token punctuation">{</span>
        icourse<span class="token punctuation">.</span><span class="token function">study</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token punctuation">}</span>

    <span class="token keyword">public</span> <span class="token keyword">void</span> <span class="token function">studyTwo</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
        icourse<span class="token punctuation">.</span><span class="token function">study</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token punctuation">}</span>

    <span class="token comment">// 2.0 版本</span>
<span class="token comment">//    public static void main(String[] args) {</span>
<span class="token comment">//        Tom tom = new Tom();</span>
    <span class="token comment">// 直接new</span>
<span class="token comment">//        tom.study(new JavaCourse());</span>
<span class="token comment">//    }</span>

    <span class="token comment">// 3.0版本</span>
    <span class="token keyword">public</span> <span class="token keyword">static</span> <span class="token keyword">void</span> <span class="token function">main</span><span class="token punctuation">(</span><span class="token class-name">String</span><span class="token punctuation">[</span><span class="token punctuation">]</span> args<span class="token punctuation">)</span> <span class="token punctuation">{</span>
        <span class="token class-name">Tom</span> tom <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token class-name">Tom</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
        <span class="token comment">// 依赖注入通过setter</span>
        tom<span class="token punctuation">.</span><span class="token function">setIcourse</span><span class="token punctuation">(</span><span class="token keyword">new</span> <span class="token class-name">JavaCourse</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
        tom<span class="token punctuation">.</span><span class="token function">studyTwo</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token punctuation">}</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h2 id="单一职责-接口隔离" tabindex="-1"><a class="header-anchor" href="#单一职责-接口隔离" aria-hidden="true">#</a> 单一职责&amp;接口隔离</h2><h3 id="概述-2" tabindex="-1"><a class="header-anchor" href="#概述-2" aria-hidden="true">#</a> 概述</h3><blockquote><p>不要存在多于一个导致类变更的原因。</p><p>一个类/接口/方法只负责一项职责。</p></blockquote><h3 id="场景-2" tabindex="-1"><a class="header-anchor" href="#场景-2" aria-hidden="true">#</a> 场景</h3><blockquote><p>支付业务的service就不需要写上发邮件的具体代码。</p></blockquote><h3 id="优点-2" tabindex="-1"><a class="header-anchor" href="#优点-2" aria-hidden="true">#</a> 优点</h3><blockquote><p>降低类的复杂度。</p><p>提高类的可读性。</p><p>提高系统的可维护性。</p><p>降低变更引起的风险。</p></blockquote><h3 id="栗子-2" tabindex="-1"><a class="header-anchor" href="#栗子-2" aria-hidden="true">#</a> 栗子</h3><div class="language-java line-numbers-mode" data-ext="java"><pre class="language-java"><code><span class="token keyword">public</span> <span class="token keyword">interface</span> <span class="token class-name">IAnimal</span> <span class="token punctuation">{</span>
    <span class="token doc-comment comment">/**
     * eat
     */</span>
    <span class="token keyword">void</span> <span class="token function">eat</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>

    <span class="token doc-comment comment">/**
     * fly
     */</span>
    <span class="token keyword">void</span> <span class="token function">fly</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>

    <span class="token doc-comment comment">/**
     * swim
     */</span>
    <span class="token keyword">void</span> <span class="token function">swim</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>

<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><div class="language-java line-numbers-mode" data-ext="java"><pre class="language-java"><code><span class="token keyword">public</span> <span class="token keyword">class</span> <span class="token class-name">Dog</span> <span class="token keyword">implements</span> <span class="token class-name">IAnimal</span> <span class="token punctuation">{</span>
    <span class="token doc-comment comment">/**
     * eat
     */</span>
    <span class="token annotation punctuation">@Override</span>
    <span class="token keyword">public</span> <span class="token keyword">void</span> <span class="token function">eat</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>

    <span class="token punctuation">}</span>

    <span class="token doc-comment comment">/**
     * fly
     */</span>
    <span class="token annotation punctuation">@Override</span>
    <span class="token keyword">public</span> <span class="token keyword">void</span> <span class="token function">fly</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
        <span class="token comment">// 此时，狗根本就不能飞！，如果用一个统一的接口的话,接口定义行为错误</span>

    <span class="token punctuation">}</span>

    <span class="token annotation punctuation">@Override</span>
    <span class="token keyword">public</span> <span class="token keyword">void</span> <span class="token function">swim</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>

    <span class="token punctuation">}</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><div class="language-java line-numbers-mode" data-ext="java"><pre class="language-java"><code><span class="token keyword">public</span> <span class="token keyword">class</span> <span class="token class-name">Bird</span> <span class="token keyword">implements</span> <span class="token class-name">IAnimal</span> <span class="token punctuation">{</span>

    <span class="token annotation punctuation">@Override</span>
    <span class="token keyword">public</span> <span class="token keyword">void</span> <span class="token function">eat</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>

    <span class="token punctuation">}</span>

    <span class="token annotation punctuation">@Override</span>
    <span class="token keyword">public</span> <span class="token keyword">void</span> <span class="token function">fly</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>

    <span class="token punctuation">}</span>

    <span class="token annotation punctuation">@Override</span>
    <span class="token keyword">public</span> <span class="token keyword">void</span> <span class="token function">swim</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
        <span class="token comment">// 此时，鸟根本就不能泳！，如果用一个统一的接口的话,会出现脏的行为</span>
    <span class="token punctuation">}</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><ul><li>接口隔离后</li></ul><div class="language-java line-numbers-mode" data-ext="java"><pre class="language-java"><code><span class="token keyword">public</span> <span class="token keyword">interface</span> <span class="token class-name">IEatAnimal</span> <span class="token punctuation">{</span>
    <span class="token doc-comment comment">/**
     * eat
     */</span>
    <span class="token keyword">void</span> <span class="token function">eat</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><div class="language-java line-numbers-mode" data-ext="java"><pre class="language-java"><code><span class="token keyword">public</span> <span class="token keyword">interface</span> <span class="token class-name">ISwimAnimal</span> <span class="token punctuation">{</span>
    <span class="token doc-comment comment">/**
     * swim
     */</span>
    <span class="token keyword">void</span> <span class="token function">swim</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><div class="language-java line-numbers-mode" data-ext="java"><pre class="language-java"><code><span class="token keyword">public</span> <span class="token keyword">interface</span> <span class="token class-name">FlyAnimal</span> <span class="token punctuation">{</span>
    <span class="token doc-comment comment">/**
     * fly
     */</span>
    <span class="token keyword">void</span> <span class="token function">fly</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><div class="language-java line-numbers-mode" data-ext="java"><pre class="language-java"><code><span class="token keyword">public</span> <span class="token keyword">class</span> <span class="token class-name">DogTow</span> <span class="token keyword">implements</span> <span class="token class-name">IEatAnimal</span><span class="token punctuation">,</span> <span class="token class-name">ISwimAnimal</span> <span class="token punctuation">{</span>

    <span class="token annotation punctuation">@Override</span>
    <span class="token keyword">public</span> <span class="token keyword">void</span> <span class="token function">eat</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
        <span class="token class-name">System</span><span class="token punctuation">.</span>out<span class="token punctuation">.</span><span class="token function">println</span><span class="token punctuation">(</span><span class="token string">&quot;狗会吃&quot;</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token punctuation">}</span>

    <span class="token annotation punctuation">@Override</span>
    <span class="token keyword">public</span> <span class="token keyword">void</span> <span class="token function">swim</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
        <span class="token class-name">System</span><span class="token punctuation">.</span>out<span class="token punctuation">.</span><span class="token function">println</span><span class="token punctuation">(</span><span class="token string">&quot;狗会游&quot;</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token punctuation">}</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><ul><li>接口隔离，根据不同的行为，制定不定的接口，不用一个单一的接口，确定所有的行为.</li></ul><h2 id="迪米特法则" tabindex="-1"><a class="header-anchor" href="#迪米特法则" aria-hidden="true">#</a> 迪米特法则</h2><h3 id="概述-3" tabindex="-1"><a class="header-anchor" href="#概述-3" aria-hidden="true">#</a> 概述</h3><blockquote><p>只和朋友交流（成员变量、方法输入输出参数），不和陌生人说话，控制好访问修饰符</p></blockquote><h3 id="场景-3" tabindex="-1"><a class="header-anchor" href="#场景-3" aria-hidden="true">#</a> 场景</h3><blockquote><p>老板让项目经理做事，不需要知道具体做的逻辑</p></blockquote><h3 id="优点-3" tabindex="-1"><a class="header-anchor" href="#优点-3" aria-hidden="true">#</a> 优点</h3><blockquote><p>降低类与类之间的耦合</p></blockquote><h3 id="栗子-3" tabindex="-1"><a class="header-anchor" href="#栗子-3" aria-hidden="true">#</a> 栗子</h3><div class="language-java line-numbers-mode" data-ext="java"><pre class="language-java"><code><span class="token keyword">public</span> <span class="token keyword">class</span> <span class="token class-name">Course</span> <span class="token punctuation">{</span><span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><div class="language-java line-numbers-mode" data-ext="java"><pre class="language-java"><code><span class="token keyword">public</span> <span class="token keyword">class</span> <span class="token class-name">Employee</span> <span class="token punctuation">{</span>
    <span class="token keyword">public</span> <span class="token keyword">void</span> <span class="token function">checkNumberOfCourses</span><span class="token punctuation">(</span><span class="token class-name">List</span><span class="token generics"><span class="token punctuation">&lt;</span><span class="token class-name">Course</span><span class="token punctuation">&gt;</span></span> courses<span class="token punctuation">)</span> <span class="token punctuation">{</span>
        <span class="token class-name">System</span><span class="token punctuation">.</span>out<span class="token punctuation">.</span><span class="token function">println</span><span class="token punctuation">(</span><span class="token string">&quot;目前已经发布的课程数量:&quot;</span> <span class="token operator">+</span> courses<span class="token punctuation">.</span><span class="token function">size</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token punctuation">}</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><div class="language-java line-numbers-mode" data-ext="java"><pre class="language-java"><code><span class="token keyword">public</span> <span class="token keyword">class</span> <span class="token class-name">TeamLeader</span> <span class="token punctuation">{</span>

    <span class="token keyword">public</span> <span class="token keyword">void</span> <span class="token function">commandCheckNumber</span><span class="token punctuation">(</span><span class="token class-name">Employee</span> employee<span class="token punctuation">)</span> <span class="token punctuation">{</span>
        <span class="token class-name">List</span><span class="token generics"><span class="token punctuation">&lt;</span><span class="token class-name">Course</span><span class="token punctuation">&gt;</span></span> list <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token class-name">ArrayList</span><span class="token generics"><span class="token punctuation">&lt;</span><span class="token class-name">Course</span><span class="token punctuation">&gt;</span></span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
        <span class="token keyword">for</span> <span class="token punctuation">(</span><span class="token keyword">int</span> i <span class="token operator">=</span> <span class="token number">0</span><span class="token punctuation">;</span> i <span class="token operator">&lt;</span> <span class="token number">20</span><span class="token punctuation">;</span> i<span class="token operator">++</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
            <span class="token comment">// 迪米特法则，有些对象，与我产生不了关系，就不应该放在这里</span>
            list<span class="token punctuation">.</span><span class="token function">add</span><span class="token punctuation">(</span><span class="token keyword">new</span> <span class="token class-name">Course</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
        <span class="token punctuation">}</span>
        employee<span class="token punctuation">.</span><span class="token function">checkNumberOfCourses</span><span class="token punctuation">(</span>list<span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token punctuation">}</span>

    <span class="token keyword">public</span> <span class="token keyword">static</span> <span class="token keyword">void</span> <span class="token function">main</span><span class="token punctuation">(</span><span class="token class-name">String</span><span class="token punctuation">[</span><span class="token punctuation">]</span> args<span class="token punctuation">)</span> <span class="token punctuation">{</span>

        <span class="token class-name">TeamLeader</span> teamLeader <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token class-name">TeamLeader</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>

        <span class="token class-name">Employee</span> employee <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token class-name">Employee</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
        teamLeader<span class="token punctuation">.</span><span class="token function">commandCheckNumber</span><span class="token punctuation">(</span>employee<span class="token punctuation">)</span><span class="token punctuation">;</span>

    <span class="token punctuation">}</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><ul><li>修改后</li></ul><div class="language-java line-numbers-mode" data-ext="java"><pre class="language-java"><code><span class="token keyword">public</span> <span class="token keyword">class</span> <span class="token class-name">EmployeeTow</span> <span class="token punctuation">{</span>

    <span class="token keyword">public</span> <span class="token keyword">void</span> <span class="token function">checkNumberOfCourses</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
        <span class="token class-name">List</span><span class="token generics"><span class="token punctuation">&lt;</span><span class="token class-name">Course</span><span class="token punctuation">&gt;</span></span> list <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token class-name">ArrayList</span><span class="token generics"><span class="token punctuation">&lt;</span><span class="token class-name">Course</span><span class="token punctuation">&gt;</span></span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
        <span class="token keyword">for</span> <span class="token punctuation">(</span><span class="token keyword">int</span> i <span class="token operator">=</span> <span class="token number">0</span><span class="token punctuation">;</span> i <span class="token operator">&lt;</span> <span class="token number">20</span><span class="token punctuation">;</span> i<span class="token operator">++</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
            <span class="token comment">// 迪米特法则，有些对象，与我产生不了关系，就不应该放在这里</span>
            list<span class="token punctuation">.</span><span class="token function">add</span><span class="token punctuation">(</span><span class="token keyword">new</span> <span class="token class-name">Course</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
        <span class="token punctuation">}</span>
        <span class="token class-name">System</span><span class="token punctuation">.</span>out<span class="token punctuation">.</span><span class="token function">println</span><span class="token punctuation">(</span><span class="token string">&quot;目前已经发布的课程数量:&quot;</span> <span class="token operator">+</span> list<span class="token punctuation">.</span><span class="token function">size</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token punctuation">}</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><div class="language-java line-numbers-mode" data-ext="java"><pre class="language-java"><code><span class="token keyword">public</span> <span class="token keyword">class</span> <span class="token class-name">TeamLeaderTow</span> <span class="token punctuation">{</span>

    <span class="token keyword">public</span> <span class="token keyword">void</span> <span class="token function">commandCheckNumber</span><span class="token punctuation">(</span><span class="token class-name">EmployeeTow</span> employeeTow<span class="token punctuation">)</span> <span class="token punctuation">{</span>
        employeeTow<span class="token punctuation">.</span><span class="token function">checkNumberOfCourses</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token punctuation">}</span>

    <span class="token keyword">public</span> <span class="token keyword">static</span> <span class="token keyword">void</span> <span class="token function">main</span><span class="token punctuation">(</span><span class="token class-name">String</span><span class="token punctuation">[</span><span class="token punctuation">]</span> args<span class="token punctuation">)</span> <span class="token punctuation">{</span>
        <span class="token doc-comment comment">/**
         * 这些修改以后，就是符合迪米特法则，我是leader我只需要知道，
         * 我的小弟，在干啥，至于，我小弟在具体干什么，我不需要知道
         * 最少知道原则
         *
         */</span>
        <span class="token class-name">TeamLeaderTow</span> teamLeader <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token class-name">TeamLeaderTow</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
        teamLeader<span class="token punctuation">.</span><span class="token function">commandCheckNumber</span><span class="token punctuation">(</span><span class="token keyword">new</span> <span class="token class-name">EmployeeTow</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">;</span>

    <span class="token punctuation">}</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h2 id="里氏替换" tabindex="-1"><a class="header-anchor" href="#里氏替换" aria-hidden="true">#</a> 里氏替换</h2><h3 id="概述-4" tabindex="-1"><a class="header-anchor" href="#概述-4" aria-hidden="true">#</a> 概述</h3><blockquote><p>在程序中将一个父类的对象改成其继承类，并不影响程序运行。</p><p>将子类适应的程序改成父类，则程序可能会出现异常。</p></blockquote><h3 id="场景-4" tabindex="-1"><a class="header-anchor" href="#场景-4" aria-hidden="true">#</a> 场景</h3><blockquote><p>用来对类跟类之间继承的一种约束</p></blockquote><h3 id="优点-4" tabindex="-1"><a class="header-anchor" href="#优点-4" aria-hidden="true">#</a> 优点</h3><blockquote><p>规范使用继承</p></blockquote><h3 id="栗子-4" tabindex="-1"><a class="header-anchor" href="#栗子-4" aria-hidden="true">#</a> 栗子</h3><div class="language-java line-numbers-mode" data-ext="java"><pre class="language-java"><code><span class="token keyword">public</span> <span class="token keyword">class</span> <span class="token class-name">Rectangle</span> <span class="token punctuation">{</span>

    <span class="token keyword">private</span> <span class="token class-name">Long</span> height<span class="token punctuation">;</span>

    <span class="token keyword">private</span> <span class="token class-name">Long</span> width<span class="token punctuation">;</span>

    <span class="token keyword">public</span> <span class="token class-name">Long</span> <span class="token function">getHeight</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
        <span class="token keyword">return</span> height<span class="token punctuation">;</span>
    <span class="token punctuation">}</span>

    <span class="token keyword">public</span> <span class="token keyword">void</span> <span class="token function">setHeight</span><span class="token punctuation">(</span><span class="token class-name">Long</span> height<span class="token punctuation">)</span> <span class="token punctuation">{</span>
        <span class="token keyword">this</span><span class="token punctuation">.</span>height <span class="token operator">=</span> height<span class="token punctuation">;</span>
    <span class="token punctuation">}</span>

    <span class="token keyword">public</span> <span class="token class-name">Long</span> <span class="token function">getWidth</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
        <span class="token keyword">return</span> width<span class="token punctuation">;</span>
    <span class="token punctuation">}</span>

    <span class="token keyword">public</span> <span class="token keyword">void</span> <span class="token function">setWidth</span><span class="token punctuation">(</span><span class="token class-name">Long</span> width<span class="token punctuation">)</span> <span class="token punctuation">{</span>
        <span class="token keyword">this</span><span class="token punctuation">.</span>width <span class="token operator">=</span> width<span class="token punctuation">;</span>
    <span class="token punctuation">}</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><div class="language-java line-numbers-mode" data-ext="java"><pre class="language-java"><code><span class="token keyword">public</span> <span class="token keyword">class</span> <span class="token class-name">Square</span> <span class="token keyword">extends</span> <span class="token class-name">Rectangle</span> <span class="token punctuation">{</span>

    <span class="token keyword">private</span> <span class="token class-name">Long</span> length<span class="token punctuation">;</span>

    <span class="token keyword">public</span> <span class="token class-name">Long</span> <span class="token function">getLength</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
        <span class="token keyword">return</span> length<span class="token punctuation">;</span>
    <span class="token punctuation">}</span>

    <span class="token keyword">public</span> <span class="token keyword">void</span> <span class="token function">setLength</span><span class="token punctuation">(</span><span class="token class-name">Long</span> length<span class="token punctuation">)</span> <span class="token punctuation">{</span>
        <span class="token keyword">this</span><span class="token punctuation">.</span>length <span class="token operator">=</span> length<span class="token punctuation">;</span>
    <span class="token punctuation">}</span>

    <span class="token annotation punctuation">@Override</span>
    <span class="token keyword">public</span> <span class="token class-name">Long</span> <span class="token function">getHeight</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
        <span class="token keyword">return</span> <span class="token function">getLength</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token punctuation">}</span>

    <span class="token annotation punctuation">@Override</span>
    <span class="token keyword">public</span> <span class="token keyword">void</span> <span class="token function">setHeight</span><span class="token punctuation">(</span><span class="token class-name">Long</span> height<span class="token punctuation">)</span> <span class="token punctuation">{</span>
     <span class="token function">setLength</span><span class="token punctuation">(</span>height<span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token punctuation">}</span>

    <span class="token annotation punctuation">@Override</span>
    <span class="token keyword">public</span> <span class="token class-name">Long</span> <span class="token function">getWidth</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
        <span class="token keyword">return</span> <span class="token function">getLength</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token punctuation">}</span>

    <span class="token annotation punctuation">@Override</span>
    <span class="token keyword">public</span> <span class="token keyword">void</span> <span class="token function">setWidth</span><span class="token punctuation">(</span><span class="token class-name">Long</span> width<span class="token punctuation">)</span> <span class="token punctuation">{</span>
        <span class="token function">setLength</span><span class="token punctuation">(</span>width<span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token punctuation">}</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><div class="language-java line-numbers-mode" data-ext="java"><pre class="language-java"><code><span class="token keyword">public</span> <span class="token keyword">class</span> <span class="token class-name">Test01</span> <span class="token punctuation">{</span>

    <span class="token keyword">public</span> <span class="token keyword">static</span> <span class="token keyword">void</span> <span class="token function">reSize</span><span class="token punctuation">(</span><span class="token class-name">Rectangle</span> rectangle<span class="token punctuation">)</span> <span class="token punctuation">{</span>
        <span class="token keyword">while</span> <span class="token punctuation">(</span>rectangle<span class="token punctuation">.</span><span class="token function">getWidth</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token operator">&gt;=</span> rectangle<span class="token punctuation">.</span><span class="token function">getHeight</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
            rectangle<span class="token punctuation">.</span><span class="token function">setHeight</span><span class="token punctuation">(</span>rectangle<span class="token punctuation">.</span><span class="token function">getHeight</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token operator">+</span> <span class="token number">1</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
            <span class="token class-name">System</span><span class="token punctuation">.</span>out<span class="token punctuation">.</span><span class="token function">println</span><span class="token punctuation">(</span><span class="token string">&quot;width:&quot;</span> <span class="token operator">+</span> rectangle<span class="token punctuation">.</span><span class="token function">getWidth</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token operator">+</span> <span class="token string">&quot;,height:&quot;</span> <span class="token operator">+</span> rectangle<span class="token punctuation">.</span><span class="token function">getHeight</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
        <span class="token punctuation">}</span>
        <span class="token class-name">System</span><span class="token punctuation">.</span>out<span class="token punctuation">.</span><span class="token function">println</span><span class="token punctuation">(</span><span class="token string">&quot;resize end ,width:&quot;</span> <span class="token operator">+</span> rectangle<span class="token punctuation">.</span><span class="token function">getWidth</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token operator">+</span> <span class="token string">&quot;,height:&quot;</span> <span class="token operator">+</span> rectangle<span class="token punctuation">.</span><span class="token function">getHeight</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">;</span>

    <span class="token punctuation">}</span>

<span class="token comment">//    public static void main(String[] args) {</span>
<span class="token comment">//        Rectangle rectangle = new Rectangle();</span>
<span class="token comment">//        rectangle.setWidth(20L);</span>
<span class="token comment">//        rectangle.setHeight(10L);</span>
<span class="token comment">//        reSize(rectangle);</span>
<span class="token comment">//    }</span>

    <span class="token comment">// 出现了死循环 约束继承泛滥</span>
    <span class="token keyword">public</span> <span class="token keyword">static</span> <span class="token keyword">void</span> <span class="token function">main</span><span class="token punctuation">(</span><span class="token class-name">String</span><span class="token punctuation">[</span><span class="token punctuation">]</span> args<span class="token punctuation">)</span> <span class="token punctuation">{</span>
        <span class="token class-name">Square</span> square <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token class-name">Square</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
        square<span class="token punctuation">.</span><span class="token function">setLength</span><span class="token punctuation">(</span><span class="token number">10L</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
        <span class="token function">reSize</span><span class="token punctuation">(</span>square<span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token punctuation">}</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><ul><li>修改后</li></ul><div class="language-java line-numbers-mode" data-ext="java"><pre class="language-java"><code><span class="token keyword">public</span> <span class="token keyword">interface</span> <span class="token class-name">QuadRangle</span> <span class="token punctuation">{</span>
    <span class="token doc-comment comment">/**
     * getWidth
     * <span class="token keyword">@return</span>
     */</span>
    <span class="token keyword">long</span> <span class="token function">getWidth</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>

    <span class="token doc-comment comment">/**
     * getHeight
     * <span class="token keyword">@return</span>
     */</span>
    <span class="token keyword">long</span> <span class="token function">getHeight</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>

<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><div class="language-java line-numbers-mode" data-ext="java"><pre class="language-java"><code><span class="token keyword">public</span> <span class="token keyword">class</span> <span class="token class-name">RectRangleTwo</span> <span class="token keyword">implements</span> <span class="token class-name">QuadRangle</span><span class="token punctuation">{</span>

    <span class="token keyword">private</span> <span class="token keyword">long</span> width<span class="token punctuation">;</span>

    <span class="token keyword">private</span> <span class="token keyword">long</span> height<span class="token punctuation">;</span>

    <span class="token keyword">public</span> <span class="token keyword">void</span> <span class="token function">setWidth</span><span class="token punctuation">(</span><span class="token keyword">long</span> width<span class="token punctuation">)</span> <span class="token punctuation">{</span>
        <span class="token keyword">this</span><span class="token punctuation">.</span>width <span class="token operator">=</span> width<span class="token punctuation">;</span>
    <span class="token punctuation">}</span>

    <span class="token keyword">public</span> <span class="token keyword">void</span> <span class="token function">setHeight</span><span class="token punctuation">(</span><span class="token keyword">long</span> height<span class="token punctuation">)</span> <span class="token punctuation">{</span>
        <span class="token keyword">this</span><span class="token punctuation">.</span>height <span class="token operator">=</span> height<span class="token punctuation">;</span>
    <span class="token punctuation">}</span>

    <span class="token annotation punctuation">@Override</span>
    <span class="token keyword">public</span> <span class="token keyword">long</span> <span class="token function">getWidth</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
        <span class="token keyword">return</span> width<span class="token punctuation">;</span>
    <span class="token punctuation">}</span>

    <span class="token annotation punctuation">@Override</span>
    <span class="token keyword">public</span> <span class="token keyword">long</span> <span class="token function">getHeight</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
        <span class="token keyword">return</span> height<span class="token punctuation">;</span>
    <span class="token punctuation">}</span>
<span class="token punctuation">}</span>

</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><div class="language-java line-numbers-mode" data-ext="java"><pre class="language-java"><code><span class="token keyword">public</span> <span class="token keyword">class</span> <span class="token class-name">SquareTwo</span> <span class="token keyword">implements</span> <span class="token class-name">QuadRangle</span> <span class="token punctuation">{</span>

    <span class="token keyword">private</span> <span class="token keyword">long</span> length<span class="token punctuation">;</span>

    <span class="token keyword">public</span> <span class="token keyword">long</span> <span class="token function">getLength</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
        <span class="token keyword">return</span> length<span class="token punctuation">;</span>
    <span class="token punctuation">}</span>

    <span class="token keyword">public</span> <span class="token keyword">void</span> <span class="token function">setLength</span><span class="token punctuation">(</span><span class="token keyword">long</span> length<span class="token punctuation">)</span> <span class="token punctuation">{</span>
        <span class="token keyword">this</span><span class="token punctuation">.</span>length <span class="token operator">=</span> length<span class="token punctuation">;</span>
    <span class="token punctuation">}</span>

    <span class="token annotation punctuation">@Override</span>
    <span class="token keyword">public</span> <span class="token keyword">long</span> <span class="token function">getWidth</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
        <span class="token keyword">return</span> length<span class="token punctuation">;</span>
    <span class="token punctuation">}</span>

    <span class="token annotation punctuation">@Override</span>
    <span class="token keyword">public</span> <span class="token keyword">long</span> <span class="token function">getHeight</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
        <span class="token keyword">return</span> length<span class="token punctuation">;</span>
    <span class="token punctuation">}</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><div class="language-java line-numbers-mode" data-ext="java"><pre class="language-java"><code><span class="token keyword">public</span> <span class="token keyword">class</span> <span class="token class-name">TestSubstitutuinDemo</span> <span class="token punctuation">{</span>

    <span class="token keyword">public</span> <span class="token keyword">static</span> <span class="token keyword">void</span> <span class="token function">reSize</span><span class="token punctuation">(</span><span class="token class-name">RectRangleTwo</span> rectangle<span class="token punctuation">)</span> <span class="token punctuation">{</span>
        <span class="token keyword">while</span> <span class="token punctuation">(</span>rectangle<span class="token punctuation">.</span><span class="token function">getWidth</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token operator">&gt;=</span> rectangle<span class="token punctuation">.</span><span class="token function">getHeight</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
            rectangle<span class="token punctuation">.</span><span class="token function">setHeight</span><span class="token punctuation">(</span>rectangle<span class="token punctuation">.</span><span class="token function">getHeight</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token operator">+</span> <span class="token number">1</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
            <span class="token class-name">System</span><span class="token punctuation">.</span>out<span class="token punctuation">.</span><span class="token function">println</span><span class="token punctuation">(</span><span class="token string">&quot;width:&quot;</span> <span class="token operator">+</span> rectangle<span class="token punctuation">.</span><span class="token function">getWidth</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token operator">+</span> <span class="token string">&quot;,height:&quot;</span> <span class="token operator">+</span> rectangle<span class="token punctuation">.</span><span class="token function">getHeight</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
        <span class="token punctuation">}</span>
        <span class="token class-name">System</span><span class="token punctuation">.</span>out<span class="token punctuation">.</span><span class="token function">println</span><span class="token punctuation">(</span><span class="token string">&quot;resize end ,width:&quot;</span> <span class="token operator">+</span> rectangle<span class="token punctuation">.</span><span class="token function">getWidth</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token operator">+</span> <span class="token string">&quot;,height:&quot;</span> <span class="token operator">+</span> rectangle<span class="token punctuation">.</span><span class="token function">getHeight</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">;</span>

    <span class="token punctuation">}</span>

    <span class="token keyword">public</span> <span class="token keyword">static</span> <span class="token keyword">void</span> <span class="token function">main</span><span class="token punctuation">(</span><span class="token class-name">String</span><span class="token punctuation">[</span><span class="token punctuation">]</span> args<span class="token punctuation">)</span> <span class="token punctuation">{</span>
        <span class="token class-name">SquareTwo</span> rectRangleTwo <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token class-name">SquareTwo</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
        rectRangleTwo<span class="token punctuation">.</span><span class="token function">setLength</span><span class="token punctuation">(</span><span class="token number">10</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
        <span class="token comment">// 为了约束继承泛滥！</span>
<span class="token comment">//        reSize(rectRangleTwo);</span>
    <span class="token punctuation">}</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h2 id="合成复用" tabindex="-1"><a class="header-anchor" href="#合成复用" aria-hidden="true">#</a> 合成复用</h2><h3 id="概述-5" tabindex="-1"><a class="header-anchor" href="#概述-5" aria-hidden="true">#</a> 概述</h3><blockquote><p>多使用has-a对象组合；聚合 contains-a 聚合 而不是继承 ，因为继承是白盒，暴露了很多信息。 聚合，组合，则是黑盒，可以降低，类之间的耦合关系，一个类对另一个类影响较少继承会暴露信息。</p></blockquote><h3 id="场景-5" tabindex="-1"><a class="header-anchor" href="#场景-5" aria-hidden="true">#</a> 场景</h3><blockquote><p>获取数据库连接的时候，同一个行为，不同的实现，根据不同的实现来判断行为。</p></blockquote><h3 id="优点-5" tabindex="-1"><a class="header-anchor" href="#优点-5" aria-hidden="true">#</a> 优点</h3><blockquote><p>降低，类之间的耦合关系。</p></blockquote><h3 id="栗子-5" tabindex="-1"><a class="header-anchor" href="#栗子-5" aria-hidden="true">#</a> 栗子</h3><div class="language-java line-numbers-mode" data-ext="java"><pre class="language-java"><code><span class="token keyword">public</span> <span class="token keyword">class</span> <span class="token class-name">DbConnection</span> <span class="token punctuation">{</span>
    <span class="token keyword">public</span> <span class="token class-name">String</span> <span class="token function">getConnection</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
        <span class="token keyword">return</span> <span class="token string">&quot;返回mysql数据链接&quot;</span><span class="token punctuation">;</span>
    <span class="token punctuation">}</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><div class="language-java line-numbers-mode" data-ext="java"><pre class="language-java"><code><span class="token keyword">public</span> <span class="token keyword">class</span> <span class="token class-name">ProductDao</span> <span class="token punctuation">{</span>

    <span class="token keyword">private</span> <span class="token class-name">DbConnection</span> dbConnection<span class="token punctuation">;</span>

    <span class="token keyword">public</span> <span class="token class-name">ProductDao</span><span class="token punctuation">(</span><span class="token class-name">DbConnection</span> dbConnection<span class="token punctuation">)</span> <span class="token punctuation">{</span>
        <span class="token keyword">this</span><span class="token punctuation">.</span>dbConnection <span class="token operator">=</span> dbConnection<span class="token punctuation">;</span>
    <span class="token punctuation">}</span>

    <span class="token keyword">public</span> <span class="token keyword">void</span> <span class="token function">addProduct</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
        <span class="token class-name">String</span> conncetion <span class="token operator">=</span> dbConnection<span class="token punctuation">.</span><span class="token function">getConnection</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
        <span class="token class-name">System</span><span class="token punctuation">.</span>out<span class="token punctuation">.</span><span class="token function">println</span><span class="token punctuation">(</span><span class="token string">&quot;获取 &quot;</span> <span class="token operator">+</span> conncetion <span class="token operator">+</span> <span class="token string">&quot;,加入产品&quot;</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token punctuation">}</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><div class="language-java line-numbers-mode" data-ext="java"><pre class="language-java"><code><span class="token keyword">public</span> <span class="token keyword">class</span> <span class="token class-name">CompositeReUseTest</span> <span class="token punctuation">{</span>
    <span class="token comment">// 1.0版本</span>
    <span class="token keyword">public</span> <span class="token keyword">static</span> <span class="token keyword">void</span> <span class="token function">main</span><span class="token punctuation">(</span><span class="token class-name">String</span><span class="token punctuation">[</span><span class="token punctuation">]</span> args<span class="token punctuation">)</span> <span class="token punctuation">{</span>
       <span class="token class-name">ProductDao</span> productDao <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token class-name">ProductDao</span><span class="token punctuation">(</span><span class="token keyword">new</span> <span class="token class-name">DbConnection</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
       productDao<span class="token punctuation">.</span><span class="token function">addProduct</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
   <span class="token punctuation">}</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><ul><li>修改后</li></ul><div class="language-java line-numbers-mode" data-ext="java"><pre class="language-java"><code><span class="token keyword">public</span> <span class="token keyword">abstract</span> <span class="token keyword">class</span> <span class="token class-name">DbConnection2</span> <span class="token punctuation">{</span>
    <span class="token doc-comment comment">/**
     * getDbConnection
     * <span class="token keyword">@return</span>
     */</span>
    <span class="token keyword">public</span> <span class="token keyword">abstract</span> <span class="token class-name">String</span> <span class="token function">getDbConnection</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>

<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><div class="language-java line-numbers-mode" data-ext="java"><pre class="language-java"><code><span class="token keyword">public</span> <span class="token keyword">class</span> <span class="token class-name">MysqlConnection</span> <span class="token keyword">extends</span> <span class="token class-name">DbConnection2</span> <span class="token punctuation">{</span>

    <span class="token annotation punctuation">@Override</span>
    <span class="token keyword">public</span> <span class="token class-name">String</span> <span class="token function">getDbConnection</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
        <span class="token keyword">return</span> <span class="token string">&quot;返回mysql数据库链接&quot;</span><span class="token punctuation">;</span>
    <span class="token punctuation">}</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><div class="language-java line-numbers-mode" data-ext="java"><pre class="language-java"><code><span class="token keyword">public</span> <span class="token keyword">class</span> <span class="token class-name">OracleConnection</span> <span class="token keyword">extends</span> <span class="token class-name">DbConnection2</span> <span class="token punctuation">{</span>

    <span class="token annotation punctuation">@Override</span>
    <span class="token keyword">public</span> <span class="token class-name">String</span> <span class="token function">getDbConnection</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
        <span class="token keyword">return</span> <span class="token string">&quot;返回oracle数据库链接&quot;</span><span class="token punctuation">;</span>
    <span class="token punctuation">}</span>
<span class="token punctuation">}</span>

</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><div class="language-java line-numbers-mode" data-ext="java"><pre class="language-java"><code><span class="token keyword">public</span> <span class="token keyword">class</span> <span class="token class-name">ProductDao1</span> <span class="token punctuation">{</span>

    <span class="token keyword">private</span> <span class="token class-name">DbConnection2</span> dbConnection2<span class="token punctuation">;</span>

    <span class="token keyword">public</span> <span class="token class-name">ProductDao1</span><span class="token punctuation">(</span><span class="token class-name">DbConnection2</span> dbConnection2<span class="token punctuation">)</span> <span class="token punctuation">{</span>
        <span class="token keyword">this</span><span class="token punctuation">.</span>dbConnection2 <span class="token operator">=</span> dbConnection2<span class="token punctuation">;</span>
    <span class="token punctuation">}</span>

    <span class="token keyword">public</span> <span class="token keyword">void</span> <span class="token function">addProduct</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
        <span class="token class-name">System</span><span class="token punctuation">.</span>out<span class="token punctuation">.</span><span class="token function">println</span><span class="token punctuation">(</span><span class="token string">&quot;获取链接：&quot;</span> <span class="token operator">+</span> dbConnection2<span class="token punctuation">.</span><span class="token function">getDbConnection</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token operator">+</span> <span class="token string">&quot;插入产品&quot;</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token punctuation">}</span>

<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><div class="language-java line-numbers-mode" data-ext="java"><pre class="language-java"><code><span class="token keyword">public</span> <span class="token keyword">class</span> <span class="token class-name">CompositeReUseTest</span> <span class="token punctuation">{</span>

    <span class="token keyword">public</span> <span class="token keyword">static</span> <span class="token keyword">void</span> <span class="token function">main</span><span class="token punctuation">(</span><span class="token class-name">String</span><span class="token punctuation">[</span><span class="token punctuation">]</span> args<span class="token punctuation">)</span> <span class="token punctuation">{</span>
        <span class="token class-name">ProductDao1</span> productDao1 <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token class-name">ProductDao1</span><span class="token punctuation">(</span><span class="token keyword">new</span> <span class="token class-name">MysqlConnection</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
        productDao1<span class="token punctuation">.</span><span class="token function">addProduct</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>

        <span class="token class-name">ProductDao1</span> productDao2 <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token class-name">ProductDao1</span><span class="token punctuation">(</span><span class="token keyword">new</span> <span class="token class-name">OracleConnection</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
        productDao2<span class="token punctuation">.</span><span class="token function">addProduct</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>

    <span class="token punctuation">}</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h2 id="项目源码地址" tabindex="-1"><a class="header-anchor" href="#项目源码地址" aria-hidden="true">#</a> 项目源码地址</h2>`,91),d={href:"https://github.com/dabaoqiang/openTechnology-learning.git",target:"_blank",rel:"noopener noreferrer"};function k(r,v){const s=i("ExternalLinkIcon");return e(),t("div",null,[u,n("p",null,[n("a",d,[p("https://github.com/dabaoqiang/openTechnology-learning.git"),c(s)])])])}const b=a(l,[["render",k],["__file","07-design-pattern.html.vue"]]);export{b as default};
