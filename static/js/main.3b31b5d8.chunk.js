(this.webpackJsonpuchihack=this.webpackJsonpuchihack||[]).push([[0],{176:function(e,t,n){},177:function(e,t,n){},282:function(e,t,n){"use strict";n.r(t);var r=n(0),s=n.n(r),a=n(31),c=n.n(a),i=(n(176),n(177),n(19)),o=n.n(i),u=n(28);n(178);var l=function(){var e={socket:null,init:function(){return e},getSession:function(){return document.cookie.split(";").find((function(e){return e.startsWith("session_id")}))},setSession:function(e){if(e.length)document.cookie="session_id="+e;else{var t=new Date;t.setTime(t.getTime()-1),document.cookie="session_id=; expires="+t.toGMTString()}},request:function(t){var n=arguments;return Object(u.a)(o.a.mark((function r(){var s,a,c;return o.a.wrap((function(r){for(;;)switch(r.prev=r.next){case 0:if(s=n.length>1&&void 0!==n[1]?n[1]:{},a=t.type||"http",c=Object.assign({},t,{session:e.getSession()}),"http"!==a){r.next=7;break}return r.abrupt("return",e.httpRequest(c,s.timeout));case 7:return r.abrupt("return",e.wsRequest(c,s));case 8:case"end":return r.stop()}}),r)})))()},httpRequest:function(e,t){return Object(u.a)(o.a.mark((function t(){var n;return o.a.wrap((function(t){for(;;)switch(t.prev=t.next){case 0:return delete(n=Object.assign({},e)).url,t.abrupt("return",fetch(e.url,{method:"POST",body:JSON.stringify(n||"")}));case 3:case"end":return t.stop()}}),t)})))()},wsRequest:function(t,n){var r=this;return Object(u.a)(o.a.mark((function s(){var a,c,i,u,l,d;return o.a.wrap((function(s){for(;;)switch(s.prev=s.next){case 0:if(a=t.message,c=t.data,i=n.needResponse,u=n.responseMessage,l=n.timeout,e.wsSend(a,c),!i){s.next=8;break}return s.next=6,r.waitEvent(u,l);case 6:return d=s.sent,s.abrupt("return",d);case 8:return s.abrupt("return",!0);case 9:case"end":return s.stop()}}),s)})))()},wsSend:function(t,n){if(!e.socket)throw new Error("Request sent before initialization finished!");e.socket.emit(t,n)},on:function(t,n){e.socket.on(t,n)},waitEvent:function(t){var n=arguments;return Object(u.a)(o.a.mark((function r(){var s;return o.a.wrap((function(r){for(;;)switch(r.prev=r.next){case 0:return s=n.length>1&&void 0!==n[1]?n[1]:15e3,r.abrupt("return",new Promise((function(n,r){var a=function(e){n(e)};e.socket.on(t,a),setTimeout((function(){e.socket.off(t,a),r("Time limit exceeded")}),s)})));case 2:case"end":return r.stop()}}),r)})))()}};return e},d=n(13),j=n(7),p=function(e){return Object(j.jsxs)("article",{children:[Object(j.jsx)("h2",{children:"\u041f\u0440\u0438\u0432\u0435\u0442, \u0434\u0440\u0443\u0433!"}),Object(j.jsx)("p",{children:"\u0422\u044b \u043e\u043a\u0430\u0437\u0430\u043b\u0441\u044f \u043d\u0430 \u043f\u043b\u0430\u0442\u0444\u043e\u0440\u043c\u0435, \u0433\u0434\u0435 \u043c\u043e\u0436\u0435\u0448\u044c \u043f\u043e\u043c\u043e\u0447\u044c \u0434\u0440\u0443\u0433\u0438\u043c \u0438\u043b\u0438 \u0441\u0430\u043c \u043f\u043e\u043b\u0443\u0447\u0438\u0442\u044c \u043f\u043e\u043c\u043e\u0449\u044c \u043f\u043e \u043a\u0430\u043a\u0438\u043c-\u043b\u0438\u0431\u043e \u0432\u043e\u043f\u0440\u043e\u0441\u0430\u043c \u043f\u043e \u043f\u0440\u0435\u0434\u043c\u0435\u0442\u0430\u043c \u0448\u043a\u043e\u043b\u044c\u043d\u043e\u0439 \u043f\u0440\u043e\u0433\u0440\u0430\u043c\u043c\u044b."}),Object(j.jsx)("p",{children:"\u0427\u0435\u043c \u0431\u043e\u043b\u044c\u0448\u0435\u043c\u0443 \u043a\u043e\u043b\u0438\u0447\u0435\u0441\u0442\u0432\u0443 \u043b\u044e\u0434\u0435\u0439 \u0442\u044b \u043f\u043e\u043c\u043e\u0436\u0435\u0448\u044c, \u0442\u0435\u043c \u0431\u043e\u043b\u044c\u0448\u0435 \u0443 \u0442\u0435\u0431\u044f \u0431\u0443\u0434\u0435\u0442 \u0431\u0430\u043b\u043b\u043e\u0432 \u0438 \u0442\u0435\u043c \u0432\u044b\u0448\u0435 \u0442\u044b \u0431\u0443\u0434\u0435\u0448\u044c \u0432 \u043e\u0431\u0449\u0435\u043c \u0440\u0435\u0439\u0442\u0438\u043d\u0433\u0435"}),Object(j.jsx)("p",{children:"\u0421 \u0434\u0440\u0443\u0433\u043e\u0439 \u0441\u0442\u043e\u0440\u043e\u043d\u044b, \u0442\u044b \u043c\u043e\u0436\u0435\u0448\u044c \u043f\u043e\u043c\u043e\u0447\u044c \u0434\u0440\u0443\u0433\u0438\u043c \u043f\u043e\u0447\u0443\u0432\u0441\u0442\u0432\u043e\u0432\u0430\u0442\u044c \u0441\u0432\u043e\u044e \u0432\u0430\u0436\u043d\u043e\u0441\u0442\u044c \u0438 \u043d\u0443\u0436\u043d\u043e\u0441\u0442\u044c, \u043f\u043e\u043c\u0435\u0447\u0430\u044f \u0441\u0430\u043c\u044b\u0439 \u043a\u0440\u0443\u0442\u043e\u0439 \u043e\u0442\u0432\u0435\u0442 \u0438 \u0440\u0430\u0441\u043f\u0440\u0435\u0434\u0435\u043b\u044f\u044f \u0431\u0430\u043b\u043b\u044b \u0437\u0430 \u0432\u043e\u043f\u0440\u043e\u0441 (\u043f\u043e\u0434\u0440\u043e\u0431\u043d\u0435\u0435 \u0431\u0443\u0434\u0435\u0442 \u0432 \u043f\u0443\u0442\u0435\u0432\u043e\u0434\u0438\u0442\u0435\u043b\u0435)"}),Object(j.jsx)("p",{children:"\u041c\u044b \u043d\u0430\u0434\u0435\u0435\u043c\u0441\u044f, \u0442\u044b \u043f\u043e\u043b\u0443\u0447\u0438\u0448\u044c \u0443\u0434\u043e\u0432\u043e\u043b\u044c\u0441\u0442\u0432\u0438\u0435 \u043e\u0442 \u043f\u0443\u0442\u0435\u0448\u0435\u0441\u0442\u0432\u0438\u044f \u043f\u043e \u0441\u0438\u0441\u0442\u0435\u043c\u0435 \u041c\u0412\u041e #25"}),Object(j.jsx)("p",{children:"\u041a\u043e\u043c\u0430\u043d\u0434\u0430 \u041c\u0412\u041e"})]})},m=n(291),b=n(289),f=n(292),h=n(45),g=n(294),x=n(295),O=function(){var e=Object(r.useContext)(H),t=e.getStore("user"),n=e.getStore("selectedPage"),s=function(){var e=Object(u.a)(o.a.mark((function e(r){return o.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return e.prev=0,e.next=3,t.actions.login(r.username,r.password);case 3:n.actions.setSelected("questions"),c.a.render(null,document.getElementById("notification")),e.next=10;break;case 7:e.prev=7,e.t0=e.catch(0),c.a.render(Object(j.jsx)(m.a,{message:"\u0423\u043f\u0441 :(",description:e.t0.message,type:"error",closable:!0}),document.getElementById("notification"));case 10:case"end":return e.stop()}}),e,null,[[0,7]])})));return function(t){return e.apply(this,arguments)}}();return Object(j.jsxs)(b.a,{name:"normal_login",className:"login-form",onFinish:s,children:[Object(j.jsx)(b.a.Item,{name:"username",rules:[{required:!0,message:"\u0412\u0432\u0435\u0434\u0438\u0442\u0435 \u043b\u043e\u0433\u0438\u043d!"}],children:Object(j.jsx)(f.a,{prefix:Object(j.jsx)(g.a,{className:"site-form-item-icon"}),placeholder:"\u041b\u043e\u0433\u0438\u043d"})}),Object(j.jsx)(b.a.Item,{name:"password",rules:[{required:!0,message:"\u0412\u0432\u0435\u0434\u0438\u0442\u0435 \u043f\u0430\u0440\u043e\u043b\u044c!"}],children:Object(j.jsx)(f.a,{prefix:Object(j.jsx)(x.a,{className:"site-form-item-icon"}),type:"password",placeholder:"\u041f\u0430\u0440\u043e\u043b\u044c"})}),Object(j.jsx)(b.a.Item,{children:Object(j.jsx)(h.a,{type:"primary",htmlType:"submit",className:"login-form-button",children:"\u0412\u043e\u0439\u0442\u0438"})})]})},v=n(65),w=n(290),k=n(288),I=n(47),y=n.n(I),q=f.a.TextArea,L=function(e){var t=e.record,n=Object(r.useContext)(H),s=n.getStore("user"),a=n.getStore("questions"),c=!t||t.user_id===s.user_id,i=b.a.useForm(),l=Object(v.a)(i,1)[0],d=n.getStore("categories"),p=d.isLoaded,m=d.isLoading,g=d.categories,x=d.actions.getCategories;p||m||x(),l.setFieldsValue(function(e){var t=Object.assign({},e);return t.created?t.created=y()(t.created):delete t.created,t.updated?t.updated=y()(t.updated):delete t.updated,t}(t));var O=function(){var e=Object(u.a)(o.a.mark((function e(t){var n,r;return o.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return(n=Object.assign({},t)).user_id=s.user_id,e.next=4,a.actions.createQuestion(n);case 4:r=e.sent,a.actions.getQuestions(),l.setFieldsValue(r[0]);case 7:case"end":return e.stop()}}),e)})));return function(t){return e.apply(this,arguments)}}();return Object(j.jsx)("fieldset",{disabled:!c,children:Object(j.jsxs)(b.a,{form:l,name:"questions",style:{padding:"1em"},onFinish:function(e){return O(e)},labelCol:{span:2},wrapperCol:{span:18},children:[function(){if(t)return Object(j.jsx)(b.a.Item,{label:"\u0410\u0432\u0442\u043e\u0440",children:Object(j.jsx)("span",{children:"".concat(t.user_name||""," ").concat(t.user_surname||"")})})}(),Object(j.jsx)(b.a.Item,{name:"name",label:"\u041d\u0430\u0437\u0432\u0430\u043d\u0438\u0435",rules:[{required:!0}],children:Object(j.jsx)(f.a,{})}),Object(j.jsx)(b.a.Item,{name:"category_id",label:"\u0422\u0435\u043c\u0430",children:Object(j.jsx)(w.a,{style:{width:"100%"},dropdownStyle:{maxHeight:400,overflow:"auto"},treeData:g,placeholder:"\u0422\u0435\u043c\u0430",treeDefaultExpandAll:!0,disabled:!c})}),Object(j.jsxs)(b.a.Item,{label:"\u0421\u043e\u0437\u0434\u0430\u043d",style:{marginBottom:0},children:[Object(j.jsx)(b.a.Item,{style:{display:"inline-block",width:"calc(50% - 40px)"},name:"created",children:Object(j.jsx)(k.a,{disabled:!0})}),Object(j.jsx)("span",{style:{display:"inline-block",width:"70px",lineHeight:"32px",textAlign:"center"},children:"\u0418\u0437\u043c\u0435\u043d\u0435\u043d:"}),Object(j.jsx)(b.a.Item,{style:{display:"inline-block",width:"calc(50% - 40px)"},name:"updated",children:Object(j.jsx)(k.a,{disabled:!0})})]}),Object(j.jsx)(b.a.Item,{name:"body",label:"\u0412\u043e\u043f\u0440\u043e\u0441",rules:[{required:!0}],children:Object(j.jsx)(q,{rows:10})}),Object(j.jsx)(b.a.Item,{wrapperCol:{offset:2,span:18},className:"question-form-footer-container",children:t?c&&"\u041d\u043e\u0432\u044b\u0439"===t.status_name?Object(j.jsxs)("div",{children:[Object(j.jsx)(h.a,{type:"primary",className:"question-form-button",onClick:Object(u.a)(o.a.mark((function e(){var n,r;return o.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return(n=l.getFieldsValue()).id=t.id,e.next=4,a.actions.setQuestionAnswered(n);case 4:r=e.sent,a.actions.getQuestions(),l.setFieldsValue(r[0]);case 7:case"end":return e.stop()}}),e)}))),children:"\u041f\u043e\u043c\u0435\u0442\u0438\u0442\u044c \u043e\u0442\u0432\u0435\u0447\u0435\u043d\u043d\u044b\u043c"}),Object(j.jsx)(h.a,{className:"question-form-button",onClick:Object(u.a)(o.a.mark((function e(){var n,r;return o.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return(n=l.getFieldsValue()).id=t.id,e.next=4,a.actions.setQuestionClosed(n);case 4:r=e.sent,a.actions.getQuestions(),l.setFieldsValue(r[0]);case 7:case"end":return e.stop()}}),e)}))),children:"\u0417\u0430\u043a\u0440\u044b\u0442\u044c \u0432\u043e\u043f\u0440\u043e\u0441"})]}):void 0:Object(j.jsx)(h.a,{type:"primary",htmlType:"submit",className:"question-form-button",children:"\u0417\u0430\u0434\u0430\u0442\u044c \u0432\u043e\u043f\u0440\u043e\u0441"})})]})})},S=n(287),C=n(64),P=n(293),_=n(97),F=n(285),E=n(286),T=P.a.Panel,N=Object(C.a)((function(e){var t=e.store,n=e.categoriesStore,r=b.a.useForm(),s=Object(v.a)(r,1)[0],a=n.isLoaded,c=n.isLoading,i=n.categories,o=n.actions.getCategories;a||c||o();return Object(j.jsx)(P.a,{children:Object(j.jsx)(T,{header:"\u0424\u0438\u043b\u044c\u0442\u0440\u044b",children:Object(j.jsxs)(b.a,{form:s,name:"filters",className:"ant-advanced-search-form",onFinish:function(e){return function(e,t){Object.keys(e).forEach((function(n){"similar"!==n&&(e[n]?t.addFilter(n,e[n]):t.removeFilter(n))})),e.similar?t.actions.getQuestions(1,25,!1):t.actions.getQuestions()}(e,t)},children:[Object(j.jsx)(b.a.Item,{name:"id",label:"\u041d\u043e\u043c\u0435\u0440",children:Object(j.jsx)(f.a,{placeholder:"\u2116"})}),Object(j.jsx)(b.a.Item,{name:"name",label:"\u0412\u043e\u043f\u0440\u043e\u0441",children:Object(j.jsx)(f.a,{placeholder:"\u0412\u043e\u043f\u0440\u043e\u0441"})}),Object(j.jsx)(b.a.Item,{name:"similar",valuePropName:"checked",children:Object(j.jsx)(_.a,{children:"\u041f\u043e\u0445\u043e\u0436\u0438\u0435"})}),Object(j.jsx)(b.a.Item,{children:Object(j.jsxs)(F.a,{children:[Object(j.jsx)(E.a,{children:Object(j.jsx)(b.a.Item,{name:"created_gt",label:"\u0421\u043e\u0437\u0434\u0430\u043d",children:Object(j.jsx)(k.a,{placeholder:"\u041d\u0430\u0447\u0430\u043b\u043e"})})}),Object(j.jsx)(E.a,{style:{margin:"0 0 0 1em"},children:Object(j.jsx)(b.a.Item,{name:"created_lt",children:Object(j.jsx)(k.a,{placeholder:"\u041a\u043e\u043d\u0435\u0446"})})})]})}),Object(j.jsx)(b.a.Item,{children:Object(j.jsxs)(F.a,{children:[Object(j.jsx)(E.a,{children:Object(j.jsx)(b.a.Item,{name:"updated_gt",label:"\u041e\u0431\u043d\u043e\u0432\u043b\u0435\u043d",children:Object(j.jsx)(k.a,{placeholder:"\u041d\u0430\u0447\u0430\u043b\u043e"})})}),Object(j.jsx)(E.a,{style:{margin:"0 0 0 1em"},children:Object(j.jsx)(b.a.Item,{name:"updated_lt",children:Object(j.jsx)(k.a,{placeholder:"\u041a\u043e\u043d\u0435\u0446"})})})]})}),Object(j.jsx)(b.a.Item,{name:"category_id",label:"\u0422\u0435\u043c\u0430",children:Object(j.jsx)(w.a,{style:{width:"100%"},dropdownStyle:{maxHeight:400,overflow:"auto"},treeData:i,placeholder:"\u0422\u0435\u043c\u0430",treeDefaultExpandAll:!0})}),Object(j.jsx)(h.a,{type:"primary",htmlType:"submit",children:"\u0418\u0441\u043a\u0430\u0442\u044c"}),Object(j.jsx)(h.a,{style:{margin:"0 8px"},onClick:function(){s.resetFields(),s.submit()},children:"\u041e\u0447\u0438\u0441\u0442\u0438\u0442\u044c \u0444\u0438\u043b\u044c\u0442\u0440\u044b"})]})})})})),Q=Object(C.a)((function(e){var t=Object(r.useContext)(H),n=t.getStore("questions"),s=t.getStore("categories"),a=n.questions,c=n.total,i=n.isLoading,l=n.isLoaded,d=Object(r.useState)(1),p=Object(v.a)(d,2),m=p[0],b=p[1],f=t.getStore("user").user_id,g=[{title:"#",dataIndex:"id"},{title:"\u041d\u0430\u0437\u0432\u0430\u043d\u0438\u0435",dataIndex:"name"},{title:"\u0422\u0435\u043c\u0430",dataIndex:"category_name"},{title:"\u0421\u0442\u0430\u0442\u0443\u0441",dataIndex:"status_name"},{title:"\u0421\u043e\u0437\u0434\u0430\u043d",dataIndex:"created",render:function(e){return e?new Date(e).toLocaleString("ru"):""}},{title:"\u0418\u0437\u043c\u0435\u043d\u0435\u043d",dataIndex:"updated",render:function(e){return e?new Date(e).toLocaleString("ru"):""}},{title:"\u0411\u0430\u043b\u043b\u044b",dataIndex:"points"},{title:"\u0410\u0432\u0442\u043e\u0440",dataIndex:"user_name",render:function(e,t){return(e||"")+" "+(t.user_surname||"")}}],x=n.actions.getQuestions;return l||i||x(),Object(j.jsx)(S.a,{dataSource:a,columns:g,size:"middle",rowKey:"id",loading:i,onRow:function(e){return{onClick:function(n){t.getStore("selectedPage").actions.setSelected("question",{record:e})}}},pagination:{position:["none","bottomCenter"],defaultPageSize:25,total:c,showSizeChanger:!1,onChange:function(){var e=Object(u.a)(o.a.mark((function e(t){return o.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return b(t),e.next=3,n.actions.getQuestions(t);case 3:case"end":return e.stop()}}),e)})));return function(t){return e.apply(this,arguments)}}()},footer:function(){return Object(j.jsx)(h.a,{onClick:Object(u.a)(o.a.mark((function e(){return o.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return e.next=2,n.actions.getQuestions(m);case 2:case"end":return e.stop()}}),e)}))),children:"\u041e\u0431\u043d\u043e\u0432\u0438\u0442\u044c"})},title:function(){return Object(j.jsxs)("div",{children:[Object(j.jsxs)("h2",{children:["\u0412\u043e\u043f\u0440\u043e\u0441\u044b",function(){if(f)return Object(j.jsx)(h.a,{type:"primary",style:{margin:"0 16px"},onClick:function(){t.getStore("selectedPage").actions.setSelected("question")},children:"\u0414\u043e\u0431\u0430\u0432\u0438\u0442\u044c"})}()]}),Object(j.jsx)(N,{store:n,categoriesStore:s})]})}})})),D=Q,A=n(71),z=function(e){var t=Object(r.useContext)(H).connection,n=b.a.useForm(),s=Object(v.a)(n,1)[0],a=function(){var e=Object(u.a)(o.a.mark((function e(n){var r,s;return o.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return delete(r=Object.assign({},n)).confirm,e.prev=2,e.next=5,t.request({url:"https://uchi-hack.herokuapp.com/user/create",params:[r]});case 5:return s=e.sent,e.next=8,s.json();case 8:e.sent,c.a.render(Object(j.jsx)(m.a,{message:"\u0423\u0441\u043f\u0435\u0445!",description:"\u0420\u0435\u0433\u0438\u0441\u0442\u0440\u0430\u0446\u0438\u044f \u043f\u0440\u043e\u0448\u043b\u0430 \u0443\u0441\u043f\u0435\u0448\u043d\u043e",type:"success",closable:!0}),document.getElementById("notification")),e.next=15;break;case 12:e.prev=12,e.t0=e.catch(2),c.a.render(Object(j.jsx)(m.a,{message:"\u0423\u043f\u0441 :(",description:"\u0427\u0442\u043e-\u0442\u043e \u043f\u043e\u0448\u043b\u043e \u043d\u0435 \u0442\u0430\u043a",type:"error",closable:!0}),document.getElementById("notification"));case 15:case"end":return e.stop()}}),e,null,[[2,12]])})));return function(t){return e.apply(this,arguments)}}();return Object(j.jsxs)(b.a,Object(A.a)(Object(A.a)({form:s,name:"register",onFinish:a,style:{padding:"1em"}},{labelCol:{span:2},wrapperCol:{span:18}}),{},{scrollToFirstError:!0,children:[Object(j.jsx)(b.a.Item,{name:"login",label:"\u041b\u043e\u0433\u0438\u043d",tooltip:"\u041f\u043e \u043a\u043e\u0442\u043e\u0440\u043e\u043c\u0443 \u0432\u044b \u0431\u0443\u0434\u0435\u0442\u0435 \u0437\u0430\u0445\u043e\u0434\u0438\u0442\u044c \u043d\u0430 \u0441\u0430\u0439\u0442",rules:[{required:!0,message:"\u041b\u043e\u0433\u0438\u043d \u043d\u0435 \u043c\u043e\u0436\u0435\u0442 \u0431\u044b\u0442\u044c \u043f\u0443\u0441\u0442\u044b\u043c",whitespace:!1}],children:Object(j.jsx)(f.a,{})}),Object(j.jsx)(b.a.Item,{name:"name",label:"\u0418\u043c\u044f",tooltip:"\u041e\u0442\u043e\u0431\u0440\u0430\u0436\u0430\u0435\u043c\u043e\u0435 \u043d\u0430 \u043f\u043b\u0430\u0442\u0444\u043e\u0440\u043c\u0435",rules:[{required:!0,message:"\u0418\u043c\u044f \u043d\u0435 \u043c\u043e\u0436\u0435\u0442 \u0431\u044b\u0442\u044c \u043f\u0443\u0441\u0442\u044b\u043c",whitespace:!1}],children:Object(j.jsx)(f.a,{})}),Object(j.jsx)(b.a.Item,{name:"surname",label:"\u0424\u0430\u043c\u0438\u043b\u0438\u044f",tooltip:"\u041e\u0442\u043e\u0431\u0440\u0430\u0436\u0430\u0435\u043c\u0430\u044f \u043d\u0430 \u043f\u043b\u0430\u0442\u0444\u043e\u0440\u043c\u0435",children:Object(j.jsx)(f.a,{})}),Object(j.jsx)(b.a.Item,{name:"password",label:"\u041f\u0430\u0440\u043e\u043b\u044c",rules:[{required:!0,message:"Please input your password!"}],hasFeedback:!0,children:Object(j.jsx)(f.a.Password,{})}),Object(j.jsx)(b.a.Item,{name:"confirm",label:"\u041f\u043e\u0432\u0442\u043e\u0440 \u043f\u0430\u0440\u043e\u043b\u044f",dependencies:["password"],hasFeedback:!0,rules:[{required:!0,message:"Please confirm your password!"},function(e){var t=e.getFieldValue;return{validator:function(e,n){return n&&t("password")!==n?Promise.reject(new Error("The two passwords that you entered do not match!")):Promise.resolve()}}}],children:Object(j.jsx)(f.a.Password,{})}),Object(j.jsx)(b.a.Item,Object(A.a)(Object(A.a)({},{wrapperCol:{offset:2,span:18}}),{},{children:Object(j.jsx)(h.a,{type:"primary",htmlType:"submit",className:"register-form-button",children:"\u0417\u0430\u0440\u0435\u0433\u0438\u0441\u0442\u0440\u0438\u0440\u043e\u0432\u0430\u0442\u044c\u0441\u044f"})}))]}))},B=function(){var e={home:Object(j.jsx)(p,{}),questions:Object(j.jsx)(D,{}),question:Object(j.jsx)(L,{}),register:Object(j.jsx)(z,{}),login:Object(j.jsx)(O,{})},t={};return t.actions={setSelected:Object(d.f)((function(e){var n=arguments.length>1&&void 0!==arguments[1]?arguments[1]:{};t.selected=e,t.actions.setSelectedPageItem(e,n)})),setSelectedPageItem:Object(d.f)((function(n){var r=arguments.length>1&&void 0!==arguments[1]?arguments[1]:{},s=Object.assign({},e[n]);s.props=r,t.selectedPageItem=s}))},Object(d.i)(t,{selected:"home",selectedPageItem:e.home})},R=function(e){var t={isLoading:!1,total:0,questions:[],filters:{},currentPage:1,pageSize:25,addFilter:function(e,n){t.filters[e]=n},removeFilter:function(e){t.filters[e]&&delete t.filters[e]},actions:{setTotal:Object(d.f)((function(e){return t.total=e})),setMessages:Object(d.f)((function(e){return t.questions=e})),setLoading:Object(d.f)((function(e){return t.isLoading=e})),setIsLoaded:Object(d.f)((function(e){return t.isLoaded=e})),getQuestions:Object(d.f)(Object(u.a)(o.a.mark((function n(){var r,s,a,c,i,u,l,d=arguments;return o.a.wrap((function(n){for(;;)switch(n.prev=n.next){case 0:if(r=d.length>0&&void 0!==d[0]?d[0]:1,s=d.length>1&&void 0!==d[1]?d[1]:25,a=!(d.length>2&&void 0!==d[2])||d[2],!t.isLoading){n.next=5;break}return n.abrupt("return");case 5:return t.actions.setLoading(!0),t.currentPage=r,(c={url:"https://uchi-hack.herokuapp.com/question/".concat(a?"list":"similar"),params:a?Object(A.a)({},t.filters):[t.filters.name||""]}).params.limit=s,c.params.offset=s*(r-1),n.next=12,e.request(c);case 12:return i=n.sent,n.next=15,i.json();case 15:(u=n.sent).success&&(l=u.result,t.actions.setTotal(u.total),t.actions.setMessages(l),t.actions.setIsLoaded(!0)),t.actions.setIsLoaded(!0),t.actions.setLoading(!1);case 19:case"end":return n.stop()}}),n)})))),createQuestion:Object(d.f)(function(){var t=Object(u.a)(o.a.mark((function t(n){var r,s,a;return o.a.wrap((function(t){for(;;)switch(t.prev=t.next){case 0:return r={url:"https://uchi-hack.herokuapp.com/question/create",params:[n]},t.next=3,e.request(r);case 3:return s=t.sent,t.next=6,s.json();case 6:return a=t.sent,t.abrupt("return",a);case 8:case"end":return t.stop()}}),t)})));return function(e){return t.apply(this,arguments)}}()),setQuestionAnswered:Object(d.f)(function(){var t=Object(u.a)(o.a.mark((function t(n){var r,s,a;return o.a.wrap((function(t){for(;;)switch(t.prev=t.next){case 0:return r={url:"https://uchi-hack.herokuapp.com/question/close",params:[n.id]},t.next=3,e.request(r);case 3:return s=t.sent,t.next=6,s.json();case 6:return a=t.sent,t.abrupt("return",a);case 8:case"end":return t.stop()}}),t)})));return function(e){return t.apply(this,arguments)}}()),setQuestionClosed:Object(d.f)(function(){var t=Object(u.a)(o.a.mark((function t(n){var r,s,a;return o.a.wrap((function(t){for(;;)switch(t.prev=t.next){case 0:return r={url:"https://uchi-hack.herokuapp.com/question/cancel",params:[n.id]},t.next=3,e.request(r);case 3:return s=t.sent,t.next=6,s.json();case 6:return a=t.sent,t.abrupt("return",a);case 8:case"end":return t.stop()}}),t)})));return function(e){return t.apply(this,arguments)}}())}};return Object(d.i)(t,{questions:[],isLoading:!1,isLoaded:!1,total:0})},V=function(e){var t={nickname:null,isLoggedIn:!1,setUserData:function(e){t.actions.setAvatar(e.avatar||"https://via.placeholder.com/150"),t.actions.setUserId(e.id),t.actions.setNickname(e.login),t.info=e}};return t.actions={setNickname:Object(d.f)((function(e){return t.nickname=e})),setIsLoggedIn:Object(d.f)((function(e){return t.isLoggedIn=e})),setAvatar:Object(d.f)((function(e){return t.avatar=e})),setUserId:Object(d.f)((function(e){return t.user_id=e})),isLoggedIn:Object(d.f)(Object(u.a)(o.a.mark((function n(){var r,s,a,c;return o.a.wrap((function(n){for(;;)switch(n.prev=n.next){case 0:return n.next=2,e.request({params:[(null===(r=e.getSession())||void 0===r?void 0:r.split("=")[1])||""],url:"https://uchi-hack.herokuapp.com/user/isLoggedIn"});case 2:return s=n.sent,n.next=5,s.json();case 5:if(a=n.sent,c=a.result,a.success){n.next=9;break}throw new Error(c.error_message);case 9:c.length&&(t.setUserData(c[0]),t.actions.setIsLoggedIn(!0));case 10:case"end":return n.stop()}}),n)})))),login:Object(d.f)(function(){var n=Object(u.a)(o.a.mark((function n(r,s){var a,c,i;return o.a.wrap((function(n){for(;;)switch(n.prev=n.next){case 0:return n.next=2,e.request({params:{login:r,password:s},url:"https://uchi-hack.herokuapp.com/user/login"});case 2:return a=n.sent,n.next=5,a.json();case 5:if(c=n.sent,i=c.result,c.success){n.next=9;break}throw new Error(i.error_message);case 9:e.setSession(i.session_id),t.setUserData(i),t.actions.setIsLoggedIn(!0);case 12:case"end":return n.stop()}}),n)})));return function(e,t){return n.apply(this,arguments)}}()),logout:Object(d.f)(Object(u.a)(o.a.mark((function n(){var r,s,a;return o.a.wrap((function(n){for(;;)switch(n.prev=n.next){case 0:return n.next=2,e.request({params:[""],url:"https://uchi-hack.herokuapp.com/user/logout"});case 2:return r=n.sent,n.next=5,r.json();case 5:if(s=n.sent,a=s.result,s.success){n.next=9;break}throw new Error(a.error_message);case 9:e.setSession(""),t.setUserData({}),t.actions.setIsLoggedIn(!1);case 12:case"end":return n.stop()}}),n)}))))},Object(d.i)(t,{nickname:null,isLoggedIn:!1})},U=function(e){var t=arguments.length>1&&void 0!==arguments[1]?arguments[1]:"parent_id",n=[],r={};return e.forEach((function(e){r[e.id]=e})),e.forEach((function(e){if(e.title=e.name,e.value=e.id,e[t]){var s=r[e[t]];s.children||(s.children=[]),s.children.push(e)}else n.push(e)})),n},M=function(e){var t={isLoading:!1,isLoaded:!1,categories:[],actions:{setTotal:Object(d.f)((function(e){return t.total=e})),setCategories:Object(d.f)((function(e){return t.categories=e})),setLoading:Object(d.f)((function(e){return t.isLoading=e})),setIsLoaded:Object(d.f)((function(e){return t.isLoaded=e})),getCategories:Object(d.f)(Object(u.a)(o.a.mark((function n(){var r,s,a,c,i,u,l=arguments;return o.a.wrap((function(n){for(;;)switch(n.prev=n.next){case 0:if(r=l.length>0&&void 0!==l[0]?l[0]:1,s=l.length>1&&void 0!==l[1]?l[1]:25,!t.isLoading){n.next=4;break}return n.abrupt("return");case 4:return t.actions.setLoading(!0),t.currentPage=r,(a={url:"https://uchi-hack.herokuapp.com/category/list",params:{}}).params.limit=s,a.params.offset=s*(r-1),n.next=11,e.request(a);case 11:return c=n.sent,n.next=14,c.json();case 14:(i=n.sent).success&&(u=U(i.result),t.actions.setTotal(i.total),t.actions.setCategories(u),t.actions.setIsLoaded(!0)),t.actions.setIsLoaded(!0),t.actions.setLoading(!1);case 18:case"end":return n.stop()}}),n)}))))}};return Object(d.i)(t,{categories:[],isLoading:!1,isLoaded:!1,total:0})},H=s.a.createContext();var J=n(70),K=J.a.SubMenu,W=Object(C.a)((function(e){var t=e.store,n=t.getStore("selectedPage"),r=t.getStore("user"),s=r.isLoggedIn?["home","questions","avatar","profile"]:["home","questions","login","register"],a={home:Object(j.jsx)(J.a.Item,{children:"\u0414\u043e\u043c\u0430\u0448\u043d\u044f\u044f \u0441\u0442\u0440\u0430\u043d\u0438\u0446\u0430"},"home"),questions:Object(j.jsx)(J.a.Item,{children:"\u0412\u043e\u043f\u0440\u043e\u0441\u044b"},"questions"),avatar:Object(j.jsx)(J.a.Item,{disabled:"true",style:{padding:0},children:Object(j.jsx)("img",{src:r.avatar,alt:"avatar",style:{maxWidth:"50px",maxHeight:"50px"}})},"avatar"),profile:Object(j.jsxs)(K,{title:r.nickname,children:[Object(j.jsx)(J.a.Item,{children:"\u0420\u0435\u0434\u0430\u043a\u0442\u0438\u0440\u043e\u0432\u0430\u0442\u044c \u043f\u0440\u043e\u0444\u0438\u043b\u044c"},"profileEdit"),Object(j.jsx)(J.a.Item,{children:"\u0412\u044b\u0445\u043e\u0434"},"exit")]},"profile"),login:Object(j.jsx)(J.a.Item,{children:"\u041b\u043e\u0433\u0438\u043d"},"login"),register:Object(j.jsx)(J.a.Item,{children:"\u0420\u0435\u0433\u0438\u0441\u0442\u0440\u0430\u0446\u0438\u044f"},"register")},c=[];return s.forEach((function(e){c.push(a[e])})),Object(j.jsxs)("header",{children:[Object(j.jsx)("h1",{children:"\u041c\u0412\u041e #25"}),Object(j.jsx)(J.a,{onClick:function(e){"exit"!==e.key?n.actions.setSelected(e.key):r.actions.logout()},selectedKeys:[n.selected],mode:"horizontal",style:{display:"block",position:"sticky",top:"0",textAlign:"right"},children:c})]})})),G=function(){var e={initialized:!1,getStore:function(t){if(e.stores&&e.stores[t])return e.stores[t];throw new Error("No store with name ".concat(t," was found"))}};return e.actions={init:Object(d.f)((function(){e.connection=l().init(),e.stores={selectedPage:B(),user:V(e.connection),categories:M(e.connection),questions:R(e.connection)},e.initialized=!0}))},Object(d.i)(e,{stores:[],initialized:!1})}();G.actions.init(),G.getStore("user").actions.isLoggedIn();var X=Object(C.a)((function(){var e=G.getStore("selectedPage");return Object(j.jsx)(H.Provider,{value:G,children:Object(j.jsxs)("div",{className:"App",children:[Object(j.jsx)(H.Consumer,{children:function(e){return Object(j.jsx)(W,{store:e})}}),Object(j.jsx)("main",{children:e.selectedPageItem})]})})})),Y=function(e){e&&e instanceof Function&&n.e(3).then(n.bind(null,296)).then((function(t){var n=t.getCLS,r=t.getFID,s=t.getFCP,a=t.getLCP,c=t.getTTFB;n(e),r(e),s(e),a(e),c(e)}))};c.a.render(Object(j.jsx)(X,{}),document.getElementById("root")),Y(console.log)}},[[282,1,2]]]);
//# sourceMappingURL=main.3b31b5d8.chunk.js.map