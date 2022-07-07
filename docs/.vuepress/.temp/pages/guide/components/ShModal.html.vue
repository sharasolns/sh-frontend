<template><div><h1 id="shmodal" tabindex="-1"><a class="header-anchor" href="#shmodal" aria-hidden="true">#</a> ShModal</h1>
<p>Bootstrap 5 Modal</p>
<h3 id="basic-example" tabindex="-1"><a class="header-anchor" href="#basic-example" aria-hidden="true">#</a> Basic Example</h3>
<h3 id="import" tabindex="-1"><a class="header-anchor" href="#import" aria-hidden="true">#</a> import</h3>
<div class="language-javascript ext-js line-numbers-mode"><pre v-pre class="language-javascript"><code><span class="token keyword">import</span> <span class="token punctuation">{</span>ShModal<span class="token punctuation">}</span> <span class="token keyword">from</span> <span class="token string">'@iankibetsh/shframework'</span>

</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="example-usage" tabindex="-1"><a class="header-anchor" href="#example-usage" aria-hidden="true">#</a> Example Usage</h3>
<div class="language-html ext-html line-numbers-mode"><pre v-pre class="language-html"><code><span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>sh-modal</span> <span class="token attr-name">modal-id</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">"</span>exampleModal<span class="token punctuation">"</span></span> <span class="token attr-name">modal-title</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">"</span>My Example Modal<span class="token punctuation">"</span></span><span class="token punctuation">></span></span>
    <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>h5</span><span class="token punctuation">></span></span>Model content here<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>h5</span><span class="token punctuation">></span></span>
<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>sh-modal</span><span class="token punctuation">></span></span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="attributes" tabindex="-1"><a class="header-anchor" href="#attributes" aria-hidden="true">#</a> Attributes</h3>
<h4 id="modal-id" tabindex="-1"><a class="header-anchor" href="#modal-id" aria-hidden="true">#</a> modal-id</h4>
<ul>
<li>
<p>Type: <code v-pre>string</code></p>
</li>
<li>
<p>Default: <code v-pre>none</code></p>
</li>
<li>
<p>Required: <code v-pre>true</code></p>
</li>
<li>
<p>Details</p>
<p>This is the modal attribute id that will be attached or triggered by a button later on</p>
</li>
<li>
<p>Example: <code v-pre>exampleModal</code></p>
</li>
</ul>
<h4 id="modal-title" tabindex="-1"><a class="header-anchor" href="#modal-title" aria-hidden="true">#</a> modal-title</h4>
<ul>
<li>
<p>Type: <code v-pre>string</code></p>
</li>
<li>
<p>Default: <code v-pre>none</code></p>
</li>
<li>
<p>Required: <code v-pre>false</code></p>
</li>
<li>
<p>Details</p>
<p>This is the title of the modal</p>
</li>
<li>
<p>Example: <code v-pre>My Example Modal</code></p>
</li>
</ul>
</div></template>
