<template><div><h1 id="sh-table" tabindex="-1"><a class="header-anchor" href="#sh-table"><span>Sh Table</span></a></h1>
<p>sh-table is a component that generates a table. It's a wrapper around the bootstrap table.
Using this component makes your work easier and faster.
To generate a table, you need to pass the headers, and the end-point of the table data. This will populate the table with the data from the end-point.
Sounds cool right?
Let's see how to use it.</p>
<h2 id="importing" tabindex="-1"><a class="header-anchor" href="#importing"><span>importing</span></a></h2>
<div class="language-javascript line-numbers-mode" data-ext="js" data-title="js"><pre v-pre class="language-javascript"><code><span class="token keyword">import</span> <span class="token punctuation">{</span>ShTable<span class="token punctuation">}</span> <span class="token keyword">from</span> <span class="token string">'@iankibetsh/shframework'</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><h2 id="example-usage" tabindex="-1"><a class="header-anchor" href="#example-usage"><span>Example Usage</span></a></h2>
<div class="language-html line-numbers-mode" data-ext="html" data-title="html"><pre v-pre class="language-html"><code><span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>sh-table</span>
      <span class="token attr-name">:headers</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">"</span>['id','name','description']<span class="token punctuation">"</span></span>
  <span class="token attr-name">end-point</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">"</span>tasks/list<span class="token punctuation">"</span></span>
  <span class="token punctuation">/></span></span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h2 id="attributes" tabindex="-1"><a class="header-anchor" href="#attributes"><span>Attributes</span></a></h2>
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
</li>
</ul>
<p>Example :</p>
<div class="language-text line-numbers-mode" data-ext="text" data-title="text"><pre v-pre class="language-text"><code> headers="['id','name','description']"
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><h3 id="end-point" tabindex="-1"><a class="header-anchor" href="#end-point"><span><code v-pre>end-point</code></span></a></h3>
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
</li>
</ul>
<p>Example :</p>
<div class="language-text line-numbers-mode" data-ext="text" data-title="text"><pre v-pre class="language-text"><code>end-point="tasks/list"
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><h3 id="links" tabindex="-1"><a class="header-anchor" href="#links"><span>links</span></a></h3>
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
<p>Example :</p>
<div class="language-text line-numbers-mode" data-ext="text" data-title="text"><pre v-pre class="language-text"><code>:links="{
  id: {
    url: '/tasks/{id}/details',
     target: '_blank'
  }
}"
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>The above will add a link to the id column with the url <code v-pre>/tasks/{id}/details</code> and the open in a new tab</p>
<h3 id="cache-key" tabindex="-1"><a class="header-anchor" href="#cache-key"><span>cache-key</span></a></h3>
<ul>
<li>
<p>Type: <code v-pre>string</code></p>
</li>
<li>
<p>Required: <code v-pre>false</code>,</p>
</li>
<li>
<p>Default: <code v-pre>none</code></p>
</li>
<li>
<p>Details</p>
<p>This is the cache key for the table data. It's used to cache the table data in the local storage.
This is useful when you want to cache the table data for a certain period of time.
The cache key is used to store the data in the local storage.
When the table is loaded, it checks if the data is in the local storage, if it's there, it uses it, if not, it fetches the data from the end-point and stores it in the local storage using the cache key.
The next time the table is loaded, it checks if the data is in the local storage, if it's there, it uses it, if not, it fetches the data from the end-point and stores it in the local storage using the cache key.</p>
</li>
</ul>
<p>Example :</p>
<div class="language-text line-numbers-mode" data-ext="text" data-title="text"><pre v-pre class="language-text"><code>cache-key="tasks"
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><h4 id="hidesearch" tabindex="-1"><a class="header-anchor" href="#hidesearch"><span>hideSearch</span></a></h4>
<ul>
<li>
<p>Type: <code v-pre>boolean</code></p>
</li>
<li>
<p>Required: <code v-pre>false</code>,</p>
</li>
<li>
<p>Default: <code v-pre>false</code></p>
</li>
<li>
<p>Details</p>
<p>This is used to hide the search input in the table.
When set to true, the search input will not be displayed in the table.
When set to false, the search input will be displayed in the table.
The search input is used to search the table data.
It filters the table data based on the search input value.</p>
</li>
</ul>
<p>Example :</p>
<div class="language-text line-numbers-mode" data-ext="text" data-title="text"><pre v-pre class="language-text"><code>  hideSearch="true"
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><h4 id="searchplaceholder" tabindex="-1"><a class="header-anchor" href="#searchplaceholder"><span>searchPlaceholder</span></a></h4>
<ul>
<li>
<p>Type: <code v-pre>string</code></p>
</li>
<li>
<p>Required: <code v-pre>false</code>,</p>
</li>
<li>
<p>Default: <code v-pre>search</code></p>
</li>
<li>
<p>Details</p>
<p>This is the placeholder of the search input in the table.
It's the text that will be displayed in the search input.
It's used to guide the user on what to search for in the table.
It's the text that will be displayed in the search input.
It's used to guide the user on what to search for in the table.</p>
</li>
</ul>
<p>Example :</p>
<div class="language-text line-numbers-mode" data-ext="text" data-title="text"><pre v-pre class="language-text"><code>searchPlaceholder="Search Tasks"
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><h4 id="hasdownload" tabindex="-1"><a class="header-anchor" href="#hasdownload"><span>hasDownload</span></a></h4>
<ul>
<li>
<p>Type: <code v-pre>boolean</code></p>
</li>
<li>
<p>Required: <code v-pre>false</code>,</p>
</li>
<li>
<p>Default: <code v-pre>false</code></p>
</li>
<li>
<p>Details</p>
<p>This is used to add a download button to the table.
When set to true, a download button will be added to the table.
When set to false, a download button will not be added to the table.
The download button is used to download the table data.
It downloads the table data in a csv format.</p>
</li>
</ul>
<p>Example :</p>
<div class="language-text line-numbers-mode" data-ext="text" data-title="text"><pre v-pre class="language-text"><code>  has-download="true"
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><h4 id="hasrange" tabindex="-1"><a class="header-anchor" href="#hasrange"><span>hasRange</span></a></h4>
<ul>
<li>
<p>Type: <code v-pre>boolean</code></p>
</li>
<li>
<p>Required: <code v-pre>false</code>,</p>
</li>
<li>
<p>Default: <code v-pre>false</code></p>
</li>
<li>
<p>Details</p>
<p>This is used to add a date range filter to the table.
When set to true, a date range filter will be added to the table.
When set to false, a date range filter will not be added to the table.
The date range filter is used to filter the table data based on the date range.
It filters the table data based on the date range.</p>
</li>
</ul>
<p>Example :</p>
<div class="language-text line-numbers-mode" data-ext="text" data-title="text"><pre v-pre class="language-text"><code>  has-range="true"
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><h4 id="actions" tabindex="-1"><a class="header-anchor" href="#actions"><span>actions</span></a></h4>
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
</ul>
<h5 id="emitter" tabindex="-1"><a class="header-anchor" href="#emitter"><span>Emitter</span></a></h5>
<p>When the emits value is a function, it calls the function
and you have to listen to that event.
The easy way is to use a function callback</p>
<p>In the below example editDocument is the event that will be emitted when the button is clicked
This editDocument function needs to be defined in the parent component</p>
<div class="language-text line-numbers-mode" data-ext="text" data-title="text"><pre v-pre class="language-text"><code>:actions="{
label: 'Action',
        actions: [
  {
    label: 'EDIT',
    class: 'btn btn-info btn-sm',
    type: 'emitter',
    emits: 'editDocument'
  }
]
}"
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h5 id="offcanvas" tabindex="-1"><a class="header-anchor" href="#offcanvas"><span>Offcanvas</span></a></h5>
<p>When you want to open a canvas, you can use the offcanvas type
In the below example, the canvasPosition is the position of the canvas, canvasTitle is the title of the canvas, canvasId is the id of the canvas, canvasSize is the size of the canvas, canvasComponent is the imported canvas component
make sure to import the canvas component</p>
<div class="language-text line-numbers-mode" data-ext="text" data-title="text"><pre v-pre class="language-text"><code>:actions="{
      label: 'Action',
      actions: [
        {
          label: 'Permissions',
          canvasPosition: 'start',
          canvasTitle: 'View Department',
          canvasId: 'departmentsCanvas',
          canvasSize: 'lg',
          canvasComponent: ViewDepartment,
          class: 'btn btn-info btn-sm',
          icon: 'bi-plus',
        }
      ]
    }"
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h5 id="path" tabindex="-1"><a class="header-anchor" href="#path"><span>path</span></a></h5>
<p>When you want to open a route, you can use the path type
In the below example, the path is the route to be opened,
the class is the button class, the label is the button label,
the icon is the button icon</p>
<div class="language-text line-numbers-mode" data-ext="text" data-title="text"><pre v-pre class="language-text"><code>:actions="{
      label: 'Action',
        actions: [
            {
              label: 'Permissions',
               path: '/tasks/view/{id}',
                class: 'btn btn-info bi-lock btn-sm',
                icon: 'bi-lock'
            }
        ]
       
}
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div></div></template>


