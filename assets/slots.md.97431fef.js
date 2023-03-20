import{_ as s,o as t,c as a,a as n}from"./app.5150c259.js";const C=JSON.parse('{"title":"Slots","description":"","frontmatter":{},"headers":[{"level":2,"title":"Slot props","slug":"slot-props","link":"#slot-props","children":[]}],"relativePath":"slots.md"}'),l={name:"slots.md"},o=n(`<h1 id="slots" tabindex="-1">Slots <a class="header-anchor" href="#slots" aria-hidden="true">#</a></h1><p>\u5176\u4E2D <code>filterbar</code> \u3001<code>footer</code> \u4E0E <a href="./create.html#replacecomponents"><code>replaceComponent</code></a> \u7C7B\u4F3C\uFF0C\u4F1A\u6E32\u67D3\u4E8E\u6574\u4E2A\u5B8C\u6574\u533A\u57DF\uFF0C\u65E2\u8BBE\u7F6E\u540E\u4E0B\u65B9\u5176\u4ED6\u5185\u90E8 slot <code>filterbar-*</code> \uFF0C <code>footer-*</code> \u7B49\u4E0D\u518D\u663E\u793A\u3002</p><table><thead><tr><th>name</th><th>\u8BF4\u660E</th></tr></thead><tbody><tr><td>content</td><td>\u5185\u5BB9\u4E3B\u4F53\u533A\u57DF</td></tr><tr><td>header</td><td>\u9876\u90E8\u9875\u9762\u6807\u9898\u3001\u9762\u5305\u5C51\u4E3B\u4F53\u533A\u57DF</td></tr><tr><td>filterbar</td><td>\u641C\u7D22\u680F\u4E3B\u4F53\u533A\u57DF</td></tr><tr><td>footer</td><td>\u5E95\u90E8\u9875\u7801\u680F\u4E3B\u4F53\u533A\u57DF</td></tr><tr><td>filterbar-top</td><td>\u641C\u7D22\u680F\u9876\u90E8</td></tr><tr><td>filterbar-bottom</td><td>\u641C\u7D22\u680F\u5E95\u90E8</td></tr><tr><td>filterbar-left</td><td>\u641C\u7D22\u680F\u5DE6\u4FA7</td></tr><tr><td>filterbar-right</td><td>\u641C\u7D22\u680F\u53F3\u4FA7</td></tr><tr><td>prepend-submit</td><td>\u641C\u7D22\u680F\u53F3\u4FA7\u201C\u641C\u7D22\u201D\u6309\u94AE\u5DE6\u4FA7</td></tr><tr><td>append-submit</td><td>\u641C\u7D22\u680F\u53F3\u4FA7\u201C\u91CD\u7F6E\u201D\u6309\u94AE\u53F3\u4FA7</td></tr><tr><td>prepend-more</td><td>\u641C\u7D22\u680F\u6298\u53E0\u6309\u94AE\u5DE6\u4FA7</td></tr><tr><td>append-more</td><td>\u641C\u7D22\u680F\u6298\u53E0\u6309\u94AE\u53F3\u4FA7</td></tr><tr><td>footer-left</td><td>\u5E95\u90E8\u9875\u7801\u680F\u5DE6\u4FA7\uFF0C\u8BE5\u63D2\u69FD\u4F1A\u8986\u76D6\u5C45\u5DE6\u663E\u793A\u9875\u7801\u7EC4\u4EF6</td></tr><tr><td>footer-center</td><td>\u5E95\u90E8\u9875\u7801\u680F\u4E2D\u95F4\u4F4D\u7F6E</td></tr><tr><td>footer-right</td><td>\u5E95\u90E8\u9875\u7801\u680F\u53F3\u4FA7\uFF0C\u8BE5\u63D2\u69FD\u4F1A\u8986\u76D6\u5C45\u53F3\u663E\u793A\u9875\u7801\u7EC4\u4EF6</td></tr></tbody></table><h2 id="slot-props" tabindex="-1">Slot props <a class="header-anchor" href="#slot-props" aria-hidden="true">#</a></h2><p>\u6240\u6709 slot \u90FD\u63A5\u6536\u5185\u90E8 <a href="./lv-store.html">lvStore</a> \u5B9E\u4F8B\u4F5C\u4E3A slot props \u3002</p><p>\u7528\u4F8B\uFF1A</p><div class="language-vue"><button title="Copy Code" class="copy"></button><span class="lang">vue</span><pre><code><span class="line"><span style="color:#89DDFF;">&lt;</span><span style="color:#F07178;">template</span><span style="color:#89DDFF;">&gt;</span></span>
<span class="line"><span style="color:#A6ACCD;">  </span><span style="color:#89DDFF;">&lt;</span><span style="color:#F07178;">listview</span><span style="color:#89DDFF;">&gt;</span></span>
<span class="line"><span style="color:#A6ACCD;">    </span><span style="color:#89DDFF;">&lt;</span><span style="color:#F07178;">template</span><span style="color:#89DDFF;"> #</span><span style="color:#C792EA;">content</span><span style="color:#89DDFF;">=</span><span style="color:#89DDFF;">&quot;</span><span style="color:#89DDFF;">{ </span><span style="color:#A6ACCD;">state</span><span style="color:#89DDFF;"> }</span><span style="color:#89DDFF;">&quot;</span><span style="color:#89DDFF;">&gt;</span></span>
<span class="line"><span style="color:#A6ACCD;">      </span><span style="color:#89DDFF;">&lt;</span><span style="color:#F07178;">div</span><span style="color:#89DDFF;"> </span><span style="color:#C792EA;">v-if</span><span style="color:#89DDFF;">=</span><span style="color:#89DDFF;">&quot;</span><span style="color:#A6ACCD;">state</span><span style="color:#89DDFF;">.</span><span style="color:#A6ACCD;">contentLoading</span><span style="color:#89DDFF;">&quot;</span><span style="color:#89DDFF;">&gt;</span><span style="color:#A6ACCD;">Loading...</span><span style="color:#89DDFF;">&lt;/</span><span style="color:#F07178;">div</span><span style="color:#89DDFF;">&gt;</span></span>
<span class="line"><span style="color:#A6ACCD;">      </span><span style="color:#89DDFF;">&lt;</span><span style="color:#F07178;">div</span><span style="color:#89DDFF;"> </span><span style="color:#C792EA;">v-else-if</span><span style="color:#89DDFF;">=</span><span style="color:#89DDFF;">&quot;</span><span style="color:#A6ACCD;">state</span><span style="color:#89DDFF;">.</span><span style="color:#A6ACCD;">contentMessage</span><span style="color:#89DDFF;">.</span><span style="color:#A6ACCD;">text</span><span style="color:#89DDFF;">&quot;</span><span style="color:#89DDFF;">&gt;{{</span><span style="color:#A6ACCD;"> state</span><span style="color:#89DDFF;">.</span><span style="color:#A6ACCD;">contentMessage </span><span style="color:#89DDFF;">}}&lt;/</span><span style="color:#F07178;">div</span><span style="color:#89DDFF;">&gt;</span></span>
<span class="line"><span style="color:#A6ACCD;">      </span><span style="color:#89DDFF;">&lt;</span><span style="color:#F07178;">ul</span><span style="color:#89DDFF;"> </span><span style="color:#C792EA;">v-else</span><span style="color:#89DDFF;">&gt;</span></span>
<span class="line"><span style="color:#A6ACCD;">        </span><span style="color:#89DDFF;">&lt;</span><span style="color:#F07178;">li</span><span style="color:#89DDFF;"> </span><span style="color:#C792EA;">v-for</span><span style="color:#89DDFF;">=</span><span style="color:#89DDFF;">&quot;</span><span style="color:#89DDFF;">(</span><span style="color:#A6ACCD;">item</span><span style="color:#89DDFF;">, </span><span style="color:#A6ACCD;">index</span><span style="color:#89DDFF;">) in </span><span style="color:#A6ACCD;">state</span><span style="color:#89DDFF;">.</span><span style="color:#A6ACCD;">contentData</span><span style="color:#89DDFF;">.</span><span style="color:#A6ACCD;">items</span><span style="color:#89DDFF;">&quot;</span><span style="color:#89DDFF;"> :</span><span style="color:#C792EA;">key</span><span style="color:#89DDFF;">=</span><span style="color:#89DDFF;">&quot;</span><span style="color:#A6ACCD;">index</span><span style="color:#89DDFF;">&quot;</span><span style="color:#89DDFF;">&gt;</span></span>
<span class="line"><span style="color:#A6ACCD;">          </span><span style="color:#89DDFF;">{{</span><span style="color:#A6ACCD;"> item</span><span style="color:#89DDFF;">.</span><span style="color:#A6ACCD;">name </span><span style="color:#89DDFF;">}}</span></span>
<span class="line"><span style="color:#A6ACCD;">        </span><span style="color:#89DDFF;">&lt;/</span><span style="color:#F07178;">li</span><span style="color:#89DDFF;">&gt;</span></span>
<span class="line"><span style="color:#A6ACCD;">      </span><span style="color:#89DDFF;">&lt;/</span><span style="color:#F07178;">ul</span><span style="color:#89DDFF;">&gt;</span></span>
<span class="line"><span style="color:#A6ACCD;">    </span><span style="color:#89DDFF;">&lt;/</span><span style="color:#F07178;">template</span><span style="color:#89DDFF;">&gt;</span></span>
<span class="line"><span style="color:#A6ACCD;">  </span><span style="color:#89DDFF;">&lt;/</span><span style="color:#F07178;">listview</span><span style="color:#89DDFF;">&gt;</span></span>
<span class="line"><span style="color:#89DDFF;">&lt;/</span><span style="color:#F07178;">template</span><span style="color:#89DDFF;">&gt;</span></span>
<span class="line"></span></code></pre></div>`,7),p=[o];function e(r,c,D,F,y,d){return t(),a("div",null,p)}const A=s(l,[["render",e]]);export{C as __pageData,A as default};