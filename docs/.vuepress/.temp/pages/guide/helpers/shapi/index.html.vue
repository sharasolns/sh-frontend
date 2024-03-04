<template><div><h1 id="shapi" tabindex="-1"><a class="header-anchor" href="#shapi"><span>shApi</span></a></h1>
<p>This component contains common helper functions for making api requests.
The component uses axios to make the requests. <a href="https://axios-http.com/docs/intro" target="_blank" rel="noopener noreferrer">axios<ExternalLinkIcon/></a></p>
<p>To use this package make sure you have in your .env file the following</p>
<div class="language-bash line-numbers-mode" data-ext="sh" data-title="sh"><pre v-pre class="language-bash"><code><span class="token assign-left variable">VITE_APP_API_URL</span><span class="token operator">=</span>http://localhost:8000/api/
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><p>make sure to change(http://localhost:8000/api/)  to your api backend url
This will be the base url of the api backend where the form will send request</p>
<h2 id="importing" tabindex="-1"><a class="header-anchor" href="#importing"><span>Importing</span></a></h2>
<div class="language-javascript line-numbers-mode" data-ext="js" data-title="js"><pre v-pre class="language-javascript"><code><span class="token keyword">import</span> <span class="token punctuation">{</span> shApis <span class="token punctuation">}</span> <span class="token keyword">from</span> <span class="token string">'@iankibetsh/shframework'</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><h2 id="methods" tabindex="-1"><a class="header-anchor" href="#methods"><span>Methods</span></a></h2>
<h3 id="doget" tabindex="-1"><a class="header-anchor" href="#doget"><span><code v-pre>doGet</code></span></a></h3>
<p>Makes a GET request to the backend api</p>
<div class="language-javascript line-numbers-mode" data-ext="js" data-title="js"><pre v-pre class="language-javascript"><code>shApis<span class="token punctuation">.</span><span class="token function">doGet</span><span class="token punctuation">(</span><span class="token string">'users'</span><span class="token punctuation">,</span> <span class="token punctuation">{</span> <span class="token literal-property property">role</span><span class="token operator">:</span> <span class="token string">'admin'</span> <span class="token punctuation">}</span><span class="token punctuation">)</span><span class="token punctuation">.</span><span class="token function">then</span><span class="token punctuation">(</span><span class="token parameter">res</span> <span class="token operator">=></span> <span class="token punctuation">{</span>
    users<span class="token punctuation">.</span>value <span class="token operator">=</span> res<span class="token punctuation">.</span>data
  <span class="token punctuation">}</span><span class="token punctuation">)</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h4 id="params" tabindex="-1"><a class="header-anchor" href="#params"><span>Params</span></a></h4>
<h5 id="endpoint" tabindex="-1"><a class="header-anchor" href="#endpoint"><span><code v-pre>endpoint</code></span></a></h5>
<ul>
<li>
<p>Type: <code v-pre>string</code></p>
</li>
<li>
<p>Required: <code v-pre>true</code></p>
</li>
<li>
<p>Details:</p>
<p>This is the backend endpoint for the GET request</p>
</li>
</ul>
<p>Example :</p>
<div class="language-text line-numbers-mode" data-ext="text" data-title="text"><pre v-pre class="language-text"><code>shApis.doGet('users')

</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div></div></div><p>'users' above will be the endpoint for your backend</p>
<h5 id="data" tabindex="-1"><a class="header-anchor" href="#data"><span><code v-pre>data</code></span></a></h5>
<ul>
<li>Type: <code v-pre>object</code></li>
<li>Required: <code v-pre>false</code></li>
<li>Example</li>
</ul>
<div class="language-javascript line-numbers-mode" data-ext="js" data-title="js"><pre v-pre class="language-javascript"><code><span class="token punctuation">{</span> <span class="token literal-property property">role</span><span class="token operator">:</span> <span class="token string">'admin'</span> <span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><ul>
<li>
<p>Details</p>
<p>This will be the request parameters on the GET request</p>
</li>
</ul>
<h3 id="dopost" tabindex="-1"><a class="header-anchor" href="#dopost"><span><code v-pre>doPost</code></span></a></h3>
<p>This Will help you if you want to make a POST request to the backend api.</p>
<div class="language-javascript line-numbers-mode" data-ext="js" data-title="js"><pre v-pre class="language-javascript"><code>shApis<span class="token punctuation">.</span><span class="token function">doPost</span><span class="token punctuation">(</span><span class="token string">'users/add'</span><span class="token punctuation">,</span> <span class="token punctuation">{</span> 
  <span class="token literal-property property">name</span><span class="token operator">:</span> <span class="token string">'John'</span><span class="token punctuation">,</span> 
  <span class="token literal-property property">email</span><span class="token operator">:</span> <span class="token string">'john@example.com'</span><span class="token punctuation">,</span>
  <span class="token literal-property property">age</span><span class="token operator">:</span> <span class="token number">12</span>
<span class="token punctuation">}</span>
<span class="token punctuation">)</span><span class="token punctuation">.</span><span class="token function">then</span><span class="token punctuation">(</span><span class="token parameter">res</span> <span class="token operator">=></span> <span class="token punctuation">{</span>
    users<span class="token punctuation">.</span>value <span class="token operator">=</span> res<span class="token punctuation">.</span>data
  <span class="token punctuation">}</span><span class="token punctuation">)</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h4 id="params-1" tabindex="-1"><a class="header-anchor" href="#params-1"><span>Params</span></a></h4>
<h5 id="endpoint-1" tabindex="-1"><a class="header-anchor" href="#endpoint-1"><span><code v-pre>endpoint</code></span></a></h5>
<ul>
<li>
<p>Type: <code v-pre>string</code></p>
</li>
<li>
<p>Required: <code v-pre>true</code></p>
</li>
<li>
<p>Details:</p>
<p>This is the backend endpoint to post the POST request</p>
</li>
</ul>
<p>Example :</p>
<div class="language-text line-numbers-mode" data-ext="text" data-title="text"><pre v-pre class="language-text"><code>shApis.doPost('users/add')
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><p>'users/add' above will be the endpoint for your backend</p>
<h5 id="data-1" tabindex="-1"><a class="header-anchor" href="#data-1"><span><code v-pre>data</code></span></a></h5>
<ul>
<li>Type: <code v-pre>object</code></li>
<li>Required: <code v-pre>false</code></li>
<li>Example</li>
</ul>
<div class="language-text line-numbers-mode" data-ext="text" data-title="text"><pre v-pre class="language-text"><code>data"{
  name: 'John',
  email: 'john@example.com',
  age: 12
}"
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><ul>
<li>
<p>Details</p>
<p>This will be post data to the backend endpoint</p>
</li>
</ul>
<h3 id="doput" tabindex="-1"><a class="header-anchor" href="#doput"><span><code v-pre>doPut</code></span></a></h3>
<ul>
<li>Makes a PUT request to the backend api</li>
</ul>
<div class="language-javascript line-numbers-mode" data-ext="js" data-title="js"><pre v-pre class="language-javascript"><code>shApis<span class="token punctuation">.</span><span class="token function">doPut</span><span class="token punctuation">(</span><span class="token string">'users/update/1'</span><span class="token punctuation">,</span> <span class="token punctuation">{</span> 
  <span class="token literal-property property">name</span><span class="token operator">:</span> <span class="token string">'John'</span><span class="token punctuation">,</span> 
  <span class="token literal-property property">email</span><span class="token operator">:</span> <span class="token string">''</span>
<span class="token punctuation">}</span>
<span class="token punctuation">)</span><span class="token punctuation">.</span><span class="token function">then</span><span class="token punctuation">(</span><span class="token parameter">res</span> <span class="token operator">=></span> <span class="token punctuation">{</span>
    users<span class="token punctuation">.</span>value <span class="token operator">=</span> res<span class="token punctuation">.</span>data
  <span class="token punctuation">}</span><span class="token punctuation">)</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h4 id="params-2" tabindex="-1"><a class="header-anchor" href="#params-2"><span>Params</span></a></h4>
<h5 id="endpoint-2" tabindex="-1"><a class="header-anchor" href="#endpoint-2"><span><code v-pre>endpoint</code></span></a></h5>
<ul>
<li>
<p>Type: <code v-pre>string</code></p>
</li>
<li>
<p>Required: <code v-pre>true</code></p>
</li>
<li>
<p>Details:</p>
<p>This is the backend endpoint to post the PUT request</p>
</li>
<li>
<p>Example :</p>
</li>
</ul>
<div class="language-text line-numbers-mode" data-ext="text" data-title="text"><pre v-pre class="language-text"><code>shApis.doPut('users/update/1')
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><p>'users/update/1' above will be the endpoint for your backend</p>
<h5 id="data-2" tabindex="-1"><a class="header-anchor" href="#data-2"><span><code v-pre>data</code></span></a></h5>
<ul>
<li>Type: <code v-pre>object</code></li>
<li>Required: <code v-pre>false</code></li>
<li>Example</li>
</ul>
<div class="language-text line-numbers-mode" data-ext="text" data-title="text"><pre v-pre class="language-text"><code>data"{
  name: 'John',
  email: ''
}"
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><ul>
<li>
<p>Details</p>
<p>This will be post data to the backend endpoint</p>
</li>
</ul>
<h3 id="dodelete" tabindex="-1"><a class="header-anchor" href="#dodelete"><span><code v-pre>doDelete</code></span></a></h3>
<ul>
<li>Makes a DELETE request to the backend api</li>
</ul>
<div class="language-javascript line-numbers-mode" data-ext="js" data-title="js"><pre v-pre class="language-javascript"><code>shApis<span class="token punctuation">.</span><span class="token function">doDelete</span><span class="token punctuation">(</span><span class="token string">'users/delete/1'</span><span class="token punctuation">)</span><span class="token punctuation">.</span><span class="token function">then</span><span class="token punctuation">(</span><span class="token parameter">res</span> <span class="token operator">=></span> <span class="token punctuation">{</span>
    console<span class="token punctuation">.</span><span class="token function">log</span><span class="token punctuation">(</span><span class="token string">'User deleted'</span><span class="token punctuation">)</span>
  <span class="token punctuation">}</span><span class="token punctuation">)</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h4 id="params-3" tabindex="-1"><a class="header-anchor" href="#params-3"><span>Params</span></a></h4>
<h5 id="endpoint-3" tabindex="-1"><a class="header-anchor" href="#endpoint-3"><span><code v-pre>endpoint</code></span></a></h5>
<ul>
<li>
<p>Type: <code v-pre>string</code></p>
</li>
<li>
<p>Required: <code v-pre>true</code></p>
</li>
<li>
<p>Details:</p>
<p>This is the backend endpoint to post the DELETE request</p>
</li>
<li>
<p>Example :</p>
</li>
</ul>
<div class="language-text line-numbers-mode" data-ext="text" data-title="text"><pre v-pre class="language-text"><code>shApis.doDelete('users/delete/1')
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><p>'users/delete/1' above will be the endpoint for your backend</p>
<h3 id="dopatch" tabindex="-1"><a class="header-anchor" href="#dopatch"><span><code v-pre>doPatch</code></span></a></h3>
<ul>
<li>Makes a PATCH request to the backend api</li>
</ul>
<div class="language-javascript line-numbers-mode" data-ext="js" data-title="js"><pre v-pre class="language-javascript"><code>shApis<span class="token punctuation">.</span><span class="token function">doPatch</span><span class="token punctuation">(</span><span class="token string">'users/update/1'</span><span class="token punctuation">,</span> <span class="token punctuation">{</span> 
  <span class="token literal-property property">name</span><span class="token operator">:</span> <span class="token string">'John'</span><span class="token punctuation">,</span> 
  <span class="token literal-property property">email</span><span class="token operator">:</span> <span class="token string">''</span>
<span class="token punctuation">}</span>
<span class="token punctuation">)</span><span class="token punctuation">.</span><span class="token function">then</span><span class="token punctuation">(</span><span class="token parameter">res</span> <span class="token operator">=></span> <span class="token punctuation">{</span>
    users<span class="token punctuation">.</span>value <span class="token operator">=</span> res<span class="token punctuation">.</span>data
  <span class="token punctuation">}</span><span class="token punctuation">)</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h4 id="params-4" tabindex="-1"><a class="header-anchor" href="#params-4"><span>Params</span></a></h4>
<h5 id="endpoint-4" tabindex="-1"><a class="header-anchor" href="#endpoint-4"><span><code v-pre>endpoint</code></span></a></h5>
<ul>
<li>
<p>Type: <code v-pre>string</code></p>
</li>
<li>
<p>Required: <code v-pre>true</code></p>
</li>
<li>
<p>Details:</p>
<p>This is the backend endpoint to post the PATCH request</p>
</li>
<li>
<p>Example :</p>
</li>
</ul>
<div class="language-text line-numbers-mode" data-ext="text" data-title="text"><pre v-pre class="language-text"><code>shApis.doPatch('users/update/1')
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><p>'users/update/1' above will be the endpoint for your backend</p>
<h5 id="data-3" tabindex="-1"><a class="header-anchor" href="#data-3"><span><code v-pre>data</code></span></a></h5>
<ul>
<li>Type: <code v-pre>object</code></li>
<li>Required: <code v-pre>false</code></li>
<li>Example</li>
</ul>
<div class="language-text line-numbers-mode" data-ext="text" data-title="text"><pre v-pre class="language-text"><code>data"{
  name: 'John',
  email: ''
}"
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><ul>
<li>
<p>Details</p>
<p>This will be post data to the backend endpoint</p>
</li>
</ul>
</div></template>


