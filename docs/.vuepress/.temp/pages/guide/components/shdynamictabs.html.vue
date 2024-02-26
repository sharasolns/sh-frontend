<template><div><h1 id="sh-dynamic-tabs" tabindex="-1"><a class="header-anchor" href="#sh-dynamic-tabs"><span>Sh Dynamic Tabs</span></a></h1>
<p>An easy way to incorporate bootstrap 5 tabs</p>
<h2 id="importing" tabindex="-1"><a class="header-anchor" href="#importing"><span>importing</span></a></h2>
<div class="language-javascript line-numbers-mode" data-ext="js" data-title="js"><pre v-pre class="language-javascript"><code><span class="token keyword">import</span> <span class="token punctuation">{</span>ShDynamicTabs<span class="token punctuation">}</span> <span class="token keyword">from</span> <span class="token string">'@iankibetsh/shframework'</span>
<span class="token keyword">import</span> TabOne <span class="token keyword">from</span> <span class="token string">'./tabs/TabOne.vue'</span>
<span class="token keyword">import</span> TabTwo <span class="token keyword">from</span> <span class="token string">'./tabs/TabTwo.vue'</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h2 id="example-usage" tabindex="-1"><a class="header-anchor" href="#example-usage"><span>Example Usage</span></a></h2>
<div class="language-html line-numbers-mode" data-ext="html" data-title="html"><pre v-pre class="language-html"><code><span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>sh-dynamic-tabs</span>
        <span class="token attr-name">:tabs</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">"</span>[
      {
    label: 'Tab One',
    component: TabOne
    },
    {
    label: 'Tab Two',
    component: TabTwo
    }
  ]<span class="token punctuation">"</span></span>
<span class="token punctuation">/></span></span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div></div></template>


