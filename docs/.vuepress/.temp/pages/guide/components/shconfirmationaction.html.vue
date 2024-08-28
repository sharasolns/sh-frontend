<template><div><h1 id="confirmation-action" tabindex="-1"><a class="header-anchor" href="#confirmation-action"><span>Confirmation Action</span></a></h1>
<p>The <code v-pre>sh-confirm-action</code> component is a button that triggers a
confirmation dialog before executing an action.
it is used to confirm an action before it is executed.</p>
<h2 id="importing" tabindex="-1"><a class="header-anchor" href="#importing"><span>Importing</span></a></h2>
<div class="language-javascript line-numbers-mode" data-highlighter="prismjs" data-ext="js" data-title="js"><pre v-pre><code><span class="line"><span class="token keyword">import</span> <span class="token punctuation">{</span> ShConfirmationAction <span class="token punctuation">}</span> <span class="token keyword">from</span> <span class="token string">'@iankibetsh/shframework'</span></span>
<span class="line"></span></code></pre>
<div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0"><div class="line-number"></div></div></div><h2 id="example-usage" tabindex="-1"><a class="header-anchor" href="#example-usage"><span>Example Usage</span></a></h2>
<div class="language-html line-numbers-mode" data-highlighter="prismjs" data-ext="html" data-title="html"><pre v-pre><code><span class="line"><span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>sh-confirm-action</span> <span class="token attr-name">url</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">"</span>tasks/delete/1<span class="token punctuation">"</span></span> <span class="token attr-name">title</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">"</span>Delete Task<span class="token punctuation">"</span></span> <span class="token attr-name">message</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">"</span>Are you sure you want to delete this task?<span class="token punctuation">"</span></span><span class="token punctuation">></span></span></span>
<span class="line">    <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>button</span> <span class="token attr-name">class</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">"</span>btn btn-danger<span class="token punctuation">"</span></span><span class="token punctuation">></span></span>Delete<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>button</span><span class="token punctuation">></span></span></span>
<span class="line"><span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>sh-confirm-action</span><span class="token punctuation">></span></span></span>
<span class="line"></span></code></pre>
<div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h2 id="attributes" tabindex="-1"><a class="header-anchor" href="#attributes"><span>Attributes</span></a></h2>
<h3 id="url" tabindex="-1"><a class="header-anchor" href="#url"><span>url</span></a></h3>
<ul>
<li>
<p>Type: <code v-pre>string</code></p>
</li>
<li>
<p>Default: <code v-pre>none</code></p>
</li>
<li>
<p>Details</p>
<p>This is the url that will be called when the action is confirmed</p>
<pre><code>Example: url=&quot;tasks/delete/1&quot;
</code></pre>
</li>
</ul>
<h3 id="title" tabindex="-1"><a class="header-anchor" href="#title"><span>title</span></a></h3>
<ul>
<li>
<p>Type: <code v-pre>string</code></p>
</li>
<li>
<p>Default: <code v-pre>none</code></p>
</li>
<li>
<p>Details</p>
<p>This is the title that will appear on the confirmation dialog</p>
<pre><code>Example: title=&quot;Delete Task&quot;
</code></pre>
</li>
</ul>
<h3 id="message" tabindex="-1"><a class="header-anchor" href="#message"><span>message</span></a></h3>
<ul>
<li>
<p>Type: <code v-pre>string</code></p>
</li>
<li>
<p>Default: <code v-pre>none</code></p>
</li>
<li>
<p>Details</p>
<p>This is the message that will appear on the confirmation dialog</p>
<pre><code>Example: message=&quot;Are you sure you want to delete this task?&quot;
</code></pre>
</li>
</ul>
<h3 id="success-message" tabindex="-1"><a class="header-anchor" href="#success-message"><span>success-message</span></a></h3>
<ul>
<li>
<p>Type: <code v-pre>string</code></p>
</li>
<li>
<p>Default: <code v-pre>Action Successful</code></p>
</li>
<li>
<p>Details</p>
<p>This is the message that will appear on the confirmation dialog</p>
<pre><code>Example: success-message=&quot;Task deleted successfully&quot;
</code></pre>
</li>
</ul>
<h3 id="loading-message" tabindex="-1"><a class="header-anchor" href="#loading-message"><span>loading-message</span></a></h3>
<ul>
<li>
<p>Type: <code v-pre>string</code></p>
</li>
<li>
<p>Default: <code v-pre>Processing...</code></p>
</li>
<li>
<p>Details</p>
<p>This is the message that will appear on submit button when the action is being processed</p>
<pre><code>Example: loading-message=&quot;Deleting Task...&quot;
</code></pre>
</li>
</ul>
</div></template>


