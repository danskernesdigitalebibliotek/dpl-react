(globalThis.webpackChunk_danskernesdigitalebibliotek_dpl_react=globalThis.webpackChunk_danskernesdigitalebibliotek_dpl_react||[]).push([[965],{"./src/components/availability-label/availability-label.stories.tsx":(__unused_webpack_module,__webpack_exports__,__webpack_require__)=>{"use strict";__webpack_require__.r(__webpack_exports__),__webpack_require__.d(__webpack_exports__,{Available:()=>Available,EBogPrinsenHarry:()=>EBogPrinsenHarry,MoreThanOneID:()=>MoreThanOneID,Selected:()=>Selected,Unavailable:()=>Unavailable,default:()=>__WEBPACK_DEFAULT_EXPORT__});var react__WEBPACK_IMPORTED_MODULE_0__=__webpack_require__("./node_modules/react/index.js"),_core_storybook_serviceUrlArgs__WEBPACK_IMPORTED_MODULE_1__=__webpack_require__("./src/core/storybook/serviceUrlArgs.ts"),_core_utils_config__WEBPACK_IMPORTED_MODULE_2__=__webpack_require__("./src/core/utils/config.tsx"),_core_utils_helpers_url__WEBPACK_IMPORTED_MODULE_8__=__webpack_require__("./src/core/utils/helpers/url.ts"),_core_utils_url__WEBPACK_IMPORTED_MODULE_3__=__webpack_require__("./src/core/utils/url.tsx"),_availability_label__WEBPACK_IMPORTED_MODULE_4__=__webpack_require__("./src/components/availability-label/availability-label.tsx"),_core_storybook_globalTextArgs__WEBPACK_IMPORTED_MODULE_5__=__webpack_require__("./src/core/storybook/globalTextArgs.ts"),_core_storybook_globalConfigArgs__WEBPACK_IMPORTED_MODULE_6__=__webpack_require__("./src/core/storybook/globalConfigArgs.ts"),_core_dbc_gateway_generated_graphql__WEBPACK_IMPORTED_MODULE_7__=__webpack_require__("./src/core/dbc-gateway/generated/graphql.ts");const __WEBPACK_DEFAULT_EXPORT__={title:"Components/Availability Label",component:_availability_label__WEBPACK_IMPORTED_MODULE_4__.Y,argTypes:{..._core_storybook_serviceUrlArgs__WEBPACK_IMPORTED_MODULE_1__.A,..._core_storybook_globalTextArgs__WEBPACK_IMPORTED_MODULE_5__.A,..._core_storybook_globalConfigArgs__WEBPACK_IMPORTED_MODULE_6__.A,faustIds:{name:"Faust Ids",control:{type:"object"}},manifestText:{name:"Manifestation text",control:{type:"text"}},url:{name:"Link",control:{type:"text"}},selected:{name:"selected",control:{type:"boolean"}},cursorPointer:{name:"Cursor pointer",control:{type:"boolean"}},dataCy:{name:"Cypress data attribute",control:{type:"text"}},isbns:{name:"ISBN",control:{type:"text"}},accessTypes:{name:"Access types",options:[...Object.values(_core_dbc_gateway_generated_graphql__WEBPACK_IMPORTED_MODULE_7__.PS)],control:{type:"check"}}},args:{..._core_storybook_serviceUrlArgs__WEBPACK_IMPORTED_MODULE_1__.A,..._core_storybook_globalTextArgs__WEBPACK_IMPORTED_MODULE_5__.A,..._core_storybook_globalConfigArgs__WEBPACK_IMPORTED_MODULE_6__.A,faustIds:["62523611"],cursorPointer:!1,dataCy:"",isbns:[],accessTypes:[],manifestText:"Bog",url:new URL("/",(0,_core_utils_helpers_url__WEBPACK_IMPORTED_MODULE_8__.Lu)()),selected:!1},decorators:[Story=>{const DecoratedStory=(0,_core_utils_url__WEBPACK_IMPORTED_MODULE_3__.nU)((0,_core_utils_config__WEBPACK_IMPORTED_MODULE_2__.NV)(Story));return react__WEBPACK_IMPORTED_MODULE_0__.createElement(DecoratedStory,null)}]},Available={args:{faustIds:["61435867"]}},MoreThanOneID={args:{faustIds:["62523611","62150041","61435867"]}},Selected={args:{faustIds:["62523611"],manifestText:"lydbog (cd-mp3)",selected:!0}},Unavailable={args:{faustIds:["62523611"],manifestText:"ebog"}},EBogPrinsenHarry={args:{isbns:["9788763844123"],manifestText:"ebog",accessTypes:[_core_dbc_gateway_generated_graphql__WEBPACK_IMPORTED_MODULE_7__.PS.Online]}};Available.parameters={...Available.parameters,docs:{...Available.parameters?.docs,source:{originalSource:'{\n  args: {\n    faustIds: ["61435867"]\n  }\n}',...Available.parameters?.docs?.source}}},MoreThanOneID.parameters={...MoreThanOneID.parameters,docs:{...MoreThanOneID.parameters?.docs,source:{originalSource:'{\n  args: {\n    faustIds: ["62523611", "62150041", "61435867"]\n  }\n}',...MoreThanOneID.parameters?.docs?.source}}},Selected.parameters={...Selected.parameters,docs:{...Selected.parameters?.docs,source:{originalSource:'{\n  args: {\n    faustIds: ["62523611"],\n    manifestText: "lydbog (cd-mp3)",\n    selected: true\n  }\n}',...Selected.parameters?.docs?.source}}},Unavailable.parameters={...Unavailable.parameters,docs:{...Unavailable.parameters?.docs,source:{originalSource:'{\n  args: {\n    faustIds: ["62523611"],\n    manifestText: "ebog"\n  }\n}',...Unavailable.parameters?.docs?.source}}},EBogPrinsenHarry.parameters={...EBogPrinsenHarry.parameters,docs:{...EBogPrinsenHarry.parameters?.docs,source:{originalSource:'{\n  args: {\n    isbns: ["9788763844123"],\n    manifestText: "ebog",\n    accessTypes: [AccessTypeCodeEnum.Online]\n  }\n}',...EBogPrinsenHarry.parameters?.docs?.source}}}},"./src/components/availability-label/availability-label-inside.tsx":(__unused_webpack_module,__webpack_exports__,__webpack_require__)=>{"use strict";__webpack_require__.d(__webpack_exports__,{A:()=>__WEBPACK_DEFAULT_EXPORT__});var clsx__WEBPACK_IMPORTED_MODULE_3__=__webpack_require__("./node_modules/clsx/dist/clsx.mjs"),react__WEBPACK_IMPORTED_MODULE_0__=__webpack_require__("./node_modules/react/index.js"),_danskernesdigitalebibliotek_dpl_design_system_build_icons_collection_Check_svg__WEBPACK_IMPORTED_MODULE_1__=__webpack_require__("./node_modules/@danskernesdigitalebibliotek/dpl-design-system/build/icons/collection/Check.svg"),_danskernesdigitalebibliotek_dpl_design_system_build_icons_collection_Check_svg__WEBPACK_IMPORTED_MODULE_1___default=__webpack_require__.n(_danskernesdigitalebibliotek_dpl_design_system_build_icons_collection_Check_svg__WEBPACK_IMPORTED_MODULE_1__),_skeletons_TextLineSkeleton__WEBPACK_IMPORTED_MODULE_2__=__webpack_require__("./src/components/skeletons/TextLineSkeleton.tsx");const __WEBPACK_DEFAULT_EXPORT__=({selected,isLoading,isAvailable,manifestText,availabilityText,quantity})=>{const availableTriangleCss=isAvailable?"success":"alert",classes={triangle:(0,clsx__WEBPACK_IMPORTED_MODULE_3__.A)({"pagefold-triangle--none":selected},{[`pagefold-triangle--xsmall pagefold-triangle--${availableTriangleCss}`]:!selected}),check:(0,clsx__WEBPACK_IMPORTED_MODULE_3__.A)("availability-label__check",selected&&"selected")};return react__WEBPACK_IMPORTED_MODULE_0__.createElement(react__WEBPACK_IMPORTED_MODULE_0__.Fragment,null,react__WEBPACK_IMPORTED_MODULE_0__.createElement("div",{className:classes.triangle}),react__WEBPACK_IMPORTED_MODULE_0__.createElement("img",{className:classes.check,src:_danskernesdigitalebibliotek_dpl_design_system_build_icons_collection_Check_svg__WEBPACK_IMPORTED_MODULE_1___default(),alt:""}),manifestText&&react__WEBPACK_IMPORTED_MODULE_0__.createElement(react__WEBPACK_IMPORTED_MODULE_0__.Fragment,null,react__WEBPACK_IMPORTED_MODULE_0__.createElement("p",{className:"availability-label__text text-label-semibold ml-24","data-cy":"availability-label-type"},manifestText),react__WEBPACK_IMPORTED_MODULE_0__.createElement("div",{className:"availability-label__divider ml-4"})),react__WEBPACK_IMPORTED_MODULE_0__.createElement("p",{className:`availability-label__text text-label-normal ${manifestText?"ml-4":"ml-24"} mr-8`,"data-cy":"availability-label-status"},isLoading?react__WEBPACK_IMPORTED_MODULE_0__.createElement(_skeletons_TextLineSkeleton__WEBPACK_IMPORTED_MODULE_2__.A,{width:40}):availabilityText),quantity&&react__WEBPACK_IMPORTED_MODULE_0__.createElement(react__WEBPACK_IMPORTED_MODULE_0__.Fragment,null,react__WEBPACK_IMPORTED_MODULE_0__.createElement("div",{className:"availability-label--divider ml-4"}),react__WEBPACK_IMPORTED_MODULE_0__.createElement("p",{className:"text-label-normal mx-8"},quantity," stk")))};try{availabilitylabelinside.displayName="availabilitylabelinside",availabilitylabelinside.__docgenInfo={description:"",displayName:"availabilitylabelinside",props:{selected:{defaultValue:null,description:"",name:"selected",required:!1,type:{name:"boolean | undefined"}},isLoading:{defaultValue:null,description:"",name:"isLoading",required:!0,type:{name:"boolean"}},isAvailable:{defaultValue:null,description:"",name:"isAvailable",required:!1,type:{name:"boolean | undefined"}},manifestText:{defaultValue:null,description:"",name:"manifestText",required:!0,type:{name:"string"}},availabilityText:{defaultValue:null,description:"",name:"availabilityText",required:!1,type:{name:"string | undefined"}},quantity:{defaultValue:null,description:"",name:"quantity",required:!1,type:{name:"number | undefined"}}}},"undefined"!=typeof STORYBOOK_REACT_CLASSES&&(STORYBOOK_REACT_CLASSES["src/components/availability-label/availability-label-inside.tsx#availabilitylabelinside"]={docgenInfo:availabilitylabelinside.__docgenInfo,name:"availabilitylabelinside",path:"src/components/availability-label/availability-label-inside.tsx#availabilitylabelinside"})}catch(__react_docgen_typescript_loader_error){}},"./src/components/availability-label/availability-label.tsx":(__unused_webpack_module,__webpack_exports__,__webpack_require__)=>{"use strict";__webpack_require__.d(__webpack_exports__,{Y:()=>AvailabilityLabel});var lodash_first__WEBPACK_IMPORTED_MODULE_0__=__webpack_require__("./node_modules/lodash/first.js"),lodash_first__WEBPACK_IMPORTED_MODULE_0___default=__webpack_require__.n(lodash_first__WEBPACK_IMPORTED_MODULE_0__),react__WEBPACK_IMPORTED_MODULE_1__=__webpack_require__("./node_modules/react/index.js"),react_use__WEBPACK_IMPORTED_MODULE_9__=__webpack_require__("./node_modules/react-use/esm/useDeepCompareEffect.js"),_core_utils_text__WEBPACK_IMPORTED_MODULE_2__=__webpack_require__("./src/core/utils/text.tsx"),_atoms_links_LinkNoStyle__WEBPACK_IMPORTED_MODULE_3__=__webpack_require__("./src/components/atoms/links/LinkNoStyle.tsx"),_core_statistics_useStatistics__WEBPACK_IMPORTED_MODULE_4__=__webpack_require__("./src/core/statistics/useStatistics.ts"),_core_statistics_statistics__WEBPACK_IMPORTED_MODULE_5__=__webpack_require__("./src/core/statistics/statistics.ts"),_helper__WEBPACK_IMPORTED_MODULE_6__=__webpack_require__("./src/components/availability-label/helper.ts"),_availability_label_inside__WEBPACK_IMPORTED_MODULE_7__=__webpack_require__("./src/components/availability-label/availability-label-inside.tsx"),_useAvailabilityData__WEBPACK_IMPORTED_MODULE_8__=__webpack_require__("./src/components/availability-label/useAvailabilityData.ts");const AvailabilityLabel=({manifestText,accessTypes,access,selected=!1,url,faustIds,handleSelectManifestation,cursorPointer=!1,dataCy="availability-label",isbns,isVisualOnly})=>{const{track}=(0,_core_statistics_useStatistics__WEBPACK_IMPORTED_MODULE_4__.B)(),t=(0,_core_utils_text__WEBPACK_IMPORTED_MODULE_2__.F)(),{isLoading,isAvailable}=(0,_useAvailabilityData__WEBPACK_IMPORTED_MODULE_8__.A)({accessTypes,access,faustIds,isbn:lodash_first__WEBPACK_IMPORTED_MODULE_0___default()(isbns)||null,manifestText}),availabilityText=t(isAvailable?"availabilityAvailableText":"availabilityUnavailableText");(0,react_use__WEBPACK_IMPORTED_MODULE_9__.A)((()=>{selected&&track("click",{id:_core_statistics_statistics__WEBPACK_IMPORTED_MODULE_5__.o.materialStatus.id,name:_core_statistics_statistics__WEBPACK_IMPORTED_MODULE_5__.o.materialStatus.name,trackedData:availabilityText})}),[faustIds,selected]);const availabilityLabel=react__WEBPACK_IMPORTED_MODULE_1__.createElement(_availability_label_inside__WEBPACK_IMPORTED_MODULE_7__.A,{selected,isLoading:!!isLoading,isAvailable:!!isAvailable,manifestText,availabilityText}),parentClass=(0,_helper__WEBPACK_IMPORTED_MODULE_6__.Mk)({selected,cursorPointer});return isVisualOnly?react__WEBPACK_IMPORTED_MODULE_1__.createElement("div",{className:parentClass,"data-cy":dataCy},availabilityLabel):url&&!handleSelectManifestation?react__WEBPACK_IMPORTED_MODULE_1__.createElement(_atoms_links_LinkNoStyle__WEBPACK_IMPORTED_MODULE_3__.A,{className:parentClass,url,"data-cy":dataCy},availabilityLabel):react__WEBPACK_IMPORTED_MODULE_1__.createElement("button",{className:parentClass,type:"button",onClick:handleSelectManifestation,"data-cy":dataCy,"aria-pressed":selected},availabilityLabel)};try{AvailabilityLabel.displayName="AvailabilityLabel",AvailabilityLabel.__docgenInfo={description:"",displayName:"AvailabilityLabel",props:{manifestText:{defaultValue:null,description:"",name:"manifestText",required:!0,type:{name:"string"}},accessTypes:{defaultValue:null,description:"",name:"accessTypes",required:!0,type:{name:"AccessTypeCodeEnum[]"}},access:{defaultValue:null,description:"",name:"access",required:!0,type:{name:"AccessTypes[]"}},selected:{defaultValue:{value:"false"},description:"",name:"selected",required:!1,type:{name:"boolean | undefined"}},url:{defaultValue:null,description:"",name:"url",required:!1,type:{name:"URL | undefined"}},faustIds:{defaultValue:null,description:"",name:"faustIds",required:!0,type:{name:"string[]"}},handleSelectManifestation:{defaultValue:null,description:"",name:"handleSelectManifestation",required:!1,type:{name:"(() => void | undefined) | undefined"}},cursorPointer:{defaultValue:{value:"false"},description:"",name:"cursorPointer",required:!1,type:{name:"boolean | undefined"}},dataCy:{defaultValue:{value:"availability-label"},description:"",name:"dataCy",required:!1,type:{name:"string | undefined"}},isbns:{defaultValue:null,description:"",name:"isbns",required:!0,type:{name:"string[]"}},isVisualOnly:{defaultValue:null,description:"",name:"isVisualOnly",required:!1,type:{name:"boolean | undefined"}}}},"undefined"!=typeof STORYBOOK_REACT_CLASSES&&(STORYBOOK_REACT_CLASSES["src/components/availability-label/availability-label.tsx#AvailabilityLabel"]={docgenInfo:AvailabilityLabel.__docgenInfo,name:"AvailabilityLabel",path:"src/components/availability-label/availability-label.tsx#AvailabilityLabel"})}catch(__react_docgen_typescript_loader_error){}try{availabilitylabel.displayName="availabilitylabel",availabilitylabel.__docgenInfo={description:"",displayName:"availabilitylabel",props:{manifestText:{defaultValue:null,description:"",name:"manifestText",required:!0,type:{name:"string"}},accessTypes:{defaultValue:null,description:"",name:"accessTypes",required:!0,type:{name:"AccessTypeCodeEnum[]"}},access:{defaultValue:null,description:"",name:"access",required:!0,type:{name:"AccessTypes[]"}},selected:{defaultValue:{value:"false"},description:"",name:"selected",required:!1,type:{name:"boolean | undefined"}},url:{defaultValue:null,description:"",name:"url",required:!1,type:{name:"URL | undefined"}},faustIds:{defaultValue:null,description:"",name:"faustIds",required:!0,type:{name:"string[]"}},handleSelectManifestation:{defaultValue:null,description:"",name:"handleSelectManifestation",required:!1,type:{name:"(() => void | undefined) | undefined"}},cursorPointer:{defaultValue:{value:"false"},description:"",name:"cursorPointer",required:!1,type:{name:"boolean | undefined"}},dataCy:{defaultValue:{value:"availability-label"},description:"",name:"dataCy",required:!1,type:{name:"string | undefined"}},isbns:{defaultValue:null,description:"",name:"isbns",required:!0,type:{name:"string[]"}},isVisualOnly:{defaultValue:null,description:"",name:"isVisualOnly",required:!1,type:{name:"boolean | undefined"}}}},"undefined"!=typeof STORYBOOK_REACT_CLASSES&&(STORYBOOK_REACT_CLASSES["src/components/availability-label/availability-label.tsx#availabilitylabel"]={docgenInfo:availabilitylabel.__docgenInfo,name:"availabilitylabel",path:"src/components/availability-label/availability-label.tsx#availabilitylabel"})}catch(__react_docgen_typescript_loader_error){}},"./src/components/availability-label/helper.ts":(__unused_webpack_module,__webpack_exports__,__webpack_require__)=>{"use strict";__webpack_require__.d(__webpack_exports__,{Mk:()=>getParentAvailabilityLabelClass,rL:()=>isArticleByLabelText,sc:()=>isOnline});var clsx__WEBPACK_IMPORTED_MODULE_2__=__webpack_require__("./node_modules/clsx/dist/clsx.mjs"),_core_dbc_gateway_generated_graphql__WEBPACK_IMPORTED_MODULE_0__=__webpack_require__("./src/core/dbc-gateway/generated/graphql.ts"),_core_utils_types_article_types__WEBPACK_IMPORTED_MODULE_1__=__webpack_require__("./src/core/utils/types/article-types.ts");const isOnline=accessTypes=>(null==accessTypes?void 0:accessTypes.includes(_core_dbc_gateway_generated_graphql__WEBPACK_IMPORTED_MODULE_0__.PS.Online))??!1,isArticleByLabelText=manifestText=>_core_utils_types_article_types__WEBPACK_IMPORTED_MODULE_1__.A.some((type=>manifestText.toLowerCase()===type)),getParentAvailabilityLabelClass=({selected,cursorPointer})=>(0,clsx__WEBPACK_IMPORTED_MODULE_2__.A)({"pagefold-parent--none availability-label--selected":selected},{"pagefold-parent--xsmall availability-label--unselected":!selected},{"cursor-pointer":cursorPointer},"text-label","availability-label")},"./src/components/availability-label/useAvailabilityData.ts":(__unused_webpack_module,__webpack_exports__,__webpack_require__)=>{"use strict";__webpack_require__.d(__webpack_exports__,{A:()=>availability_label_useAvailabilityData});var helper=__webpack_require__("./src/components/availability-label/helper.ts"),react=__webpack_require__("./node_modules/react/index.js"),publizon=__webpack_require__("./src/core/publizon/publizon.ts");const publizonProductStatuses={0:{isAvailable:!0,meaning:"Unknown"},1:{isAvailable:!0,meaning:"Unknown"},2:{isAvailable:!0,meaning:"Unknown"},3:{isAvailable:!0,meaning:"Unknown"},4:{isAvailable:!0,meaning:"Reservable"},5:{isAvailable:!1,meaning:"Reservation queue on the material"},6:{isAvailable:!0,meaning:"Unknown"},7:{isAvailable:!0,meaning:"Unknown"}},availability_label_useOnlineAvailabilityData=({enabled,access,faustIds,isbn})=>{var _dataIdentifier$produ;const[isAvailable,setIsAvailable]=(0,react.useState)(null),{isLoading:isLoadingIdentifier,data:dataIdentifier}=(0,publizon.wK)(isbn??"",{query:{enabled:enabled&&null===isAvailable&&!!isbn}}),{isLoading:isLoadingEreolData,data:dataEreol}=(0,publizon.Qo)(isbn||"",{enabled:enabled&&null===isAvailable&&!!isbn&&!1===(null==dataIdentifier||null===(_dataIdentifier$produ=dataIdentifier.product)||void 0===_dataIdentifier$produ?void 0:_dataIdentifier$produ.costFree)&&access.some((acc=>"Ereol"===acc))});return(0,react.useEffect)((()=>{enabled&&null===isAvailable&&!1===isLoadingIdentifier&&!1===isLoadingEreolData&&dataEreol&&dataEreol.loanStatus&&setIsAvailable(publizonProductStatuses[dataEreol.loanStatus].isAvailable)}),[isLoadingIdentifier,isAvailable,faustIds,enabled,dataEreol,isLoadingEreolData]),enabled?null===isAvailable?{isLoading:!1,isAvailable:!0}:{isLoading:isLoadingIdentifier&&isLoadingEreolData,isAvailable}:{isLoading:null,isAvailable:null}};var utils_config=__webpack_require__("./src/core/utils/config.tsx"),useGetAvailability=__webpack_require__("./src/core/utils/useGetAvailability.ts");const availability_label_usePhysicalAvailabilityData=({enabled,faustIds,manifestText})=>{const config=(0,utils_config.UK)(),response=(0,useGetAvailability.A)({faustIds:faustIds??[],config,options:{query:{enabled:enabled&&null!==faustIds&&!(0,helper.rL)(manifestText)}}}),{isLoading,data}=response;return enabled?(0,helper.rL)(manifestText)?{isLoading:!1,isAvailable:!0}:data?null!=data&&data.some((item=>item.available))?{isLoading:!1,isAvailable:!0}:{isLoading:!1,isAvailable:!1}:{isLoading,isAvailable:null}:{isLoading:null,isAvailable:null}},availability_label_useAvailabilityData=({accessTypes,access,faustIds,manifestText,isbn})=>{const availabilityOnline=availability_label_useOnlineAvailabilityData({enabled:(0,helper.sc)(accessTypes),access,faustIds,isbn}),availabilityPhysical=availability_label_usePhysicalAvailabilityData({enabled:!(0,helper.sc)(accessTypes),faustIds,manifestText});return(0,helper.sc)(accessTypes)?availabilityOnline:availabilityPhysical}},"./src/components/skeletons/TextLineSkeleton.tsx":(__unused_webpack_module,__webpack_exports__,__webpack_require__)=>{"use strict";__webpack_require__.d(__webpack_exports__,{A:()=>__WEBPACK_DEFAULT_EXPORT__});var react__WEBPACK_IMPORTED_MODULE_0__=__webpack_require__("./node_modules/react/index.js");const TextLineSkeleton=({width=40})=>react__WEBPACK_IMPORTED_MODULE_0__.createElement("div",{className:"ssc-line w-100",style:{width:`${width}px`}}),__WEBPACK_DEFAULT_EXPORT__=TextLineSkeleton;try{TextLineSkeleton.displayName="TextLineSkeleton",TextLineSkeleton.__docgenInfo={description:"",displayName:"TextLineSkeleton",props:{width:{defaultValue:{value:"40"},description:"",name:"width",required:!1,type:{name:"number | undefined"}}}},"undefined"!=typeof STORYBOOK_REACT_CLASSES&&(STORYBOOK_REACT_CLASSES["src/components/skeletons/TextLineSkeleton.tsx#TextLineSkeleton"]={docgenInfo:TextLineSkeleton.__docgenInfo,name:"TextLineSkeleton",path:"src/components/skeletons/TextLineSkeleton.tsx#TextLineSkeleton"})}catch(__react_docgen_typescript_loader_error){}},"./src/core/publizon/publizon.ts":(__unused_webpack_module,__webpack_exports__,__webpack_require__)=>{"use strict";__webpack_require__.d(__webpack_exports__,{tt:()=>getGetV1UserReservationsQueryKey,de:()=>useDeleteV1UserReservationsIdentifier,PF:()=>useGetV1LibraryProfile,Qo:()=>useGetV1LoanstatusIdentifier,wK:()=>useGetV1ProductsIdentifier,VM:()=>useGetV1UserLoans,pA:()=>useGetV1UserReservations});var es=__webpack_require__("./node_modules/react-query/es/index.js"),FetchFailedCriticalError=__webpack_require__("./src/core/fetchers/FetchFailedCriticalError.ts"),helpers=__webpack_require__("./src/core/fetchers/helpers.ts"),core_token=__webpack_require__("./src/core/token.js"),extractServiceBaseUrls=__webpack_require__("./src/core/utils/reduxMiddleware/extractServiceBaseUrls.ts"),FetcherHttpError=__webpack_require__("./src/core/fetchers/FetcherHttpError.ts");function _defineProperty(e,r,t){return(r=function _toPropertyKey(t){var i=function _toPrimitive(t,r){if("object"!=typeof t||!t)return t;var e=t[Symbol.toPrimitive];if(void 0!==e){var i=e.call(t,r||"default");if("object"!=typeof i)return i;throw new TypeError("@@toPrimitive must return a primitive value.")}return("string"===r?String:Number)(t)}(t,"string");return"symbol"==typeof i?i:i+""}(r))in e?Object.defineProperty(e,r,{value:t,enumerable:!0,configurable:!0,writable:!0}):e[r]=t,e}class PublizonServiceHttpError extends FetcherHttpError.A{constructor(...args){super(...args),_defineProperty(this,"name","PublizonServiceHttpError")}}const fetcher_fetcher=async({url,method,headers,params,data})=>{const token=(0,core_token.gf)(core_token.CI)??(0,core_token.gf)(core_token._L),authHeaders=token?{Authorization:`Bearer ${token}`}:{},body=data?JSON.stringify(data):null,serviceUrl=(0,helpers.Z4)({baseUrl:(0,extractServiceBaseUrls.aW)(extractServiceBaseUrls.TJ.publizon),url,params});try{const response=await fetch(serviceUrl,{method,headers:{...headers,...authHeaders},body});if(!response.ok)throw new PublizonServiceHttpError(response.status,response.statusText,serviceUrl);try{return await response.json()}catch(e){if(!(e instanceof SyntaxError))throw e}}catch(error){if(error instanceof PublizonServiceHttpError)throw error;const message=error instanceof Error?error.message:"Unknown error";throw new FetchFailedCriticalError.A(message,serviceUrl)}return null};const getGetV1LibraryProfileQueryOptions=options=>{const{query:queryOptions}=options??{};return{queryKey:(null==queryOptions?void 0:queryOptions.queryKey)??["/v1/library/profile"],queryFn:({signal})=>(signal=>fetcher_fetcher({url:"/v1/library/profile",method:"GET",signal}))(signal),...queryOptions}};function useGetV1LibraryProfile(options){const queryOptions=getGetV1LibraryProfileQueryOptions(options),query=(0,es.useQuery)(queryOptions);return query.queryKey=queryOptions.queryKey,query}const getGetV1UserLoansQueryOptions=(params,options)=>{const{query:queryOptions}=options??{},queryKey=(null==queryOptions?void 0:queryOptions.queryKey)??(params=>["/v1/user/loans",...params?[params]:[]])(params);return{queryKey,queryFn:({signal})=>((params,signal)=>fetcher_fetcher({url:"/v1/user/loans",method:"GET",params,signal}))(params,signal),...queryOptions}};function useGetV1UserLoans(params,options){const queryOptions=getGetV1UserLoansQueryOptions(params,options),query=(0,es.useQuery)(queryOptions);return query.queryKey=queryOptions.queryKey,query}const getGetV1LoanstatusIdentifierQueryOptions=(identifier,queryOptions)=>{const queryKey=(null==queryOptions?void 0:queryOptions.queryKey)??(identifier=>[`/v1/loanstatus/${identifier}`])(identifier);return{queryKey,queryFn:({signal})=>((identifier,signal)=>fetcher_fetcher({url:`/v1/loanstatus/${identifier}`,method:"GET",signal}))(identifier,signal),enabled:!!identifier,...queryOptions}};function useGetV1LoanstatusIdentifier(identifier,queryOptions){const options=getGetV1LoanstatusIdentifierQueryOptions(identifier,queryOptions),query=(0,es.useQuery)(options);return query.queryKey=options.queryKey,query}const getGetV1ProductsIdentifierQueryOptions=(identifier,options)=>{const{query:queryOptions}=options??{},queryKey=(null==queryOptions?void 0:queryOptions.queryKey)??(identifier=>[`/v1/products/${identifier}`])(identifier);return{queryKey,queryFn:({signal})=>((identifier,signal)=>fetcher_fetcher({url:`/v1/products/${identifier}`,method:"GET",signal}))(identifier,signal),enabled:!!identifier,...queryOptions}};function useGetV1ProductsIdentifier(identifier,options){const queryOptions=getGetV1ProductsIdentifierQueryOptions(identifier,options),query=(0,es.useQuery)(queryOptions);return query.queryKey=queryOptions.queryKey,query}const getGetV1UserReservationsQueryKey=()=>["/v1/user/reservations"],getGetV1UserReservationsQueryOptions=options=>{const{query:queryOptions}=options??{};return{queryKey:(null==queryOptions?void 0:queryOptions.queryKey)??getGetV1UserReservationsQueryKey(),queryFn:({signal})=>(signal=>fetcher_fetcher({url:"/v1/user/reservations",method:"GET",signal}))(signal),...queryOptions}};function useGetV1UserReservations(options){const queryOptions=getGetV1UserReservationsQueryOptions(options),query=(0,es.useQuery)(queryOptions);return query.queryKey=queryOptions.queryKey,query}const getDeleteV1UserReservationsIdentifierMutationOptions=options=>{const{mutation:mutationOptions}=options??{};return{mutationFn:props=>{const{identifier}=props??{};return(identifier=>fetcher_fetcher({url:`/v1/user/reservations/${identifier}`,method:"DELETE"}))(identifier)},...mutationOptions}},useDeleteV1UserReservationsIdentifier=options=>{const mutationOptions=getDeleteV1UserReservationsIdentifierMutationOptions(options);return(0,es.useMutation)(mutationOptions)}},"./src/core/statistics/statistics.ts":(__unused_webpack_module,__webpack_exports__,__webpack_require__)=>{"use strict";__webpack_require__.d(__webpack_exports__,{o:()=>statistics});const statistics={searchQuery:{id:10,name:"OSS"},searchResultCount:{id:11,name:"OSS Results"},searchFacets:{id:20,name:"Søgning Facet"},materialType:{id:24,name:"Materialetype"},materialGenre:{id:25,name:"Materiale Genre"},materialLanguage:{id:29,name:"Materiale Sprog"},materialSource:{id:30,name:"Materiale Kilde"},materialTargetAudience:{id:31,name:"Materiale Målgruppe"},materialTopicNumber:{id:32,name:"Materiale - DK5-nummer (Emnetal)"},materialFictionNonFiction:{id:33,name:"Materiale Fiktion/nonfiktion"},materialStatus:{id:38,name:"Materiale Status"},searchResultNumberClick:{id:42,name:"Søgning - Resultatnummer klik"},campaignClick:{id:48,name:"Kampagneklik"},reservation:{id:50,name:"Reserver"},onlineReservation:{id:51,name:"Se online"},autosuggestClick:{id:54,name:"Autosuggest - klik"},campaignShown:{id:62,name:"KampagnePlus Titel"},renewSelectedMaterials:{id:55,name:"Forny valgte materialer"},renewAllMaterials:{id:56,name:"Forny alle materialer"},addToFavorites:{id:61,name:"Tilføj til liste"}}},"./src/core/statistics/useStatistics.ts":(__unused_webpack_module,__webpack_exports__,__webpack_require__)=>{"use strict";function useStatistics(){return window.wts||(window.wts={push(trackingProps){console.log(`Tracking: ${trackingProps[0]}, ${trackingProps[1]}, ${JSON.stringify(trackingProps[2])}`)}}),{track:(eventType,trackParameters)=>{const eventData={linkId:trackParameters.name,customClickParameter:{}};return eventData.customClickParameter[trackParameters.id]=trackParameters.trackedData,window.wts.push(["send",eventType,eventData]),new Promise((resolve=>{setTimeout((()=>{resolve("resolved")}),500)}))}}}__webpack_require__.d(__webpack_exports__,{B:()=>useStatistics})},"./src/core/storybook/globalConfigArgs.ts":(__unused_webpack_module,__webpack_exports__,__webpack_require__)=>{"use strict";__webpack_require__.d(__webpack_exports__,{A:()=>__WEBPACK_DEFAULT_EXPORT__,U:()=>argTypes});const argTypes={errorMessagesConfig:{description:"Configuration for error messages behaviour",control:{type:"text"},table:{type:{summary:"text"},defaultValue:{summary:'{"containerId":"dpl-react-apps-error-messages","shouldOnlyShowOneError":true,"showCloseButton":true}'}}}},__WEBPACK_DEFAULT_EXPORT__={errorMessagesConfig:'{"containerId":"dpl-react-apps-error-messages","shouldOnlyShowOneError":true,"showCloseButton":true}'}},"./src/core/utils/useGetAvailability.ts":(__unused_webpack_module,__webpack_exports__,__webpack_require__)=>{"use strict";__webpack_require__.d(__webpack_exports__,{A:()=>__WEBPACK_DEFAULT_EXPORT__});var _fbs_fbs__WEBPACK_IMPORTED_MODULE_0__=__webpack_require__("./src/core/fbs/fbs.ts"),_apps_material_helper__WEBPACK_IMPORTED_MODULE_1__=__webpack_require__("./src/apps/material/helper.ts");const __WEBPACK_DEFAULT_EXPORT__=({faustIds,config,options})=>(0,_fbs_fbs__WEBPACK_IMPORTED_MODULE_0__.io)((0,_apps_material_helper__WEBPACK_IMPORTED_MODULE_1__.We)(faustIds,config,"availability"),options)},"./node_modules/fast-deep-equal/react.js":module=>{"use strict";module.exports=function equal(a,b){if(a===b)return!0;if(a&&b&&"object"==typeof a&&"object"==typeof b){if(a.constructor!==b.constructor)return!1;var length,i,keys;if(Array.isArray(a)){if((length=a.length)!=b.length)return!1;for(i=length;0!=i--;)if(!equal(a[i],b[i]))return!1;return!0}if(a.constructor===RegExp)return a.source===b.source&&a.flags===b.flags;if(a.valueOf!==Object.prototype.valueOf)return a.valueOf()===b.valueOf();if(a.toString!==Object.prototype.toString)return a.toString()===b.toString();if((length=(keys=Object.keys(a)).length)!==Object.keys(b).length)return!1;for(i=length;0!=i--;)if(!Object.prototype.hasOwnProperty.call(b,keys[i]))return!1;for(i=length;0!=i--;){var key=keys[i];if(("_owner"!==key||!a.$$typeof)&&!equal(a[key],b[key]))return!1}return!0}return a!=a&&b!=b}},"./node_modules/lodash/_arrayAggregator.js":module=>{module.exports=function arrayAggregator(array,setter,iteratee,accumulator){for(var index=-1,length=null==array?0:array.length;++index<length;){var value=array[index];setter(accumulator,value,iteratee(value),array)}return accumulator}},"./node_modules/lodash/_baseAggregator.js":(module,__unused_webpack_exports,__webpack_require__)=>{var baseEach=__webpack_require__("./node_modules/lodash/_baseEach.js");module.exports=function baseAggregator(collection,setter,iteratee,accumulator){return baseEach(collection,(function(value,key,collection){setter(accumulator,value,iteratee(value),collection)})),accumulator}},"./node_modules/lodash/_baseAssignValue.js":(module,__unused_webpack_exports,__webpack_require__)=>{var defineProperty=__webpack_require__("./node_modules/lodash/_defineProperty.js");module.exports=function baseAssignValue(object,key,value){"__proto__"==key&&defineProperty?defineProperty(object,key,{configurable:!0,enumerable:!0,value,writable:!0}):object[key]=value}},"./node_modules/lodash/_createAggregator.js":(module,__unused_webpack_exports,__webpack_require__)=>{var arrayAggregator=__webpack_require__("./node_modules/lodash/_arrayAggregator.js"),baseAggregator=__webpack_require__("./node_modules/lodash/_baseAggregator.js"),baseIteratee=__webpack_require__("./node_modules/lodash/_baseIteratee.js"),isArray=__webpack_require__("./node_modules/lodash/isArray.js");module.exports=function createAggregator(setter,initializer){return function(collection,iteratee){var func=isArray(collection)?arrayAggregator:baseAggregator,accumulator=initializer?initializer():{};return func(collection,setter,baseIteratee(iteratee,2),accumulator)}}},"./node_modules/lodash/_defineProperty.js":(module,__unused_webpack_exports,__webpack_require__)=>{var getNative=__webpack_require__("./node_modules/lodash/_getNative.js"),defineProperty=function(){try{var func=getNative(Object,"defineProperty");return func({},"",{}),func}catch(e){}}();module.exports=defineProperty},"./node_modules/lodash/compact.js":module=>{module.exports=function compact(array){for(var index=-1,length=null==array?0:array.length,resIndex=0,result=[];++index<length;){var value=array[index];value&&(result[resIndex++]=value)}return result}},"./node_modules/lodash/groupBy.js":(module,__unused_webpack_exports,__webpack_require__)=>{var baseAssignValue=__webpack_require__("./node_modules/lodash/_baseAssignValue.js"),createAggregator=__webpack_require__("./node_modules/lodash/_createAggregator.js"),hasOwnProperty=Object.prototype.hasOwnProperty,groupBy=createAggregator((function(result,value,key){hasOwnProperty.call(result,key)?result[key].push(value):baseAssignValue(result,key,[value])}));module.exports=groupBy},"./node_modules/lodash/uniqBy.js":(module,__unused_webpack_exports,__webpack_require__)=>{var baseIteratee=__webpack_require__("./node_modules/lodash/_baseIteratee.js"),baseUniq=__webpack_require__("./node_modules/lodash/_baseUniq.js");module.exports=function uniqBy(array,iteratee){return array&&array.length?baseUniq(array,baseIteratee(iteratee,2)):[]}},"./node_modules/react-use/esm/useDeepCompareEffect.js":(__unused_webpack_module,__webpack_exports__,__webpack_require__)=>{"use strict";__webpack_require__.d(__webpack_exports__,{A:()=>esm_useDeepCompareEffect});var react=__webpack_require__("./node_modules/react/index.js");const esm_useCustomCompareEffect=function(effect,deps,depsEqual){var ref=(0,react.useRef)(void 0);ref.current&&depsEqual(deps,ref.current)||(ref.current=deps),(0,react.useEffect)(effect,ref.current)};var fast_deep_equal_react=__webpack_require__("./node_modules/fast-deep-equal/react.js");const isDeepEqual=__webpack_require__.n(fast_deep_equal_react)();const esm_useDeepCompareEffect=function(effect,deps){esm_useCustomCompareEffect(effect,deps,isDeepEqual)}},"./node_modules/@danskernesdigitalebibliotek/dpl-design-system/build/icons/collection/Check.svg":module=>{module.exports="data:image/svg+xml,%3csvg width='24' height='24' viewBox='0 0 24 24' fill='none' xmlns='http://www.w3.org/2000/svg'%3e %3cpath fill-rule='evenodd' clip-rule='evenodd' d='M20.4489 5.49129C20.7299 5.18693 21.2043 5.16795 21.5087 5.4489C21.7854 5.70431 21.8262 6.11968 21.6203 6.42176L21.5511 6.50871L9.5511 19.5087C9.28844 19.7933 8.85853 19.8273 8.55624 19.6048L8.46967 19.5303L2.46967 13.5303C2.17678 13.2374 2.17678 12.7626 2.46967 12.4697C2.73594 12.2034 3.1526 12.1792 3.44621 12.3971L3.53033 12.4697L8.978 17.917L20.4489 5.49129Z' fill='black'/%3e %3c/svg%3e"}}]);