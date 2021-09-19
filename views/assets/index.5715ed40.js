var e=Object.defineProperty,t=Object.defineProperties,a=Object.getOwnPropertyDescriptors,n=Object.getOwnPropertySymbols,l=Object.prototype.hasOwnProperty,r=Object.prototype.propertyIsEnumerable,s=(t,a,n)=>a in t?e(t,a,{enumerable:!0,configurable:!0,writable:!0,value:n}):t[a]=n,o=(e,t)=>{for(var a in t||(t={}))l.call(t,a)&&s(e,a,t[a]);if(n)for(var a of n(t))r.call(t,a)&&s(e,a,t[a]);return e},c=(e,n)=>t(e,a(n));import{a as m,u as i,r as u,b as d,R as p,c as E,d as g,L as h,B as x,S as v,e as f,Q as w,f as b,g as k}from"./vendor.4f59d7e1.js";!function(){const e=document.createElement("link").relList;if(!(e&&e.supports&&e.supports("modulepreload"))){for(const e of document.querySelectorAll('link[rel="modulepreload"]'))t(e);new MutationObserver((e=>{for(const a of e)if("childList"===a.type)for(const e of a.addedNodes)"LINK"===e.tagName&&"modulepreload"===e.rel&&t(e)})).observe(document,{childList:!0,subtree:!0})}function t(e){if(e.ep)return;e.ep=!0;const t=function(e){const t={};return e.integrity&&(t.integrity=e.integrity),e.referrerpolicy&&(t.referrerPolicy=e.referrerpolicy),"use-credentials"===e.crossorigin?t.credentials="include":"anonymous"===e.crossorigin?t.credentials="omit":t.credentials="same-origin",t}(e);fetch(e.href,t)}}();const N=localStorage.getItem("authToken");var y=m.create({baseURL:"http://localhost:5000/api/",headers:{"Content-type":"Application/json",authToken:N}});function L({setIsAdding:e}){const t=i(),[a,n]=u.exports.useState({name:"",description:"",secret:""}),l=d((()=>y.post("/pindata",a)),{onSuccess:()=>{t.invalidateQueries("pindata"),e(!1)}});return p.createElement("div",{className:"bg-green-500 text-white p-2 m-2 rounded"},p.createElement("p",{className:"text-center text-xl font-bold"},"Add New Data"),p.createElement("table",null,p.createElement("tbody",null,p.createElement("tr",null,p.createElement("td",null,"Name :"),p.createElement("td",null,p.createElement("input",{className:"text-black",type:"text",value:a.name,onChange:e=>n(c(o({},a),{name:e.target.value}))}))),p.createElement("tr",null,p.createElement("td",null,"Description :"),p.createElement("td",null,p.createElement("input",{className:"text-black",type:"text",value:a.description,onChange:e=>n(c(o({},a),{description:e.target.value}))}))),p.createElement("tr",null,p.createElement("td",null,"Secret :"),p.createElement("td",null,p.createElement("input",{className:"text-black",type:"text",value:a.secret,onChange:e=>n(c(o({},a),{secret:e.target.value}))}))))),p.createElement("div",{className:"flex justify-around"},p.createElement("button",{onClick:()=>{l.mutate()},className:"flex space-x-2"},p.createElement("svg",{xmlns:"http://www.w3.org/2000/svg",className:"h-6 w-6",fill:"none",viewBox:"0 0 24 24",stroke:"currentColor"},p.createElement("path",{strokeLinecap:"round",strokeLinejoin:"round",strokeWidth:2,d:"M8 7H5a2 2 0 00-2 2v9a2 2 0 002 2h14a2 2 0 002-2V9a2 2 0 00-2-2h-3m-1 4l-3 3m0 0l-3-3m3 3V4"})),p.createElement("p",null,"Save New Data")),p.createElement("button",{onClick:()=>e(!1),className:"flex space-x-2"},p.createElement("svg",{xmlns:"http://www.w3.org/2000/svg",className:"h-6 w-6",fill:"none",viewBox:"0 0 24 24",stroke:"currentColor"},p.createElement("path",{strokeLinecap:"round",strokeLinejoin:"round",strokeWidth:2,d:"M6 18L18 6M6 6l12 12"})),p.createElement("p",null,"Cancel"))))}function C({data:e,doneEditing:t,setEditing:a}){const[n,l]=u.exports.useState(e),r=i(),s=d((t=>y.put(`/pindata/id/${e.id}`,t)),{onSuccess:()=>{r.invalidateQueries("pindata"),a(!1)}});return p.createElement("div",{className:"bg-purple-500 text-white p-2 m-2 rounded"},p.createElement("h1",{className:"text-center text-xl font-bold"},"Edit PinCard"),p.createElement("table",null,p.createElement("tbody",null,p.createElement("tr",null,p.createElement("td",null,"Name :"),p.createElement("td",null,p.createElement("input",{className:"text-black",type:"text",value:n.name,onChange:e=>l(c(o({},n),{name:e.target.value}))}))),p.createElement("tr",null,p.createElement("td",null,"Description :"),p.createElement("td",null,p.createElement("input",{className:"text-black",type:"text",value:n.description,onChange:e=>l(c(o({},n),{description:e.target.value}))}))),p.createElement("tr",null,p.createElement("td",null,"Secret :"),p.createElement("td",null,p.createElement("input",{className:"text-black",type:"text",value:n.secret,onChange:e=>l(c(o({},n),{secret:e.target.value}))}))))),p.createElement("div",{className:"flex justify-around"},p.createElement("button",{onClick:()=>s.mutate(n),className:"flex space-x-2"},p.createElement("svg",{xmlns:"http://www.w3.org/2000/svg",className:"h-6 w-6",fill:"none",viewBox:"0 0 24 24",stroke:"currentColor"},p.createElement("path",{strokeLinecap:"round",strokeLinejoin:"round",strokeWidth:2,d:"M8 7H5a2 2 0 00-2 2v9a2 2 0 002 2h14a2 2 0 002-2V9a2 2 0 00-2-2h-3m-1 4l-3 3m0 0l-3-3m3 3V4"})),p.createElement("p",null,"Save")),p.createElement("button",{onClick:()=>t(null),className:"flex space-x-2"},p.createElement("svg",{xmlns:"http://www.w3.org/2000/svg",className:"h-6 w-6",fill:"none",viewBox:"0 0 24 24",stroke:"currentColor"},p.createElement("path",{strokeLinecap:"round",strokeLinejoin:"round",strokeWidth:2,d:"M6 18L18 6M6 6l12 12"})),p.createElement("p",null,"Cancel"))))}function S({data:e}){const[t,a]=u.exports.useState(!1),[n,l]=u.exports.useState(e),[r,s]=u.exports.useState(!1);return p.createElement("div",null,r?p.createElement(p.Fragment,null):p.createElement(p.Fragment,null,t?p.createElement(C,{setEditing:a,doneEditing:e=>{e&&l(e),a(!1)},data:n}):p.createElement("div",{className:"bg-blue-500 text-white p-2 m-2 flex rounded justify-between"},p.createElement("div",{className:"flex flex-col justify-center"},p.createElement("h1",{className:"text-2xl"},n.name),p.createElement("p",{className:"break-normal"},n.description)),p.createElement("div",{className:"flex flex-col justify-center space-y-2 w-1/3"},p.createElement("p",{className:"text-3xl text-center break-words"},n.secret),p.createElement("div",{className:"flex justify-evenly"},p.createElement("button",{onClick:()=>a(!0)},p.createElement("svg",{xmlns:"http://www.w3.org/2000/svg",className:"h-6 w-6",fill:"none",viewBox:"0 0 24 24",stroke:"currentColor"},p.createElement("path",{strokeLinecap:"round",strokeLinejoin:"round",strokeWidth:2,d:"M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z"}))),p.createElement("button",{onClick:()=>{y.delete(`/pindata/id/${e.id}`).then((e=>{console.log(e.data),s(!0)})).catch((e=>console.log(e)))}},p.createElement("svg",{xmlns:"http://www.w3.org/2000/svg",className:"h-6 w-6",fill:"none",viewBox:"0 0 24 24",stroke:"currentColor"},p.createElement("path",{strokeLinecap:"round",strokeLinejoin:"round",strokeWidth:2,d:"M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"}))))))))}function j(){const{data:e,error:t,isLoading:a,isError:n}=E("pindata",(()=>y.get("/pindata").then((e=>e.data)))),[l,r]=u.exports.useState(!1);return n?(console.log(t),p.createElement(p.Fragment,null,"Error Loading...")):a?p.createElement(p.Fragment,null,"Loading..."):p.createElement("div",null,p.createElement("div",{className:"flex justify-end"},l?p.createElement(p.Fragment,null):p.createElement("button",{onClick:()=>r(!l),className:"flex space-x-1"},p.createElement("svg",{xmlns:"http://www.w3.org/2000/svg",className:"h-6 w-6",fill:"none",viewBox:"0 0 24 24",stroke:"currentColor"},p.createElement("path",{strokeLinecap:"round",strokeLinejoin:"round",strokeWidth:2,d:"M17 14v6m-3-3h6M6 10h2a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v2a2 2 0 002 2zm10 0h2a2 2 0 002-2V6a2 2 0 00-2-2h-2a2 2 0 00-2 2v2a2 2 0 002 2zM6 20h2a2 2 0 002-2v-2a2 2 0 00-2-2H6a2 2 0 00-2 2v2a2 2 0 002 2z"})),p.createElement("p",null,l?"Cancel Adding":"Add New"))),l?p.createElement(L,{setIsAdding:r}):p.createElement(p.Fragment,null),e.map((e=>p.createElement(S,{key:e.id+e.name+e.description+e.secret,data:e}))))}function M({user:e}){const t=g();return u.exports.useEffect((()=>{e||t.push("/login")}),[]),p.createElement(p.Fragment,null,e?p.createElement("div",null,p.createElement(j,null)):p.createElement(p.Fragment,null,"Not Logged In"))}function F(){return p.createElement("div",null,p.createElement("h1",null,"This is homepage"))}function I({user:e}){const t=g();u.exports.useEffect((()=>{e&&t.push("/dashboard")}),[]);const[a,n]=u.exports.useState(""),[l,r]=u.exports.useState(""),[s,o]=u.exports.useState(""),[c,m]=u.exports.useState(!1);return p.createElement("div",null,p.createElement("div",{className:"flex flex-col items-center text-xl space-y-4"},p.createElement("input",{type:"text",name:"username",id:"username",placeholder:"username",value:a,onChange:e=>n(e.target.value)}),p.createElement("input",{type:"password",name:"password",id:"password",placeholder:"password",value:l,onChange:e=>r(e.target.value)}),p.createElement("div",{className:"flex justify-center space-x-4"},p.createElement("button",{className:"bg-blue-500 text-white px-2 py-1  rounded",onClick:()=>{y.post("/auth/login",{username:a,password:l}).then((e=>{console.log(e.data),e.data.token?(localStorage.setItem("authToken",e.data.token),t.push("/dashboard"),window.location.reload()):(o(e.data.msg),m(!0),setTimeout((()=>{o(""),m(!1)}),3e3))})).catch((e=>{console.log(e),localStorage.removeItem("authToken"),o("Invalid username or password"),m(!0),setTimeout((()=>{o(""),m(!1)}),3e3)}))}},"Login"),p.createElement("button",{className:"bg-transparent border border-blue-500 text-blue-500 px-2 py-1  rounded hover:bg-blue-500 hover:text-white",onClick:()=>{y.post("/auth/signup",{username:a,password:l}).then((e=>{console.log(e.data),o(e.data.msg),m(!0),setTimeout((()=>{o(""),m(!1)}),3e3)})).catch((e=>{console.log(e),o("Signup unsuccessful"),m(!0),setTimeout((()=>{o(""),m(!1)}),3e3)}))}},"Sign Up"))),p.createElement("div",{className:"transition-all"},c?p.createElement("div",{className:"bg-red-400 text-center text-white mt-4 rounded transition duration-300 ease-in-out"},s):p.createElement(p.Fragment,null)))}function O({user:e}){const t=g();return p.createElement("div",{className:"flex justify-between items-center"},p.createElement("ul",null,p.createElement("li",null,p.createElement(h,{to:"/"},"Home"))),p.createElement("ul",{className:"flex space-x-4 items-center justify-end my-3 text-md"},e?p.createElement(p.Fragment,null,p.createElement("li",null,p.createElement(h,{className:"flex flex-col justify-center",to:"/dashboard"},p.createElement("img",{className:"w-8 h-8",src:"/assets/apps-grid.de9a690b.svg",alt:"avt"}))),p.createElement("li",null,p.createElement(h,{className:"flex flex-col justify-center",to:"/profile"},p.createElement("img",{className:"w-10 h-10",src:"/assets/avatar.b8fe596f.svg",alt:"avt"}))),p.createElement("button",{className:"bg-red-600 text-white rounded px-2 py-1 hover:bg-red-800 transition-colors",onClick:()=>{localStorage.removeItem("authToken"),t.push("/"),window.location.reload()}},"Logout")):p.createElement("li",null,p.createElement(h,{to:"/login"},"Login"))))}function T({user:e}){const t=g();return u.exports.useEffect((()=>{e||t.push("/login")}),[]),p.createElement("div",null,e?p.createElement("div",null,"Profile VIew"):p.createElement(p.Fragment,null))}function B(){u.exports.useState(null);const[e,t]=u.exports.useState(!1),{data:a}=E("authUser",(()=>y.get("/auth/authUser").then((e=>e.data))),{onSuccess:()=>t(!0),onError:()=>t(!0),refetchOnWindowFocus:!1,retry:!1});return p.createElement("div",{style:{maxWidth:"500px"},className:"px-3 mx-auto"},p.createElement(x,null,e?p.createElement("div",null,p.createElement(v,null,p.createElement(f,{exact:!0,path:"/"},p.createElement(O,{user:a}),p.createElement(F,null)),p.createElement(f,{path:"/login"},p.createElement(O,{user:a}),p.createElement(I,{user:a})),p.createElement(f,{path:"/dashboard"},p.createElement(O,{user:a}),p.createElement(M,{user:a})),p.createElement(f,{path:"/profile"},p.createElement(O,{user:a}),p.createElement(T,{user:a})))):p.createElement(p.Fragment,null,"Loading...")))}const W=new w;b.render(p.createElement(p.StrictMode,null,p.createElement(k,{client:W},p.createElement(B,null))),document.getElementById("root"));
