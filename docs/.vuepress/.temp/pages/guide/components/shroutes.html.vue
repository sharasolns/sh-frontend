<template><div><h1 id="routes" tabindex="-1"><a class="header-anchor" href="#routes"><span>Routes</span></a></h1>
<p>This is a guide to the routes component.
Its the normal vue router component with a few extra features.</p>
<h2 id="modal-or-off-canvas" tabindex="-1"><a class="header-anchor" href="#modal-or-off-canvas"><span>Modal or off-canvas</span></a></h2>
<p>We have added a modal or off-canvas feature to the routes.
This is to help you open a modal or off-canvas from the url</p>
<h2 id="example-usage" tabindex="-1"><a class="header-anchor" href="#example-usage"><span>Example Usage</span></a></h2>
<div class="language-html line-numbers-mode" data-highlighter="prismjs" data-ext="html" data-title="html"><pre v-pre><code><span class="line">{</span>
<span class="line">        path: '/tasks',</span>
<span class="line">        component: tab,</span>
<span class="line">        meta: {</span>
<span class="line">            popup: 'modal',</span>
<span class="line">            title: 'Task Form'</span>
<span class="line">        }</span>
<span class="line">    }</span>
<span class="line"></span></code></pre>
<div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>This is a normal vue route with a meta property. The component is the component that will be displayed in the modal. The popup property is set to modal to indicate that the route should be opened in a modal. The title property is the title of the modal.</p>
<h2 id="attributes" tabindex="-1"><a class="header-anchor" href="#attributes"><span>Attributes</span></a></h2>
<h3 id="popup" tabindex="-1"><a class="header-anchor" href="#popup"><span>popup</span></a></h3>
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
<p>options: <code v-pre>modal</code>, <code v-pre>canvas</code></p>
</li>
<li>
<p>Details</p>
<p>This is the popup attribute that will be used to open the route in a modal</p>
<pre><code>Example: `popup: 'modal'`
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
<p>Required: <code v-pre>false</code></p>
</li>
<li>
<p>Details</p>
<p>This is the title of the modal</p>
<pre><code>Example: `title: 'Task Form'`
</code></pre>
</li>
</ul>
<h3 id="size" tabindex="-1"><a class="header-anchor" href="#size"><span>size</span></a></h3>
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
<pre><code>Example: `size: 'md'`
</code></pre>
</li>
</ul>
</div></template>


