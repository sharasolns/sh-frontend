<template><div><h1 id="sh-form" tabindex="-1"><a class="header-anchor" href="#sh-form"><span>Sh Form</span></a></h1>
<p>This is a form component that will help you generate forms easily.
It will help you generate forms with fields, select, textarea, radio, checkbox etc.
It will also help you fill select elements with data from the backend</p>
<p>Make sure you have .env file with the following variables</p>
<div class="language-text line-numbers-mode" data-highlighter="prismjs" data-ext="text" data-title="text"><pre v-pre><code><span class="line">VITE_APP_API_URL=http://localhost:8000/api/</span>
<span class="line"></span></code></pre>
<div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0"><div class="line-number"></div></div></div><p>make sure to change(http://localhost:8000/api/)  to your api backend url
This will be the base url of the api backend where the form will send request</p>
<h3 id="importing" tabindex="-1"><a class="header-anchor" href="#importing"><span>Importing</span></a></h3>
<h4 id="import-the-component" tabindex="-1"><a class="header-anchor" href="#import-the-component"><span>Import the component</span></a></h4>
<div class="language-javascript line-numbers-mode" data-highlighter="prismjs" data-ext="js" data-title="js"><pre v-pre><code><span class="line"><span class="token keyword">import</span> <span class="token punctuation">{</span> ShForm <span class="token punctuation">}</span> <span class="token keyword">from</span> <span class="token string">'@iankibetsh/shframework'</span></span>
<span class="line"></span></code></pre>
<div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0"><div class="line-number"></div></div></div><h2 id="example-usage" tabindex="-1"><a class="header-anchor" href="#example-usage"><span>Example Usage</span></a></h2>
<div class="language-html line-numbers-mode" data-highlighter="prismjs" data-ext="html" data-title="html"><pre v-pre><code><span class="line">    <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>sh-form</span></span>
<span class="line">            <span class="token attr-name">:fields</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">"</span>['name','email','password']<span class="token punctuation">"</span></span></span>
<span class="line">            <span class="token attr-name">action</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">"</span>users/add<span class="token punctuation">"</span></span></span>
<span class="line">            <span class="token attr-name">:successCallback</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">"</span>userRegistered<span class="token punctuation">"</span></span></span>
<span class="line">            <span class="token attr-name">:method</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">"</span>put<span class="token punctuation">"</span></span></span>
<span class="line">    <span class="token punctuation">/></span></span></span>
<span class="line"></span></code></pre>
<div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h2 id="attributes" tabindex="-1"><a class="header-anchor" href="#attributes"><span>Attributes</span></a></h2>
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
<pre><code>Example: :fields=&quot;['name','email','password']&quot;
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
<p>This is the method of the request. By default, the method is post</p>
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
<div class="language-javascript line-numbers-mode" data-highlighter="prismjs" data-ext="js" data-title="js"><pre v-pre><code><span class="line"><span class="token operator">&lt;</span>script setup<span class="token operator">></span></span>
<span class="line">    <span class="token keyword">const</span> <span class="token function-variable function">userRegistered</span> <span class="token operator">=</span> <span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token operator">=></span> <span class="token punctuation">{</span></span>
<span class="line">        console<span class="token punctuation">.</span><span class="token function">log</span><span class="token punctuation">(</span><span class="token string">'User registered'</span><span class="token punctuation">)</span></span>
<span class="line">    <span class="token punctuation">}</span></span>
<span class="line"><span class="token operator">&lt;</span><span class="token operator">/</span>script<span class="token operator">></span></span>
<span class="line"></span></code></pre>
<div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="labels" tabindex="-1"><a class="header-anchor" href="#labels"><span>labels</span></a></h3>
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
<div class="language-text line-numbers-mode" data-highlighter="prismjs" data-ext="text" data-title="text"><pre v-pre><code><span class="line">Example:</span>
<span class="line">     :labels="{</span>
<span class="line">        password: 'Enter your password'</span>
<span class="line">       }"</span>
<span class="line"></span></code></pre>
<div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="fill-selects" tabindex="-1"><a class="header-anchor" href="#fill-selects"><span>fill-selects</span></a></h3>
<ul>
<li>Type: <code v-pre>object</code></li>
<li>Default: <code v-pre>none</code></li>
<li>Details:</li>
</ul>
<p>Example: 1
Fill select element with select options, id will be used as option value and name will be option label displayed</p>
<div class="language-text line-numbers-mode" data-highlighter="prismjs" data-ext="text" data-title="text"><pre v-pre><code><span class="line">Example:</span>
<span class="line">    :fill-selects="{</span>
<span class="line">        gender: {</span>
<span class="line">          data: [</span>
<span class="line">              {</span>
<span class="line">                id: 'Male',</span>
<span class="line">                name: 'Male'</span>
<span class="line">              },</span>
<span class="line">              {</span>
<span class="line">                id: 'Female',</span>
<span class="line">                name: 'Female'</span>
<span class="line">              }</span>
<span class="line">          ]</span>
<span class="line">        }</span>
<span class="line">      }"</span>
<span class="line"></span></code></pre>
<div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><pre><code>Example: 2
</code></pre>
<p>Fill select element with data from the backend. The data will be fetched from the backend and used as the options of the select element.</p>
<div class="language-text line-numbers-mode" data-highlighter="prismjs" data-ext="text" data-title="text"><pre v-pre><code><span class="line">:fill-selects="{</span>
<span class="line">    user_id: {</span>
<span class="line">              url: 'admin/users/list?all=1',</span>
<span class="line">              column: 'name',</span>
<span class="line">              value: 'id'</span>
<span class="line">             }</span>
<span class="line">}"</span>
<span class="line"></span></code></pre>
<div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="explanation-of-the-attributes" tabindex="-1"><a class="header-anchor" href="#explanation-of-the-attributes"><span>Explanation of the attributes</span></a></h3>
<ul>
<li><code v-pre>user_id</code>: This is the name of the select element</li>
<li><code v-pre>url</code>: This is the url of the backend where the data will be fetched from</li>
<li><code v-pre>column</code>: This is the column of the data that will be used as the option label displayed on the select element. If not defined, the name of the data will be used as the option label displayed on the select element</li>
<li><code v-pre>value</code>: This is the column of the data that will be used as the option value of the select element. If not defined, the id of the data will be used as the option value of the select element</li>
<li>Fill selects can also have suggestion (searchable), this will help search</li>
</ul>
<p>Fill selects can also have suggestion with multi select, this will help search</p>
<div class="language-text line-numbers-mode" data-highlighter="prismjs" data-ext="text" data-title="text"><pre v-pre><code><span class="line">:fill-selects="{</span>
<span class="line">    user_id: {</span>
<span class="line">      suggests: true,</span>
<span class="line">      allowMultiple: true</span>
<span class="line">      url: 'admin/users/list?all=1'</span>
<span class="line">  }"</span>
<span class="line"></span></code></pre>
<div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="customcomponent" tabindex="-1"><a class="header-anchor" href="#customcomponent"><span>customComponent</span></a></h3>
<p>This will help you add custom component as a form element instead
of using prebuilt</p>
<p>e.g</p>
<p>Import First</p>
<div class="language-javascript line-numbers-mode" data-highlighter="prismjs" data-ext="js" data-title="js"><pre v-pre><code><span class="line"><span class="token keyword">import</span> CkEditor <span class="token keyword">from</span> <span class="token string">'@/lib/components/form-components/CkEditor.vue'</span></span>
<span class="line"></span></code></pre>
<div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0"><div class="line-number"></div></div></div><p>Use it this way in your sh-form, key is the name of</p>
<div class="language-html line-numbers-mode" data-highlighter="prismjs" data-ext="html" data-title="html"><pre v-pre><code><span class="line">Example:</span>
<span class="line">    :customComponent="{</span>
<span class="line">        description: CkEditor</span>
<span class="line">    }"</span>
<span class="line"></span></code></pre>
<div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="current-data" tabindex="-1"><a class="header-anchor" href="#current-data"><span>current-data</span></a></h3>
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
<div class="language-text line-numbers-mode" data-highlighter="prismjs" data-ext="text" data-title="text"><pre v-pre><code><span class="line">:current-data="{</span>
<span class="line">    email:'johnss@gmail.com'</span>
<span class="line"> }"</span>
<span class="line"></span></code></pre>
<div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="placeholders" tabindex="-1"><a class="header-anchor" href="#placeholders"><span>placeholders</span></a></h3>
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
<p>This will help you add placeholders to the form fields. Key of the object is the name of the input field and value is the placeholder of the input field displayed on the form</p>
</li>
</ul>
<div class="language-text line-numbers-mode" data-highlighter="prismjs" data-ext="text" data-title="text"><pre v-pre><code><span class="line">Example:</span>
<span class="line">     :placeholders="{</span>
<span class="line">        password: 'Enter your password'</span>
<span class="line">       }"</span>
<span class="line"></span></code></pre>
<div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="phones" tabindex="-1"><a class="header-anchor" href="#phones"><span>phones</span></a></h3>
<ul>
<li>
<p>Type: <code v-pre>array</code></p>
</li>
<li>
<p>Default: <code v-pre>null</code></p>
</li>
<li>
<p>Required: <code v-pre>false</code></p>
</li>
<li>
<p>Details:</p>
<p>This will help you add phone number input fields to the form. The array will contain the name of the input fields that will be phone number input fields</p>
</li>
</ul>
<div class="language-text line-numbers-mode" data-highlighter="prismjs" data-ext="text" data-title="text"><pre v-pre><code><span class="line">Example:</span>
<span class="line">     :phones="['phone']"</span>
<span class="line"></span></code></pre>
<div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0"><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="emails" tabindex="-1"><a class="header-anchor" href="#emails"><span>emails</span></a></h3>
<ul>
<li>
<p>Type: <code v-pre>array</code></p>
</li>
<li>
<p>Default: <code v-pre>null</code></p>
</li>
<li>
<p>Required: <code v-pre>false</code></p>
</li>
<li>
<p>Details:</p>
<p>This will help you add email input fields to the form. The array will contain the name of the input fields that will be email input fields</p>
</li>
</ul>
<div class="language-text line-numbers-mode" data-highlighter="prismjs" data-ext="text" data-title="text"><pre v-pre><code><span class="line">Example:</span>
<span class="line">     :emails="['email']"</span>
<span class="line"></span></code></pre>
<div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0"><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="dates" tabindex="-1"><a class="header-anchor" href="#dates"><span>dates</span></a></h3>
<ul>
<li>
<p>Type: <code v-pre>array</code></p>
</li>
<li>
<p>Default: <code v-pre>null</code></p>
</li>
<li>
<p>Required: <code v-pre>false</code></p>
</li>
<li>
<p>Details:</p>
<p>This will help you add date input fields to the form. The array will contain the name of the input fields that will be date input fields</p>
</li>
</ul>
<div class="language-text line-numbers-mode" data-highlighter="prismjs" data-ext="text" data-title="text"><pre v-pre><code><span class="line">Example:</span>
<span class="line">     :dates="['dob']"</span>
<span class="line"></span></code></pre>
<div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0"><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="textareas" tabindex="-1"><a class="header-anchor" href="#textareas"><span>textareas</span></a></h3>
<ul>
<li>
<p>Type: <code v-pre>array</code></p>
</li>
<li>
<p>Default: <code v-pre>null</code></p>
</li>
<li>
<p>Required: <code v-pre>false</code></p>
</li>
<li>
<p>Details:</p>
<p>This will help you add textarea input fields to the form. The array will contain the name of the input fields that will be textarea input fields</p>
</li>
</ul>
<div class="language-text line-numbers-mode" data-highlighter="prismjs" data-ext="text" data-title="text"><pre v-pre><code><span class="line">Example:</span>
<span class="line">     :textareas="['description']"</span>
<span class="line"></span></code></pre>
<div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0"><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="radios" tabindex="-1"><a class="header-anchor" href="#radios"><span>radios</span></a></h3>
<ul>
<li>
<p>Type: <code v-pre>array</code></p>
</li>
<li>
<p>Default: <code v-pre>null</code></p>
</li>
<li>
<p>Required: <code v-pre>false</code></p>
</li>
<li>
<p>Details:</p>
<p>This will help you add radio input fields to the form. The array will contain the name of the input fields that will be radio input fields</p>
</li>
</ul>
<div class="language-text line-numbers-mode" data-highlighter="prismjs" data-ext="text" data-title="text"><pre v-pre><code><span class="line">Example:</span>
<span class="line">        :radioBoxes="{</span>
<span class="line">              display: 'row',</span>
<span class="line">              accept: [</span>
<span class="line">                  {</span>
<span class="line">                    label: 'Accept',</span>
<span class="line">                    value: 1</span>
<span class="line">                  },</span>
<span class="line">                  {</span>
<span class="line">                    label: 'Reject',</span>
<span class="line">                    value: 0</span>
<span class="line">                  }</span>
<span class="line">              ]</span>
<span class="line">      }"</span>
<span class="line"></span></code></pre>
<div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>Explanation of the attributes</p>
<ul>
<li><code v-pre>display</code>: This will be the display of the radio input fields. It can be <code v-pre>row</code> default is <code v-pre>column</code></li>
<li><code v-pre>accept</code>: The form fields that will be radio input fields</li>
<li><code v-pre>label</code>: This will be the label of the radio input field</li>
<li><code v-pre>value</code>: This will be the value of the radio input field</li>
</ul>
<h3 id="checkboxes" tabindex="-1"><a class="header-anchor" href="#checkboxes"><span>checkboxes</span></a></h3>
<ul>
<li>
<p>Type: <code v-pre>array</code></p>
</li>
<li>
<p>Default: <code v-pre>null</code></p>
</li>
<li>
<p>Required: <code v-pre>false</code></p>
</li>
<li>
<p>Details:</p>
<p>This will help you add checkbox input fields to the form. The array will contain the name of the input fields that will be checkbox input fields</p>
</li>
</ul>
<div class="language-text line-numbers-mode" data-highlighter="prismjs" data-ext="text" data-title="text"><pre v-pre><code><span class="line">Example:</span>
<span class="line">        :checkboxes="{</span>
<span class="line">              display: 'row',</span>
<span class="line">              accept: [</span>
<span class="line">                  {</span>
<span class="line">                    label: 'Accept',</span>
<span class="line">                    value: 1,</span>
<span class="line">                     disabled: true,</span>
<span class="line">                      checked: true</span>
<span class="line">                  },</span>
<span class="line">                  {</span>
<span class="line">                    label: 'Reject',</span>
<span class="line">                    value: 0</span>
<span class="line">                  }</span>
<span class="line">              ]</span>
<span class="line">      }"</span>
<span class="line"></span></code></pre>
<div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>Explanation of the attributes</p>
<ul>
<li><code v-pre>display</code>: This will be the display of the checkbox input fields. It can be <code v-pre>row</code> default is <code v-pre>column</code></li>
<li><code v-pre>accept</code>: The form fields that will be checkbox input fields</li>
<li><code v-pre>label</code>: This will be the label of the checkbox input field</li>
<li><code v-pre>value</code>: This will be the value of the checkbox input field</li>
<li><code v-pre>checked</code>: This will be the value of the checkbox input field that will be checked by default</li>
<li><code v-pre>disabled</code>: This will be the value of the checkbox input field that will be disabled</li>
<li><code v-pre>required</code>: This will be the value of the checkbox input field that will be required</li>
</ul>
<h3 id="password" tabindex="-1"><a class="header-anchor" href="#password"><span>password</span></a></h3>
<ul>
<li>
<p>Type: <code v-pre>array</code></p>
</li>
<li>
<p>Default: <code v-pre>null</code></p>
</li>
<li>
<p>Required: <code v-pre>false</code></p>
</li>
<li>
<p>Details:</p>
<p>This will help you add password input fields to the form. The array will contain the name of the input fields that will be password input fields</p>
</li>
</ul>
<div class="language-text line-numbers-mode" data-highlighter="prismjs" data-ext="text" data-title="text"><pre v-pre><code><span class="line">Example:</span>
<span class="line">     :passwords="['password']"</span>
<span class="line"></span></code></pre>
<div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0"><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="numbers" tabindex="-1"><a class="header-anchor" href="#numbers"><span>numbers</span></a></h3>
<ul>
<li>
<p>Type: <code v-pre>array</code></p>
</li>
<li>
<p>Default: <code v-pre>null</code></p>
</li>
<li>
<p>Required: <code v-pre>false</code></p>
</li>
<li>
<p>Details:</p>
<p>This will help you add number input fields to the form. The array will contain the name of the input fields that will be number input fields</p>
</li>
</ul>
<div class="language-text line-numbers-mode" data-highlighter="prismjs" data-ext="text" data-title="text"><pre v-pre><code><span class="line">Example:</span>
<span class="line">     :numbers="['age']"</span>
<span class="line"></span></code></pre>
<div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0"><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="files" tabindex="-1"><a class="header-anchor" href="#files"><span>files</span></a></h3>
<ul>
<li>
<p>Type: <code v-pre>array</code></p>
</li>
<li>
<p>Default: <code v-pre>null</code></p>
</li>
<li>
<p>Required: <code v-pre>false</code></p>
</li>
<li>
<p>Details:</p>
<p>This will help you add file input fields to the form. The array will contain the name of the input fields that will be file input fields</p>
</li>
</ul>
<div class="language-text line-numbers-mode" data-highlighter="prismjs" data-ext="text" data-title="text"><pre v-pre><code><span class="line">Example:</span>
<span class="line">     :files="['avatar']"</span>
<span class="line"></span></code></pre>
<div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0"><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="submitbtnclass" tabindex="-1"><a class="header-anchor" href="#submitbtnclass"><span>submitBtnClass</span></a></h3>
<ul>
<li>
<p>Type: <code v-pre>string</code></p>
</li>
<li>
<p>Default: <code v-pre>btn btn-primary</code></p>
</li>
<li>
<p>Required: <code v-pre>false</code></p>
</li>
<li>
<p>Details:</p>
<p>This will be the class of the submit button</p>
</li>
</ul>
<div class="language-text line-numbers-mode" data-highlighter="prismjs" data-ext="text" data-title="text"><pre v-pre><code><span class="line">Example:</span>
<span class="line">     :submitBtnClass="btn btn-danger"</span>
<span class="line"></span></code></pre>
<div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0"><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="actionlabel" tabindex="-1"><a class="header-anchor" href="#actionlabel"><span>actionLabel</span></a></h3>
<ul>
<li>
<p>Type: <code v-pre>string</code></p>
</li>
<li>
<p>Default: <code v-pre>Submit</code></p>
</li>
<li>
<p>Required: <code v-pre>false</code></p>
</li>
<li>
<p>Details:</p>
<p>This will be the label of the submit button</p>
</li>
</ul>
<div class="language-text line-numbers-mode" data-highlighter="prismjs" data-ext="text" data-title="text"><pre v-pre><code><span class="line">Example:</span>
<span class="line">     :actionLabel="Save"</span>
<span class="line"></span></code></pre>
<div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0"><div class="line-number"></div><div class="line-number"></div></div></div></div></template>


