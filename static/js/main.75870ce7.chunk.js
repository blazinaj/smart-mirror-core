(this["webpackJsonpsmart-mirror-core"]=this["webpackJsonpsmart-mirror-core"]||[]).push([[0],{124:function(e,t,n){e.exports=n(201)},129:function(e,t,n){},133:function(e,t,n){},159:function(e,t,n){},160:function(e,t,n){},194:function(e,t){e.exports="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAEwAAABJCAYAAACXWsCYAAAACXBIWXMAAAsSAAALEgHS3X78AAAEHUlEQVR4nO2cUW7TQBCGhwgJCSE1CCSkvhSEeMEPCYj3plwg4QQu4gAUX4DmApZv0PgG6QloTkDy4PfmhWdyglRrxmJjO87OemdtR/tJeUic7GZ/z453Z8Z+tN1ugYskgUsAmADACABO2DriYQEASwCIPA/usx5YBEsS6APAHADOGx+2Gb56HsxESz2mDo5JLMFNkqQzBR6bbhmnYZlYa4D/pt1yhiUuRFhY37hg6LNkNuIzz4O7joiVkiQQAcB36aOTJIERx5Ts595fd00sgefBFTp+GRbB8iwt9MFF4UTbEOyocIIRsSFYV66MSrALJq+SjwE3JYk4wYg4wYg4wYg4wYg4wYhwCDZk/ccNwyFY1yKrJNyUJOIEI+IEI8IRcb1g/ccNY1ywLkZXKbgpScSYhQVxmvwYYtJWZomvu9DvRqgniNO8xOjzWxi9eb57rFYiN4jhtUhyYKZIZf11KzLJod/OaSuNxxfvP54CfDjd+cpUW7AgThu+0lyoCuEuQx/+anXOQBAX0mpmBENzNZHZFondSeg3m1XC8QiLH+SPlQlGcvpS4ybKAM5EW0Hc3N6zSqx9UK+SM0rjCojpPMc/3gQksYAiWBCnNRNjhkGd4YmwCvpg8slXEgwtQDhFLsZBXFiOsIFXw5867ata2KWFsM01c/syV7o/pAjGzTmeeRtoj+egYDgIk46+CvZpiVNfe7aoWJitsw6Wwtu1+lARzJoztiRYrSWMi1YQcYIRURGsNRvkNqAimM3NsY2wT62YXNsEs9FXrT4OCoYxq9s6nRBgtzAMJ611f6/q9Oe6HRCILQYUtffFSoKFfhpNWOl2oojNveQMb7ggQ1lWaG9YFZjaTJCgJWvtJ5UFw8TFVKeTA6xC36p1pYR+6mZi6u9IC1ccGLmTClaWt147hH5qZaTxkFf62IkJSxP38YyazhxRRdPaGqGlXWhenoWz/RH6zYuVgaJ9URlP7TtyMda/7x5JmTVezmdtykfmwfGIC9zAaCK3pKN+ValAV8oEMsR4xu8hevn0XxYcMSfYMZIkqeuRkyVTjvqwzpLLXC2/fSqOZK9gmJHOHqFQdg80Bwup0sfodgxdxgRfQ8yHVvL7T8GHFZ0+ChW14KkAG6z0qbWoRaGu84UmKhx0+niFiFpWOr7SXa9hxmuum/WqLEbB+XvTwjr7gU7YR6oyMpoi7OUabysDtH4KEUc+NbMwG6UAdVH2ZTgVfYWvkpEFaztnhFqy/MNGjAtmqxSgLqqCsUVAek1WAGqgWrbAVqDX42y8QdjWkC7zTcQJRsQJVsGzJ4Vj906wPXivAN69KBy762x4Rzz8DAB+lR0rC8sYYCEei+MsTI1Ntrh3gh1GxOiG2UOXsimZf3RdW5HzAmL9yPm/RSBzvnPDLAA8AO/AAtd60JWBAAAAAElFTkSuQmCC"},201:function(e,t,n){"use strict";n.r(t);var a=n(0),o=n.n(a),r=n(25),c=n.n(r),i=(n(129),n(130),n(131),n(132),n(133),n(103)),l=n(9),s=n(204),u=n(102),d=n(227),g=n(205),m=n(206),p=o.a.createElement(i.a,null,"Open Modal"),h=o.a.createContext({}),f=function(){var e,t=Object(a.useContext)(h),n=o.a.createElement(i.a,{size:"sm",className:"btn-pill",color:"primary"},"User Profile"),r=(e=t.mongoHook.authenticatedUser,{display:o.a.createElement(s.a,{responive:!0,hover:!0,striped:!0},o.a.createElement("thead",null,o.a.createElement("tr",null,o.a.createElement("td",null,"Key"),o.a.createElement("td",null,"Value"))),o.a.createElement("tbody",null,Object.entries(e).map((function(e){var t=Object(l.a)(e,2),n=t[0],a=t[1];return o.a.createElement("tr",null,o.a.createElement("td",null,n,":"),o.a.createElement("td",null,Object(u.inspect)(a)))}))))});return{userModalHook:function(e,t){var n=arguments.length>2&&void 0!==arguments[2]?arguments[2]:p,r=Object(a.useState)(!1),c=Object(l.a)(r,2),i=c[0],s=c[1],u=o.a.createElement(d.a,{style:{minWidth:"80vw"},isOpen:i,toggle:function(){return s(!i)}},o.a.createElement(g.a,{toggle:function(){return s(!i)}},t||"Modal"),o.a.createElement(m.a,null,e||o.a.createElement("div",null,"\ud83c\udfd7\ufe0fNothing to see here..\ud83c\udfd7\ufe0f"))),h=o.a.createElement(o.a.Fragment,null,o.a.cloneElement(n,{onClick:function(){return s(!i)}}),u);return{display:u,modalButton:h,modalIsOpen:i,setModalIsOpen:s}}(r.display,"User Profile",n),authenticatedUser:t.mongoHook.authenticatedUser,profileTableHook:r}},b=function(){var e=Object(a.useContext)(h),t=f();return o.a.createElement("div",{style:{width:"100%",height:"5%",backgroundColor:"black",color:"white"}},o.a.createElement("h1",null,"Smart Mirror Core"),o.a.createElement(i.a,{color:"danger",onClick:function(){return e.mongoHook.logout()}},"Log Out"),t.userModalHook.modalButton)},v=n(104),E=n.n(v),y=n(105),w=n(106),O=n.n(w),k=n(107),j=n(224),A=n(223),C=function(e){var t=e.cameraAPI,n=t.setWidthConstraint,a=t.setComponentWidth,r=t.setHeightConstraint,c=t.setComponentHeight,i=e.coreAPI,l=i.videoConstraints,s=i.width,u=i.height;return o.a.createElement(o.a.Fragment,null,o.a.createElement(j.a,{styles:{root:{maxWidth:300}}},o.a.createElement(A.a,{label:"Video Constraint: Width",min:1,max:2e3,step:1,defaultValue:l.width,showValue:!0,onChange:function(e){return n(e)}}),o.a.createElement(A.a,{label:"Component Width",min:1,max:2e3,step:1,defaultValue:s,showValue:!0,onChange:function(e){return a(e)}})),o.a.createElement(j.a,{horizontal:!0,styles:{root:{height:200}}},o.a.createElement(A.a,{label:"Video Constraint: Height",min:1,max:1e3,step:1,defaultValue:l.height,showValue:!0,vertical:!0,onChange:function(e){return r(e)}}),o.a.createElement(A.a,{label:"Component Height",min:1,max:1e3,step:1,defaultValue:u,showValue:!0,vertical:!0,onChange:function(e){return c(e)}})))},S=(n(159),n(160),n(112)),x=n.n(S),L=n(113),P=n.n(L),F=function(e){var t=Object(a.useState)(new Date),n=Object(l.a)(t,2),r=n[0],c=n[1];return Object(a.useEffect)((function(){setInterval((function(){return c(new Date)}),1e3)}),[]),o.a.createElement("div",null,o.a.createElement(k.Clock,{value:r}))},R=function(e){var t=Object(a.useState)(1280),n=Object(l.a)(t,2),r=n[0],c=n[1],i=Object(a.useState)(720),s=Object(l.a)(i,2),u=s[0],d=s[1],g=Object(a.useState)(500),m=Object(l.a)(g,2),p=m[0],h=m[1],f=Object(a.useState)(500),b=Object(l.a)(f,2),v=b[0],w=b[1],k=Object(a.useState)(!1),j=Object(l.a)(k,2),A=j[0],S=j[1],L={webcamRef:Object(a.useRef)(null),videoConstraints:{width:r,height:u,facingMode:"user"},width:p,height:v,audio:A},R={setWidthConstraint:c,setHeightConstraint:d,setComponentWidth:h,setComponentHeight:w,setComponentAudio:S},N=[o.a.createElement("div",{key:"camera-widget","data-grid":{x:4,y:4,w:5,h:10}},o.a.createElement(y.a,{coreAPI:L})),o.a.createElement("div",{key:"clock-widget","data-grid":{x:12,y:0,w:2,h:4},style:{background:"dimGrey"}},o.a.createElement(F,{coreAPI:L})),o.a.createElement("div",{key:"camera-settings","data-grid":{x:0,y:10,w:2,h:10}},o.a.createElement(C,{cameraAPI:R,coreAPI:L})),o.a.createElement("div",{key:"weather-widget","data-grid":{x:12,y:10,w:2,h:13}},o.a.createElement(x.a,{style:{color:"white"},forecast:"5days",apikey:"3a672a5bca657693859413a963d7b698",type:"city",city:"Spokane",unit:"imperial"})),o.a.createElement("div",{key:"calendar-widget","data-grid":{x:0,y:0,w:3,minW:3,h:8}},o.a.createElement(P.a,{value:new Date})),o.a.createElement("div",{key:"digital-clock-widget","data-grid":{x:6,y:0,w:2,h:1}},o.a.createElement(O.a,null))];return o.a.createElement("div",null,o.a.createElement(E.a,{style:{background:"black"},cols:12,rowHeight:30,width:1200},N.map((function(e){return o.a.cloneElement(e)}))))},N=function(e){return o.a.createElement(R,null)},W=n(47),I=n.n(W),Y=n(64),z=n(41),H=n(211),D=n(212),T=n(213),U=n(214),M=n(215),V=n(226),G=n(216),B=n(217),J=n(218),Q=n(219),q=n(220),X=n(221),Z=n(225),K=n(222),_=n(80),$=n.n(_),ee=function(e){var t=Object(a.useState)("lichtschwert@live.com"),r=Object(l.a)(t,2),c=r[0],s=r[1],u=Object(a.useState)("FakePassword"),d=Object(l.a)(u,2),g=d[0],m=d[1],p=function(){var t=Object(Y.a)(I.a.mark((function t(){return I.a.wrap((function(t){for(;;)switch(t.prev=t.next){case 0:return t.next=2,e.mongoHook.login(c,g);case 2:t.sent&&O();case 4:case"end":return t.stop()}}),t)})));return function(){return t.apply(this,arguments)}}(),h=Object(a.useState)(!1),f=Object(l.a)(h,2),b=f[0],v=f[1],E=Object(a.useState)(!1),y=Object(l.a)(E,2),w=y[0],O=y[1];return o.a.createElement("div",{id:"loginPage"},o.a.createElement(H.a,{style:$.a,id:"navbar",light:!0,expand:"md"},o.a.createElement("img",{src:n(194)}),o.a.createElement(D.a,{id:"companyName",stlye:$.a,href:"/"},"OpTech"),o.a.createElement(T.a,{onClick:function(){return v(!b)}}),o.a.createElement(U.a,{isOpen:b,navbar:!0},o.a.createElement(M.a,{className:"ml-auto",navbar:!0},o.a.createElement(V.a,{nav:!0,inNavbar:!0},o.a.createElement(G.a,{id:"dropdown",nav:!0,caret:!0},"Developers"),o.a.createElement(B.a,{right:!0,id:"dropdownMenu"},o.a.createElement(J.a,{className:"dropdownItem",href:"https://github.com/blazinaj/smart-mirror-core/tree/master"},"Github")))))),o.a.createElement(Q.a,{color:"info",isOpen:w,toggle:function(){return O(!1)}},"Incorrect email or password!"),o.a.createElement(q.a,null,o.a.createElement("div",{class:"col-xs-9 col-md-7",id:"inputFieldsLogin"},o.a.createElement(X.a,{className:"inputGroupLogin"},o.a.createElement(Z.a,{className:"pre-pend",addonType:"prepend"},"Email"),o.a.createElement(K.a,{className:"inputField",type:"email",value:c,placeholder:"Email...",onChange:function(e){return s(e.target.value)}})),o.a.createElement("br",null),o.a.createElement(X.a,{className:"inputGroupLogin"},o.a.createElement(Z.a,{className:"pre-pend",addonType:"prepend"},"Password"),o.a.createElement(K.a,{className:"inputField",type:"password",value:g,placeholder:"Password...",onChange:function(e){return m(e.target.value)}}))),o.a.createElement(i.a,{className:"authButton",onClick:function(){return p()}},"Login"),o.a.createElement(i.a,{className:"authButton",onClick:function(){return e.mongoHook.register(c,g)}},"Register")))};ee.defaultProps={mongoHook:{}};var te=ee,ne=function(e){var t=Object(a.useState)(null),n=Object(l.a)(t,2),r=(n[0],n[1]);Object(a.useEffect)((function(){r(z.a.initializeDefaultAppClient("smart-mirror-jshfq"))}),[]);var c=function(e){var t=Object(a.useState)(!1),n=Object(l.a)(t,2),o=n[0],r=n[1],c=Object(a.useState)({}),i=Object(l.a)(c,2),s=i[0],u=i[1];return{isLoggedIn:o,login:function(){var e=Object(Y.a)(I.a.mark((function e(t,n){var a,o,c;return I.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return a=z.a.defaultAppClient,o=new z.c(t,n),e.next=4,a.auth.loginWithCredential(o).then((function(e){console.log("successfully logged in with id: ".concat(e.id)),u(e),r(!0)})).catch((function(e){console.error("login failed with error: ".concat(e)),c=e}));case 4:return e.abrupt("return",c);case 5:case"end":return e.stop()}}),e)})));return function(t,n){return e.apply(this,arguments)}}(),register:function(e,t){z.a.defaultAppClient.auth.getProviderClient(z.b.factory).registerWithEmail(e,t).then((function(){return console.log("Successfully sent account confirmation email!")})).catch((function(e){return console.error("Error registering new user:",e)}))},logout:function(){u({}),r(!1)},authenticatedUser:s}}();return o.a.createElement(o.a.Fragment,null,c.isLoggedIn?o.a.createElement(h.Provider,{value:{mongoHook:c}},e.children):o.a.createElement(te,{mongoHook:c}))},ae=function(){return o.a.createElement("div",{className:"App"},o.a.createElement(ne,null,o.a.createElement(b,null),o.a.createElement(N,null)))},oe=n(119),re=n(37),ce=Boolean("localhost"===window.location.hostname||"[::1]"===window.location.hostname||window.location.hostname.match(/^127(?:\.(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)){3}$/));function ie(e,t){navigator.serviceWorker.register(e).then((function(e){e.onupdatefound=function(){var n=e.installing;null!=n&&(n.onstatechange=function(){"installed"===n.state&&(navigator.serviceWorker.controller?(console.log("New content is available and will be used when all tabs for this page are closed. See https://bit.ly/CRA-PWA."),t&&t.onUpdate&&t.onUpdate(e)):(console.log("Content is cached for offline use."),t&&t.onSuccess&&t.onSuccess(e)))})}})).catch((function(e){console.error("Error during service worker registration:",e)}))}var le=n(44),se=n(30),ue=n(31),de=n(35),ge=n(32),me=n(7),pe=n(36),he={white:"#fff",background:"#eceff1",color:"#123",lightColor:"#567",red:"#d62d20"},fe={boxShadow:"0 0 15px rgba(0,0,0,0.25)",background:he.background,borderRadius:"5px",color:he.color,display:"flex",flexDirection:"column",minWidth:"10em",maxWidth:"25em"},be={border:0,height:0,borderTop:"1px solid rgba(0, 0, 0, 0.1)",borderBottom:"1px solid rgba(255, 255, 255, 0.3)",margin:"1rem 0"};function ve(e,t){var n=Object.keys(e);if(Object.getOwnPropertySymbols){var a=Object.getOwnPropertySymbols(e);t&&(a=a.filter((function(t){return Object.getOwnPropertyDescriptor(e,t).enumerable}))),n.push.apply(n,a)}return n}function Ee(e){for(var t=1;t<arguments.length;t++){var n=null!=arguments[t]?arguments[t]:{};t%2?ve(n,!0).forEach((function(t){Object(le.a)(e,t,n[t])})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(n)):ve(n).forEach((function(t){Object.defineProperty(e,t,Object.getOwnPropertyDescriptor(n,t))}))}return e}var ye=function(e){var t=e.label,n=e.data;return o.a.createElement("div",{style:{fontSize:".8rem"}},o.a.createElement("label",{style:{color:he.lightColor,paddingRight:".25rem"}},t," :"),o.a.createElement("span",null,n))},we=function(e){var t=e.token;return o.a.createElement("div",{style:{fontSize:".8rem"}},o.a.createElement("label",{style:{color:he.lightColor,paddingRight:".25rem"}},"Access token :"),o.a.createElement("div",{style:{fontFamily:"monospace",wordWrap:"break-word",margin:".5em 0",padding:".5em",fontSize:"85%",backgroundColor:"rgba(27,31,35,0.05)",borderRadius:"3px"}},t))},Oe=function(e){function t(){return Object(se.a)(this,t),Object(de.a)(this,Object(ge.a)(t).apply(this,arguments))}return Object(pe.a)(t,e),Object(ue.a)(t,[{key:"render",value:function(){var e=this.props,t=e.user,n=t._profile,a=t._token,r=e.logout,c="unknown";if(a.expiresAt===1/0)c="never/unknown (see provider doc)";else if(a.expiresAt){var i=new Date(a.expiresAt),l=i.getFullYear(),s=i.getMonth()+1,u=i.getDate(),d=i.getHours(),g=i.getMinutes();s<10&&(s="0".concat(s)),u<10&&(u="0".concat(u)),d<10&&(d="0".concat(d)),g<10&&(g="0".concat(g)),c="".concat(s,"/").concat(u,"/").concat(l," ").concat(d,":").concat(g)}var m={container:{display:"flex",flexDirection:"column",alignItems:"center",textAlign:"left"},avatar:{background:he.background,boxShadow:"0 0 12px rgba(0,0,0,0.5)",border:"5px solid ".concat(he.white),borderRadius:"50%",height:"7em",width:"7em",zIndex:"1"},content:Ee({},fe,{marginTop:"-.75rem"}),dataContainer:{padding:"1.5rem 2rem"},id:{fontSize:".5rem",margin:"-.2rem 0"},name:{fontSize:"1.5rem",marginBottom:".5rem"},button:{color:he.red,border:"none",width:"100%",padding:".5rem",fontSize:"1em",textTransform:"uppercase"}},p=n.profilePicURL||"https://maxcdn.icons8.com/Share/icon/p1em/users//gender_neutral_user1600.png";return o.a.createElement("div",{style:m.container},o.a.createElement("img",{style:m.avatar,src:p,alt:"userCard"}),o.a.createElement("div",{style:m.content},o.a.createElement("div",{style:m.dataContainer},o.a.createElement("div",{style:m.id},"ID ",n.id),o.a.createElement("div",{style:m.name},n.name),o.a.createElement(ye,{label:"Firstname",data:n.firstName}),o.a.createElement(ye,{label:"Lastname",data:n.lastName}),o.a.createElement(ye,{label:"Email",data:n.email}),o.a.createElement(ye,{label:"Expiration",data:c}),o.a.createElement(we,{token:a.accessToken})),o.a.createElement("button",{style:m.button,onClick:r},"Logout")))}}]),t}(a.Component),ke=n(117),je=n(118),Ae=n.n(je),Ce=function(e){function t(){return Object(se.a)(this,t),Object(de.a)(this,Object(ge.a)(t).apply(this,arguments))}return Object(pe.a)(t,e),Object(ue.a)(t,[{key:"render",value:function(){var e=this.props,t=e.children,n=e.triggerLogin,a=(e.triggerLogout,Object(ke.a)(e,["children","triggerLogin","triggerLogout"]));return o.a.createElement("div",Object.assign({onClick:n,style:{background:"#eee",border:"1px solid black",borderRadius:"3px",display:"inline-block",margin:"5px",padding:"10px 20px"}},a),t)}}]),t}(a.Component),Se=Ae()(Ce);function xe(e,t){var n=Object.keys(e);if(Object.getOwnPropertySymbols){var a=Object.getOwnPropertySymbols(e);t&&(a=a.filter((function(t){return Object.getOwnPropertyDescriptor(e,t).enumerable}))),n.push.apply(n,a)}return n}function Le(e){for(var t=1;t<arguments.length;t++){var n=null!=arguments[t]?arguments[t]:{};t%2?xe(n,!0).forEach((function(t){Object(le.a)(e,t,n[t])})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(n)):xe(n).forEach((function(t){Object.defineProperty(e,t,Object.getOwnPropertyDescriptor(n,t))}))}return e}var Pe=function(e){function t(e){var n;return Object(se.a)(this,t),(n=Object(de.a)(this,Object(ge.a)(t).call(this,e))).state={logged:!1,user:{},currentProvider:""},n.nodes={},n.onLoginSuccess=n.onLoginSuccess.bind(Object(me.a)(n)),n.onLoginFailure=n.onLoginFailure.bind(Object(me.a)(n)),n.onLogoutSuccess=n.onLogoutSuccess.bind(Object(me.a)(n)),n.onLogoutFailure=n.onLogoutFailure.bind(Object(me.a)(n)),n.logout=n.logout.bind(Object(me.a)(n)),n}return Object(pe.a)(t,e),Object(ue.a)(t,[{key:"setNodeRef",value:function(e,t){t&&(this.nodes[e]=t)}},{key:"onLoginSuccess",value:function(e){console.log(e),this.setState({logged:!0,currentProvider:e._provider,user:e})}},{key:"onLoginFailure",value:function(e){console.error(e),this.setState({logged:!1,currentProvider:"",user:{}})}},{key:"onLogoutSuccess",value:function(){this.setState({logged:!1,currentProvider:"",user:{}})}},{key:"onLogoutFailure",value:function(e){console.error(e)}},{key:"logout",value:function(){var e=this.state,t=e.logged,n=e.currentProvider;t&&n&&this.nodes[n].props.triggerLogout()}},{key:"render",value:function(){var e;return this.state.logged?e=o.a.createElement(Oe,{user:this.state.user,logout:this.logout}):(e=[o.a.createElement(Se,{provider:"facebook",appId:0x8f40870839fd6,onLoginSuccess:this.onLoginSuccess,onLoginFailure:this.onLoginFailure,onLogoutSuccess:this.onLogoutSuccess,getInstance:this.setNodeRef.bind(this,"facebook"),key:"facebook"},"Login with Facebook"),o.a.createElement(Se,{provider:"google",appId:"9137971612-s5rhj4kmstu603gdk3ndlobruav0fc7d.apps.googleusercontent.com",onLoginSuccess:this.onLoginSuccess,onLoginFailure:this.onLoginFailure,onLogoutSuccess:this.onLogoutSuccess,onLogoutFailure:this.onLogoutFailure,getInstance:this.setNodeRef.bind(this,"google"),key:"google"},"Login with Google")],"https:"===window.location.protocol&&e.push(o.a.createElement(Se,{provider:"amazon",appId:"amzn1.application-oa2-client.e726e756e5c94453836bd8aab285f54b",onLoginSuccess:this.onLoginSuccess,onLoginFailure:this.onLoginFailure,onLogoutSuccess:this.onLogoutSuccess,getInstance:this.setNodeRef.bind(this,"amazon"),key:"amazon"},"Login with Amazon"))),e}}]),t}(a.Component),Fe=function(){return document.body.style.backgroundColor="black",o.a.createElement("div",{style:Le({},fe,{padding:"1.5rem 2rem",margin:"5em auto",backgroundColor:"lightblue"})},o.a.createElement("strong",null,"Login:"),o.a.createElement("hr",{style:be}),o.a.createElement(Pe,null))},Re=o.a.createElement(oe.a,null,o.a.createElement("div",null,o.a.createElement(re.c,null,o.a.createElement(re.a,{exact:!0,path:"/",component:ae}),o.a.createElement(re.a,{path:"/config",component:Fe}))));c.a.render(Re,document.getElementById("root")),function(e){if("serviceWorker"in navigator){if(new URL("",window.location.href).origin!==window.location.origin)return;window.addEventListener("load",(function(){var t="".concat("","/service-worker.js");ce?(!function(e,t){fetch(e).then((function(n){var a=n.headers.get("content-type");404===n.status||null!=a&&-1===a.indexOf("javascript")?navigator.serviceWorker.ready.then((function(e){e.unregister().then((function(){window.location.reload()}))})):ie(e,t)})).catch((function(){console.log("No internet connection found. App is running in offline mode.")}))}(t,e),navigator.serviceWorker.ready.then((function(){console.log("This web app is being served cache-first by a service worker. To learn more, visit https://bit.ly/CRA-PWA")}))):ie(t,e)}))}}()},80:function(e,t,n){}},[[124,1,2]]]);
//# sourceMappingURL=main.75870ce7.chunk.js.map