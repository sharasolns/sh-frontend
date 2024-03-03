<template><div><h1 id="installation" tabindex="-1"><a class="header-anchor" href="#installation"><span>Installation</span></a></h1>
<p>Install this package in your existing or freshly installed vue 3 framework
using vite</p>
<div class="language-bash line-numbers-mode" data-ext="sh" data-title="sh"><pre v-pre class="language-bash"><code><span class="token function">npm</span> <span class="token function">install</span> @iankibetsh/shframework
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><p>In main.js or the entry file for vue js, import and use <code v-pre>ShFrontend</code></p>
<h3 id="boostrap-5" tabindex="-1"><a class="header-anchor" href="#boostrap-5"><span>Boostrap 5</span></a></h3>
<p>Since this package uses bootstrap 5, install it in your project using the following command</p>
<div class="language-bash line-numbers-mode" data-ext="sh" data-title="sh"><pre v-pre class="language-bash"><code><span class="token function">npm</span> <span class="token function">install</span> bootstrap@5.2.3
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><p>Then import it in your main.js or the entry file for your vue js application</p>
<div class="language-javascript line-numbers-mode" data-ext="js" data-title="js"><pre v-pre class="language-javascript"><code>
<span class="token keyword">import</span> <span class="token string">'bootstrap/dist/css/bootstrap.min.css'</span>
<span class="token keyword">import</span> <span class="token string">'bootstrap'</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><div class="language-javascript line-numbers-mode" data-ext="js" data-title="js"><pre v-pre class="language-javascript"><code><span class="token keyword">import</span> <span class="token punctuation">{</span>ShFrontend<span class="token punctuation">}</span> <span class="token keyword">from</span> <span class="token string">'@iankibetsh/shframework'</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><p>Then use it this way.</p>
<div class="language-javascript line-numbers-mode" data-ext="js" data-title="js"><pre v-pre class="language-javascript"><code>app<span class="token punctuation">.</span><span class="token function">use</span><span class="token punctuation">(</span>ShFrontend<span class="token punctuation">,</span><span class="token punctuation">{</span>
    <span class="token literal-property property">sessionTimeout</span><span class="token operator">:</span> <span class="token number">400</span><span class="token punctuation">,</span>
    <span class="token literal-property property">loginUrl</span><span class="token operator">:</span> <span class="token string">'/sh-auth'</span><span class="token punctuation">,</span>
    <span class="token literal-property property">registerEndpoint</span><span class="token operator">:</span> <span class="token string">'auth/register'</span><span class="token punctuation">,</span>
    <span class="token literal-property property">forgotEndpoint</span><span class="token operator">:</span> <span class="token string">'auth/forgot'</span><span class="token punctuation">,</span>
    <span class="token literal-property property">logoutApiEndpoint</span><span class="token operator">:</span> <span class="token string">'auth/logout'</span><span class="token punctuation">,</span>
    <span class="token literal-property property">registerTitle</span><span class="token operator">:</span> <span class="token string">'Welcome, create a new account'</span><span class="token punctuation">,</span>
    <span class="token literal-property property">registerSubTitle</span><span class="token operator">:</span> <span class="token string">'Create a new account to access the system'</span><span class="token punctuation">,</span>
    <span class="token literal-property property">redirectRegister</span><span class="token operator">:</span> <span class="token string">'/login'</span><span class="token punctuation">,</span>
    <span class="token literal-property property">loginTitle</span><span class="token operator">:</span> <span class="token string">'Login to your account'</span><span class="token punctuation">,</span>
    <span class="token literal-property property">redirectLogin</span><span class="token operator">:</span> <span class="token string">'/dashboard'</span><span class="token punctuation">,</span>
    <span class="token literal-property property">tablePaginationStyle</span><span class="token operator">:</span> <span class="token string">'loadMore'</span><span class="token punctuation">,</span>
    <span class="token literal-property property">tablePerPage</span><span class="token operator">:</span> <span class="token number">20</span><span class="token punctuation">,</span>
    <span class="token literal-property property">toastTimer</span><span class="token operator">:</span> <span class="token number">5000</span>
<span class="token punctuation">}</span><span class="token punctuation">)</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>I will try to explain everything here.</p>
<ol>
<li>sessionTimeout: This is the time in minutes that the user will be logged out if inactive.</li>
<li>LoginUrl: This is the url that the user will be redirected to when they are not logged in.</li>
<li>registerEndpoint: This is the api endpoint that will be called when the user registers.</li>
<li>forgotEndpoint: This is the api endpoint that will be called when the user forgets their password.</li>
<li>logoutApiEndpoint: This is the api endpoint that will be called when the user logs out.</li>
<li>registerTitle: This is the title that will be displayed on the register page.</li>
<li>registerSubTitle: This is the subtitle that will be displayed on the register page.</li>
<li>redirectRegister: This is the url that the user will be redirected to after registering.</li>
<li>loginTitle: This is the title that will be displayed on the login page</li>
<li>tablePaginationStyle: This is the style of pagination that will be used in the table. It can be either 'loadMore' or 'pagination'</li>
<li>tablePerPage: This is the number of items that will be displayed per page in the table.</li>
<li>toastTimer: This is the time in milliseconds that the toast will be displayed.</li>
</ol>
</div></template>


