import{_ as s,o as n,c as a,a as l}from"./app.5150c259.js";const d=JSON.parse('{"title":"Prop table-columns","description":"","frontmatter":{},"headers":[{"level":2,"title":"\u5E38\u7528\u5C5E\u6027","slug":"\u5E38\u7528\u5C5E\u6027","link":"#\u5E38\u7528\u5C5E\u6027","children":[]},{"level":2,"title":"Types","slug":"types","link":"#types","children":[]},{"level":2,"title":"\u914D\u7F6E\u6F14\u793A","slug":"\u914D\u7F6E\u6F14\u793A","link":"#\u914D\u7F6E\u6F14\u793A","children":[]}],"relativePath":"prop-table-columns.md"}'),p={name:"prop-table-columns.md"},o=l(`<h1 id="prop-table-columns" tabindex="-1">Prop <code>table-columns</code> <a class="header-anchor" href="#prop-table-columns" aria-hidden="true">#</a></h1><p>\u9ED8\u8BA4\u8868\u683C\u7EC4\u4EF6\u5217\u914D\u7F6E\u3002</p><ul><li>type: <code>TableColumn[]</code></li><li>default: <code>[]</code></li></ul><h2 id="\u5E38\u7528\u5C5E\u6027" tabindex="-1">\u5E38\u7528\u5C5E\u6027 <a class="header-anchor" href="#\u5E38\u7528\u5C5E\u6027" aria-hidden="true">#</a></h2><table><thead><tr><th>\u53C2\u6570</th><th>\u7C7B\u578B</th><th>\u8BF4\u660E</th></tr></thead><tbody><tr><td>label</td><td>String</td><td>\u8868\u5934\u663E\u793A\u7684\u5185\u5BB9</td></tr><tr><td>renderHeader</td><td>Function(h, { column, $index })</td><td>\u652F\u6301 jsx \u81EA\u5B9A\u4E49\u8868\u5934\u5185\u5BB9</td></tr><tr><td>prop</td><td>String</td><td>\u5217\u5B57\u6BB5\u540D</td></tr><tr><td>width</td><td>String , Number</td><td>\u5217\u5BBD\u5EA6</td></tr><tr><td>align</td><td>String</td><td>\u5217\u5BF9\u9F50\u65B9\u5F0F <code>left</code> , <code>center</code> , <code>right</code></td></tr><tr><td>render</td><td>function({ row, column, $index })</td><td>\u652F\u6301\u8FD4\u56DE\u5B57\u7B26\u4E32\u6216 JSX</td></tr><tr><td>formatter</td><td>function(row)</td><td>\u5982\u6570\u636E\u9700\u8981\u7B80\u5355\u6587\u672C\u52A0\u5DE5\uFF0C\u53EF\u4F7F\u7528\u8BE5\u914D\u7F6E\u5904\u7406\u540E return \u5373\u53EF</td></tr><tr><td>fixed</td><td>String , Boolean</td><td>\u5217\u662F\u5426\u56FA\u5B9A\u5728\u5DE6\u4FA7\u6216\u8005\u53F3\u4FA7\uFF0Ctrue \u8868\u793A\u56FA\u5B9A\u5728\u5DE6\u4FA7</td></tr><tr><td>children</td><td>Array</td><td>\u5B50\u5217\u914D\u7F6E\uFF0C\u5B50\u9879\u652F\u6301\u5C5E\u6027\u4E0E\u7236\u7EA7\u4E00\u81F4</td></tr><tr><td>...</td><td>-</td><td><strong>\u652F\u6301\u5176\u4ED6 <a href="https://element-plus.org/zh-CN/component/table.html#table-column-%E5%B1%9E%E6%80%A7" target="_blank" rel="noreferrer">Element Plus table column attrs</a></strong></td></tr></tbody></table><h2 id="types" tabindex="-1">Types <a class="header-anchor" href="#types" aria-hidden="true">#</a></h2><div class="language-ts"><button title="Copy Code" class="copy"></button><span class="lang">ts</span><pre><code><span class="line"><span style="color:#89DDFF;">export</span><span style="color:#A6ACCD;"> </span><span style="color:#C792EA;">interface</span><span style="color:#A6ACCD;"> </span><span style="color:#FFCB6B;">TableColumn</span><span style="color:#A6ACCD;"> </span><span style="color:#C792EA;">extends</span><span style="color:#A6ACCD;"> </span><span style="color:#FFCB6B;">ElTableColumn</span><span style="color:#A6ACCD;"> </span><span style="color:#89DDFF;">{</span></span>
<span class="line"><span style="color:#A6ACCD;">  </span><span style="color:#676E95;">/** \u5355\u5143\u683C\u6E32\u67D3\u65B9\u6CD5\uFF0C\u53EF\u4F7F\u7528 JSX */</span></span>
<span class="line"><span style="color:#A6ACCD;">  </span><span style="color:#F07178;">render</span><span style="color:#89DDFF;">?:</span><span style="color:#A6ACCD;"> (</span><span style="color:#89DDFF;">{</span></span>
<span class="line"><span style="color:#A6ACCD;">    </span><span style="color:#F07178;">row</span><span style="color:#89DDFF;">,</span></span>
<span class="line"><span style="color:#A6ACCD;">    </span><span style="color:#F07178;">column</span><span style="color:#89DDFF;">,</span></span>
<span class="line"><span style="color:#A6ACCD;">    </span><span style="color:#F07178;">$index</span><span style="color:#89DDFF;">,</span></span>
<span class="line"><span style="color:#A6ACCD;">  </span><span style="color:#89DDFF;">}:</span><span style="color:#A6ACCD;"> </span><span style="color:#89DDFF;">{</span></span>
<span class="line"><span style="color:#A6ACCD;">    </span><span style="color:#F07178;">row</span><span style="color:#89DDFF;">:</span><span style="color:#A6ACCD;"> </span><span style="color:#FFCB6B;">any</span></span>
<span class="line"><span style="color:#A6ACCD;">    </span><span style="color:#F07178;">column</span><span style="color:#89DDFF;">:</span><span style="color:#A6ACCD;"> </span><span style="color:#FFCB6B;">any</span></span>
<span class="line"><span style="color:#A6ACCD;">    </span><span style="color:#F07178;">$index</span><span style="color:#89DDFF;">:</span><span style="color:#A6ACCD;"> </span><span style="color:#FFCB6B;">number</span></span>
<span class="line"><span style="color:#A6ACCD;">  </span><span style="color:#89DDFF;">}</span><span style="color:#A6ACCD;">) </span><span style="color:#C792EA;">=&gt;</span><span style="color:#A6ACCD;"> </span><span style="color:#FFCB6B;">VNode</span></span>
<span class="line"></span>
<span class="line"><span style="color:#A6ACCD;">  </span><span style="color:#676E95;">/** \u5B50\u5217 */</span></span>
<span class="line"><span style="color:#A6ACCD;">  </span><span style="color:#F07178;">children</span><span style="color:#89DDFF;">?:</span><span style="color:#A6ACCD;"> </span><span style="color:#FFCB6B;">TableColumn</span><span style="color:#A6ACCD;">[]</span></span>
<span class="line"><span style="color:#89DDFF;">}</span></span>
<span class="line"></span></code></pre></div><h2 id="\u914D\u7F6E\u6F14\u793A" tabindex="-1">\u914D\u7F6E\u6F14\u793A <a class="header-anchor" href="#\u914D\u7F6E\u6F14\u793A" aria-hidden="true">#</a></h2><div class="language-tsx"><button title="Copy Code" class="copy"></button><span class="lang">tsx</span><pre><code><span class="line"><span style="color:#C792EA;">const</span><span style="color:#A6ACCD;"> tableColumns </span><span style="color:#89DDFF;">=</span><span style="color:#A6ACCD;"> </span><span style="color:#82AAFF;">shallowRef</span><span style="color:#A6ACCD;">([</span></span>
<span class="line"><span style="color:#89DDFF;">  </span><span style="color:#676E95;">// \u5E38\u89C4\u8C03\u7528\uFF0C\u76F4\u63A5\u901A\u8FC7 prop \u6307\u5B9A\u5C5E\u6027\u540D</span></span>
<span class="line"><span style="color:#A6ACCD;">  </span><span style="color:#89DDFF;">{</span><span style="color:#A6ACCD;"> </span><span style="color:#F07178;">label</span><span style="color:#89DDFF;">:</span><span style="color:#A6ACCD;"> </span><span style="color:#89DDFF;">&#39;</span><span style="color:#C3E88D;">id</span><span style="color:#89DDFF;">&#39;</span><span style="color:#89DDFF;">,</span><span style="color:#A6ACCD;"> </span><span style="color:#F07178;">prop</span><span style="color:#89DDFF;">:</span><span style="color:#A6ACCD;"> </span><span style="color:#89DDFF;">&#39;</span><span style="color:#C3E88D;">id</span><span style="color:#89DDFF;">&#39;</span><span style="color:#89DDFF;">,</span><span style="color:#A6ACCD;"> </span><span style="color:#F07178;">fixed</span><span style="color:#89DDFF;">:</span><span style="color:#A6ACCD;"> </span><span style="color:#FF9CAC;">true</span><span style="color:#A6ACCD;"> </span><span style="color:#89DDFF;">},</span></span>
<span class="line"></span>
<span class="line"><span style="color:#89DDFF;">  </span><span style="color:#676E95;">// \u9700\u8981\u5BF9\u6570\u636E\u8FDB\u884C\u7B80\u5355\u5904\u7406\u540E\u518D\u8F93\u51FA</span></span>
<span class="line"><span style="color:#A6ACCD;">  </span><span style="color:#89DDFF;">{</span></span>
<span class="line"><span style="color:#A6ACCD;">    </span><span style="color:#F07178;">label</span><span style="color:#89DDFF;">:</span><span style="color:#A6ACCD;"> </span><span style="color:#89DDFF;">&#39;</span><span style="color:#C3E88D;">\u6298\u6263\u7387</span><span style="color:#89DDFF;">&#39;</span><span style="color:#89DDFF;">,</span></span>
<span class="line"><span style="color:#A6ACCD;">    </span><span style="color:#82AAFF;">formatter</span><span style="color:#89DDFF;">:</span><span style="color:#A6ACCD;"> </span><span style="color:#A6ACCD;">row</span><span style="color:#A6ACCD;"> </span><span style="color:#C792EA;">=&gt;</span><span style="color:#A6ACCD;"> row</span><span style="color:#89DDFF;">.</span><span style="color:#A6ACCD;">discount</span><span style="color:#89DDFF;">.</span><span style="color:#82AAFF;">toFixed</span><span style="color:#A6ACCD;">(</span><span style="color:#F78C6C;">2</span><span style="color:#A6ACCD;">)</span></span>
<span class="line"><span style="color:#A6ACCD;">  </span><span style="color:#89DDFF;">},</span></span>
<span class="line"></span>
<span class="line"><span style="color:#89DDFF;">  </span><span style="color:#676E95;">// \u652F\u6301 JSX \u4EE5\u53CA\u7ED1\u5B9A method</span></span>
<span class="line"><span style="color:#A6ACCD;">  </span><span style="color:#89DDFF;">{</span></span>
<span class="line"><span style="color:#A6ACCD;">    </span><span style="color:#F07178;">label</span><span style="color:#89DDFF;">:</span><span style="color:#A6ACCD;"> </span><span style="color:#89DDFF;">&#39;</span><span style="color:#C3E88D;">\u64CD\u4F5C</span><span style="color:#89DDFF;">&#39;</span><span style="color:#89DDFF;">,</span></span>
<span class="line"><span style="color:#A6ACCD;">    </span><span style="color:#F07178;">align</span><span style="color:#89DDFF;">:</span><span style="color:#A6ACCD;"> </span><span style="color:#89DDFF;">&#39;</span><span style="color:#C3E88D;">center</span><span style="color:#89DDFF;">&#39;</span><span style="color:#89DDFF;">,</span></span>
<span class="line"><span style="color:#A6ACCD;">    </span><span style="color:#F07178;">fixed</span><span style="color:#89DDFF;">:</span><span style="color:#A6ACCD;"> </span><span style="color:#FF9CAC;">true</span><span style="color:#89DDFF;">,</span></span>
<span class="line"><span style="color:#A6ACCD;">    </span><span style="color:#82AAFF;">render</span><span style="color:#89DDFF;">:</span><span style="color:#A6ACCD;"> </span><span style="color:#89DDFF;">({</span><span style="color:#A6ACCD;"> </span><span style="color:#A6ACCD;">row</span><span style="color:#89DDFF;">,</span><span style="color:#A6ACCD;"> </span><span style="color:#A6ACCD;">column</span><span style="color:#89DDFF;">,</span><span style="color:#A6ACCD;"> </span><span style="color:#A6ACCD;">$index</span><span style="color:#A6ACCD;"> </span><span style="color:#89DDFF;">})</span><span style="color:#A6ACCD;"> </span><span style="color:#C792EA;">=&gt;</span><span style="color:#A6ACCD;"> (</span></span>
<span class="line"><span style="color:#A6ACCD;">      </span><span style="color:#89DDFF;">&lt;</span><span style="color:#FFCB6B;">el-button</span></span>
<span class="line"><span style="color:#89DDFF;">        </span><span style="color:#C792EA;">size</span><span style="color:#89DDFF;">=</span><span style="color:#89DDFF;">&quot;</span><span style="color:#C3E88D;">mini</span><span style="color:#89DDFF;">&quot;</span></span>
<span class="line"><span style="color:#89DDFF;">        </span><span style="color:#C792EA;">icon</span><span style="color:#89DDFF;">={</span><span style="color:#A6ACCD;">row</span><span style="color:#89DDFF;">.</span><span style="color:#A6ACCD;">enable </span><span style="color:#89DDFF;">?</span><span style="color:#A6ACCD;"> </span><span style="color:#89DDFF;">&#39;</span><span style="color:#C3E88D;">el-icon-check </span><span style="color:#89DDFF;">&#39;</span><span style="color:#A6ACCD;"> </span><span style="color:#89DDFF;">:</span><span style="color:#A6ACCD;"> </span><span style="color:#89DDFF;">&#39;</span><span style="color:#C3E88D;">el-icon-close</span><span style="color:#89DDFF;">&#39;</span><span style="color:#89DDFF;">}</span></span>
<span class="line"><span style="color:#89DDFF;">        </span><span style="color:#C792EA;">on-click</span><span style="color:#89DDFF;">={(</span><span style="color:#A6ACCD;">e</span><span style="color:#89DDFF;">)</span><span style="color:#A6ACCD;"> </span><span style="color:#C792EA;">=&gt;</span><span style="color:#A6ACCD;"> </span><span style="color:#89DDFF;">{</span></span>
<span class="line"><span style="color:#F07178;">          </span><span style="color:#A6ACCD;">e</span><span style="color:#89DDFF;">.</span><span style="color:#82AAFF;">stopPropagation</span><span style="color:#F07178;">()</span></span>
<span class="line"><span style="color:#F07178;">        </span><span style="color:#89DDFF;">}}</span></span>
<span class="line"><span style="color:#89DDFF;">      &gt;</span></span>
<span class="line"><span style="color:#A6ACCD;">        \u6309\u94AE</span></span>
<span class="line"><span style="color:#A6ACCD;">      </span><span style="color:#89DDFF;">&lt;/</span><span style="color:#FFCB6B;">el-button</span><span style="color:#89DDFF;">&gt;</span></span>
<span class="line"><span style="color:#A6ACCD;">    )</span></span>
<span class="line"><span style="color:#A6ACCD;">  </span><span style="color:#89DDFF;">},</span></span>
<span class="line"></span>
<span class="line"><span style="color:#89DDFF;">  </span><span style="color:#676E95;">// \u5B50\u5217\u5D4C\u5957</span></span>
<span class="line"><span style="color:#A6ACCD;">  </span><span style="color:#89DDFF;">{</span></span>
<span class="line"><span style="color:#A6ACCD;">    </span><span style="color:#F07178;">label</span><span style="color:#89DDFF;">:</span><span style="color:#A6ACCD;"> </span><span style="color:#89DDFF;">&#39;</span><span style="color:#C3E88D;">\u914D\u9001\u4FE1\u606F</span><span style="color:#89DDFF;">&#39;</span><span style="color:#89DDFF;">,</span></span>
<span class="line"><span style="color:#A6ACCD;">    </span><span style="color:#F07178;">children</span><span style="color:#89DDFF;">:</span><span style="color:#A6ACCD;"> [</span></span>
<span class="line"><span style="color:#A6ACCD;">      </span><span style="color:#89DDFF;">{</span><span style="color:#A6ACCD;"> </span><span style="color:#F07178;">label</span><span style="color:#89DDFF;">:</span><span style="color:#A6ACCD;"> </span><span style="color:#89DDFF;">&#39;</span><span style="color:#C3E88D;">\u59D3\u540D</span><span style="color:#89DDFF;">&#39;</span><span style="color:#89DDFF;">,</span><span style="color:#A6ACCD;"> </span><span style="color:#F07178;">prop</span><span style="color:#89DDFF;">:</span><span style="color:#A6ACCD;"> </span><span style="color:#89DDFF;">&#39;</span><span style="color:#C3E88D;">name</span><span style="color:#89DDFF;">&#39;</span><span style="color:#A6ACCD;"> </span><span style="color:#89DDFF;">},</span></span>
<span class="line"><span style="color:#A6ACCD;">      </span><span style="color:#89DDFF;">{</span></span>
<span class="line"><span style="color:#A6ACCD;">        </span><span style="color:#F07178;">label</span><span style="color:#89DDFF;">:</span><span style="color:#A6ACCD;"> </span><span style="color:#89DDFF;">&#39;</span><span style="color:#C3E88D;">\u5730\u5740</span><span style="color:#89DDFF;">&#39;</span><span style="color:#89DDFF;">,</span></span>
<span class="line"><span style="color:#A6ACCD;">        </span><span style="color:#F07178;">children</span><span style="color:#89DDFF;">:</span><span style="color:#A6ACCD;"> [</span></span>
<span class="line"><span style="color:#A6ACCD;">          </span><span style="color:#89DDFF;">{</span><span style="color:#A6ACCD;"> </span><span style="color:#F07178;">label</span><span style="color:#89DDFF;">:</span><span style="color:#A6ACCD;"> </span><span style="color:#89DDFF;">&#39;</span><span style="color:#C3E88D;">\u7701\u4EFD</span><span style="color:#89DDFF;">&#39;</span><span style="color:#89DDFF;">,</span><span style="color:#A6ACCD;"> </span><span style="color:#F07178;">prop</span><span style="color:#89DDFF;">:</span><span style="color:#A6ACCD;"> </span><span style="color:#89DDFF;">&#39;</span><span style="color:#C3E88D;">province</span><span style="color:#89DDFF;">&#39;</span><span style="color:#A6ACCD;"> </span><span style="color:#89DDFF;">},</span></span>
<span class="line"><span style="color:#A6ACCD;">          </span><span style="color:#89DDFF;">{</span><span style="color:#A6ACCD;"> </span><span style="color:#F07178;">label</span><span style="color:#89DDFF;">:</span><span style="color:#A6ACCD;"> </span><span style="color:#89DDFF;">&#39;</span><span style="color:#C3E88D;">\u5E02\u533A</span><span style="color:#89DDFF;">&#39;</span><span style="color:#89DDFF;">,</span><span style="color:#A6ACCD;"> </span><span style="color:#F07178;">prop</span><span style="color:#89DDFF;">:</span><span style="color:#A6ACCD;"> </span><span style="color:#89DDFF;">&#39;</span><span style="color:#C3E88D;">city</span><span style="color:#89DDFF;">&#39;</span><span style="color:#A6ACCD;"> </span><span style="color:#89DDFF;">},</span></span>
<span class="line"><span style="color:#A6ACCD;">          </span><span style="color:#89DDFF;">{</span><span style="color:#A6ACCD;"> </span><span style="color:#F07178;">label</span><span style="color:#89DDFF;">:</span><span style="color:#A6ACCD;"> </span><span style="color:#89DDFF;">&#39;</span><span style="color:#C3E88D;">\u5730\u5740</span><span style="color:#89DDFF;">&#39;</span><span style="color:#89DDFF;">,</span><span style="color:#A6ACCD;"> </span><span style="color:#F07178;">prop</span><span style="color:#89DDFF;">:</span><span style="color:#A6ACCD;"> </span><span style="color:#89DDFF;">&#39;</span><span style="color:#C3E88D;">address</span><span style="color:#89DDFF;">&#39;</span><span style="color:#89DDFF;">,</span><span style="color:#A6ACCD;"> </span><span style="color:#F07178;">width</span><span style="color:#89DDFF;">:</span><span style="color:#A6ACCD;"> </span><span style="color:#F78C6C;">600</span><span style="color:#A6ACCD;"> </span><span style="color:#89DDFF;">}</span></span>
<span class="line"><span style="color:#A6ACCD;">        ]</span></span>
<span class="line"><span style="color:#A6ACCD;">      </span><span style="color:#89DDFF;">}</span></span>
<span class="line"><span style="color:#A6ACCD;">    ]</span></span>
<span class="line"><span style="color:#A6ACCD;">  </span><span style="color:#89DDFF;">}</span></span>
<span class="line"><span style="color:#A6ACCD;">])</span></span>
<span class="line"></span></code></pre></div>`,9),e=[o];function t(c,r,D,y,F,C){return n(),a("div",null,e)}const i=s(p,[["render",t]]);export{d as __pageData,i as default};