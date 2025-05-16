// The names and ids of all the desired tracking instances are provided to us by the
// project owners - the danish libraries (DDF). The reason for this data being very
// specific is that it needs to match an external Mapp API setup. If any information
// ever needs to be adjusted per DDF's request, this is the place to do it.
type Statistics = Record<
  string,
  { id: number; name: string; parameterName: string }
>;

// Most `parameterName` values are empty strings because they are only used
// in the `collectPageStatistics` function, which only works with `parameterName`.
export const statistics: Statistics = {
  // advanced search
  advancedSearchTerm: {
    id: 9,
    name: "Avanceret søgning søgeterm",
    parameterName: "p_oss_adv"
  },
  advancedSearchCql: {
    id: 63,
    name: "Avanceret søgning CQL",
    parameterName: "p_oss_cql"
  },
  // Search flow
  searchQuery: {
    id: 10,
    name: "OSS",
    parameterName: "OSS"
  },
  searchResultCount: {
    id: 11,
    name: "OSS Results",
    parameterName: "OSSr"
  },
  searchFacets: {
    id: 20,
    name: "Filtrering vha facetbrowser",
    parameterName: ""
  },
  materialType: {
    id: 24,
    name: "Materialetype",
    parameterName: "p_mat_type"
  },
  materialGenre: {
    id: 25,
    name: "Materiale Genre",
    parameterName: "p_mat_category"
  },
  materialLanguage: {
    id: 29,
    name: "Materiale Sprog",
    parameterName: "p_mat_lang"
  },
  materialSource: {
    id: 30,
    name: "Materiale Kilde",
    parameterName: "p_mat_source"
  },
  materialTargetAudience: {
    id: 31,
    name: "Materiale Målgruppe",
    parameterName: ""
  },
  materialTopicNumber: {
    id: 32,
    name: "Materiale - DK5-nummer (Emnetal)",
    parameterName: "p_mat_indexno"
  },
  materialFictionNonFiction: {
    id: 33,
    name: "Materiale Fiktion/nonfiktion",
    parameterName: "p_mat_ficnonfic"
  },
  materialStatus: {
    id: 38,
    name: "Materiale Status",
    parameterName: "p_mat_status"
  },
  searchResultNumberClick: {
    id: 42,
    name: "Søgning - Resultatnummer klik",
    parameterName: ""
  },
  campaignClick: {
    id: 48,
    name: "Kampagneklik",
    parameterName: ""
  },
  reservation: {
    id: 50,
    name: "Reserver",
    parameterName: ""
  },
  onlineReservation: {
    id: 51,
    name: "Se online",
    parameterName: ""
  },
  autosuggestClick: {
    id: 54,
    name: "Autosuggest - klik",
    parameterName: ""
  },
  campaignShown: {
    // This may be worng: see https://reload.atlassian.net/browse/DDFSAL-62
    id: 62,
    name: "KampagnePlus Titel",
    parameterName: "u_navigatedby_kp"
  },
  facetsByFacetLineClick: {
    id: 91,
    name: "Filtrering vha facetbånd",
    parameterName: ""
  },
  // Loaner status, user profile
  renewSelectedMaterials: {
    id: 55,
    name: "Forny valgte materialer",
    parameterName: ""
  },
  renewAllMaterials: {
    id: 56,
    name: "Forny alle materialer",
    parameterName: ""
  },
  addToFavorites: {
    id: 61,
    name: "Tilføj til liste",
    parameterName: ""
  },

  // Material
  orderFromAnotherLibrary: {
    id: 70,
    name: "Bestil fra andet bibliotek",
    parameterName: ""
  },
  orderDigitalCopy: {
    id: 35,
    name: "Bestil digital kopi",
    parameterName: ""
  },
  findOnShelf: {
    id: 108,
    name: "Klik på ”Find på hylden”",
    parameterName: ""
  },
  reserveSpecificManifestation: {
    id: 109,
    name: "Klik på specifik manifestation",
    parameterName: ""
  },
  materialAudience: {
    id: 67,
    name: "Materiale målgruppe",
    parameterName: "p_mat_audience"
  },
  // Publizon
  publizonLoan: { id: 72, name: "Klik på Lån (Publizon)", parameterName: "" },
  publizonReserve: {
    id: 50,
    name: "Klik på Reservér (Publizon)",
    parameterName: ""
  },
  publizonReadListen: {
    id: 73,
    name: "Klik på LÆS/LYT (Publizon)",
    parameterName: ""
  },
  publizonTry: { id: 84, name: "Klik på Prøv (Publizon)", parameterName: "" },
  // Paragraphs
  recommendedMaterial: {
    id: 74,
    name: "Klik på recommended material",
    parameterName: ""
  }
};

export default {};
