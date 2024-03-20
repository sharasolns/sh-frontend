<template><div><h1 id="sh-fetch" tabindex="-1"><a class="header-anchor" href="#sh-fetch"><span>Sh Fetch</span></a></h1>
<p>Sh Fetch is a helper class that fetches data from a remote server. It is used to fetch data from a remote server and return it as an array.</p>
<h3 id="importing" tabindex="-1"><a class="header-anchor" href="#importing"><span>Importing</span></a></h3>
<div class="language-javascript line-numbers-mode" data-ext="js" data-title="js"><pre v-pre class="language-javascript"><code><span class="token keyword">import</span> <span class="token punctuation">{</span> useShFetch <span class="token punctuation">}</span> <span class="token keyword">from</span> <span class="token string">'@iankibetsh/shframework'</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><h3 id="usage" tabindex="-1"><a class="header-anchor" href="#usage"><span>Usage</span></a></h3>
<div class="language-javascript line-numbers-mode" data-ext="js" data-title="js"><pre v-pre class="language-javascript"><code><span class="token keyword">const</span> <span class="token punctuation">{</span> data<span class="token punctuation">,</span> loading<span class="token punctuation">,</span> error <span class="token punctuation">}</span> <span class="token operator">=</span> <span class="token function">useShFetch</span><span class="token punctuation">(</span><span class="token string">'endpoint'</span><span class="token punctuation">)</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><h3 id="parameters" tabindex="-1"><a class="header-anchor" href="#parameters"><span>Parameters</span></a></h3>
<ul>
<li><code v-pre>endpoint</code> - The endpoint to fetch data from</li>
<li><code v-pre>data</code> - The data fetched from the server</li>
<li><code v-pre>loading</code> - A boolean that indicates if the data is still loading</li>
<li><code v-pre>error</code> - An error object if the fetch fails</li>
<li><code v-pre>useShFetch</code> - The hook that fetches data from the server</li>
</ul>
</div></template>


