import{d as r,s as F,r as a,o as t,b as D,n as y,g as C,u as A,c as i,e as m,w as u,f as s,h as l}from"./app.5150c259.js";const d=r({__name:"DemoRequestHandler",setup(c){const n=F({filterFields:[{type:"text",model:"name",label:"name"}],tableColumns:[{label:"id",prop:"id",width:120},{label:"name",prop:"name"}],contentDataMap:{items:"custom_result.items",total:"custom_result.total"},validateResponse(o){try{return o.is_success}catch{return!1}},requestHandler(o){return new Promise(e=>{setTimeout(()=>{e({is_success:!0,custom_result:{items:[{id:"id10001",name:`name10001${o.name||""}`},{id:"id10002",name:`name10002${o.name||""}`}],total:2}})},800)})}});return(o,e)=>{const p=a("Listview");return t(),D(p,y(C(A(n))),null,16)}}}),_=s("div",{class:"language-vue"},[s("button",{title:"Copy Code",class:"copy"}),s("span",{class:"lang"},"vue"),s("pre",null,[s("code",null,[s("span",{class:"line"},[s("span",{style:{color:"#89DDFF"}},"<"),s("span",{style:{color:"#F07178"}},"template"),s("span",{style:{color:"#89DDFF"}},">")]),l(`
`),s("span",{class:"line"},[s("span",{style:{color:"#A6ACCD"}},"  "),s("span",{style:{color:"#89DDFF"}},"<"),s("span",{style:{color:"#FFCB6B"}},"Listview"),s("span",{style:{color:"#89DDFF"}}," "),s("span",{style:{color:"#C792EA"}},"v-bind"),s("span",{style:{color:"#89DDFF"}},"="),s("span",{style:{color:"#89DDFF"}},'"'),s("span",{style:{color:"#A6ACCD"}},"lvConfig"),s("span",{style:{color:"#89DDFF"}},'"'),s("span",{style:{color:"#89DDFF"}}," />")]),l(`
`),s("span",{class:"line"},[s("span",{style:{color:"#89DDFF"}},"</"),s("span",{style:{color:"#F07178"}},"template"),s("span",{style:{color:"#89DDFF"}},">")]),l(`
`),s("span",{class:"line"}),l(`
`),s("span",{class:"line"},[s("span",{style:{color:"#89DDFF"}},"<"),s("span",{style:{color:"#F07178"}},"script"),s("span",{style:{color:"#A6ACCD"}}," "),s("span",{style:{color:"#C792EA"}},"setup"),s("span",{style:{color:"#A6ACCD"}}," "),s("span",{style:{color:"#C792EA"}},"lang"),s("span",{style:{color:"#A6ACCD"}},"="),s("span",{style:{color:"#89DDFF"}},'"'),s("span",{style:{color:"#C3E88D"}},"tsx"),s("span",{style:{color:"#89DDFF"}},'"'),s("span",{style:{color:"#89DDFF"}},">")]),l(`
`),s("span",{class:"line"},[s("span",{style:{color:"#89DDFF"}},"import"),s("span",{style:{color:"#A6ACCD"}}," "),s("span",{style:{color:"#89DDFF"}},"{"),s("span",{style:{color:"#F07178"}}," "),s("span",{style:{color:"#A6ACCD"}},"shallowRef"),s("span",{style:{color:"#F07178"}}," "),s("span",{style:{color:"#89DDFF"}},"}"),s("span",{style:{color:"#A6ACCD"}}," "),s("span",{style:{color:"#89DDFF"}},"from"),s("span",{style:{color:"#A6ACCD"}}," "),s("span",{style:{color:"#89DDFF"}},"'"),s("span",{style:{color:"#C3E88D"}},"vue"),s("span",{style:{color:"#89DDFF"}},"'")]),l(`
`),s("span",{class:"line"}),l(`
`),s("span",{class:"line"},[s("span",{style:{color:"#C792EA"}},"const"),s("span",{style:{color:"#A6ACCD"}}," lvConfig "),s("span",{style:{color:"#89DDFF"}},"="),s("span",{style:{color:"#A6ACCD"}}," "),s("span",{style:{color:"#82AAFF"}},"shallowRef"),s("span",{style:{color:"#A6ACCD"}},"("),s("span",{style:{color:"#89DDFF"}},"{")]),l(`
`),s("span",{class:"line"},[s("span",{style:{color:"#A6ACCD"}},"  "),s("span",{style:{color:"#F07178"}},"filterFields"),s("span",{style:{color:"#89DDFF"}},":"),s("span",{style:{color:"#A6ACCD"}}," ["),s("span",{style:{color:"#89DDFF"}},"{"),s("span",{style:{color:"#A6ACCD"}}," "),s("span",{style:{color:"#F07178"}},"type"),s("span",{style:{color:"#89DDFF"}},":"),s("span",{style:{color:"#A6ACCD"}}," "),s("span",{style:{color:"#89DDFF"}},"'"),s("span",{style:{color:"#C3E88D"}},"text"),s("span",{style:{color:"#89DDFF"}},"'"),s("span",{style:{color:"#89DDFF"}},","),s("span",{style:{color:"#A6ACCD"}}," "),s("span",{style:{color:"#F07178"}},"model"),s("span",{style:{color:"#89DDFF"}},":"),s("span",{style:{color:"#A6ACCD"}}," "),s("span",{style:{color:"#89DDFF"}},"'"),s("span",{style:{color:"#C3E88D"}},"name"),s("span",{style:{color:"#89DDFF"}},"'"),s("span",{style:{color:"#89DDFF"}},","),s("span",{style:{color:"#A6ACCD"}}," "),s("span",{style:{color:"#F07178"}},"label"),s("span",{style:{color:"#89DDFF"}},":"),s("span",{style:{color:"#A6ACCD"}}," "),s("span",{style:{color:"#89DDFF"}},"'"),s("span",{style:{color:"#C3E88D"}},"name"),s("span",{style:{color:"#89DDFF"}},"'"),s("span",{style:{color:"#A6ACCD"}}," "),s("span",{style:{color:"#89DDFF"}},"}"),s("span",{style:{color:"#A6ACCD"}},"]"),s("span",{style:{color:"#89DDFF"}},",")]),l(`
`),s("span",{class:"line"},[s("span",{style:{color:"#A6ACCD"}},"  "),s("span",{style:{color:"#F07178"}},"tableColumns"),s("span",{style:{color:"#89DDFF"}},":"),s("span",{style:{color:"#A6ACCD"}}," [")]),l(`
`),s("span",{class:"line"},[s("span",{style:{color:"#A6ACCD"}},"    "),s("span",{style:{color:"#89DDFF"}},"{"),s("span",{style:{color:"#A6ACCD"}}," "),s("span",{style:{color:"#F07178"}},"label"),s("span",{style:{color:"#89DDFF"}},":"),s("span",{style:{color:"#A6ACCD"}}," "),s("span",{style:{color:"#89DDFF"}},"'"),s("span",{style:{color:"#C3E88D"}},"id"),s("span",{style:{color:"#89DDFF"}},"'"),s("span",{style:{color:"#89DDFF"}},","),s("span",{style:{color:"#A6ACCD"}}," "),s("span",{style:{color:"#F07178"}},"prop"),s("span",{style:{color:"#89DDFF"}},":"),s("span",{style:{color:"#A6ACCD"}}," "),s("span",{style:{color:"#89DDFF"}},"'"),s("span",{style:{color:"#C3E88D"}},"id"),s("span",{style:{color:"#89DDFF"}},"'"),s("span",{style:{color:"#89DDFF"}},","),s("span",{style:{color:"#A6ACCD"}}," "),s("span",{style:{color:"#F07178"}},"width"),s("span",{style:{color:"#89DDFF"}},":"),s("span",{style:{color:"#A6ACCD"}}," "),s("span",{style:{color:"#F78C6C"}},"120"),s("span",{style:{color:"#A6ACCD"}}," "),s("span",{style:{color:"#89DDFF"}},"},")]),l(`
`),s("span",{class:"line"},[s("span",{style:{color:"#A6ACCD"}},"    "),s("span",{style:{color:"#89DDFF"}},"{"),s("span",{style:{color:"#A6ACCD"}}," "),s("span",{style:{color:"#F07178"}},"label"),s("span",{style:{color:"#89DDFF"}},":"),s("span",{style:{color:"#A6ACCD"}}," "),s("span",{style:{color:"#89DDFF"}},"'"),s("span",{style:{color:"#C3E88D"}},"name"),s("span",{style:{color:"#89DDFF"}},"'"),s("span",{style:{color:"#89DDFF"}},","),s("span",{style:{color:"#A6ACCD"}}," "),s("span",{style:{color:"#F07178"}},"prop"),s("span",{style:{color:"#89DDFF"}},":"),s("span",{style:{color:"#A6ACCD"}}," "),s("span",{style:{color:"#89DDFF"}},"'"),s("span",{style:{color:"#C3E88D"}},"name"),s("span",{style:{color:"#89DDFF"}},"'"),s("span",{style:{color:"#A6ACCD"}}," "),s("span",{style:{color:"#89DDFF"}},"},")]),l(`
`),s("span",{class:"line"},[s("span",{style:{color:"#A6ACCD"}},"  ]"),s("span",{style:{color:"#89DDFF"}},",")]),l(`
`),s("span",{class:"line"},[s("span",{style:{color:"#A6ACCD"}},"  "),s("span",{style:{color:"#F07178"}},"contentDataMap"),s("span",{style:{color:"#89DDFF"}},":"),s("span",{style:{color:"#A6ACCD"}}," "),s("span",{style:{color:"#89DDFF"}},"{")]),l(`
`),s("span",{class:"line"},[s("span",{style:{color:"#A6ACCD"}},"    "),s("span",{style:{color:"#F07178"}},"items"),s("span",{style:{color:"#89DDFF"}},":"),s("span",{style:{color:"#A6ACCD"}}," "),s("span",{style:{color:"#89DDFF"}},"'"),s("span",{style:{color:"#C3E88D"}},"custom_result.items"),s("span",{style:{color:"#89DDFF"}},"'"),s("span",{style:{color:"#89DDFF"}},",")]),l(`
`),s("span",{class:"line"},[s("span",{style:{color:"#A6ACCD"}},"    "),s("span",{style:{color:"#F07178"}},"total"),s("span",{style:{color:"#89DDFF"}},":"),s("span",{style:{color:"#A6ACCD"}}," "),s("span",{style:{color:"#89DDFF"}},"'"),s("span",{style:{color:"#C3E88D"}},"custom_result.total"),s("span",{style:{color:"#89DDFF"}},"'"),s("span",{style:{color:"#89DDFF"}},",")]),l(`
`),s("span",{class:"line"},[s("span",{style:{color:"#A6ACCD"}},"  "),s("span",{style:{color:"#89DDFF"}},"},")]),l(`
`),s("span",{class:"line"},[s("span",{style:{color:"#A6ACCD"}},"  "),s("span",{style:{color:"#F07178"}},"validateResponse"),s("span",{style:{color:"#89DDFF"}},"("),s("span",{style:{color:"#A6ACCD"}},"res"),s("span",{style:{color:"#89DDFF"}},")"),s("span",{style:{color:"#A6ACCD"}}," "),s("span",{style:{color:"#89DDFF"}},"{")]),l(`
`),s("span",{class:"line"},[s("span",{style:{color:"#F07178"}},"    "),s("span",{style:{color:"#89DDFF"}},"try"),s("span",{style:{color:"#F07178"}}," "),s("span",{style:{color:"#89DDFF"}},"{")]),l(`
`),s("span",{class:"line"},[s("span",{style:{color:"#F07178"}},"      "),s("span",{style:{color:"#89DDFF"}},"return"),s("span",{style:{color:"#F07178"}}," "),s("span",{style:{color:"#A6ACCD"}},"res"),s("span",{style:{color:"#89DDFF"}},"."),s("span",{style:{color:"#A6ACCD"}},"is_success")]),l(`
`),s("span",{class:"line"},[s("span",{style:{color:"#F07178"}},"    "),s("span",{style:{color:"#89DDFF"}},"}"),s("span",{style:{color:"#F07178"}}," "),s("span",{style:{color:"#89DDFF"}},"catch"),s("span",{style:{color:"#F07178"}}," ("),s("span",{style:{color:"#A6ACCD"}},"e"),s("span",{style:{color:"#F07178"}},") "),s("span",{style:{color:"#89DDFF"}},"{")]),l(`
`),s("span",{class:"line"},[s("span",{style:{color:"#F07178"}},"      "),s("span",{style:{color:"#89DDFF"}},"return"),s("span",{style:{color:"#F07178"}}," "),s("span",{style:{color:"#FF9CAC"}},"false")]),l(`
`),s("span",{class:"line"},[s("span",{style:{color:"#F07178"}},"    "),s("span",{style:{color:"#89DDFF"}},"}")]),l(`
`),s("span",{class:"line"},[s("span",{style:{color:"#F07178"}},"  "),s("span",{style:{color:"#89DDFF"}},"},")]),l(`
`),s("span",{class:"line"},[s("span",{style:{color:"#A6ACCD"}},"  "),s("span",{style:{color:"#F07178"}},"requestHandler"),s("span",{style:{color:"#89DDFF"}},"("),s("span",{style:{color:"#A6ACCD"}},"requestData"),s("span",{style:{color:"#89DDFF"}},")"),s("span",{style:{color:"#A6ACCD"}}," "),s("span",{style:{color:"#89DDFF"}},"{")]),l(`
`),s("span",{class:"line"},[s("span",{style:{color:"#F07178"}},"    "),s("span",{style:{color:"#89DDFF"}},"return"),s("span",{style:{color:"#F07178"}}," "),s("span",{style:{color:"#89DDFF"}},"new"),s("span",{style:{color:"#F07178"}}," "),s("span",{style:{color:"#FFCB6B"}},"Promise"),s("span",{style:{color:"#F07178"}},"("),s("span",{style:{color:"#89DDFF"}},"("),s("span",{style:{color:"#A6ACCD"}},"resolve"),s("span",{style:{color:"#89DDFF"}},")"),s("span",{style:{color:"#F07178"}}," "),s("span",{style:{color:"#C792EA"}},"=>"),s("span",{style:{color:"#F07178"}}," "),s("span",{style:{color:"#89DDFF"}},"{")]),l(`
`),s("span",{class:"line"},[s("span",{style:{color:"#F07178"}},"      "),s("span",{style:{color:"#82AAFF"}},"setTimeout"),s("span",{style:{color:"#F07178"}},"("),s("span",{style:{color:"#89DDFF"}},"()"),s("span",{style:{color:"#F07178"}}," "),s("span",{style:{color:"#C792EA"}},"=>"),s("span",{style:{color:"#F07178"}}," "),s("span",{style:{color:"#89DDFF"}},"{")]),l(`
`),s("span",{class:"line"},[s("span",{style:{color:"#F07178"}},"        "),s("span",{style:{color:"#82AAFF"}},"resolve"),s("span",{style:{color:"#F07178"}},"("),s("span",{style:{color:"#89DDFF"}},"{")]),l(`
`),s("span",{class:"line"},[s("span",{style:{color:"#F07178"}},"          is_success"),s("span",{style:{color:"#89DDFF"}},":"),s("span",{style:{color:"#F07178"}}," "),s("span",{style:{color:"#FF9CAC"}},"true"),s("span",{style:{color:"#89DDFF"}},",")]),l(`
`),s("span",{class:"line"},[s("span",{style:{color:"#F07178"}},"          custom_result"),s("span",{style:{color:"#89DDFF"}},":"),s("span",{style:{color:"#F07178"}}," "),s("span",{style:{color:"#89DDFF"}},"{")]),l(`
`),s("span",{class:"line"},[s("span",{style:{color:"#F07178"}},"            items"),s("span",{style:{color:"#89DDFF"}},":"),s("span",{style:{color:"#F07178"}}," [")]),l(`
`),s("span",{class:"line"},[s("span",{style:{color:"#F07178"}},"              "),s("span",{style:{color:"#89DDFF"}},"{"),s("span",{style:{color:"#F07178"}}," id"),s("span",{style:{color:"#89DDFF"}},":"),s("span",{style:{color:"#F07178"}}," "),s("span",{style:{color:"#89DDFF"}},"'"),s("span",{style:{color:"#C3E88D"}},"id10001"),s("span",{style:{color:"#89DDFF"}},"'"),s("span",{style:{color:"#89DDFF"}},","),s("span",{style:{color:"#F07178"}}," name"),s("span",{style:{color:"#89DDFF"}},":"),s("span",{style:{color:"#F07178"}}," "),s("span",{style:{color:"#89DDFF"}},"`"),s("span",{style:{color:"#C3E88D"}},"name10001"),s("span",{style:{color:"#89DDFF"}},"${"),s("span",{style:{color:"#A6ACCD"}},"requestData"),s("span",{style:{color:"#89DDFF"}},"."),s("span",{style:{color:"#A6ACCD"}},"name "),s("span",{style:{color:"#89DDFF"}},"||"),s("span",{style:{color:"#A6ACCD"}}," "),s("span",{style:{color:"#89DDFF"}},"''}`"),s("span",{style:{color:"#F07178"}}," "),s("span",{style:{color:"#89DDFF"}},"},")]),l(`
`),s("span",{class:"line"},[s("span",{style:{color:"#F07178"}},"              "),s("span",{style:{color:"#89DDFF"}},"{"),s("span",{style:{color:"#F07178"}}," id"),s("span",{style:{color:"#89DDFF"}},":"),s("span",{style:{color:"#F07178"}}," "),s("span",{style:{color:"#89DDFF"}},"'"),s("span",{style:{color:"#C3E88D"}},"id10002"),s("span",{style:{color:"#89DDFF"}},"'"),s("span",{style:{color:"#89DDFF"}},","),s("span",{style:{color:"#F07178"}}," name"),s("span",{style:{color:"#89DDFF"}},":"),s("span",{style:{color:"#F07178"}}," "),s("span",{style:{color:"#89DDFF"}},"`"),s("span",{style:{color:"#C3E88D"}},"name10002"),s("span",{style:{color:"#89DDFF"}},"${"),s("span",{style:{color:"#A6ACCD"}},"requestData"),s("span",{style:{color:"#89DDFF"}},"."),s("span",{style:{color:"#A6ACCD"}},"name "),s("span",{style:{color:"#89DDFF"}},"||"),s("span",{style:{color:"#A6ACCD"}}," "),s("span",{style:{color:"#89DDFF"}},"''}`"),s("span",{style:{color:"#F07178"}}," "),s("span",{style:{color:"#89DDFF"}},"},")]),l(`
`),s("span",{class:"line"},[s("span",{style:{color:"#F07178"}},"            ]"),s("span",{style:{color:"#89DDFF"}},",")]),l(`
`),s("span",{class:"line"},[s("span",{style:{color:"#F07178"}},"            total"),s("span",{style:{color:"#89DDFF"}},":"),s("span",{style:{color:"#F07178"}}," "),s("span",{style:{color:"#F78C6C"}},"2"),s("span",{style:{color:"#89DDFF"}},",")]),l(`
`),s("span",{class:"line"},[s("span",{style:{color:"#F07178"}},"          "),s("span",{style:{color:"#89DDFF"}},"},")]),l(`
`),s("span",{class:"line"},[s("span",{style:{color:"#F07178"}},"        "),s("span",{style:{color:"#89DDFF"}},"}"),s("span",{style:{color:"#F07178"}},")")]),l(`
`),s("span",{class:"line"},[s("span",{style:{color:"#F07178"}},"      "),s("span",{style:{color:"#89DDFF"}},"},"),s("span",{style:{color:"#F07178"}}," "),s("span",{style:{color:"#F78C6C"}},"800"),s("span",{style:{color:"#F07178"}},")")]),l(`
`),s("span",{class:"line"},[s("span",{style:{color:"#F07178"}},"    "),s("span",{style:{color:"#89DDFF"}},"}"),s("span",{style:{color:"#F07178"}},")")]),l(`
`),s("span",{class:"line"},[s("span",{style:{color:"#F07178"}},"  "),s("span",{style:{color:"#89DDFF"}},"},")]),l(`
`),s("span",{class:"line"},[s("span",{style:{color:"#89DDFF"}},"}"),s("span",{style:{color:"#A6ACCD"}},")")]),l(`
`),s("span",{class:"line"},[s("span",{style:{color:"#89DDFF"}},"</"),s("span",{style:{color:"#F07178"}},"script"),s("span",{style:{color:"#89DDFF"}},">")]),l(`
`),s("span",{class:"line"})])])],-1),v=JSON.parse('{"title":"\u81EA\u5B9A\u4E49\u8BF7\u6C42\u65B9\u6CD5","description":"","frontmatter":{"title":"\u81EA\u5B9A\u4E49\u8BF7\u6C42\u65B9\u6CD5","layout":"page"},"headers":[],"relativePath":"demo/request-handler.md"}'),E={name:"demo/request-handler.md"},h=Object.assign(E,{setup(c){return(n,o)=>{const e=a("DemoBox");return t(),i("div",null,[m(e,{demo:d},{default:u(()=>[_]),_:1})])}}});export{v as __pageData,h as default};