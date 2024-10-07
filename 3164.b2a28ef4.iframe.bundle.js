"use strict";(globalThis.webpackChunk_danskernesdigitalebibliotek_dpl_react=globalThis.webpackChunk_danskernesdigitalebibliotek_dpl_react||[]).push([[3164],{"./src/components/atoms/links/Link.tsx":(__unused_webpack_module,__webpack_exports__,__webpack_require__)=>{__webpack_require__.d(__webpack_exports__,{A:()=>links_Link});var react=__webpack_require__("./node_modules/react/index.js"),helpers_url=__webpack_require__("./src/core/utils/helpers/url.ts");const handleTracking=({e,trackClick,isNewTab,url})=>{e.preventDefault(),trackClick().then((()=>{isNewTab&&window.open(url.href,"_blank"),(0,helpers_url.SE)(url)}))},getLinkHandler=({type,trackClick,isNewTab,url,stopPropagation})=>e=>{if(stopPropagation&&e.stopPropagation(),!trackClick)return;const{key}=e;"keyup"!==type||"keyup"!==e.type||"Enter"!==key?"click"===type&&"click"===e.type&&handleTracking({e,isNewTab,trackClick,url}):handleTracking({e,isNewTab,trackClick,url})},Link=({href,onClick,children,isNewTab=!1,className,id,trackClick,dataCy,ariaLabelledBy,stopPropagation=!1,isHiddenFromScreenReaders})=>{const handleClick=getLinkHandler({type:"click",isNewTab,stopPropagation,url:href,trackClick}),handleKeyUp=getLinkHandler({type:"keyup",isNewTab,stopPropagation,url:href,trackClick}),onclickHandler=onClick?e=>onClick().then((()=>handleClick(e))):handleClick;return react.createElement("a",{id,"data-cy":dataCy||id,href:href.toString(),target:isNewTab?"_blank":void 0,rel:"noreferrer",className,onClick:onclickHandler,onKeyUp:handleKeyUp,"aria-labelledby":ariaLabelledBy,tabIndex:isHiddenFromScreenReaders?-1:0,"aria-hidden":isHiddenFromScreenReaders},children)},links_Link=Link;try{Link.displayName="Link",Link.__docgenInfo={description:"",displayName:"Link",props:{href:{defaultValue:null,description:"",name:"href",required:!0,type:{name:"URL"}},onClick:{defaultValue:null,description:"",name:"onClick",required:!1,type:{name:"(() => Promise<void>) | undefined"}},isNewTab:{defaultValue:{value:"false"},description:"",name:"isNewTab",required:!1,type:{name:"boolean | undefined"}},className:{defaultValue:null,description:"",name:"className",required:!1,type:{name:"string | undefined"}},id:{defaultValue:null,description:"",name:"id",required:!1,type:{name:"string | undefined"}},trackClick:{defaultValue:null,description:"",name:"trackClick",required:!1,type:{name:"(() => Promise<unknown>) | undefined"}},dataCy:{defaultValue:null,description:"",name:"dataCy",required:!1,type:{name:"string | undefined"}},ariaLabelledBy:{defaultValue:null,description:"",name:"ariaLabelledBy",required:!1,type:{name:"string | undefined"}},stopPropagation:{defaultValue:{value:"false"},description:"",name:"stopPropagation",required:!1,type:{name:"boolean | undefined"}},isHiddenFromScreenReaders:{defaultValue:null,description:"",name:"isHiddenFromScreenReaders",required:!1,type:{name:"boolean | undefined"}}}},"undefined"!=typeof STORYBOOK_REACT_CLASSES&&(STORYBOOK_REACT_CLASSES["src/components/atoms/links/Link.tsx#Link"]={docgenInfo:Link.__docgenInfo,name:"Link",path:"src/components/atoms/links/Link.tsx#Link"})}catch(__react_docgen_typescript_loader_error){}},"./src/core/configuration/index.ts":(__unused_webpack_module,__webpack_exports__,__webpack_require__)=>{__webpack_require__.d(__webpack_exports__,{Ay:()=>configuration,FI:()=>getConf,jM:()=>getDeviceConf});var lib=__webpack_require__("./node_modules/react-device-detect/dist/lib.js");const page_size_namespaceObject=JSON.parse('{"mobile":{"pageSize":10},"desktop":{"pageSize":20}}'),page_size_loan_list_namespaceObject=JSON.parse('{"mobile":{"pageSize":10},"desktop":{"pageSize":25}}'),page_size_reservation_list_namespaceObject=JSON.parse('{"mobile":{"pageSize":10},"desktop":{"pageSize":25}}'),recommender_material_limits_namespaceObject=JSON.parse('{"recommender":4,"inspiration":4,"somethingSimilar":4,"somethingSimilarAuthor":4}'),cover_tints_namespaceObject=JSON.parse('{"coverTints":["100","40","80","120","20"]}'),colors_namespaceObject=JSON.parse('{"default":"#484848","danger":"#d5364a","warning":"#f7bf42","success":"#068802"}');var modal_ids=__webpack_require__("./src/core/configuration/modal-ids.json");const getConf=(type,configuration,device)=>{const subConf=configuration[type];return device?subConf[device]:subConf},getDeviceConf=(type,configuration)=>{const device=lib.Fr?"mobile":"desktop";return getConf(type,configuration,device)},configuration={pageSize:page_size_namespaceObject,coverTints:cover_tints_namespaceObject,pageSizeLoanList:page_size_loan_list_namespaceObject,pageSizeReservationList:page_size_reservation_list_namespaceObject,colors:colors_namespaceObject,recommenderMaterialLimits:recommender_material_limits_namespaceObject,modalIds:modal_ids,reservation:JSON.parse('{"defaultInterestDaysForOpenOrder":90}'),payment:JSON.parse('{"paymentChangeDate":"2020-10-27"}')}},"./src/core/fetchers/FetchFailedCriticalError.ts":(__unused_webpack_module,__webpack_exports__,__webpack_require__)=>{__webpack_require__.d(__webpack_exports__,{A:()=>FetchFailedCriticalError});var _FetcherError__WEBPACK_IMPORTED_MODULE_0__=__webpack_require__("./src/core/fetchers/FetcherError.ts");function _defineProperty(e,r,t){return(r=function _toPropertyKey(t){var i=function _toPrimitive(t,r){if("object"!=typeof t||!t)return t;var e=t[Symbol.toPrimitive];if(void 0!==e){var i=e.call(t,r||"default");if("object"!=typeof i)return i;throw new TypeError("@@toPrimitive must return a primitive value.")}return("string"===r?String:Number)(t)}(t,"string");return"symbol"==typeof i?i:i+""}(r))in e?Object.defineProperty(e,r,{value:t,enumerable:!0,configurable:!0,writable:!0}):e[r]=t,e}class FetchFailedCriticalError extends _FetcherError__WEBPACK_IMPORTED_MODULE_0__.A{constructor(message,context){super(message),_defineProperty(this,"context",void 0),_defineProperty(this,"name","FetchFailedCriticalError"),_defineProperty(this,"useErrorBoundary",!0),this.context=context}}},"./src/core/storybook/globalTextArgs.ts":(__unused_webpack_module,__webpack_exports__,__webpack_require__)=>{__webpack_require__.d(__webpack_exports__,{A:()=>__WEBPACK_DEFAULT_EXPORT__,U:()=>argTypes});const argTypes={alertErrorCloseText:{description:"Alert error close text",table:{defaultValue:{summary:"close"}},control:{type:"text"}},alertErrorMessageText:{description:"Alert error message text",table:{defaultValue:{summary:"An error occurred"}},control:{type:"text"}},multiselectAllOptionText:{description:"Multiselect - all option",table:{defaultValue:{summary:"All"}},control:{type:"text"}},groupModalGoToMaterialAriaLabelText:{table:{defaultValue:{summary:"Go to @label material details"}},control:{type:"text"}},availabilityAvailableText:{description:"Availability: available text",table:{defaultValue:{summary:"Available"}},control:{type:"text"}},availabilityUnavailableText:{description:"Availability: unavailable text",table:{defaultValue:{summary:"Unavailable"}},control:{type:"text"}},loansNotOverdueText:{table:{defaultValue:{summary:"Longer return time"}},control:{type:"text"}},patronContactInfoBodyText:{table:{defaultValue:{summary:"Patron contact info body text"}},control:{type:"text"}},pauseReservationModalBelowInputsText:{table:{defaultValue:{summary:"Pause reservation modal below inputs text"}},control:{type:"text"}},materialDetailsCloseModalAriaLabelText:{table:{defaultValue:{summary:"Close material details modal"}},control:{type:"text"}},findOnShelfExpandButtonExplanationText:{description:"Find on shelf expand button explanation text",table:{defaultValue:{summary:"This button opens a modal"}},control:{type:"text"}},reservationsStillInQueueForText:{table:{defaultValue:{summary:"Still in queue"}},control:{type:"text"}},materialDetailsModalAriaDescriptionText:{table:{defaultValue:{summary:"This modal shows material details, and makes it possible to renew a material, of that material is renewable"}},control:{type:"text"}},changePickupLocationText:{description:"Change pickup location text",table:{defaultValue:{summary:"Change pickup location"}},control:{type:"text"}},changeInterestPeriodText:{description:"Change interest period text",table:{defaultValue:{summary:"Change interest period"}},control:{type:"text"}},modalReservationFormPickupLabelText:{description:"Modal reservation form pickup branch input label",table:{defaultValue:{summary:"Change pickup location for your reservation."}},control:{type:"text"}},screenReaderModalDescriptionPickupText:{description:"Screen reader modal description for pickup",table:{defaultValue:{summary:"Change pickup location modal"}},control:{type:"text"}},closeModalAriaLabelPickupText:{description:"Close modal aria-label pickup",table:{defaultValue:{summary:"Close pickup location modal"}},control:{type:"text"}},modalReservationFormNoInterestAfterHeaderTitleText:{description:"Modal reservation form no interest after header title",table:{defaultValue:{summary:"Change date of interest"}},control:{type:"text"}},modalReservationFormNoInterestAfterHeaderDescriptionText:{description:"Modal reservation form no interest after header description",table:{defaultValue:{summary:"If you wish to change the amount of time after which you're no longer interested in the material, you can do it here."}},control:{type:"text"}},modalReservationFormNoInterestAfterLabelText:{description:"Modal reservation form no interest after input label",table:{defaultValue:{summary:"Change the amount of time after which you're no longer interested in this material."}},control:{type:"text"}},screenReaderModalDescriptionInterestPeriodText:{description:"Screen reader modal description for interest period",table:{defaultValue:{summary:"Change interest period modal"}},control:{type:"text"}},screenReaderModalDescriptionEmailText:{description:"Screen reader modal description for email",table:{defaultValue:{summary:"Change email modal"}},control:{type:"text"}},screenReaderModalDescriptionSmsText:{description:"Screen reader modal description for sms",table:{defaultValue:{summary:"Change mobile number modal"}},control:{type:"text"}},closeModalAriaLabelInterestPeriodText:{description:"Close modal aria-label interest period ",table:{defaultValue:{summary:"Close interest period modal"}},control:{type:"text"}},closeModalAriaLabelSmsText:{description:"Close modal aria-label sms",table:{defaultValue:{summary:"Close change mobile number modal"}},control:{type:"text"}},closeModalAriaLabelEmailText:{description:"Close modal aria-label email",table:{defaultValue:{summary:"Close change email modal"}},control:{type:"text"}},deleteReservationModalButtonText:{description:"Delete reservation modal delete button text",table:{defaultValue:{summary:"Ok"}},control:{type:"text"}},acceptModalAriaLabelText:{table:{defaultValue:{summary:"accept modal aria label text"}},control:{type:"text"}},pauseReservationModalAriaDescriptionText:{table:{defaultValue:{summary:"This modal makes it possible to pause your physical reservations"}},control:{type:"text"}},addToFavoritesAriaLabelText:{table:{defaultValue:{summary:"Add @title to favorites list"}},control:{type:"text"}},removeFromFavoritesAriaLabelText:{table:{defaultValue:{summary:"Remove @title from favorites list"}},control:{type:"text"}},acceptModalAriaDescriptionText:{table:{defaultValue:{summary:"accept modal aria description text"}},control:{type:"text"}},acceptModalHeaderText:{table:{defaultValue:{summary:"Hov, dit gebyr forhøjes!"}},control:{type:"text"}},acceptModalBodyText:{table:{defaultValue:{summary:"Fornyer du dine lån, forhøjes dit gebyr. Alle materialer ikke kan fornys og lånet splittes derfor op. Ved overskredne lån modtager du et gebyr pr. lån og derfor forhøjes dit samlede gebyr, hvis du vælger at gå videre med at fornye."}},control:{type:"text"}},acceptModalAreYouSureText:{table:{defaultValue:{summary:"Er du sikker på du vil fornye?"}},control:{type:"text"}},acceptModalAcceptButtonText:{table:{defaultValue:{summary:"Ja, forny mulige"}},control:{type:"text"}},acceptModalCancelButtonText:{table:{defaultValue:{summary:"Annuller fornyelse"}},control:{type:"text"}},isLoadingHeartText:{table:{defaultValue:{summary:"Indlæser"}},control:{type:"text"}},reservationPickUpLatestText:{table:{defaultValue:{summary:"Pick up before @date"}},control:{type:"text"}},reservationListReadyText:{table:{defaultValue:{summary:"Ready"}},control:{type:"text"}},reservationListDigitalPickupText:{table:{defaultValue:{summary:"Online access"}},control:{type:"text"}},errorBoundaryAlertBodyButtonAriaText:{table:{defaultValue:{summary:"Close error message"}},control:{type:"text"}},loadingText:{table:{defaultValue:{summary:"Loading..."}},control:{type:"text"}},pincodeSectionDescriptionText:{table:{defaultValue:{summary:"Length of 4 characters"}},control:{type:"text"}}},__WEBPACK_DEFAULT_EXPORT__={alertErrorCloseText:"close",alertErrorMessageText:"An error occurred",multiselectAllOptionText:"All",groupModalGoToMaterialAriaLabelText:"Go to @label material details",availabilityAvailableText:"Available",availabilityUnavailableText:"Unavailable",loansNotOverdueText:"Longer return time",patronContactInfoBodyText:"Patron contact info body text",pauseReservationModalBelowInputsText:"Pause reservation modal below inputs text",materialDetailsCloseModalAriaLabelText:"Close material details modal",findOnShelfExpandButtonExplanationText:"This button opens a modal",reservationsStillInQueueForText:"Still in queue",materialDetailsModalAriaDescriptionText:"This modal shows material details, and makes it possible to renew a material, of that material is renewable",changePickupLocationText:"Change pickup location",changeInterestPeriodText:"Change interest period",modalReservationFormPickupLabelText:"Change pickup location for your reservation.",screenReaderModalDescriptionPickupText:"Change pickup location modal",closeModalAriaLabelPickupText:"Close pickup location modal",modalReservationFormNoInterestAfterHeaderTitleText:"Change date of interest",modalReservationFormNoInterestAfterHeaderDescriptionText:"If you wish to change the amount of time after which you're no longer interested in the material, you can do it here.",modalReservationFormNoInterestAfterLabelText:"Change the amount of time after which you're no longer interested in this material.",screenReaderModalDescriptionInterestPeriodText:"Change interest period modal",screenReaderModalDescriptionEmailText:"Change email modal",screenReaderModalDescriptionSmsText:"Change mobile number modal",closeModalAriaLabelInterestPeriodText:"Close interest period modal",closeModalAriaLabelSmsText:"Close change mobile number modal",closeModalAriaLabelEmailText:"Close change email modal",deleteReservationModalButtonText:"Ok",acceptModalAriaLabelText:"accept modal aria label text",pauseReservationModalAriaDescriptionText:"This modal makes it possible to pause your physical reservations",addToFavoritesAriaLabelText:"Add @title to favorites list",removeFromFavoritesAriaLabelText:"Remove @title from favorites list",acceptModalAriaDescriptionText:"accept modal aria description text",acceptModalHeaderText:"Hov, dit gebyr forhøjes!",acceptModalBodyText:"Fornyer du dine lån, forhøjes dit gebyr. Alle materialer ikke kan fornys og lånet splittes derfor op. Ved overskredne lån modtager du et gebyr pr. lån og derfor forhøjes dit samlede gebyr, hvis du vælger at gå videre med at fornye.",acceptModalAreYouSureText:"Er du sikker på du vil fornye?",acceptModalAcceptButtonText:"Ja, forny mulige",acceptModalCancelButtonText:"Annuller fornyelse",isLoadingHeartText:"Indlæser",reservationPickUpLatestText:"Pick up before @date",reservationListReadyText:"Ready",reservationListDigitalPickupText:"Online access",errorBoundaryAlertBodyButtonAriaText:"Close error message",loadingText:"Loading...",pincodeSectionDescriptionText:"Length of 4 characters"}},"./src/core/storybook/serviceUrlArgs.ts":(__unused_webpack_module,__webpack_exports__,__webpack_require__)=>{__webpack_require__.d(__webpack_exports__,{A:()=>__WEBPACK_DEFAULT_EXPORT__,U:()=>argTypes});var _utils_reduxMiddleware_extractServiceBaseUrls__WEBPACK_IMPORTED_MODULE_0__=__webpack_require__("./src/core/utils/reduxMiddleware/extractServiceBaseUrls.ts"),process=__webpack_require__("./node_modules/process/browser.js");const argTypes={[_utils_reduxMiddleware_extractServiceBaseUrls__WEBPACK_IMPORTED_MODULE_0__.TJ.fbs]:{description:"Base url for the FBS API",control:{type:"text"},table:{type:{summary:"text"},defaultValue:{summary:"https://fbs-openplatform.dbc.dk"}}},[_utils_reduxMiddleware_extractServiceBaseUrls__WEBPACK_IMPORTED_MODULE_0__.TJ.publizon]:{description:"Base url for the Publizon API",control:{type:"text"},table:{type:{summary:"text"},defaultValue:{summary:"https://pubhub-openplatform.dbc.dk"}}},[_utils_reduxMiddleware_extractServiceBaseUrls__WEBPACK_IMPORTED_MODULE_0__.TJ.dplCms]:{description:"Base url for the DPL CMS API",control:{type:"text"},table:{type:{summary:"text"},defaultValue:{summary:"https://dpl-cms.docker"}}},[_utils_reduxMiddleware_extractServiceBaseUrls__WEBPACK_IMPORTED_MODULE_0__.TJ.cover]:{description:"Base url for the cover service",control:{type:"text"},table:{type:{summary:"text"},defaultValue:{summary:"https://cover.dandigbib.org"}}},[_utils_reduxMiddleware_extractServiceBaseUrls__WEBPACK_IMPORTED_MODULE_0__.TJ.materialList]:{description:"Base url for the material list service",control:{type:"text"},table:{type:{summary:"text"},defaultValue:{summary:"https://prod.materiallist.dandigbib.org"}}},[_utils_reduxMiddleware_extractServiceBaseUrls__WEBPACK_IMPORTED_MODULE_0__.TJ.fbi]:{description:"Base url for the FBI API",control:{type:"text"},table:{type:{summary:"text"},defaultValue:{summary:"https://fbi-api.dbc.dk/next-present/graphql"}}},[_utils_reduxMiddleware_extractServiceBaseUrls__WEBPACK_IMPORTED_MODULE_0__.TJ.fbiLocal]:{description:"Base url for the FBI API (local inventory)",control:{type:"text"},table:{type:{summary:"text"},defaultValue:{summary:"https://fbi-api.dbc.dk/next/graphql"}}},[_utils_reduxMiddleware_extractServiceBaseUrls__WEBPACK_IMPORTED_MODULE_0__.TJ.fbiGlobal]:{description:"Base url for the FBI API (global inventory)",control:{type:"text"},table:{type:{summary:"text"},defaultValue:{summary:"https://fbi-api.dbc.dk/next-present/graphql"}}}},__WEBPACK_DEFAULT_EXPORT__={[_utils_reduxMiddleware_extractServiceBaseUrls__WEBPACK_IMPORTED_MODULE_0__.TJ.fbs]:process.env.FBS_BASEURL??"https://fbs-openplatform.dbc.dk",[_utils_reduxMiddleware_extractServiceBaseUrls__WEBPACK_IMPORTED_MODULE_0__.TJ.publizon]:process.env.PUBLIZON_BASEURL??"https://pubhub-openplatform.dbc.dk",[_utils_reduxMiddleware_extractServiceBaseUrls__WEBPACK_IMPORTED_MODULE_0__.TJ.dplCms]:process.env.CMS_BASEURL??"https://dpl-cms.docker",[_utils_reduxMiddleware_extractServiceBaseUrls__WEBPACK_IMPORTED_MODULE_0__.TJ.cover]:"https://cover.dandigbib.org",[_utils_reduxMiddleware_extractServiceBaseUrls__WEBPACK_IMPORTED_MODULE_0__.TJ.materialList]:"https://prod.materiallist.dandigbib.org",[_utils_reduxMiddleware_extractServiceBaseUrls__WEBPACK_IMPORTED_MODULE_0__.TJ.fbi]:"https://fbi-api.dbc.dk/next-present/graphql",[_utils_reduxMiddleware_extractServiceBaseUrls__WEBPACK_IMPORTED_MODULE_0__.TJ.fbiLocal]:"https://fbi-api.dbc.dk/next/graphql",[_utils_reduxMiddleware_extractServiceBaseUrls__WEBPACK_IMPORTED_MODULE_0__.TJ.fbiGlobal]:"https://fbi-api.dbc.dk/next-present/graphql"}},"./src/core/utils/helpers/currency.ts":(__unused_webpack_module,__webpack_exports__,__webpack_require__)=>{function formatCurrency(number){return number.toLocaleString("da-DK",{style:"currency",currency:"DKK"})}__webpack_require__.d(__webpack_exports__,{v:()=>formatCurrency})},"./src/core/utils/helpers/general.ts":(__unused_webpack_module,__webpack_exports__,__webpack_require__)=>{__webpack_require__.d(__webpack_exports__,{A5:()=>capitalizeFirstLetters,AQ:()=>patronAgeValid,C2:()=>getReleaseYearSearchResult,CT:()=>getRenewableMaterials,EA:()=>sortByLoanDate,El:()=>materialIsOverdue,Ey:()=>getManifestationPublicationYear,G:()=>materialIsFiction,G_:()=>convertPostIdToFaustId,Gm:()=>getAuthorNames,IN:()=>getReviewRelease,J$:()=>getCoverTint,JB:()=>getMaterialTypes,Ki:()=>pageSizeGlobal,L1:()=>getListItems,OH:()=>convertPostIdsToFaustIds,Sy:()=>orderManifestationsByYear,UV:()=>flattenCreators,VZ:()=>getManifestationType,X6:()=>daysBetweenDates,Y2:()=>sortByReservationDate,Y5:()=>getAllPids,ZG:()=>tallyUpFees,Zc:()=>getContributors,bn:()=>getAllFaustIds,e$:()=>getManifestationsPids,eD:()=>getScrollClass,fL:()=>getRecommenderMaterialLimits,hh:()=>getWorkPid,jM:()=>getColors,jw:()=>flattenCreatorsLastNameFirst,kj:()=>groupObjectArrayByProperty,m2:()=>daysBetweenTodayAndDate,ng:()=>stringifyValue,nq:()=>divideFirstNameByComma,oq:()=>getAmountOfRenewableLoans,sP:()=>creatorsToString,tI:()=>getParams,yr:()=>getLatestManifestation,yy:()=>getPublicationName});var lodash_uniq__WEBPACK_IMPORTED_MODULE_0__=__webpack_require__("./node_modules/lodash/uniq.js"),lodash_uniq__WEBPACK_IMPORTED_MODULE_0___default=__webpack_require__.n(lodash_uniq__WEBPACK_IMPORTED_MODULE_0__),lodash_first__WEBPACK_IMPORTED_MODULE_1__=__webpack_require__("./node_modules/lodash/first.js"),lodash_first__WEBPACK_IMPORTED_MODULE_1___default=__webpack_require__.n(lodash_first__WEBPACK_IMPORTED_MODULE_1__),dayjs__WEBPACK_IMPORTED_MODULE_19__=(__webpack_require__("./node_modules/core-js/modules/esnext.set.add-all.js"),__webpack_require__("./node_modules/core-js/modules/esnext.set.delete-all.js"),__webpack_require__("./node_modules/core-js/modules/esnext.set.difference.js"),__webpack_require__("./node_modules/core-js/modules/esnext.set.every.js"),__webpack_require__("./node_modules/core-js/modules/esnext.set.filter.js"),__webpack_require__("./node_modules/core-js/modules/esnext.set.find.js"),__webpack_require__("./node_modules/core-js/modules/esnext.set.intersection.js"),__webpack_require__("./node_modules/core-js/modules/esnext.set.is-disjoint-from.js"),__webpack_require__("./node_modules/core-js/modules/esnext.set.is-subset-of.js"),__webpack_require__("./node_modules/core-js/modules/esnext.set.is-superset-of.js"),__webpack_require__("./node_modules/core-js/modules/esnext.set.join.js"),__webpack_require__("./node_modules/core-js/modules/esnext.set.map.js"),__webpack_require__("./node_modules/core-js/modules/esnext.set.reduce.js"),__webpack_require__("./node_modules/core-js/modules/esnext.set.some.js"),__webpack_require__("./node_modules/core-js/modules/esnext.set.symmetric-difference.js"),__webpack_require__("./node_modules/core-js/modules/esnext.set.union.js"),__webpack_require__("./node_modules/react/index.js"),__webpack_require__("./node_modules/dayjs/dayjs.min.js")),dayjs__WEBPACK_IMPORTED_MODULE_19___default=__webpack_require__.n(dayjs__WEBPACK_IMPORTED_MODULE_19__),_configuration__WEBPACK_IMPORTED_MODULE_20__=__webpack_require__("./src/core/configuration/index.ts"),_url__WEBPACK_IMPORTED_MODULE_24__=__webpack_require__("./src/core/utils/helpers/url.ts"),_store__WEBPACK_IMPORTED_MODULE_21__=__webpack_require__("./src/core/store.ts"),_currency__WEBPACK_IMPORTED_MODULE_23__=(__webpack_require__("./src/core/utils/helpers/modal-helpers.ts"),__webpack_require__("./src/core/utils/helpers/currency.ts"));const capitalizeFirstLetters=str=>str.split(" ").map((word=>word.charAt(0).toUpperCase()+word.slice(1))).join(" "),getManifestationPublicationYear=manifestation=>{var _manifestation$editio,_manifestation$editio2;return(null===(_manifestation$editio=manifestation.edition)||void 0===_manifestation$editio||null===(_manifestation$editio2=_manifestation$editio.publicationYear)||void 0===_manifestation$editio2?void 0:_manifestation$editio2.display)||null},orderManifestationsByYear=(manifestations,order="desc")=>manifestations.sort(((a,b)=>{const currentDate=Number(getManifestationPublicationYear(a)),prevDate=Number(getManifestationPublicationYear(b));return"desc"===order?prevDate-currentDate:currentDate-prevDate})),flattenCreators=creators=>creators.map((creator=>creator.display)),flattenCreatorsLastNameFirst=creators=>creators.map((creator=>creator.nameSort)),divideFirstNameByComma=creatorString=>{const parts=creatorString.split(" ");return parts[0]+=",",parts.join(" ")},creatorsToString=(creators,t)=>{if(creators.length>1){return`${creators.slice(0,2).join(", ")} ${t("etAlText")}`}return 1===creators.length?lodash_first__WEBPACK_IMPORTED_MODULE_1___default()(creators):""},getLatestManifestation=manifestations=>orderManifestationsByYear(manifestations,"desc")[0],getWorkPid=work=>work.manifestations.bestRepresentation.pid||null,getCoverTint=index=>{const conf=(0,_configuration__WEBPACK_IMPORTED_MODULE_20__.FI)("coverTints",_configuration__WEBPACK_IMPORTED_MODULE_20__.Ay),{coverTints}=conf;if(coverTints){return coverTints[index%coverTints.length]}},getColors=()=>(0,_configuration__WEBPACK_IMPORTED_MODULE_20__.FI)("colors",_configuration__WEBPACK_IMPORTED_MODULE_20__.Ay),getRecommenderMaterialLimits=()=>(0,_configuration__WEBPACK_IMPORTED_MODULE_20__.FI)("recommenderMaterialLimits",_configuration__WEBPACK_IMPORTED_MODULE_20__.Ay),daysBetweenTodayAndDate=date=>{const inputDate=dayjs__WEBPACK_IMPORTED_MODULE_19___default()(new Date(date)),today=dayjs__WEBPACK_IMPORTED_MODULE_19___default()(new Date);return Math.ceil(inputDate.diff(today,"day",!0))},daysBetweenDates=(firstDate,secondDate)=>{const inputFirstDate=dayjs__WEBPACK_IMPORTED_MODULE_19___default()(new Date(firstDate)),inputSecondDate=dayjs__WEBPACK_IMPORTED_MODULE_19___default()(new Date(secondDate));return Math.ceil(inputFirstDate.diff(inputSecondDate,"day",!0))},convertPostIdToFaustId=postId=>{const matches=postId.match(/^[0-9]+-[a-z]+:([a-zA-Z0-9-_]+)$/);if(null!=matches&&matches[1])return null==matches?void 0:matches[1];throw new Error(`Unable to extract faust id from post id "${postId}"`)},convertPostIdsToFaustIds=postIds=>postIds.map((pid=>convertPostIdToFaustId(pid))),getParams=props=>Object.entries(props).reduce(((acc,[property,value])=>{const paramValue=value||(0,_url__WEBPACK_IMPORTED_MODULE_24__.d6)(property);return{...acc,[property]:paramValue?String(paramValue):""}}),{}),sortByLoanDate=list=>list.sort(((a,b)=>new Date(a.loanDate||new Date).getTime()-new Date(b.loanDate||new Date).getTime())),sortByReservationDate=list=>list.sort(((objA,objB)=>new Date(objA.dateOfReservation||new Date).getTime()-new Date(objB.dateOfReservation||new Date).getTime())),getRenewableMaterials=list=>list.filter((({isRenewable})=>isRenewable)),getAmountOfRenewableLoans=list=>getRenewableMaterials(list).length,groupObjectArrayByProperty=(array,property)=>array.reduce(((result,current)=>{const groupBy=current[property];if(!groupBy)return result;const key=String(groupBy);return key in result?{...result,[key]:[...result[key],current]}:{...result,[key]:[current]}}),{}),getManifestationsPids=manifestations=>manifestations.map((manifestation=>manifestation.pid)),stringifyValue=value=>value?String(value):"",materialIsFiction=({fictionNonfiction})=>"FICTION"===(null==fictionNonfiction?void 0:fictionNonfiction.code),getListItems=(list,itemsShown)=>[...list].splice(0,itemsShown),pageSizeGlobal=(pageSizes,configName)=>{let pageSize=0;return pageSize=null!=pageSizes&&pageSizes.desktop&&null!=pageSizes&&pageSizes.mobile?(({desktop,mobile})=>{const{pageSize}=(0,_configuration__WEBPACK_IMPORTED_MODULE_20__.jM)("pageSize",{pageSize:{mobile:{pageSize:mobile},desktop:{pageSize:desktop}}});return Number(pageSize)})(pageSizes):(pageSizeConf=>{const{pageSize}=(0,_configuration__WEBPACK_IMPORTED_MODULE_20__.jM)(pageSizeConf,_configuration__WEBPACK_IMPORTED_MODULE_20__.Ay);return Number(pageSize)})(configName||"pageSize"),pageSize},materialIsOverdue=date=>dayjs__WEBPACK_IMPORTED_MODULE_19___default()().isAfter(dayjs__WEBPACK_IMPORTED_MODULE_19___default()(date),"day"),tallyUpFees=fees=>(0,_currency__WEBPACK_IMPORTED_MODULE_23__.v)(fees.reduce(((total,{amount})=>total+amount),0)),getMaterialTypes=(manifestations,onlyFirstType=!0)=>onlyFirstType?lodash_uniq__WEBPACK_IMPORTED_MODULE_0___default()(manifestations.map((manifest=>manifest.materialTypes.map(((type,i)=>0===i?type.materialTypeSpecific.display:null)))).flat().filter((type=>null!==type))):lodash_uniq__WEBPACK_IMPORTED_MODULE_0___default()(manifestations.map((manifest=>manifest.materialTypes.map((type=>{var _type$materialTypeSpe;return null===(_type$materialTypeSpe=type.materialTypeSpecific)||void 0===_type$materialTypeSpe?void 0:_type$materialTypeSpe.display})))).flat()),getManifestationType=manifestations=>getMaterialTypes(manifestations)[0],getAllPids=manifestations=>manifestations.map((manifestation=>manifestation.pid)),getAllFaustIds=manifestations=>convertPostIdsToFaustIds(getAllPids(manifestations)),getScrollClass=modalIds=>modalIds.length>0?"scroll-lock-background":"";const patronAgeValid=(cpr,minAge)=>{const cprDate=function getDateFromCpr(cprInput){const dateSegments=cprInput.replace(/[^\d]/g,"").substring(0,6).match(/.{1,2}/g);if(dateSegments){const[day,month,year]=dateSegments;let prefix="";prefix=Number(year)<21?"20":"19";const yearWithPrefix=Number(`${prefix}${year}`);return new Date(Date.UTC(yearWithPrefix,Number(month)-1,Number(day),0,0,0,0))}return null}(cpr);if(null===cprDate)return!1;return dayjs__WEBPACK_IMPORTED_MODULE_19___default()().diff(dayjs__WEBPACK_IMPORTED_MODULE_19___default()(cprDate),"year")>minAge},getAuthorNames=(creators,by,and)=>{const names=creators.map((({display})=>display));let returnContentString="";return 0===names.length||(returnContentString=1===names.length?`${by?`${by} `:""}${names.join(", ")}`:`${by?`${by} `:""} ${names.slice(0,-1).join(", ")} ${and?`${and} `:""}${names.slice(-1)}`),returnContentString},getPublicationName=hostPublication=>hostPublication?hostPublication.title:"",getReviewRelease=(dateFirstEdition,workYear,edition)=>{var _edition$publicationY;return(null==dateFirstEdition?void 0:dateFirstEdition.display)||(null==workYear?void 0:workYear.display)||(null==edition||null===(_edition$publicationY=edition.publicationYear)||void 0===_edition$publicationY?void 0:_edition$publicationY.display)||null},getReleaseYearSearchResult=work=>{const{latest,bestRepresentation}=work.manifestations,manifestation=bestRepresentation||latest;var _work$workYear,_work$workYear2,_manifestation$workYe,_manifestation$dateFi,_manifestation$editio3,_manifestation$editio4;return materialIsFiction(work)?null===(_work$workYear=work.workYear)||void 0===_work$workYear?void 0:_work$workYear.year:materialIsFiction(manifestation)?(null===(_work$workYear2=work.workYear)||void 0===_work$workYear2?void 0:_work$workYear2.year)||(null===(_manifestation$workYe=manifestation.workYear)||void 0===_manifestation$workYe?void 0:_manifestation$workYe.year)||(null===(_manifestation$dateFi=manifestation.dateFirstEdition)||void 0===_manifestation$dateFi?void 0:_manifestation$dateFi.year)||(null===(_manifestation$editio3=manifestation.edition)||void 0===_manifestation$editio3||null===(_manifestation$editio4=_manifestation$editio3.publicationYear)||void 0===_manifestation$editio4?void 0:_manifestation$editio4.display):getManifestationPublicationYear(latest)||""},getContributors=(short,creators)=>{const{text:{data:texts}}=_store__WEBPACK_IMPORTED_MODULE_21__.M_.getState();if(creators&&creators.length>0){if(2===creators.length)return`${texts.materialByAuthorText} ${creators.join(` ${texts.materialAndAuthorText} `)}`;if(creators.length>2)return short?((creators,byText,etAlText)=>`${byText} ${creators.slice(0,2).join(", ")} ${etAlText}`)(creators,texts.materialByAuthorText,texts.etAlText):((creators,byText,andText)=>`${byText} ${creators.slice(0,-1).join(", ")} ${andText} ${creators.slice(-1)}`)(creators,texts.materialByAuthorText,texts.materialAndAuthorText)}return creators[0]}},"./src/core/utils/helpers/modal-helpers.ts":(__unused_webpack_module,__webpack_exports__,__webpack_require__)=>{__webpack_require__.d(__webpack_exports__,{Q0:()=>constructModalId,c6:()=>getModalIds,dI:()=>getDetailsModalId,eF:()=>containsDueDateModalQueryParam,xx:()=>dateFromDueDateModalQueryParam});var _configuration__WEBPACK_IMPORTED_MODULE_0__=__webpack_require__("./src/core/configuration/index.ts");const constructModalId=(prefix,fragments)=>""===prefix?fragments.join("-"):[prefix,...fragments].join("-"),getModalIds=()=>(0,_configuration__WEBPACK_IMPORTED_MODULE_0__.FI)("modalIds",_configuration__WEBPACK_IMPORTED_MODULE_0__.Ay),containsDueDateModalQueryParam=queryParam=>{const{dueDateModal}=getModalIds(),regex=new RegExp(`${dueDateModal}\\d{4}-\\d{2}-\\d{2}`,"g"),dateFound=queryParam.match(regex);return dateFound?dateFound[0]:null},dateFromDueDateModalQueryParam=queryParam=>{const dateFound=queryParam.match(/\d{4}-\d{2}-\d{2}/g);return dateFound?dateFound[0]:null},getDetailsModalId=(queryParam,prefix)=>{const regexIdentifier=new RegExp(`(?<=${prefix})((\\d{13})|((\\d{10}))||((\\d{9}))|(\\d{8}))`,"g"),modalId=queryParam.match(regexIdentifier);if(modalId){const[returnId]=modalId;return returnId}return""}},"./src/core/utils/url.tsx":(__unused_webpack_module,__webpack_exports__,__webpack_require__)=>{__webpack_require__.d(__webpack_exports__,{Ik:()=>useUrls,nU:()=>withUrls});var react__WEBPACK_IMPORTED_MODULE_0__=__webpack_require__("./node_modules/react/index.js"),_store__WEBPACK_IMPORTED_MODULE_1__=__webpack_require__("./src/core/store.ts"),_url_slice__WEBPACK_IMPORTED_MODULE_2__=__webpack_require__("./src/core/url.slice.ts"),_helpers_url__WEBPACK_IMPORTED_MODULE_4__=__webpack_require__("./src/core/utils/helpers/url.ts"),_withSuffix__WEBPACK_IMPORTED_MODULE_3__=__webpack_require__("./src/core/utils/withSuffix.tsx");const useUrls=()=>{const{data}=(0,_store__WEBPACK_IMPORTED_MODULE_1__.d4)((state=>state.url)),urls=(0,react__WEBPACK_IMPORTED_MODULE_0__.useMemo)((()=>(0,_helpers_url__WEBPACK_IMPORTED_MODULE_4__.tP)(data)),[data]);return(name,returnFalseIfUndefined=!1)=>{if(returnFalseIfUndefined)return urls[name]||!1;if(!urls[name])throw new Error(`The url ${name} is not defined`);return urls[name]}},withUrls=Component=>(0,_withSuffix__WEBPACK_IMPORTED_MODULE_3__.A)(Component,"Url",_url_slice__WEBPACK_IMPORTED_MODULE_2__.hx);try{withUrls.displayName="withUrls",withUrls.__docgenInfo={description:"",displayName:"withUrls",props:{}},"undefined"!=typeof STORYBOOK_REACT_CLASSES&&(STORYBOOK_REACT_CLASSES["src/core/utils/url.tsx#withUrls"]={docgenInfo:withUrls.__docgenInfo,name:"withUrls",path:"src/core/utils/url.tsx#withUrls"})}catch(__react_docgen_typescript_loader_error){}},"./src/core/configuration/modal-ids.json":module=>{module.exports=JSON.parse('{"allLoansId":"all-loans-id","pauseReservation":"pause-reservation","deleteReservation":"delete-reservation","deleteReservations":"delete-reservations","loanDetails":"loan-details-","acceptModal":"accept-fee","reservationDetails":"reservation-details-","dueDateModal":"due-date","feeDetails":"fee-details-","userMenuAuthenticated":"user-modal-authenticated","userMenuAnonymous":"user-modal-anonymous","userMenuUnregistered":"user-modal-unregistered","reservationsReady":"reservations-ready","reservationsQueued":"reservations-queued"}')}}]);