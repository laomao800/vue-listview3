import{_ as s,o as a,c as n,a as l}from"./app.d8858b93.js";const A=JSON.parse('{"title":"create()","description":"","frontmatter":{},"headers":[{"level":2,"title":"\u5168\u5C40\u914D\u7F6E\u9879","slug":"\u5168\u5C40\u914D\u7F6E\u9879","link":"#\u5168\u5C40\u914D\u7F6E\u9879","children":[]},{"level":2,"title":"replaceComponents","slug":"replacecomponents","link":"#replacecomponents","children":[]}],"relativePath":"create.md"}'),o={name:"create.md"},p=l(`<h1 id="create" tabindex="-1">create() <a class="header-anchor" href="#create" aria-hidden="true">#</a></h1><p>\u901A\u8FC7 create \u65B9\u6CD5\u53EF\u5BF9\u90E8\u5206 props \u9ED8\u8BA4\u503C\u8FDB\u884C\u5168\u5C40\u914D\u7F6E\uFF0C\u5E76\u751F\u6210\u5E26\u9884\u8BBE\u7684\u5168\u65B0\u7EC4\u4EF6\u3002\u65B0\u7EC4\u4EF6\u4F7F\u7528\u65F6\u4F9D\u7136\u53EF\u63A5\u6536 props \u8986\u76D6\u9884\u8BBE\u914D\u7F6E\u3002</p><p>\u53EF\u7528\u4E8E\u9879\u76EE\u95F4\u63A5\u53E3\u683C\u5F0F\u4E0D\u540C\uFF0C\u6216\u8005\u9879\u76EE\u5185\u90E8\u6709\u591A\u5957\u4E0D\u540C\u9ED8\u8BA4\u914D\u7F6E\u7B49\u7279\u6B8A\u573A\u666F\u3002</p><h2 id="\u5168\u5C40\u914D\u7F6E\u9879" tabindex="-1">\u5168\u5C40\u914D\u7F6E\u9879 <a class="header-anchor" href="#\u5168\u5C40\u914D\u7F6E\u9879" aria-hidden="true">#</a></h2><div class="language-js"><button title="Copy Code" class="copy"></button><span class="lang">js</span><pre><code><span class="line"><span style="color:#676E95;">// main.ts</span></span>
<span class="line"><span style="color:#89DDFF;">import</span><span style="color:#A6ACCD;"> </span><span style="color:#89DDFF;">{</span><span style="color:#F07178;"> </span><span style="color:#A6ACCD;">createApp</span><span style="color:#F07178;"> </span><span style="color:#89DDFF;">}</span><span style="color:#A6ACCD;"> </span><span style="color:#89DDFF;">from</span><span style="color:#A6ACCD;"> </span><span style="color:#89DDFF;">&#39;</span><span style="color:#C3E88D;">vue</span><span style="color:#89DDFF;">&#39;</span></span>
<span class="line"><span style="color:#89DDFF;">import</span><span style="color:#A6ACCD;"> </span><span style="color:#89DDFF;">{</span><span style="color:#F07178;"> </span><span style="color:#A6ACCD;">create</span><span style="color:#F07178;"> </span><span style="color:#89DDFF;">as</span><span style="color:#F07178;"> </span><span style="color:#A6ACCD;">createListview</span><span style="color:#F07178;"> </span><span style="color:#89DDFF;">}</span><span style="color:#A6ACCD;"> </span><span style="color:#89DDFF;">from</span><span style="color:#A6ACCD;"> </span><span style="color:#89DDFF;">&#39;</span><span style="color:#C3E88D;">@laomao800/vue-listview</span><span style="color:#89DDFF;">&#39;</span></span>
<span class="line"></span>
<span class="line"><span style="color:#C792EA;">const</span><span style="color:#A6ACCD;"> app </span><span style="color:#89DDFF;">=</span><span style="color:#A6ACCD;"> </span><span style="color:#82AAFF;">createApp</span><span style="color:#A6ACCD;">(App)</span></span>
<span class="line"></span>
<span class="line"><span style="color:#C792EA;">const</span><span style="color:#A6ACCD;"> CustomListview </span><span style="color:#89DDFF;">=</span><span style="color:#A6ACCD;"> </span><span style="color:#82AAFF;">createListview</span><span style="color:#A6ACCD;">(</span><span style="color:#89DDFF;">{</span></span>
<span class="line"><span style="color:#A6ACCD;">  </span><span style="color:#F07178;">contentDataMap</span><span style="color:#89DDFF;">:</span><span style="color:#A6ACCD;"> </span><span style="color:#89DDFF;">{</span><span style="color:#A6ACCD;"> </span><span style="color:#F07178;">items</span><span style="color:#89DDFF;">:</span><span style="color:#A6ACCD;"> </span><span style="color:#89DDFF;">&#39;</span><span style="color:#C3E88D;">result.items</span><span style="color:#89DDFF;">&#39;</span><span style="color:#89DDFF;">,</span><span style="color:#A6ACCD;"> </span><span style="color:#F07178;">total</span><span style="color:#89DDFF;">:</span><span style="color:#A6ACCD;"> </span><span style="color:#89DDFF;">&#39;</span><span style="color:#C3E88D;">result.total</span><span style="color:#89DDFF;">&#39;</span><span style="color:#A6ACCD;"> </span><span style="color:#89DDFF;">},</span></span>
<span class="line"><span style="color:#A6ACCD;">  </span><span style="color:#F07178;">usePage</span><span style="color:#89DDFF;">:</span><span style="color:#A6ACCD;"> </span><span style="color:#89DDFF;">{</span><span style="color:#A6ACCD;"> </span><span style="color:#F07178;">pageIndex</span><span style="color:#89DDFF;">:</span><span style="color:#A6ACCD;"> </span><span style="color:#89DDFF;">&#39;</span><span style="color:#C3E88D;">global_page_index</span><span style="color:#89DDFF;">&#39;</span><span style="color:#89DDFF;">,</span><span style="color:#A6ACCD;"> </span><span style="color:#F07178;">pageSize</span><span style="color:#89DDFF;">:</span><span style="color:#A6ACCD;"> </span><span style="color:#89DDFF;">&#39;</span><span style="color:#C3E88D;">global_page_size</span><span style="color:#89DDFF;">&#39;</span><span style="color:#A6ACCD;"> </span><span style="color:#89DDFF;">},</span></span>
<span class="line"><span style="color:#89DDFF;">  </span><span style="color:#676E95;">// ...</span></span>
<span class="line"><span style="color:#89DDFF;">}</span><span style="color:#A6ACCD;">)</span></span>
<span class="line"></span>
<span class="line"><span style="color:#A6ACCD;">app</span><span style="color:#89DDFF;">.</span><span style="color:#82AAFF;">component</span><span style="color:#A6ACCD;">(</span><span style="color:#89DDFF;">&#39;</span><span style="color:#C3E88D;">CustomListview</span><span style="color:#89DDFF;">&#39;</span><span style="color:#89DDFF;">,</span><span style="color:#A6ACCD;"> CustomListview)</span></span>
<span class="line"></span></code></pre></div><p>\u6240\u6709\u652F\u6301\u9884\u8BBE\u7684 <code>props</code> \uFF1A</p><ul><li><code>pressEnterSearch</code></li><li><code>autoload</code></li><li><code>requestMethod</code></li><li><code>requestConfig</code></li><li><code>transformRequestData</code></li><li><code>transformResponseData</code></li><li><code>contentDataMap</code></li><li><code>contentMessage</code></li><li><code>validateResponse</code></li><li><code>resolveResponseErrorMessage</code></li><li><code>usePage</code></li><li><code>pageSize</code></li><li><code>pageSizes</code></li><li><code>pageAttrs</code></li><li><code>pagePosition</code></li><li><code>height</code></li><li><code>fullHeight</code></li><li><code>searchButton</code></li><li><code>resetButton</code></li></ul><h2 id="replacecomponents" tabindex="-1"><code>replaceComponents</code> <a class="header-anchor" href="#replacecomponents" aria-hidden="true">#</a></h2><p>\u66FF\u6362\u533A\u57DF\u7EC4\u4EF6\uFF0C\u53EF\u901A\u8FC7\u8BE5\u5C5E\u6027\u914D\u7F6E\u9ED8\u8BA4\u63D2\u69FD\u5185\u5BB9\uFF0C\u7528\u4E8E\u5168\u5C40\u66FF\u6362\u8BF8\u5982\u641C\u7D22\u680F\u3001\u6B63\u6587\u533A\u57DF\u7B49\u9ED8\u8BA4\u7EC4\u4EF6\uFF1A</p><div class="language-js"><button title="Copy Code" class="copy"></button><span class="lang">js</span><pre><code><span class="line"><span style="color:#676E95;">// main.ts</span></span>
<span class="line"><span style="color:#89DDFF;">import</span><span style="color:#A6ACCD;"> </span><span style="color:#89DDFF;">{</span><span style="color:#F07178;"> </span><span style="color:#A6ACCD;">createApp</span><span style="color:#F07178;"> </span><span style="color:#89DDFF;">}</span><span style="color:#A6ACCD;"> </span><span style="color:#89DDFF;">from</span><span style="color:#A6ACCD;"> </span><span style="color:#89DDFF;">&#39;</span><span style="color:#C3E88D;">vue</span><span style="color:#89DDFF;">&#39;</span></span>
<span class="line"><span style="color:#89DDFF;">import</span><span style="color:#A6ACCD;"> </span><span style="color:#89DDFF;">{</span><span style="color:#F07178;"> </span><span style="color:#A6ACCD;">create</span><span style="color:#F07178;"> </span><span style="color:#89DDFF;">as</span><span style="color:#F07178;"> </span><span style="color:#A6ACCD;">createListview</span><span style="color:#F07178;"> </span><span style="color:#89DDFF;">}</span><span style="color:#A6ACCD;"> </span><span style="color:#89DDFF;">from</span><span style="color:#A6ACCD;"> </span><span style="color:#89DDFF;">&#39;</span><span style="color:#C3E88D;">@laomao800/vue-listview</span><span style="color:#89DDFF;">&#39;</span></span>
<span class="line"><span style="color:#89DDFF;">import</span><span style="color:#A6ACCD;"> CustomFilterbar </span><span style="color:#89DDFF;">from</span><span style="color:#A6ACCD;"> </span><span style="color:#89DDFF;">&#39;</span><span style="color:#C3E88D;">your component path...</span><span style="color:#89DDFF;">&#39;</span></span>
<span class="line"></span>
<span class="line"><span style="color:#C792EA;">const</span><span style="color:#A6ACCD;"> app </span><span style="color:#89DDFF;">=</span><span style="color:#A6ACCD;"> </span><span style="color:#82AAFF;">createApp</span><span style="color:#A6ACCD;">(App)</span></span>
<span class="line"></span>
<span class="line"><span style="color:#C792EA;">const</span><span style="color:#A6ACCD;"> CustomListview </span><span style="color:#89DDFF;">=</span><span style="color:#A6ACCD;"> </span><span style="color:#82AAFF;">createListview</span><span style="color:#A6ACCD;">(</span><span style="color:#89DDFF;">{</span></span>
<span class="line"><span style="color:#A6ACCD;">  </span><span style="color:#F07178;">replaceComponents</span><span style="color:#89DDFF;">:</span><span style="color:#A6ACCD;"> </span><span style="color:#89DDFF;">{</span></span>
<span class="line"><span style="color:#A6ACCD;">    </span><span style="color:#F07178;">filterbar</span><span style="color:#89DDFF;">:</span><span style="color:#A6ACCD;"> CustomFilterbar</span><span style="color:#89DDFF;">,</span></span>
<span class="line"><span style="color:#A6ACCD;">  </span><span style="color:#89DDFF;">},</span></span>
<span class="line"><span style="color:#89DDFF;">}</span><span style="color:#A6ACCD;">)</span></span>
<span class="line"></span>
<span class="line"><span style="color:#A6ACCD;">app</span><span style="color:#89DDFF;">.</span><span style="color:#82AAFF;">component</span><span style="color:#A6ACCD;">(</span><span style="color:#89DDFF;">&#39;</span><span style="color:#C3E88D;">CustomListview</span><span style="color:#89DDFF;">&#39;</span><span style="color:#89DDFF;">,</span><span style="color:#A6ACCD;"> CustomListview)</span></span>
<span class="line"></span></code></pre></div><p>\u652F\u6301\u7684\u66FF\u6362\u533A\u57DF\u6709\uFF1A</p><ul><li><code>header</code>: \u9876\u90E8\u6807\u9898\u680F\u533A\u57DF</li><li><code>filterbar</code>: \u641C\u7D22\u680F\u533A\u57DF</li><li><code>content</code>: \u6B63\u6587\u533A\u57DF</li><li><code>footer</code>: \u5E95\u90E8\u9875\u7801\u533A\u57DF</li></ul><div class="tip custom-block"><p class="custom-block-title">\u6CE8\u610F</p><ol><li>listview \u672C\u8EAB\u63A5\u53D7\u7684\u6240\u6709 attrs/props \u4F1A\u5168\u90E8\u4F20\u9012\u7ED9\u66FF\u6362\u7EC4\u4EF6\uFF1B</li><li>\u66FF\u6362\u7EC4\u4EF6\u5185\u90E8\u53EF\u901A\u8FC7 inject <code>lvStore</code> \uFF0C\u83B7\u53D6 Listview \u5185\u90E8\u7684 store \u5B9E\u4F8B\uFF0C\u5177\u4F53\u5185\u5BB9\u53EF\u67E5\u9605 <a href="./lv-store.html">lvStore</a> \u7AE0\u8282\u3002</li></ol></div>`,13),e=[p];function t(c,r,D,y,F,i){return a(),n("div",null,e)}const d=s(o,[["render",t]]);export{A as __pageData,d as default};
