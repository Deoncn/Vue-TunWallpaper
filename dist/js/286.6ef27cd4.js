"use strict";(self["webpackChunkapp"]=self["webpackChunkapp"]||[]).push([[286],{7286:function(e,t,o){o.r(t),o.d(t,{default:function(){return p}});var s=o(4562),n=o(266),r=o(2118),c=o(1713),l=o(9780),a=function(){var e=this,t=e._self._c;return t(r.Z,[t(c.Z,[t(n.Z,{attrs:{cols:"12",sm:"6",align:"center"}},[t("h1",[e._v(" 收藏 ❤ 本地持久化 ")])])],1),t(c.Z,[t(n.Z,{attrs:{cols:"12",sm:"2"}},[t(s.Z,{attrs:{outlined:""},on:{click:function(t){return e.getObject()}}},[e._v("查 所有数据")])],1),t(n.Z,{attrs:{cols:"12",sm:"2"}},[t(s.Z,{attrs:{outlined:""},on:{click:function(t){return e.addObject()}}},[e._v("添加")])],1),t(n.Z,{attrs:{cols:"12",sm:"1"}},[t(l.Z,{attrs:{dense:"",outlined:""},model:{value:e.deleteId,callback:function(t){e.deleteId=t},expression:"deleteId"}})],1),t(n.Z,{attrs:{cols:"12",sm:"2"}},[t(s.Z,{attrs:{outlined:""},on:{click:function(t){return e.deletObject(e.deleteId)}}},[e._v("删除")])],1)],1),t(c.Z,[t(n.Z,{attrs:{cols:"12",sm:"6",align:"center"}},[t("h1",[e._v(" 设置 本地持久化 ")])])],1),t(c.Z,[t(n.Z,{attrs:{cols:"12",sm:"2"}},[t(s.Z,{attrs:{outlined:""},on:{click:function(t){return e.getdefaultObject()}}},[e._v("查 所有数据")])],1),t(n.Z,{attrs:{cols:"12",sm:"2"}},[t(s.Z,{attrs:{outlined:""},on:{click:function(t){return e.heloo()}}},[e._v("添加")])],1),t(n.Z,{attrs:{cols:"12",sm:"2"}},[t(s.Z,{attrs:{outlined:""},on:{click:function(t){return e.heloo()}}},[e._v("删除")])],1),t(n.Z,{attrs:{cols:"12",sm:"2"}},[t(s.Z,{attrs:{outlined:""},on:{click:function(t){return e.defaultstate()}}},[e._v(" 创建 数据仓库 ")])],1)],1),t(c.Z,[t(n.Z,{attrs:{cols:"12",sm:"6",align:"center"}},[t("h1",[e._v(" 数据库初始化相关 ")])])],1),t(c.Z,[t(n.Z,{attrs:{cols:"12",sm:"2"}},[t(s.Z,{attrs:{outlined:""},on:{click:function(t){return e.openindexedDB()}}},[e._v(" 数据库 初始化 ")])],1),t(n.Z,{attrs:{cols:"12",sm:"2"}},[t(s.Z,{attrs:{outlined:""},on:{click:function(t){return e.openObjectstore()}}},[e._v(" 创建 数据仓库 ")])],1),t(s.Z,{attrs:{outlined:""},on:{click:function(t){return e.testapi()}}},[e._v(" 判断存在于否 ")])],1)],1)},i=[],d=o(629),u={data:()=>({deleteId:0}),computed:(0,d.rn)({Defaultstate:"Defaultstate"}),methods:{...(0,d.OI)("favorites",{GreateIt:"BUILD_IDB_FV"}),openindexedDB(){const e="ttbz_test";var t=indexedDB.open(e,30);t.onerror=e=>{console.log("错误控制台输出",e),console.error(`Database error: ${e.target.errorCode}`)},t.onupgradeneeded=e=>{var t=e.target.result;this.db=t},console.log(this.db)},testapi(){const e="ttbz_wallpaper",t=indexedDB.open(e);t.onerror=e=>{console.log("错误控制台输出",e),console.error(`Database error: ${e.target.errorCode}`)},t.onupgradeneeded=e=>{const t=e.target.result;this.db=t;const o=t.createObjectStore("favorites",{keyPath:"id"});console.log("HELLO",o)},t.onsuccess=e=>{const t=e.target.result;console.log(t);t.transaction("favorites").objectStore("favorites")}},openObjectstore(){const e="ttbz_wallpaper",t=indexedDB.open(e);t.onerror=e=>{console.log("错误控制台输出",e),console.error(`Database error: ${e.target.errorCode}`)},t.onupgradeneeded=e=>{const t=e.target.result;this.db=t;const o=t.createObjectStore("favorites",{keyPath:"id"});o.createIndex("id","id",{unique:!0}),o.transaction.oncomplete=e=>{console.log(e);t.transaction("favorites","readwrite").objectStore("favorites")},console.log(this.db)}},defaultstate(){const e=[{fullscreen:!1,detail:!1,animation:!1,hdmode:!1,compact:!1,size:"24"}],t="ttbz_wallpaper",o=indexedDB.open(t,2);o.onerror=e=>{console.log(e.target.result)},o.onsuccess=e=>{const t=e.target.result;this.db=t,console.log(this.db)},o.onupgradeneeded=t=>{const o=t.target.result,s=o.createObjectStore("settings");s.transaction.oncomplete=t=>{console.log(t);const s=o.transaction("settings","readwrite").objectStore("settings");s.add(e,101).onsuccess=e=>{console.log(e)}}}},connectStore(){const e="ttbz_wallpaper",t=indexedDB.open(e);t.onerror=e=>{console.log("发生错误！",e)},t.onsuccess=e=>{const t=e.target.result;this.db=t,console.log(this.db)}},addObject(){const e=[{id:135,res:"3840 x 2160",type:"风景",description:"壁纸; 风景",src:"https://deoncnone.oss-cn-chengdu.aliyuncs.com/2022-11-10/0fd60bb7aac04e638098c87c4fb627e2.png",time:null,isfmo:!1},{id:135,res:"3840 x 2160",type:"风景",description:"壁纸; 风景",src:"https://deoncnone.oss-cn-chengdu.aliyuncs.com/2022-11-10/0fd60bb7aac04e638098c87c4fb627e2.png",time:null,isfmo:!1}],t=this.db,o=t.transaction(["favorites"],"readwrite");o.oncomplete=e=>{console.log("All done!",e)},o.onerror=e=>{console.log("error!",e)};const s=o.objectStore("favorites");e.forEach((e=>{const t=s.add(e);t.onsuccess=e=>{console.log(e)}}))},deletObject(e){console.log(e);const t=Number(e),o=this.db,s=o.transaction(["favorites"],"readwrite").objectStore("favorites").delete(t);s.onerror=e=>{console.log("错误控制台输出",e),console.error(`Database error: ${e.target.errorCode}`)},s.onsuccess=e=>{console.log("It's gone!",e)}},getObject(){const e=this.db,t=e.transaction("favorites").objectStore("favorites");t.openCursor().onsuccess=e=>{const t=e.target.result;t?(console.log(`Name for id ${t.key} is ${t.value.f}`),t.continue()):console.log("No more entries!")}},getdefaultObject(){const e=this.db,t=e.transaction("settings").objectStore("settings");t.openCursor().onsuccess=e=>{const t=e.target.result;t?(console.log(`Name for id ${t.key} is ${t.value}`),console.log(t.value),t.continue()):console.log("No more entries!")}}},created(){console.clear()}},g=u,b=o(1001),f=(0,b.Z)(g,a,i,!1,null,null,null),p=f.exports}}]);
//# sourceMappingURL=286.6ef27cd4.js.map