<template><div><h1 id="sh-tabs" tabindex="-1"><a class="header-anchor" href="#sh-tabs" aria-hidden="true">#</a> Sh Tabs</h1>
<p>A bootstrap 5 nav tab</p>
<p>Tabs are normal router links going to children of the base url, in
our case <code v-pre>/admin/tasks</code></p>
<p>Do not forget to always start with <code v-pre>/</code></p>
<h2 id="basic-example" tabindex="-1"><a class="header-anchor" href="#basic-example" aria-hidden="true">#</a> Basic Example</h2>
<h3 id="importing" tabindex="-1"><a class="header-anchor" href="#importing" aria-hidden="true">#</a> Importing</h3>
<div class="language-javascript ext-js line-numbers-mode"><pre v-pre class="language-javascript"><code><span class="token keyword">import</span> <span class="token punctuation">{</span> ShTabs <span class="token punctuation">}</span> <span class="token keyword">from</span> <span class="token string">'@iankibetsh/shframework'</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><h3 id="using" tabindex="-1"><a class="header-anchor" href="#using" aria-hidden="true">#</a> Using</h3>
<div class="language-html ext-html line-numbers-mode"><pre v-pre class="language-html"><code><span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>sh-tabs</span>
        <span class="token attr-name">:tabs</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">"</span>[<span class="token punctuation">'</span>pending<span class="token punctuation">'</span>,<span class="token punctuation">'</span>completed<span class="token punctuation">'</span>,<span class="token punctuation">'</span>archived<span class="token punctuation">'</span>]<span class="token punctuation">"</span></span>
        <span class="token attr-name">base-url</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">"</span>/admin/tasks<span class="token punctuation">"</span></span>
<span class="token punctuation">/></span></span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>Above will create nav tab with 3 nav tab items</p>
<ul>
<li>Pending</li>
<li>Completed</li>
<li>Archived</li>
</ul>
<h3 id="attributes-options" tabindex="-1"><a class="header-anchor" href="#attributes-options" aria-hidden="true">#</a> Attributes/Options</h3>
<h4 id="tabs" tabindex="-1"><a class="header-anchor" href="#tabs" aria-hidden="true">#</a> tabs</h4>
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
<h4 id="base-url" tabindex="-1"><a class="header-anchor" href="#base-url" aria-hidden="true">#</a> base-url</h4>
<ul>
<li>
<p>Type: <code v-pre>string</code></p>
</li>
<li>
<p>Default: <code v-pre>none</code></p>
</li>
<li>
<p>Details</p>
<p>This is the base url, tab urls will be appended to this</p>
</li>
<li>
<p>Example: <code v-pre>/admin/tasks</code></p>
</li>
</ul>
</div></template>
