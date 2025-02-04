"use strict";(globalThis.webpackChunk_danskernesdigitalebibliotek_dpl_react=globalThis.webpackChunk_danskernesdigitalebibliotek_dpl_react||[]).push([[6825],{"./src/components/Buttons/LinkButton.tsx":(__unused_webpack_module,__webpack_exports__,__webpack_require__)=>{__webpack_require__.d(__webpack_exports__,{A:()=>__WEBPACK_DEFAULT_EXPORT__});var react__WEBPACK_IMPORTED_MODULE_0__=__webpack_require__("./node_modules/react/index.js"),_Button__WEBPACK_IMPORTED_MODULE_1__=__webpack_require__("./src/components/Buttons/Button.tsx"),_core_utils_helpers_url__WEBPACK_IMPORTED_MODULE_2__=__webpack_require__("./src/core/utils/helpers/url.ts");const LinkButton=({buttonType,children,classNames,dataCy="link-button",iconClassNames,isNewTab=!1,size="medium",trackClick,url,variant="filled",ariaLabelledBy,id})=>react__WEBPACK_IMPORTED_MODULE_0__.createElement(_Button__WEBPACK_IMPORTED_MODULE_1__.$,{variant,size,buttonType:buttonType||"none",classNames,iconClassNames,onClick:()=>{trackClick&&(null==trackClick||trackClick().then((()=>(0,_core_utils_helpers_url__WEBPACK_IMPORTED_MODULE_2__.SE)(url,isNewTab)))),trackClick||(0,_core_utils_helpers_url__WEBPACK_IMPORTED_MODULE_2__.SE)(url,isNewTab)},dataCy,ariaDescribedBy:ariaLabelledBy,id,canOnlyBeClickedOnce:!0,label:children,collapsible:!1}),__WEBPACK_DEFAULT_EXPORT__=LinkButton;try{LinkButton.displayName="LinkButton",LinkButton.__docgenInfo={description:"",displayName:"LinkButton",props:{buttonType:{defaultValue:null,description:"",name:"buttonType",required:!1,type:{name:"enum",value:[{value:"undefined"},{value:'"none"'},{value:'"default"'},{value:'"external-link"'},{value:'"search"'}]}},classNames:{defaultValue:null,description:"",name:"classNames",required:!1,type:{name:"string | undefined"}},dataCy:{defaultValue:{value:"link-button"},description:"",name:"dataCy",required:!1,type:{name:"string | undefined"}},iconClassNames:{defaultValue:null,description:"",name:"iconClassNames",required:!1,type:{name:"string | undefined"}},isNewTab:{defaultValue:{value:"false"},description:"",name:"isNewTab",required:!1,type:{name:"boolean | undefined"}},size:{defaultValue:{value:"medium"},description:"",name:"size",required:!1,type:{name:"enum",value:[{value:'"xsmall"'},{value:'"small"'},{value:'"medium"'},{value:'"large"'},{value:'"xlarge"'}]}},trackClick:{defaultValue:null,description:"",name:"trackClick",required:!1,type:{name:"(() => Promise<unknown>) | undefined"}},url:{defaultValue:null,description:"",name:"url",required:!0,type:{name:"URL"}},variant:{defaultValue:{value:"filled"},description:"",name:"variant",required:!1,type:{name:"enum",value:[{value:'"outline"'},{value:'"filled"'}]}},ariaLabelledBy:{defaultValue:null,description:"",name:"ariaLabelledBy",required:!1,type:{name:"string | undefined"}},id:{defaultValue:null,description:"",name:"id",required:!1,type:{name:"string | undefined"}}}},"undefined"!=typeof STORYBOOK_REACT_CLASSES&&(STORYBOOK_REACT_CLASSES["src/components/Buttons/LinkButton.tsx#LinkButton"]={docgenInfo:LinkButton.__docgenInfo,name:"LinkButton",path:"src/components/Buttons/LinkButton.tsx#LinkButton"})}catch(__react_docgen_typescript_loader_error){}},"./src/components/message/modal-message/ModalMessage.tsx":(__unused_webpack_module,__webpack_exports__,__webpack_require__)=>{__webpack_require__.d(__webpack_exports__,{A:()=>modal_message_ModalMessage});var react=__webpack_require__("./node_modules/react/index.js"),focus_trap_react=__webpack_require__("./node_modules/focus-trap-react/dist/focus-trap-react.js");try{withFocusTrap.displayName="withFocusTrap",withFocusTrap.__docgenInfo={description:"",displayName:"withFocusTrap",props:{}},"undefined"!=typeof STORYBOOK_REACT_CLASSES&&(STORYBOOK_REACT_CLASSES["src/core/utils/withFocusTrap.tsx#withFocusTrap"]={docgenInfo:withFocusTrap.__docgenInfo,name:"withFocusTrap",path:"src/core/utils/withFocusTrap.tsx#withFocusTrap"})}catch(__react_docgen_typescript_loader_error){}const Message=({children,title,subTitle})=>react.createElement(react.Fragment,null,react.createElement("h2",{"data-cy":"message-title",className:"text-header-h2"},title),react.createElement("div",{className:"color-secondary-gray text-body-medium-regular mt-48"},react.createElement("p",{"data-cy":"message-subtitle"},subTitle)),children&&react.createElement("div",null,children)),modal_message_Message=Message;try{Message.displayName="Message",Message.__docgenInfo={description:"",displayName:"Message",props:{title:{defaultValue:null,description:"",name:"title",required:!0,type:{name:"string"}},subTitle:{defaultValue:null,description:"",name:"subTitle",required:!0,type:{name:"string"}}}},"undefined"!=typeof STORYBOOK_REACT_CLASSES&&(STORYBOOK_REACT_CLASSES["src/components/message/modal-message/Message.tsx#Message"]={docgenInfo:Message.__docgenInfo,name:"Message",path:"src/components/message/modal-message/Message.tsx#Message"})}catch(__react_docgen_typescript_loader_error){}var Button=__webpack_require__("./src/components/Buttons/Button.tsx"),modal=__webpack_require__("./src/core/utils/modal.tsx");const ModalMessage=react.forwardRef((props=>{const{close,closeAll}=(0,modal.X)(),{ctaButton,...messageProps}=props;return react.createElement("div",{className:"modal-cta__container"},react.createElement(modal_message_Message,messageProps),react.createElement("div",{className:"modal-cta__buttons mt-48"},ctaButton&&react.createElement(Button.$,{dataCy:ctaButton.dataCy??"modal-cta-button",classNames:"modal-message__confirm-button",label:ctaButton.text,buttonType:"none",disabled:!1,collapsible:!1,size:"small",variant:"filled",onClick:()=>{ctaButton.callback&&ctaButton.callback(),ctaButton.modalId&&close(ctaButton.modalId),ctaButton.closeAllModals&&closeAll()}})))}));ModalMessage.displayName="ModalMessage";const modal_message_ModalMessage=(Component=ModalMessage,({...props})=>react.createElement(focus_trap_react.FocusTrap,{focusTrapOptions:{allowOutsideClick:!0}},react.createElement(Component,props)));var Component;try{ModalMessage.displayName="ModalMessage",ModalMessage.__docgenInfo={description:"",displayName:"ModalMessage",props:{ctaButton:{defaultValue:null,description:"",name:"ctaButton",required:!1,type:{name:"({ text: string; callback?: (() => void) | undefined; dataCy?: string | undefined; } & (RequiredModalId | RequireCloseAllModals)) | undefined"}},title:{defaultValue:null,description:"",name:"title",required:!0,type:{name:"string"}},subTitle:{defaultValue:null,description:"",name:"subTitle",required:!0,type:{name:"string"}}}},"undefined"!=typeof STORYBOOK_REACT_CLASSES&&(STORYBOOK_REACT_CLASSES["src/components/message/modal-message/ModalMessage.tsx#ModalMessage"]={docgenInfo:ModalMessage.__docgenInfo,name:"ModalMessage",path:"src/components/message/modal-message/ModalMessage.tsx#ModalMessage"})}catch(__react_docgen_typescript_loader_error){}},"./src/components/reservation/helper.ts":(__unused_webpack_module,__webpack_exports__,__webpack_require__)=>{__webpack_require__.d(__webpack_exports__,{B6:()=>getInputType,C4:()=>getPreferredBranch,CF:()=>getAuthorLine,En:()=>getNoInterestAfter,He:()=>getReservationModalTypeTranslation,QW:()=>getInstantLoanBranchHoldings,Qr:()=>isConfigValueOne,ZI:()=>getFutureDateString,c8:()=>getFutureDateStringISO,hn:()=>getManifestationsToReserve,kd:()=>removePrefixFromBranchId,mR:()=>getInstantLoanBranchHoldingsAboveThreshold,pS:()=>translateOpenOrderStatus,wT:()=>constructReservationData});__webpack_require__("./node_modules/core-js/modules/esnext.map.delete-all.js"),__webpack_require__("./node_modules/core-js/modules/esnext.map.every.js"),__webpack_require__("./node_modules/core-js/modules/esnext.map.filter.js"),__webpack_require__("./node_modules/core-js/modules/esnext.map.find.js"),__webpack_require__("./node_modules/core-js/modules/esnext.map.find-key.js"),__webpack_require__("./node_modules/core-js/modules/esnext.map.includes.js"),__webpack_require__("./node_modules/core-js/modules/esnext.map.key-of.js"),__webpack_require__("./node_modules/core-js/modules/esnext.map.map-keys.js"),__webpack_require__("./node_modules/core-js/modules/esnext.map.map-values.js"),__webpack_require__("./node_modules/core-js/modules/esnext.map.merge.js"),__webpack_require__("./node_modules/core-js/modules/esnext.map.reduce.js"),__webpack_require__("./node_modules/core-js/modules/esnext.map.some.js"),__webpack_require__("./node_modules/core-js/modules/esnext.map.update.js");var dayjs__WEBPACK_IMPORTED_MODULE_13__=__webpack_require__("./node_modules/dayjs/dayjs.min.js"),dayjs__WEBPACK_IMPORTED_MODULE_13___default=__webpack_require__.n(dayjs__WEBPACK_IMPORTED_MODULE_13__),_core_utils_helpers_general__WEBPACK_IMPORTED_MODULE_14__=__webpack_require__("./src/core/utils/helpers/general.ts"),_core_utils_helpers_invalid_switch_case__WEBPACK_IMPORTED_MODULE_16__=__webpack_require__("./src/core/utils/helpers/invalid-switch-case.ts"),_core_dbc_gateway_generated_graphql__WEBPACK_IMPORTED_MODULE_15__=__webpack_require__("./src/core/dbc-gateway/generated/graphql.ts");const isConfigValueOne=configValue=>"1"===configValue,getPreferredBranch=(id,array)=>{const locationItem=array.find((item=>item.branchId===id));return locationItem?locationItem.title:id},getNoInterestAfter=(days,interestPeriod,t)=>{const interestPeriodFound=interestPeriod.interestPeriods.find((period=>period.value.toString()===days.toString()));return interestPeriodFound?interestPeriodFound.label:`${days} ${t("daysText")}`},getFutureDateString=num=>dayjs__WEBPACK_IMPORTED_MODULE_13___default()().add(num,"day").format("YYYY-MM-DD"),getFutureDateStringISO=num=>dayjs__WEBPACK_IMPORTED_MODULE_13___default()().add(num,"day").format("YYYY-MM-DDTHH:mm:ssZ"),constructReservations=({manifestations,pickupBranch,expiryDate,periodical})=>manifestations.map((manifestation=>(({manifestation:{pid},pickupBranch,expiryDate,periodical})=>({recordId:(0,_core_utils_helpers_general__WEBPACK_IMPORTED_MODULE_14__.G_)(pid),...pickupBranch?{pickupBranch}:{},...expiryDate?{expiryDate}:{},...periodical?{periodical}:{}}))({manifestation,pickupBranch,expiryDate,periodical}))),constructReservationData=({manifestations,selectedBranch,expiryDate,periodical})=>({reservations:constructReservations({manifestations,...selectedBranch?{pickupBranch:selectedBranch}:{},...expiryDate?{expiryDate}:{},...periodical?{periodical:{volume:periodical.volume,volumeNumber:periodical.volumeNumber,volumeYear:periodical.volumeYear}}:{}}),...manifestations.length>1?{type:"parallel"}:{}}),getAuthorLine=(manifestation,t)=>{const{creators}=manifestation,publicationYear=(0,_core_utils_helpers_general__WEBPACK_IMPORTED_MODULE_14__.Ey)(manifestation),author=(0,_core_utils_helpers_general__WEBPACK_IMPORTED_MODULE_14__.sP)((0,_core_utils_helpers_general__WEBPACK_IMPORTED_MODULE_14__.UV)(creators),t)||null;let year="";return publicationYear&&(year=publicationYear),(0,_core_utils_helpers_general__WEBPACK_IMPORTED_MODULE_14__.G)(manifestation)&&(year=`(${t("materialHeaderAllEditionsText")})`),author?[t("materialHeaderAuthorByText"),author,year].join(" "):null},getManifestationsToReserve=(reservableManifestations,isPeriodical)=>isPeriodical?reservableManifestations:!reservableManifestations||reservableManifestations.length<1?[]:(0,_core_utils_helpers_general__WEBPACK_IMPORTED_MODULE_14__.G)(reservableManifestations[0])?reservableManifestations:[(0,_core_utils_helpers_general__WEBPACK_IMPORTED_MODULE_14__.yr)(reservableManifestations)],getReservationModalTypeTranslation=(name,type)=>{const isCloseModal="closeModalAriaLabelText"===type;switch(name){case"sms":return isCloseModal?"closeModalAriaLabelSmsText":"screenReaderModalDescriptionSmsText";case"email":return isCloseModal?"closeModalAriaLabelEmailText":"screenReaderModalDescriptionEmailText";case"interestPeriod":return isCloseModal?"closeModalAriaLabelInterestPeriodText":"screenReaderModalDescriptionInterestPeriodText";case"pickup":return isCloseModal?"closeModalAriaLabelPickupText":"screenReaderModalDescriptionPickupText";default:return(0,_core_utils_helpers_invalid_switch_case__WEBPACK_IMPORTED_MODULE_16__.A)(name)}},getInstantLoanBranchHoldings=(branchHoldings,whitelist,instantLoanStrings)=>{const whitelistBranchIds=whitelist.map((({branchId})=>branchId));return(branchHoldings=>{const processedBranches=new Map;return branchHoldings.forEach((({branch,materials})=>{const{branchId}=branch,storedBranch=processedBranches.get(branchId);storedBranch?processedBranches.set(branchId,{branch,materials:[...materials,...storedBranch.materials]}):processedBranches.set(branchId,{branch,materials})})),[...processedBranches.values()]})(branchHoldings.filter((({branch})=>whitelistBranchIds.includes(branch.branchId)))).map((({branch,materials})=>({branch,materials:materials.filter((({materialGroup,available})=>instantLoanStrings.some((instantLoanString=>instantLoanString===materialGroup.name))&&available))}))).filter((({materials})=>materials.length>0))},getInstantLoanBranchHoldingsAboveThreshold=(instantLoanBranchHoldings,instantLoanThresholdConfig)=>instantLoanBranchHoldings.filter((({materials})=>materials.length>=Number(instantLoanThresholdConfig??0))),removePrefixFromBranchId=branchId=>branchId.split("-")[1],translateOpenOrderStatus=(status,t)=>{const statusTextMap={[_core_dbc_gateway_generated_graphql__WEBPACK_IMPORTED_MODULE_15__.IR.OwnedAccepted]:"openOrderStatusOwnedAcceptedText",[_core_dbc_gateway_generated_graphql__WEBPACK_IMPORTED_MODULE_15__.IR.AuthenticationError]:"openOrderAuthenticationErrorText",[_core_dbc_gateway_generated_graphql__WEBPACK_IMPORTED_MODULE_15__.IR.BorchkUserBlockedByAgency]:"openOrderUserBlockedByAgencyText",[_core_dbc_gateway_generated_graphql__WEBPACK_IMPORTED_MODULE_15__.IR.BorchkUserNotVerified]:"openOrderUserNotVerifiedText",[_core_dbc_gateway_generated_graphql__WEBPACK_IMPORTED_MODULE_15__.IR.BorchkUserNoLongerExistOnAgency]:"openOrderUserNoLongerExistOnAgencyText",[_core_dbc_gateway_generated_graphql__WEBPACK_IMPORTED_MODULE_15__.IR.InvalidOrder]:"openOrderInvalidOrderText",[_core_dbc_gateway_generated_graphql__WEBPACK_IMPORTED_MODULE_15__.IR.NotOwnedIllLoc]:"openOrderNotOwnedIllLocText",[_core_dbc_gateway_generated_graphql__WEBPACK_IMPORTED_MODULE_15__.IR.NotOwnedNoIllLoc]:"openOrderNotOwnedNoIllLocText",[_core_dbc_gateway_generated_graphql__WEBPACK_IMPORTED_MODULE_15__.IR.NotOwnedWrongIllMediumtype]:"openOrderNotOwnedWrongIllMediumtypeText",[_core_dbc_gateway_generated_graphql__WEBPACK_IMPORTED_MODULE_15__.IR.NoServicerequester]:"openOrderNoServicerequesterText",[_core_dbc_gateway_generated_graphql__WEBPACK_IMPORTED_MODULE_15__.IR.OrsError]:"openOrderOrsErrorText",[_core_dbc_gateway_generated_graphql__WEBPACK_IMPORTED_MODULE_15__.IR.OwnedOwnCatalogue]:"openOrderOwnedOwnCatalogueText",[_core_dbc_gateway_generated_graphql__WEBPACK_IMPORTED_MODULE_15__.IR.OwnedWrongMediumtype]:"openOrderOwnedWrongMediumtypeText",[_core_dbc_gateway_generated_graphql__WEBPACK_IMPORTED_MODULE_15__.IR.ServiceUnavailable]:"openOrderServiceUnavailableText",[_core_dbc_gateway_generated_graphql__WEBPACK_IMPORTED_MODULE_15__.IR.UnknownError]:"openOrderUnknownErrorText",[_core_dbc_gateway_generated_graphql__WEBPACK_IMPORTED_MODULE_15__.IR.UnknownPickupagency]:"openOrderUnknownPickupagencyText",[_core_dbc_gateway_generated_graphql__WEBPACK_IMPORTED_MODULE_15__.IR.UnknownUser]:"openOrderUnknownUserText",[_core_dbc_gateway_generated_graphql__WEBPACK_IMPORTED_MODULE_15__.IR.ErrorMissingPincode]:"openOrderErrorMissingPincodeText"};return statusTextMap[status]?t(statusTextMap[status]):""},getInputType=type=>{switch(type){case"email":return"email";case"sms":return"tel";default:return"text"}}},"./src/core/utils/helpers/list-mapper.ts":(__unused_webpack_module,__webpack_exports__,__webpack_require__)=>{__webpack_require__.d(__webpack_exports__,{$U:()=>mapFBSLoanToLoanType,Ml:()=>mapManifestationToBasicDetailsType,hg:()=>mapPublizonReservationToReservationType,ji:()=>mapPublizonLoanToLoanType,sl:()=>mapFBSReservationGroupToReservationType,z7:()=>mapProductToBasicDetailsType});var lodash_values__WEBPACK_IMPORTED_MODULE_0__=__webpack_require__("./node_modules/lodash/values.js"),lodash_values__WEBPACK_IMPORTED_MODULE_0___default=__webpack_require__.n(lodash_values__WEBPACK_IMPORTED_MODULE_0__),lodash_keys__WEBPACK_IMPORTED_MODULE_1__=__webpack_require__("./node_modules/lodash/keys.js"),lodash_keys__WEBPACK_IMPORTED_MODULE_1___default=__webpack_require__.n(lodash_keys__WEBPACK_IMPORTED_MODULE_1__),lodash_head__WEBPACK_IMPORTED_MODULE_2__=__webpack_require__("./node_modules/lodash/head.js"),lodash_head__WEBPACK_IMPORTED_MODULE_2___default=__webpack_require__.n(lodash_head__WEBPACK_IMPORTED_MODULE_2__),_store__WEBPACK_IMPORTED_MODULE_3__=__webpack_require__("./src/core/store.ts"),_general__WEBPACK_IMPORTED_MODULE_4__=__webpack_require__("./src/core/utils/helpers/general.ts");function getSeriesString(series){return series.map((({title,members})=>{if(members[0].numberInSeries){return`${title} ${members[0].numberInSeries}`}return title})).join(", ")}const mapPublizonLoanToLoanType=list=>list.map((({loanExpireDateUtc,orderDateUtc,libraryBook,orderId})=>({dueDate:loanExpireDateUtc,loanDate:orderDateUtc,isRenewable:!1,materialItemNumber:(null==libraryBook?void 0:libraryBook.identifier)||"",renewalStatusList:[],loanType:null,identifier:(null==libraryBook?void 0:libraryBook.identifier)||null,faust:null,loanId:null,orderId}))),mapFBSLoanToLoanType=list=>list.map((({loanDetails,isRenewable,renewalStatusList})=>{var _loanDetails$periodic;return{dueDate:loanDetails.dueDate,loanDate:loanDetails.loanDate,periodical:(null===(_loanDetails$periodic=loanDetails.periodical)||void 0===_loanDetails$periodic?void 0:_loanDetails$periodic.displayText)||"",renewalStatusList,isRenewable,materialItemNumber:loanDetails.materialItemNumber,loanType:loanDetails.loanType,identifier:null,faust:loanDetails.recordId||null,loanId:loanDetails.loanId,details:loanDetails.ilBibliographicRecord?{title:loanDetails.ilBibliographicRecord.title,authors:loanDetails.ilBibliographicRecord.author,authorsShort:loanDetails.ilBibliographicRecord.author,firstAuthor:loanDetails.ilBibliographicRecord.author,year:loanDetails.ilBibliographicRecord.publicationDate,lang:loanDetails.ilBibliographicRecord.language}:null}})),mapProductToBasicDetailsType=material=>{const{publicationDate,title,description,productType,contributors,externalProductId,languageCode}=material,{text:{data:texts}}=_store__WEBPACK_IMPORTED_MODULE_3__.M_.getState(),digitalProductType={1:texts.publizonEbookText,2:texts.publizonAudioBookText,4:texts.publizonPodcastText},authors=(null==contributors?void 0:contributors.map((({firstName,lastName})=>`${firstName} ${lastName}`)))||[];return{title,lang:languageCode,periodical:null,year:publicationDate?(date=publicationDate,new Date(date).getFullYear()):"",description,materialType:productType?digitalProductType[productType]:"",externalProductId:null==externalProductId?void 0:externalProductId.id,authors:contributors?(0,_general__WEBPACK_IMPORTED_MODULE_4__.Zc)(!1,authors):"",authorsShort:contributors?(0,_general__WEBPACK_IMPORTED_MODULE_4__.Zc)(!0,authors):""};var date},mapManifestationToBasicDetailsType=material=>{var _languages$main,_languages$main$;const{edition,abstract,titles,pid,materialTypes,creators,series,languages}=material,isoCode=(null==languages||null===(_languages$main=languages.main)||void 0===_languages$main||null===(_languages$main$=_languages$main[0])||void 0===_languages$main$?void 0:_languages$main$.isoCode)??"",description=abstract?abstract[0]:"",{full:[fullText]}=titles||{full:[]},{publicationYear}=edition||{},{display:year}=publicationYear||{},inputContributorsArray=(null==creators?void 0:creators.map((({display})=>display)))||[],firstAuthor=creators&&creators.length?creators[0].display:"";return{lang:isoCode,authors:(0,_general__WEBPACK_IMPORTED_MODULE_4__.Zc)(!1,inputContributorsArray),authorsShort:(0,_general__WEBPACK_IMPORTED_MODULE_4__.Zc)(!0,inputContributorsArray),firstAuthor,pid,title:fullText,year,description,series:series&&series.length>0&&series[0].members&&series[0].members.length>0?getSeriesString(series):"",materialType:materialTypes?materialTypes[0].materialTypeSpecific.display:void 0}},mapPublizonReservationToReservationType=list=>list.map((({identifier,createdDateUtc,status,expectedRedeemDateUtc,productTitle,expireDateUtc})=>({identifier,faust:null,dateOfReservation:createdDateUtc,expiryDate:expireDateUtc,state:status?{1:"reserved",2:"readyForPickup",3:"redeemed",4:"cancelled",5:"expired"}[status]:null,title:productTitle,pickupDeadline:expectedRedeemDateUtc}))),mapFBSReservationGroupToReservationType=list=>list.map((({dateOfReservation,expiryDate,numberInQueue,state,pickupBranch,pickupDeadline,pickupNumber,periodical,records,ilBibliographicRecord})=>({periodical:(null==periodical?void 0:periodical.displayText)||"",faust:lodash_head__WEBPACK_IMPORTED_MODULE_2___default()(lodash_keys__WEBPACK_IMPORTED_MODULE_1___default()(records)),dateOfReservation,expiryDate,numberInQueue,state:"readyForPickup"===state?"readyForPickup":"reserved",pickupBranch,pickupDeadline,pickupNumber,reservationIds:lodash_values__WEBPACK_IMPORTED_MODULE_0___default()(records),details:ilBibliographicRecord?{title:ilBibliographicRecord.title,authors:ilBibliographicRecord.author,authorsShort:ilBibliographicRecord.author,firstAuthor:ilBibliographicRecord.author,year:ilBibliographicRecord.publicationDate,lang:ilBibliographicRecord.language}:null})))},"./src/core/utils/helpers/usePatronData.ts":(__unused_webpack_module,__webpack_exports__,__webpack_require__)=>{__webpack_require__.d(__webpack_exports__,{Ix:()=>usePatronData,lX:()=>getBlockedStatus});var _fbs_fbs__WEBPACK_IMPORTED_MODULE_0__=__webpack_require__("./src/core/fbs/fbs.ts"),_types_BlockedTypes__WEBPACK_IMPORTED_MODULE_1__=__webpack_require__("./src/core/utils/types/BlockedTypes.ts"),_user__WEBPACK_IMPORTED_MODULE_2__=__webpack_require__("./src/core/utils/helpers/user.ts");const usePatronData=()=>(0,_fbs_fbs__WEBPACK_IMPORTED_MODULE_0__.wq)({enabled:!(0,_user__WEBPACK_IMPORTED_MODULE_2__.ok)()}),getBlockedStatus=patron=>{var _patron$blockStatus;return null!=patron&&patron.blockStatus&&(null==patron||null===(_patron$blockStatus=patron.blockStatus)||void 0===_patron$blockStatus?void 0:_patron$blockStatus.length)>0?patron.blockStatus[0].blockedReason:_types_BlockedTypes__WEBPACK_IMPORTED_MODULE_1__.A.unknown}},"./src/core/utils/types/BlockedTypes.ts":(__unused_webpack_module,__webpack_exports__,__webpack_require__)=>{__webpack_require__.d(__webpack_exports__,{A:()=>__WEBPACK_DEFAULT_EXPORT__});var BlockedTypes=function(BlockedTypes){return BlockedTypes.extendedSuspension="F",BlockedTypes.deceased="D",BlockedTypes.fee="E",BlockedTypes.missingPatronCategory="W",BlockedTypes.accountStolen="O",BlockedTypes.suspension="U",BlockedTypes.blockedFromSelfservice="S",BlockedTypes.unknown="unknown",BlockedTypes}(BlockedTypes||{});const __WEBPACK_DEFAULT_EXPORT__=BlockedTypes}}]);