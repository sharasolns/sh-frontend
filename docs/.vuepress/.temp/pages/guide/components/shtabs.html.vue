<template><div><h1 id="sh-tabs" tabindex="-1"><a class="header-anchor" href="#sh-tabs"><span>Sh Tabs</span></a></h1>
<p>This is a simple component that creates a nav tab with links to different tabs.
It is useful for creating a tabbed interface.</p>
<h2 id="importing" tabindex="-1"><a class="header-anchor" href="#importing"><span>Importing</span></a></h2>
<div class="language-javascript line-numbers-mode" data-ext="js" data-title="js"><pre v-pre class="language-javascript"><code><span class="token keyword">import</span> <span class="token punctuation">{</span> ShTabs <span class="token punctuation">}</span> <span class="token keyword">from</span> <span class="token string">'@iankibetsh/shframework'</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><h2 id="example-usage" tabindex="-1"><a class="header-anchor" href="#example-usage"><span>Example Usage</span></a></h2>
<div class="language-html line-numbers-mode" data-ext="html" data-title="html"><pre v-pre class="language-html"><code><span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>sh-tabs</span>
    <span class="token attr-name">:tabs</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">"</span>['pending','completed','archived']<span class="token punctuation">"</span></span>
    <span class="token attr-name">base-url</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">"</span>/admin/tasks<span class="token punctuation">"</span></span>
<span class="token punctuation">/></span></span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>Above will create nav tab with 3 nav tab items</p>
<ul>
<li>Pending</li>
<li>Completed</li>
<li>Archived</li>
</ul>
<h2 id="attributes" tabindex="-1"><a class="header-anchor" href="#attributes"><span>Attributes</span></a></h2>
<h3 id="tabs" tabindex="-1"><a class="header-anchor" href="#tabs"><span>tabs</span></a></h3>
<ul>
<li>
<p>Type: <code v-pre>array</code></p>
</li>
<li>
<p>Default: <code v-pre>none</code></p>
</li>
<li>
<p>Details</p>
<p>These are the actual tabs</p>
</li>
<li>
<p>Example: <code v-pre>['pending','completed','archived']</code></p>
</li>
</ul>
<h3 id="base-url" tabindex="-1"><a class="header-anchor" href="#base-url"><span>base-url</span></a></h3>
<ul>
<li>Type: <code v-pre>string</code></li>
<li>Default: <code v-pre>none</code></li>
<li>Details</li>
</ul>
<p>This is the base url, tab urls will be appended to this</p>
<pre><code> Example: base-url=&quot;/admin/tasks&quot;
</code></pre>
<p>Do not forget to always start with <code v-pre>/</code></p>
<h3 id="tabs-count" tabindex="-1"><a class="header-anchor" href="#tabs-count"><span>tabs-count</span></a></h3>
<ul>
<li>
<p>Type: <code v-pre>object</code></p>
</li>
<li>
<p>Default: <code v-pre>none</code></p>
</li>
<li>
<p>Details</p>
<p>This is the count that will appear on top of the tab. It is an object with the tab name as the key and the count as the value</p>
<pre><code>Example: :tab-counts=&quot;{
  tasks: 2,
  tab: 3
}&quot;
</code></pre>
</li>
</ul>
<h3 id="active-tab" tabindex="-1"><a class="header-anchor" href="#active-tab"><span>active-tab</span></a></h3>
<ul>
<li>
<p>Type: <code v-pre>string</code></p>
</li>
<li>
<p>Default: <code v-pre>none</code></p>
</li>
<li>
<p>Details</p>
<p>This is the active tab. It is the tab that will be active by default</p>
<pre><code>Example: active-tab=&quot;completed&quot;
</code></pre>
</li>
<li></li>
</ul>
</div></template>


