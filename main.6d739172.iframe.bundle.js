(window.webpackJsonp=window.webpackJsonp||[]).push([[4],{"./.storybook/dev-fonts.scss":function(module,exports,__webpack_require__){var content=__webpack_require__("./node_modules/postcss-loader/src/index.js!./.storybook/dev-fonts.scss");"string"==typeof content&&(content=[[module.i,content,""]]);var options={insert:"head",singleton:!1};__webpack_require__("./node_modules/style-loader/dist/runtime/injectStylesIntoStyleTag.js")(content,options);content.locals&&(module.exports=content.locals)},"./.storybook/preview.js-generated-config-entry.js":function(module,__webpack_exports__,__webpack_require__){"use strict";__webpack_require__.r(__webpack_exports__);var preview_namespaceObject={};__webpack_require__.r(preview_namespaceObject),__webpack_require__.d(preview_namespaceObject,"decorators",(function(){return decorators}));__webpack_require__("./node_modules/core-js/modules/es.symbol.js"),__webpack_require__("./node_modules/core-js/modules/es.array.filter.js"),__webpack_require__("./node_modules/core-js/modules/es.object.get-own-property-descriptor.js"),__webpack_require__("./node_modules/core-js/modules/es.object.get-own-property-descriptors.js"),__webpack_require__("./node_modules/core-js/modules/es.object.keys.js"),__webpack_require__("./node_modules/core-js/modules/web.dom-collections.for-each.js");var ClientApi=__webpack_require__("./node_modules/@storybook/client-api/dist/esm/ClientApi.js"),esm=__webpack_require__("./node_modules/@storybook/client-logger/dist/esm/index.js"),token=(__webpack_require__("./.storybook/dev-fonts.scss"),__webpack_require__("./src/components/components.scss"),__webpack_require__("./src/core/token.js")),react=__webpack_require__("./node_modules/react/index.js"),react_default=__webpack_require__.n(react),react_dom=__webpack_require__("./node_modules/react-dom/index.js"),commonjs=__webpack_require__("./node_modules/react-error-boundary/dist/commonjs/index.js"),alert_alert=__webpack_require__("./src/components/alert/alert.jsx"),es=(__webpack_require__("./node_modules/prop-types/index.js"),__webpack_require__("./node_modules/react-redux/es/index.js")),integration_react=__webpack_require__("./node_modules/redux-persist/es/integration/react.js"),redux_toolkit_esm=__webpack_require__("./node_modules/@reduxjs/toolkit/dist/redux-toolkit.esm.js"),redux=__webpack_require__("./node_modules/redux/es/redux.js"),redux_persist_es=__webpack_require__("./node_modules/redux-persist/es/index.js"),session=__webpack_require__("./node_modules/redux-persist/lib/storage/session.js"),session_default=__webpack_require__.n(session),user_slice=__webpack_require__("./src/core/user.slice.js"),persistConfig={key:"dpl-react",storage:session_default.a},store=Object(redux_toolkit_esm.a)({reducer:Object(redux_persist_es.a)(persistConfig,Object(redux.c)({user:user_slice.a})),devTools:!1}),persistor=Object(redux_persist_es.b)(store),components_store=function Store(_ref){var children=_ref.children;return react_default.a.createElement(es.a,{store:store},react_default.a.createElement(integration_react.a,{persistor:persistor},children))};function ownKeys(object,enumerableOnly){var keys=Object.keys(object);if(Object.getOwnPropertySymbols){var symbols=Object.getOwnPropertySymbols(object);enumerableOnly&&(symbols=symbols.filter((function(sym){return Object.getOwnPropertyDescriptor(object,sym).enumerable}))),keys.push.apply(keys,symbols)}return keys}function _objectSpread(target){for(var i=1;i<arguments.length;i++){var source=null!=arguments[i]?arguments[i]:{};i%2?ownKeys(source,!0).forEach((function(key){_defineProperty(target,key,source[key])})):Object.getOwnPropertyDescriptors?Object.defineProperties(target,Object.getOwnPropertyDescriptors(source)):ownKeys(source).forEach((function(key){Object.defineProperty(target,key,Object.getOwnPropertyDescriptor(source,key))}))}return target}function _defineProperty(obj,key,value){return key in obj?Object.defineProperty(obj,key,{value:value,enumerable:!0,configurable:!0,writable:!0}):obj[key]=value,obj}function mount(context){context&&context.querySelectorAll("[data-dpl-app]").forEach((function mountApp(container){var _container$dataset,_window$dplReact,_window$dplReact$apps,appName=null==container||null===(_container$dataset=container.dataset)||void 0===_container$dataset?void 0:_container$dataset.dplApp,app=null===(_window$dplReact=window.dplReact)||void 0===_window$dplReact||null===(_window$dplReact$apps=_window$dplReact.apps)||void 0===_window$dplReact$apps?void 0:_window$dplReact$apps[appName];app&&!container.innerHTML&&Object(react_dom.render)(Object(react.createElement)(components_store,{},Object(react.createElement)(Object(commonjs.withErrorBoundary)(app,alert_alert.a),_objectSpread({},container.dataset))),container)}))}function unmount(context){context&&context.querySelectorAll("[data-dpl-app]").forEach((function unMountApp(container){container.innerHTML=""}))}function mount_reset(){return persistor.purge()}!function init(){var initial={apps:{},setToken:token.d,mount:mount,unmount:unmount,reset:mount_reset};window.dplReact=_objectSpread({},window.dplReact||{},{},initial)}(),window.sessionStorage.getItem(token.b)&&(Object(token.d)(token.b,window.sessionStorage.getItem(token.b)),Object(token.d)(token.a,window.sessionStorage.getItem(token.b)));var decorators=[function(Story){return react_default.a.createElement(components_store,null,react_default.a.createElement(Story,null))}];function preview_js_generated_config_entry_ownKeys(object,enumerableOnly){var keys=Object.keys(object);if(Object.getOwnPropertySymbols){var symbols=Object.getOwnPropertySymbols(object);enumerableOnly&&(symbols=symbols.filter((function(sym){return Object.getOwnPropertyDescriptor(object,sym).enumerable}))),keys.push.apply(keys,symbols)}return keys}function preview_js_generated_config_entry_defineProperty(obj,key,value){return key in obj?Object.defineProperty(obj,key,{value:value,enumerable:!0,configurable:!0,writable:!0}):obj[key]=value,obj}Object.keys(preview_namespaceObject).forEach((function(key){var value=preview_namespaceObject[key];switch(key){case"args":case"argTypes":return esm.a.warn("Invalid args/argTypes in config, ignoring.",JSON.stringify(value));case"decorators":return value.forEach((function(decorator){return Object(ClientApi.d)(decorator,!1)}));case"loaders":return value.forEach((function(loader){return Object(ClientApi.e)(loader,!1)}));case"parameters":return Object(ClientApi.f)(function preview_js_generated_config_entry_objectSpread(target){for(var i=1;i<arguments.length;i++){var source=null!=arguments[i]?arguments[i]:{};i%2?preview_js_generated_config_entry_ownKeys(Object(source),!0).forEach((function(key){preview_js_generated_config_entry_defineProperty(target,key,source[key])})):Object.getOwnPropertyDescriptors?Object.defineProperties(target,Object.getOwnPropertyDescriptors(source)):preview_js_generated_config_entry_ownKeys(Object(source)).forEach((function(key){Object.defineProperty(target,key,Object.getOwnPropertyDescriptor(source,key))}))}return target}({},value),!1);case"argTypesEnhancers":return value.forEach((function(enhancer){return Object(ClientApi.b)(enhancer)}));case"argsEnhancers":return value.forEach((function(enhancer){return Object(ClientApi.c)(enhancer)}));case"render":return Object(ClientApi.g)(value);case"globals":case"globalTypes":var v={};return v[key]=value,Object(ClientApi.f)(v,!1);case"__namedExportsOrder":case"decorateStory":case"renderToDOM":return null;default:return console.log(key+" was not supported :( !")}}))},"./generated-stories-entry.js":function(module,exports,__webpack_require__){"use strict";(function(module){(0,__webpack_require__("./node_modules/@storybook/react/dist/esm/client/index.js").configure)([__webpack_require__("./src sync recursive ^\\.(?:(?:^|\\/|(?:(?:(?!(?:^|\\/)\\.).)*?)\\/)(?!\\.)(?=.)[^/]*?\\.dev\\.(jsx|tsx))$")],module,!1)}).call(this,__webpack_require__("./node_modules/@storybook/builder-webpack4/node_modules/webpack/buildin/module.js")(module))},"./node_modules/postcss-loader/src/index.js!./.storybook/dev-fonts.scss":function(module,exports){module.exports="body{font-family:system-ui,Segoe UI,Roboto,Helvetica,Arial,sans-serif,Apple Color Emoji,Segoe UI Emoji,Segoe UI Symbol}"},"./node_modules/postcss-loader/src/index.js!./src/components/components.scss":function(module,exports){module.exports=".dpl-reset{animation:none 0s ease 0s 1 normal none running;-webkit-backface-visibility:visible;backface-visibility:visible;background:transparent none repeat 0 0/auto auto padding-box border-box scroll;border:none;border-collapse:separate;border-image:none;border-radius:0;border-spacing:0;bottom:auto;box-shadow:none;box-sizing:content-box;caption-side:top;clear:none;clip:auto;color:#000;column-fill:balance;column-gap:normal;column-rule:medium none currentColor;column-span:1;columns:auto;content:normal;counter-increment:none;counter-reset:none;cursor:auto;direction:ltr;display:inline;empty-cells:show;float:none;font-family:inherit;font-size:inherit;font-style:inherit;font-variant:inherit;font-weight:inherit;font-stretch:inherit;line-height:inherit;-webkit-hyphens:none;-ms-hyphens:none;hyphens:none;left:auto;letter-spacing:normal;list-style:disc outside none;margin:0;max-height:none;max-width:none;min-height:0;min-width:0;opacity:1;orphans:2;outline:medium none invert;overflow:visible;overflow-x:visible;overflow-y:visible;padding:0;page-break-after:auto;page-break-before:auto;page-break-inside:auto;perspective:none;perspective-origin:50% 50%;position:static;right:auto;-moz-tab-size:8;tab-size:8;table-layout:auto;text-align:left;text-align-last:auto;text-decoration:none;text-indent:0;text-shadow:none;text-transform:none;top:auto;transform:none;transform-origin:50% 50% 0;transform-style:flat;transition:none 0s ease 0s;unicode-bidi:normal;vertical-align:baseline;visibility:visible;white-space:normal;widows:2;word-spacing:normal;z-index:auto}:root{--reach-dialog:1}[data-reach-dialog-overlay]{background:rgba(0,0,0,.33);position:fixed;top:0;right:0;bottom:0;left:0;overflow:auto}[data-reach-dialog-content]{width:50vw;margin:10vh auto;background:#fff;padding:2rem;outline:none}"},"./src sync recursive ^\\.(?:(?:^|\\/|(?:(?:(?!(?:^|\\/)\\.).)*?)\\/)(?!\\.)(?=.)[^/]*?\\.dev\\.(jsx|tsx))$":function(module,exports,__webpack_require__){var map={"./apps/adgangsplatformen/auth.dev.jsx":"./src/apps/adgangsplatformen/auth.dev.jsx","./apps/hello-world/hello-world.dev.tsx":"./src/apps/hello-world/hello-world.dev.tsx","./components/alert/alert.dev.jsx":"./src/components/alert/alert.dev.jsx","./components/hello/hello.dev.tsx":"./src/components/hello/hello.dev.tsx"};function webpackContext(req){var id=webpackContextResolve(req);return __webpack_require__(id)}function webpackContextResolve(req){if(!__webpack_require__.o(map,req)){var e=new Error("Cannot find module '"+req+"'");throw e.code="MODULE_NOT_FOUND",e}return map[req]}webpackContext.keys=function webpackContextKeys(){return Object.keys(map)},webpackContext.resolve=webpackContextResolve,module.exports=webpackContext,webpackContext.id="./src sync recursive ^\\.(?:(?:^|\\/|(?:(?:(?!(?:^|\\/)\\.).)*?)\\/)(?!\\.)(?=.)[^/]*?\\.dev\\.(jsx|tsx))$"},"./src/apps/adgangsplatformen/auth.dev.jsx":function(module,__webpack_exports__,__webpack_require__){"use strict";__webpack_require__.r(__webpack_exports__),__webpack_require__.d(__webpack_exports__,"SignIn",(function(){return SignIn}));var react=__webpack_require__("./node_modules/react/index.js"),react_default=__webpack_require__.n(react),es=(__webpack_require__("./node_modules/core-js/modules/es.array.concat.js"),__webpack_require__("./node_modules/core-js/modules/es.array.iterator.js"),__webpack_require__("./node_modules/core-js/modules/es.object.to-string.js"),__webpack_require__("./node_modules/core-js/modules/es.string.iterator.js"),__webpack_require__("./node_modules/core-js/modules/es.string.replace.js"),__webpack_require__("./node_modules/core-js/modules/es.string.search.js"),__webpack_require__("./node_modules/core-js/modules/web.dom-collections.iterator.js"),__webpack_require__("./node_modules/core-js/modules/web.url.js"),__webpack_require__("./node_modules/react-redux/es/index.js")),unfetch=__webpack_require__("./node_modules/unfetch/dist/unfetch.mjs"),core_token=__webpack_require__("./src/core/token.js"),user_slice=__webpack_require__("./src/core/user.slice.js"),ORIGIN=window.location.origin,PATHNAME=window.location.pathname.replace("/iframe.html","/"),REDIRECT_URL="".concat(ORIGIN).concat(PATHNAME,"?path=/story/adgangsplatformen--sign-in");var auth=function Auth(){var dispatch=Object(es.b)(),status=Object(es.c)((function(s){return s.user.status})),handleCleanUp=Object(react.useCallback)((function(){window.sessionStorage.removeItem(core_token.b),dispatch(Object(user_slice.c)())}),[dispatch]);return react_default.a.useEffect((function(){var code=new URLSearchParams(window.location.search).get("code");code&&Object(unfetch.a)("https://login.bib.dk/oauth/token",{method:"POST",headers:{},body:new URLSearchParams({grant_type:"authorization_code",code:code,client_id:"",client_secret:"secret",redirect_uri:REDIRECT_URL})}).then((function(res){return res.json()})).then((function(res){if(!(null==res?void 0:res.access_token))throw res;window.sessionStorage.setItem(core_token.b,res.access_token),Object(core_token.d)(core_token.b,res.access_token),Object(core_token.d)(core_token.a,res.access_token),dispatch(Object(user_slice.b)())})).catch((function(err){console.error(err),handleCleanUp()}))}),[dispatch,handleCleanUp]),react_default.a.createElement("div",{style:{width:"300px"}},react_default.a.createElement("h2",null,"Adgangsplatformen"),react_default.a.createElement("h5",null,"Status:","authenticated"===status?react_default.a.createElement("span",{style:{color:"green"}}," Signed in"):react_default.a.createElement("span",{style:{color:"red"}}," Signed out")),react_default.a.createElement("div",{style:{display:"grid",gridTemplateColumns:"1fr 1fr",gridColumnGap:10}},react_default.a.createElement("button",{type:"button",onClick:function handleSignIn(){window.parent.location.href="https://login.bib.dk/oauth/authorize?response_type=code&client_id=".concat("","&redirect_uri=").concat(REDIRECT_URL)},style:{width:"100%"}},"Sign in"),react_default.a.createElement("button",{type:"button",onClick:function handleSignOut(){handleCleanUp();var token=Object(core_token.c)(core_token.b);window.parent.location.href="https://login.bib.dk/logout/?access_token=".concat(token)},style:{width:"100%"}},"Sign out")))},SignIn=(__webpack_exports__.default={title:"Adgangsplatformen"},function Template(args){return react_default.a.createElement(auth,args)}.bind({}))},"./src/apps/hello-world/hello-world.dev.tsx":function(module,__webpack_exports__,__webpack_require__){"use strict";__webpack_require__.r(__webpack_exports__),__webpack_require__.d(__webpack_exports__,"App",(function(){return hello_world_dev_App}));var react=__webpack_require__("./node_modules/react/index.js"),react_default=__webpack_require__.n(react),hello=__webpack_require__("./src/components/hello/hello.tsx"),hello_world=function HelloWorld(_ref){var title=_ref.title,introduction=_ref.introduction;return react.createElement("article",null,react.createElement("h2",null,title),react.createElement("p",null,introduction),react.createElement("p",null,react.createElement(hello.a,{what:"world",shouldBeEmphasized:!0})))};try{helloworld.displayName="helloworld",helloworld.__docgenInfo={description:"",displayName:"helloworld",props:{title:{defaultValue:null,description:"",name:"title",required:!0,type:{name:"string"}},introduction:{defaultValue:null,description:"",name:"introduction",required:!0,type:{name:"string"}}}},"undefined"!=typeof STORYBOOK_REACT_CLASSES&&(STORYBOOK_REACT_CLASSES["src/apps/hello-world/hello-world.tsx#helloworld"]={docgenInfo:helloworld.__docgenInfo,name:"helloworld",path:"src/apps/hello-world/hello-world.tsx#helloworld"})}catch(__react_docgen_typescript_loader_error){}var hello_world_entry=function HelloWorldEntry(_ref){var titleText=_ref.titleText,introductionText=_ref.introductionText;return react.createElement(hello_world,{title:titleText,introduction:introductionText})};try{helloworldentry.displayName="helloworldentry",helloworldentry.__docgenInfo={description:"",displayName:"helloworldentry",props:{titleText:{defaultValue:null,description:"",name:"titleText",required:!0,type:{name:"string"}},introductionText:{defaultValue:null,description:"",name:"introductionText",required:!0,type:{name:"string"}}}},"undefined"!=typeof STORYBOOK_REACT_CLASSES&&(STORYBOOK_REACT_CLASSES["src/apps/hello-world/hello-world.entry.tsx#helloworldentry"]={docgenInfo:helloworldentry.__docgenInfo,name:"helloworldentry",path:"src/apps/hello-world/hello-world.entry.tsx#helloworldentry"})}catch(__react_docgen_typescript_loader_error){}__webpack_exports__.default={title:"Hello World",component:hello_world_entry,argTypes:{titleText:{defaultValue:"Greetings",control:{type:"text"}},introductionText:{defaultValue:"We warmly welcome everybody by saying:",control:{type:"text"}}}};var hello_world_dev_App=function App(args){return react_default.a.createElement(hello_world_entry,args)}},"./src/components/alert/alert.dev.jsx":function(module,__webpack_exports__,__webpack_require__){"use strict";__webpack_require__.r(__webpack_exports__),__webpack_require__.d(__webpack_exports__,"Info",(function(){return Info})),__webpack_require__.d(__webpack_exports__,"Warning",(function(){return Warning})),__webpack_require__.d(__webpack_exports__,"Success",(function(){return Success}));var react__WEBPACK_IMPORTED_MODULE_0__=__webpack_require__("./node_modules/react/index.js"),react__WEBPACK_IMPORTED_MODULE_0___default=__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__),_alert__WEBPACK_IMPORTED_MODULE_1__=__webpack_require__("./src/components/alert/alert.jsx");__webpack_exports__.default={title:"Components/Alert"};var Template=function Template(args){return react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_alert__WEBPACK_IMPORTED_MODULE_1__.a,args)},Info=Template.bind({}),Warning=Template.bind({});Warning.args={variant:"warning",message:"Noget gik galt"};var Success=Template.bind({});Success.args={variant:"success",message:"Det lykkedes"}},"./src/components/alert/alert.jsx":function(module,__webpack_exports__,__webpack_require__){"use strict";__webpack_require__("./node_modules/core-js/modules/es.array.concat.js");var react__WEBPACK_IMPORTED_MODULE_1__=__webpack_require__("./node_modules/react/index.js"),react__WEBPACK_IMPORTED_MODULE_1___default=__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_1__),_reach_alert__WEBPACK_IMPORTED_MODULE_3__=(__webpack_require__("./node_modules/prop-types/index.js"),__webpack_require__("./node_modules/@reach/alert/es/index.js"));function Alert(_ref){var className=_ref.className,message=_ref.message,type=_ref.type,variant=_ref.variant;return react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement(_reach_alert__WEBPACK_IMPORTED_MODULE_3__.a,{className:"dpl-alert dpl-alert--".concat(variant," ").concat(className),type:type},message)}Alert.defaultProps={className:"",message:"Hov, der opstod en fejl!",type:"polite",variant:"info"},__webpack_exports__.a=Alert},"./src/components/components.scss":function(module,exports,__webpack_require__){var content=__webpack_require__("./node_modules/postcss-loader/src/index.js!./src/components/components.scss");"string"==typeof content&&(content=[[module.i,content,""]]);var options={insert:"head",singleton:!1};__webpack_require__("./node_modules/style-loader/dist/runtime/injectStylesIntoStyleTag.js")(content,options);content.locals&&(module.exports=content.locals)},"./src/components/hello/hello.dev.tsx":function(module,__webpack_exports__,__webpack_require__){"use strict";__webpack_require__.r(__webpack_exports__),__webpack_require__.d(__webpack_exports__,"HelloWorld",(function(){return HelloWorld})),__webpack_require__.d(__webpack_exports__,"HelloHuman",(function(){return HelloHuman})),__webpack_require__.d(__webpack_exports__,"HelloAnimal",(function(){return HelloAnimal}));var react__WEBPACK_IMPORTED_MODULE_0__=__webpack_require__("./node_modules/react/index.js"),react__WEBPACK_IMPORTED_MODULE_0___default=__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__),_hello__WEBPACK_IMPORTED_MODULE_1__=__webpack_require__("./src/components/hello/hello.tsx");__webpack_exports__.default={title:"Components/Hello",component:_hello__WEBPACK_IMPORTED_MODULE_1__.a,argTypes:{what:{defaultValue:"world"},shouldBeEmphasized:{defaultValue:!0}}};var Template=function Template(args){return react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_hello__WEBPACK_IMPORTED_MODULE_1__.a,args)},HelloWorld=Template.bind({}),HelloHuman=Template.bind({});HelloHuman.args={what:"human"};var HelloAnimal=Template.bind({});HelloAnimal.args={what:"animal"}},"./src/components/hello/hello.tsx":function(module,__webpack_exports__,__webpack_require__){"use strict";__webpack_require__.d(__webpack_exports__,"a",(function(){return Hello}));var react__WEBPACK_IMPORTED_MODULE_0__=__webpack_require__("./node_modules/react/index.js"),Hello=function Hello(_ref){var shouldBeEmphasized=_ref.shouldBeEmphasized,what=_ref.what;return react__WEBPACK_IMPORTED_MODULE_0__.createElement(react__WEBPACK_IMPORTED_MODULE_0__.Fragment,null,"Hello ",shouldBeEmphasized?react__WEBPACK_IMPORTED_MODULE_0__.createElement("strong",null,what):what,"!")};try{Hello.displayName="Hello",Hello.__docgenInfo={description:"",displayName:"Hello",props:{what:{defaultValue:null,description:"",name:"what",required:!0,type:{name:"enum",value:[{value:'"world"'},{value:'"human"'},{value:'"animal"'}]}},shouldBeEmphasized:{defaultValue:null,description:"",name:"shouldBeEmphasized",required:!0,type:{name:"boolean"}}}},"undefined"!=typeof STORYBOOK_REACT_CLASSES&&(STORYBOOK_REACT_CLASSES["src/components/hello/hello.tsx#Hello"]={docgenInfo:Hello.__docgenInfo,name:"Hello",path:"src/components/hello/hello.tsx#Hello"})}catch(__react_docgen_typescript_loader_error){}try{hello.displayName="hello",hello.__docgenInfo={description:"",displayName:"hello",props:{what:{defaultValue:null,description:"",name:"what",required:!0,type:{name:"enum",value:[{value:'"world"'},{value:'"human"'},{value:'"animal"'}]}},shouldBeEmphasized:{defaultValue:null,description:"",name:"shouldBeEmphasized",required:!0,type:{name:"boolean"}}}},"undefined"!=typeof STORYBOOK_REACT_CLASSES&&(STORYBOOK_REACT_CLASSES["src/components/hello/hello.tsx#hello"]={docgenInfo:hello.__docgenInfo,name:"hello",path:"src/components/hello/hello.tsx#hello"})}catch(__react_docgen_typescript_loader_error){}},"./src/core/token.js":function(module,__webpack_exports__,__webpack_require__){"use strict";__webpack_require__.d(__webpack_exports__,"b",(function(){return TOKEN_USER_KEY})),__webpack_require__.d(__webpack_exports__,"a",(function(){return TOKEN_LIBRARY_KEY})),__webpack_require__.d(__webpack_exports__,"d",(function(){return setToken})),__webpack_require__.d(__webpack_exports__,"c",(function(){return getToken}));var tokens={},TOKEN_USER_KEY="user",TOKEN_LIBRARY_KEY="library";function setToken(type,value){tokens[type]=value}function getToken(type){return tokens[type]}},"./src/core/user.slice.js":function(module,__webpack_exports__,__webpack_require__){"use strict";__webpack_require__.d(__webpack_exports__,"b",(function(){return setStatusAuthenticated})),__webpack_require__.d(__webpack_exports__,"c",(function(){return setStatusUnauthenticated}));__webpack_require__("./node_modules/core-js/modules/es.object.to-string.js"),__webpack_require__("./node_modules/core-js/modules/es.promise.js");var _reduxjs_toolkit__WEBPACK_IMPORTED_MODULE_2__=__webpack_require__("./node_modules/@reduxjs/toolkit/dist/redux-toolkit.esm.js");var attemptAuthentication=Object(_reduxjs_toolkit__WEBPACK_IMPORTED_MODULE_2__.b)("user/attemptAuthentication",(function(){return Promise.resolve()})),userSlice=Object(_reduxjs_toolkit__WEBPACK_IMPORTED_MODULE_2__.c)({name:"user",initialState:{status:"unauthenticated"},reducers:{updateStatus:function updateStatus(state,action){"unauthenticated"!==state.status&&"attempting"!==state.status||(action.payload.hasToken?state.status="authenticated":action.payload.doFail&&"attempting"===state.status&&(state.status="failed"))},setStatusAuthenticated:function setStatusAuthenticated(state){state.status="authenticated"},setStatusUnauthenticated:function setStatusUnauthenticated(state){state.status="unauthenticated"}},extraReducers:function _defineProperty(obj,key,value){return key in obj?Object.defineProperty(obj,key,{value:value,enumerable:!0,configurable:!0,writable:!0}):obj[key]=value,obj}({},attemptAuthentication.pending,(function(state){state.status="attempting"}))}),_userSlice$actions=userSlice.actions,setStatusAuthenticated=(_userSlice$actions.updateStatus,_userSlice$actions.setStatusAuthenticated),setStatusUnauthenticated=_userSlice$actions.setStatusUnauthenticated;__webpack_exports__.a=userSlice.reducer},"./storybook-init-framework-entry.js":function(module,__webpack_exports__,__webpack_require__){"use strict";__webpack_require__.r(__webpack_exports__);__webpack_require__("./node_modules/@storybook/react/dist/esm/client/index.js")},0:function(module,exports,__webpack_require__){__webpack_require__("./node_modules/@storybook/core-client/dist/esm/globals/polyfills.js"),__webpack_require__("./node_modules/@storybook/core-client/dist/esm/globals/globals.js"),__webpack_require__("./storybook-init-framework-entry.js"),__webpack_require__("./node_modules/@storybook/addon-docs/dist/esm/frameworks/common/config.js-generated-config-entry.js"),__webpack_require__("./node_modules/@storybook/addon-docs/dist/esm/frameworks/react/config.js-generated-config-entry.js"),__webpack_require__("./node_modules/@storybook/react/dist/esm/client/preview/config-generated-config-entry.js"),__webpack_require__("./.storybook/preview.js-generated-config-entry.js"),module.exports=__webpack_require__("./generated-stories-entry.js")},1:function(module,exports){},2:function(module,exports){},3:function(module,exports){}},[[0,5,6]]]);