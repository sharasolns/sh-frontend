<template><div><h1 id="sh-dynamic-tabs" tabindex="-1"><a class="header-anchor" href="#sh-dynamic-tabs"><span>Sh Dynamic Tabs</span></a></h1>
<p>An easy way to incorporate bootstrap 5 tabs in your vue  project.
It takes an array of tabs and renders them</p>
<h2 id="importing" tabindex="-1"><a class="header-anchor" href="#importing"><span>importing</span></a></h2>
<div class="language-javascript line-numbers-mode" data-highlighter="prismjs" data-ext="js" data-title="js"><pre v-pre><code><span class="line"><span class="token keyword">import</span> <span class="token punctuation">{</span>ShDynamicTabs<span class="token punctuation">}</span> <span class="token keyword">from</span> <span class="token string">'@iankibetsh/shframework'</span></span>
<span class="line"><span class="token keyword">import</span> TabOne <span class="token keyword">from</span> <span class="token string">'@/tabs/TabOne.vue'</span></span>
<span class="line"><span class="token keyword">import</span> TabTwo <span class="token keyword">from</span> <span class="token string">'@/tabs/TabTwo.vue'</span></span>
<span class="line"></span></code></pre>
<div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h2 id="example-usage" tabindex="-1"><a class="header-anchor" href="#example-usage"><span>Example Usage</span></a></h2>
<div class="language-html line-numbers-mode" data-highlighter="prismjs" data-ext="html" data-title="html"><pre v-pre><code><span class="line"><span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>sh-dynamic-tabs</span></span>
<span class="line">        <span class="token attr-name">currentTab</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">'</span>Tab Two<span class="token punctuation">'</span></span></span>
<span class="line">        <span class="token attr-name">:tabs</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">"</span>[</span>
<span class="line">                 {</span>
<span class="line">                    label: 'Tab One',</span>
<span class="line">                    component: TabOne</span>
<span class="line">                },</span>
<span class="line">                {</span>
<span class="line">                    label: 'Tab Two',</span>
<span class="line">                    component: TabTwo</span>
<span class="line">                }</span>
<span class="line">              ]<span class="token punctuation">"</span></span></span>
<span class="line"><span class="token punctuation">/></span></span></span>
<span class="line"></span></code></pre>
<div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h2 id="attributes" tabindex="-1"><a class="header-anchor" href="#attributes"><span>Attributes</span></a></h2>
<h3 id="tabs" tabindex="-1"><a class="header-anchor" href="#tabs"><span><code v-pre>tabs</code></span></a></h3>
<ul>
<li>Type: <code v-pre>array</code></li>
<li>Default: <code v-pre>none</code></li>
<li>Required: <code v-pre>true</code></li>
<li>Details
This will be the array of tabs to be rendered</li>
<li>Example:</li>
</ul>
<div class="language-html line-numbers-mode" data-highlighter="prismjs" data-ext="html" data-title="html"><pre v-pre><code><span class="line"> :tabs="[{label: 'Tab One', component: TabOne},{label: 'Tab Two', component: TabTwo}]"</span>
<span class="line"></span></code></pre>
<div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0"><div class="line-number"></div></div></div><ul>
<li>Explanation of the attributes
<ul>
<li><code v-pre>label</code>: This will be the label of the tab</li>
<li>
<pre><code>Example: `Tab One`
</code></pre>
</li>
<li><code v-pre>component</code>: This will be the component to be rendered when the tab is clicked make sure to import the component</li>
<li>
<pre><code>Example: `TabOne
</code></pre>
</li>
</ul>
</li>
</ul>
<h3 id="currenttab" tabindex="-1"><a class="header-anchor" href="#currenttab"><span><code v-pre>currentTab</code></span></a></h3>
<ul>
<li>Type: <code v-pre>string</code></li>
<li>Default: <code v-pre>none</code></li>
<li>Required: <code v-pre>false</code></li>
<li>Explanation of the attributes
<ul>
<li><code v-pre>currentTab</code>: This will be the label of the tab that will be active when the component is rendered</li>
<li>
<pre><code>Example: `Tab Two`
</code></pre>
</li>
</ul>
</li>
</ul>
<div class="language-text line-numbers-mode" data-highlighter="prismjs" data-ext="text" data-title="text"><pre v-pre><code><span class="line"></span></code></pre>
<div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0"></div></div></div></template>


