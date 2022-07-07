<template><div><h1 id="shuser" tabindex="-1"><a class="header-anchor" href="#shuser" aria-hidden="true">#</a> shUser</h1>
<p>This is a state management class to manage our logged in user</p>
<p>It uses <em><a href="https://pinia.vuejs.org/" target="_blank" rel="noopener noreferrer">pinia<ExternalLinkIcon/></a></em> for state management</p>
<h2 id="importing" tabindex="-1"><a class="header-anchor" href="#importing" aria-hidden="true">#</a> Importing</h2>
<div class="language-javascript ext-js line-numbers-mode"><pre v-pre class="language-javascript"><code><span class="token keyword">import</span> <span class="token punctuation">{</span> useUserStore <span class="token punctuation">}</span> <span class="token keyword">from</span> <span class="token string">'@iankibetsh/shframework'</span>

<span class="token keyword">const</span> userStore <span class="token operator">=</span> <span class="token function">useUserStore</span><span class="token punctuation">(</span><span class="token punctuation">)</span>

</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>You first import the store class then instantiate it to <code v-pre>userStore</code> constant</p>
<h2 id="using-it-in-component" tabindex="-1"><a class="header-anchor" href="#using-it-in-component" aria-hidden="true">#</a> Using it in component</h2>
<div class="language-javascript ext-js line-numbers-mode"><pre v-pre class="language-javascript"><code><span class="token keyword">const</span> <span class="token punctuation">{</span> user <span class="token punctuation">}</span> <span class="token operator">=</span> <span class="token function">storeToRefs</span><span class="token punctuation">(</span>userStore<span class="token punctuation">)</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><p>Then you can use it in component template this way</p>
<div class="language-html ext-html line-numbers-mode"><pre v-pre class="language-html"><code><span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>h5</span><span class="token punctuation">></span></span>Welcome {{ user.name }}<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>h5</span><span class="token punctuation">></span></span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><h2 id="methods" tabindex="-1"><a class="header-anchor" href="#methods" aria-hidden="true">#</a> Methods</h2>
<h3 id="setaccesstoken" tabindex="-1"><a class="header-anchor" href="#setaccesstoken" aria-hidden="true">#</a> <code v-pre>setAccessToken</code></h3>
<p>This is used to set access token for the logged in user.</p>
<div class="language-javascript ext-js line-numbers-mode"><pre v-pre class="language-javascript"><code>userStore<span class="token punctuation">.</span><span class="token function">setAccessToken</span><span class="token punctuation">(</span>res<span class="token punctuation">.</span>token<span class="token punctuation">)</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><h3 id="setuser-fetchuser" tabindex="-1"><a class="header-anchor" href="#setuser-fetchuser" aria-hidden="true">#</a> <code v-pre>setUser</code> | <code v-pre>fetchUser</code></h3>
<p>This gets logged in user from the backend and updates user state</p>
<div class="language-javascript ext-js line-numbers-mode"><pre v-pre class="language-javascript"><code>userStore<span class="token punctuation">.</span><span class="token function">setUser</span><span class="token punctuation">(</span><span class="token punctuation">)</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><h3 id="logout-signout" tabindex="-1"><a class="header-anchor" href="#logout-signout" aria-hidden="true">#</a> <code v-pre>logOut</code> | <code v-pre>signOut</code></h3>
<p>This removes current session and logs out user. It basically empties accesstoken from locat storage and makes user
state null</p>
<div class="language-javascript ext-js line-numbers-mode"><pre v-pre class="language-javascript"><code>userStore<span class="token punctuation">.</span><span class="token function">logOut</span><span class="token punctuation">(</span><span class="token punctuation">)</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div></div></template>
