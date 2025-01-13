"use strict";(globalThis.webpackChunk_danskernesdigitalebibliotek_dpl_react=globalThis.webpackChunk_danskernesdigitalebibliotek_dpl_react||[]).push([[1615],{"./src/apps/adgangsplatformen/user-token.stories.tsx":(__unused_webpack_module,__webpack_exports__,__webpack_require__)=>{__webpack_require__.r(__webpack_exports__),__webpack_require__.d(__webpack_exports__,{UserTokenApp:()=>UserTokenApp,default:()=>user_token_stories});var react=__webpack_require__("./node_modules/react/index.js"),es=__webpack_require__("./node_modules/react-query/es/index.js"),token=__webpack_require__("./src/core/token.js");const user_token=()=>{const[inputValue,setInputValue]=(0,react.useState)(""),[shouldShowSuccessMessage,setShowSuccessMessage]=(0,react.useState)(!1),queryClient=(0,es.useQueryClient)(),setInputValueHandler=(0,react.useCallback)((event=>{const{target:{value:token}}=event;setInputValue(token)}),[setInputValue]),setUserTokenHandler=(0,react.useCallback)((()=>{window.sessionStorage.setItem(token.CI,inputValue),(0,token.WG)(token.CI,inputValue),setShowSuccessMessage(!0),queryClient.clear()}),[queryClient,inputValue]);return react.createElement("div",{className:"p-8"},react.createElement("p",null,"Insert User token:"),react.createElement("input",{className:"mt-8 mr-8",value:inputValue,onChange:setInputValueHandler,size:41}),react.createElement("button",{type:"submit",onClick:setUserTokenHandler},"Save"),react.createElement("p",{className:"text-small-caption mt-8"},"In order to test apps for logged in users,",react.createElement("br",null),"you can insert a user token in this field."),shouldShowSuccessMessage&&react.createElement("p",{className:"text-small-caption mt-8"},"The token was saved"))};try{usertoken.displayName="usertoken",usertoken.__docgenInfo={description:"This component is only to be used in Storybook context.\nLike the auth component it offers a way to set the needed context\nin order for the apps to be able to operate properly.\n\nThis component offers a way to set the current user token.",displayName:"usertoken",props:{}},"undefined"!=typeof STORYBOOK_REACT_CLASSES&&(STORYBOOK_REACT_CLASSES["src/apps/adgangsplatformen/user-token.tsx#usertoken"]={docgenInfo:usertoken.__docgenInfo,name:"usertoken",path:"src/apps/adgangsplatformen/user-token.tsx#usertoken"})}catch(__react_docgen_typescript_loader_error){}const user_token_stories={title:"SB Utilities / Set User Token",component:user_token},UserTokenApp=()=>react.createElement(user_token,null);UserTokenApp.parameters={...UserTokenApp.parameters,docs:{...UserTokenApp.parameters?.docs,source:{originalSource:"() => {\n  return <UserToken />;\n}",...UserTokenApp.parameters?.docs?.source}}}}}]);