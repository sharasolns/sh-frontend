<template><div><h1 id="installation" tabindex="-1"><a class="header-anchor" href="#installation"><span>Installation</span></a></h1>
<p>Install this package in your existing or freshly installed vue 3 framework
using vite</p>
<div class="language-bash line-numbers-mode" data-ext="sh" data-title="sh"><pre v-pre class="language-bash"><code><span class="token function">npm</span> <span class="token function">install</span> @iankibetsh/shframework
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><p>In main.js or the entry file for vue js, import and use <code v-pre>ShFrontend</code></p>
<div class="language-javascript line-numbers-mode" data-ext="js" data-title="js"><pre v-pre class="language-javascript"><code><span class="token keyword">import</span> <span class="token punctuation">{</span>ShFrontend<span class="token punctuation">}</span> <span class="token keyword">from</span> <span class="token string">'@iankibetsh/shframework'</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><p>Then use it this way, in the options <code v-pre>sessionTimeout</code> is the number of minutes that you wish the session
| to be allowed to remain idle before it expires.</p>
<div class="language-javascript line-numbers-mode" data-ext="js" data-title="js"><pre v-pre class="language-javascript"><code>app<span class="token punctuation">.</span><span class="token function">use</span><span class="token punctuation">(</span>ShFrontend<span class="token punctuation">,</span><span class="token punctuation">{</span>
  <span class="token literal-property property">sessionTimeout</span><span class="token operator">:</span> <span class="token number">120</span>
<span class="token punctuation">}</span><span class="token punctuation">)</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div></div></template>


