"use strict";(globalThis.webpackChunk_danskernesdigitalebibliotek_dpl_react=globalThis.webpackChunk_danskernesdigitalebibliotek_dpl_react||[]).push([[2415],{"./src/apps/adgangsplatformen/library-token.stories.tsx":(__unused_webpack_module,__webpack_exports__,__webpack_require__)=>{__webpack_require__.r(__webpack_exports__),__webpack_require__.d(__webpack_exports__,{LibraryTokenApp:()=>LibraryTokenApp,default:()=>library_token_stories});var react=__webpack_require__("./node_modules/react/index.js"),es=__webpack_require__("./node_modules/react-query/es/index.js"),token=__webpack_require__("./src/core/token.js");const library_token=()=>{const[inputValue,setInputValue]=(0,react.useState)(""),[shouldShowSuccessMessage,setShowSuccessMessage]=(0,react.useState)(!1),queryClient=(0,es.useQueryClient)(),setInputValueHandler=(0,react.useCallback)((event=>{const{target:{value:token}}=event;setInputValue(token)}),[setInputValue]),setLibraryTokenHandler=(0,react.useCallback)((()=>{window.sessionStorage.setItem(token._L,inputValue),(0,token.WG)(token._L,inputValue),setShowSuccessMessage(!0),queryClient.clear()}),[queryClient,inputValue]);return react.createElement("div",{className:"p-8"},react.createElement("p",null,"Insert Library token:"),react.createElement("input",{className:"mt-8 mr-8",value:inputValue,onChange:setInputValueHandler,size:41}),react.createElement("button",{type:"submit",onClick:setLibraryTokenHandler},"Save"),react.createElement("p",{className:"text-small-caption mt-8"},"In order to test apps for anonymous users,",react.createElement("br",null),"you can insert a library token in this field."),shouldShowSuccessMessage&&react.createElement("p",{className:"text-small-caption mt-8"},"The token was saved"))};try{librarytoken.displayName="librarytoken",librarytoken.__docgenInfo={description:"This component is only to be used in Storybook context.\nLike the auth component it offers a way to set the needed context\nin order for the apps to be able to operate properly.\n\nThis component offers a way to set the current library token.",displayName:"librarytoken",props:{}},"undefined"!=typeof STORYBOOK_REACT_CLASSES&&(STORYBOOK_REACT_CLASSES["src/apps/adgangsplatformen/library-token.tsx#librarytoken"]={docgenInfo:librarytoken.__docgenInfo,name:"librarytoken",path:"src/apps/adgangsplatformen/library-token.tsx#librarytoken"})}catch(__react_docgen_typescript_loader_error){}const library_token_stories={title:"SB Utilities / Set Library Token",component:library_token},LibraryTokenApp=()=>react.createElement(library_token,null);LibraryTokenApp.parameters={...LibraryTokenApp.parameters,docs:{...LibraryTokenApp.parameters?.docs,source:{originalSource:"() => {\n  return <LibraryToken />;\n}",...LibraryTokenApp.parameters?.docs?.source}}}}}]);