/*! For license information please see 4708.78eba9df.iframe.bundle.js.LICENSE.txt */
"use strict";(globalThis.webpackChunk_danskernesdigitalebibliotek_dpl_react=globalThis.webpackChunk_danskernesdigitalebibliotek_dpl_react||[]).push([[4708],{"./node_modules/focus-trap-react/dist/focus-trap-react.js":(module,__unused_webpack_exports,__webpack_require__)=>{function _typeof(o){return _typeof="function"==typeof Symbol&&"symbol"==typeof Symbol.iterator?function(o){return typeof o}:function(o){return o&&"function"==typeof Symbol&&o.constructor===Symbol&&o!==Symbol.prototype?"symbol":typeof o},_typeof(o)}function _defineProperties(e,r){for(var t=0;t<r.length;t++){var o=r[t];o.enumerable=o.enumerable||!1,o.configurable=!0,"value"in o&&(o.writable=!0),Object.defineProperty(e,_toPropertyKey(o.key),o)}}function _callSuper(t,o,e){return o=_getPrototypeOf(o),function _possibleConstructorReturn(t,e){if(e&&("object"==_typeof(e)||"function"==typeof e))return e;if(void 0!==e)throw new TypeError("Derived constructors may only return object or undefined");return function _assertThisInitialized(e){if(void 0===e)throw new ReferenceError("this hasn't been initialised - super() hasn't been called");return e}(t)}(t,_isNativeReflectConstruct()?Reflect.construct(o,e||[],_getPrototypeOf(t).constructor):o.apply(t,e))}function _isNativeReflectConstruct(){try{var t=!Boolean.prototype.valueOf.call(Reflect.construct(Boolean,[],(function(){})))}catch(t){}return(_isNativeReflectConstruct=function _isNativeReflectConstruct(){return!!t})()}function _getPrototypeOf(t){return _getPrototypeOf=Object.setPrototypeOf?Object.getPrototypeOf.bind():function(t){return t.__proto__||Object.getPrototypeOf(t)},_getPrototypeOf(t)}function _setPrototypeOf(t,e){return _setPrototypeOf=Object.setPrototypeOf?Object.setPrototypeOf.bind():function(t,e){return t.__proto__=e,t},_setPrototypeOf(t,e)}function _toPropertyKey(t){var i=function _toPrimitive(t,r){if("object"!=_typeof(t)||!t)return t;var e=t[Symbol.toPrimitive];if(void 0!==e){var i=e.call(t,r||"default");if("object"!=_typeof(i))return i;throw new TypeError("@@toPrimitive must return a primitive value.")}return("string"===r?String:Number)(t)}(t,"string");return"symbol"==_typeof(i)?i:i+""}var React=__webpack_require__("./node_modules/react/index.js"),createFocusTrap=__webpack_require__("./node_modules/focus-trap/dist/focus-trap.esm.js").createFocusTrap,isFocusable=__webpack_require__("./node_modules/tabbable/dist/index.esm.js").isFocusable,FocusTrap=function(_React$Component){function FocusTrap(props){var _this;!function _classCallCheck(a,n){if(!(a instanceof n))throw new TypeError("Cannot call a class as a function")}(this,FocusTrap),function _defineProperty(e,r,t){return(r=_toPropertyKey(r))in e?Object.defineProperty(e,r,{value:t,enumerable:!0,configurable:!0,writable:!0}):e[r]=t,e}(_this=_callSuper(this,FocusTrap,[props]),"getNodeForOption",(function(optionName){var _this$internalOptions,optionValue=null!==(_this$internalOptions=this.internalOptions[optionName])&&void 0!==_this$internalOptions?_this$internalOptions:this.originalOptions[optionName];if("function"==typeof optionValue){for(var _len=arguments.length,params=new Array(_len>1?_len-1:0),_key=1;_key<_len;_key++)params[_key-1]=arguments[_key];optionValue=optionValue.apply(void 0,params)}if(!0===optionValue&&(optionValue=void 0),!optionValue){if(void 0===optionValue||!1===optionValue)return optionValue;throw new Error("`".concat(optionName,"` was specified but was not a node, or did not return a node"))}var _this$getDocument,node=optionValue;if("string"==typeof optionValue&&!(node=null===(_this$getDocument=this.getDocument())||void 0===_this$getDocument?void 0:_this$getDocument.querySelector(optionValue)))throw new Error("`".concat(optionName,"` as selector refers to no known node"));return node})),_this.handleDeactivate=_this.handleDeactivate.bind(_this),_this.handlePostDeactivate=_this.handlePostDeactivate.bind(_this),_this.handleClickOutsideDeactivates=_this.handleClickOutsideDeactivates.bind(_this),_this.internalOptions={returnFocusOnDeactivate:!1,checkCanReturnFocus:null,onDeactivate:_this.handleDeactivate,onPostDeactivate:_this.handlePostDeactivate,clickOutsideDeactivates:_this.handleClickOutsideDeactivates},_this.originalOptions={returnFocusOnDeactivate:!0,onDeactivate:null,onPostDeactivate:null,checkCanReturnFocus:null,clickOutsideDeactivates:!1};var focusTrapOptions=props.focusTrapOptions;for(var optionName in focusTrapOptions)Object.prototype.hasOwnProperty.call(focusTrapOptions,optionName)&&("returnFocusOnDeactivate"!==optionName&&"onDeactivate"!==optionName&&"onPostDeactivate"!==optionName&&"checkCanReturnFocus"!==optionName&&"clickOutsideDeactivates"!==optionName?_this.internalOptions[optionName]=focusTrapOptions[optionName]:_this.originalOptions[optionName]=focusTrapOptions[optionName]);return _this.outsideClick=null,_this.focusTrapElements=props.containerElements||[],_this.updatePreviousElement(),_this}return function _inherits(t,e){if("function"!=typeof e&&null!==e)throw new TypeError("Super expression must either be null or a function");t.prototype=Object.create(e&&e.prototype,{constructor:{value:t,writable:!0,configurable:!0}}),Object.defineProperty(t,"prototype",{writable:!1}),e&&_setPrototypeOf(t,e)}(FocusTrap,_React$Component),function _createClass(e,r,t){return r&&_defineProperties(e.prototype,r),t&&_defineProperties(e,t),Object.defineProperty(e,"prototype",{writable:!1}),e}(FocusTrap,[{key:"getDocument",value:function getDocument(){return this.props.focusTrapOptions.document||("undefined"!=typeof document?document:void 0)}},{key:"getReturnFocusNode",value:function getReturnFocusNode(){var node=this.getNodeForOption("setReturnFocus",this.previouslyFocusedElement);return node||!1!==node&&this.previouslyFocusedElement}},{key:"updatePreviousElement",value:function updatePreviousElement(){var currentDocument=this.getDocument();currentDocument&&(this.previouslyFocusedElement=currentDocument.activeElement)}},{key:"deactivateTrap",value:function deactivateTrap(){this.focusTrap&&this.focusTrap.active&&this.focusTrap.deactivate({returnFocus:!1,checkCanReturnFocus:null,onDeactivate:this.originalOptions.onDeactivate})}},{key:"handleClickOutsideDeactivates",value:function handleClickOutsideDeactivates(event){var allowDeactivation="function"==typeof this.originalOptions.clickOutsideDeactivates?this.originalOptions.clickOutsideDeactivates.call(null,event):this.originalOptions.clickOutsideDeactivates;return allowDeactivation&&(this.outsideClick={target:event.target,allowDeactivation}),allowDeactivation}},{key:"handleDeactivate",value:function handleDeactivate(){this.originalOptions.onDeactivate&&this.originalOptions.onDeactivate.call(null),this.deactivateTrap()}},{key:"handlePostDeactivate",value:function handlePostDeactivate(){var _this2=this,finishDeactivation=function finishDeactivation(){var returnFocusNode=_this2.getReturnFocusNode(),canReturnFocus=!(!_this2.originalOptions.returnFocusOnDeactivate||null==returnFocusNode||!returnFocusNode.focus||_this2.outsideClick&&(!_this2.outsideClick.allowDeactivation||isFocusable(_this2.outsideClick.target,_this2.internalOptions.tabbableOptions))),_this2$internalOption=_this2.internalOptions.preventScroll,preventScroll=void 0!==_this2$internalOption&&_this2$internalOption;canReturnFocus&&returnFocusNode.focus({preventScroll}),_this2.originalOptions.onPostDeactivate&&_this2.originalOptions.onPostDeactivate.call(null),_this2.outsideClick=null};this.originalOptions.checkCanReturnFocus?this.originalOptions.checkCanReturnFocus.call(null,this.getReturnFocusNode()).then(finishDeactivation,finishDeactivation):finishDeactivation()}},{key:"setupFocusTrap",value:function setupFocusTrap(){this.focusTrap?this.props.active&&!this.focusTrap.active&&(this.focusTrap.activate(),this.props.paused&&this.focusTrap.pause()):this.focusTrapElements.some(Boolean)&&(this.focusTrap=this.props._createFocusTrap(this.focusTrapElements,this.internalOptions),this.props.active&&this.focusTrap.activate(),this.props.paused&&this.focusTrap.pause())}},{key:"componentDidMount",value:function componentDidMount(){this.props.active&&this.setupFocusTrap()}},{key:"componentDidUpdate",value:function componentDidUpdate(prevProps){if(this.focusTrap){prevProps.containerElements!==this.props.containerElements&&this.focusTrap.updateContainerElements(this.props.containerElements);var hasActivated=!prevProps.active&&this.props.active,hasDeactivated=prevProps.active&&!this.props.active,hasPaused=!prevProps.paused&&this.props.paused,hasUnpaused=prevProps.paused&&!this.props.paused;if(hasActivated&&(this.updatePreviousElement(),this.focusTrap.activate()),hasDeactivated)return void this.deactivateTrap();hasPaused&&this.focusTrap.pause(),hasUnpaused&&this.focusTrap.unpause()}else prevProps.containerElements!==this.props.containerElements&&(this.focusTrapElements=this.props.containerElements),this.props.active&&(this.updatePreviousElement(),this.setupFocusTrap())}},{key:"componentWillUnmount",value:function componentWillUnmount(){this.deactivateTrap()}},{key:"render",value:function render(){var _this3=this,child=this.props.children?React.Children.only(this.props.children):void 0;if(child){if(child.type&&child.type===React.Fragment)throw new Error("A focus-trap cannot use a Fragment as its child container. Try replacing it with a <div> element.");return React.cloneElement(child,{ref:function callbackRef(element){var containerElements=_this3.props.containerElements;child&&("function"==typeof child.ref?child.ref(element):child.ref&&(child.ref.current=element)),_this3.focusTrapElements=containerElements||[element]}})}return null}}])}(React.Component);FocusTrap.defaultProps={active:!0,paused:!1,focusTrapOptions:{},_createFocusTrap:createFocusTrap},module.exports=FocusTrap,module.exports.FocusTrap=FocusTrap},"./node_modules/focus-trap/dist/focus-trap.esm.js":(__unused_webpack_module,__webpack_exports__,__webpack_require__)=>{__webpack_require__.r(__webpack_exports__),__webpack_require__.d(__webpack_exports__,{createFocusTrap:()=>createFocusTrap});var tabbable__WEBPACK_IMPORTED_MODULE_0__=__webpack_require__("./node_modules/tabbable/dist/index.esm.js");function _arrayLikeToArray(r,a){(null==a||a>r.length)&&(a=r.length);for(var e=0,n=Array(a);e<a;e++)n[e]=r[e];return n}function _defineProperty(e,r,t){return(r=function _toPropertyKey(t){var i=function _toPrimitive(t,r){if("object"!=typeof t||!t)return t;var e=t[Symbol.toPrimitive];if(void 0!==e){var i=e.call(t,r||"default");if("object"!=typeof i)return i;throw new TypeError("@@toPrimitive must return a primitive value.")}return("string"===r?String:Number)(t)}(t,"string");return"symbol"==typeof i?i:i+""}(r))in e?Object.defineProperty(e,r,{value:t,enumerable:!0,configurable:!0,writable:!0}):e[r]=t,e}function ownKeys(e,r){var t=Object.keys(e);if(Object.getOwnPropertySymbols){var o=Object.getOwnPropertySymbols(e);r&&(o=o.filter((function(r){return Object.getOwnPropertyDescriptor(e,r).enumerable}))),t.push.apply(t,o)}return t}function _objectSpread2(e){for(var r=1;r<arguments.length;r++){var t=null!=arguments[r]?arguments[r]:{};r%2?ownKeys(Object(t),!0).forEach((function(r){_defineProperty(e,r,t[r])})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(t)):ownKeys(Object(t)).forEach((function(r){Object.defineProperty(e,r,Object.getOwnPropertyDescriptor(t,r))}))}return e}function _toConsumableArray(r){return function _arrayWithoutHoles(r){if(Array.isArray(r))return _arrayLikeToArray(r)}(r)||function _iterableToArray(r){if("undefined"!=typeof Symbol&&null!=r[Symbol.iterator]||null!=r["@@iterator"])return Array.from(r)}(r)||function _unsupportedIterableToArray(r,a){if(r){if("string"==typeof r)return _arrayLikeToArray(r,a);var t={}.toString.call(r).slice(8,-1);return"Object"===t&&r.constructor&&(t=r.constructor.name),"Map"===t||"Set"===t?Array.from(r):"Arguments"===t||/^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(t)?_arrayLikeToArray(r,a):void 0}}(r)||function _nonIterableSpread(){throw new TypeError("Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.")}()}var activeFocusTraps_activateTrap=function activateTrap(trapStack,trap){if(trapStack.length>0){var activeTrap=trapStack[trapStack.length-1];activeTrap!==trap&&activeTrap.pause()}var trapIndex=trapStack.indexOf(trap);-1===trapIndex||trapStack.splice(trapIndex,1),trapStack.push(trap)},activeFocusTraps_deactivateTrap=function deactivateTrap(trapStack,trap){var trapIndex=trapStack.indexOf(trap);-1!==trapIndex&&trapStack.splice(trapIndex,1),trapStack.length>0&&trapStack[trapStack.length-1].unpause()},isTabEvent=function isTabEvent(e){return"Tab"===(null==e?void 0:e.key)||9===(null==e?void 0:e.keyCode)},isKeyForward=function isKeyForward(e){return isTabEvent(e)&&!e.shiftKey},isKeyBackward=function isKeyBackward(e){return isTabEvent(e)&&e.shiftKey},delay=function delay(fn){return setTimeout(fn,0)},valueOrHandler=function valueOrHandler(value){for(var _len=arguments.length,params=new Array(_len>1?_len-1:0),_key=1;_key<_len;_key++)params[_key-1]=arguments[_key];return"function"==typeof value?value.apply(void 0,params):value},getActualTarget=function getActualTarget(event){return event.target.shadowRoot&&"function"==typeof event.composedPath?event.composedPath()[0]:event.target},internalTrapStack=[],createFocusTrap=function createFocusTrap(elements,userOptions){var trap,doc=(null==userOptions?void 0:userOptions.document)||document,trapStack=(null==userOptions?void 0:userOptions.trapStack)||internalTrapStack,config=_objectSpread2({returnFocusOnDeactivate:!0,escapeDeactivates:!0,delayInitialFocus:!0,isKeyForward,isKeyBackward},userOptions),state={containers:[],containerGroups:[],tabbableGroups:[],nodeFocusedBeforeActivation:null,mostRecentlyFocusedNode:null,active:!1,paused:!1,delayInitialFocusTimer:void 0,recentNavEvent:void 0},getOption=function getOption(configOverrideOptions,optionName,configOptionName){return configOverrideOptions&&void 0!==configOverrideOptions[optionName]?configOverrideOptions[optionName]:config[configOptionName||optionName]},findContainerIndex=function findContainerIndex(element,event){var composedPath="function"==typeof(null==event?void 0:event.composedPath)?event.composedPath():void 0;return state.containerGroups.findIndex((function(_ref){var container=_ref.container,tabbableNodes=_ref.tabbableNodes;return container.contains(element)||(null==composedPath?void 0:composedPath.includes(container))||tabbableNodes.find((function(node){return node===element}))}))},getNodeForOption=function getNodeForOption(optionName){var _ref2=arguments.length>1&&void 0!==arguments[1]?arguments[1]:{},_ref2$hasFallback=_ref2.hasFallback,hasFallback=void 0!==_ref2$hasFallback&&_ref2$hasFallback,_ref2$params=_ref2.params,params=void 0===_ref2$params?[]:_ref2$params,optionValue=config[optionName];if("function"==typeof optionValue&&(optionValue=optionValue.apply(void 0,_toConsumableArray(params))),!0===optionValue&&(optionValue=void 0),!optionValue){if(void 0===optionValue||!1===optionValue)return optionValue;throw new Error("`".concat(optionName,"` was specified but was not a node, or did not return a node"))}var node=optionValue;if("string"==typeof optionValue){try{node=doc.querySelector(optionValue)}catch(err){throw new Error("`".concat(optionName,'` appears to be an invalid selector; error="').concat(err.message,'"'))}if(!node&&!hasFallback)throw new Error("`".concat(optionName,"` as selector refers to no known node"))}return node},getInitialFocusNode=function getInitialFocusNode(){var node=getNodeForOption("initialFocus",{hasFallback:!0});if(!1===node)return!1;if(void 0===node||node&&!(0,tabbable__WEBPACK_IMPORTED_MODULE_0__.isFocusable)(node,config.tabbableOptions))if(findContainerIndex(doc.activeElement)>=0)node=doc.activeElement;else{var firstTabbableGroup=state.tabbableGroups[0];node=firstTabbableGroup&&firstTabbableGroup.firstTabbableNode||getNodeForOption("fallbackFocus")}else null===node&&(node=getNodeForOption("fallbackFocus"));if(!node)throw new Error("Your focus-trap needs to have at least one focusable element");return node},updateTabbableNodes=function updateTabbableNodes(){if(state.containerGroups=state.containers.map((function(container){var tabbableNodes=(0,tabbable__WEBPACK_IMPORTED_MODULE_0__.tabbable)(container,config.tabbableOptions),focusableNodes=(0,tabbable__WEBPACK_IMPORTED_MODULE_0__.focusable)(container,config.tabbableOptions),firstTabbableNode=tabbableNodes.length>0?tabbableNodes[0]:void 0,lastTabbableNode=tabbableNodes.length>0?tabbableNodes[tabbableNodes.length-1]:void 0,firstDomTabbableNode=focusableNodes.find((function(node){return(0,tabbable__WEBPACK_IMPORTED_MODULE_0__.isTabbable)(node)})),lastDomTabbableNode=focusableNodes.slice().reverse().find((function(node){return(0,tabbable__WEBPACK_IMPORTED_MODULE_0__.isTabbable)(node)})),posTabIndexesFound=!!tabbableNodes.find((function(node){return(0,tabbable__WEBPACK_IMPORTED_MODULE_0__.getTabIndex)(node)>0}));return{container,tabbableNodes,focusableNodes,posTabIndexesFound,firstTabbableNode,lastTabbableNode,firstDomTabbableNode,lastDomTabbableNode,nextTabbableNode:function nextTabbableNode(node){var forward=!(arguments.length>1&&void 0!==arguments[1])||arguments[1],nodeIdx=tabbableNodes.indexOf(node);return nodeIdx<0?forward?focusableNodes.slice(focusableNodes.indexOf(node)+1).find((function(el){return(0,tabbable__WEBPACK_IMPORTED_MODULE_0__.isTabbable)(el)})):focusableNodes.slice(0,focusableNodes.indexOf(node)).reverse().find((function(el){return(0,tabbable__WEBPACK_IMPORTED_MODULE_0__.isTabbable)(el)})):tabbableNodes[nodeIdx+(forward?1:-1)]}}})),state.tabbableGroups=state.containerGroups.filter((function(group){return group.tabbableNodes.length>0})),state.tabbableGroups.length<=0&&!getNodeForOption("fallbackFocus"))throw new Error("Your focus-trap must have at least one container with at least one tabbable node in it at all times");if(state.containerGroups.find((function(g){return g.posTabIndexesFound}))&&state.containerGroups.length>1)throw new Error("At least one node with a positive tabindex was found in one of your focus-trap's multiple containers. Positive tabindexes are only supported in single-container focus-traps.")},_getActiveElement=function getActiveElement(el){var activeElement=el.activeElement;if(activeElement)return activeElement.shadowRoot&&null!==activeElement.shadowRoot.activeElement?_getActiveElement(activeElement.shadowRoot):activeElement},_tryFocus=function tryFocus(node){!1!==node&&node!==_getActiveElement(document)&&(node&&node.focus?(node.focus({preventScroll:!!config.preventScroll}),state.mostRecentlyFocusedNode=node,function isSelectableInput(node){return node.tagName&&"input"===node.tagName.toLowerCase()&&"function"==typeof node.select}(node)&&node.select()):_tryFocus(getInitialFocusNode()))},getReturnFocusNode=function getReturnFocusNode(previousActiveElement){var node=getNodeForOption("setReturnFocus",{params:[previousActiveElement]});return node||!1!==node&&previousActiveElement},findNextNavNode=function findNextNavNode(_ref3){var target=_ref3.target,event=_ref3.event,_ref3$isBackward=_ref3.isBackward,isBackward=void 0!==_ref3$isBackward&&_ref3$isBackward;target=target||getActualTarget(event),updateTabbableNodes();var destinationNode=null;if(state.tabbableGroups.length>0){var containerIndex=findContainerIndex(target,event),containerGroup=containerIndex>=0?state.containerGroups[containerIndex]:void 0;if(containerIndex<0)destinationNode=isBackward?state.tabbableGroups[state.tabbableGroups.length-1].lastTabbableNode:state.tabbableGroups[0].firstTabbableNode;else if(isBackward){var startOfGroupIndex=state.tabbableGroups.findIndex((function(_ref4){var firstTabbableNode=_ref4.firstTabbableNode;return target===firstTabbableNode}));if(startOfGroupIndex<0&&(containerGroup.container===target||(0,tabbable__WEBPACK_IMPORTED_MODULE_0__.isFocusable)(target,config.tabbableOptions)&&!(0,tabbable__WEBPACK_IMPORTED_MODULE_0__.isTabbable)(target,config.tabbableOptions)&&!containerGroup.nextTabbableNode(target,!1))&&(startOfGroupIndex=containerIndex),startOfGroupIndex>=0){var destinationGroupIndex=0===startOfGroupIndex?state.tabbableGroups.length-1:startOfGroupIndex-1,destinationGroup=state.tabbableGroups[destinationGroupIndex];destinationNode=(0,tabbable__WEBPACK_IMPORTED_MODULE_0__.getTabIndex)(target)>=0?destinationGroup.lastTabbableNode:destinationGroup.lastDomTabbableNode}else isTabEvent(event)||(destinationNode=containerGroup.nextTabbableNode(target,!1))}else{var lastOfGroupIndex=state.tabbableGroups.findIndex((function(_ref5){var lastTabbableNode=_ref5.lastTabbableNode;return target===lastTabbableNode}));if(lastOfGroupIndex<0&&(containerGroup.container===target||(0,tabbable__WEBPACK_IMPORTED_MODULE_0__.isFocusable)(target,config.tabbableOptions)&&!(0,tabbable__WEBPACK_IMPORTED_MODULE_0__.isTabbable)(target,config.tabbableOptions)&&!containerGroup.nextTabbableNode(target))&&(lastOfGroupIndex=containerIndex),lastOfGroupIndex>=0){var _destinationGroupIndex=lastOfGroupIndex===state.tabbableGroups.length-1?0:lastOfGroupIndex+1,_destinationGroup=state.tabbableGroups[_destinationGroupIndex];destinationNode=(0,tabbable__WEBPACK_IMPORTED_MODULE_0__.getTabIndex)(target)>=0?_destinationGroup.firstTabbableNode:_destinationGroup.firstDomTabbableNode}else isTabEvent(event)||(destinationNode=containerGroup.nextTabbableNode(target))}}else destinationNode=getNodeForOption("fallbackFocus");return destinationNode},checkPointerDown=function checkPointerDown(e){var target=getActualTarget(e);findContainerIndex(target,e)>=0||(valueOrHandler(config.clickOutsideDeactivates,e)?trap.deactivate({returnFocus:config.returnFocusOnDeactivate}):valueOrHandler(config.allowOutsideClick,e)||e.preventDefault())},checkFocusIn=function checkFocusIn(event){var target=getActualTarget(event),targetContained=findContainerIndex(target,event)>=0;if(targetContained||target instanceof Document)targetContained&&(state.mostRecentlyFocusedNode=target);else{var nextNode;event.stopImmediatePropagation();var navAcrossContainers=!0;if(state.mostRecentlyFocusedNode)if((0,tabbable__WEBPACK_IMPORTED_MODULE_0__.getTabIndex)(state.mostRecentlyFocusedNode)>0){var mruContainerIdx=findContainerIndex(state.mostRecentlyFocusedNode),tabbableNodes=state.containerGroups[mruContainerIdx].tabbableNodes;if(tabbableNodes.length>0){var mruTabIdx=tabbableNodes.findIndex((function(node){return node===state.mostRecentlyFocusedNode}));mruTabIdx>=0&&(config.isKeyForward(state.recentNavEvent)?mruTabIdx+1<tabbableNodes.length&&(nextNode=tabbableNodes[mruTabIdx+1],navAcrossContainers=!1):mruTabIdx-1>=0&&(nextNode=tabbableNodes[mruTabIdx-1],navAcrossContainers=!1))}}else state.containerGroups.some((function(g){return g.tabbableNodes.some((function(n){return(0,tabbable__WEBPACK_IMPORTED_MODULE_0__.getTabIndex)(n)>0}))}))||(navAcrossContainers=!1);else navAcrossContainers=!1;navAcrossContainers&&(nextNode=findNextNavNode({target:state.mostRecentlyFocusedNode,isBackward:config.isKeyBackward(state.recentNavEvent)})),_tryFocus(nextNode||(state.mostRecentlyFocusedNode||getInitialFocusNode()))}state.recentNavEvent=void 0},checkTabKey=function checkTabKey(event){(config.isKeyForward(event)||config.isKeyBackward(event))&&function checkKeyNav(event){var isBackward=arguments.length>1&&void 0!==arguments[1]&&arguments[1];state.recentNavEvent=event;var destinationNode=findNextNavNode({event,isBackward});destinationNode&&(isTabEvent(event)&&event.preventDefault(),_tryFocus(destinationNode))}(event,config.isKeyBackward(event))},checkEscapeKey=function checkEscapeKey(event){(function isEscapeEvent(e){return"Escape"===(null==e?void 0:e.key)||"Esc"===(null==e?void 0:e.key)||27===(null==e?void 0:e.keyCode)})(event)&&!1!==valueOrHandler(config.escapeDeactivates,event)&&(event.preventDefault(),trap.deactivate())},checkClick=function checkClick(e){var target=getActualTarget(e);findContainerIndex(target,e)>=0||valueOrHandler(config.clickOutsideDeactivates,e)||valueOrHandler(config.allowOutsideClick,e)||(e.preventDefault(),e.stopImmediatePropagation())},addListeners=function addListeners(){if(state.active)return activeFocusTraps_activateTrap(trapStack,trap),state.delayInitialFocusTimer=config.delayInitialFocus?delay((function(){_tryFocus(getInitialFocusNode())})):_tryFocus(getInitialFocusNode()),doc.addEventListener("focusin",checkFocusIn,!0),doc.addEventListener("mousedown",checkPointerDown,{capture:!0,passive:!1}),doc.addEventListener("touchstart",checkPointerDown,{capture:!0,passive:!1}),doc.addEventListener("click",checkClick,{capture:!0,passive:!1}),doc.addEventListener("keydown",checkTabKey,{capture:!0,passive:!1}),doc.addEventListener("keydown",checkEscapeKey),trap},removeListeners=function removeListeners(){if(state.active)return doc.removeEventListener("focusin",checkFocusIn,!0),doc.removeEventListener("mousedown",checkPointerDown,!0),doc.removeEventListener("touchstart",checkPointerDown,!0),doc.removeEventListener("click",checkClick,!0),doc.removeEventListener("keydown",checkTabKey,!0),doc.removeEventListener("keydown",checkEscapeKey),trap},mutationObserver="undefined"!=typeof window&&"MutationObserver"in window?new MutationObserver((function checkDomRemoval(mutations){mutations.some((function(mutation){return Array.from(mutation.removedNodes).some((function(node){return node===state.mostRecentlyFocusedNode}))}))&&_tryFocus(getInitialFocusNode())})):void 0,updateObservedNodes=function updateObservedNodes(){mutationObserver&&(mutationObserver.disconnect(),state.active&&!state.paused&&state.containers.map((function(container){mutationObserver.observe(container,{subtree:!0,childList:!0})})))};return(trap={get active(){return state.active},get paused(){return state.paused},activate:function activate(activateOptions){if(state.active)return this;var onActivate=getOption(activateOptions,"onActivate"),onPostActivate=getOption(activateOptions,"onPostActivate"),checkCanFocusTrap=getOption(activateOptions,"checkCanFocusTrap");checkCanFocusTrap||updateTabbableNodes(),state.active=!0,state.paused=!1,state.nodeFocusedBeforeActivation=doc.activeElement,null==onActivate||onActivate();var finishActivation=function finishActivation(){checkCanFocusTrap&&updateTabbableNodes(),addListeners(),updateObservedNodes(),null==onPostActivate||onPostActivate()};return checkCanFocusTrap?(checkCanFocusTrap(state.containers.concat()).then(finishActivation,finishActivation),this):(finishActivation(),this)},deactivate:function deactivate(deactivateOptions){if(!state.active)return this;var options=_objectSpread2({onDeactivate:config.onDeactivate,onPostDeactivate:config.onPostDeactivate,checkCanReturnFocus:config.checkCanReturnFocus},deactivateOptions);clearTimeout(state.delayInitialFocusTimer),state.delayInitialFocusTimer=void 0,removeListeners(),state.active=!1,state.paused=!1,updateObservedNodes(),activeFocusTraps_deactivateTrap(trapStack,trap);var onDeactivate=getOption(options,"onDeactivate"),onPostDeactivate=getOption(options,"onPostDeactivate"),checkCanReturnFocus=getOption(options,"checkCanReturnFocus"),returnFocus=getOption(options,"returnFocus","returnFocusOnDeactivate");null==onDeactivate||onDeactivate();var finishDeactivation=function finishDeactivation(){delay((function(){returnFocus&&_tryFocus(getReturnFocusNode(state.nodeFocusedBeforeActivation)),null==onPostDeactivate||onPostDeactivate()}))};return returnFocus&&checkCanReturnFocus?(checkCanReturnFocus(getReturnFocusNode(state.nodeFocusedBeforeActivation)).then(finishDeactivation,finishDeactivation),this):(finishDeactivation(),this)},pause:function pause(pauseOptions){if(state.paused||!state.active)return this;var onPause=getOption(pauseOptions,"onPause"),onPostPause=getOption(pauseOptions,"onPostPause");return state.paused=!0,null==onPause||onPause(),removeListeners(),updateObservedNodes(),null==onPostPause||onPostPause(),this},unpause:function unpause(unpauseOptions){if(!state.paused||!state.active)return this;var onUnpause=getOption(unpauseOptions,"onUnpause"),onPostUnpause=getOption(unpauseOptions,"onPostUnpause");return state.paused=!1,null==onUnpause||onUnpause(),updateTabbableNodes(),addListeners(),updateObservedNodes(),null==onPostUnpause||onPostUnpause(),this},updateContainerElements:function updateContainerElements(containerElements){var elementsAsArray=[].concat(containerElements).filter(Boolean);return state.containers=elementsAsArray.map((function(element){return"string"==typeof element?doc.querySelector(element):element})),state.active&&updateTabbableNodes(),updateObservedNodes(),this}}).updateContainerElements(elements),trap}},"./node_modules/tabbable/dist/index.esm.js":(__unused_webpack_module,__webpack_exports__,__webpack_require__)=>{__webpack_require__.r(__webpack_exports__),__webpack_require__.d(__webpack_exports__,{focusable:()=>focusable,getTabIndex:()=>getTabIndex,isFocusable:()=>isFocusable,isTabbable:()=>isTabbable,tabbable:()=>tabbable});var candidateSelectors=["input:not([inert])","select:not([inert])","textarea:not([inert])","a[href]:not([inert])","button:not([inert])","[tabindex]:not(slot):not([inert])","audio[controls]:not([inert])","video[controls]:not([inert])",'[contenteditable]:not([contenteditable="false"]):not([inert])',"details>summary:first-of-type:not([inert])","details:not([inert])"],candidateSelector=candidateSelectors.join(","),NoElement="undefined"==typeof Element,matches=NoElement?function(){}:Element.prototype.matches||Element.prototype.msMatchesSelector||Element.prototype.webkitMatchesSelector,getRootNode=!NoElement&&Element.prototype.getRootNode?function(element){var _element$getRootNode;return null==element||null===(_element$getRootNode=element.getRootNode)||void 0===_element$getRootNode?void 0:_element$getRootNode.call(element)}:function(element){return null==element?void 0:element.ownerDocument},isInert=function isInert(node,lookUp){var _node$getAttribute;void 0===lookUp&&(lookUp=!0);var inertAtt=null==node||null===(_node$getAttribute=node.getAttribute)||void 0===_node$getAttribute?void 0:_node$getAttribute.call(node,"inert");return""===inertAtt||"true"===inertAtt||lookUp&&node&&isInert(node.parentNode)},getCandidates=function getCandidates(el,includeContainer,filter){if(isInert(el))return[];var candidates=Array.prototype.slice.apply(el.querySelectorAll(candidateSelector));return includeContainer&&matches.call(el,candidateSelector)&&candidates.unshift(el),candidates=candidates.filter(filter)},getCandidatesIteratively=function getCandidatesIteratively(elements,includeContainer,options){for(var candidates=[],elementsToCheck=Array.from(elements);elementsToCheck.length;){var element=elementsToCheck.shift();if(!isInert(element,!1))if("SLOT"===element.tagName){var assigned=element.assignedElements(),nestedCandidates=getCandidatesIteratively(assigned.length?assigned:element.children,!0,options);options.flatten?candidates.push.apply(candidates,nestedCandidates):candidates.push({scopeParent:element,candidates:nestedCandidates})}else{matches.call(element,candidateSelector)&&options.filter(element)&&(includeContainer||!elements.includes(element))&&candidates.push(element);var shadowRoot=element.shadowRoot||"function"==typeof options.getShadowRoot&&options.getShadowRoot(element),validShadowRoot=!isInert(shadowRoot,!1)&&(!options.shadowRootFilter||options.shadowRootFilter(element));if(shadowRoot&&validShadowRoot){var _nestedCandidates=getCandidatesIteratively(!0===shadowRoot?element.children:shadowRoot.children,!0,options);options.flatten?candidates.push.apply(candidates,_nestedCandidates):candidates.push({scopeParent:element,candidates:_nestedCandidates})}else elementsToCheck.unshift.apply(elementsToCheck,element.children)}}return candidates},hasTabIndex=function hasTabIndex(node){return!isNaN(parseInt(node.getAttribute("tabindex"),10))},getTabIndex=function getTabIndex(node){if(!node)throw new Error("No node provided");return node.tabIndex<0&&(/^(AUDIO|VIDEO|DETAILS)$/.test(node.tagName)||function isContentEditable(node){var _node$getAttribute2,attValue=null==node||null===(_node$getAttribute2=node.getAttribute)||void 0===_node$getAttribute2?void 0:_node$getAttribute2.call(node,"contenteditable");return""===attValue||"true"===attValue}(node))&&!hasTabIndex(node)?0:node.tabIndex},sortOrderedTabbables=function sortOrderedTabbables(a,b){return a.tabIndex===b.tabIndex?a.documentOrder-b.documentOrder:a.tabIndex-b.tabIndex},isInput=function isInput(node){return"INPUT"===node.tagName},isNonTabbableRadio=function isNonTabbableRadio(node){return function isRadio(node){return isInput(node)&&"radio"===node.type}(node)&&!function isTabbableRadio(node){if(!node.name)return!0;var radioSet,radioScope=node.form||getRootNode(node),queryRadios=function queryRadios(name){return radioScope.querySelectorAll('input[type="radio"][name="'+name+'"]')};if("undefined"!=typeof window&&void 0!==window.CSS&&"function"==typeof window.CSS.escape)radioSet=queryRadios(window.CSS.escape(node.name));else try{radioSet=queryRadios(node.name)}catch(err){return console.error("Looks like you have a radio button with a name attribute containing invalid CSS selector characters and need the CSS.escape polyfill: %s",err.message),!1}var checked=function getCheckedRadio(nodes,form){for(var i=0;i<nodes.length;i++)if(nodes[i].checked&&nodes[i].form===form)return nodes[i]}(radioSet,node.form);return!checked||checked===node}(node)},isZeroArea=function isZeroArea(node){var _node$getBoundingClie=node.getBoundingClientRect(),width=_node$getBoundingClie.width,height=_node$getBoundingClie.height;return 0===width&&0===height},isHidden=function isHidden(node,_ref){var displayCheck=_ref.displayCheck,getShadowRoot=_ref.getShadowRoot;if("hidden"===getComputedStyle(node).visibility)return!0;var nodeUnderDetails=matches.call(node,"details>summary:first-of-type")?node.parentElement:node;if(matches.call(nodeUnderDetails,"details:not([open]) *"))return!0;if(displayCheck&&"full"!==displayCheck&&"legacy-full"!==displayCheck){if("non-zero-area"===displayCheck)return isZeroArea(node)}else{if("function"==typeof getShadowRoot){for(var originalNode=node;node;){var parentElement=node.parentElement,rootNode=getRootNode(node);if(parentElement&&!parentElement.shadowRoot&&!0===getShadowRoot(parentElement))return isZeroArea(node);node=node.assignedSlot?node.assignedSlot:parentElement||rootNode===node.ownerDocument?parentElement:rootNode.host}node=originalNode}if(function isNodeAttached(node){var _nodeRoot,_nodeRootHost,_nodeRootHost$ownerDo,_node$ownerDocument,nodeRoot=node&&getRootNode(node),nodeRootHost=null===(_nodeRoot=nodeRoot)||void 0===_nodeRoot?void 0:_nodeRoot.host,attached=!1;if(nodeRoot&&nodeRoot!==node)for(attached=!!(null!==(_nodeRootHost=nodeRootHost)&&void 0!==_nodeRootHost&&null!==(_nodeRootHost$ownerDo=_nodeRootHost.ownerDocument)&&void 0!==_nodeRootHost$ownerDo&&_nodeRootHost$ownerDo.contains(nodeRootHost)||null!=node&&null!==(_node$ownerDocument=node.ownerDocument)&&void 0!==_node$ownerDocument&&_node$ownerDocument.contains(node));!attached&&nodeRootHost;){var _nodeRoot2,_nodeRootHost2,_nodeRootHost2$ownerD;attached=!(null===(_nodeRootHost2=nodeRootHost=null===(_nodeRoot2=nodeRoot=getRootNode(nodeRootHost))||void 0===_nodeRoot2?void 0:_nodeRoot2.host)||void 0===_nodeRootHost2||null===(_nodeRootHost2$ownerD=_nodeRootHost2.ownerDocument)||void 0===_nodeRootHost2$ownerD||!_nodeRootHost2$ownerD.contains(nodeRootHost))}return attached}(node))return!node.getClientRects().length;if("legacy-full"!==displayCheck)return!0}return!1},isNodeMatchingSelectorFocusable=function isNodeMatchingSelectorFocusable(options,node){return!(node.disabled||isInert(node)||function isHiddenInput(node){return isInput(node)&&"hidden"===node.type}(node)||isHidden(node,options)||function isDetailsWithSummary(node){return"DETAILS"===node.tagName&&Array.prototype.slice.apply(node.children).some((function(child){return"SUMMARY"===child.tagName}))}(node)||function isDisabledFromFieldset(node){if(/^(INPUT|BUTTON|SELECT|TEXTAREA)$/.test(node.tagName))for(var parentNode=node.parentElement;parentNode;){if("FIELDSET"===parentNode.tagName&&parentNode.disabled){for(var i=0;i<parentNode.children.length;i++){var child=parentNode.children.item(i);if("LEGEND"===child.tagName)return!!matches.call(parentNode,"fieldset[disabled] *")||!child.contains(node)}return!0}parentNode=parentNode.parentElement}return!1}(node))},isNodeMatchingSelectorTabbable=function isNodeMatchingSelectorTabbable(options,node){return!(isNonTabbableRadio(node)||getTabIndex(node)<0||!isNodeMatchingSelectorFocusable(options,node))},isValidShadowRootTabbable=function isValidShadowRootTabbable(shadowHostNode){var tabIndex=parseInt(shadowHostNode.getAttribute("tabindex"),10);return!!(isNaN(tabIndex)||tabIndex>=0)},sortByOrder=function sortByOrder(candidates){var regularTabbables=[],orderedTabbables=[];return candidates.forEach((function(item,i){var isScope=!!item.scopeParent,element=isScope?item.scopeParent:item,candidateTabindex=function getSortOrderTabIndex(node,isScope){var tabIndex=getTabIndex(node);return tabIndex<0&&isScope&&!hasTabIndex(node)?0:tabIndex}(element,isScope),elements=isScope?sortByOrder(item.candidates):element;0===candidateTabindex?isScope?regularTabbables.push.apply(regularTabbables,elements):regularTabbables.push(element):orderedTabbables.push({documentOrder:i,tabIndex:candidateTabindex,item,isScope,content:elements})})),orderedTabbables.sort(sortOrderedTabbables).reduce((function(acc,sortable){return sortable.isScope?acc.push.apply(acc,sortable.content):acc.push(sortable.content),acc}),[]).concat(regularTabbables)},tabbable=function tabbable(container,options){var candidates;return candidates=(options=options||{}).getShadowRoot?getCandidatesIteratively([container],options.includeContainer,{filter:isNodeMatchingSelectorTabbable.bind(null,options),flatten:!1,getShadowRoot:options.getShadowRoot,shadowRootFilter:isValidShadowRootTabbable}):getCandidates(container,options.includeContainer,isNodeMatchingSelectorTabbable.bind(null,options)),sortByOrder(candidates)},focusable=function focusable(container,options){return(options=options||{}).getShadowRoot?getCandidatesIteratively([container],options.includeContainer,{filter:isNodeMatchingSelectorFocusable.bind(null,options),flatten:!0,getShadowRoot:options.getShadowRoot}):getCandidates(container,options.includeContainer,isNodeMatchingSelectorFocusable.bind(null,options))},isTabbable=function isTabbable(node,options){if(options=options||{},!node)throw new Error("No node provided");return!1!==matches.call(node,candidateSelector)&&isNodeMatchingSelectorTabbable(options,node)},focusableCandidateSelector=candidateSelectors.concat("iframe").join(","),isFocusable=function isFocusable(node,options){if(options=options||{},!node)throw new Error("No node provided");return!1!==matches.call(node,focusableCandidateSelector)&&isNodeMatchingSelectorFocusable(options,node)}}}]);