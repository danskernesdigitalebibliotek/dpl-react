"use strict";(globalThis.webpackChunk_danskernesdigitalebibliotek_dpl_react=globalThis.webpackChunk_danskernesdigitalebibliotek_dpl_react||[]).push([[9206],{"./src/components/find-on-shelf/FindOnShelfModal.stories.tsx":(__unused_webpack_module,__webpack_exports__,__webpack_require__)=>{__webpack_require__.r(__webpack_exports__),__webpack_require__.d(__webpack_exports__,{Periodical:()=>Periodical,Primary:()=>Primary,default:()=>FindOnShelfModal_stories});var react=__webpack_require__("./node_modules/react/index.js"),material_stories=__webpack_require__("./src/apps/material/material.stories.tsx"),serviceUrlArgs=__webpack_require__("./src/core/storybook/serviceUrlArgs.ts"),config=__webpack_require__("./src/core/utils/config.tsx"),general=__webpack_require__("./src/core/utils/helpers/general.ts"),utils_text=__webpack_require__("./src/core/utils/text.tsx"),url=__webpack_require__("./src/core/utils/url.tsx"),MaterialButtonsFindOnShelf=__webpack_require__("./src/components/material/material-buttons/physical/MaterialButtonsFindOnShelf.tsx"),FindOnShelfModal=__webpack_require__("./src/components/find-on-shelf/FindOnShelfModal.tsx"),graphql=__webpack_require__("./src/core/dbc-gateway/generated/graphql.tsx");const mockedManifestationData=[{pid:"870970-basis:52557240",genreAndForm:["slægtsromaner"],source:["Bibliotekskatalog"],titles:{main:["De syv søstre"],original:["The seven sisters"]},fictionNonfiction:{display:"SKOENLITTERATUR",code:graphql.GH.Fiction},materialTypes:[{materialTypeSpecific:{display:"bog"}}],creators:[{display:"Lucinda Riley",__typename:"Person",nameSort:"Riley, Lucinda"}],publisher:[""],languages:{main:[{display:"dansk",isoCode:"dan"}]},identifiers:[{value:"9788763844116"}],contributors:[{display:"Ulla Lauridsen",roles:[{function:{singular:"oversætter"}}]}],edition:{summary:"1. udgave, 3. oplag (2018)",publicationYear:{display:"2016"}},audience:{generalAudience:[],ages:[]},notes:[],physicalDescription:{numberOfPages:null,summaryFull:""},accessTypes:[{code:graphql.PS.Physical}],access:[{__typename:"InterLibraryLoan",loanIsPossible:!0}],shelfmark:null,catalogueCodes:{nationalBibliography:[],otherCatalogues:[]}},{pid:"870970-basis:52643414",genreAndForm:["slægtsromaner"],source:["Bibliotekskatalog"],titles:{main:["De syv søstre (mp3)"],original:["The seven sisters"]},fictionNonfiction:{display:"SKOENLITTERATUR",code:"FICTION"},materialTypes:[{materialTypeSpecific:{display:"lydbog (cd-mp3)"}}],creators:[{display:"Lucinda Riley",__typename:"Person",nameSort:"Riley, Lucinda"}],publisher:[""],languages:{main:[{display:"dansk",isoCode:"dan"}]},identifiers:[{value:"9788763850636"}],contributors:[{display:"Maria Stokholm",roles:[{function:{singular:"indlæser"}}]},{display:"Ulla Lauridsen",roles:[{function:{singular:"oversætter"}}]}],edition:{summary:"1. lydbogsudgave",publicationYear:{display:"2016"}},audience:{generalAudience:[],ages:[]},notes:[{display:["Gengivelse af bogen","Indlæst efter 1. udgave. 2016. ISBN: 9788763844116"]}],physicalDescription:{numberOfPages:null,summaryFull:""},accessTypes:[{code:"PHYSICAL"}],access:[{__typename:"InterLibraryLoan",loanIsPossible:!0}],shelfmark:{postfix:"Postfix, 24",shelfmark:"60.7"},catalogueCodes:{nationalBibliography:[],otherCatalogues:[]}}];var globalTextArgs=__webpack_require__("./src/core/storybook/globalTextArgs.ts"),globalConfigArgs=__webpack_require__("./src/core/storybook/globalConfigArgs.ts");function _extends(){return _extends=Object.assign?Object.assign.bind():function(n){for(var e=1;e<arguments.length;e++){var t=arguments[e];for(var r in t)({}).hasOwnProperty.call(t,r)&&(n[r]=t[r])}return n},_extends.apply(null,arguments)}const WrappedFindOnShelfModal=(0,utils_text.i)((0,url.nU)((0,config.NV)(FindOnShelfModal.A))),WrappedMaterialButtonsFindOnShelf=(0,utils_text.i)((0,url.nU)((0,config.NV)(MaterialButtonsFindOnShelf.A))),FindOnShelfModal_stories={title:"Components / Find On Shelf Modal",component:WrappedFindOnShelfModal,argTypes:{...serviceUrlArgs.U,...material_stories.default.argTypes,...globalTextArgs.U,...globalConfigArgs.U,manifestations:{name:"Manifestations",control:{type:"object"}},workTitles:{name:"Work title(s)",control:{type:"object"}},authors:{name:"Author(s)",control:{type:"object"}},selectedPeriodical:{name:"Selected periodical",control:{type:"object"}},setSelectedPeriodical:{name:"Set selected periodical function",control:{type:"object"}},blacklistedPickupBranchesConfig:{name:"Blacklisted Pickup branches",control:{type:"text"}}},args:{...material_stories.default.args,...serviceUrlArgs.A,...globalTextArgs.A,...globalConfigArgs.A,manifestations:mockedManifestationData,workTitles:["Title 1","Title 2"],authors:[{__typename:"Person",nameSort:"",display:"author 1"},{__typename:"Person",nameSort:"",display:"author 2"},{__typename:"Corporation",nameSort:"",display:"author 3"}],selectedPeriodical:null,setSelectedPeriodical:()=>{},blacklistedPickupBranchesConfig:"FBS-751032,FBS-751031,FBS-751009,FBS-751027,FBS-751024"},render:args=>{const modifiedArgs={...args,selectedPeriodical:{volume:"",volumeYear:"2022",displayText:"2022, nr. 29",volumeNumber:"29",itemNumber:"5313131426"}},{manifestations:[{pid}]}=args;return react.createElement(react.Fragment,null,react.createElement(WrappedMaterialButtonsFindOnShelf,_extends({},modifiedArgs,{size:"small",faustIds:[(0,general.G_)(pid)]})),react.createElement(WrappedFindOnShelfModal,modifiedArgs))}},Primary={},Periodical={args:{manifestations:[{pid:"870970-basis:06373674",genreAndForm:[],source:["Bibliotekskatalog"],titles:{main:["Alt for damerne"],original:[]},fictionNonfiction:{display:"FAGLITTERATUR",code:"NONFICTION"},materialTypes:[{materialTypeSpecific:{display:"tidsskrift"}}],creators:[],publisher:[""],languages:{main:[{display:"dansk",isoCode:"dan"}]},identifiers:[{value:"0002-6506"}],contributors:[],edition:{summary:"",publicationYear:{display:"1946"}},audience:{generalAudience:[],ages:[]},notes:[{display:["[Nr. 1, 1946]-"]},{display:["Ugentlig"]},{display:["Tidligere udgivet: Kbh. : Gutenberghus Bladene","Hertil findes tillæg","Hertil findes årligt tillæg med titel: Skønhed"]}],physicalDescription:{},accessTypes:[{code:"PHYSICAL"}],access:[{__typename:"DigitalArticleService",issn:"00026506"},{__typename:"InterLibraryLoan",loanIsPossible:!0}],shelfmark:null,catalogueCodes:{nationalBibliography:[],otherCatalogues:[]}}]}};Primary.parameters={...Primary.parameters,docs:{...Primary.parameters?.docs,source:{originalSource:"{}",...Primary.parameters?.docs?.source}}},Periodical.parameters={...Periodical.parameters,docs:{...Periodical.parameters?.docs,source:{originalSource:"{\n  args: {\n    manifestations: mockedPeriodicalManifestationData\n  }\n}",...Periodical.parameters?.docs?.source}}}}}]);