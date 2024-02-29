<template><div><h1 id="introduction" tabindex="-1"><a class="header-anchor" href="#introduction"><span>Introduction</span></a></h1>
<p>Introducing Shfrontend: Your Instant Vue.js Development Framework</p>
<p>Are you a developer staring at a blank screen, wondering how on earth you'll summon the courage to start yet another Vue.js project from scratch.
Are you Feeling like you've hit the &quot;refresh&quot; button on your creative energy just a
few too many times? Well, dust off that old wizard hat and grab your enchanted mouse, because Shfrontend is here to grant your development wishes faster than you can say &quot;abracadabra&quot;!</p>
<p>Welcome to Shfrontend, your ultimate solution for accelerating Vue.js development projects with ease! Shfrontend is a powerful framework designed to streamline the creation of stunning web applications by leveraging Bootstrap components and a collection of essential features.
It uses Bootstrap 5 for styling and is designed to be used with Vue 3 applications.</p>
<h2 id="getting-started" tabindex="-1"><a class="header-anchor" href="#getting-started"><span>Getting Started</span></a></h2>
<p>To get started, make sure you have a Vue 3 application set up using Vite. If you don't have one, you can set up a new Vue 3 application using Vite by running the following command.</p>
<div class="language-bash line-numbers-mode" data-ext="sh" data-title="sh"><pre v-pre class="language-bash"><code><span class="token function">npm</span> init vite@latest
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><h2 id="installation" tabindex="-1"><a class="header-anchor" href="#installation"><span>Installation</span></a></h2>
<p>Install this package in your existing or freshly installed vue 3 framework using vite</p>
<div class="language-bash line-numbers-mode" data-ext="sh" data-title="sh"><pre v-pre class="language-bash"><code><span class="token function">npm</span> <span class="token function">install</span> @iankibetsh/shframework
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><p>or</p>
<div class="language-text line-numbers-mode" data-ext="text" data-title="text"><pre v-pre class="language-text"><code>yarn add @iankibetsh/shframework
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><h2 id="usage" tabindex="-1"><a class="header-anchor" href="#usage"><span>usage</span></a></h2>
<p>Import and use the package in your main.js or the entry file for your Vue 3 application.</p>
<div class="language-javascript line-numbers-mode" data-ext="js" data-title="js"><pre v-pre class="language-javascript"><code><span class="token keyword">import</span> <span class="token punctuation">{</span>ShFrontend<span class="token punctuation">}</span> <span class="token keyword">from</span> <span class="token string">'@iankibetsh/shframework'</span>
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
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>Here is the explanation.</p>
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


