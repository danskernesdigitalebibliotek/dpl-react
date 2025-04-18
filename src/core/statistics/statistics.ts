// The names and ids of all the desired tracking instances are provided to us by the
// project owners - the danish libraries (DDF). The reason for this data being very
// specific is that it needs to match an external Mapp API setup. If any information
// ever needs to be adjusted per DDF's request, this is the place to do it.
type Statistics = Record<string, { id: number; name: string }>;

export const statistics: Statistics = {
  // advanced search
  advancedSearchTerm: { id: 9, name: "Avanceret søgning søgeterm" },

  // Search flow
  searchQuery: { id: 10, name: "OSS" },
  searchResultCount: { id: 11, name: "OSS Results" },
  searchFacets: { id: 20, name: "Søgning Facet" },
  materialType: { id: 24, name: "Materialetype" },
  materialGenre: { id: 25, name: "Materiale Genre" },
  materialLanguage: { id: 29, name: "Materiale Sprog" },
  materialSource: { id: 30, name: "Materiale Kilde" },
  materialTargetAudience: { id: 31, name: "Materiale Målgruppe" },
  materialTopicNumber: { id: 32, name: "Materiale - DK5-nummer (Emnetal)" },
  materialFictionNonFiction: { id: 33, name: "Materiale Fiktion/nonfiktion" },
  materialStatus: { id: 38, name: "Materiale Status" },
  searchResultNumberClick: { id: 42, name: "Søgning - Resultatnummer klik" },
  campaignClick: { id: 48, name: "Kampagneklik" },
  reservation: { id: 50, name: "Reserver" },
  onlineReservation: { id: 51, name: "Se online" },
  autosuggestClick: { id: 54, name: "Autosuggest - klik" },
  campaignShown: { id: 62, name: "KampagnePlus Titel" },

  // Loaner status, user profile
  renewSelectedMaterials: { id: 55, name: "Forny valgte materialer" },
  renewAllMaterials: { id: 56, name: "Forny alle materialer" },
  addToFavorites: { id: 61, name: "Tilføj til liste" },

  // Material
  orderFromAnotherLibrary: { id: 70, name: "Bestil fra andet bibliotek" },
  orderDigitalCopy: { id: 35, name: "Bestil digital kopi" },
  findOnShelf: { id: 108, name: "Klik på ”Find på hylden”" },
  reserveSpecificManifestation: {
    id: 109,
    name: "Klik på specifik manifestation"
  }
};

export default {};
