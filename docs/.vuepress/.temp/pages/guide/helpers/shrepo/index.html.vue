<template><div><h1 id="shrepo" tabindex="-1"><a class="header-anchor" href="#shrepo"><span>shRepo</span></a></h1>
<p>This contains common helper functions</p>
<h2 id="importing" tabindex="-1"><a class="header-anchor" href="#importing"><span>Importing</span></a></h2>
<div class="language-javascript line-numbers-mode" data-ext="js" data-title="js"><pre v-pre class="language-javascript"><code><span class="token keyword">import</span> <span class="token punctuation">{</span>shRepo<span class="token punctuation">}</span> <span class="token keyword">from</span> <span class="token string">'@iankibetsh/shframework'</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><h2 id="methods" tabindex="-1"><a class="header-anchor" href="#methods"><span>Methods</span></a></h2>
<h3 id="runplainrequest" tabindex="-1"><a class="header-anchor" href="#runplainrequest"><span><code v-pre>runPlainRequest</code></span></a></h3>
<p>Use to run doPost request but with a prompt for confirmation</p>
<div class="language-javascript line-numbers-mode" data-ext="js" data-title="js"><pre v-pre class="language-javascript"><code>shRepo<span class="token punctuation">.</span><span class="token function">runPlainRequest</span><span class="token punctuation">(</span><span class="token string">'admin/departments/department/delete-department/1'</span><span class="token punctuation">)</span><span class="token punctuation">.</span><span class="token function">then</span><span class="token punctuation">(</span><span class="token punctuation">(</span><span class="token parameter">res</span><span class="token punctuation">)</span> <span class="token operator">=></span> <span class="token punctuation">{</span>
    <span class="token keyword">if</span> <span class="token punctuation">(</span>res<span class="token punctuation">.</span>isConfirmed<span class="token punctuation">)</span> <span class="token punctuation">{</span>
      <span class="token comment">// success</span>
    <span class="token punctuation">}</span>
  <span class="token punctuation">}</span><span class="token punctuation">)</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="runsilentrequest" tabindex="-1"><a class="header-anchor" href="#runsilentrequest"><span><code v-pre>runSilentRequest</code></span></a></h3>
<p>Use to run doPost request <strong>WITHOUT</strong>  prompt for confirmation</p>
<div class="language-javascript line-numbers-mode" data-ext="js" data-title="js"><pre v-pre class="language-javascript"><code>shRepo<span class="token punctuation">.</span><span class="token function">runSilentRequest</span><span class="token punctuation">(</span><span class="token string">'admin/departments/department/delete-department/1'</span><span class="token punctuation">)</span><span class="token punctuation">.</span><span class="token function">then</span><span class="token punctuation">(</span><span class="token punctuation">(</span><span class="token parameter">res</span><span class="token punctuation">)</span> <span class="token operator">=></span> <span class="token punctuation">{</span>
    <span class="token keyword">if</span> <span class="token punctuation">(</span>res<span class="token punctuation">.</span>isConfirmed<span class="token punctuation">)</span> <span class="token punctuation">{</span>
      <span class="token comment">// success</span>
    <span class="token punctuation">}</span>
  <span class="token punctuation">}</span><span class="token punctuation">)</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="showtoast" tabindex="-1"><a class="header-anchor" href="#showtoast"><span><code v-pre>showToast</code></span></a></h3>
<p>shows a toast message</p>
<div class="language-javascript line-numbers-mode" data-ext="js" data-title="js"><pre v-pre class="language-javascript"><code>shRepo<span class="token punctuation">.</span><span class="token function">showToast</span><span class="token punctuation">(</span><span class="token string">'module added successfully'</span><span class="token punctuation">,</span> <span class="token string">'success'</span><span class="token punctuation">)</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><p>Takes the <code v-pre>message</code> and <code v-pre>type</code> in the case above a success</p>
<h3 id="swalerror" tabindex="-1"><a class="header-anchor" href="#swalerror"><span><code v-pre>swalError</code></span></a></h3>
<p>Triggers a sweet alert popup with error</p>
<h3 id="swalsuccess" tabindex="-1"><a class="header-anchor" href="#swalsuccess"><span><code v-pre>swalSuccess</code></span></a></h3>
<p>Triggers a sweet alert popup with success</p>
</div></template>


