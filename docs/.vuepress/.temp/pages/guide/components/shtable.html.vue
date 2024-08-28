<template><div><h1 id="sh-table" tabindex="-1"><a class="header-anchor" href="#sh-table"><span>Sh Table</span></a></h1>
<p>sh-table is a component that generates a table. It's a wrapper around the bootstrap table.
Using this component makes your work easier and faster.
To generate a table, you need to pass the headers, and the end-point of the table data. This will populate the table with the data from the end-point.
Sounds cool right?
Let's see how to use it.</p>
<h2 id="importing" tabindex="-1"><a class="header-anchor" href="#importing"><span>importing</span></a></h2>
<div class="language-javascript line-numbers-mode" data-highlighter="prismjs" data-ext="js" data-title="js"><pre v-pre><code><span class="line"><span class="token keyword">import</span> <span class="token punctuation">{</span>ShTable<span class="token punctuation">}</span> <span class="token keyword">from</span> <span class="token string">'@iankibetsh/shframework'</span></span>
<span class="line"></span></code></pre>
<div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0"><div class="line-number"></div></div></div><h2 id="example-usage" tabindex="-1"><a class="header-anchor" href="#example-usage"><span>Example Usage</span></a></h2>
<div class="language-html line-numbers-mode" data-highlighter="prismjs" data-ext="html" data-title="html"><pre v-pre><code><span class="line"><span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>sh-table</span></span>
<span class="line">      <span class="token attr-name">:headers</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">"</span>['id','name','description']<span class="token punctuation">"</span></span></span>
<span class="line">  <span class="token attr-name">end-point</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">"</span>tasks/list<span class="token punctuation">"</span></span></span>
<span class="line">  <span class="token punctuation">/></span></span></span>
<span class="line"></span></code></pre>
<div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h2 id="attributes" tabindex="-1"><a class="header-anchor" href="#attributes"><span>Attributes</span></a></h2>
<h3 id="headers" tabindex="-1"><a class="header-anchor" href="#headers"><span><code v-pre>headers</code></span></a></h3>
<ul>
<li>
<p>Type: <code v-pre>array</code></p>
</li>
<li>
<p>Default: <code v-pre>none</code></p>
</li>
<li>
<p>Required: <code v-pre>true</code></p>
</li>
<li>
<p>Details</p>
<p>These are table headers for the table that will be generated</p>
<pre><code>Example: `['id','name','description']`
</code></pre>
</li>
</ul>
<h3 id="end-point" tabindex="-1"><a class="header-anchor" href="#end-point"><span><code v-pre>end-point</code></span></a></h3>
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
<p>It's the endpoint of table data, usually it's the backend api url</p>
<pre><code>Example: `tasks/list`
</code></pre>
</li>
</ul>
<h3 id="links" tabindex="-1"><a class="header-anchor" href="#links"><span>links</span></a></h3>
<ul>
<li>
<p>Type: <code v-pre>object</code></p>
</li>
<li>
<p>Required: <code v-pre>false</code>,</p>
</li>
<li>
<p>Default: <code v-pre>none</code></p>
</li>
<li>
<p>Details</p>
<p>In case you want to add links to table data you can use this attribute.
It's an object with the following properties</p>
</li>
</ul>
<p>Example Usage</p>
<div class="language-text line-numbers-mode" data-highlighter="prismjs" data-ext="text" data-title="text"><pre v-pre><code><span class="line">:links="{</span>
<span class="line">  id: {</span>
<span class="line">    url: '/tasks/{id}/details',</span>
<span class="line">     target: '_blank'</span>
<span class="line">  }</span>
<span class="line">}"</span>
<span class="line"></span></code></pre>
<div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>The above will add a link to the id column with the url <code v-pre>/tasks/{id}/details</code> and the open in a new tab</p>
<h3 id="actions" tabindex="-1"><a class="header-anchor" href="#actions"><span>actions</span></a></h3>
<ul>
<li>
<p>Type: <code v-pre>object</code></p>
</li>
<li>
<p>Required: <code v-pre>false</code>,</p>
</li>
<li>
<p>Default: <code v-pre>none</code></p>
</li>
<li>
<p>Details</p>
<p>This will be the buttons attached to the end colum of the table containing header label, actions and action callbacks,
When a emits value is string, it emits an event, and you have to listen to that event. The easy way is to use a function callback</p>
</li>
<li>
<p>Example With Emitter</p>
</li>
</ul>
<div class="language-text line-numbers-mode" data-highlighter="prismjs" data-ext="text" data-title="text"><pre v-pre><code><span class="line">:actions="{</span>
<span class="line">label: 'Action',</span>
<span class="line">        actions: [</span>
<span class="line">  {</span>
<span class="line">    label: 'EDIT',</span>
<span class="line">    class: 'btn btn-info btn-sm',</span>
<span class="line">    type: 'emitter',</span>
<span class="line">    emits: 'editDocument'</span>
<span class="line">  }</span>
<span class="line">]</span>
<span class="line">}"</span>
<span class="line"></span></code></pre>
<div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><ul>
<li>Example With Action Callback</li>
</ul>
<div class="language-text line-numbers-mode" data-highlighter="prismjs" data-ext="text" data-title="text"><pre v-pre><code><span class="line">:actions="{</span>
<span class="line">label: 'Action',</span>
<span class="line">        actions: [</span>
<span class="line">  {</span>
<span class="line">    label: 'EDIT',</span>
<span class="line">    class: 'btn btn-info btn-sm',</span>
<span class="line">    type: 'emitter',</span>
<span class="line">    emits: editDocument</span>
<span class="line">  }</span>
<span class="line">]</span>
<span class="line">}"</span>
<span class="line"></span></code></pre>
<div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><ul>
<li>Example With Offcanvas</li>
</ul>
<div class="language-text line-numbers-mode" data-highlighter="prismjs" data-ext="text" data-title="text"><pre v-pre><code><span class="line">:actions="{</span>
<span class="line">      label: 'Action',</span>
<span class="line">      actions: [</span>
<span class="line">        {</span>
<span class="line">          label: 'Permissions',</span>
<span class="line">          canvasPosition: 'start',</span>
<span class="line">          canvasTitle: 'View Department',</span>
<span class="line">          canvasId: 'departmentsCanvas',</span>
<span class="line">          canvasSize: 'lg',</span>
<span class="line">          canvasComponent: ViewDepartment,</span>
<span class="line">          class: 'btn btn-info btn-sm',</span>
<span class="line">          icon: 'bi-plus',</span>
<span class="line">        }</span>
<span class="line">      ]</span>
<span class="line">    }"</span>
<span class="line"></span></code></pre>
<div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>In the above, canvas component is the imported canvas component</p>
</div></template>


