<template><div><h1 id="sh-modal-form" tabindex="-1"><a class="header-anchor" href="#sh-modal-form"><span>Sh modal Form</span></a></h1>
<p>Sometimes you may want to use sh-modal-form. This is a component that combines the sh-modal and sh-form components.
Instead of creating button and modal separately, you can use this component to create a button that will trigger a modal with a form inside it.</p>
<h2 id="importing" tabindex="-1"><a class="header-anchor" href="#importing"><span>Importing</span></a></h2>
<div class="language-javascript line-numbers-mode" data-highlighter="prismjs" data-ext="js" data-title="js"><pre v-pre><code><span class="line"><span class="token keyword">import</span> <span class="token punctuation">{</span> ShModalForm <span class="token punctuation">}</span> <span class="token keyword">from</span> <span class="token string">'@iankibetsh/shframework'</span></span>
<span class="line"></span></code></pre>
<div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0"><div class="line-number"></div></div></div><h2 id="example-usage" tabindex="-1"><a class="header-anchor" href="#example-usage"><span>Example Usage</span></a></h2>
<div class="language-html line-numbers-mode" data-highlighter="prismjs" data-ext="html" data-title="html"><pre v-pre><code><span class="line">  <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>sh-modal-form</span></span>
<span class="line">      <span class="token attr-name">modal-id</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">"</span>addTask<span class="token punctuation">"</span></span></span>
<span class="line">      <span class="token attr-name">modal-title</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">"</span>Add Task<span class="token punctuation">"</span></span></span>
<span class="line">      <span class="token attr-name">:fields</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">"</span>['name','description','phone']<span class="token punctuation">"</span></span></span>
<span class="line">      <span class="token attr-name">:action</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">"</span><span class="token punctuation">'</span>tasks/store'<span class="token punctuation">"</span></span></span>
<span class="line">      <span class="token attr-name">:successCallback</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">"</span>taskAdded<span class="token punctuation">"</span></span></span>
<span class="line">  <span class="token punctuation">></span></span>Add Task<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>sh-modal-form</span><span class="token punctuation">></span></span></span>
<span class="line"></span></code></pre>
<div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h2 id="attributes" tabindex="-1"><a class="header-anchor" href="#attributes"><span>Attributes</span></a></h2>
<h3 id="modal-id" tabindex="-1"><a class="header-anchor" href="#modal-id"><span><code v-pre>modal-id</code></span></a></h3>
<ul>
<li>Type: <code v-pre>string</code></li>
<li>Default: <code v-pre>none</code></li>
<li>Required: <code v-pre>true</code></li>
<li>Details
This is the modal attribute id that will be attached or triggered by a button later on</li>
</ul>
<div class="language-text line-numbers-mode" data-highlighter="prismjs" data-ext="text" data-title="text"><pre v-pre><code><span class="line"> Example: modal-id='exampleModal'</span>
<span class="line"></span></code></pre>
<div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0"><div class="line-number"></div></div></div><h3 id="modal-title" tabindex="-1"><a class="header-anchor" href="#modal-title"><span><code v-pre>modal-title</code></span></a></h3>
<ul>
<li>Type: <code v-pre>string</code></li>
<li>Default: <code v-pre>none</code></li>
<li>Required: <code v-pre>false</code></li>
<li>Details
This is the title of the modal</li>
</ul>
<div class="language-text line-numbers-mode" data-highlighter="prismjs" data-ext="text" data-title="text"><pre v-pre><code><span class="line">    Example: modal-title='My Example Modal'</span>
<span class="line"></span></code></pre>
<div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0"><div class="line-number"></div></div></div><h3 id="modal-size" tabindex="-1"><a class="header-anchor" href="#modal-size"><span><code v-pre>modal-size</code></span></a></h3>
<ul>
<li>Type: <code v-pre>string</code></li>
<li>Default: <code v-pre>md</code></li>
<li>Required: <code v-pre>false</code></li>
<li>Options: <code v-pre>sm</code>, <code v-pre>md</code>, <code v-pre>lg</code>, <code v-pre>xl</code></li>
<li>Details
This is the size of the modal</li>
</ul>
<div class="language-text line-numbers-mode" data-highlighter="prismjs" data-ext="text" data-title="text"><pre v-pre><code><span class="line">    Example: modal-size='md'</span>
<span class="line"></span></code></pre>
<div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0"><div class="line-number"></div></div></div><h3 id="fields" tabindex="-1"><a class="header-anchor" href="#fields"><span><code v-pre>fields</code></span></a></h3>
<ul>
<li>Type: <code v-pre>array</code></li>
<li>Default: <code v-pre>none</code></li>
<li>Required: <code v-pre>true</code></li>
<li>Details
These are the form files, like inputs, select etc</li>
</ul>
<div class="language-text line-numbers-mode" data-highlighter="prismjs" data-ext="text" data-title="text"><pre v-pre><code><span class="line">    Example: :fields="['name','email','password']"</span>
<span class="line"></span></code></pre>
<div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0"><div class="line-number"></div></div></div><h3 id="action" tabindex="-1"><a class="header-anchor" href="#action"><span><code v-pre>action</code></span></a></h3>
<ul>
<li>Type: <code v-pre>string</code></li>
<li>default: <code v-pre>none</code></li>
<li>Required: <code v-pre>true</code></li>
<li>Details:
This is the action url to the api backend where the request will be handled
The action will be appended to the base url of the api backend defined in the .env file</li>
</ul>
<div class="language-text line-numbers-mode" data-highlighter="prismjs" data-ext="text" data-title="text"><pre v-pre><code><span class="line">    Example: `tasks/store`</span>
<span class="line"></span></code></pre>
<div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0"><div class="line-number"></div></div></div><h3 id="method" tabindex="-1"><a class="header-anchor" href="#method"><span><code v-pre>method</code></span></a></h3>
<ul>
<li>Type: <code v-pre>string</code></li>
<li>Default: <code v-pre>post</code></li>
<li>Required: <code v-pre>false</code></li>
<li>Options: <code v-pre>post</code>, <code v-pre>put</code>, <code v-pre>patch</code>, <code v-pre>delete</code></li>
<li>Details:
This is the method of the request. By default, the method is post</li>
</ul>
<div class="language-text line-numbers-mode" data-highlighter="prismjs" data-ext="text" data-title="text"><pre v-pre><code><span class="line">    Example: :method="put"</span>
<span class="line"></span></code></pre>
<div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0"><div class="line-number"></div></div></div><h3 id="success-callback" tabindex="-1"><a class="header-anchor" href="#success-callback"><span><code v-pre>success-callback</code></span></a></h3>
<ul>
<li>Type: <code v-pre>function/method</code></li>
<li>Default: <code v-pre>none</code></li>
<li>Required: <code v-pre>false</code></li>
<li>Details:
This is the method that will be called after the request is successful</li>
</ul>
<div class="language-text line-numbers-mode" data-highlighter="prismjs" data-ext="text" data-title="text"><pre v-pre><code><span class="line">    Example: :successCallback="taskAdded"</span>
<span class="line"></span></code></pre>
<div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0"><div class="line-number"></div></div></div><h3 id="success-message" tabindex="-1"><a class="header-anchor" href="#success-message"><span><code v-pre>success-message</code></span></a></h3>
<ul>
<li>Type: <code v-pre>string</code></li>
<li>Default: <code v-pre>Action Successful</code></li>
<li>Required: <code v-pre>false</code></li>
<li>Details
This is the message that will appear on the confirmation dialog</li>
</ul>
<div class="language-text line-numbers-mode" data-highlighter="prismjs" data-ext="text" data-title="text"><pre v-pre><code><span class="line">    Example: success-message="Task added successfully"</span>
<span class="line"></span></code></pre>
<div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0"><div class="line-number"></div></div></div></div></template>


