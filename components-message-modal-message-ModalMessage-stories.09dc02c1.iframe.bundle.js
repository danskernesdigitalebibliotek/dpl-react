(globalThis.webpackChunk_danskernesdigitalebibliotek_dpl_react=globalThis.webpackChunk_danskernesdigitalebibliotek_dpl_react||[]).push([[5156],{"./src/components/message/modal-message/ModalMessage.stories.tsx":(__unused_webpack_module,__webpack_exports__,__webpack_require__)=>{"use strict";__webpack_require__.r(__webpack_exports__),__webpack_require__.d(__webpack_exports__,{ModalMessageExample:()=>ModalMessageExample,default:()=>__WEBPACK_DEFAULT_EXPORT__});var react__WEBPACK_IMPORTED_MODULE_0__=__webpack_require__("./node_modules/react/index.js"),_core_utils_modal__WEBPACK_IMPORTED_MODULE_1__=__webpack_require__("./src/core/utils/modal.tsx"),_ModalMessage__WEBPACK_IMPORTED_MODULE_2__=__webpack_require__("./src/components/message/modal-message/ModalMessage.tsx"),_core_storybook_globalTextArgs__WEBPACK_IMPORTED_MODULE_3__=__webpack_require__("./src/core/storybook/globalTextArgs.ts");function _extends(){return _extends=Object.assign?Object.assign.bind():function(n){for(var e=1;e<arguments.length;e++){var t=arguments[e];for(var r in t)({}).hasOwnProperty.call(t,r)&&(n[r]=t[r])}return n},_extends.apply(null,arguments)}const Template=props=>{const{open}=(0,_core_utils_modal__WEBPACK_IMPORTED_MODULE_1__.X)();return(0,react__WEBPACK_IMPORTED_MODULE_0__.useEffect)((()=>{open("modal-message")}),[open]),react__WEBPACK_IMPORTED_MODULE_0__.createElement(_core_utils_modal__WEBPACK_IMPORTED_MODULE_1__.A,{modalId:"modal-message",closeModalAriaLabelText:"close",screenReaderModalDescriptionText:"modal message story",classNames:"modal-cta modal-padding"},react__WEBPACK_IMPORTED_MODULE_0__.createElement(_ModalMessage__WEBPACK_IMPORTED_MODULE_2__.A,_extends({},props,{ctaButton:{modalId:"modal-message",text:"Man"}}),react__WEBPACK_IMPORTED_MODULE_0__.createElement("p",null,"Hello, I am some extra info")))},__WEBPACK_DEFAULT_EXPORT__={title:"Components / Message / Modal Message",component:_ModalMessage__WEBPACK_IMPORTED_MODULE_2__.A,argTypes:{..._core_storybook_globalTextArgs__WEBPACK_IMPORTED_MODULE_3__.U,title:{control:{type:"text"}},subTitle:{control:{type:"text"}}},args:{..._core_storybook_globalTextArgs__WEBPACK_IMPORTED_MODULE_3__.A,title:"This is a title",subTitle:"This is a subtitle"},render:args=>react__WEBPACK_IMPORTED_MODULE_0__.createElement(Template,args)},ModalMessageExample={};ModalMessageExample.parameters={...ModalMessageExample.parameters,docs:{...ModalMessageExample.parameters?.docs,source:{originalSource:"{}",...ModalMessageExample.parameters?.docs?.source}}}},"./src/components/Buttons/Button.tsx":(__unused_webpack_module,__webpack_exports__,__webpack_require__)=>{"use strict";__webpack_require__.d(__webpack_exports__,{$:()=>Button});var react__WEBPACK_IMPORTED_MODULE_0__=__webpack_require__("./node_modules/react/index.js"),_ButtonIcon__WEBPACK_IMPORTED_MODULE_1__=__webpack_require__("./src/components/Buttons/ButtonIcon.tsx");const Button=({label,buttonType,disabled,collapsible,size,variant,onClick,iconClassNames,id,classNames,dataCy,ariaDescribedBy})=>react__WEBPACK_IMPORTED_MODULE_0__.createElement("button",{"data-cy":dataCy||"button",type:"button",className:`btn-primary btn-${variant} btn-${size} ${disabled?"btn-outline":""} arrow__hover--right-small ${classNames??""}`,disabled,onClick,id,"aria-describedby":ariaDescribedBy},label,react__WEBPACK_IMPORTED_MODULE_0__.createElement(_ButtonIcon__WEBPACK_IMPORTED_MODULE_1__.a,{buttonType,iconClassNames,collapsible}));try{Button.displayName="Button",Button.__docgenInfo={description:"",displayName:"Button",props:{label:{defaultValue:null,description:"",name:"label",required:!0,type:{name:"string"}},buttonType:{defaultValue:null,description:"",name:"buttonType",required:!0,type:{name:"enum",value:[{value:'"search"'},{value:'"none"'},{value:'"default"'},{value:'"external-link"'}]}},disabled:{defaultValue:null,description:"",name:"disabled",required:!0,type:{name:"boolean"}},collapsible:{defaultValue:null,description:"",name:"collapsible",required:!0,type:{name:"boolean"}},size:{defaultValue:null,description:"",name:"size",required:!0,type:{name:"enum",value:[{value:'"xsmall"'},{value:'"small"'},{value:'"medium"'},{value:'"large"'},{value:'"xlarge"'}]}},variant:{defaultValue:null,description:"",name:"variant",required:!0,type:{name:"enum",value:[{value:'"outline"'},{value:'"filled"'}]}},onClick:{defaultValue:null,description:"",name:"onClick",required:!1,type:{name:"(() => void) | undefined"}},iconClassNames:{defaultValue:null,description:"",name:"iconClassNames",required:!1,type:{name:"string | undefined"}},id:{defaultValue:null,description:"",name:"id",required:!1,type:{name:"string | undefined"}},classNames:{defaultValue:null,description:"",name:"classNames",required:!1,type:{name:"string | undefined"}},dataCy:{defaultValue:null,description:"",name:"dataCy",required:!1,type:{name:"string | undefined"}},ariaDescribedBy:{defaultValue:null,description:"",name:"ariaDescribedBy",required:!1,type:{name:"string | undefined"}}}},"undefined"!=typeof STORYBOOK_REACT_CLASSES&&(STORYBOOK_REACT_CLASSES["src/components/Buttons/Button.tsx#Button"]={docgenInfo:Button.__docgenInfo,name:"Button",path:"src/components/Buttons/Button.tsx#Button"})}catch(__react_docgen_typescript_loader_error){}},"./src/components/Buttons/ButtonIcon.tsx":(__unused_webpack_module,__webpack_exports__,__webpack_require__)=>{"use strict";__webpack_require__.d(__webpack_exports__,{a:()=>ButtonIcon});var react__WEBPACK_IMPORTED_MODULE_0__=__webpack_require__("./node_modules/react/index.js"),_danskernesdigitalebibliotek_dpl_design_system_build_icons_arrow_ui_icon_arrow_ui_small_right_svg__WEBPACK_IMPORTED_MODULE_1__=__webpack_require__("./node_modules/@danskernesdigitalebibliotek/dpl-design-system/build/icons/arrow-ui/icon-arrow-ui-small-right.svg"),_danskernesdigitalebibliotek_dpl_design_system_build_icons_arrow_ui_icon_arrow_ui_small_right_svg__WEBPACK_IMPORTED_MODULE_1___default=__webpack_require__.n(_danskernesdigitalebibliotek_dpl_design_system_build_icons_arrow_ui_icon_arrow_ui_small_right_svg__WEBPACK_IMPORTED_MODULE_1__),_danskernesdigitalebibliotek_dpl_design_system_build_icons_buttons_icon_btn_external_link_svg__WEBPACK_IMPORTED_MODULE_2__=__webpack_require__("./node_modules/@danskernesdigitalebibliotek/dpl-design-system/build/icons/buttons/icon-btn-external-link.svg"),_danskernesdigitalebibliotek_dpl_design_system_build_icons_buttons_icon_btn_external_link_svg__WEBPACK_IMPORTED_MODULE_2___default=__webpack_require__.n(_danskernesdigitalebibliotek_dpl_design_system_build_icons_buttons_icon_btn_external_link_svg__WEBPACK_IMPORTED_MODULE_2__),clsx__WEBPACK_IMPORTED_MODULE_3__=__webpack_require__("./node_modules/clsx/dist/clsx.mjs");const ButtonIcon=({buttonType,collapsible,iconClassNames})=>{const iconClassName=`btn-icon ${(0,clsx__WEBPACK_IMPORTED_MODULE_3__.A)({"btn-collapsible":collapsible},[iconClassNames])}`;return"default"===buttonType?react__WEBPACK_IMPORTED_MODULE_0__.createElement("div",{className:"ml-16"},react__WEBPACK_IMPORTED_MODULE_0__.createElement("img",{className:iconClassName,src:_danskernesdigitalebibliotek_dpl_design_system_build_icons_arrow_ui_icon_arrow_ui_small_right_svg__WEBPACK_IMPORTED_MODULE_1___default(),alt:""})):"external-link"===buttonType?react__WEBPACK_IMPORTED_MODULE_0__.createElement("img",{className:iconClassName,src:_danskernesdigitalebibliotek_dpl_design_system_build_icons_buttons_icon_btn_external_link_svg__WEBPACK_IMPORTED_MODULE_2___default(),alt:""}):null};try{ButtonIcon.displayName="ButtonIcon",ButtonIcon.__docgenInfo={description:"",displayName:"ButtonIcon",props:{buttonType:{defaultValue:null,description:"",name:"buttonType",required:!1,type:{name:"enum",value:[{value:"undefined"},{value:'"search"'},{value:'"none"'},{value:'"default"'},{value:'"external-link"'}]}},collapsible:{defaultValue:null,description:"",name:"collapsible",required:!1,type:{name:"boolean | undefined"}},iconClassNames:{defaultValue:null,description:"",name:"iconClassNames",required:!1,type:{name:"string | undefined"}}}},"undefined"!=typeof STORYBOOK_REACT_CLASSES&&(STORYBOOK_REACT_CLASSES["src/components/Buttons/ButtonIcon.tsx#ButtonIcon"]={docgenInfo:ButtonIcon.__docgenInfo,name:"ButtonIcon",path:"src/components/Buttons/ButtonIcon.tsx#ButtonIcon"})}catch(__react_docgen_typescript_loader_error){}},"./src/components/message/modal-message/ModalMessage.tsx":(__unused_webpack_module,__webpack_exports__,__webpack_require__)=>{"use strict";__webpack_require__.d(__webpack_exports__,{A:()=>modal_message_ModalMessage});var react=__webpack_require__("./node_modules/react/index.js"),focus_trap_react=__webpack_require__("./node_modules/focus-trap-react/dist/focus-trap-react.js"),focus_trap_react_default=__webpack_require__.n(focus_trap_react);try{withFocusTrap.displayName="withFocusTrap",withFocusTrap.__docgenInfo={description:"",displayName:"withFocusTrap",props:{}},"undefined"!=typeof STORYBOOK_REACT_CLASSES&&(STORYBOOK_REACT_CLASSES["src/core/utils/withFocusTrap.tsx#withFocusTrap"]={docgenInfo:withFocusTrap.__docgenInfo,name:"withFocusTrap",path:"src/core/utils/withFocusTrap.tsx#withFocusTrap"})}catch(__react_docgen_typescript_loader_error){}const Message=({children,title,subTitle})=>react.createElement(react.Fragment,null,react.createElement("h2",{"data-cy":"message-title",className:"text-header-h2"},title),react.createElement("div",{className:"color-secondary-gray text-body-medium-regular mt-48"},react.createElement("p",{"data-cy":"message-subtitle"},subTitle)),children&&react.createElement("div",null,children)),modal_message_Message=Message;try{Message.displayName="Message",Message.__docgenInfo={description:"",displayName:"Message",props:{title:{defaultValue:null,description:"",name:"title",required:!0,type:{name:"string"}},subTitle:{defaultValue:null,description:"",name:"subTitle",required:!0,type:{name:"string"}}}},"undefined"!=typeof STORYBOOK_REACT_CLASSES&&(STORYBOOK_REACT_CLASSES["src/components/message/modal-message/Message.tsx#Message"]={docgenInfo:Message.__docgenInfo,name:"Message",path:"src/components/message/modal-message/Message.tsx#Message"})}catch(__react_docgen_typescript_loader_error){}var Button=__webpack_require__("./src/components/Buttons/Button.tsx"),modal=__webpack_require__("./src/core/utils/modal.tsx");const ModalMessage=react.forwardRef((props=>{const{close,closeAll}=(0,modal.X)(),{ctaButton,...messageProps}=props;return react.createElement("div",{className:"modal-cta__container"},react.createElement(modal_message_Message,messageProps),react.createElement("div",{className:"modal-cta__buttons mt-48"},ctaButton&&react.createElement(Button.$,{dataCy:ctaButton.dataCy??"modal-cta-button",classNames:"modal-message__confirm-button",label:ctaButton.text,buttonType:"none",disabled:!1,collapsible:!1,size:"small",variant:"filled",onClick:()=>{ctaButton.callback&&ctaButton.callback(),ctaButton.modalId&&close(ctaButton.modalId),ctaButton.closeAllModals&&closeAll()}})))})),modal_message_ModalMessage=(Component=ModalMessage,({withFocusTrap,...props})=>react.createElement(focus_trap_react_default(),{focusTrapOptions:{allowOutsideClick:!0}},react.createElement(Component,props)));var Component;try{ModalMessage.displayName="ModalMessage",ModalMessage.__docgenInfo={description:"",displayName:"ModalMessage",props:{ctaButton:{defaultValue:null,description:"",name:"ctaButton",required:!1,type:{name:"({ text: string; callback?: (() => void) | undefined; dataCy?: string | undefined; } & (RequiredModalId | RequireCloseAllModals)) | undefined"}},title:{defaultValue:null,description:"",name:"title",required:!0,type:{name:"string"}},subTitle:{defaultValue:null,description:"",name:"subTitle",required:!0,type:{name:"string"}},withFocusTrap:{defaultValue:null,description:"",name:"withFocusTrap",required:!1,type:{name:"boolean | undefined"}}}},"undefined"!=typeof STORYBOOK_REACT_CLASSES&&(STORYBOOK_REACT_CLASSES["src/components/message/modal-message/ModalMessage.tsx#ModalMessage"]={docgenInfo:ModalMessage.__docgenInfo,name:"ModalMessage",path:"src/components/message/modal-message/ModalMessage.tsx#ModalMessage"})}catch(__react_docgen_typescript_loader_error){}},"./src/core/storybook/globalTextArgs.ts":(__unused_webpack_module,__webpack_exports__,__webpack_require__)=>{"use strict";__webpack_require__.d(__webpack_exports__,{A:()=>__WEBPACK_DEFAULT_EXPORT__,U:()=>argTypes});const argTypes={alertErrorCloseText:{description:"Alert error close text",table:{defaultValue:{summary:"close"}},control:{type:"text"}},alertErrorMessageText:{description:"Alert error message text",table:{defaultValue:{summary:"An error occurred"}},control:{type:"text"}},multiselectAllOptionText:{description:"Multiselect - all option",table:{defaultValue:{summary:"All"}},control:{type:"text"}},groupModalGoToMaterialAriaLabelText:{table:{defaultValue:{summary:"Go to @label material details"}},control:{type:"text"}},availabilityAvailableText:{description:"Availability: available text",table:{defaultValue:{summary:"Available"}},control:{type:"text"}},availabilityUnavailableText:{description:"Availability: unavailable text",table:{defaultValue:{summary:"Unavailable"}},control:{type:"text"}},loansNotOverdueText:{table:{defaultValue:{summary:"Longer return time"}},control:{type:"text"}},patronContactInfoBodyText:{table:{defaultValue:{summary:"Patron contact info body text"}},control:{type:"text"}},pauseReservationModalBelowInputsText:{table:{defaultValue:{summary:"Pause reservation modal below inputs text"}},control:{type:"text"}},materialDetailsCloseModalAriaLabelText:{table:{defaultValue:{summary:"Close material details modal"}},control:{type:"text"}},findOnShelfExpandButtonExplanationText:{description:"Find on shelf expand button explanation text",table:{defaultValue:{summary:"This button opens a modal"}},control:{type:"text"}},reservationsStillInQueueForText:{table:{defaultValue:{summary:"Still in queue"}},control:{type:"text"}},materialDetailsModalAriaDescriptionText:{table:{defaultValue:{summary:"This modal shows material details, and makes it possible to renew a material, of that material is renewable"}},control:{type:"text"}},changePickupLocationText:{description:"Change pickup location text",table:{defaultValue:{summary:"Change pickup location"}},control:{type:"text"}},changeInterestPeriodText:{description:"Change interest period text",table:{defaultValue:{summary:"Change interest period"}},control:{type:"text"}},modalReservationFormPickupLabelText:{description:"Modal reservation form pickup branch input label",table:{defaultValue:{summary:"Change pickup location for your reservation."}},control:{type:"text"}},screenReaderModalDescriptionPickupText:{description:"Screen reader modal description for pickup",table:{defaultValue:{summary:"Change pickup location modal"}},control:{type:"text"}},closeModalAriaLabelPickupText:{description:"Close modal aria-label pickup",table:{defaultValue:{summary:"Close pickup location modal"}},control:{type:"text"}},modalReservationFormNoInterestAfterHeaderTitleText:{description:"Modal reservation form no interest after header title",table:{defaultValue:{summary:"Change date of interest"}},control:{type:"text"}},modalReservationFormNoInterestAfterHeaderDescriptionText:{description:"Modal reservation form no interest after header description",table:{defaultValue:{summary:"If you wish to change the amount of time after which you're no longer interested in the material, you can do it here."}},control:{type:"text"}},modalReservationFormNoInterestAfterLabelText:{description:"Modal reservation form no interest after input label",table:{defaultValue:{summary:"Change the amount of time after which you're no longer interested in this material."}},control:{type:"text"}},screenReaderModalDescriptionInterestPeriodText:{description:"Screen reader modal description for interest period",table:{defaultValue:{summary:"Change interest period modal"}},control:{type:"text"}},screenReaderModalDescriptionEmailText:{description:"Screen reader modal description for email",table:{defaultValue:{summary:"Change email modal"}},control:{type:"text"}},screenReaderModalDescriptionSmsText:{description:"Screen reader modal description for sms",table:{defaultValue:{summary:"Change mobile number modal"}},control:{type:"text"}},closeModalAriaLabelInterestPeriodText:{description:"Close modal aria-label interest period ",table:{defaultValue:{summary:"Close interest period modal"}},control:{type:"text"}},closeModalAriaLabelSmsText:{description:"Close modal aria-label sms",table:{defaultValue:{summary:"Close change mobile number modal"}},control:{type:"text"}},closeModalAriaLabelEmailText:{description:"Close modal aria-label email",table:{defaultValue:{summary:"Close change email modal"}},control:{type:"text"}},deleteReservationModalButtonText:{description:"Delete reservation modal delete button text",table:{defaultValue:{summary:"Ok"}},control:{type:"text"}},acceptModalAriaLabelText:{table:{defaultValue:{summary:"accept modal aria label text"}},control:{type:"text"}},pauseReservationModalAriaDescriptionText:{table:{defaultValue:{summary:"This modal makes it possible to pause your physical reservations"}},control:{type:"text"}},addToFavoritesAriaLabelText:{table:{defaultValue:{summary:"Add @title to favorites list"}},control:{type:"text"}},removeFromFavoritesAriaLabelText:{table:{defaultValue:{summary:"Remove @title from favorites list"}},control:{type:"text"}},acceptModalAriaDescriptionText:{table:{defaultValue:{summary:"accept modal aria description text"}},control:{type:"text"}},acceptModalHeaderText:{table:{defaultValue:{summary:"Hov, dit gebyr forhøjes!"}},control:{type:"text"}},acceptModalBodyText:{table:{defaultValue:{summary:"Fornyer du dine lån, forhøjes dit gebyr. Alle materialer ikke kan fornys og lånet splittes derfor op. Ved overskredne lån modtager du et gebyr pr. lån og derfor forhøjes dit samlede gebyr, hvis du vælger at gå videre med at fornye."}},control:{type:"text"}},acceptModalAreYouSureText:{table:{defaultValue:{summary:"Er du sikker på du vil fornye?"}},control:{type:"text"}},acceptModalAcceptButtonText:{table:{defaultValue:{summary:"Ja, forny mulige"}},control:{type:"text"}},acceptModalCancelButtonText:{table:{defaultValue:{summary:"Annuller fornyelse"}},control:{type:"text"}},isLoadingHeartText:{table:{defaultValue:{summary:"Indlæser"}},control:{type:"text"}},reservationPickUpLatestText:{table:{defaultValue:{summary:"Pick up before @date"}},control:{type:"text"}},reservationListReadyText:{table:{defaultValue:{summary:"Ready"}},control:{type:"text"}},reservationListDigitalPickupText:{table:{defaultValue:{summary:"Online access"}},control:{type:"text"}},errorBoundaryAlertBodyButtonAriaText:{table:{defaultValue:{summary:"Close error message"}},control:{type:"text"}},loadingText:{table:{defaultValue:{summary:"Loading..."}},control:{type:"text"}},pincodeSectionDescriptionText:{table:{defaultValue:{summary:"Length of 4 characters"}},control:{type:"text"}}},__WEBPACK_DEFAULT_EXPORT__={alertErrorCloseText:"close",alertErrorMessageText:"An error occurred",multiselectAllOptionText:"All",groupModalGoToMaterialAriaLabelText:"Go to @label material details",availabilityAvailableText:"Available",availabilityUnavailableText:"Unavailable",loansNotOverdueText:"Longer return time",patronContactInfoBodyText:"Patron contact info body text",pauseReservationModalBelowInputsText:"Pause reservation modal below inputs text",materialDetailsCloseModalAriaLabelText:"Close material details modal",findOnShelfExpandButtonExplanationText:"This button opens a modal",reservationsStillInQueueForText:"Still in queue",materialDetailsModalAriaDescriptionText:"This modal shows material details, and makes it possible to renew a material, of that material is renewable",changePickupLocationText:"Change pickup location",changeInterestPeriodText:"Change interest period",modalReservationFormPickupLabelText:"Change pickup location for your reservation.",screenReaderModalDescriptionPickupText:"Change pickup location modal",closeModalAriaLabelPickupText:"Close pickup location modal",modalReservationFormNoInterestAfterHeaderTitleText:"Change date of interest",modalReservationFormNoInterestAfterHeaderDescriptionText:"If you wish to change the amount of time after which you're no longer interested in the material, you can do it here.",modalReservationFormNoInterestAfterLabelText:"Change the amount of time after which you're no longer interested in this material.",screenReaderModalDescriptionInterestPeriodText:"Change interest period modal",screenReaderModalDescriptionEmailText:"Change email modal",screenReaderModalDescriptionSmsText:"Change mobile number modal",closeModalAriaLabelInterestPeriodText:"Close interest period modal",closeModalAriaLabelSmsText:"Close change mobile number modal",closeModalAriaLabelEmailText:"Close change email modal",deleteReservationModalButtonText:"Ok",acceptModalAriaLabelText:"accept modal aria label text",pauseReservationModalAriaDescriptionText:"This modal makes it possible to pause your physical reservations",addToFavoritesAriaLabelText:"Add @title to favorites list",removeFromFavoritesAriaLabelText:"Remove @title from favorites list",acceptModalAriaDescriptionText:"accept modal aria description text",acceptModalHeaderText:"Hov, dit gebyr forhøjes!",acceptModalBodyText:"Fornyer du dine lån, forhøjes dit gebyr. Alle materialer ikke kan fornys og lånet splittes derfor op. Ved overskredne lån modtager du et gebyr pr. lån og derfor forhøjes dit samlede gebyr, hvis du vælger at gå videre med at fornye.",acceptModalAreYouSureText:"Er du sikker på du vil fornye?",acceptModalAcceptButtonText:"Ja, forny mulige",acceptModalCancelButtonText:"Annuller fornyelse",isLoadingHeartText:"Indlæser",reservationPickUpLatestText:"Pick up before @date",reservationListReadyText:"Ready",reservationListDigitalPickupText:"Online access",errorBoundaryAlertBodyButtonAriaText:"Close error message",loadingText:"Loading...",pincodeSectionDescriptionText:"Length of 4 characters"}},"./src/core/utils/modal.tsx":(__unused_webpack_module,__webpack_exports__,__webpack_require__)=>{"use strict";__webpack_require__.d(__webpack_exports__,{A:()=>modal,X:()=>useModalButtonHandler});var react=__webpack_require__("./node_modules/react/index.js"),react_redux=__webpack_require__("./node_modules/react-redux/dist/react-redux.mjs"),CloseLarge=__webpack_require__("./node_modules/@danskernesdigitalebibliotek/dpl-design-system/build/icons/collection/CloseLarge.svg"),CloseLarge_default=__webpack_require__.n(CloseLarge),clsx=__webpack_require__("./node_modules/clsx/dist/clsx.mjs"),focus_trap_react=__webpack_require__("./node_modules/focus-trap-react/dist/focus-trap-react.js"),focus_trap_react_default=__webpack_require__.n(focus_trap_react),modal_slice=__webpack_require__("./src/core/modal.slice.ts"),user=__webpack_require__("./src/core/utils/helpers/user.ts"),url=__webpack_require__("./src/core/utils/helpers/url.ts"),process=__webpack_require__("./node_modules/process/browser.js");const isVitestEnvironment=void 0!==process&&process.env&&process.env.VITEST;function Modal({modalId,closeModalAriaLabelText,children,screenReaderModalDescriptionText,classNames,isSlider,dataCy="modal",eventCallbacks}){const dispatch=(0,react_redux.wA)(),{modalIds}=(0,react_redux.d4)((s=>s.modal));if((0,react.useEffect)((()=>{var _searchParams$get,_searchParams$get2;const searchParams=new URLSearchParams(window.location.search);null!==(_searchParams$get=searchParams.get("modal"))&&void 0!==_searchParams$get&&_searchParams$get.includes(modalId)&&dispatch((0,modal_slice.qf)({modalId})),!searchParams.get("modal")||null!==(_searchParams$get2=searchParams.get("modal"))&&void 0!==_searchParams$get2&&_searchParams$get2.includes(modalId)||(searchParams.delete("modal"),window.history.replaceState({},"",window.location.href.replace(`&modal=${searchParams.get("modal")}`,"")),document.body.style.overflow="")}),[modalId,dispatch]),modalIds&&!modalIds.includes(modalId))return null;const close=()=>{null!=eventCallbacks&&eventCallbacks.close&&eventCallbacks.close(),dispatch((0,modal_slice.Oo)({modalId}))};return react.createElement(focus_trap_react_default(),{focusTrapOptions:{fallbackFocus:isVitestEnvironment?"body":void 0}},react.createElement("div",null,react.createElement("div",{className:"modal-backdrop",style:{zIndex:modalIds.indexOf(modalId)+20},onClick:()=>{close()}}),react.createElement("div",{className:(0,clsx.A)("modal",{"modal-show":modalIds.includes(modalId)},classNames),role:"dialog","aria-labelledby":`modal-${modalId}-description`,"data-cy":dataCy,style:{zIndex:modalIds.indexOf(modalId)+21}},react.createElement("div",{className:"modal__screen-reader-description",id:`modal-${modalId}-description`},screenReaderModalDescriptionText),react.createElement("button",{type:"button",className:"btn-ui modal-btn-close "+(isSlider?"":"modal-btn-close--offset"),style:{zIndex:modalIds.indexOf(modalId)+20},"aria-label":closeModalAriaLabelText,onClick:()=>{close()},"data-cy":`modal-${modalId}-close-button`},react.createElement("img",{src:CloseLarge_default(),alt:"",style:{pointerEvents:"none"}})),children)))}const useModalButtonHandler=()=>{const dispatch=(0,react_redux.wA)();return{open:modalId=>dispatch((0,modal_slice.qf)({modalId})),close:modalId=>dispatch((0,modal_slice.Oo)({modalId})),closeAll:()=>dispatch((0,modal_slice.s7)()),openGuarded:({authUrl,modalId,trackOnlineView})=>{if((0,user.ok)()){const returnUrl=(0,url.gG)({modal:modalId});(0,url.bX)({authUrl,returnUrl,trackingFunction:trackOnlineView})}else trackOnlineView&&trackOnlineView(),dispatch((0,modal_slice.qf)({modalId}))}}},modal=Modal;try{Modal.displayName="Modal",Modal.__docgenInfo={description:"",displayName:"Modal",props:{modalId:{defaultValue:null,description:"",name:"modalId",required:!0,type:{name:"string"}},closeModalAriaLabelText:{defaultValue:null,description:"",name:"closeModalAriaLabelText",required:!0,type:{name:"string"}},screenReaderModalDescriptionText:{defaultValue:null,description:"",name:"screenReaderModalDescriptionText",required:!0,type:{name:"string"}},classNames:{defaultValue:null,description:"",name:"classNames",required:!1,type:{name:"string | undefined"}},dataCy:{defaultValue:{value:"modal"},description:"",name:"dataCy",required:!1,type:{name:"string | undefined"}},isSlider:{defaultValue:null,description:"",name:"isSlider",required:!1,type:{name:"boolean | undefined"}},eventCallbacks:{defaultValue:null,description:"",name:"eventCallbacks",required:!1,type:{name:"{ close?: (() => void) | undefined; } | undefined"}}}},"undefined"!=typeof STORYBOOK_REACT_CLASSES&&(STORYBOOK_REACT_CLASSES["src/core/utils/modal.tsx#Modal"]={docgenInfo:Modal.__docgenInfo,name:"Modal",path:"src/core/utils/modal.tsx#Modal"})}catch(__react_docgen_typescript_loader_error){}},"./node_modules/@danskernesdigitalebibliotek/dpl-design-system/build/icons/arrow-ui/icon-arrow-ui-small-right.svg":module=>{module.exports="data:image/svg+xml,%3csvg width='61' height='9' viewBox='0 0 61 9' fill='none' xmlns='http://www.w3.org/2000/svg'%3e %3cpath class='arrow__body' d='M60 4.5H0' stroke='black'/%3e %3cpath class='arrow__head' d='M60.3537 4.85355C60.5489 4.65829 60.5489 4.34171 60.3537 4.14645L57.1717 0.96447C56.9764 0.769208 56.6598 0.769208 56.4646 0.96447C56.2693 1.15973 56.2693 1.47631 56.4646 1.67157L59.293 4.5L56.4646 7.32843C56.2693 7.52369 56.2693 7.84027 56.4646 8.03553C56.6598 8.2308 56.9764 8.2308 57.1717 8.03553L60.3537 4.85355ZM60.0001 4H57.0001V5H60.0001V4Z' fill='black'/%3e %3c/svg%3e"},"./node_modules/@danskernesdigitalebibliotek/dpl-design-system/build/icons/buttons/icon-btn-external-link.svg":module=>{module.exports="data:image/svg+xml,%3csvg width='24' height='24' viewBox='0 0 24 24' fill='none' xmlns='http://www.w3.org/2000/svg'%3e %3cpath fill-rule='evenodd' clip-rule='evenodd' d='M20 2.25C20.9182 2.25 21.6712 2.95711 21.7442 3.85647L21.75 4V20C21.75 20.9182 21.0429 21.6712 20.1435 21.7442L20 21.75H9C8.08183 21.75 7.32881 21.0429 7.2558 20.1435L7.25 20V16C7.25 15.5858 7.58579 15.25 8 15.25C8.3797 15.25 8.69349 15.5322 8.74315 15.8982L8.75 16V20C8.75 20.1183 8.83223 20.2175 8.94268 20.2434L9 20.25H20C20.1183 20.25 20.2175 20.1678 20.2434 20.0573L20.25 20V4C20.25 3.88165 20.1678 3.78251 20.0573 3.7566L20 3.75H9C8.88165 3.75 8.78251 3.83223 8.7566 3.94268L8.75 4V8C8.75 8.41421 8.41421 8.75 8 8.75C7.6203 8.75 7.30651 8.46785 7.25685 8.10177L7.25 8V4C7.25 3.08183 7.95711 2.32881 8.85647 2.2558L9 2.25H20ZM13.4535 8.57412L13.5303 8.64124L16.3588 11.4697C16.6272 11.7382 16.6496 12.1596 16.4259 12.4535L16.3588 12.5303L13.5303 15.3588C13.2374 15.6517 12.7626 15.6517 12.4697 15.3588C12.2012 15.0903 12.1788 14.6689 12.4025 14.3749L12.4697 14.2981L14.017 12.75H3C2.58579 12.75 2.25 12.4142 2.25 12C2.25 11.6203 2.53215 11.3065 2.89823 11.2568L3 11.25H14.017L12.4697 9.7019C12.2012 9.43342 12.1788 9.01202 12.4025 8.71805L12.4697 8.64124C12.7382 8.37276 13.1596 8.35038 13.4535 8.57412Z' fill='black'/%3e %3c/svg%3e"}}]);