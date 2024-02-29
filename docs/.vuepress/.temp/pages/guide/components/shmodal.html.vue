<template><div><h1 id="shmodal" tabindex="-1"><a class="header-anchor" href="#shmodal"><span>ShModal</span></a></h1>
<p>The <code v-pre>sh-modal</code> component is a simple modal component that can be used to create modals in your application.
It is a simple modal that can be used to display content in a modal.</p>
<h3 id="basic-example" tabindex="-1"><a class="header-anchor" href="#basic-example"><span>Basic Example</span></a></h3>
<h3 id="import" tabindex="-1"><a class="header-anchor" href="#import"><span>import</span></a></h3>
<div class="language-javascript line-numbers-mode" data-ext="js" data-title="js"><pre v-pre class="language-javascript"><code><span class="token keyword">import</span> <span class="token punctuation">{</span>ShModal<span class="token punctuation">}</span> <span class="token keyword">from</span> <span class="token string">'@iankibetsh/shframework'</span>

</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="example-usage" tabindex="-1"><a class="header-anchor" href="#example-usage"><span>Example Usage</span></a></h3>
<div class="language-html line-numbers-mode" data-ext="html" data-title="html"><pre v-pre class="language-html"><code><span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>sh-modal</span> <span class="token attr-name">modal-id</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">"</span>exampleModal<span class="token punctuation">"</span></span> <span class="token attr-name">modal-title</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">"</span>My Example Modal<span class="token punctuation">"</span></span><span class="token punctuation">></span></span>
    <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>h5</span><span class="token punctuation">></span></span>Model content here<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>h5</span><span class="token punctuation">></span></span>
<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>sh-modal</span><span class="token punctuation">></span></span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="attributes" tabindex="-1"><a class="header-anchor" href="#attributes"><span>Attributes</span></a></h3>
<h4 id="modal-id" tabindex="-1"><a class="header-anchor" href="#modal-id"><span>modal-id</span></a></h4>
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
</ul>
<div class="language-text line-numbers-mode" data-ext="text" data-title="text"><pre v-pre class="language-text"><code> Example: modal-id='exampleModal'
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><h4 id="modal-title" tabindex="-1"><a class="header-anchor" href="#modal-title"><span>modal-title</span></a></h4>
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
</ul>
<div class="language-text line-numbers-mode" data-ext="text" data-title="text"><pre v-pre class="language-text"><code>    Example: modal-title='My Example Modal'
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><h4 id="modal-size" tabindex="-1"><a class="header-anchor" href="#modal-size"><span>modal-size</span></a></h4>
<ul>
<li>
<p>Type: <code v-pre>string</code></p>
</li>
<li>
<p>Default: <code v-pre>md</code></p>
</li>
<li>
<p>Required: <code v-pre>false</code></p>
</li>
<li>
<p>Options: <code v-pre>sm</code>, <code v-pre>md</code>, <code v-pre>lg</code>, <code v-pre>xl</code></p>
</li>
<li>
<p>Details</p>
<p>This is the size of the modal</p>
</li>
</ul>
<div class="language-text line-numbers-mode" data-ext="text" data-title="text"><pre v-pre class="language-text"><code>    Example: modal-size='md'
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><h4 id="static" tabindex="-1"><a class="header-anchor" href="#static"><span>Static</span></a></h4>
<ul>
<li>
<p>Type: <code v-pre>boolean</code></p>
</li>
<li>
<p>Default: <code v-pre>false</code></p>
</li>
<li>
<p>Required: <code v-pre>false</code></p>
</li>
<li>
<p>Details</p>
<p>This is the static attribute of the modal</p>
</li>
</ul>
<div class="language-text line-numbers-mode" data-ext="text" data-title="text"><pre v-pre class="language-text"><code>    Example: :static='true'
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div></div></template>


