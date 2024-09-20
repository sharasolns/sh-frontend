<template><div><h1 id="shapi" tabindex="-1"><a class="header-anchor" href="#shapi"><span>shApi</span></a></h1>
<p>This is used to make api requests to the backend using <em><a href="https://axios-http.com/docs/intro" target="_blank" rel="noopener noreferrer">axios</a></em></p>
<h2 id="importing" tabindex="-1"><a class="header-anchor" href="#importing"><span>Importing</span></a></h2>
<div class="language-javascript line-numbers-mode" data-highlighter="prismjs" data-ext="js" data-title="js"><pre v-pre><code><span class="line"><span class="token keyword">import</span> <span class="token punctuation">{</span> shApis <span class="token punctuation">}</span> <span class="token keyword">from</span> <span class="token string">'@iankibetsh/shframework'</span></span>
<span class="line"></span></code></pre>
<div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0"><div class="line-number"></div></div></div><h2 id="methods" tabindex="-1"><a class="header-anchor" href="#methods"><span>Methods</span></a></h2>
<h3 id="doget" tabindex="-1"><a class="header-anchor" href="#doget"><span><code v-pre>doGet</code></span></a></h3>
<p>Makes a GET request to the backend api</p>
<div class="language-javascript line-numbers-mode" data-highlighter="prismjs" data-ext="js" data-title="js"><pre v-pre><code><span class="line">shApis<span class="token punctuation">.</span><span class="token function">doGet</span><span class="token punctuation">(</span><span class="token string">'users'</span><span class="token punctuation">,</span> <span class="token punctuation">{</span> <span class="token literal-property property">role</span><span class="token operator">:</span> <span class="token string">'admin'</span> <span class="token punctuation">}</span><span class="token punctuation">)</span><span class="token punctuation">.</span><span class="token function">then</span><span class="token punctuation">(</span><span class="token parameter">res</span> <span class="token operator">=></span> <span class="token punctuation">{</span></span>
<span class="line">    users<span class="token punctuation">.</span>value <span class="token operator">=</span> res<span class="token punctuation">.</span>data</span>
<span class="line">  <span class="token punctuation">}</span><span class="token punctuation">)</span></span>
<span class="line"></span></code></pre>
<div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h4 id="params" tabindex="-1"><a class="header-anchor" href="#params"><span>Params</span></a></h4>
<h5 id="endpoint" tabindex="-1"><a class="header-anchor" href="#endpoint"><span><code v-pre>endpoint</code></span></a></h5>
<ul>
<li>
<p>Type: <code v-pre>string</code></p>
</li>
<li>
<p>Required: <code v-pre>true</code></p>
</li>
<li>
<p>Example: <code v-pre>users</code></p>
</li>
<li>
<p>Details:</p>
<p>This is the backend enpoint for the GET request</p>
</li>
</ul>
<h5 id="data" tabindex="-1"><a class="header-anchor" href="#data"><span><code v-pre>data</code></span></a></h5>
<ul>
<li>Type: <code v-pre>object</code></li>
<li>Required: <code v-pre>false</code></li>
<li>Example</li>
</ul>
<div class="language-javascript line-numbers-mode" data-highlighter="prismjs" data-ext="js" data-title="js"><pre v-pre><code><span class="line"><span class="token punctuation">{</span> <span class="token literal-property property">role</span><span class="token operator">:</span> <span class="token string">'admin'</span> <span class="token punctuation">}</span></span>
<span class="line"></span></code></pre>
<div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0"><div class="line-number"></div></div></div><ul>
<li>
<p>Details</p>
<p>This will be the request parameters on the GET request</p>
</li>
</ul>
<h3 id="dopost" tabindex="-1"><a class="header-anchor" href="#dopost"><span><code v-pre>doPost</code></span></a></h3>
<p>Makes a POST request to the backend api</p>
<div class="language-javascript line-numbers-mode" data-highlighter="prismjs" data-ext="js" data-title="js"><pre v-pre><code><span class="line">shApis<span class="token punctuation">.</span><span class="token function">doPost</span><span class="token punctuation">(</span><span class="token string">'users/add'</span><span class="token punctuation">,</span> <span class="token punctuation">{</span> </span>
<span class="line">  <span class="token literal-property property">name</span><span class="token operator">:</span> <span class="token string">'John'</span><span class="token punctuation">,</span> </span>
<span class="line">  <span class="token literal-property property">email</span><span class="token operator">:</span> <span class="token string">'john@example.com'</span><span class="token punctuation">,</span></span>
<span class="line">  <span class="token literal-property property">age</span><span class="token operator">:</span> <span class="token number">12</span></span>
<span class="line"><span class="token punctuation">}</span></span>
<span class="line"><span class="token punctuation">)</span><span class="token punctuation">.</span><span class="token function">then</span><span class="token punctuation">(</span><span class="token parameter">res</span> <span class="token operator">=></span> <span class="token punctuation">{</span></span>
<span class="line">    users<span class="token punctuation">.</span>value <span class="token operator">=</span> res<span class="token punctuation">.</span>data</span>
<span class="line">  <span class="token punctuation">}</span><span class="token punctuation">)</span></span>
<span class="line"></span></code></pre>
<div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h4 id="params-1" tabindex="-1"><a class="header-anchor" href="#params-1"><span>Params</span></a></h4>
<h5 id="endpoint-1" tabindex="-1"><a class="header-anchor" href="#endpoint-1"><span><code v-pre>endpoint</code></span></a></h5>
<ul>
<li>
<p>Type: <code v-pre>string</code></p>
</li>
<li>
<p>Required: <code v-pre>true</code></p>
</li>
<li>
<p>Example: <code v-pre>users/add</code></p>
</li>
<li>
<p>Details:</p>
<p>This is the backend enpoint to post the POST request</p>
</li>
</ul>
<h5 id="data-1" tabindex="-1"><a class="header-anchor" href="#data-1"><span><code v-pre>data</code></span></a></h5>
<ul>
<li>Type: <code v-pre>object</code></li>
<li>Required: <code v-pre>false</code></li>
<li>Example</li>
</ul>
<div class="language-text line-numbers-mode" data-highlighter="prismjs" data-ext="text" data-title="text"><pre v-pre><code><span class="line">{</span>
<span class="line">  name: 'John',</span>
<span class="line">  email: 'john@example.com',</span>
<span class="line">  age: 12</span>
<span class="line">}</span>
<span class="line"></span></code></pre>
<div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><ul>
<li>
<p>Details</p>
<p>This will be post data to the backend endpoint</p>
</li>
</ul>
</div></template>


