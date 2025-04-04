<template><div><h1 id="shuser" tabindex="-1"><a class="header-anchor" href="#shuser"><span>shUser</span></a></h1>
<p>This is a state management class to manage our logged in user</p>
<p>It uses <em><a href="https://pinia.vuejs.org/" target="_blank" rel="noopener noreferrer">pinia</a></em> for state management</p>
<h2 id="importing" tabindex="-1"><a class="header-anchor" href="#importing"><span>Importing</span></a></h2>
<div class="language-javascript line-numbers-mode" data-highlighter="prismjs" data-ext="js" data-title="js"><pre v-pre><code><span class="line"><span class="token keyword">import</span> <span class="token punctuation">{</span> useUserStore <span class="token punctuation">}</span> <span class="token keyword">from</span> <span class="token string">'@iankibetsh/shframework'</span></span>
<span class="line"></span>
<span class="line"><span class="token keyword">const</span> userStore <span class="token operator">=</span> <span class="token function">useUserStore</span><span class="token punctuation">(</span><span class="token punctuation">)</span></span>
<span class="line"></span>
<span class="line"></span></code></pre>
<div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>You first import the store class then instantiate it to <code v-pre>userStore</code> constant</p>
<h2 id="using-it-in-component" tabindex="-1"><a class="header-anchor" href="#using-it-in-component"><span>Using it in component</span></a></h2>
<div class="language-javascript line-numbers-mode" data-highlighter="prismjs" data-ext="js" data-title="js"><pre v-pre><code><span class="line"><span class="token keyword">const</span> <span class="token punctuation">{</span> user <span class="token punctuation">}</span> <span class="token operator">=</span> <span class="token function">storeToRefs</span><span class="token punctuation">(</span>userStore<span class="token punctuation">)</span></span>
<span class="line"></span></code></pre>
<div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0"><div class="line-number"></div></div></div><p>Then you can use it in component template this way</p>
<div class="language-html line-numbers-mode" data-highlighter="prismjs" data-ext="html" data-title="html"><pre v-pre><code><span class="line"><span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>h5</span><span class="token punctuation">></span></span>Welcome {{ user.name }}<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>h5</span><span class="token punctuation">></span></span></span>
<span class="line"></span></code></pre>
<div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0"><div class="line-number"></div></div></div><h2 id="methods" tabindex="-1"><a class="header-anchor" href="#methods"><span>Methods</span></a></h2>
<h3 id="setaccesstoken" tabindex="-1"><a class="header-anchor" href="#setaccesstoken"><span><code v-pre>setAccessToken</code></span></a></h3>
<p>This is used to set access token for the logged in user.</p>
<div class="language-javascript line-numbers-mode" data-highlighter="prismjs" data-ext="js" data-title="js"><pre v-pre><code><span class="line">userStore<span class="token punctuation">.</span><span class="token function">setAccessToken</span><span class="token punctuation">(</span>res<span class="token punctuation">.</span>token<span class="token punctuation">)</span></span>
<span class="line"></span></code></pre>
<div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0"><div class="line-number"></div></div></div><h3 id="setuser-fetchuser" tabindex="-1"><a class="header-anchor" href="#setuser-fetchuser"><span><code v-pre>setUser</code> | <code v-pre>fetchUser</code></span></a></h3>
<p>This gets logged in user from the backend and updates user state</p>
<div class="language-javascript line-numbers-mode" data-highlighter="prismjs" data-ext="js" data-title="js"><pre v-pre><code><span class="line">userStore<span class="token punctuation">.</span><span class="token function">setUser</span><span class="token punctuation">(</span><span class="token punctuation">)</span></span>
<span class="line"></span></code></pre>
<div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0"><div class="line-number"></div></div></div><h3 id="logout-signout" tabindex="-1"><a class="header-anchor" href="#logout-signout"><span><code v-pre>logOut</code> | <code v-pre>signOut</code></span></a></h3>
<p>This removes current session and logs out user. It basically empties accesstoken from locat storage and makes user
state null</p>
<div class="language-javascript line-numbers-mode" data-highlighter="prismjs" data-ext="js" data-title="js"><pre v-pre><code><span class="line">userStore<span class="token punctuation">.</span><span class="token function">logOut</span><span class="token punctuation">(</span><span class="token punctuation">)</span></span>
<span class="line"></span></code></pre>
<div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0"><div class="line-number"></div></div></div></div></template>


