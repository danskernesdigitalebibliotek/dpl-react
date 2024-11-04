(()=>{"use strict";var deferred,leafPrototypes,getProto,inProgress,__webpack_modules__={},__webpack_module_cache__={};function __webpack_require__(moduleId){var cachedModule=__webpack_module_cache__[moduleId];if(void 0!==cachedModule)return cachedModule.exports;var module=__webpack_module_cache__[moduleId]={id:moduleId,loaded:!1,exports:{}};return __webpack_modules__[moduleId].call(module.exports,module,module.exports,__webpack_require__),module.loaded=!0,module.exports}__webpack_require__.m=__webpack_modules__,__webpack_require__.amdO={},deferred=[],__webpack_require__.O=(result,chunkIds,fn,priority)=>{if(!chunkIds){var notFulfilled=1/0;for(i=0;i<deferred.length;i++){for(var[chunkIds,fn,priority]=deferred[i],fulfilled=!0,j=0;j<chunkIds.length;j++)(!1&priority||notFulfilled>=priority)&&Object.keys(__webpack_require__.O).every((key=>__webpack_require__.O[key](chunkIds[j])))?chunkIds.splice(j--,1):(fulfilled=!1,priority<notFulfilled&&(notFulfilled=priority));if(fulfilled){deferred.splice(i--,1);var r=fn();void 0!==r&&(result=r)}}return result}priority=priority||0;for(var i=deferred.length;i>0&&deferred[i-1][2]>priority;i--)deferred[i]=deferred[i-1];deferred[i]=[chunkIds,fn,priority]},__webpack_require__.n=module=>{var getter=module&&module.__esModule?()=>module.default:()=>module;return __webpack_require__.d(getter,{a:getter}),getter},getProto=Object.getPrototypeOf?obj=>Object.getPrototypeOf(obj):obj=>obj.__proto__,__webpack_require__.t=function(value,mode){if(1&mode&&(value=this(value)),8&mode)return value;if("object"==typeof value&&value){if(4&mode&&value.__esModule)return value;if(16&mode&&"function"==typeof value.then)return value}var ns=Object.create(null);__webpack_require__.r(ns);var def={};leafPrototypes=leafPrototypes||[null,getProto({}),getProto([]),getProto(getProto)];for(var current=2&mode&&value;"object"==typeof current&&!~leafPrototypes.indexOf(current);current=getProto(current))Object.getOwnPropertyNames(current).forEach((key=>def[key]=()=>value[key]));return def.default=()=>value,__webpack_require__.d(ns,def),ns},__webpack_require__.d=(exports,definition)=>{for(var key in definition)__webpack_require__.o(definition,key)&&!__webpack_require__.o(exports,key)&&Object.defineProperty(exports,key,{enumerable:!0,get:definition[key]})},__webpack_require__.f={},__webpack_require__.e=chunkId=>Promise.all(Object.keys(__webpack_require__.f).reduce(((promises,key)=>(__webpack_require__.f[key](chunkId,promises),promises)),[])),__webpack_require__.u=chunkId=>(({483:"apps-dashboard-dashboard-stories",523:"apps-recommender-Recommender-stories",965:"components-availability-label-availability-label-stories",1615:"apps-adgangsplatformen-user-token-stories",1789:"apps-material-grid-manual-MaterialGridManual-stories",1828:"apps-loan-list-list-loan-list-stories",2242:"apps-advanced-search-AdvancedSearch-stories",2358:"apps-something-similar-SomethingSimilar-stories",2415:"apps-adgangsplatformen-library-token-stories",2521:"components-search-bar-search-bar-stories",2566:"apps-reservation-list-list-reservation-list-stories",3271:"apps-search-header-search-header-stories",3407:"components-alert-alert-stories",3989:"apps-material-grid-automatic-MaterialGridAutomatic-stories",4198:"apps-fee-list-FeeList-stories",4514:"apps-material-search-MaterialSearch-stories",4614:"apps-opening-hours-OpeningHours-stories",4695:"apps-menu-menu-stories",5155:"apps-search-result-search-result-stories",5156:"components-message-modal-message-ModalMessage-stories",5164:"apps-favorites-list-material-component-FavoritesListMaterialComponent-stories",5703:"components-error-boundary-alert-ErrorBoundaryAlert-stories",6016:"apps-recommended-material-RecommendedMaterial-stories",6384:"apps-patron-page-PatronPage-stories",6996:"apps-favorites-list-FavoritesList-stories",7035:"components-cover-cover-stories",7211:"apps-demo-modal-demo-modal-stories",7623:"apps-opening-hours-editor-OpeningHoursEditor-stories",7651:"apps-material-material-stories",8371:"apps-recommendation-recommendation-stories",8429:"apps-create-patron-user-info-CreatePatron-stories",8625:"apps-opening-hours-sidebar-OpeningHoursSidebar-stories",9081:"components-button-favourite-button-favourite-stories",9206:"components-find-on-shelf-FindOnShelfModal-stories",9439:"components-multiselect-Multiselect-stories"}[chunkId]||chunkId)+"."+{483:"fb5b5c66",523:"ba6eb5ef",965:"0d676b78",968:"a3e0af15",1001:"19378168",1143:"9a9715e8",1358:"b193f837",1505:"67acdc5e",1615:"c6ef1058",1789:"6b88f651",1828:"2ee4b54f",2242:"20ebc27c",2358:"3c6c57ac",2415:"822f3add",2422:"49f60483",2433:"dd47c34d",2521:"d0674201",2566:"32f22bcf",2746:"5ee7e5fc",2793:"f3e2c82e",3164:"17563571",3206:"301de416",3221:"be222d63",3271:"d3ddf330",3407:"283c3a35",3413:"bd8e63f6",3635:"fd3ec06c",3714:"6b25a68a",3936:"a29bbfd2",3989:"a0736bb2",4184:"7ff8cb7a",4198:"dcd49968",4514:"066571d3",4614:"3f706178",4695:"d1d73ac8",4708:"3e0e8ee2",4866:"d2a055f9",5155:"e6232805",5156:"62cac93c",5164:"c1b01e65",5330:"7780cea7",5415:"184f7f2e",5703:"e43ba964",6016:"1791f928",6384:"b7c3afe8",6651:"3aab2250",6933:"f1fc137c",6996:"495efc16",7035:"0ae43263",7076:"908e012b",7211:"f78bbd50",7289:"075b1d54",7623:"dbb1476d",7651:"2af80a82",8371:"fa7256ff",8429:"bb5c8b41",8625:"7a8d624c",9081:"668be98d",9186:"c8128225",9206:"ddf64af7",9387:"ad312049",9439:"e8abba12",9486:"cda96dc4",9523:"673e2ca9",9595:"a0b30d2f",9923:"c4f63bdd"}[chunkId]+".iframe.bundle.js"),__webpack_require__.g=function(){if("object"==typeof globalThis)return globalThis;try{return this||new Function("return this")()}catch(e){if("object"==typeof window)return window}}(),__webpack_require__.o=(obj,prop)=>Object.prototype.hasOwnProperty.call(obj,prop),inProgress={},__webpack_require__.l=(url,done,key,chunkId)=>{if(inProgress[url])inProgress[url].push(done);else{var script,needAttach;if(void 0!==key)for(var scripts=document.getElementsByTagName("script"),i=0;i<scripts.length;i++){var s=scripts[i];if(s.getAttribute("src")==url||s.getAttribute("data-webpack")=="@danskernesdigitalebibliotek/dpl-react:"+key){script=s;break}}script||(needAttach=!0,(script=document.createElement("script")).charset="utf-8",script.timeout=120,__webpack_require__.nc&&script.setAttribute("nonce",__webpack_require__.nc),script.setAttribute("data-webpack","@danskernesdigitalebibliotek/dpl-react:"+key),script.src=url),inProgress[url]=[done];var onScriptComplete=(prev,event)=>{script.onerror=script.onload=null,clearTimeout(timeout);var doneFns=inProgress[url];if(delete inProgress[url],script.parentNode&&script.parentNode.removeChild(script),doneFns&&doneFns.forEach((fn=>fn(event))),prev)return prev(event)},timeout=setTimeout(onScriptComplete.bind(null,void 0,{type:"timeout",target:script}),12e4);script.onerror=onScriptComplete.bind(null,script.onerror),script.onload=onScriptComplete.bind(null,script.onload),needAttach&&document.head.appendChild(script)}},__webpack_require__.r=exports=>{"undefined"!=typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(exports,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(exports,"__esModule",{value:!0})},__webpack_require__.nmd=module=>(module.paths=[],module.children||(module.children=[]),module),__webpack_require__.p="",(()=>{__webpack_require__.b=document.baseURI||self.location.href;var installedChunks={5354:0};__webpack_require__.f.j=(chunkId,promises)=>{var installedChunkData=__webpack_require__.o(installedChunks,chunkId)?installedChunks[chunkId]:void 0;if(0!==installedChunkData)if(installedChunkData)promises.push(installedChunkData[2]);else if(5354!=chunkId){var promise=new Promise(((resolve,reject)=>installedChunkData=installedChunks[chunkId]=[resolve,reject]));promises.push(installedChunkData[2]=promise);var url=__webpack_require__.p+__webpack_require__.u(chunkId),error=new Error;__webpack_require__.l(url,(event=>{if(__webpack_require__.o(installedChunks,chunkId)&&(0!==(installedChunkData=installedChunks[chunkId])&&(installedChunks[chunkId]=void 0),installedChunkData)){var errorType=event&&("load"===event.type?"missing":event.type),realSrc=event&&event.target&&event.target.src;error.message="Loading chunk "+chunkId+" failed.\n("+errorType+": "+realSrc+")",error.name="ChunkLoadError",error.type=errorType,error.request=realSrc,installedChunkData[1](error)}}),"chunk-"+chunkId,chunkId)}else installedChunks[chunkId]=0},__webpack_require__.O.j=chunkId=>0===installedChunks[chunkId];var webpackJsonpCallback=(parentChunkLoadingFunction,data)=>{var moduleId,chunkId,[chunkIds,moreModules,runtime]=data,i=0;if(chunkIds.some((id=>0!==installedChunks[id]))){for(moduleId in moreModules)__webpack_require__.o(moreModules,moduleId)&&(__webpack_require__.m[moduleId]=moreModules[moduleId]);if(runtime)var result=runtime(__webpack_require__)}for(parentChunkLoadingFunction&&parentChunkLoadingFunction(data);i<chunkIds.length;i++)chunkId=chunkIds[i],__webpack_require__.o(installedChunks,chunkId)&&installedChunks[chunkId]&&installedChunks[chunkId][0](),installedChunks[chunkId]=0;return __webpack_require__.O(result)},chunkLoadingGlobal=globalThis.webpackChunk_danskernesdigitalebibliotek_dpl_react=globalThis.webpackChunk_danskernesdigitalebibliotek_dpl_react||[];chunkLoadingGlobal.forEach(webpackJsonpCallback.bind(null,0)),chunkLoadingGlobal.push=webpackJsonpCallback.bind(null,chunkLoadingGlobal.push.bind(chunkLoadingGlobal))})(),__webpack_require__.nc=void 0})();