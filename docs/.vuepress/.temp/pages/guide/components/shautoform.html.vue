<template><div><h1 id="sh-auto-form" tabindex="-1"><a class="header-anchor" href="#sh-auto-form"><span>Sh Auto Form</span></a></h1>
<p>sh-auto-form is a component that generates a form. It's a wrapper around the bootstrap form.
Using this component makes your work easier and faster.
To generate a form, you need to pass the fields, and the end-point of the form data. This will populate the form with the data from the end-point.
This is almost similar to sh-form but it's more automatic.
You can specify the type of fields and what you want to display in the form.</p>
<h2 id="importing" tabindex="-1"><a class="header-anchor" href="#importing"><span>importing</span></a></h2>
<div class="language-javascript line-numbers-mode" data-ext="js" data-title="js"><pre v-pre class="language-javascript"><code><span class="token keyword">import</span> <span class="token punctuation">{</span>ShAutoForm<span class="token punctuation">}</span> <span class="token keyword">from</span> <span class="token string">'@iankibetsh/shframework'</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><h2 id="example-usage" tabindex="-1"><a class="header-anchor" href="#example-usage"><span>Example Usage</span></a></h2>
<div class="language-html line-numbers-mode" data-ext="html" data-title="html"><pre v-pre class="language-html"><code><span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>sh-auto-form</span>
      <span class="token attr-name">:fields</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">"</span>['id','name','description']<span class="token punctuation">"</span></span>
  <span class="token attr-name">end-point</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">"</span>tasks/list<span class="token punctuation">"</span></span>
  <span class="token punctuation">/></span></span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h2 id="attributes" tabindex="-1"><a class="header-anchor" href="#attributes"><span>Attributes</span></a></h2>
<h3 id="fields" tabindex="-1"><a class="header-anchor" href="#fields"><span><code v-pre>fields</code></span></a></h3>
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
<p>These are form fields for the form that will be generated</p>
</li>
</ul>
<p>Example :</p>
<div class="language-text line-numbers-mode" data-ext="text" data-title="text"><pre v-pre class="language-text"><code> fields="['id','name','description']"
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
<p>It's the endpoint of form data, usually it's the backend api url</p>
</li>
</ul>
<p>Example :</p>
<div class="language-text line-numbers-mode" data-ext="text" data-title="text"><pre v-pre class="language-text"><code>end-point="tasks/list"
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><p>Custom Fields</p>
<p>Inside the fields array,
you can specify the type of fields you want to display in the form.
let say you want to display a select field, you can specify it like this</p>
<div class="language-text line-numbers-mode" data-ext="text" data-title="text"><pre v-pre class="language-text"><code> {
        field:'task_id',
        type: 'suggest',
        suggests: true,
        url: 'tasks/list/any?all=1'
 }, 
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>In this case, the field will be a select field and it will be populated with the data from the url specified.
You can also specify the type of fields you want to display in the form. this Type can be</p>
<ul>
<li>text</li>
<li>email</li>
<li>password</li>
<li>number</li>
<li>date</li>
<li>textarea</li>
<li>suggest</li>
</ul>
<p>You can also add classes to the fields, for example, you can add the class form-control to the fields like this</p>
<div class="language-text line-numbers-mode" data-ext="text" data-title="text"><pre v-pre class="language-text"><code> {
        field:'task_id',
        type: 'suggest',
        suggests: true,
        url: 'tasks/list/any?all=1',
        class: 'form-control'
 }, 
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div></div></template>


