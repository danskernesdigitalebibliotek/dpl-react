(globalThis.webpackChunk_danskernesdigitalebibliotek_dpl_react=globalThis.webpackChunk_danskernesdigitalebibliotek_dpl_react||[]).push([[3221],{"./src/apps/dashboard/dashboard-notification-list/dashboard-notification-list.tsx":(__unused_webpack_module,__webpack_exports__,__webpack_require__)=>{"use strict";__webpack_require__.d(__webpack_exports__,{A:()=>dashboard_notification_list});var react=__webpack_require__("./node_modules/react/index.js"),utils_text=__webpack_require__("./src/core/utils/text.tsx"),dayjs_min=__webpack_require__("./node_modules/dayjs/dayjs.min.js"),dayjs_min_default=__webpack_require__.n(dayjs_min),date_format=__webpack_require__("./src/core/configuration/date-format.json");const yesterday=dayjs_min_default()().subtract(1,"day").format(date_format.n2),soon=dayjs_min_default()().add(7,"days").format(date_format.n2),longer=dayjs_min_default()().add(1,"year").format(date_format.n2);var empty_list=__webpack_require__("./src/components/empty-list/empty-list.tsx"),arrow=__webpack_require__("./src/components/atoms/icons/arrow/arrow.tsx"),status_badge=__webpack_require__("./src/apps/loan-list/materials/utils/status-badge.tsx");const dashboard_notification=({notificationNumber,notificationText,dataCy,notificationColor,notificationClickEvent,showStatusLabel=!1,badge})=>0===notificationNumber?null:react.createElement("button",{type:"button","data-cy":dataCy,onClick:notificationClickEvent,className:"mb-16"},react.createElement("div",{className:"list-dashboard shadow-medium-hover arrow__hover--right-small"},react.createElement("div",{className:`color-secondary-gray number number--${notificationColor}`},notificationNumber),react.createElement("span",{className:"list-dashboard__title text-header-h4 color-secondary-gray"},notificationText),showStatusLabel&&react.createElement(react.Fragment,null,"danger"===notificationColor&&react.createElement(status_badge.A,{dangerText:badge}),"warning"===notificationColor&&react.createElement(status_badge.A,{warningText:badge}),"info"===notificationColor&&react.createElement(status_badge.A,{infoText:badge})),react.createElement("div",{className:"list-dashboard__arrow"},react.createElement(arrow.A,null))));try{dashboardnotification.displayName="dashboardnotification",dashboardnotification.__docgenInfo={description:"",displayName:"dashboardnotification",props:{notificationNumber:{defaultValue:null,description:"",name:"notificationNumber",required:!0,type:{name:"number"}},showStatusLabel:{defaultValue:{value:"false"},description:"",name:"showStatusLabel",required:!1,type:{name:"boolean | undefined"}},notificationText:{defaultValue:null,description:"",name:"notificationText",required:!0,type:{name:"string"}},dataCy:{defaultValue:null,description:"",name:"dataCy",required:!0,type:{name:"string"}},notificationColor:{defaultValue:null,description:"",name:"notificationColor",required:!0,type:{name:"string"}},badge:{defaultValue:null,description:"",name:"badge",required:!1,type:{name:"string | undefined"}},notificationClickEvent:{defaultValue:null,description:"",name:"notificationClickEvent",required:!0,type:{name:"() => void"}},notificationClickEventParam:{defaultValue:null,description:"",name:"notificationClickEventParam",required:!1,type:{name:"string | undefined"}}}},"undefined"!=typeof STORYBOOK_REACT_CLASSES&&(STORYBOOK_REACT_CLASSES["src/apps/dashboard/dashboard-notification/dashboard-notification.tsx#dashboardnotification"]={docgenInfo:dashboardnotification.__docgenInfo,name:"dashboardnotification",path:"src/apps/dashboard/dashboard-notification/dashboard-notification.tsx#dashboardnotification"})}catch(__react_docgen_typescript_loader_error){}const notification_skeleton=()=>react.createElement("div",{className:"list-dashboard ssc mb-16"},react.createElement("div",{className:"ssc-circle"}),react.createElement("div",{className:"ssc-head-line w-40"}));try{notificationskeleton.displayName="notificationskeleton",notificationskeleton.__docgenInfo={description:"",displayName:"notificationskeleton",props:{}},"undefined"!=typeof STORYBOOK_REACT_CLASSES&&(STORYBOOK_REACT_CLASSES["src/apps/dashboard/dashboard-notification/notification-skeleton.tsx#notificationskeleton"]={docgenInfo:notificationskeleton.__docgenInfo,name:"notificationskeleton",path:"src/apps/dashboard/dashboard-notification/notification-skeleton.tsx#notificationskeleton"})}catch(__react_docgen_typescript_loader_error){}const Notifications=({materials,showOnlyNotifications=!1,showStatusLabel=!1,isLoading=!1})=>{const displayedNotifications=showOnlyNotifications?materials.filter((({showNotificationDot})=>showNotificationDot)):materials;return isLoading&&0===displayedNotifications.length?react.createElement(react.Fragment,null,[0,1].map((()=>react.createElement(notification_skeleton,null)))):react.createElement(react.Fragment,null,displayedNotifications.map((({listLength,header:headerNotification,color,notificationClickEvent,badge,dataCy})=>react.createElement(dashboard_notification,{notificationNumber:listLength,notificationText:headerNotification,badge,dataCy,key:headerNotification,notificationColor:color,notificationClickEvent,showStatusLabel}))))},dashboard_notification_list_Notifications=Notifications;try{Notifications.displayName="Notifications",Notifications.__docgenInfo={description:"",displayName:"Notifications",props:{materials:{defaultValue:null,description:"",name:"materials",required:!0,type:{name:"NotificationMaterialsList[]"}},showOnlyNotifications:{defaultValue:{value:"false"},description:"",name:"showOnlyNotifications",required:!1,type:{name:"boolean | undefined"}},showStatusLabel:{defaultValue:{value:"false"},description:"",name:"showStatusLabel",required:!1,type:{name:"boolean | undefined"}},isLoading:{defaultValue:{value:"false"},description:"",name:"isLoading",required:!1,type:{name:"boolean | undefined"}}}},"undefined"!=typeof STORYBOOK_REACT_CLASSES&&(STORYBOOK_REACT_CLASSES["src/apps/dashboard/dashboard-notification-list/Notifications.tsx#Notifications"]={docgenInfo:Notifications.__docgenInfo,name:"Notifications",path:"src/apps/dashboard/dashboard-notification-list/Notifications.tsx#Notifications"})}catch(__react_docgen_typescript_loader_error){}var Link=__webpack_require__("./src/components/atoms/links/Link.tsx");const NotificationColumn=({materials,materialsCount,emptyListText,header,isLoading=!1,linkText,linkUrl})=>react.createElement("div",{className:"status-userprofile__column my-64"},react.createElement("div",{className:"link-filters"},react.createElement("div",{className:"link-filters__tag-wrapper mb-16"},react.createElement("h2",{"data-cy":`dashboard-${header.toLowerCase()}-header`,className:"text-header-h3"},header))),isLoading&&0===materialsCount&&react.createElement(notification_skeleton,null),!isLoading&&0===materialsCount&&react.createElement(empty_list.A,{emptyListText}),0!==materialsCount&&react.createElement(dashboard_notification_list_Notifications,{materials,showStatusLabel:!0}),linkText&&linkUrl&&react.createElement("div",{className:"mt-8"},react.createElement(Link.A,{href:linkUrl,className:"link-tag link-tag link-filters__tag"},linkText),react.createElement("span",{className:"link-filters__counter"},materialsCount))),dashboard_notification_list_NotificationColumn=NotificationColumn;try{NotificationColumn.displayName="NotificationColumn",NotificationColumn.__docgenInfo={description:"",displayName:"NotificationColumn",props:{materials:{defaultValue:null,description:"",name:"materials",required:!0,type:{name:"NotificationMaterialsList[]"}},materialsCount:{defaultValue:null,description:"",name:"materialsCount",required:!0,type:{name:"number"}},header:{defaultValue:null,description:"",name:"header",required:!0,type:{name:"string"}},emptyListText:{defaultValue:null,description:"",name:"emptyListText",required:!0,type:{name:"string"}},isLoading:{defaultValue:{value:"false"},description:"",name:"isLoading",required:!1,type:{name:"boolean | undefined"}},linkText:{defaultValue:null,description:"",name:"linkText",required:!1,type:{name:"string | undefined"}},linkUrl:{defaultValue:null,description:"",name:"linkUrl",required:!1,type:{name:"URL | undefined"}}}},"undefined"!=typeof STORYBOOK_REACT_CLASSES&&(STORYBOOK_REACT_CLASSES["src/apps/dashboard/dashboard-notification-list/NotificationColumn.tsx#NotificationColumn"]={docgenInfo:NotificationColumn.__docgenInfo,name:"NotificationColumn",path:"src/apps/dashboard/dashboard-notification-list/NotificationColumn.tsx#NotificationColumn"})}catch(__react_docgen_typescript_loader_error){}var modal=__webpack_require__("./src/core/utils/modal.tsx"),LoansGroupModal=__webpack_require__("./src/components/GroupModal/LoansGroupModal.tsx"),material_details_modal=__webpack_require__("./src/apps/loan-list/modal/material-details-modal.tsx"),material_details=__webpack_require__("./src/apps/loan-list/modal/material-details.tsx"),SimpleModalHeader=__webpack_require__("./src/components/GroupModal/SimpleModalHeader.tsx"),GroupModalContent=__webpack_require__("./src/components/GroupModal/GroupModalContent.tsx"),Button=__webpack_require__("./src/components/Buttons/Button.tsx"),isEqual=__webpack_require__("./node_modules/lodash/isEqual.js"),isEqual_default=__webpack_require__.n(isEqual),selectable_material=__webpack_require__("./src/apps/loan-list/materials/selectable-material/selectable-material.tsx"),use_pager=__webpack_require__("./src/components/result-pager/use-pager.tsx"),reservation_type=__webpack_require__("./src/core/utils/types/reservation-type.ts"),helpers=__webpack_require__("./src/apps/reservation-list/utils/helpers.ts");const GroupModalReservationsList=({materials,selectedMaterials,selectMaterials,pageSize,header,marginBottonPager,openDetailsModal})=>{const t=(0,utils_text.F)(),[displayedMaterials,setDisplayedMaterials]=(0,react.useState)([]),{itemsShown,PagerComponent,firstInNewPage}=(0,use_pager.A)({hitcount:materials.length,pageSize});(0,react.useEffect)((()=>{setDisplayedMaterials([...materials].splice(0,itemsShown))}),[itemsShown,materials]);const onMaterialChecked=item=>{const selectedMaterialsCopy=[...selectedMaterials],indexOfItemToRemove=selectedMaterials.findIndex((obj=>null!==item.faust?obj.faust===item.faust:void 0!==item.identifier?obj.identifier===item.identifier:-1));indexOfItemToRemove>-1?selectedMaterialsCopy.splice(indexOfItemToRemove,1):selectedMaterialsCopy.push(item),selectMaterials(selectedMaterialsCopy)};return 0===displayedMaterials.length?null:react.createElement(react.Fragment,null,react.createElement("h3",{className:"text-body-medium-regular"},header),react.createElement("ul",{className:"modal-loan__list-materials"},displayedMaterials.map(((material,i)=>{const{expiryDate,faust,identifier,reservationIds}=material,selected=null==selectedMaterials?void 0:selectedMaterials.some((selectedMaterial=>isEqual_default()(selectedMaterial,material))),statusText=(0,helpers.Iw)(material,t),statusBadgeComponent=statusText?react.createElement(status_badge.A,{badgeDate:expiryDate,neutralText:statusText,infoText:""}):null;return(identifier||reservationIds||faust)&&react.createElement(selectable_material.A,{item:material,displayedMaterial:material,focused:i===firstInNewPage,statusBadgeComponent,openDetailsModal,key:(0,reservation_type.OQ)(material),selected,onMaterialChecked,disabled:!1,statusMessageComponentMobile:null,statusMessageComponentDesktop:null})}))),react.createElement(PagerComponent,{classNames:marginBottonPager?"result-pager--margin-bottom":""}))},GroupModal_GroupModalReservationsList=GroupModalReservationsList;try{GroupModalReservationsList.displayName="GroupModalReservationsList",GroupModalReservationsList.__docgenInfo={description:"",displayName:"GroupModalReservationsList",props:{materials:{defaultValue:null,description:"",name:"materials",required:!0,type:{name:"Nullable<Partial<Reservation>>[]"}},pageSize:{defaultValue:null,description:"",name:"pageSize",required:!0,type:{name:"number"}},selectedMaterials:{defaultValue:null,description:"",name:"selectedMaterials",required:!0,type:{name:"Nullable<Partial<Reservation>>[]"}},header:{defaultValue:null,description:"",name:"header",required:!0,type:{name:"string"}},selectMaterials:{defaultValue:null,description:"",name:"selectMaterials",required:!0,type:{name:"(materialIds: Nullable<Partial<ListIdsType & { details: Nullable<Partial<BasicDetails>>; }>>[]) => void"}},marginBottonPager:{defaultValue:null,description:"",name:"marginBottonPager",required:!0,type:{name:"boolean"}},openDetailsModal:{defaultValue:null,description:"",name:"openDetailsModal",required:!0,type:{name:"(reservation: Nullable<Partial<Reservation>>) => void"}}}},"undefined"!=typeof STORYBOOK_REACT_CLASSES&&(STORYBOOK_REACT_CLASSES["src/components/GroupModal/GroupModalReservationsList.tsx#GroupModalReservationsList"]={docgenInfo:GroupModalReservationsList.__docgenInfo,name:"GroupModalReservationsList",path:"src/components/GroupModal/GroupModalReservationsList.tsx#GroupModalReservationsList"})}catch(__react_docgen_typescript_loader_error){}var StatusCircleModalHeader=__webpack_require__("./src/components/GroupModal/StatusCircleModalHeader.tsx"),status_circle=__webpack_require__("./src/apps/loan-list/materials/utils/status-circle.tsx"),useReservations=__webpack_require__("./src/core/utils/useReservations.tsx"),modal_helpers=__webpack_require__("./src/core/utils/helpers/modal-helpers.ts");const modal_ReservationsGroupModal=({pageSize,modalId,setReservationsToDelete,openDetailsModal})=>{const{fbs,publizon}=(0,useReservations.A)(),t=(0,utils_text.F)(),{reservationsReady,reservationsQueued}=(0,modal_helpers.c6)(),[materialsToDelete,setMaterialsToDelete]=(0,react.useState)([]);let physicalReservations=[],digitalReservations=[];modalId===reservationsReady&&(physicalReservations=fbs.readyToLoan,digitalReservations=publizon.readyToLoan),modalId===reservationsQueued&&(physicalReservations=fbs.queued,digitalReservations=publizon.queued),(0,react.useEffect)((()=>{setMaterialsToDelete([])}),[modalId]);const selectableReservations=[...physicalReservations,...digitalReservations],selectMaterials=materials=>{setMaterialsToDelete(materials)};return react.createElement(modal.A,{modalId,closeModalAriaLabelText:t("groupModalReservationsCloseModalAriaLabelText"),screenReaderModalDescriptionText:t("groupModalReservationsLoansAriaDescriptionText")},react.createElement("div",{className:"modal-loan"},react.createElement("div",{className:"modal-loan__list"},modalId===reservationsQueued&&react.createElement(SimpleModalHeader.A,{header:t("queuedReservationsText")}),modalId===reservationsReady&&react.createElement(StatusCircleModalHeader.A,{header:t("reservationsReadyForPickupText"),statusCircleComponent:react.createElement(status_circle.A,{loanDate:""})}),react.createElement(GroupModalContent.A,{buttonComponent:react.createElement(Button.$,{label:t("removeAllReservationsText",{count:materialsToDelete.length,placeholders:{"@amount":materialsToDelete.length}}),buttonType:"none",disabled:!materialsToDelete.length,collapsible:!1,size:"small",variant:"filled",onClick:()=>(setReservationsToDelete(materialsToDelete),void setMaterialsToDelete([])),dataCy:"remove-reservations-button"}),amountOfSelectableMaterials:selectableReservations.length,selectableMaterials:selectableReservations,selectedMaterials:materialsToDelete,selectMaterials},react.createElement(GroupModal_GroupModalReservationsList,{openDetailsModal,header:t("physicalReservationsHeaderText"),materials:physicalReservations,pageSize,selectedMaterials:materialsToDelete,selectMaterials,marginBottonPager:0===digitalReservations.length}),react.createElement(GroupModal_GroupModalReservationsList,{marginBottonPager:!0,openDetailsModal,header:t("digitalReservationsHeaderText"),materials:digitalReservations,pageSize,selectedMaterials:materialsToDelete,selectMaterials})))))};try{ReservationsGroupModal.displayName="ReservationsGroupModal",ReservationsGroupModal.__docgenInfo={description:"",displayName:"ReservationsGroupModal",props:{pageSize:{defaultValue:null,description:"",name:"pageSize",required:!0,type:{name:"number"}},modalId:{defaultValue:null,description:"",name:"modalId",required:!0,type:{name:"string"}},setReservationsToDelete:{defaultValue:null,description:"",name:"setReservationsToDelete",required:!0,type:{name:"(reservations: Nullable<Partial<Reservation>>[]) => void"}},openDetailsModal:{defaultValue:null,description:"",name:"openDetailsModal",required:!0,type:{name:"(reservation: Nullable<Partial<Reservation>>) => void"}}}},"undefined"!=typeof STORYBOOK_REACT_CLASSES&&(STORYBOOK_REACT_CLASSES["src/apps/dashboard/modal/ReservationsGroupModal.tsx#ReservationsGroupModal"]={docgenInfo:ReservationsGroupModal.__docgenInfo,name:"ReservationsGroupModal",path:"src/apps/dashboard/modal/ReservationsGroupModal.tsx#ReservationsGroupModal"})}catch(__react_docgen_typescript_loader_error){}var reservation_details=__webpack_require__("./src/apps/reservation-list/modal/reservation-details/reservation-details.tsx"),delete_reservation_modal=__webpack_require__("./src/apps/reservation-list/modal/delete-reservation/delete-reservation-modal.tsx"),useLoans=__webpack_require__("./src/core/utils/useLoans.tsx"),url=__webpack_require__("./src/core/utils/url.tsx");const dashboard_notification_list=({pageSize,columns})=>{const t=(0,utils_text.F)(),u=(0,url.Ik)(),physicalLoansUrl=u("physicalLoansUrl"),reservationsUrl=u("reservationsUrl"),{all:{reservations,readyToLoan:reservationsReadyToLoan,queued:reservationsQueued,isLoading:isLoadingReservations}}=(0,useReservations.A)(),{all:{loans,soonOverdue,farFromOverdue,isLoading:isLoadingLoans},fbs:{overdue:loansOverduePhysical,soonOverdue:loansSoonOverduePhysical,farFromOverdue:loansFarFromOverduePhysical,isLoading:isLoadingLoansPhysical}}=(0,useLoans.A)(),[reservationsForDeleting,setReservationsForDeleting]=(0,react.useState)([]),[loansToDisplay,setLoansToDisplay]=(0,react.useState)(null),[modalHeader,setModalHeader]=(0,react.useState)(""),{open}=(0,modal.X)(),{dueDateModal,deleteReservations}=(0,modal_helpers.c6)(),[dueDate,setDueDate]=(0,react.useState)(null),[modalLoan,setModalLoan]=(0,react.useState)(null),[reservationForModal,setReservationForModal]=(0,react.useState)(null),[reservationModalId,setReservationModalId]=(0,react.useState)(""),openModalHandler=(0,react.useCallback)((modalId=>{setReservationModalId(modalId),open(modalId)}),[open]),{reservationsReady:reservationsReadyID,reservationsQueued:reservationsQueueID}=(0,modal_helpers.c6)(),openLoanDetailsModal=(0,react.useCallback)((loan=>{setModalLoan(loan),open((0,material_details_modal.B0)(loan))}),[open]),openReservationDetailsModal=(0,react.useCallback)((reservation=>{setReservationForModal(reservation),open((0,material_details_modal.bk)(reservation))}),[open]),openReservationDeleteModal=(0,react.useCallback)((()=>{reservationForModal&&open((0,delete_reservation_modal.g)(reservationForModal))}),[open,reservationForModal]),openDueDateModal=(0,react.useCallback)((dueDateInput=>{switch(setDueDate(dueDateInput),dueDateInput){case yesterday:setLoansToDisplay(loansOverduePhysical),setModalHeader(t("loansOverdueText"));break;case soon:setLoansToDisplay(soonOverdue),setModalHeader(t("loansSoonOverdueText"));break;case longer:setLoansToDisplay(farFromOverdue),setModalHeader(t("loansNotOverdueText"));break;default:throw new Error("Invalid due date input")}open((0,modal_helpers.Q0)(dueDateModal,[dueDateInput]))}),[open,dueDateModal,loansOverduePhysical,t,soonOverdue,farFromOverdue]),dashboardNotificationsLoan=[{listLength:loansOverduePhysical.length,badge:t("materialDetailsOverdueText"),header:t("loansOverdueText"),color:"danger",dataCy:"physical-loans-overdue",showNotificationDot:!0,notificationClickEvent:()=>1===loansOverduePhysical.length?openLoanDetailsModal(loansOverduePhysical[0]):openDueDateModal(yesterday)},{listLength:soonOverdue.length,badge:t("statusBadgeWarningText"),header:t("loansSoonOverdueText"),color:"warning",dataCy:"physical-loans-soon-overdue",showNotificationDot:!0,notificationClickEvent:()=>1===loansSoonOverduePhysical.length?openLoanDetailsModal(loansSoonOverduePhysical[0]):openDueDateModal(soon)},{listLength:farFromOverdue.length,header:t("loansNotOverdueText"),dataCy:"loans-not-overdue",color:"neutral",showNotificationDot:!1,notificationClickEvent:()=>1===loansFarFromOverduePhysical.length?openLoanDetailsModal(loansFarFromOverduePhysical[0]):openDueDateModal(longer)}],dashboardNotificationsReservations=[{listLength:reservationsReadyToLoan.length,header:t("reservationsReadyText"),badge:t("readyForLoanText"),dataCy:"reservations-ready",showNotificationDot:!0,color:"info",notificationClickEvent:()=>1===reservationsReadyToLoan.length?openReservationDetailsModal(reservationsReadyToLoan[0]):openModalHandler(reservationsReadyID)},{listLength:reservationsQueued.length,header:t("reservationsStillInQueueForText"),dataCy:"reservations-queued",color:"neutral",showNotificationDot:!1,notificationClickEvent:()=>1===reservationsQueued.length?openReservationDetailsModal(reservationsQueued[0]):openModalHandler(reservationsQueueID)}];return react.createElement(react.Fragment,null,react.createElement("div",{className:"status-userprofile"},columns&&react.createElement(react.Fragment,null,react.createElement(dashboard_notification_list_NotificationColumn,{materials:dashboardNotificationsLoan,materialsCount:loans.length,header:t("physicalLoansText"),emptyListText:t("noPhysicalLoansText"),isLoading:isLoadingLoans||isLoadingLoansPhysical,linkText:t("dashboardLoansLinkText"),linkUrl:physicalLoansUrl}),react.createElement(dashboard_notification_list_NotificationColumn,{materials:dashboardNotificationsReservations,materialsCount:reservations.length,header:t("reservationsText"),emptyListText:t("noReservationsText"),isLoading:isLoadingReservations,linkText:t("dashboardReservationsLinkText"),linkUrl:reservationsUrl}))),!columns&&react.createElement(dashboard_notification_list_Notifications,{showOnlyNotifications:!0,materials:[...dashboardNotificationsLoan,...dashboardNotificationsReservations],isLoading:isLoadingLoans||isLoadingLoansPhysical||isLoadingReservations}),modalLoan&&react.createElement(material_details_modal.Ay,{modalId:(0,material_details_modal.B0)(modalLoan)},react.createElement(material_details.A,{item:modalLoan,loan:modalLoan,modalId:(0,material_details_modal.B0)(modalLoan)})),dueDate&&loans&&loansToDisplay&&react.createElement(LoansGroupModal.A,{pageSize,openDetailsModal:openLoanDetailsModal,dueDate,loansModal:loansToDisplay},react.createElement(SimpleModalHeader.A,{header:modalHeader})),reservations&&react.createElement(modal_ReservationsGroupModal,{openDetailsModal:openReservationDetailsModal,modalId:reservationModalId,setReservationsToDelete:resForDeleting=>{setReservationsForDeleting(resForDeleting),open(deleteReservations)},pageSize}),reservationForModal&&react.createElement(delete_reservation_modal.A,{modalId:(0,delete_reservation_modal.g)(reservationForModal),reservations:[reservationForModal]}),reservationsForDeleting&&react.createElement(delete_reservation_modal.A,{modalId:`${deleteReservations}`,reservations:reservationsForDeleting}),reservationForModal&&react.createElement(material_details_modal.Ay,{modalId:(0,material_details_modal.bk)(reservationForModal)},react.createElement(reservation_details.A,{openReservationDeleteModal,item:reservationForModal,reservation:reservationForModal})))};try{dashboardnotificationlist.displayName="dashboardnotificationlist",dashboardnotificationlist.__docgenInfo={description:"",displayName:"dashboardnotificationlist",props:{pageSize:{defaultValue:null,description:"",name:"pageSize",required:!0,type:{name:"number"}},columns:{defaultValue:null,description:"",name:"columns",required:!0,type:{name:"boolean"}}}},"undefined"!=typeof STORYBOOK_REACT_CLASSES&&(STORYBOOK_REACT_CLASSES["src/apps/dashboard/dashboard-notification-list/dashboard-notification-list.tsx#dashboardnotificationlist"]={docgenInfo:dashboardnotificationlist.__docgenInfo,name:"dashboardnotificationlist",path:"src/apps/dashboard/dashboard-notification-list/dashboard-notification-list.tsx#dashboardnotificationlist"})}catch(__react_docgen_typescript_loader_error){}},"./src/apps/loan-list/materials/utils/status-circle.tsx":(__unused_webpack_module,__webpack_exports__,__webpack_require__)=>{"use strict";__webpack_require__.d(__webpack_exports__,{A:()=>__WEBPACK_DEFAULT_EXPORT__});var react__WEBPACK_IMPORTED_MODULE_0__=__webpack_require__("./node_modules/react/index.js"),_danskernesdigitalebibliotek_dpl_design_system_build_icons_basic_icon_check_svg__WEBPACK_IMPORTED_MODULE_1__=__webpack_require__("./node_modules/@danskernesdigitalebibliotek/dpl-design-system/build/icons/basic/icon-check.svg"),_danskernesdigitalebibliotek_dpl_design_system_build_icons_basic_icon_check_svg__WEBPACK_IMPORTED_MODULE_1___default=__webpack_require__.n(_danskernesdigitalebibliotek_dpl_design_system_build_icons_basic_icon_check_svg__WEBPACK_IMPORTED_MODULE_1__),_status_circle_icon__WEBPACK_IMPORTED_MODULE_2__=__webpack_require__("./src/apps/loan-list/materials/utils/status-circle-icon.tsx"),_core_utils_helpers_general__WEBPACK_IMPORTED_MODULE_3__=__webpack_require__("./src/core/utils/helpers/general.ts"),_core_utils_text__WEBPACK_IMPORTED_MODULE_4__=__webpack_require__("./src/core/utils/text.tsx"),_core_utils_useLoanThresholds__WEBPACK_IMPORTED_MODULE_5__=__webpack_require__("./src/core/utils/useLoanThresholds.tsx");const __WEBPACK_DEFAULT_EXPORT__=({loanDate,dueDate})=>{const t=(0,_core_utils_text__WEBPACK_IMPORTED_MODULE_4__.F)(),colors=(0,_core_utils_helpers_general__WEBPACK_IMPORTED_MODULE_3__.jM)(),threshold=(0,_core_utils_useLoanThresholds__WEBPACK_IMPORTED_MODULE_5__.A)();let color=colors.default,percent=100,daysBetweenTodayAndDue=null,daysBetweenLoanAndDue=null;return dueDate?(daysBetweenTodayAndDue=(0,_core_utils_helpers_general__WEBPACK_IMPORTED_MODULE_3__.m2)(dueDate),daysBetweenLoanAndDue=(0,_core_utils_helpers_general__WEBPACK_IMPORTED_MODULE_3__.X6)(dueDate,loanDate),percent=100-daysBetweenTodayAndDue/daysBetweenLoanAndDue*100,percent<0&&(percent=100),daysBetweenTodayAndDue<threshold.danger?color=colors.danger:daysBetweenTodayAndDue<=threshold.warning&&(color=colors.warning)):color=colors.success,react__WEBPACK_IMPORTED_MODULE_0__.createElement(_status_circle_icon__WEBPACK_IMPORTED_MODULE_2__.A,{percent,color},null!==daysBetweenTodayAndDue&&null!==daysBetweenTodayAndDue&&react__WEBPACK_IMPORTED_MODULE_0__.createElement(react__WEBPACK_IMPORTED_MODULE_0__.Fragment,null,react__WEBPACK_IMPORTED_MODULE_0__.createElement("span",{className:"counter__value color-secondary-gray"},daysBetweenTodayAndDue>0?daysBetweenTodayAndDue:0," "),react__WEBPACK_IMPORTED_MODULE_0__.createElement("span",{className:"counter__label color-secondary-gray"},t(1===daysBetweenTodayAndDue?"loanListMaterialDayText":"loanListMaterialDaysText"))),null===daysBetweenTodayAndDue&&null===daysBetweenTodayAndDue&&react__WEBPACK_IMPORTED_MODULE_0__.createElement(react__WEBPACK_IMPORTED_MODULE_0__.Fragment,null,react__WEBPACK_IMPORTED_MODULE_0__.createElement("img",{className:"counter__icon",src:_danskernesdigitalebibliotek_dpl_design_system_build_icons_basic_icon_check_svg__WEBPACK_IMPORTED_MODULE_1___default(),alt:""}),react__WEBPACK_IMPORTED_MODULE_0__.createElement("span",{className:"counter__label"},t("readyForLoanCounterLabelText"))))};try{statuscircle.displayName="statuscircle",statuscircle.__docgenInfo={description:"",displayName:"statuscircle",props:{dueDate:{defaultValue:null,description:"",name:"dueDate",required:!1,type:{name:"string | null | undefined"}},loanDate:{defaultValue:null,description:"",name:"loanDate",required:!0,type:{name:"string"}}}},"undefined"!=typeof STORYBOOK_REACT_CLASSES&&(STORYBOOK_REACT_CLASSES["src/apps/loan-list/materials/utils/status-circle.tsx#statuscircle"]={docgenInfo:statuscircle.__docgenInfo,name:"statuscircle",path:"src/apps/loan-list/materials/utils/status-circle.tsx#statuscircle"})}catch(__react_docgen_typescript_loader_error){}},"./src/components/GroupModal/StatusCircleModalHeader.tsx":(__unused_webpack_module,__webpack_exports__,__webpack_require__)=>{"use strict";__webpack_require__.d(__webpack_exports__,{A:()=>__WEBPACK_DEFAULT_EXPORT__});var react__WEBPACK_IMPORTED_MODULE_0__=__webpack_require__("./node_modules/react/index.js"),_apps_loan_list_materials_utils_warning_bar__WEBPACK_IMPORTED_MODULE_1__=__webpack_require__("./src/apps/loan-list/materials/utils/warning-bar.tsx"),_core_utils_helpers_general__WEBPACK_IMPORTED_MODULE_2__=__webpack_require__("./src/core/utils/helpers/general.ts"),_core_utils_url__WEBPACK_IMPORTED_MODULE_3__=__webpack_require__("./src/core/utils/url.tsx"),_core_utils_text__WEBPACK_IMPORTED_MODULE_4__=__webpack_require__("./src/core/utils/text.tsx");const StatusCircleModalHeader=({dueDate,header,subHeader,statusCircleComponent})=>{const t=(0,_core_utils_text__WEBPACK_IMPORTED_MODULE_4__.F)(),feesPageUrl=(0,_core_utils_url__WEBPACK_IMPORTED_MODULE_3__.Ik)()("feesPageUrl");return react__WEBPACK_IMPORTED_MODULE_0__.createElement(react__WEBPACK_IMPORTED_MODULE_0__.Fragment,null,react__WEBPACK_IMPORTED_MODULE_0__.createElement("div",{className:"modal-loan__header"},react__WEBPACK_IMPORTED_MODULE_0__.createElement("div",{className:"mr-32"},statusCircleComponent),react__WEBPACK_IMPORTED_MODULE_0__.createElement("div",null,react__WEBPACK_IMPORTED_MODULE_0__.createElement("h2",{className:"modal-loan__title text-header-h2"},header),subHeader&&react__WEBPACK_IMPORTED_MODULE_0__.createElement("div",{className:"text-body-large"},subHeader))),dueDate&&(0,_core_utils_helpers_general__WEBPACK_IMPORTED_MODULE_2__.El)(dueDate)&&react__WEBPACK_IMPORTED_MODULE_0__.createElement("div",{className:"modal-details__warning"},react__WEBPACK_IMPORTED_MODULE_0__.createElement(_apps_loan_list_materials_utils_warning_bar__WEBPACK_IMPORTED_MODULE_1__.A,{leftLink:feesPageUrl,linkText:t("groupModalDueDateLinkToPageWithFeesText"),overdueText:t("groupModalDueDateWarningLoanOverdueText")})))},__WEBPACK_DEFAULT_EXPORT__=StatusCircleModalHeader;try{StatusCircleModalHeader.displayName="StatusCircleModalHeader",StatusCircleModalHeader.__docgenInfo={description:"",displayName:"StatusCircleModalHeader",props:{dueDate:{defaultValue:null,description:"",name:"dueDate",required:!1,type:{name:"string | null | undefined"}},header:{defaultValue:null,description:"",name:"header",required:!0,type:{name:"string"}},subHeader:{defaultValue:null,description:"",name:"subHeader",required:!1,type:{name:"string | undefined"}},statusCircleComponent:{defaultValue:null,description:"",name:"statusCircleComponent",required:!0,type:{name:"ReactNode"}}}},"undefined"!=typeof STORYBOOK_REACT_CLASSES&&(STORYBOOK_REACT_CLASSES["src/components/GroupModal/StatusCircleModalHeader.tsx#StatusCircleModalHeader"]={docgenInfo:StatusCircleModalHeader.__docgenInfo,name:"StatusCircleModalHeader",path:"src/components/GroupModal/StatusCircleModalHeader.tsx#StatusCircleModalHeader"})}catch(__react_docgen_typescript_loader_error){}},"./src/core/storybook/reservationGroupModalArgs.ts":(__unused_webpack_module,__webpack_exports__,__webpack_require__)=>{"use strict";__webpack_require__.d(__webpack_exports__,{A:()=>__WEBPACK_DEFAULT_EXPORT__,U:()=>argTypes});const argTypes={groupModalReservationsCloseModalAriaLabelText:{table:{defaultValue:{summary:"Close modal with grouped reservations"},type:{summary:"text"}},control:{type:"text"}},groupModalReservationsLoansAriaDescriptionText:{table:{defaultValue:{summary:"This modal makes it possible to delete reservations"},type:{summary:"text"}},control:{type:"text"}},readyForLoanCounterLabelText:{table:{defaultValue:{summary:"Ready"},type:{summary:"text"}},control:{type:"text"}},removeAllReservationsText:{table:{defaultValue:{summary:'{"type":"plural","text":["Remove reservation (@amount)","Remove reservations (@amount)"]}'},type:{summary:"text"}},control:{type:"text"}},pickUpLatestText:{table:{defaultValue:{summary:"Pick up before @date"},type:{summary:"text"}},control:{type:"text"}},reservationsReadyForPickupText:{table:{defaultValue:{summary:"Reservations ready for pickup"},type:{summary:"text"}},control:{type:"text"}},physicalReservationsHeaderText:{table:{defaultValue:{summary:"Physical reservations"},type:{summary:"text"}},control:{type:"text"}},digitalReservationsHeaderText:{table:{defaultValue:{summary:"Digital reservations"},type:{summary:"text"}},control:{type:"text"}}},__WEBPACK_DEFAULT_EXPORT__={groupModalReservationsCloseModalAriaLabelText:"Close modal with grouped reservations",groupModalReservationsLoansAriaDescriptionText:"This modal makes it possible to delete reservations",readyForLoanCounterLabelText:"Ready",removeAllReservationsText:'{"type":"plural","text":["Remove reservation (@amount)","Remove reservations (@amount)"]}',pickUpLatestText:"Pick up before @date",reservationsReadyForPickupText:"Reservations ready for pickup",physicalReservationsHeaderText:"Physical reservations",digitalReservationsHeaderText:"Digital reservations"}},"./node_modules/lodash/isEqual.js":(module,__unused_webpack_exports,__webpack_require__)=>{var baseIsEqual=__webpack_require__("./node_modules/lodash/_baseIsEqual.js");module.exports=function isEqual(value,other){return baseIsEqual(value,other)}},"./src/core/configuration/date-format.json":module=>{"use strict";module.exports=JSON.parse('{"$k":"DD. MM. YYYY","rX":"D. MMMM YYYY","n2":"YYYY-MM-DD"}')}}]);