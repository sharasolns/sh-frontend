<template><div><h1 id="sh-canvas" tabindex="-1"><a class="header-anchor" href="#sh-canvas"><span>Sh Canvas</span></a></h1>
<p>A sidebar component that can be toggled by clicking a button or by an action. It can be used to display additional content on the side of the screen.</p>
<h2 id="importing" tabindex="-1"><a class="header-anchor" href="#importing"><span>Importing</span></a></h2>
<div class="language-javascript line-numbers-mode" data-ext="js" data-title="js"><pre v-pre class="language-javascript"><code><span class="token keyword">import</span> <span class="token punctuation">{</span> ShCanvas <span class="token punctuation">}</span> <span class="token keyword">from</span> <span class="token string">'@iankibetsh/shframework'</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><p>make sure to add the canvas trigger anchor tag or button with the following attributes to trigger the canvas</p>
<div class="language-html line-numbers-mode" data-ext="html" data-title="html"><pre v-pre class="language-html"><code>  <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>button</span>  <span class="token attr-name">type</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">"</span>button<span class="token punctuation">"</span></span> <span class="token attr-name">data-bs-toggle</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">"</span>offcanvas<span class="token punctuation">"</span></span> <span class="token attr-name">data-bs-target</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">"</span>#offcanvasExample<span class="token punctuation">"</span></span> <span class="token attr-name">aria-controls</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">"</span>offcanvasExample<span class="token punctuation">"</span></span><span class="token punctuation">></span></span>Toggle canvas<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>button</span><span class="token punctuation">></span></span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><h2 id="example-usage" tabindex="-1"><a class="header-anchor" href="#example-usage"><span>Example Usage</span></a></h2>
<div class="language-html line-numbers-mode" data-ext="html" data-title="html"><pre v-pre class="language-html"><code><span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>sh-canvas</span> <span class="token attr-name">canvas-id</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">"</span>myCanvas<span class="token punctuation">"</span></span> <span class="token attr-name">canvas-title</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">"</span>Canvas Title<span class="token punctuation">"</span></span> <span class="token attr-name">position</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">"</span>start<span class="token punctuation">"</span></span> <span class="token attr-name">scrollable</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">"</span>true<span class="token punctuation">"</span></span> <span class="token attr-name">size</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">"</span>lg<span class="token punctuation">"</span></span><span class="token punctuation">></span></span>
    <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>h3</span><span class="token punctuation">></span></span>Canvas content will appear in slot here<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>h3</span><span class="token punctuation">></span></span>
<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>sh-canvas</span><span class="token punctuation">></span></span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h2 id="attributes" tabindex="-1"><a class="header-anchor" href="#attributes"><span>Attributes</span></a></h2>
<h3 id="canvas-id" tabindex="-1"><a class="header-anchor" href="#canvas-id"><span><code v-pre>canvas-id</code></span></a></h3>
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
<p>This will be the id of the canvas</p>
</li>
<li>
<p>Example: <code v-pre>myCanvas</code></p>
</li>
</ul>
<h3 id="position" tabindex="-1"><a class="header-anchor" href="#position"><span><code v-pre>position</code></span></a></h3>
<ul>
<li>Type: <code v-pre>string</code></li>
<li>Default: <code v-pre>start</code></li>
<li>Required: <code v-pre>false</code></li>
<li>Options: <code v-pre>start</code>, <code v-pre>end</code>, <code v-pre>bottom</code>, <code v-pre>top</code></li>
<li>Options: <code v-pre>end, start, bottom, top</code></li>
<li>Details</li>
</ul>
<p>This will be the position of the canvas, bootstrap 5 canvas positions are used</p>
<ul>
<li>Example: <code v-pre>start</code></li>
</ul>
<h3 id="canvas-title" tabindex="-1"><a class="header-anchor" href="#canvas-title"><span><code v-pre>canvas-title</code></span></a></h3>
<ul>
<li>Type: <code v-pre>string</code></li>
<li>Default: <code v-pre>none</code></li>
<li>Required: <code v-pre>false</code></li>
<li>Details</li>
</ul>
<p>Title of the canvas that will be displayed on the header of the canvas</p>
<ul>
<li>Example: <code v-pre>Canvas Title</code></li>
</ul>
<h3 id="canvas-size" tabindex="-1"><a class="header-anchor" href="#canvas-size"><span><code v-pre>canvas-size</code></span></a></h3>
<ul>
<li>Type: <code v-pre>string</code></li>
<li>Default: <code v-pre>md</code></li>
<li>Required: <code v-pre>false</code></li>
<li>Options: <code v-pre>sm</code>, <code v-pre>md</code>, <code v-pre>lg</code>, <code v-pre>xl</code></li>
<li>Details</li>
</ul>
<p>This will be the size of the canvas, bootstrap 5 canvas sizes are used</p>
<ul>
<li>Example: <code v-pre>md</code></li>
</ul>
<h3 id="scrollable" tabindex="-1"><a class="header-anchor" href="#scrollable"><span><code v-pre>scrollable</code></span></a></h3>
<ul>
<li>Type: <code v-pre>boolean</code></li>
<li>Default: <code v-pre>false</code></li>
<li>Required: <code v-pre>false</code></li>
<li>Details</li>
</ul>
<p>This will be the scrollable state of the canvas, element is disabled when an offcanvas and its backdrop are visible.</p>
</div></template>


