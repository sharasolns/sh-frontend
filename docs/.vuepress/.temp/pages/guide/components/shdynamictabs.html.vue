<template><div><h1 id="sh-dynamic-tabs" tabindex="-1"><a class="header-anchor" href="#sh-dynamic-tabs" aria-hidden="true">#</a> Sh Dynamic Tabs</h1>
<p>An easy way to incorporate bootstrap 5 tabs</p>
<h2 id="importing" tabindex="-1"><a class="header-anchor" href="#importing" aria-hidden="true">#</a> importing</h2>
<div class="language-javascript ext-js line-numbers-mode"><pre v-pre class="language-javascript"><code><span class="token keyword">import</span> <span class="token punctuation">{</span>ShDynamicTabs<span class="token punctuation">}</span> <span class="token keyword">from</span> <span class="token string">'@iankibetsh/shframework'</span>
<span class="token keyword">import</span> TabOne <span class="token keyword">from</span> <span class="token string">'./tabs/TabOne.vue'</span>
<span class="token keyword">import</span> TabTwo <span class="token keyword">from</span> <span class="token string">'./tabs/TabTwo.vue'</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h2 id="example-usage" tabindex="-1"><a class="header-anchor" href="#example-usage" aria-hidden="true">#</a> Example Usage</h2>
<div class="language-html ext-html line-numbers-mode"><pre v-pre class="language-html"><code><span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>sh-dynamic-tabs</span>
        <span class="token attr-name">:tabs</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">"</span>[
      {
    label: <span class="token punctuation">'</span>Tab One<span class="token punctuation">'</span>,
    component: TabOne
    },
    {
    label: <span class="token punctuation">'</span>Tab Two<span class="token punctuation">'</span>,
    component: TabTwo
    }
  ]<span class="token punctuation">"</span></span>
<span class="token punctuation">/></span></span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div></div></template>
