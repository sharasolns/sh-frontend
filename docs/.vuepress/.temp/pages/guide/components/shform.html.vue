<template><div><h1 id="sh-form" tabindex="-1"><a class="header-anchor" href="#sh-form"><span>Sh Form</span></a></h1>
<p>This is a form component that will help you generate forms easily.
It will help you generate forms with fields, select, textarea, radio, checkbox etc.
It will also help you fill select elements with data from the backend</p>
<p>Make sure you have .env file with the following variables</p>
<div class="language-text line-numbers-mode" data-ext="text" data-title="text"><pre v-pre class="language-text"><code>VITE_APP_API_URL=http://localhost:8000/api/
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><p>This will be the base url of the api backend where the form will send request</p>
<h3 id="importing" tabindex="-1"><a class="header-anchor" href="#importing"><span>Importing</span></a></h3>
<h4 id="import-the-component" tabindex="-1"><a class="header-anchor" href="#import-the-component"><span>Import the component</span></a></h4>
<div class="language-javascript line-numbers-mode" data-ext="js" data-title="js"><pre v-pre class="language-javascript"><code><span class="token keyword">import</span> <span class="token punctuation">{</span> ShForm <span class="token punctuation">}</span> <span class="token keyword">from</span> <span class="token string">'@iankibetsh/shframework'</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><h2 id="example-usage" tabindex="-1"><a class="header-anchor" href="#example-usage"><span>Example Usage</span></a></h2>
<div class="language-html line-numbers-mode" data-ext="html" data-title="html"><pre v-pre class="language-html"><code>    <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>sh-form</span>
            <span class="token attr-name">:fields</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">"</span>['name','email','password']<span class="token punctuation">"</span></span>
            <span class="token attr-name">action</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">"</span>users/add<span class="token punctuation">"</span></span>
            <span class="token attr-name">:successCallback</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">"</span>userRegistered<span class="token punctuation">"</span></span>
            <span class="token attr-name">:method</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">"</span>put<span class="token punctuation">"</span></span>
    <span class="token punctuation">/></span></span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h2 id="attributes" tabindex="-1"><a class="header-anchor" href="#attributes"><span>Attributes</span></a></h2>
<h3 id="fields" tabindex="-1"><a class="header-anchor" href="#fields"><span>fields</span></a></h3>
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
<p>Details:</p>
<p>These are the form files, like inputs, select etc</p>
<pre><code>Example: ```['name','email','password']```
</code></pre>
</li>
</ul>
<h3 id="action" tabindex="-1"><a class="header-anchor" href="#action"><span>action</span></a></h3>
<ul>
<li>
<p>Type: <code v-pre>string</code></p>
</li>
<li>
<p>default: <code v-pre>none</code></p>
</li>
<li>
<p>Required: <code v-pre>true</code></p>
</li>
<li>
<p>Details:</p>
<p>This is the action url to the api backend where the request will be handled</p>
<p>The action will be appended to the base url of the api backend defined in the .env file</p>
<pre><code>Example: ``users/add``
</code></pre>
</li>
<li>
<p>If VITE_APP_API_URL is defined in the .env file, the request will be sent to http://localhost:8000/api/users/add</p>
</li>
</ul>
<h3 id="method" tabindex="-1"><a class="header-anchor" href="#method"><span>method</span></a></h3>
<ul>
<li>
<p>Type: <code v-pre>string</code></p>
</li>
<li>
<p>Default: <code v-pre>post</code></p>
</li>
<li>
<p>Required: <code v-pre>false</code></p>
</li>
<li>
<p>Options: <code v-pre>post</code>, <code v-pre>put</code>, <code v-pre>patch</code>, <code v-pre>delete</code></p>
</li>
<li>
<p>Details:</p>
<p>This is the method of the request</p>
<pre><code>Example: :method=&quot;put&quot;
</code></pre>
</li>
</ul>
<h3 id="success-callback" tabindex="-1"><a class="header-anchor" href="#success-callback"><span>success-callback</span></a></h3>
<ul>
<li>
<p>Type: <code v-pre>function/method</code></p>
</li>
<li>
<p>Default: <code v-pre>none</code></p>
</li>
<li>
<p>Required: <code v-pre>false</code></p>
</li>
<li>
<p>Details:
A method that will be invoked/called by the form when data is submitted successfully</p>
<pre><code>Example: :success-callback=&quot;userRegistered&quot;
</code></pre>
</li>
</ul>
<p>Note: The method should be defined in the parent component</p>
<div class="language-javascript line-numbers-mode" data-ext="js" data-title="js"><pre v-pre class="language-javascript"><code><span class="token operator">&lt;</span>script setup<span class="token operator">></span>
    <span class="token keyword">const</span> <span class="token function-variable function">userRegistered</span> <span class="token operator">=</span> <span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token operator">=></span> <span class="token punctuation">{</span>
        console<span class="token punctuation">.</span><span class="token function">log</span><span class="token punctuation">(</span><span class="token string">'User registered'</span><span class="token punctuation">)</span>
    <span class="token punctuation">}</span>
<span class="token operator">&lt;</span><span class="token operator">/</span>script<span class="token operator">></span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="labels" tabindex="-1"><a class="header-anchor" href="#labels"><span>labels</span></a></h3>
<ul>
<li>
<p>Type: <code v-pre>object</code></p>
</li>
<li>
<p>Default: <code v-pre>none</code></p>
</li>
<li>
<p>Required: <code v-pre>false</code></p>
</li>
<li>
<p>Details:</p>
<p>This will help you add labels to the form fields. Key of the object is the name of the input field and value is the label of the input field displayed on the form</p>
</li>
</ul>
<div class="language-text line-numbers-mode" data-ext="text" data-title="text"><pre v-pre class="language-text"><code>Example:
     :labels="{
        password: 'Enter your password'
       }"
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="fill-selects" tabindex="-1"><a class="header-anchor" href="#fill-selects"><span>fill-selects</span></a></h3>
<ul>
<li>Type: <code v-pre>object</code></li>
<li>Default: <code v-pre>none</code></li>
<li>Details:</li>
</ul>
<p>Example: 1
Fill select element with select options, id will be used as option value and name will be option label displayed</p>
<div class="language-text line-numbers-mode" data-ext="text" data-title="text"><pre v-pre class="language-text"><code>Example:
    :fill-selects="{
        gender: {
          data: [
              {
                id: 'Male',
                name: 'Male'
              },
              {
                id: 'Female',
                name: 'Female'
              }
          ]
        }
      }"
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><pre><code>Example: 2
</code></pre>
<p>Fill select element with data from the backend. The data will be fetched from the backend and used as the options of the select element.</p>
<div class="language-text line-numbers-mode" data-ext="text" data-title="text"><pre v-pre class="language-text"><code>:fill-selects="{
    user_id: {
              url: 'admin/users/list?all=1',
              column: 'name',
              value: 'id'
             }
}"
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="explanation-of-the-attributes" tabindex="-1"><a class="header-anchor" href="#explanation-of-the-attributes"><span>Explanation of the attributes</span></a></h3>
<ul>
<li><code v-pre>user_id</code>: This is the name of the select element</li>
<li><code v-pre>url</code>: This is the url of the backend where the data will be fetched from</li>
<li><code v-pre>column</code>: This is the column of the data that will be used as the option label displayed on the select element. If not defined, the name of the data will be used as the option label displayed on the select element</li>
<li><code v-pre>value</code>: This is the column of the data that will be used as the option value of the select element. If not defined, the id of the data will be used as the option value of the select element</li>
<li>Fill selects can also have suggestion (searchable), this will help search</li>
</ul>
<p>Fill selects can also have suggestion with multi select, this will help search</p>
<div class="language-text line-numbers-mode" data-ext="text" data-title="text"><pre v-pre class="language-text"><code>:fill-selects="{
    user_id: {
      suggests: true,
      allowMultiple: true
      url: 'admin/users/list?all=1'
  }"
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="customcomponent" tabindex="-1"><a class="header-anchor" href="#customcomponent"><span>customComponent</span></a></h3>
<p>This will help you add custom component as a form element instead
of using prebuilt</p>
<p>e.g</p>
<p>Import First</p>
<div class="language-javascript line-numbers-mode" data-ext="js" data-title="js"><pre v-pre class="language-javascript"><code><span class="token keyword">import</span> CkEditor <span class="token keyword">from</span> <span class="token string">'@/lib/components/form-components/CkEditor.vue'</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><p>Use it this way in your sh-form, key is the name of</p>
<div class="language-html line-numbers-mode" data-ext="html" data-title="html"><pre v-pre class="language-html"><code><span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>sh-form</span>
        <span class="token attr-name">:fields</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">"</span>['mail','name']<span class="token punctuation">"</span></span>
        <span class="token attr-name">:custom-component</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">"</span>{
    mail: CkEditor
      }<span class="token punctuation">"</span></span>
        <span class="token attr-name">:current-data</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">"</span>{
        email: 'jack@gmail.com'
      }<span class="token punctuation">"</span></span>
        <span class="token attr-name">action</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">"</span>auth/register<span class="token punctuation">"</span></span>
<span class="token punctuation">/></span></span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>Above form will generate a form with 3 fields</p>
<ul>
<li>name field</li>
<li>email field</li>
<li>password field</li>
</ul>
<p>Form component will automatically set password field to be input type password</p>
<h3 id="current-data" tabindex="-1"><a class="header-anchor" href="#current-data"><span>current-data</span></a></h3>
<ul>
<li>
<p>Type: <code v-pre>object</code></p>
</li>
<li>
<p>Default: <code v-pre>null</code></p>
</li>
<li>
<p>Required: <code v-pre>false</code></p>
</li>
<li>
<p>Details:</p>
<p>Existing form data, used mostly when editing an item. Form fields will be
autofilled with data from this object. Key of the array is the input field</p>
</li>
</ul>
<h5 id="example" tabindex="-1"><a class="header-anchor" href="#example"><span>Example:</span></a></h5>
<div class="language-text line-numbers-mode" data-ext="text" data-title="text"><pre v-pre class="language-text"><code>:current-data="{
    email:'johnss@gmail.com'
 }"
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div></div></template>


