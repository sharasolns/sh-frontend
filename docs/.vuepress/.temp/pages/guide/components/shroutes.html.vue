<template><div><h1 id="routes" tabindex="-1"><a class="header-anchor" href="#routes"><span>Routes</span></a></h1>
<p>This is a guide to the routes component.
It's the normal vue router component with a few extra features.</p>
<h2 id="modal-or-off-canvas" tabindex="-1"><a class="header-anchor" href="#modal-or-off-canvas"><span>Modal or off-canvas</span></a></h2>
<p>We have added a modal or off-canvas feature to the routes.
This is to help you open a modal or off-canvas from the url</p>
<h2 id="example-usage" tabindex="-1"><a class="header-anchor" href="#example-usage"><span>Example Usage</span></a></h2>
<div class="language-html line-numbers-mode" data-ext="html" data-title="html"><pre v-pre class="language-html"><code>{
        path: '/tasks',
        component: tab,
        meta: {
            popup: 'modal',
            title: 'Task Form'
        }
    }
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>This is a normal vue route with a meta property. The component is the component that will be displayed in the modal. The popup property is set to modal to indicate that the route should be opened in a modal. The title property is the title of the modal.</p>
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
</li>
</ul>
<p>Example :</p>
<div class="language-text line-numbers-mode" data-ext="text" data-title="text"><pre v-pre class="language-text"><code>popup: 'modal'
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><h3 id="title" tabindex="-1"><a class="header-anchor" href="#title"><span>title</span></a></h3>
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
<p>Example :
``
title: 'Task Form'</p>
<div class="language-text line-numbers-mode" data-ext="text" data-title="text"><pre v-pre class="language-text"><code>
### size 
- Type: `string`
- Default: `md`
- Required: `false`
- Options: `sm`, `md`, `lg`, `xl`
- Details

    This is the size of the modal

      
Example :

</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>size: 'md'</p>
<div class="language-text line-numbers-mode" data-ext="text" data-title="text"><pre v-pre class="language-text"><code>
### popup query form
- Type: `string`
- Default: `none`
- Required: `false`
- Details
- Options: `modal`, `canvas`
- Details
         
 This is the popup attribute that will be used to open the route in a modal
 
Example :
```html
 &lt;router-link 
                     to="/tasks?popup=modal&amp;title=New Task&amp;comp=ShQueryForm&amp;fields=name,email,phone&amp;action=tasks/store"
                     class="btn btn-info btn-sm ms-2">
                    Popup 
        &lt;/router-link>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h4 id="pagecount" tabindex="-1"><a class="header-anchor" href="#pagecount"><span>pageCount</span></a></h4>
<ul>
<li>
<p>Type: <code v-pre>number</code></p>
</li>
<li>
<p>Default: <code v-pre>10</code></p>
</li>
<li>
<p>Required: <code v-pre>false</code></p>
</li>
<li>
<p>Details</p>
<p>This is the number of items that will be displayed per page in the table.</p>
</li>
</ul>
<p>Example :</p>
<div class="language-text line-numbers-mode" data-ext="text" data-title="text"><pre v-pre class="language-text"><code>pageCount: 10
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><h4 id="hidecount" tabindex="-1"><a class="header-anchor" href="#hidecount"><span>hideCount</span></a></h4>
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
<p>This is the attribute that will be used to hide the count of the table</p>
</li>
</ul>
<p>Example :</p>
<div class="language-text line-numbers-mode" data-ext="text" data-title="text"><pre v-pre class="language-text"><code>hideCount: true
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><h4 id="hideloadmore" tabindex="-1"><a class="header-anchor" href="#hideloadmore"><span>hideLoadMore</span></a></h4>
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
<p>This is the attribute that will be used to hide the load more button</p>
</li>
</ul>
<p>Example :</p>
<div class="language-text line-numbers-mode" data-ext="text" data-title="text"><pre v-pre class="language-text"><code>hideLoadMore: true
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><h4 id="reload" tabindex="-1"><a class="header-anchor" href="#reload"><span>reload</span></a></h4>
<ul>
<li>
<p>Type: <code v-pre>number</code></p>
</li>
<li>
<p>Default: <code v-pre>0</code></p>
</li>
<li>
<p>Required: <code v-pre>false</code></p>
</li>
<li>
<p>Details</p>
<p>This is the attribute that will be used to reload the table</p>
</li>
</ul>
<p>Example :</p>
<div class="language-text line-numbers-mode" data-ext="text" data-title="text"><pre v-pre class="language-text"><code>reload= "1"
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><h4 id="explanation" tabindex="-1"><a class="header-anchor" href="#explanation"><span>Explanation</span></a></h4>
<p>This is a normal router link with a query string.</p>
<p>The query string has the popup attribute set to modal to indicate that the route should be opened in a modal.</p>
<p>The title attribute is the title of the modal.</p>
<p>The comp attribute is the component that will be displayed in the modal.</p>
<p>The fields attribute is the fields that will be displayed in the form.</p>
<p>The action attribute is the action that will be called when the form is submitted.</p>
</div></template>


