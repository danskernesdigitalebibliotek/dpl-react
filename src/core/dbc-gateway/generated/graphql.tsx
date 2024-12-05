import {
  useQuery,
  useMutation,
  UseQueryOptions,
  UseMutationOptions
} from "react-query";
import { fetcher } from "../graphql-fetcher";

export type Maybe<T> = T | null;
export type InputMaybe<T> = Maybe<T>;
export type Exact<T extends { [key: string]: unknown }> = {
  [K in keyof T]: T[K];
};
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & {
  [SubKey in K]?: Maybe<T[SubKey]>;
};
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & {
  [SubKey in K]: Maybe<T[SubKey]>;
};
export type MakeEmpty<
  T extends { [key: string]: unknown },
  K extends keyof T
> = { [_ in K]?: never };
export type Incremental<T> =
  | T
  | {
      [P in keyof T]?: P extends " $fragmentName" | "__typename" ? T[P] : never;
    };
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: { input: string; output: string };
  String: { input: string; output: string };
  Boolean: { input: boolean; output: boolean };
  Int: { input: number; output: number };
  Float: { input: number; output: number };
  DateTime: { input: unknown; output: unknown };
  PaginationLimitScalar: { input: unknown; output: unknown };
};

export type AccessType = {
  __typename?: "AccessType";
  code: AccessTypeCodeEnum;
  display: Scalars["String"]["output"];
};

export enum AccessTypeCodeEnum {
  Online = "ONLINE",
  Physical = "PHYSICAL",
  Unknown = "UNKNOWN"
}

export type AccessUnion =
  | AccessUrl
  | DigitalArticleService
  | Ereol
  | InfomediaService
  | InterLibraryLoan;

export type AccessUrl = {
  __typename?: "AccessUrl";
  /** If the resource requires login */
  loginRequired: Scalars["Boolean"]["output"];
  /** Notes for the resource */
  note?: Maybe<Scalars["String"]["output"]>;
  /** The origin, e.g. "DBC Webarkiv" */
  origin: Scalars["String"]["output"];
  /** Status from linkcheck */
  status: LinkStatusEnum;
  /** The type of content that can be found at this URL */
  type?: Maybe<AccessUrlTypeEnum>;
  /** The url where manifestation is located */
  url: Scalars["String"]["output"];
};

export enum AccessUrlTypeEnum {
  Image = "IMAGE",
  Other = "OTHER",
  Resource = "RESOURCE",
  Sample = "SAMPLE",
  TableOfContents = "TABLE_OF_CONTENTS",
  Thumbnail = "THUMBNAIL"
}

export type Audience = {
  __typename?: "Audience";
  /** PEGI age rating for games  */
  PEGI?: Maybe<Pegi>;
  /** Range of numbers with either beginning of range or end of range or both e.g. 6-10, 1980-1999 */
  ages: Array<Range>;
  /** Is this material for children or adults */
  childrenOrAdults: Array<ChildOrAdult>;
  /** Appropriate audience for this manifestation */
  generalAudience: Array<Scalars["String"]["output"]>;
  /** LET number of this manifestion, defines the reability level, LET stands for læseegnethedstal */
  let?: Maybe<Scalars["String"]["output"]>;
  /** Level of difficulty, illustrations, length, and realism in children's literature */
  levelForChildren8to12?: Maybe<LevelForAudience>;
  /** Appropriate audience as recommended by the library */
  libraryRecommendation?: Maybe<Scalars["String"]["output"]>;
  /** Lix number of this manifestion, defines the reability level, Lix stands for læsbarhedsindex */
  lix?: Maybe<Scalars["String"]["output"]>;
  /** Media council age recommendation */
  mediaCouncilAgeRestriction?: Maybe<MediaCouncilAgeRestriction>;
  /** Number of players in the game. */
  players?: Maybe<Players>;
  /** Primary target audience for this manifestation */
  primaryTarget: Array<Scalars["String"]["output"]>;
  /** Is this material for use in schools (folkeskole/ungdomsuddannelse) or is this material for use in schools by the teacher (folkeskole only) */
  schoolUse: Array<SchoolUse>;
};

export type CatalogueCodes = {
  __typename?: "CatalogueCodes";
  /** CatalogueCodes from the national registers */
  nationalBibliography: Array<Scalars["String"]["output"]>;
  /** CatalogueCodes from local bibliographies or catalogues that the manifestation belongs to */
  otherCatalogues: Array<Scalars["String"]["output"]>;
};

export type ChildOrAdult = {
  __typename?: "ChildOrAdult";
  code: ChildOrAdultCodeEnum;
  display: Scalars["String"]["output"];
};

export enum ChildOrAdultCodeEnum {
  ForAdults = "FOR_ADULTS",
  ForChildren = "FOR_CHILDREN"
}

export type Classification = {
  __typename?: "Classification";
  /** The classification code */
  code: Scalars["String"]["output"];
  /** Descriptive text for the classification code (DK5 only) */
  display: Scalars["String"]["output"];
  /** The dk5Heading for the classification (DK5 only) */
  dk5Heading?: Maybe<Scalars["String"]["output"]>;
  /** For DK5 only. The DK5 entry type: main entry, national entry, or additional entry */
  entryType?: Maybe<EntryTypeEnum>;
  /** Name of the classification system */
  system: Scalars["String"]["output"];
};

/** The complete facet in response */
export type ComplexSearchFacetResponse = {
  __typename?: "ComplexSearchFacetResponse";
  name?: Maybe<Scalars["String"]["output"]>;
  values?: Maybe<Array<ComplexSearchFacetValue>>;
};

/** A Facet value in response */
export type ComplexSearchFacetValue = {
  __typename?: "ComplexSearchFacetValue";
  key: Scalars["String"]["output"];
  score: Scalars["Int"]["output"];
};

/** The supported facet fields */
export enum ComplexSearchFacetsEnum {
  Accesstype = "ACCESSTYPE",
  Ages = "AGES",
  Cataloguecode = "CATALOGUECODE",
  Contributor = "CONTRIBUTOR",
  Contributorfunction = "CONTRIBUTORFUNCTION",
  Creator = "CREATOR",
  Creatorcontributor = "CREATORCONTRIBUTOR",
  Creatorcontributorfunction = "CREATORCONTRIBUTORFUNCTION",
  Creatorfunction = "CREATORFUNCTION",
  Fictionalcharacter = "FICTIONALCHARACTER",
  Filmnationality = "FILMNATIONALITY",
  Gameplatform = "GAMEPLATFORM",
  Generalaudience = "GENERALAUDIENCE",
  Generalmaterialtype = "GENERALMATERIALTYPE",
  Genreandform = "GENREANDFORM",
  Hostpublication = "HOSTPUBLICATION",
  Issue = "ISSUE",
  Language = "LANGUAGE",
  Let = "LET",
  Libraryrecommendation = "LIBRARYRECOMMENDATION",
  Lix = "LIX",
  Mainlanguage = "MAINLANGUAGE",
  Mediacouncilagerestriction = "MEDIACOUNCILAGERESTRICTION",
  Mood = "MOOD",
  Musicalensembleorcast = "MUSICALENSEMBLEORCAST",
  Narrativetechnique = "NARRATIVETECHNIQUE",
  Pegi = "PEGI",
  Players = "PLAYERS",
  Primarytarget = "PRIMARYTARGET",
  Publicationyear = "PUBLICATIONYEAR",
  Series = "SERIES",
  Setting = "SETTING",
  Source = "SOURCE",
  Specificmaterialtype = "SPECIFICMATERIALTYPE",
  Spokenlanguage = "SPOKENLANGUAGE",
  Subject = "SUBJECT",
  Subtitlelanguage = "SUBTITLELANGUAGE",
  Typeofscore = "TYPEOFSCORE"
}

/** The facets to ask for */
export type ComplexSearchFacetsInput = {
  facetLimit: Scalars["Int"]["input"];
  facets?: InputMaybe<Array<ComplexSearchFacetsEnum>>;
};

/** Search Filters */
export type ComplexSearchFiltersInput = {
  /** Id of agency. */
  agencyId?: InputMaybe<Array<Scalars["String"]["input"]>>;
  /** Name of the branch. */
  branch?: InputMaybe<Array<Scalars["String"]["input"]>>;
  /** BranchId.  */
  branchId?: InputMaybe<Array<Scalars["String"]["input"]>>;
  /** Overall location in library (eg. Voksne). */
  department?: InputMaybe<Array<Scalars["String"]["input"]>>;
  /** Date of first accession */
  firstAccessionDate?: InputMaybe<Scalars["String"]["input"]>;
  /** Id of publishing issue. */
  issueId?: InputMaybe<Array<Scalars["String"]["input"]>>;
  /** Local id of the item. */
  itemId?: InputMaybe<Array<Scalars["String"]["input"]>>;
  /** Where is the book physically located  (eg. skønlitteratur). */
  location?: InputMaybe<Array<Scalars["String"]["input"]>>;
  /** Onloan or OnShelf. */
  status?: InputMaybe<Array<HoldingsStatusEnum>>;
  /** More specific location (eg. Fantasy). */
  sublocation?: InputMaybe<Array<Scalars["String"]["input"]>>;
};

/** The search response */
export type ComplexSearchResponse = {
  __typename?: "ComplexSearchResponse";
  /** Error message, for instance if CQL is invalid */
  errorMessage?: Maybe<Scalars["String"]["output"]>;
  /** Facets for this response */
  facets?: Maybe<Array<ComplexSearchFacetResponse>>;
  /** Total number of works found. May be used for pagination. */
  hitcount: Scalars["Int"]["output"];
  /** The works matching the given search query. Use offset and limit for pagination. */
  works: Array<Work>;
};

/** The search response */
export type ComplexSearchResponseWorksArgs = {
  limit: Scalars["PaginationLimitScalar"]["input"];
  offset: Scalars["Int"]["input"];
  sort?: InputMaybe<Array<SortInput>>;
};

export type ComplexSearchSuggestion = {
  __typename?: "ComplexSearchSuggestion";
  /** The suggested term which can be searched for */
  term: Scalars["String"]["output"];
  /**
   * A unique identifier for tracking user interactions with this suggestion.
   * It is generated in the response and should be included in subsequent
   * API calls when this suggestion is selected.
   */
  traceId: Scalars["String"]["output"];
  /** The type of suggestion */
  type: Scalars["String"]["output"];
  /** A work related to the term */
  work?: Maybe<Work>;
};

export type ComplexSuggestResponse = {
  __typename?: "ComplexSuggestResponse";
  result: Array<ComplexSearchSuggestion>;
};

export enum ComplexSuggestionTypeEnum {
  Contributorfunction = "CONTRIBUTORFUNCTION",
  Creator = "CREATOR",
  Creatorcontributor = "CREATORCONTRIBUTOR",
  Creatorcontributorfunction = "CREATORCONTRIBUTORFUNCTION",
  Creatorfunction = "CREATORFUNCTION",
  Default = "DEFAULT",
  Fictionalcharacter = "FICTIONALCHARACTER",
  Hostpublication = "HOSTPUBLICATION",
  Publisher = "PUBLISHER",
  Series = "SERIES",
  Subject = "SUBJECT",
  Title = "TITLE"
}

export type Complexity = {
  __typename?: "Complexity";
  class: Scalars["String"]["output"];
  max: Scalars["Int"]["output"];
  value: Scalars["Int"]["output"];
};

export type CopyRequestInput = {
  authorOfComponent?: InputMaybe<Scalars["String"]["input"]>;
  issueOfComponent?: InputMaybe<Scalars["String"]["input"]>;
  openURL?: InputMaybe<Scalars["String"]["input"]>;
  pagesOfComponent?: InputMaybe<Scalars["String"]["input"]>;
  pickUpAgencySubdivision?: InputMaybe<Scalars["String"]["input"]>;
  /** The pid of an article or periodica */
  pid: Scalars["String"]["input"];
  publicationDateOfComponent?: InputMaybe<Scalars["String"]["input"]>;
  publicationTitle?: InputMaybe<Scalars["String"]["input"]>;
  publicationYearOfComponent?: InputMaybe<Scalars["String"]["input"]>;
  titleOfComponent?: InputMaybe<Scalars["String"]["input"]>;
  userInterestDate?: InputMaybe<Scalars["String"]["input"]>;
  userMail?: InputMaybe<Scalars["String"]["input"]>;
  userName?: InputMaybe<Scalars["String"]["input"]>;
  volumeOfComponent?: InputMaybe<Scalars["String"]["input"]>;
};

export type CopyRequestResponse = {
  __typename?: "CopyRequestResponse";
  status: CopyRequestStatusEnum;
};

export enum CopyRequestStatusEnum {
  BorchkUserBlockedByAgency = "BORCHK_USER_BLOCKED_BY_AGENCY",
  BorchkUserNotVerified = "BORCHK_USER_NOT_VERIFIED",
  BorchkUserNoLongerExistOnAgency = "BORCHK_USER_NO_LONGER_EXIST_ON_AGENCY",
  ErrorAgencyNotSubscribed = "ERROR_AGENCY_NOT_SUBSCRIBED",
  ErrorInvalidPickupBranch = "ERROR_INVALID_PICKUP_BRANCH",
  ErrorMissingClientConfiguration = "ERROR_MISSING_CLIENT_CONFIGURATION",
  ErrorMissingMunicipalityagencyid = "ERROR_MISSING_MUNICIPALITYAGENCYID",
  ErrorMunicipalityagencyidNotFound = "ERROR_MUNICIPALITYAGENCYID_NOT_FOUND",
  ErrorPidNotReservable = "ERROR_PID_NOT_RESERVABLE",
  ErrorUnauthenticatedUser = "ERROR_UNAUTHENTICATED_USER",
  InternalError = "INTERNAL_ERROR",
  Ok = "OK",
  UnknownUser = "UNKNOWN_USER"
}

export type Corporation = CreatorInterface &
  SubjectInterface & {
    __typename?: "Corporation";
    /** Added information about the corporation, like M. Folmer Andersen (firma) */
    attributeToName?: Maybe<Scalars["String"]["output"]>;
    /** The full corporation or conference name */
    display: Scalars["String"]["output"];
    language?: Maybe<Language>;
    local?: Maybe<Scalars["Boolean"]["output"]>;
    /** Location or jurisdiction of the corporation or conference, like Københavns Kommune, Statistisk Kontor */
    location?: Maybe<Scalars["String"]["output"]>;
    /** Main corporation or conference */
    main?: Maybe<Scalars["String"]["output"]>;
    /** The full corporation or conference name to sort after */
    nameSort: Scalars["String"]["output"];
    /** Number of the conference */
    number?: Maybe<Scalars["String"]["output"]>;
    /** A list of which kinds of contributions this corporation made to this creation */
    roles: Array<Role>;
    /** Sub corporation or conference/meeting */
    sub?: Maybe<Scalars["String"]["output"]>;
    type: SubjectTypeEnum;
    /** Year of the conference */
    year?: Maybe<Scalars["String"]["output"]>;
  };

export type Cover = {
  __typename?: "Cover";
  detail?: Maybe<Scalars["String"]["output"]>;
  detail42?: Maybe<Scalars["String"]["output"]>;
  detail117?: Maybe<Scalars["String"]["output"]>;
  detail207?: Maybe<Scalars["String"]["output"]>;
  detail500?: Maybe<Scalars["String"]["output"]>;
  origin?: Maybe<Scalars["String"]["output"]>;
  thumbnail?: Maybe<Scalars["String"]["output"]>;
};

export type CreatorInterface = {
  /** Name of the creator */
  display: Scalars["String"]["output"];
  /** Name of the creator which can be used to sort after  */
  nameSort: Scalars["String"]["output"];
  /** A list of which kinds of contributions this creator made to this creation */
  roles: Array<Role>;
};

export type Dk5MainEntry = {
  __typename?: "DK5MainEntry";
  /** Main DK5 classification code */
  code: Scalars["String"]["output"];
  /** Displayable main DK5 classification */
  display: Scalars["String"]["output"];
  /** The dk5Heading for the classification */
  dk5Heading: Scalars["String"]["output"];
};

export type Debug = {
  __typename?: "Debug";
  complexity: Complexity;
  depth: Depth;
};

export type Depth = {
  __typename?: "Depth";
  max: Scalars["Int"]["output"];
  value: Scalars["Int"]["output"];
};

export type DidYouMean = {
  __typename?: "DidYouMean";
  /** An alternative query */
  query: Scalars["String"]["output"];
  /** A probability score between 0-1 indicating how relevant the query is */
  score: Scalars["Float"]["output"];
};

export type DigitalArticleService = {
  __typename?: "DigitalArticleService";
  /** Issn which can be used to order article through Digital Article Service */
  issn: Scalars["String"]["output"];
};

export type Edition = {
  __typename?: "Edition";
  /** Quotation of contributor statements related to the edition */
  contributors: Array<Scalars["String"]["output"]>;
  /** The edition number and name */
  edition?: Maybe<Scalars["String"]["output"]>;
  /** A note about this specific edition */
  note?: Maybe<Scalars["String"]["output"]>;
  /** A year as displayable text and as number */
  publicationYear?: Maybe<PublicationYear>;
  /** Properties 'edition', 'contributorsToEdition' and 'publicationYear' as one string, e.g.: '3. udgave, revideret af Hugin Eide, 2005' */
  summary: Scalars["String"]["output"];
};

export type ElbaServices = {
  __typename?: "ElbaServices";
  placeCopyRequest: CopyRequestResponse;
};

export type ElbaServicesPlaceCopyRequestArgs = {
  dryRun?: InputMaybe<Scalars["Boolean"]["input"]>;
  input: CopyRequestInput;
};

export enum EntryTypeEnum {
  AdditionalEntry = "ADDITIONAL_ENTRY",
  MainEntry = "MAIN_ENTRY",
  NationalBibliographyAdditionalEntry = "NATIONAL_BIBLIOGRAPHY_ADDITIONAL_ENTRY",
  NationalBibliographyEntry = "NATIONAL_BIBLIOGRAPHY_ENTRY"
}

export type Ereol = {
  __typename?: "Ereol";
  /** Is this a manifestation that always can be loaned on ereolen.dk even if you've run out of loans this month */
  canAlwaysBeLoaned: Scalars["Boolean"]["output"];
  /** Notes for the resource */
  note?: Maybe<Scalars["String"]["output"]>;
  /** The origin, e.g. "Ereolen" or "Ereolen Go" */
  origin: Scalars["String"]["output"];
  /** The url where manifestation is located */
  url: Scalars["String"]["output"];
};

/** The supported facet fields */
export enum FacetFieldEnum {
  Accesstypes = "ACCESSTYPES",
  Age = "AGE",
  Canalwaysbeloaned = "CANALWAYSBELOANED",
  Childrenoradults = "CHILDRENORADULTS",
  Creators = "CREATORS",
  Dk5 = "DK5",
  Fictionalcharacters = "FICTIONALCHARACTERS",
  Fictionnonfiction = "FICTIONNONFICTION",
  Gameplatform = "GAMEPLATFORM",
  Generalaudience = "GENERALAUDIENCE",
  Genreandform = "GENREANDFORM",
  Let = "LET",
  Libraryrecommendation = "LIBRARYRECOMMENDATION",
  Lix = "LIX",
  Mainlanguages = "MAINLANGUAGES",
  Materialtypesgeneral = "MATERIALTYPESGENERAL",
  Materialtypesspecific = "MATERIALTYPESSPECIFIC",
  Subjects = "SUBJECTS",
  Worktypes = "WORKTYPES",
  Year = "YEAR"
}

/** The result for a specific facet */
export type FacetResult = {
  __typename?: "FacetResult";
  /** The name of the facet. */
  name: Scalars["String"]["output"];
  /** The enum type of the facet. */
  type: FacetFieldEnum;
  /** The values of thie facet result */
  values: Array<FacetValue>;
};

/** The result for a specific facet */
export type FacetResultValuesArgs = {
  limit: Scalars["Int"]["input"];
};

/** A facet value consists of a term and a count. */
export type FacetValue = {
  __typename?: "FacetValue";
  /** Use the key when applying filters */
  key: Scalars["String"]["output"];
  /** A score indicating relevance */
  score?: Maybe<Scalars["Int"]["output"]>;
  /** A value of a facet field */
  term: Scalars["String"]["output"];
};

export type FictionNonfiction = {
  __typename?: "FictionNonfiction";
  /** Binary code fiction/nonfiction used for filtering */
  code: FictionNonfictionCodeEnum;
  /** Displayable overall category/genre. In Danish skønlitteratur/faglitteratur for literature, fiktion/nonfiktion for other types. */
  display: Scalars["String"]["output"];
};

export enum FictionNonfictionCodeEnum {
  Fiction = "FICTION",
  Nonfiction = "NONFICTION",
  NotSpecified = "NOT_SPECIFIED"
}

export type GeneralMaterialType = {
  __typename?: "GeneralMaterialType";
  /** code for materialType # @TODO - is this a finite list ?? - and where to get it */
  code: GeneralMaterialTypeCodeEnum;
  /** Ths string to display */
  display: Scalars["String"]["output"];
};

export enum GeneralMaterialTypeCodeEnum {
  Articles = "ARTICLES",
  AudioBooks = "AUDIO_BOOKS",
  BoardGames = "BOARD_GAMES",
  Books = "BOOKS",
  Comics = "COMICS",
  ComputerGames = "COMPUTER_GAMES",
  Ebooks = "EBOOKS",
  Films = "FILMS",
  ImageMaterials = "IMAGE_MATERIALS",
  Music = "MUSIC",
  NewspaperJournals = "NEWSPAPER_JOURNALS",
  Other = "OTHER",
  Podcasts = "PODCASTS",
  SheetMusic = "SHEET_MUSIC",
  TvSeries = "TV_SERIES"
}

export enum HoldingsStatusEnum {
  /** Holding is on loan */
  Onloan = "ONLOAN",
  /** Holding is physically available at the branch */
  Onshelf = "ONSHELF"
}

export type HostPublication = {
  __typename?: "HostPublication";
  /** Creator of the host publication if host publication is book */
  creator?: Maybe<Scalars["String"]["output"]>;
  /** Edition statement for the host publication */
  edition?: Maybe<Scalars["String"]["output"]>;
  /** ISBN of the publication this manifestation can be found in */
  isbn?: Maybe<Scalars["String"]["output"]>;
  /** ISSN of the publication this manifestation can be found in */
  issn?: Maybe<Scalars["String"]["output"]>;
  /** The issue of the publication this manifestation can be found in */
  issue?: Maybe<Scalars["String"]["output"]>;
  /** Notes about the publication where this manifestation can be found in */
  notes?: Maybe<Array<Scalars["String"]["output"]>>;
  /** The pages in the publication where this manifestation can be found in */
  pages?: Maybe<Scalars["String"]["output"]>;
  /** The publisher of the publication where this manifestation can be found in */
  publisher?: Maybe<Scalars["String"]["output"]>;
  /** Series of the publication this manifestation can be found in */
  series?: Maybe<Series>;
  /** All details about the publication this manifestation can be found in */
  summary: Scalars["String"]["output"];
  /** Publication this manifestation can be found in */
  title: Scalars["String"]["output"];
  /** The publication year of the publication this manifestation can be found in */
  year?: Maybe<PublicationYear>;
};

export type Identifier = {
  __typename?: "Identifier";
  /** The type of identifier */
  type: IdentifierTypeEnum;
  /** The actual identifier */
  value: Scalars["String"]["output"];
};

export enum IdentifierTypeEnum {
  Barcode = "BARCODE",
  Doi = "DOI",
  Isbn = "ISBN",
  Ismn = "ISMN",
  Issn = "ISSN",
  Movie = "MOVIE",
  Music = "MUSIC",
  NotSpecified = "NOT_SPECIFIED",
  OrderNumber = "ORDER_NUMBER",
  Publizon = "PUBLIZON",
  Upc = "UPC",
  Uri = "URI"
}

export type InfomediaArticle = {
  __typename?: "InfomediaArticle";
  byLine?: Maybe<Scalars["String"]["output"]>;
  dateLine?: Maybe<Scalars["String"]["output"]>;
  headLine?: Maybe<Scalars["String"]["output"]>;
  hedLine?: Maybe<Scalars["String"]["output"]>;
  html?: Maybe<Scalars["String"]["output"]>;
  id: Scalars["String"]["output"];
  logo?: Maybe<Scalars["String"]["output"]>;
  paper?: Maybe<Scalars["String"]["output"]>;
  subHeadLine?: Maybe<Scalars["String"]["output"]>;
  text?: Maybe<Scalars["String"]["output"]>;
};

export enum InfomediaErrorEnum {
  BorrowercheckNotAllowed = "BORROWERCHECK_NOT_ALLOWED",
  BorrowerNotFound = "BORROWER_NOT_FOUND",
  BorrowerNotInMunicipality = "BORROWER_NOT_IN_MUNICIPALITY",
  BorrowerNotLoggedIn = "BORROWER_NOT_LOGGED_IN",
  ErrorInRequest = "ERROR_IN_REQUEST",
  InternalServerError = "INTERNAL_SERVER_ERROR",
  LibraryNotFound = "LIBRARY_NOT_FOUND",
  NoAgencyid = "NO_AGENCYID",
  ServiceNotLicensed = "SERVICE_NOT_LICENSED",
  ServiceUnavailable = "SERVICE_UNAVAILABLE"
}

export type InfomediaResponse = {
  __typename?: "InfomediaResponse";
  article?: Maybe<InfomediaArticle>;
  /** Infomedia error */
  error?: Maybe<InfomediaErrorEnum>;
};

export type InfomediaService = {
  __typename?: "InfomediaService";
  /** Infomedia ID which can be used to fetch article through Infomedia Service */
  id: Scalars["String"]["output"];
};

export type InterLibraryLoan = {
  __typename?: "InterLibraryLoan";
  /** Is newly added - nice to know if there are no localizations */
  accessNew: Scalars["Boolean"]["output"];
  /** Is true when manifestation can be borrowed via ill */
  loanIsPossible: Scalars["Boolean"]["output"];
};

export type ItemIdResponse = {
  __typename?: "ItemIdResponse";
  /** ItemId response object. */
  itemOrderEntity?: Maybe<ItemOrderEntity>;
  /** Message field in case of an error. */
  message?: Maybe<Scalars["String"]["output"]>;
};

export type ItemOrderEntity = {
  __typename?: "ItemOrderEntity";
  /** Item ID, the same value that was queried. */
  itemId: Scalars["String"]["output"];
  /** Key for the row in the database, can be ignored as it's only relevant for ORS. */
  itemOrderKey: Scalars["Int"]["output"];
  /** Order ID associated with the item ID. */
  orderId: Scalars["String"]["output"];
  /** Agency ID of the borrower of the material. */
  requesterId: Scalars["String"]["output"];
  /** Agency ID of the lender of the material. */
  responderId: Scalars["String"]["output"];
  /**
   * Timestamp of when the row was created in the database.
   * Example: "2024-09-09T07:32:24.081+00:00"
   */
  timestamp: Scalars["String"]["output"];
};

export type KidRecommenderTagsInput = {
  tag?: InputMaybe<Scalars["String"]["input"]>;
  weight?: InputMaybe<Scalars["Int"]["input"]>;
};

export type Language = {
  __typename?: "Language";
  /** Language as displayable text */
  display: Scalars["String"]["output"];
  /** ISO639-1 language code (2 letters) */
  iso639Set1: Scalars["String"]["output"];
  /** ISO639-2 language code (3 letters) */
  iso639Set2: Scalars["String"]["output"];
  /** ISO639-2 language code */
  isoCode: Scalars["String"]["output"];
};

export enum LanguageCodeEnum {
  Da = "DA",
  En = "EN"
}

export type Languages = {
  __typename?: "Languages";
  /** Summary/abstract languages of this manifestation, if the manifestation contains short summaries of the content in another language */
  abstract?: Maybe<Array<Language>>;
  /** Main language of this manifestation */
  main?: Maybe<Array<Language>>;
  /** Notes of the languages that describe subtitles, spoken/written (original, dubbed/synchonized), visual interpretation, parallel (notes are written in Danish) */
  notes?: Maybe<Array<Scalars["String"]["output"]>>;
  /** Original language of this manifestation */
  original?: Maybe<Array<Language>>;
  /** Parallel languages of this manifestation, if more languages are printed in the same book */
  parallel?: Maybe<Array<Language>>;
  /** Spoken language in this manifestation e.g. dubbed/syncronized language in movie */
  spoken?: Maybe<Array<Language>>;
  /** Subtitles in this manifestation */
  subtitles?: Maybe<Array<Language>>;
};

export type LevelForAudience = {
  __typename?: "LevelForAudience";
  /** Level expressed as integer on a scale from 1 to 5 */
  difficulty?: Maybe<Scalars["Int"]["output"]>;
  /** Level expressed as integer on a scale from 1 to 5 */
  illustrationsLevel?: Maybe<Scalars["Int"]["output"]>;
  /** Level expressed as integer on a scale from 1 to 5 */
  length?: Maybe<Scalars["Int"]["output"]>;
  /** Level expressed as integer on a scale from 1 to 5 */
  realisticVsFictional?: Maybe<Scalars["Int"]["output"]>;
};

export type LinkCheckResponse = {
  __typename?: "LinkCheckResponse";
  brokenSince?: Maybe<Scalars["DateTime"]["output"]>;
  lastCheckedAt?: Maybe<Scalars["DateTime"]["output"]>;
  status: LinkCheckStatusEnum;
  url: Scalars["String"]["output"];
};

export type LinkCheckService = {
  __typename?: "LinkCheckService";
  checks: Array<LinkCheckResponse>;
};

export type LinkCheckServiceChecksArgs = {
  urls?: InputMaybe<Array<Scalars["String"]["input"]>>;
};

export enum LinkCheckStatusEnum {
  Broken = "BROKEN",
  Gone = "GONE",
  Invalid = "INVALID",
  Ok = "OK"
}

export enum LinkStatusEnum {
  Broken = "BROKEN",
  Gone = "GONE",
  Invalid = "INVALID",
  Ok = "OK"
}

export type LocalSuggestResponse = {
  __typename?: "LocalSuggestResponse";
  result: Array<Suggestion>;
};

export type Manifestation = {
  __typename?: "Manifestation";
  /** Abstract of the entity */
  abstract: Array<Scalars["String"]["output"]>;
  /** Different options to access manifestation */
  access: Array<AccessUnion>;
  /** Access type of this manifestation */
  accessTypes: Array<AccessType>;
  /** Different kinds of definitions of appropriate audience for this manifestation */
  audience?: Maybe<Audience>;
  /** CatalogueCodes divided in codes from the national bibliography and other codes */
  catalogueCodes: CatalogueCodes;
  /** Classification codes for this manifestation from any classification system */
  classifications: Array<Classification>;
  /** Contributors to the manifestation, actors, illustrators etc */
  contributors: Array<CreatorInterface>;
  /** Additional contributors of this manifestation as described on the publication. E.g. 'på dansk ved Vivi Berendt' */
  contributorsFromDescription: Array<Scalars["String"]["output"]>;
  /** Cover for this manifestation */
  cover: Cover;
  /** Primary creators of the manifestation e.g. authors, directors, musicians etc */
  creators: Array<CreatorInterface>;
  /** Additional creators of this manifestation as described on the publication. E.g. 'tekst af William Warren' */
  creatorsFromDescription: Array<Scalars["String"]["output"]>;
  /** The year for the publication of the first edition for this work  */
  dateFirstEdition?: Maybe<PublicationYear>;
  /** Edition details for this manifestation */
  edition?: Maybe<Edition>;
  /** Overall literary category/genre of this manifestation. e.g. fiction or nonfiction. In Danish skønlitteratur/faglitteratur for literature, fiktion/nonfiktion for other types. */
  fictionNonfiction?: Maybe<FictionNonfiction>;
  /** The genre, (literary) form, type etc. of this manifestation */
  genreAndForm: Array<Scalars["String"]["output"]>;
  /** Details about the host publications of this manifestation */
  hostPublication?: Maybe<HostPublication>;
  /** Identifiers for this manifestation - often used for search indexes */
  identifiers: Array<Identifier>;
  /** Languages in this manifestation */
  languages?: Maybe<Languages>;
  /** Details about the latest printing of this manifestation */
  latestPrinting?: Maybe<Printing>;
  /** Tracks on music album, sheet music content, or articles/short stories etc. in this manifestation */
  manifestationParts?: Maybe<ManifestationParts>;
  /** Field for presenting bibliographic records in MARC format */
  marc?: Maybe<MarcRecord>;
  /** The type of material of the manifestation based on bibliotek.dk types */
  materialTypes: Array<MaterialType>;
  /** Notes about the manifestation */
  notes: Array<Note>;
  /** The work that this manifestation is part of */
  ownerWork: Work;
  /** Physical description  of this manifestation like extent (pages/minutes), illustrations etc. */
  physicalDescription?: Maybe<PhysicalUnitDescription>;
  /** Unique identification of the manifestation e.g 870970-basis:54029519 */
  pid: Scalars["String"]["output"];
  /** Publisher of this manifestion */
  publisher: Array<Scalars["String"]["output"]>;
  /** The creation date of the record describing this manifestation in the format YYYYMMDD */
  recordCreationDate: Scalars["String"]["output"];
  /** Notes about relations to this book/periodical/journal, - like previous names or related journals */
  relatedPublications: Array<RelatedPublication>;
  /** Relations to other manifestations */
  relations: Relations;
  /** Some review data, if this manifestation is a review */
  review?: Maybe<ManifestationReview>;
  /** Series for this manifestation */
  series: Array<Series>;
  /** Information about on which shelf in the library this manifestation can be found */
  shelfmark?: Maybe<Shelfmark>;
  /** The source of the manifestation, e.g. own library catalogue (Bibliotekskatalog) or online source e.g. Filmstriben, Ebook Central, eReolen Global etc. */
  source: Array<Scalars["String"]["output"]>;
  /** Subjects for this manifestation */
  subjects: SubjectContainer;
  /** Quotation of the manifestation's table of contents or a similar content list */
  tableOfContents?: Maybe<TableOfContent>;
  /** Different kinds of titles for this work */
  titles: ManifestationTitles;
  /**
   * A unique identifier for tracking user interactions with this manifestation.
   * It is generated in the response and should be included in subsequent
   * API calls when this manifestation is selected.
   */
  traceId: Scalars["String"]["output"];
  /** id of the manifestaion unit */
  unit?: Maybe<Unit>;
  /** Universes for this manifestation */
  universes: Array<Universe>;
  /** Information about on which volume this manifestation is in multi volume work */
  volume?: Maybe<Scalars["String"]["output"]>;
  /** Worktypes for this manifestations work */
  workTypes: Array<WorkTypeEnum>;
  /** The year this manifestation was originally published or produced */
  workYear?: Maybe<PublicationYear>;
};

export type ManifestationPart = {
  __typename?: "ManifestationPart";
  /** Classification of this entry (music track or literary analysis) */
  classifications: Array<Classification>;
  /** Contributors from description - additional contributor to this entry */
  contributorsFromDescription: Array<Scalars["String"]["output"]>;
  /** The creator of the music track or literary analysis */
  creators: Array<CreatorInterface>;
  /** Additional creator or contributor to this entry (music track or literary analysis) as described on the publication. E.g. 'arr.: H. Cornell' */
  creatorsFromDescription: Array<Scalars["String"]["output"]>;
  /** The playing time for this specific part (i.e. the duration of a music track)  */
  playingTime?: Maybe<Scalars["String"]["output"]>;
  /** Subjects of this entry (music track or literary analysis) */
  subjects?: Maybe<Array<SubjectInterface>>;
  /** The title of the entry (music track or title of a literary analysis) */
  title: Scalars["String"]["output"];
};

export enum ManifestationPartTypeEnum {
  MusicTracks = "MUSIC_TRACKS",
  NotSpecified = "NOT_SPECIFIED",
  PartsOfBook = "PARTS_OF_BOOK",
  SheetMusicContent = "SHEET_MUSIC_CONTENT"
}

export type ManifestationParts = {
  __typename?: "ManifestationParts";
  /** Heading for the music content note */
  heading?: Maybe<Scalars["String"]["output"]>;
  /** The creator and title etc of the individual parts */
  parts: Array<ManifestationPart>;
  /** The type of manifestation parts, is this music tracks, book parts etc. */
  type: ManifestationPartTypeEnum;
};

export type ManifestationReview = {
  __typename?: "ManifestationReview";
  rating?: Maybe<Scalars["String"]["output"]>;
  reviewByLibrarians?: Maybe<Array<Maybe<ReviewElement>>>;
};

export type ManifestationTitles = {
  __typename?: "ManifestationTitles";
  /** Alternative titles for this manifestation e.g. a title in a different language */
  alternative: Array<Scalars["String"]["output"]>;
  /** The full title(s) of the manifestation including subtitles etc */
  full: Array<Scalars["String"]["output"]>;
  /** Information that distinguishes this manifestation from a similar manifestation with same title, e.g. 'illustrated by Ted Kirby' */
  identifyingAddition?: Maybe<Scalars["String"]["output"]>;
  /** The main title(s) of the work */
  main: Array<Scalars["String"]["output"]>;
  /** The title of the work that this expression/manifestation is translated from or based on. The original title(s) of a film which has a different distribution title. */
  original?: Maybe<Array<Scalars["String"]["output"]>>;
  /** Titles (in other languages) parallel to the main 'title' of the manifestation */
  parallel: Array<Scalars["String"]["output"]>;
  /** The sorted title of the entity */
  sort: Scalars["String"]["output"];
  /** The standard title of the entity, used for music and movies */
  standard?: Maybe<Scalars["String"]["output"]>;
  /** The title of the entity with the language of the entity in parenthesis after. This field is only generated for non-danish titles. */
  titlePlusLanguage?: Maybe<Scalars["String"]["output"]>;
  /** Danish translation of the main title */
  translated?: Maybe<Array<Scalars["String"]["output"]>>;
  /** detailed title for tv series  */
  tvSeries?: Maybe<TvSeries>;
};

export type Manifestations = {
  __typename?: "Manifestations";
  all: Array<Manifestation>;
  bestRepresentation: Manifestation;
  first: Manifestation;
  latest: Manifestation;
  mostRelevant: Array<Manifestation>;
};

export type Marc = {
  __typename?: "Marc";
  /** Gets the MARC record collection for the given record identifier, containing either standalone or head and/or section and volume records. */
  getMarcByRecordId?: Maybe<MarcRecord>;
};

export type MarcGetMarcByRecordIdArgs = {
  recordId: Scalars["String"]["input"];
};

export type MarcRecord = {
  __typename?: "MarcRecord";
  /** The library agency */
  agencyId: Scalars["String"]["output"];
  /** The bibliographic record identifier */
  bibliographicRecordId: Scalars["String"]["output"];
  /** The MARC record collection content as marcXchange XML string */
  content: Scalars["String"]["output"];
  /** The serialization format of the MARC record content. Defaults to 'marcXchange' */
  contentSerializationFormat: Scalars["String"]["output"];
  /** Flag indicating whether or not the record is deleted */
  deleted: Scalars["Boolean"]["output"];
  /** The marc record identifier */
  id: Scalars["String"]["output"];
};

export type MaterialType = {
  __typename?: "MaterialType";
  /** jed 1.1 - the general materialtype */
  materialTypeGeneral: GeneralMaterialType;
  /** jed 1.1 - the specific materialtType */
  materialTypeSpecific: SpecificMaterialType;
};

export type MediaCouncilAgeRestriction = {
  __typename?: "MediaCouncilAgeRestriction";
  /** Display string for minimum age */
  display?: Maybe<Scalars["String"]["output"]>;
  /** Minimum age */
  minimumAge?: Maybe<Scalars["Int"]["output"]>;
};

export type Mood = SubjectInterface & {
  __typename?: "Mood";
  display: Scalars["String"]["output"];
  language?: Maybe<Language>;
  local?: Maybe<Scalars["Boolean"]["output"]>;
  type: SubjectTypeEnum;
};

export type MoodKidsRecommendFiltersInput = {
  difficulty?: InputMaybe<Array<Scalars["Int"]["input"]>>;
  fictionNonfiction?: InputMaybe<FictionNonfictionCodeEnum>;
  illustrationsLevel?: InputMaybe<Array<Scalars["Int"]["input"]>>;
  length?: InputMaybe<Array<Scalars["Int"]["input"]>>;
  realisticVsFictional?: InputMaybe<Array<Scalars["Int"]["input"]>>;
};

export type MoodQueries = {
  __typename?: "MoodQueries";
  moodRecommendKids: MoodRecommendKidsResponse;
  moodSearch: MoodSearchResponse;
  moodSearchKids: MoodSearchKidsResponse;
  moodSuggest: MoodSuggestResponse;
  moodTagRecommend: Array<Maybe<MoodTagRecommendResponse>>;
  moodWorkRecommend: Array<Maybe<MoodTagRecommendResponse>>;
};

export type MoodQueriesMoodRecommendKidsArgs = {
  dislikes?: InputMaybe<Array<Scalars["String"]["input"]>>;
  filters?: InputMaybe<MoodKidsRecommendFiltersInput>;
  limit?: InputMaybe<Scalars["Int"]["input"]>;
  offset?: InputMaybe<Scalars["Int"]["input"]>;
  tags?: InputMaybe<Array<KidRecommenderTagsInput>>;
  work?: InputMaybe<Scalars["String"]["input"]>;
};

export type MoodQueriesMoodSearchArgs = {
  field?: InputMaybe<MoodSearchFieldValuesEnum>;
  limit?: InputMaybe<Scalars["Int"]["input"]>;
  offset?: InputMaybe<Scalars["Int"]["input"]>;
  q: Scalars["String"]["input"];
};

export type MoodQueriesMoodSearchKidsArgs = {
  field?: InputMaybe<MoodSearchFieldValuesEnum>;
  limit?: InputMaybe<Scalars["Int"]["input"]>;
  offset?: InputMaybe<Scalars["Int"]["input"]>;
  q: Scalars["String"]["input"];
};

export type MoodQueriesMoodSuggestArgs = {
  limit?: InputMaybe<Scalars["Int"]["input"]>;
  q: Scalars["String"]["input"];
};

export type MoodQueriesMoodTagRecommendArgs = {
  hasCover?: InputMaybe<Scalars["Boolean"]["input"]>;
  limit?: InputMaybe<Scalars["Int"]["input"]>;
  minus?: InputMaybe<Array<Scalars["String"]["input"]>>;
  plus?: InputMaybe<Array<Scalars["String"]["input"]>>;
  tags: Array<Scalars["String"]["input"]>;
};

export type MoodQueriesMoodWorkRecommendArgs = {
  dislikes?: InputMaybe<Array<Scalars["String"]["input"]>>;
  hasCover?: InputMaybe<Scalars["Boolean"]["input"]>;
  likes: Array<Scalars["String"]["input"]>;
  limit?: InputMaybe<Scalars["Int"]["input"]>;
  maxAuthorRecommendations?: InputMaybe<Scalars["Int"]["input"]>;
  offset?: InputMaybe<Scalars["Int"]["input"]>;
  threshold?: InputMaybe<Scalars["Float"]["input"]>;
};

/** The reponse from moodrecommenkids */
export type MoodRecommendKidsResponse = {
  __typename?: "MoodRecommendKidsResponse";
  works: Array<Work>;
};

/** The reponse from moodrecommenkids */
export type MoodRecommendKidsResponseWorksArgs = {
  limit: Scalars["PaginationLimitScalar"]["input"];
  offset: Scalars["Int"]["input"];
};

/** Supported fields for moodsearch request */
export enum MoodSearchFieldValuesEnum {
  All = "ALL",
  Alltags = "ALLTAGS",
  Creator = "CREATOR",
  Moodtags = "MOODTAGS",
  Title = "TITLE"
}

/** The reponse from moodsearchkids */
export type MoodSearchKidsResponse = {
  __typename?: "MoodSearchKidsResponse";
  works: Array<Work>;
};

/** The reponse from moodsearchkids */
export type MoodSearchKidsResponseWorksArgs = {
  limit: Scalars["PaginationLimitScalar"]["input"];
  offset: Scalars["Int"]["input"];
};

/** The response from moodsearch */
export type MoodSearchResponse = {
  __typename?: "MoodSearchResponse";
  /** The works matching the given search query. Use offset and limit for pagination. */
  works: Array<Work>;
};

/** The response from moodsearch */
export type MoodSearchResponseWorksArgs = {
  limit: Scalars["PaginationLimitScalar"]["input"];
  offset: Scalars["Int"]["input"];
};

/** Type of moodSuggest response */
export enum MoodSuggestEnum {
  Creator = "CREATOR",
  Tag = "TAG",
  Title = "TITLE"
}

/** MoodSuggest item */
export type MoodSuggestItem = {
  __typename?: "MoodSuggestItem";
  /** Suggestion */
  term: Scalars["String"]["output"];
  /** The type of suggestion title/creator/tag */
  type: MoodSuggestEnum;
  /** A work associated with the suggestion */
  work?: Maybe<Work>;
};

/** The response type for moodSuggest */
export type MoodSuggestResponse = {
  __typename?: "MoodSuggestResponse";
  /** Response is an array of MoodSuggestResponse */
  response: Array<MoodSuggestItem>;
};

/** Response type for moodTagRecommend */
export type MoodTagRecommendResponse = {
  __typename?: "MoodTagRecommendResponse";
  similarity?: Maybe<Scalars["Float"]["output"]>;
  work: Work;
};

export type Mutation = {
  __typename?: "Mutation";
  elba: ElbaServices;
  submitOrder?: Maybe<SubmitOrder>;
};

export type MutationSubmitOrderArgs = {
  dryRun?: InputMaybe<Scalars["Boolean"]["input"]>;
  input: SubmitOrderInput;
};

export type NarrativeTechnique = SubjectInterface & {
  __typename?: "NarrativeTechnique";
  display: Scalars["String"]["output"];
  language?: Maybe<Language>;
  local?: Maybe<Scalars["Boolean"]["output"]>;
  type: SubjectTypeEnum;
};

export type Note = {
  __typename?: "Note";
  /** The actual notes */
  display: Array<Scalars["String"]["output"]>;
  /** Heading before note */
  heading?: Maybe<Scalars["String"]["output"]>;
  /** The type of note - e.g. note about language, genre etc, NOT_SPECIFIED if not known.  */
  type: NoteTypeEnum;
};

export enum NoteTypeEnum {
  ConnectionToOtherWorks = "CONNECTION_TO_OTHER_WORKS",
  DescriptionOfMaterial = "DESCRIPTION_OF_MATERIAL",
  Dissertation = "DISSERTATION",
  Edition = "EDITION",
  EstimatedPlayingTimeForGames = "ESTIMATED_PLAYING_TIME_FOR_GAMES",
  ExpectedPublicationDate = "EXPECTED_PUBLICATION_DATE",
  Frequency = "FREQUENCY",
  MusicalEnsembleOrCast = "MUSICAL_ENSEMBLE_OR_CAST",
  NotSpecified = "NOT_SPECIFIED",
  OccasionForPublication = "OCCASION_FOR_PUBLICATION",
  OriginalTitle = "ORIGINAL_TITLE",
  OriginalVersion = "ORIGINAL_VERSION",
  References = "REFERENCES",
  RestrictionsOnUse = "RESTRICTIONS_ON_USE",
  TechnicalRequirements = "TECHNICAL_REQUIREMENTS",
  TypeOfScore = "TYPE_OF_SCORE"
}

export enum OrderTypeEnum {
  Estimate = "ESTIMATE",
  Hold = "HOLD",
  Loan = "LOAN",
  NonReturnableCopy = "NON_RETURNABLE_COPY",
  Normal = "NORMAL",
  StackRetrieval = "STACK_RETRIEVAL"
}

export type OrsQuery = {
  __typename?: "OrsQuery";
  /** Method to retrieve sender and receiver information from ORS based on an itemId. */
  itemOrder: ItemIdResponse;
};

export type OrsQueryItemOrderArgs = {
  itemId: Scalars["String"]["input"];
};

export type Pegi = {
  __typename?: "PEGI";
  /** Display string for PEGI minimum age */
  display?: Maybe<Scalars["String"]["output"]>;
  /** Minimum age to play the game. PEGI rating */
  minimumAge?: Maybe<Scalars["Int"]["output"]>;
};

export type Person = CreatorInterface &
  SubjectInterface & {
    __typename?: "Person";
    /** Creator aliases, creators behind used pseudonym */
    aliases: Array<Person>;
    /** Added information about the person, like Henri, konge af Frankrig */
    attributeToName?: Maybe<Scalars["String"]["output"]>;
    /** Birth year of the person */
    birthYear?: Maybe<Scalars["String"]["output"]>;
    /** The person's whole name in normal order */
    display: Scalars["String"]["output"];
    /** First name of the person */
    firstName?: Maybe<Scalars["String"]["output"]>;
    language?: Maybe<Language>;
    /** Last name of the person */
    lastName?: Maybe<Scalars["String"]["output"]>;
    local?: Maybe<Scalars["Boolean"]["output"]>;
    /** The person's full name inverted */
    nameSort: Scalars["String"]["output"];
    /** A list of which kinds of contributions this person made to this creation */
    roles: Array<Role>;
    /** A roman numeral added to the person, like Christian IV */
    romanNumeral?: Maybe<Scalars["String"]["output"]>;
    type: SubjectTypeEnum;
  };

export type PhysicalUnitDescription = {
  __typename?: "PhysicalUnitDescription";
  /** Material that comes with the manifestation (bilag) */
  accompanyingMaterial?: Maybe<Scalars["String"]["output"]>;
  /** List of units contained within the material */
  materialUnits?: Maybe<Array<UnitDescription>>;
  /** Number of pages of the manifestation as number */
  numberOfPages?: Maybe<Scalars["Int"]["output"]>;
  /** A summary of the physical description of this manifestation like extent (pages/minutes), illustrations etc. */
  summaryFull?: Maybe<Scalars["String"]["output"]>;
};

export type Players = {
  __typename?: "Players";
  /** Number of players interval begin. */
  begin?: Maybe<Scalars["Int"]["output"]>;
  /** Display name for the number of players. */
  display?: Maybe<Scalars["String"]["output"]>;
  /** Number of players interval end. */
  end?: Maybe<Scalars["Int"]["output"]>;
};

export type Printing = {
  __typename?: "Printing";
  /** The printing number and name */
  printing: Scalars["String"]["output"];
  /** A year as displayable text and as number */
  publicationYear?: Maybe<PublicationYear>;
  /** Publisher of printing when other than the original publisher of the edition (260*b) */
  publisher?: Maybe<Scalars["String"]["output"]>;
  /** Properties 'printing' and 'publicationYear' as one string, e.g.: '11. oplag, 2020' */
  summary: Scalars["String"]["output"];
};

export type PublicationYear = {
  __typename?: "PublicationYear";
  display: Scalars["String"]["output"];
  endYear?: Maybe<Scalars["Int"]["output"]>;
  frequency?: Maybe<Scalars["String"]["output"]>;
  year?: Maybe<Scalars["Int"]["output"]>;
};

export type Query = {
  __typename?: "Query";
  complexSearch: ComplexSearchResponse;
  complexSuggest: ComplexSuggestResponse;
  debug?: Maybe<Debug>;
  infomedia: InfomediaResponse;
  linkCheck: LinkCheckService;
  localSuggest: LocalSuggestResponse;
  manifestation?: Maybe<Manifestation>;
  manifestations: Array<Maybe<Manifestation>>;
  /** Field for presenting bibliographic records in MARC format */
  marc: Marc;
  mood: MoodQueries;
  ors: OrsQuery;
  /** Get recommendations */
  recommend: RecommendationResponse;
  refWorks: Scalars["String"]["output"];
  relatedSubjects?: Maybe<Array<Scalars["String"]["output"]>>;
  ris: Scalars["String"]["output"];
  search: SearchResponse;
  series?: Maybe<Series>;
  suggest: SuggestResponse;
  universe?: Maybe<Universe>;
  work?: Maybe<Work>;
  works: Array<Maybe<Work>>;
};

export type QueryComplexSearchArgs = {
  cql: Scalars["String"]["input"];
  facets?: InputMaybe<ComplexSearchFacetsInput>;
  filters?: InputMaybe<ComplexSearchFiltersInput>;
};

export type QueryComplexSuggestArgs = {
  q: Scalars["String"]["input"];
  type: ComplexSuggestionTypeEnum;
};

export type QueryInfomediaArgs = {
  id: Scalars["String"]["input"];
};

export type QueryLocalSuggestArgs = {
  branchId?: InputMaybe<Scalars["String"]["input"]>;
  limit?: InputMaybe<Scalars["Int"]["input"]>;
  q: Scalars["String"]["input"];
  suggestType?: InputMaybe<Array<SuggestionTypeEnum>>;
};

export type QueryManifestationArgs = {
  faust?: InputMaybe<Scalars["String"]["input"]>;
  pid?: InputMaybe<Scalars["String"]["input"]>;
};

export type QueryManifestationsArgs = {
  faust?: InputMaybe<Array<Scalars["String"]["input"]>>;
  pid?: InputMaybe<Array<Scalars["String"]["input"]>>;
};

export type QueryRecommendArgs = {
  branchId?: InputMaybe<Scalars["String"]["input"]>;
  faust?: InputMaybe<Scalars["String"]["input"]>;
  id?: InputMaybe<Scalars["String"]["input"]>;
  limit?: InputMaybe<Scalars["Int"]["input"]>;
  pid?: InputMaybe<Scalars["String"]["input"]>;
};

export type QueryRefWorksArgs = {
  pids: Array<Scalars["String"]["input"]>;
};

export type QueryRelatedSubjectsArgs = {
  limit?: InputMaybe<Scalars["Int"]["input"]>;
  q: Array<Scalars["String"]["input"]>;
};

export type QueryRisArgs = {
  pids: Array<Scalars["String"]["input"]>;
};

export type QuerySearchArgs = {
  filters?: InputMaybe<SearchFiltersInput>;
  q: SearchQueryInput;
  search_exact?: InputMaybe<Scalars["Boolean"]["input"]>;
};

export type QuerySeriesArgs = {
  seriesId: Scalars["String"]["input"];
};

export type QuerySuggestArgs = {
  limit?: InputMaybe<Scalars["Int"]["input"]>;
  q: Scalars["String"]["input"];
  suggestType?: InputMaybe<SuggestionTypeEnum>;
  suggestTypes?: InputMaybe<Array<SuggestionTypeEnum>>;
  workType?: InputMaybe<WorkTypeEnum>;
};

export type QueryUniverseArgs = {
  key?: InputMaybe<Scalars["String"]["input"]>;
  universeId?: InputMaybe<Scalars["String"]["input"]>;
};

export type QueryWorkArgs = {
  faust?: InputMaybe<Scalars["String"]["input"]>;
  id?: InputMaybe<Scalars["String"]["input"]>;
  language?: InputMaybe<LanguageCodeEnum>;
  oclc?: InputMaybe<Scalars["String"]["input"]>;
  pid?: InputMaybe<Scalars["String"]["input"]>;
};

export type QueryWorksArgs = {
  faust?: InputMaybe<Array<Scalars["String"]["input"]>>;
  id?: InputMaybe<Array<Scalars["String"]["input"]>>;
  language?: InputMaybe<LanguageCodeEnum>;
  oclc?: InputMaybe<Array<Scalars["String"]["input"]>>;
  pid?: InputMaybe<Array<Scalars["String"]["input"]>>;
};

export type Range = {
  __typename?: "Range";
  begin?: Maybe<Scalars["Int"]["output"]>;
  display: Scalars["String"]["output"];
  end?: Maybe<Scalars["Int"]["output"]>;
};

export type Recommendation = {
  __typename?: "Recommendation";
  /** The recommended manifestation */
  manifestation: Manifestation;
  /** Info on how this recommendation was generated */
  reader: Array<Scalars["String"]["output"]>;
  /** The recommended work */
  work: Work;
};

export type RecommendationResponse = {
  __typename?: "RecommendationResponse";
  result: Array<Recommendation>;
};

export type RelatedPublication = {
  __typename?: "RelatedPublication";
  /** Faust of the related publication */
  faust?: Maybe<Scalars["String"]["output"]>;
  /** Notes describing the relation of the related periodical/journal/publication */
  heading: Scalars["String"]["output"];
  /** ISBN of the related publication */
  isbn?: Maybe<Scalars["String"]["output"]>;
  /** ISSN of the related periodical/journal/publication */
  issn?: Maybe<Scalars["String"]["output"]>;
  /** Title of the related periodical/journal */
  title: Array<Scalars["String"]["output"]>;
  /** URL of the related publication */
  url?: Maybe<Scalars["String"]["output"]>;
  /** Note regarding the URL of the related publication */
  urlText?: Maybe<Scalars["String"]["output"]>;
};

export type Relations = {
  __typename?: "Relations";
  /** The story of this article is continued in this or these other article(s) */
  continuedIn: Array<Manifestation>;
  /** This story of this article actually started in this or these other article(s) */
  continues: Array<Manifestation>;
  /** The contents of this articles is also discussed in these articles */
  discussedIn: Array<Manifestation>;
  /** The article discusses the content of these articles */
  discusses: Array<Manifestation>;
  /** This story is adapted in this or these movie(s) */
  hasAdaptation: Array<Manifestation>;
  /** The contents of this manifestation is analysed in these manifestations */
  hasAnalysis: Array<Manifestation>;
  /** The creator of this manifestation is portrayed in these manifestations */
  hasCreatorDescription: Array<Manifestation>;
  /** The publisher of this manifestation has made a description of the content */
  hasDescriptionFromPublisher: Array<Manifestation>;
  /** This movie is based on this manuscript */
  hasManuscript: Array<Manifestation>;
  /** This manifestation has a 'materialevurdering' that was originally made for another manifestation, but it is still relevant (e.g. book/ebook) */
  hasReusedReview: Array<Manifestation>;
  /** This manifestation has these reviews */
  hasReview: Array<Manifestation>;
  /** This movie or game has this sound track */
  hasSoundtrack: Array<Manifestation>;
  /** This album has these tracks */
  hasTrack: Array<Manifestation>;
  /** This movie is based on this or these books */
  isAdaptationOf: Array<Manifestation>;
  /** This manifestation is an analysis of these manifestations */
  isAnalysisOf: Array<Manifestation>;
  /** This is a description from the original publisher of these manifestations */
  isDescriptionFromPublisherOf: Array<Manifestation>;
  /** This movie is based on this manuscript */
  isManuscriptOf: Array<Manifestation>;
  /** This music track is part of these albums */
  isPartOfAlbum: Array<Manifestation>;
  /** This article or book part can be found in these manifestations */
  isPartOfManifestation: Array<Manifestation>;
  /** This 'materialevurdering' can also be used to review these relevant manifestations, even though it was originally made for another publication */
  isReusedReviewOf: Array<Manifestation>;
  /** This manifestation is a review of these manifestations */
  isReviewOf: Array<Manifestation>;
  /** This sound track for a game is related to these games */
  isSoundtrackOfGame: Array<Manifestation>;
  /** This sound track for a movie is related to these movies */
  isSoundtrackOfMovie: Array<Manifestation>;
};

export type ReviewElement = {
  __typename?: "ReviewElement";
  content?: Maybe<Scalars["String"]["output"]>;
  /**
   * This is a paragraph containing markup where links to manifestations
   * can be inserted. For instance '"Axel Steens nye job minder om [870970-basis:20307021] fra ...'.
   * Relevant manifestations are located in the manifestations field.
   */
  contentSubstitute?: Maybe<Scalars["String"]["output"]>;
  heading?: Maybe<Scalars["String"]["output"]>;
  /** Manifestations that can be used to generate and insert links into 'contentSubsitute'. */
  manifestations?: Maybe<Array<Maybe<Manifestation>>>;
  type?: Maybe<ReviewElementTypeEnum>;
};

export enum ReviewElementTypeEnum {
  Abstract = "ABSTRACT",
  AcquisitionRecommendations = "ACQUISITION_RECOMMENDATIONS",
  Audience = "AUDIENCE",
  Conclusion = "CONCLUSION",
  Description = "DESCRIPTION",
  Evaluation = "EVALUATION",
  SimilarMaterials = "SIMILAR_MATERIALS"
}

export type Role = {
  __typename?: "Role";
  /** The type of creator/contributor as text in singular and plural in Danish, e.g. forfatter/forfattere, komponist/komponister etc */
  function: Translation;
  /** The code for the type of creator or contributor, e.g. 'aut' for author, 'ill' for illustrator etc */
  functionCode: Scalars["String"]["output"];
};

export type SchoolUse = {
  __typename?: "SchoolUse";
  code: SchoolUseCodeEnum;
  display: Scalars["String"]["output"];
};

export enum SchoolUseCodeEnum {
  ForSchoolUse = "FOR_SCHOOL_USE",
  ForTeacher = "FOR_TEACHER"
}

/** Search Filters */
export type SearchFiltersInput = {
  accessTypes?: InputMaybe<Array<Scalars["String"]["input"]>>;
  age?: InputMaybe<Array<Scalars["String"]["input"]>>;
  ageRange?: InputMaybe<Array<Scalars["String"]["input"]>>;
  branchId?: InputMaybe<Array<Scalars["String"]["input"]>>;
  canAlwaysBeLoaned?: InputMaybe<Array<Scalars["String"]["input"]>>;
  childrenOrAdults?: InputMaybe<Array<Scalars["String"]["input"]>>;
  creators?: InputMaybe<Array<Scalars["String"]["input"]>>;
  department?: InputMaybe<Array<Scalars["String"]["input"]>>;
  dk5?: InputMaybe<Array<Scalars["String"]["input"]>>;
  fictionNonfiction?: InputMaybe<Array<Scalars["String"]["input"]>>;
  fictionalCharacters?: InputMaybe<Array<Scalars["String"]["input"]>>;
  gamePlatform?: InputMaybe<Array<Scalars["String"]["input"]>>;
  generalAudience?: InputMaybe<Array<Scalars["String"]["input"]>>;
  genreAndForm?: InputMaybe<Array<Scalars["String"]["input"]>>;
  letRange?: InputMaybe<Array<Scalars["String"]["input"]>>;
  libraryRecommendation?: InputMaybe<Array<Scalars["String"]["input"]>>;
  lixRange?: InputMaybe<Array<Scalars["String"]["input"]>>;
  location?: InputMaybe<Array<Scalars["String"]["input"]>>;
  mainLanguages?: InputMaybe<Array<Scalars["String"]["input"]>>;
  materialTypesGeneral?: InputMaybe<Array<Scalars["String"]["input"]>>;
  materialTypesSpecific?: InputMaybe<Array<Scalars["String"]["input"]>>;
  status?: InputMaybe<Array<HoldingsStatusEnum>>;
  subjects?: InputMaybe<Array<Scalars["String"]["input"]>>;
  sublocation?: InputMaybe<Array<Scalars["String"]["input"]>>;
  workTypes?: InputMaybe<Array<Scalars["String"]["input"]>>;
  year?: InputMaybe<Array<Scalars["String"]["input"]>>;
};

/** The supported fields to query */
export type SearchQueryInput = {
  /**
   * Search for title, creator, subject or a combination.
   * This is typically used where a single search box is desired.
   */
  all?: InputMaybe<Scalars["String"]["input"]>;
  /** Search for creator */
  creator?: InputMaybe<Scalars["String"]["input"]>;
  /** Search for specific subject */
  subject?: InputMaybe<Scalars["String"]["input"]>;
  /** Search for specific title */
  title?: InputMaybe<Scalars["String"]["input"]>;
};

/** The simple search response */
export type SearchResponse = {
  __typename?: "SearchResponse";
  /** A list of alternative search queries */
  didYouMean: Array<DidYouMean>;
  /**
   * Make sure only to fetch this when needed
   * This may take seconds to complete
   */
  facets: Array<FacetResult>;
  /** Total number of works found. May be used for pagination. */
  hitcount: Scalars["Int"]["output"];
  /** Will return the facets that best match the input query and filters */
  intelligentFacets: Array<FacetResult>;
  /** The works matching the given search query. Use offset and limit for pagination. */
  works: Array<Work>;
};

/** The simple search response */
export type SearchResponseDidYouMeanArgs = {
  limit?: InputMaybe<Scalars["Int"]["input"]>;
};

/** The simple search response */
export type SearchResponseFacetsArgs = {
  facets: Array<FacetFieldEnum>;
};

/** The simple search response */
export type SearchResponseIntelligentFacetsArgs = {
  limit?: InputMaybe<Scalars["Int"]["input"]>;
};

/** The simple search response */
export type SearchResponseWorksArgs = {
  limit: Scalars["PaginationLimitScalar"]["input"];
  offset: Scalars["Int"]["input"];
};

export type SerieWork = {
  __typename?: "SerieWork";
  /** The number of work in the series as a number (as text) */
  numberInSeries?: Maybe<Scalars["String"]["output"]>;
  /** Information about whether this work in the series should be read first */
  readThisFirst?: Maybe<Scalars["Boolean"]["output"]>;
  /** Information about whether this work in the series can be read without considering the order of the series, it can be read at any time */
  readThisWhenever?: Maybe<Scalars["Boolean"]["output"]>;
  /** Work of a serieWork */
  work: Work;
};

export type Series = {
  __typename?: "Series";
  /** A alternative title to the main 'title' of the series */
  alternativeTitles: Array<Scalars["String"]["output"]>;
  /** Description of the series */
  description?: Maybe<Scalars["String"]["output"]>;
  /** Additional information  */
  identifyingAddition?: Maybe<Scalars["String"]["output"]>;
  /** Whether this is a popular series or general series */
  isPopular?: Maybe<Scalars["Boolean"]["output"]>;
  /** MainLanguages of the series */
  mainLanguages: Array<Scalars["String"]["output"]>;
  /** Members of this serie.  */
  members: Array<SerieWork>;
  /** The number in the series as text qoutation */
  numberInSeries?: Maybe<Scalars["String"]["output"]>;
  /** A parallel title to the main 'title' of the series, in a different language */
  parallelTitles: Array<Scalars["String"]["output"]>;
  /** Information about whether this work in the series should be read first */
  readThisFirst?: Maybe<Scalars["Boolean"]["output"]>;
  /** Information about whether this work in the series can be read without considering the order of the series, it can be read at any time */
  readThisWhenever?: Maybe<Scalars["Boolean"]["output"]>;
  /** Identifier for the series */
  seriesId?: Maybe<Scalars["String"]["output"]>;
  /** The title of the series */
  title: Scalars["String"]["output"];
  /** WorkTypes for the series */
  workTypes: Array<Scalars["String"]["output"]>;
};

export type SeriesMembersArgs = {
  limit?: InputMaybe<Scalars["Int"]["input"]>;
  offset?: InputMaybe<Scalars["Int"]["input"]>;
};

export type Setting = SubjectInterface & {
  __typename?: "Setting";
  display: Scalars["String"]["output"];
  language?: Maybe<Language>;
  local?: Maybe<Scalars["Boolean"]["output"]>;
  type: SubjectTypeEnum;
};

export type Shelfmark = {
  __typename?: "Shelfmark";
  /** A postfix to the shelfmark, eg. 99.4 Christensen, Inger. f. 1935 */
  postfix?: Maybe<Scalars["String"]["output"]>;
  /** The actual shelfmark - e.g. information about on which shelf in the library this manifestation can be found, e.g. 99.4 */
  shelfmark: Scalars["String"]["output"];
};

export type SortInput = {
  index: Scalars["String"]["input"];
  order: SortOrderEnum;
};

export enum SortOrderEnum {
  Asc = "ASC",
  Desc = "DESC"
}

export type SpecificMaterialType = {
  __typename?: "SpecificMaterialType";
  /** code for materialType */
  code: Scalars["String"]["output"];
  /** Ths string to display */
  display: Scalars["String"]["output"];
};

export type SubjectContainer = {
  __typename?: "SubjectContainer";
  /** All subjects */
  all: Array<SubjectInterface>;
  /** Only DBC verified subjects */
  dbcVerified: Array<SubjectInterface>;
};

export type SubjectInterface = {
  display: Scalars["String"]["output"];
  /** Language of the subject - contains display and isoCode  */
  language?: Maybe<Language>;
  local?: Maybe<Scalars["Boolean"]["output"]>;
  /** The type of subject - 'location', 'time period' etc., 'topic' if not specific kind of subject term */
  type: SubjectTypeEnum;
};

export type SubjectText = SubjectInterface & {
  __typename?: "SubjectText";
  display: Scalars["String"]["output"];
  language?: Maybe<Language>;
  local?: Maybe<Scalars["Boolean"]["output"]>;
  type: SubjectTypeEnum;
};

export enum SubjectTypeEnum {
  Corporation = "CORPORATION",
  Environment = "ENVIRONMENT",
  FictionalCharacter = "FICTIONAL_CHARACTER",
  FictionalLocation = "FICTIONAL_LOCATION",
  FilmNationality = "FILM_NATIONALITY",
  Laesekompasset = "LAESEKOMPASSET",
  LibraryOfCongressSubjectHeading = "LIBRARY_OF_CONGRESS_SUBJECT_HEADING",
  Location = "LOCATION",
  MedicalSubjectHeading = "MEDICAL_SUBJECT_HEADING",
  Mood = "MOOD",
  MoodChildren = "MOOD_CHILDREN",
  MusicalInstrumentation = "MUSICAL_INSTRUMENTATION",
  MusicCountryOfOrigin = "MUSIC_COUNTRY_OF_ORIGIN",
  MusicTimePeriod = "MUSIC_TIME_PERIOD",
  NationalAgriculturalLibrary = "NATIONAL_AGRICULTURAL_LIBRARY",
  /** added for manifestation.parts.creators/person - they get a type from small-rye */
  Person = "PERSON",
  Perspective = "PERSPECTIVE",
  Reality = "REALITY",
  Style = "STYLE",
  Tempo = "TEMPO",
  TimePeriod = "TIME_PERIOD",
  Title = "TITLE",
  Topic = "TOPIC",
  /** Subject describing selected topics for children, and a rating. */
  TopicChildren = "TOPIC_CHILDREN"
}

export type SubjectWithRating = SubjectInterface & {
  __typename?: "SubjectWithRating";
  display: Scalars["String"]["output"];
  language?: Maybe<Language>;
  local?: Maybe<Scalars["Boolean"]["output"]>;
  /** Expressed as integer on a scale from 1 to 5 */
  rating?: Maybe<Scalars["Int"]["output"]>;
  type: SubjectTypeEnum;
};

export type SubmitOrder = {
  __typename?: "SubmitOrder";
  deleted?: Maybe<Scalars["Boolean"]["output"]>;
  message?: Maybe<Scalars["String"]["output"]>;
  /** if order was submitted successfully */
  ok?: Maybe<Scalars["Boolean"]["output"]>;
  orderId?: Maybe<Scalars["String"]["output"]>;
  orsId?: Maybe<Scalars["String"]["output"]>;
  status: SubmitOrderStatusEnum;
};

export type SubmitOrderInput = {
  author?: InputMaybe<Scalars["String"]["input"]>;
  authorOfComponent?: InputMaybe<Scalars["String"]["input"]>;
  exactEdition?: InputMaybe<Scalars["Boolean"]["input"]>;
  /** expires is required to be iso 8601 dateTime eg. "2024-03-15T12:24:32Z" */
  expires?: InputMaybe<Scalars["String"]["input"]>;
  key?: InputMaybe<Scalars["String"]["input"]>;
  orderType?: InputMaybe<OrderTypeEnum>;
  pagination?: InputMaybe<Scalars["String"]["input"]>;
  pickUpBranch: Scalars["String"]["input"];
  pids: Array<Scalars["String"]["input"]>;
  publicationDate?: InputMaybe<Scalars["String"]["input"]>;
  publicationDateOfComponent?: InputMaybe<Scalars["String"]["input"]>;
  title?: InputMaybe<Scalars["String"]["input"]>;
  titleOfComponent?: InputMaybe<Scalars["String"]["input"]>;
  userParameters: SubmitOrderUserParametersInput;
  volume?: InputMaybe<Scalars["String"]["input"]>;
};

export enum SubmitOrderStatusEnum {
  /** Authentication error */
  AuthenticationError = "AUTHENTICATION_ERROR",
  /** Borchk: User is blocked by agency */
  BorchkUserBlockedByAgency = "BORCHK_USER_BLOCKED_BY_AGENCY",
  /** Borchk: User could not be verified */
  BorchkUserNotVerified = "BORCHK_USER_NOT_VERIFIED",
  /** Borchk: User is no longer loaner at the provided pickupbranch */
  BorchkUserNoLongerExistOnAgency = "BORCHK_USER_NO_LONGER_EXIST_ON_AGENCY",
  /** Pincode was not found in arguments */
  ErrorMissingPincode = "ERROR_MISSING_PINCODE",
  /** Order does not validate */
  InvalidOrder = "INVALID_ORDER",
  /** Item not available at pickupAgency, item localised for ILL */
  NotOwnedIllLoc = "NOT_OWNED_ILL_LOC",
  /** Item not available at pickupAgency, item not localised for ILL */
  NotOwnedNoIllLoc = "NOT_OWNED_NO_ILL_LOC",
  /** Item not available at pickupAgency, ILL of mediumType not accepted */
  NotOwnedWrongIllMediumtype = "NOT_OWNED_WRONG_ILL_MEDIUMTYPE",
  /** ServiceRequester is obligatory */
  NoServicerequester = "NO_SERVICEREQUESTER",
  /** Error sending order to ORS */
  OrsError = "ORS_ERROR",
  /** Item available at pickupAgency, order accepted */
  OwnedAccepted = "OWNED_ACCEPTED",
  /** Item available at pickupAgency, item may be ordered through the library's catalogue */
  OwnedOwnCatalogue = "OWNED_OWN_CATALOGUE",
  /** Item available at pickupAgency, order of mediumType not accepted */
  OwnedWrongMediumtype = "OWNED_WRONG_MEDIUMTYPE",
  /** Service unavailable */
  ServiceUnavailable = "SERVICE_UNAVAILABLE",
  /** Unknown error occured, status is unknown */
  UnknownError = "UNKNOWN_ERROR",
  /** PickupAgency not found */
  UnknownPickupagency = "UNKNOWN_PICKUPAGENCY",
  /** User not found */
  UnknownUser = "UNKNOWN_USER"
}

export type SubmitOrderUserParametersInput = {
  barcode?: InputMaybe<Scalars["String"]["input"]>;
  cardno?: InputMaybe<Scalars["String"]["input"]>;
  cpr?: InputMaybe<Scalars["String"]["input"]>;
  customId?: InputMaybe<Scalars["String"]["input"]>;
  pincode?: InputMaybe<Scalars["String"]["input"]>;
  userAddress?: InputMaybe<Scalars["String"]["input"]>;
  userDateOfBirth?: InputMaybe<Scalars["String"]["input"]>;
  userId?: InputMaybe<Scalars["String"]["input"]>;
  userMail?: InputMaybe<Scalars["String"]["input"]>;
  userName?: InputMaybe<Scalars["String"]["input"]>;
  userTelephone?: InputMaybe<Scalars["String"]["input"]>;
};

export type SuggestResponse = {
  __typename?: "SuggestResponse";
  result: Array<Suggestion>;
};

export type Suggestion = {
  __typename?: "Suggestion";
  /** The suggested term which can be searched for */
  term: Scalars["String"]["output"];
  /**
   * A unique identifier for tracking user interactions with this suggestion.
   * It is generated in the response and should be included in subsequent
   * API calls when this suggestion is selected.
   */
  traceId: Scalars["String"]["output"];
  /** The type of suggestion: creator, subject or title */
  type: SuggestionTypeEnum;
  /** A work related to the term */
  work?: Maybe<Work>;
};

export enum SuggestionTypeEnum {
  Composit = "COMPOSIT",
  Creator = "CREATOR",
  Subject = "SUBJECT",
  Title = "TITLE"
}

export type TableOfContent = {
  __typename?: "TableOfContent";
  content?: Maybe<Scalars["String"]["output"]>;
  heading?: Maybe<Scalars["String"]["output"]>;
  listOfContent?: Maybe<Array<TableOfContent>>;
};

export type TimePeriod = SubjectInterface & {
  __typename?: "TimePeriod";
  display: Scalars["String"]["output"];
  language?: Maybe<Language>;
  local?: Maybe<Scalars["Boolean"]["output"]>;
  period: Range;
  type: SubjectTypeEnum;
};

export type Translation = {
  __typename?: "Translation";
  /** Translation in plural form, e.g. forfattere, komponister, instruktører etc. */
  plural: Scalars["String"]["output"];
  /** Translation in singular form, e.g. forfatter, komponist, instruktør */
  singular: Scalars["String"]["output"];
};

export type TvSeries = {
  __typename?: "TvSeries";
  /** Dansih translated title of the tv serie */
  danishLaunchTitle?: Maybe<Scalars["String"]["output"]>;
  /** Detailed information about the disc */
  disc?: Maybe<TvSeriesDetails>;
  /** Detailed information about the episode */
  episode?: Maybe<TvSeriesDetails>;
  /** Episode titles */
  episodeTitles?: Maybe<Array<Scalars["String"]["output"]>>;
  /** Detailed information about the season */
  season?: Maybe<TvSeriesDetails>;
  /** Title of the tv serie */
  title?: Maybe<Scalars["String"]["output"]>;
  /** Detailed information about the volume */
  volume?: Maybe<TvSeriesDetails>;
};

export type TvSeriesDetails = {
  __typename?: "TvSeriesDetails";
  display?: Maybe<Scalars["String"]["output"]>;
  numbers?: Maybe<Array<Scalars["Int"]["output"]>>;
};

export type Unit = {
  __typename?: "Unit";
  id: Scalars["String"]["output"];
  manifestations: Array<Manifestation>;
};

export type UnitDescription = {
  __typename?: "UnitDescription";
  /** Other physical description, eg. illustrations, color or b/w, mono/stereo, rpm */
  additionalDescription?: Maybe<Scalars["String"]["output"]>;
  /** Number of pages, tab (books, articles etc.) or playingtime (cd, dvd etc.) */
  extent?: Maybe<Scalars["String"]["output"]>;
  /** Technical formats, e.g. Playstation 4, blu-ray */
  numberAndType?: Maybe<Scalars["String"]["output"]>;
  /** Size of the material unit */
  size?: Maybe<Scalars["String"]["output"]>;
  /** Assemblance of the data from all the other properties, separated by a comma */
  summary: Scalars["String"]["output"];
  /** Technical formats, e.g. Playstation 4, blu-ray */
  technicalInformation?: Maybe<Scalars["String"]["output"]>;
};

export type Universe = {
  __typename?: "Universe";
  /** A alternative title to the main 'title' of the universe */
  alternativeTitles?: Maybe<Array<Scalars["String"]["output"]>>;
  /** both series and works in a list */
  content: UniverseContentResult;
  /** Description of the universe */
  description?: Maybe<Scalars["String"]["output"]>;
  /** A key that identifies a universe. */
  key?: Maybe<Scalars["String"]["output"]>;
  /** All series within the universe */
  series: Array<Series>;
  /** Literary/movie universe this work is part of e.g. Wizarding World, Marvel Cinematic Universe */
  title: Scalars["String"]["output"];
  /** An id that identifies a universe. */
  universeId?: Maybe<Scalars["String"]["output"]>;
  /** work types that are in this universe */
  workTypes: Array<WorkTypeEnum>;
  /** All works within the universe but not in any series */
  works: Array<Work>;
};

export type UniverseContentArgs = {
  limit?: InputMaybe<Scalars["Int"]["input"]>;
  offset?: InputMaybe<Scalars["Int"]["input"]>;
  workType?: InputMaybe<WorkTypeEnum>;
};

export type UniverseSeriesArgs = {
  limit?: InputMaybe<Scalars["Int"]["input"]>;
  offset?: InputMaybe<Scalars["Int"]["input"]>;
  workType?: InputMaybe<WorkTypeEnum>;
};

export type UniverseWorksArgs = {
  limit?: InputMaybe<Scalars["Int"]["input"]>;
  offset?: InputMaybe<Scalars["Int"]["input"]>;
  workType?: InputMaybe<WorkTypeEnum>;
};

export type UniverseContentResult = {
  __typename?: "UniverseContentResult";
  entries: Array<UniverseContentUnion>;
  hitcount: Scalars["Int"]["output"];
};

export type UniverseContentUnion = Series | Work;

export type Work = {
  __typename?: "Work";
  /** Abstract of the entity */
  abstract?: Maybe<Array<Scalars["String"]["output"]>>;
  /** Creators */
  creators: Array<CreatorInterface>;
  /** DK5 main entry for this work */
  dk5MainEntry?: Maybe<Dk5MainEntry>;
  /** Overall literary category/genre of this work. e.g. fiction or nonfiction. In Danish skønlitteratur/faglitteratur for literature, fiktion/nonfiktion for other types. */
  fictionNonfiction?: Maybe<FictionNonfiction>;
  /** The genre, (literary) form, type etc. of this work */
  genreAndForm: Array<Scalars["String"]["output"]>;
  /** Date of latest publication */
  latestPublicationDate?: Maybe<Scalars["String"]["output"]>;
  /** The main language(s) of the work's content */
  mainLanguages: Array<Language>;
  /** Details about the manifestations of this work */
  manifestations: Manifestations;
  /** Field for presenting bibliographic records in MARC format */
  marc?: Maybe<MarcRecord>;
  /** The type of material of the manifestation based on bibliotek.dk types */
  materialTypes: Array<MaterialType>;
  /** Relations to other manifestations */
  relations: Relations;
  /** Series for this work */
  series: Array<Series>;
  /** Subjects for this work */
  subjects: SubjectContainer;
  titles: WorkTitles;
  /**
   * A unique identifier for tracking user interactions with this work.
   * It is generated in the response and should be included in subsequent
   * API calls when this work is selected.
   */
  traceId: Scalars["String"]["output"];
  /** Literary/movie universes this work is part of, e.g. Wizarding World, Marvel Universe */
  universes: Array<Universe>;
  /** Unique identification of the work based on work-presentation id e.g work-of:870970-basis:54029519 */
  workId: Scalars["String"]["output"];
  /** Worktypes for this work - 'none' replaced by 'other' */
  workTypes: Array<WorkTypeEnum>;
  /** The year this work was originally published or produced */
  workYear?: Maybe<PublicationYear>;
};

export type WorkTitles = {
  __typename?: "WorkTitles";
  /** The full title(s) of the work including subtitles etc */
  full: Array<Scalars["String"]["output"]>;
  /** The main title(s) of the work */
  main: Array<Scalars["String"]["output"]>;
  /** The title of the work that this expression/manifestation is translated from or based on. The original title(s) of a film which has a different distribution title. */
  original?: Maybe<Array<Scalars["String"]["output"]>>;
  /** Titles (in other languages) parallel to the main 'title' of the work */
  parallel: Array<Scalars["String"]["output"]>;
  /** The sorted title of the entity */
  sort: Scalars["String"]["output"];
  /** The standard title of the entity, used for music and movies */
  standard?: Maybe<Scalars["String"]["output"]>;
  /** The title of the entity with the language of the entity in parenthesis after. This field is only generated for non-danish titles. */
  titlePlusLanguage?: Maybe<Scalars["String"]["output"]>;
  /** Danish translation of the main title */
  translated?: Maybe<Array<Scalars["String"]["output"]>>;
  /** detailed title for tv series  */
  tvSeries?: Maybe<TvSeries>;
};

export enum WorkTypeEnum {
  Analysis = "ANALYSIS",
  Article = "ARTICLE",
  Bookdescription = "BOOKDESCRIPTION",
  Game = "GAME",
  Literature = "LITERATURE",
  Map = "MAP",
  Movie = "MOVIE",
  Music = "MUSIC",
  Other = "OTHER",
  Periodica = "PERIODICA",
  Portrait = "PORTRAIT",
  Review = "REVIEW",
  Sheetmusic = "SHEETMUSIC",
  Track = "TRACK"
}

export type GetSmallWorkQueryVariables = Exact<{
  id: Scalars["String"]["input"];
}>;

export type GetSmallWorkQuery = {
  __typename?: "Query";
  work?: {
    __typename?: "Work";
    workId: string;
    abstract?: Array<string> | null;
    genreAndForm: Array<string>;
    titles: {
      __typename?: "WorkTitles";
      full: Array<string>;
      original?: Array<string> | null;
    };
    creators: Array<
      | { __typename: "Corporation"; display: string }
      | { __typename: "Person"; display: string }
    >;
    series: Array<{
      __typename?: "Series";
      title: string;
      isPopular?: boolean | null;
      readThisFirst?: boolean | null;
      readThisWhenever?: boolean | null;
      members: Array<{
        __typename?: "SerieWork";
        numberInSeries?: string | null;
        work: {
          __typename?: "Work";
          workId: string;
          titles: { __typename?: "WorkTitles"; main: Array<string> };
        };
      }>;
    }>;
    workYear?: { __typename?: "PublicationYear"; year?: number | null } | null;
    manifestations: {
      __typename?: "Manifestations";
      all: Array<{
        __typename?: "Manifestation";
        pid: string;
        genreAndForm: Array<string>;
        source: Array<string>;
        publisher: Array<string>;
        titles: {
          __typename?: "ManifestationTitles";
          main: Array<string>;
          original?: Array<string> | null;
        };
        fictionNonfiction?: {
          __typename?: "FictionNonfiction";
          display: string;
          code: FictionNonfictionCodeEnum;
        } | null;
        materialTypes: Array<{
          __typename?: "MaterialType";
          materialTypeSpecific: {
            __typename?: "SpecificMaterialType";
            display: string;
          };
        }>;
        creators: Array<
          | { __typename: "Corporation"; display: string; nameSort: string }
          | { __typename: "Person"; display: string; nameSort: string }
        >;
        identifiers: Array<{ __typename?: "Identifier"; value: string }>;
        contributors: Array<
          | {
              __typename?: "Corporation";
              display: string;
              roles: Array<{
                __typename?: "Role";
                function: { __typename?: "Translation"; singular: string };
              }>;
            }
          | {
              __typename?: "Person";
              display: string;
              roles: Array<{
                __typename?: "Role";
                function: { __typename?: "Translation"; singular: string };
              }>;
            }
        >;
        edition?: {
          __typename?: "Edition";
          summary: string;
          publicationYear?: {
            __typename?: "PublicationYear";
            display: string;
          } | null;
        } | null;
        dateFirstEdition?: {
          __typename?: "PublicationYear";
          display: string;
          year?: number | null;
        } | null;
        audience?: {
          __typename?: "Audience";
          generalAudience: Array<string>;
          ages: Array<{ __typename?: "Range"; display: string }>;
        } | null;
        notes: Array<{ __typename?: "Note"; display: Array<string> }>;
        languages?: {
          __typename?: "Languages";
          notes?: Array<string> | null;
          main?: Array<{
            __typename?: "Language";
            display: string;
            isoCode: string;
          }> | null;
        } | null;
        physicalDescription?: {
          __typename?: "PhysicalUnitDescription";
          summaryFull?: string | null;
          numberOfPages?: number | null;
        } | null;
        hostPublication?: {
          __typename?: "HostPublication";
          summary: string;
        } | null;
        manifestationParts?: {
          __typename?: "ManifestationParts";
          parts: Array<{ __typename?: "ManifestationPart"; title: string }>;
        } | null;
        accessTypes: Array<{
          __typename?: "AccessType";
          code: AccessTypeCodeEnum;
        }>;
        access: Array<
          | {
              __typename: "AccessUrl";
              origin: string;
              url: string;
              loginRequired: boolean;
            }
          | { __typename: "DigitalArticleService"; issn: string }
          | {
              __typename: "Ereol";
              origin: string;
              url: string;
              canAlwaysBeLoaned: boolean;
            }
          | { __typename: "InfomediaService"; id: string }
          | { __typename: "InterLibraryLoan"; loanIsPossible: boolean }
        >;
        shelfmark?: {
          __typename?: "Shelfmark";
          postfix?: string | null;
          shelfmark: string;
        } | null;
        workYear?: {
          __typename?: "PublicationYear";
          year?: number | null;
        } | null;
        catalogueCodes: {
          __typename?: "CatalogueCodes";
          nationalBibliography: Array<string>;
          otherCatalogues: Array<string>;
        };
      }>;
      latest: {
        __typename?: "Manifestation";
        pid: string;
        genreAndForm: Array<string>;
        source: Array<string>;
        publisher: Array<string>;
        titles: {
          __typename?: "ManifestationTitles";
          main: Array<string>;
          original?: Array<string> | null;
        };
        fictionNonfiction?: {
          __typename?: "FictionNonfiction";
          display: string;
          code: FictionNonfictionCodeEnum;
        } | null;
        materialTypes: Array<{
          __typename?: "MaterialType";
          materialTypeSpecific: {
            __typename?: "SpecificMaterialType";
            display: string;
          };
        }>;
        creators: Array<
          | { __typename: "Corporation"; display: string; nameSort: string }
          | { __typename: "Person"; display: string; nameSort: string }
        >;
        identifiers: Array<{ __typename?: "Identifier"; value: string }>;
        contributors: Array<
          | {
              __typename?: "Corporation";
              display: string;
              roles: Array<{
                __typename?: "Role";
                function: { __typename?: "Translation"; singular: string };
              }>;
            }
          | {
              __typename?: "Person";
              display: string;
              roles: Array<{
                __typename?: "Role";
                function: { __typename?: "Translation"; singular: string };
              }>;
            }
        >;
        edition?: {
          __typename?: "Edition";
          summary: string;
          publicationYear?: {
            __typename?: "PublicationYear";
            display: string;
          } | null;
        } | null;
        dateFirstEdition?: {
          __typename?: "PublicationYear";
          display: string;
          year?: number | null;
        } | null;
        audience?: {
          __typename?: "Audience";
          generalAudience: Array<string>;
          ages: Array<{ __typename?: "Range"; display: string }>;
        } | null;
        notes: Array<{ __typename?: "Note"; display: Array<string> }>;
        languages?: {
          __typename?: "Languages";
          notes?: Array<string> | null;
          main?: Array<{
            __typename?: "Language";
            display: string;
            isoCode: string;
          }> | null;
        } | null;
        physicalDescription?: {
          __typename?: "PhysicalUnitDescription";
          summaryFull?: string | null;
          numberOfPages?: number | null;
        } | null;
        hostPublication?: {
          __typename?: "HostPublication";
          summary: string;
        } | null;
        manifestationParts?: {
          __typename?: "ManifestationParts";
          parts: Array<{ __typename?: "ManifestationPart"; title: string }>;
        } | null;
        accessTypes: Array<{
          __typename?: "AccessType";
          code: AccessTypeCodeEnum;
        }>;
        access: Array<
          | {
              __typename: "AccessUrl";
              origin: string;
              url: string;
              loginRequired: boolean;
            }
          | { __typename: "DigitalArticleService"; issn: string }
          | {
              __typename: "Ereol";
              origin: string;
              url: string;
              canAlwaysBeLoaned: boolean;
            }
          | { __typename: "InfomediaService"; id: string }
          | { __typename: "InterLibraryLoan"; loanIsPossible: boolean }
        >;
        shelfmark?: {
          __typename?: "Shelfmark";
          postfix?: string | null;
          shelfmark: string;
        } | null;
        workYear?: {
          __typename?: "PublicationYear";
          year?: number | null;
        } | null;
        catalogueCodes: {
          __typename?: "CatalogueCodes";
          nationalBibliography: Array<string>;
          otherCatalogues: Array<string>;
        };
      };
      bestRepresentation: {
        __typename?: "Manifestation";
        pid: string;
        genreAndForm: Array<string>;
        source: Array<string>;
        publisher: Array<string>;
        titles: {
          __typename?: "ManifestationTitles";
          main: Array<string>;
          original?: Array<string> | null;
        };
        fictionNonfiction?: {
          __typename?: "FictionNonfiction";
          display: string;
          code: FictionNonfictionCodeEnum;
        } | null;
        materialTypes: Array<{
          __typename?: "MaterialType";
          materialTypeSpecific: {
            __typename?: "SpecificMaterialType";
            display: string;
          };
        }>;
        creators: Array<
          | { __typename: "Corporation"; display: string; nameSort: string }
          | { __typename: "Person"; display: string; nameSort: string }
        >;
        identifiers: Array<{ __typename?: "Identifier"; value: string }>;
        contributors: Array<
          | {
              __typename?: "Corporation";
              display: string;
              roles: Array<{
                __typename?: "Role";
                function: { __typename?: "Translation"; singular: string };
              }>;
            }
          | {
              __typename?: "Person";
              display: string;
              roles: Array<{
                __typename?: "Role";
                function: { __typename?: "Translation"; singular: string };
              }>;
            }
        >;
        edition?: {
          __typename?: "Edition";
          summary: string;
          publicationYear?: {
            __typename?: "PublicationYear";
            display: string;
          } | null;
        } | null;
        dateFirstEdition?: {
          __typename?: "PublicationYear";
          display: string;
          year?: number | null;
        } | null;
        audience?: {
          __typename?: "Audience";
          generalAudience: Array<string>;
          ages: Array<{ __typename?: "Range"; display: string }>;
        } | null;
        notes: Array<{ __typename?: "Note"; display: Array<string> }>;
        languages?: {
          __typename?: "Languages";
          notes?: Array<string> | null;
          main?: Array<{
            __typename?: "Language";
            display: string;
            isoCode: string;
          }> | null;
        } | null;
        physicalDescription?: {
          __typename?: "PhysicalUnitDescription";
          summaryFull?: string | null;
          numberOfPages?: number | null;
        } | null;
        hostPublication?: {
          __typename?: "HostPublication";
          summary: string;
        } | null;
        manifestationParts?: {
          __typename?: "ManifestationParts";
          parts: Array<{ __typename?: "ManifestationPart"; title: string }>;
        } | null;
        accessTypes: Array<{
          __typename?: "AccessType";
          code: AccessTypeCodeEnum;
        }>;
        access: Array<
          | {
              __typename: "AccessUrl";
              origin: string;
              url: string;
              loginRequired: boolean;
            }
          | { __typename: "DigitalArticleService"; issn: string }
          | {
              __typename: "Ereol";
              origin: string;
              url: string;
              canAlwaysBeLoaned: boolean;
            }
          | { __typename: "InfomediaService"; id: string }
          | { __typename: "InterLibraryLoan"; loanIsPossible: boolean }
        >;
        shelfmark?: {
          __typename?: "Shelfmark";
          postfix?: string | null;
          shelfmark: string;
        } | null;
        workYear?: {
          __typename?: "PublicationYear";
          year?: number | null;
        } | null;
        catalogueCodes: {
          __typename?: "CatalogueCodes";
          nationalBibliography: Array<string>;
          otherCatalogues: Array<string>;
        };
      };
    };
  } | null;
};

export type ManifestationBasicDetailsFragment = {
  __typename?: "Manifestation";
  pid: string;
  abstract: Array<string>;
  titles: { __typename?: "ManifestationTitles"; full: Array<string> };
  materialTypes: Array<{
    __typename?: "MaterialType";
    materialTypeSpecific: {
      __typename?: "SpecificMaterialType";
      display: string;
    };
  }>;
  creators: Array<
    | { __typename?: "Corporation"; display: string }
    | { __typename?: "Person"; display: string }
  >;
  edition?: {
    __typename?: "Edition";
    publicationYear?: {
      __typename?: "PublicationYear";
      display: string;
    } | null;
  } | null;
  series: Array<{
    __typename?: "Series";
    title: string;
    members: Array<{
      __typename?: "SerieWork";
      numberInSeries?: string | null;
    }>;
  }>;
  languages?: {
    __typename?: "Languages";
    main?: Array<{
      __typename?: "Language";
      display: string;
      isoCode: string;
    }> | null;
  } | null;
};

export type GetManifestationViaMaterialByFaustQueryVariables = Exact<{
  faust: Scalars["String"]["input"];
}>;

export type GetManifestationViaMaterialByFaustQuery = {
  __typename?: "Query";
  manifestation?: {
    __typename?: "Manifestation";
    pid: string;
    abstract: Array<string>;
    titles: { __typename?: "ManifestationTitles"; full: Array<string> };
    materialTypes: Array<{
      __typename?: "MaterialType";
      materialTypeSpecific: {
        __typename?: "SpecificMaterialType";
        display: string;
      };
    }>;
    creators: Array<
      | { __typename?: "Corporation"; display: string }
      | { __typename?: "Person"; display: string }
    >;
    edition?: {
      __typename?: "Edition";
      publicationYear?: {
        __typename?: "PublicationYear";
        display: string;
      } | null;
    } | null;
    series: Array<{
      __typename?: "Series";
      title: string;
      members: Array<{
        __typename?: "SerieWork";
        numberInSeries?: string | null;
      }>;
    }>;
    languages?: {
      __typename?: "Languages";
      main?: Array<{
        __typename?: "Language";
        display: string;
        isoCode: string;
      }> | null;
    } | null;
  } | null;
};

export type GetManifestationViaBestRepresentationByFaustQueryVariables = Exact<{
  faust: Scalars["String"]["input"];
}>;

export type GetManifestationViaBestRepresentationByFaustQuery = {
  __typename?: "Query";
  manifestation?: {
    __typename?: "Manifestation";
    ownerWork: {
      __typename?: "Work";
      manifestations: {
        __typename?: "Manifestations";
        bestRepresentation: {
          __typename?: "Manifestation";
          pid: string;
          abstract: Array<string>;
          titles: { __typename?: "ManifestationTitles"; full: Array<string> };
          materialTypes: Array<{
            __typename?: "MaterialType";
            materialTypeSpecific: {
              __typename?: "SpecificMaterialType";
              display: string;
            };
          }>;
          creators: Array<
            | { __typename?: "Corporation"; display: string }
            | { __typename?: "Person"; display: string }
          >;
          edition?: {
            __typename?: "Edition";
            publicationYear?: {
              __typename?: "PublicationYear";
              display: string;
            } | null;
          } | null;
          series: Array<{
            __typename?: "Series";
            title: string;
            members: Array<{
              __typename?: "SerieWork";
              numberInSeries?: string | null;
            }>;
          }>;
          languages?: {
            __typename?: "Languages";
            main?: Array<{
              __typename?: "Language";
              display: string;
              isoCode: string;
            }> | null;
          } | null;
        };
      };
    };
  } | null;
};

export type GetMaterialQueryVariables = Exact<{
  wid: Scalars["String"]["input"];
}>;

export type GetMaterialQuery = {
  __typename?: "Query";
  work?: {
    __typename?: "Work";
    workId: string;
    abstract?: Array<string> | null;
    genreAndForm: Array<string>;
    materialTypes: Array<{
      __typename?: "MaterialType";
      materialTypeSpecific: {
        __typename?: "SpecificMaterialType";
        display: string;
      };
    }>;
    creators: Array<
      | { __typename: "Corporation"; nameSort: string; display: string }
      | { __typename: "Person"; nameSort: string; display: string }
    >;
    mainLanguages: Array<{
      __typename?: "Language";
      display: string;
      isoCode: string;
    }>;
    subjects: {
      __typename?: "SubjectContainer";
      all: Array<
        | { __typename?: "Corporation"; display: string }
        | { __typename?: "Mood"; display: string }
        | { __typename?: "NarrativeTechnique"; display: string }
        | { __typename?: "Person"; display: string }
        | { __typename?: "Setting"; display: string }
        | { __typename?: "SubjectText"; display: string }
        | { __typename?: "SubjectWithRating"; display: string }
        | { __typename?: "TimePeriod"; display: string }
      >;
      dbcVerified: Array<
        | { __typename?: "Corporation"; display: string }
        | { __typename?: "Mood"; display: string }
        | { __typename?: "NarrativeTechnique"; display: string }
        | { __typename?: "Person"; display: string }
        | { __typename?: "Setting"; display: string }
        | { __typename?: "SubjectText"; display: string }
        | { __typename?: "SubjectWithRating"; display: string }
        | { __typename?: "TimePeriod"; display: string }
      >;
    };
    fictionNonfiction?: {
      __typename?: "FictionNonfiction";
      display: string;
      code: FictionNonfictionCodeEnum;
    } | null;
    dk5MainEntry?: { __typename?: "DK5MainEntry"; display: string } | null;
    relations: {
      __typename?: "Relations";
      hasReview: Array<{ __typename?: "Manifestation"; pid: string }>;
      hasAdaptation: Array<{
        __typename?: "Manifestation";
        ownerWork: {
          __typename?: "Work";
          workId: string;
          workTypes: Array<WorkTypeEnum>;
          titles: { __typename?: "WorkTitles"; main: Array<string> };
        };
      }>;
    };
    titles: {
      __typename?: "WorkTitles";
      full: Array<string>;
      original?: Array<string> | null;
    };
    series: Array<{
      __typename?: "Series";
      title: string;
      isPopular?: boolean | null;
      readThisFirst?: boolean | null;
      readThisWhenever?: boolean | null;
      members: Array<{
        __typename?: "SerieWork";
        numberInSeries?: string | null;
        work: {
          __typename?: "Work";
          workId: string;
          titles: { __typename?: "WorkTitles"; main: Array<string> };
        };
      }>;
    }>;
    workYear?: { __typename?: "PublicationYear"; year?: number | null } | null;
    manifestations: {
      __typename?: "Manifestations";
      all: Array<{
        __typename?: "Manifestation";
        pid: string;
        genreAndForm: Array<string>;
        source: Array<string>;
        publisher: Array<string>;
        titles: {
          __typename?: "ManifestationTitles";
          main: Array<string>;
          original?: Array<string> | null;
        };
        fictionNonfiction?: {
          __typename?: "FictionNonfiction";
          display: string;
          code: FictionNonfictionCodeEnum;
        } | null;
        materialTypes: Array<{
          __typename?: "MaterialType";
          materialTypeSpecific: {
            __typename?: "SpecificMaterialType";
            display: string;
          };
        }>;
        creators: Array<
          | { __typename: "Corporation"; display: string; nameSort: string }
          | { __typename: "Person"; display: string; nameSort: string }
        >;
        identifiers: Array<{ __typename?: "Identifier"; value: string }>;
        contributors: Array<
          | {
              __typename?: "Corporation";
              display: string;
              roles: Array<{
                __typename?: "Role";
                function: { __typename?: "Translation"; singular: string };
              }>;
            }
          | {
              __typename?: "Person";
              display: string;
              roles: Array<{
                __typename?: "Role";
                function: { __typename?: "Translation"; singular: string };
              }>;
            }
        >;
        edition?: {
          __typename?: "Edition";
          summary: string;
          publicationYear?: {
            __typename?: "PublicationYear";
            display: string;
          } | null;
        } | null;
        dateFirstEdition?: {
          __typename?: "PublicationYear";
          display: string;
          year?: number | null;
        } | null;
        audience?: {
          __typename?: "Audience";
          generalAudience: Array<string>;
          ages: Array<{ __typename?: "Range"; display: string }>;
        } | null;
        notes: Array<{ __typename?: "Note"; display: Array<string> }>;
        languages?: {
          __typename?: "Languages";
          notes?: Array<string> | null;
          main?: Array<{
            __typename?: "Language";
            display: string;
            isoCode: string;
          }> | null;
        } | null;
        physicalDescription?: {
          __typename?: "PhysicalUnitDescription";
          summaryFull?: string | null;
          numberOfPages?: number | null;
        } | null;
        hostPublication?: {
          __typename?: "HostPublication";
          summary: string;
        } | null;
        manifestationParts?: {
          __typename?: "ManifestationParts";
          parts: Array<{ __typename?: "ManifestationPart"; title: string }>;
        } | null;
        accessTypes: Array<{
          __typename?: "AccessType";
          code: AccessTypeCodeEnum;
        }>;
        access: Array<
          | {
              __typename: "AccessUrl";
              origin: string;
              url: string;
              loginRequired: boolean;
            }
          | { __typename: "DigitalArticleService"; issn: string }
          | {
              __typename: "Ereol";
              origin: string;
              url: string;
              canAlwaysBeLoaned: boolean;
            }
          | { __typename: "InfomediaService"; id: string }
          | { __typename: "InterLibraryLoan"; loanIsPossible: boolean }
        >;
        shelfmark?: {
          __typename?: "Shelfmark";
          postfix?: string | null;
          shelfmark: string;
        } | null;
        workYear?: {
          __typename?: "PublicationYear";
          year?: number | null;
        } | null;
        catalogueCodes: {
          __typename?: "CatalogueCodes";
          nationalBibliography: Array<string>;
          otherCatalogues: Array<string>;
        };
      }>;
      latest: {
        __typename?: "Manifestation";
        pid: string;
        genreAndForm: Array<string>;
        source: Array<string>;
        publisher: Array<string>;
        titles: {
          __typename?: "ManifestationTitles";
          main: Array<string>;
          original?: Array<string> | null;
        };
        fictionNonfiction?: {
          __typename?: "FictionNonfiction";
          display: string;
          code: FictionNonfictionCodeEnum;
        } | null;
        materialTypes: Array<{
          __typename?: "MaterialType";
          materialTypeSpecific: {
            __typename?: "SpecificMaterialType";
            display: string;
          };
        }>;
        creators: Array<
          | { __typename: "Corporation"; display: string; nameSort: string }
          | { __typename: "Person"; display: string; nameSort: string }
        >;
        identifiers: Array<{ __typename?: "Identifier"; value: string }>;
        contributors: Array<
          | {
              __typename?: "Corporation";
              display: string;
              roles: Array<{
                __typename?: "Role";
                function: { __typename?: "Translation"; singular: string };
              }>;
            }
          | {
              __typename?: "Person";
              display: string;
              roles: Array<{
                __typename?: "Role";
                function: { __typename?: "Translation"; singular: string };
              }>;
            }
        >;
        edition?: {
          __typename?: "Edition";
          summary: string;
          publicationYear?: {
            __typename?: "PublicationYear";
            display: string;
          } | null;
        } | null;
        dateFirstEdition?: {
          __typename?: "PublicationYear";
          display: string;
          year?: number | null;
        } | null;
        audience?: {
          __typename?: "Audience";
          generalAudience: Array<string>;
          ages: Array<{ __typename?: "Range"; display: string }>;
        } | null;
        notes: Array<{ __typename?: "Note"; display: Array<string> }>;
        languages?: {
          __typename?: "Languages";
          notes?: Array<string> | null;
          main?: Array<{
            __typename?: "Language";
            display: string;
            isoCode: string;
          }> | null;
        } | null;
        physicalDescription?: {
          __typename?: "PhysicalUnitDescription";
          summaryFull?: string | null;
          numberOfPages?: number | null;
        } | null;
        hostPublication?: {
          __typename?: "HostPublication";
          summary: string;
        } | null;
        manifestationParts?: {
          __typename?: "ManifestationParts";
          parts: Array<{ __typename?: "ManifestationPart"; title: string }>;
        } | null;
        accessTypes: Array<{
          __typename?: "AccessType";
          code: AccessTypeCodeEnum;
        }>;
        access: Array<
          | {
              __typename: "AccessUrl";
              origin: string;
              url: string;
              loginRequired: boolean;
            }
          | { __typename: "DigitalArticleService"; issn: string }
          | {
              __typename: "Ereol";
              origin: string;
              url: string;
              canAlwaysBeLoaned: boolean;
            }
          | { __typename: "InfomediaService"; id: string }
          | { __typename: "InterLibraryLoan"; loanIsPossible: boolean }
        >;
        shelfmark?: {
          __typename?: "Shelfmark";
          postfix?: string | null;
          shelfmark: string;
        } | null;
        workYear?: {
          __typename?: "PublicationYear";
          year?: number | null;
        } | null;
        catalogueCodes: {
          __typename?: "CatalogueCodes";
          nationalBibliography: Array<string>;
          otherCatalogues: Array<string>;
        };
      };
      bestRepresentation: {
        __typename?: "Manifestation";
        pid: string;
        genreAndForm: Array<string>;
        source: Array<string>;
        publisher: Array<string>;
        titles: {
          __typename?: "ManifestationTitles";
          main: Array<string>;
          original?: Array<string> | null;
        };
        fictionNonfiction?: {
          __typename?: "FictionNonfiction";
          display: string;
          code: FictionNonfictionCodeEnum;
        } | null;
        materialTypes: Array<{
          __typename?: "MaterialType";
          materialTypeSpecific: {
            __typename?: "SpecificMaterialType";
            display: string;
          };
        }>;
        creators: Array<
          | { __typename: "Corporation"; display: string; nameSort: string }
          | { __typename: "Person"; display: string; nameSort: string }
        >;
        identifiers: Array<{ __typename?: "Identifier"; value: string }>;
        contributors: Array<
          | {
              __typename?: "Corporation";
              display: string;
              roles: Array<{
                __typename?: "Role";
                function: { __typename?: "Translation"; singular: string };
              }>;
            }
          | {
              __typename?: "Person";
              display: string;
              roles: Array<{
                __typename?: "Role";
                function: { __typename?: "Translation"; singular: string };
              }>;
            }
        >;
        edition?: {
          __typename?: "Edition";
          summary: string;
          publicationYear?: {
            __typename?: "PublicationYear";
            display: string;
          } | null;
        } | null;
        dateFirstEdition?: {
          __typename?: "PublicationYear";
          display: string;
          year?: number | null;
        } | null;
        audience?: {
          __typename?: "Audience";
          generalAudience: Array<string>;
          ages: Array<{ __typename?: "Range"; display: string }>;
        } | null;
        notes: Array<{ __typename?: "Note"; display: Array<string> }>;
        languages?: {
          __typename?: "Languages";
          notes?: Array<string> | null;
          main?: Array<{
            __typename?: "Language";
            display: string;
            isoCode: string;
          }> | null;
        } | null;
        physicalDescription?: {
          __typename?: "PhysicalUnitDescription";
          summaryFull?: string | null;
          numberOfPages?: number | null;
        } | null;
        hostPublication?: {
          __typename?: "HostPublication";
          summary: string;
        } | null;
        manifestationParts?: {
          __typename?: "ManifestationParts";
          parts: Array<{ __typename?: "ManifestationPart"; title: string }>;
        } | null;
        accessTypes: Array<{
          __typename?: "AccessType";
          code: AccessTypeCodeEnum;
        }>;
        access: Array<
          | {
              __typename: "AccessUrl";
              origin: string;
              url: string;
              loginRequired: boolean;
            }
          | { __typename: "DigitalArticleService"; issn: string }
          | {
              __typename: "Ereol";
              origin: string;
              url: string;
              canAlwaysBeLoaned: boolean;
            }
          | { __typename: "InfomediaService"; id: string }
          | { __typename: "InterLibraryLoan"; loanIsPossible: boolean }
        >;
        shelfmark?: {
          __typename?: "Shelfmark";
          postfix?: string | null;
          shelfmark: string;
        } | null;
        workYear?: {
          __typename?: "PublicationYear";
          year?: number | null;
        } | null;
        catalogueCodes: {
          __typename?: "CatalogueCodes";
          nationalBibliography: Array<string>;
          otherCatalogues: Array<string>;
        };
      };
    };
  } | null;
};

export type GetMaterialGloballyQueryVariables = Exact<{
  wid: Scalars["String"]["input"];
}>;

export type GetMaterialGloballyQuery = {
  __typename?: "Query";
  work?: {
    __typename?: "Work";
    workId: string;
    abstract?: Array<string> | null;
    genreAndForm: Array<string>;
    materialTypes: Array<{
      __typename?: "MaterialType";
      materialTypeSpecific: {
        __typename?: "SpecificMaterialType";
        display: string;
      };
    }>;
    creators: Array<
      | { __typename: "Corporation"; nameSort: string; display: string }
      | { __typename: "Person"; nameSort: string; display: string }
    >;
    mainLanguages: Array<{
      __typename?: "Language";
      display: string;
      isoCode: string;
    }>;
    subjects: {
      __typename?: "SubjectContainer";
      all: Array<
        | { __typename?: "Corporation"; display: string }
        | { __typename?: "Mood"; display: string }
        | { __typename?: "NarrativeTechnique"; display: string }
        | { __typename?: "Person"; display: string }
        | { __typename?: "Setting"; display: string }
        | { __typename?: "SubjectText"; display: string }
        | { __typename?: "SubjectWithRating"; display: string }
        | { __typename?: "TimePeriod"; display: string }
      >;
      dbcVerified: Array<
        | { __typename?: "Corporation"; display: string }
        | { __typename?: "Mood"; display: string }
        | { __typename?: "NarrativeTechnique"; display: string }
        | { __typename?: "Person"; display: string }
        | { __typename?: "Setting"; display: string }
        | { __typename?: "SubjectText"; display: string }
        | { __typename?: "SubjectWithRating"; display: string }
        | { __typename?: "TimePeriod"; display: string }
      >;
    };
    fictionNonfiction?: {
      __typename?: "FictionNonfiction";
      display: string;
      code: FictionNonfictionCodeEnum;
    } | null;
    dk5MainEntry?: { __typename?: "DK5MainEntry"; display: string } | null;
    relations: {
      __typename?: "Relations";
      hasReview: Array<{ __typename?: "Manifestation"; pid: string }>;
      hasAdaptation: Array<{
        __typename?: "Manifestation";
        ownerWork: {
          __typename?: "Work";
          workId: string;
          workTypes: Array<WorkTypeEnum>;
          titles: { __typename?: "WorkTitles"; main: Array<string> };
        };
      }>;
    };
    titles: {
      __typename?: "WorkTitles";
      full: Array<string>;
      original?: Array<string> | null;
    };
    series: Array<{
      __typename?: "Series";
      title: string;
      isPopular?: boolean | null;
      readThisFirst?: boolean | null;
      readThisWhenever?: boolean | null;
      members: Array<{
        __typename?: "SerieWork";
        numberInSeries?: string | null;
        work: {
          __typename?: "Work";
          workId: string;
          titles: { __typename?: "WorkTitles"; main: Array<string> };
        };
      }>;
    }>;
    workYear?: { __typename?: "PublicationYear"; year?: number | null } | null;
    manifestations: {
      __typename?: "Manifestations";
      all: Array<{
        __typename?: "Manifestation";
        pid: string;
        genreAndForm: Array<string>;
        source: Array<string>;
        publisher: Array<string>;
        titles: {
          __typename?: "ManifestationTitles";
          main: Array<string>;
          original?: Array<string> | null;
        };
        fictionNonfiction?: {
          __typename?: "FictionNonfiction";
          display: string;
          code: FictionNonfictionCodeEnum;
        } | null;
        materialTypes: Array<{
          __typename?: "MaterialType";
          materialTypeSpecific: {
            __typename?: "SpecificMaterialType";
            display: string;
          };
        }>;
        creators: Array<
          | { __typename: "Corporation"; display: string; nameSort: string }
          | { __typename: "Person"; display: string; nameSort: string }
        >;
        identifiers: Array<{ __typename?: "Identifier"; value: string }>;
        contributors: Array<
          | {
              __typename?: "Corporation";
              display: string;
              roles: Array<{
                __typename?: "Role";
                function: { __typename?: "Translation"; singular: string };
              }>;
            }
          | {
              __typename?: "Person";
              display: string;
              roles: Array<{
                __typename?: "Role";
                function: { __typename?: "Translation"; singular: string };
              }>;
            }
        >;
        edition?: {
          __typename?: "Edition";
          summary: string;
          publicationYear?: {
            __typename?: "PublicationYear";
            display: string;
          } | null;
        } | null;
        dateFirstEdition?: {
          __typename?: "PublicationYear";
          display: string;
          year?: number | null;
        } | null;
        audience?: {
          __typename?: "Audience";
          generalAudience: Array<string>;
          ages: Array<{ __typename?: "Range"; display: string }>;
        } | null;
        notes: Array<{ __typename?: "Note"; display: Array<string> }>;
        languages?: {
          __typename?: "Languages";
          notes?: Array<string> | null;
          main?: Array<{
            __typename?: "Language";
            display: string;
            isoCode: string;
          }> | null;
        } | null;
        physicalDescription?: {
          __typename?: "PhysicalUnitDescription";
          summaryFull?: string | null;
          numberOfPages?: number | null;
        } | null;
        hostPublication?: {
          __typename?: "HostPublication";
          summary: string;
        } | null;
        manifestationParts?: {
          __typename?: "ManifestationParts";
          parts: Array<{ __typename?: "ManifestationPart"; title: string }>;
        } | null;
        accessTypes: Array<{
          __typename?: "AccessType";
          code: AccessTypeCodeEnum;
        }>;
        access: Array<
          | {
              __typename: "AccessUrl";
              origin: string;
              url: string;
              loginRequired: boolean;
            }
          | { __typename: "DigitalArticleService"; issn: string }
          | {
              __typename: "Ereol";
              origin: string;
              url: string;
              canAlwaysBeLoaned: boolean;
            }
          | { __typename: "InfomediaService"; id: string }
          | { __typename: "InterLibraryLoan"; loanIsPossible: boolean }
        >;
        shelfmark?: {
          __typename?: "Shelfmark";
          postfix?: string | null;
          shelfmark: string;
        } | null;
        workYear?: {
          __typename?: "PublicationYear";
          year?: number | null;
        } | null;
        catalogueCodes: {
          __typename?: "CatalogueCodes";
          nationalBibliography: Array<string>;
          otherCatalogues: Array<string>;
        };
      }>;
      latest: {
        __typename?: "Manifestation";
        pid: string;
        genreAndForm: Array<string>;
        source: Array<string>;
        publisher: Array<string>;
        titles: {
          __typename?: "ManifestationTitles";
          main: Array<string>;
          original?: Array<string> | null;
        };
        fictionNonfiction?: {
          __typename?: "FictionNonfiction";
          display: string;
          code: FictionNonfictionCodeEnum;
        } | null;
        materialTypes: Array<{
          __typename?: "MaterialType";
          materialTypeSpecific: {
            __typename?: "SpecificMaterialType";
            display: string;
          };
        }>;
        creators: Array<
          | { __typename: "Corporation"; display: string; nameSort: string }
          | { __typename: "Person"; display: string; nameSort: string }
        >;
        identifiers: Array<{ __typename?: "Identifier"; value: string }>;
        contributors: Array<
          | {
              __typename?: "Corporation";
              display: string;
              roles: Array<{
                __typename?: "Role";
                function: { __typename?: "Translation"; singular: string };
              }>;
            }
          | {
              __typename?: "Person";
              display: string;
              roles: Array<{
                __typename?: "Role";
                function: { __typename?: "Translation"; singular: string };
              }>;
            }
        >;
        edition?: {
          __typename?: "Edition";
          summary: string;
          publicationYear?: {
            __typename?: "PublicationYear";
            display: string;
          } | null;
        } | null;
        dateFirstEdition?: {
          __typename?: "PublicationYear";
          display: string;
          year?: number | null;
        } | null;
        audience?: {
          __typename?: "Audience";
          generalAudience: Array<string>;
          ages: Array<{ __typename?: "Range"; display: string }>;
        } | null;
        notes: Array<{ __typename?: "Note"; display: Array<string> }>;
        languages?: {
          __typename?: "Languages";
          notes?: Array<string> | null;
          main?: Array<{
            __typename?: "Language";
            display: string;
            isoCode: string;
          }> | null;
        } | null;
        physicalDescription?: {
          __typename?: "PhysicalUnitDescription";
          summaryFull?: string | null;
          numberOfPages?: number | null;
        } | null;
        hostPublication?: {
          __typename?: "HostPublication";
          summary: string;
        } | null;
        manifestationParts?: {
          __typename?: "ManifestationParts";
          parts: Array<{ __typename?: "ManifestationPart"; title: string }>;
        } | null;
        accessTypes: Array<{
          __typename?: "AccessType";
          code: AccessTypeCodeEnum;
        }>;
        access: Array<
          | {
              __typename: "AccessUrl";
              origin: string;
              url: string;
              loginRequired: boolean;
            }
          | { __typename: "DigitalArticleService"; issn: string }
          | {
              __typename: "Ereol";
              origin: string;
              url: string;
              canAlwaysBeLoaned: boolean;
            }
          | { __typename: "InfomediaService"; id: string }
          | { __typename: "InterLibraryLoan"; loanIsPossible: boolean }
        >;
        shelfmark?: {
          __typename?: "Shelfmark";
          postfix?: string | null;
          shelfmark: string;
        } | null;
        workYear?: {
          __typename?: "PublicationYear";
          year?: number | null;
        } | null;
        catalogueCodes: {
          __typename?: "CatalogueCodes";
          nationalBibliography: Array<string>;
          otherCatalogues: Array<string>;
        };
      };
      bestRepresentation: {
        __typename?: "Manifestation";
        pid: string;
        genreAndForm: Array<string>;
        source: Array<string>;
        publisher: Array<string>;
        titles: {
          __typename?: "ManifestationTitles";
          main: Array<string>;
          original?: Array<string> | null;
        };
        fictionNonfiction?: {
          __typename?: "FictionNonfiction";
          display: string;
          code: FictionNonfictionCodeEnum;
        } | null;
        materialTypes: Array<{
          __typename?: "MaterialType";
          materialTypeSpecific: {
            __typename?: "SpecificMaterialType";
            display: string;
          };
        }>;
        creators: Array<
          | { __typename: "Corporation"; display: string; nameSort: string }
          | { __typename: "Person"; display: string; nameSort: string }
        >;
        identifiers: Array<{ __typename?: "Identifier"; value: string }>;
        contributors: Array<
          | {
              __typename?: "Corporation";
              display: string;
              roles: Array<{
                __typename?: "Role";
                function: { __typename?: "Translation"; singular: string };
              }>;
            }
          | {
              __typename?: "Person";
              display: string;
              roles: Array<{
                __typename?: "Role";
                function: { __typename?: "Translation"; singular: string };
              }>;
            }
        >;
        edition?: {
          __typename?: "Edition";
          summary: string;
          publicationYear?: {
            __typename?: "PublicationYear";
            display: string;
          } | null;
        } | null;
        dateFirstEdition?: {
          __typename?: "PublicationYear";
          display: string;
          year?: number | null;
        } | null;
        audience?: {
          __typename?: "Audience";
          generalAudience: Array<string>;
          ages: Array<{ __typename?: "Range"; display: string }>;
        } | null;
        notes: Array<{ __typename?: "Note"; display: Array<string> }>;
        languages?: {
          __typename?: "Languages";
          notes?: Array<string> | null;
          main?: Array<{
            __typename?: "Language";
            display: string;
            isoCode: string;
          }> | null;
        } | null;
        physicalDescription?: {
          __typename?: "PhysicalUnitDescription";
          summaryFull?: string | null;
          numberOfPages?: number | null;
        } | null;
        hostPublication?: {
          __typename?: "HostPublication";
          summary: string;
        } | null;
        manifestationParts?: {
          __typename?: "ManifestationParts";
          parts: Array<{ __typename?: "ManifestationPart"; title: string }>;
        } | null;
        accessTypes: Array<{
          __typename?: "AccessType";
          code: AccessTypeCodeEnum;
        }>;
        access: Array<
          | {
              __typename: "AccessUrl";
              origin: string;
              url: string;
              loginRequired: boolean;
            }
          | { __typename: "DigitalArticleService"; issn: string }
          | {
              __typename: "Ereol";
              origin: string;
              url: string;
              canAlwaysBeLoaned: boolean;
            }
          | { __typename: "InfomediaService"; id: string }
          | { __typename: "InterLibraryLoan"; loanIsPossible: boolean }
        >;
        shelfmark?: {
          __typename?: "Shelfmark";
          postfix?: string | null;
          shelfmark: string;
        } | null;
        workYear?: {
          __typename?: "PublicationYear";
          year?: number | null;
        } | null;
        catalogueCodes: {
          __typename?: "CatalogueCodes";
          nationalBibliography: Array<string>;
          otherCatalogues: Array<string>;
        };
      };
    };
  } | null;
};

export type GetInfomediaQueryVariables = Exact<{
  id: Scalars["String"]["input"];
}>;

export type GetInfomediaQuery = {
  __typename?: "Query";
  infomedia: {
    __typename?: "InfomediaResponse";
    error?: InfomediaErrorEnum | null;
    article?: {
      __typename?: "InfomediaArticle";
      headLine?: string | null;
      text?: string | null;
    } | null;
  };
};

export type GetReviewManifestationsQueryVariables = Exact<{
  pid: Array<Scalars["String"]["input"]> | Scalars["String"]["input"];
}>;

export type GetReviewManifestationsQuery = {
  __typename?: "Query";
  manifestations: Array<{
    __typename?: "Manifestation";
    pid: string;
    creators: Array<
      | { __typename?: "Corporation"; display: string }
      | { __typename?: "Person"; display: string }
    >;
    access: Array<
      | { __typename: "AccessUrl"; url: string; origin: string }
      | { __typename: "DigitalArticleService"; issn: string }
      | { __typename: "Ereol" }
      | { __typename: "InfomediaService"; id: string }
      | { __typename: "InterLibraryLoan" }
    >;
    edition?: {
      __typename?: "Edition";
      publicationYear?: {
        __typename?: "PublicationYear";
        display: string;
      } | null;
    } | null;
    hostPublication?: {
      __typename?: "HostPublication";
      title: string;
      issue?: string | null;
    } | null;
    physicalDescription?: {
      __typename?: "PhysicalUnitDescription";
      summaryFull?: string | null;
    } | null;
    dateFirstEdition?: {
      __typename?: "PublicationYear";
      display: string;
    } | null;
    workYear?: { __typename?: "PublicationYear"; display: string } | null;
    review?: {
      __typename?: "ManifestationReview";
      rating?: string | null;
      reviewByLibrarians?: Array<{
        __typename?: "ReviewElement";
        content?: string | null;
        heading?: string | null;
        type?: ReviewElementTypeEnum | null;
        manifestations?: Array<{
          __typename?: "Manifestation";
          pid: string;
          titles: { __typename?: "ManifestationTitles"; main: Array<string> };
        } | null> | null;
      } | null> | null;
    } | null;
  } | null>;
};

export type OpenOrderMutationVariables = Exact<{
  input: SubmitOrderInput;
}>;

export type OpenOrderMutation = {
  __typename?: "Mutation";
  submitOrder?: {
    __typename?: "SubmitOrder";
    status: SubmitOrderStatusEnum;
    message?: string | null;
    orderId?: string | null;
  } | null;
};

export type RecommendFromFaustQueryVariables = Exact<{
  faust: Scalars["String"]["input"];
  limit: Scalars["Int"]["input"];
}>;

export type RecommendFromFaustQuery = {
  __typename?: "Query";
  recommend: {
    __typename?: "RecommendationResponse";
    result: Array<{
      __typename?: "Recommendation";
      work: {
        __typename?: "Work";
        workId: string;
        abstract?: Array<string> | null;
        genreAndForm: Array<string>;
        titles: {
          __typename?: "WorkTitles";
          full: Array<string>;
          original?: Array<string> | null;
        };
        creators: Array<
          | { __typename: "Corporation"; display: string }
          | { __typename: "Person"; display: string }
        >;
        series: Array<{
          __typename?: "Series";
          title: string;
          isPopular?: boolean | null;
          readThisFirst?: boolean | null;
          readThisWhenever?: boolean | null;
          members: Array<{
            __typename?: "SerieWork";
            numberInSeries?: string | null;
            work: {
              __typename?: "Work";
              workId: string;
              titles: { __typename?: "WorkTitles"; main: Array<string> };
            };
          }>;
        }>;
        workYear?: {
          __typename?: "PublicationYear";
          year?: number | null;
        } | null;
        manifestations: {
          __typename?: "Manifestations";
          all: Array<{
            __typename?: "Manifestation";
            pid: string;
            genreAndForm: Array<string>;
            source: Array<string>;
            publisher: Array<string>;
            titles: {
              __typename?: "ManifestationTitles";
              main: Array<string>;
              original?: Array<string> | null;
            };
            fictionNonfiction?: {
              __typename?: "FictionNonfiction";
              display: string;
              code: FictionNonfictionCodeEnum;
            } | null;
            materialTypes: Array<{
              __typename?: "MaterialType";
              materialTypeSpecific: {
                __typename?: "SpecificMaterialType";
                display: string;
              };
            }>;
            creators: Array<
              | { __typename: "Corporation"; display: string; nameSort: string }
              | { __typename: "Person"; display: string; nameSort: string }
            >;
            identifiers: Array<{ __typename?: "Identifier"; value: string }>;
            contributors: Array<
              | {
                  __typename?: "Corporation";
                  display: string;
                  roles: Array<{
                    __typename?: "Role";
                    function: { __typename?: "Translation"; singular: string };
                  }>;
                }
              | {
                  __typename?: "Person";
                  display: string;
                  roles: Array<{
                    __typename?: "Role";
                    function: { __typename?: "Translation"; singular: string };
                  }>;
                }
            >;
            edition?: {
              __typename?: "Edition";
              summary: string;
              publicationYear?: {
                __typename?: "PublicationYear";
                display: string;
              } | null;
            } | null;
            dateFirstEdition?: {
              __typename?: "PublicationYear";
              display: string;
              year?: number | null;
            } | null;
            audience?: {
              __typename?: "Audience";
              generalAudience: Array<string>;
              ages: Array<{ __typename?: "Range"; display: string }>;
            } | null;
            notes: Array<{ __typename?: "Note"; display: Array<string> }>;
            languages?: {
              __typename?: "Languages";
              notes?: Array<string> | null;
              main?: Array<{
                __typename?: "Language";
                display: string;
                isoCode: string;
              }> | null;
            } | null;
            physicalDescription?: {
              __typename?: "PhysicalUnitDescription";
              summaryFull?: string | null;
              numberOfPages?: number | null;
            } | null;
            hostPublication?: {
              __typename?: "HostPublication";
              summary: string;
            } | null;
            manifestationParts?: {
              __typename?: "ManifestationParts";
              parts: Array<{ __typename?: "ManifestationPart"; title: string }>;
            } | null;
            accessTypes: Array<{
              __typename?: "AccessType";
              code: AccessTypeCodeEnum;
            }>;
            access: Array<
              | {
                  __typename: "AccessUrl";
                  origin: string;
                  url: string;
                  loginRequired: boolean;
                }
              | { __typename: "DigitalArticleService"; issn: string }
              | {
                  __typename: "Ereol";
                  origin: string;
                  url: string;
                  canAlwaysBeLoaned: boolean;
                }
              | { __typename: "InfomediaService"; id: string }
              | { __typename: "InterLibraryLoan"; loanIsPossible: boolean }
            >;
            shelfmark?: {
              __typename?: "Shelfmark";
              postfix?: string | null;
              shelfmark: string;
            } | null;
            workYear?: {
              __typename?: "PublicationYear";
              year?: number | null;
            } | null;
            catalogueCodes: {
              __typename?: "CatalogueCodes";
              nationalBibliography: Array<string>;
              otherCatalogues: Array<string>;
            };
          }>;
          latest: {
            __typename?: "Manifestation";
            pid: string;
            genreAndForm: Array<string>;
            source: Array<string>;
            publisher: Array<string>;
            titles: {
              __typename?: "ManifestationTitles";
              main: Array<string>;
              original?: Array<string> | null;
            };
            fictionNonfiction?: {
              __typename?: "FictionNonfiction";
              display: string;
              code: FictionNonfictionCodeEnum;
            } | null;
            materialTypes: Array<{
              __typename?: "MaterialType";
              materialTypeSpecific: {
                __typename?: "SpecificMaterialType";
                display: string;
              };
            }>;
            creators: Array<
              | { __typename: "Corporation"; display: string; nameSort: string }
              | { __typename: "Person"; display: string; nameSort: string }
            >;
            identifiers: Array<{ __typename?: "Identifier"; value: string }>;
            contributors: Array<
              | {
                  __typename?: "Corporation";
                  display: string;
                  roles: Array<{
                    __typename?: "Role";
                    function: { __typename?: "Translation"; singular: string };
                  }>;
                }
              | {
                  __typename?: "Person";
                  display: string;
                  roles: Array<{
                    __typename?: "Role";
                    function: { __typename?: "Translation"; singular: string };
                  }>;
                }
            >;
            edition?: {
              __typename?: "Edition";
              summary: string;
              publicationYear?: {
                __typename?: "PublicationYear";
                display: string;
              } | null;
            } | null;
            dateFirstEdition?: {
              __typename?: "PublicationYear";
              display: string;
              year?: number | null;
            } | null;
            audience?: {
              __typename?: "Audience";
              generalAudience: Array<string>;
              ages: Array<{ __typename?: "Range"; display: string }>;
            } | null;
            notes: Array<{ __typename?: "Note"; display: Array<string> }>;
            languages?: {
              __typename?: "Languages";
              notes?: Array<string> | null;
              main?: Array<{
                __typename?: "Language";
                display: string;
                isoCode: string;
              }> | null;
            } | null;
            physicalDescription?: {
              __typename?: "PhysicalUnitDescription";
              summaryFull?: string | null;
              numberOfPages?: number | null;
            } | null;
            hostPublication?: {
              __typename?: "HostPublication";
              summary: string;
            } | null;
            manifestationParts?: {
              __typename?: "ManifestationParts";
              parts: Array<{ __typename?: "ManifestationPart"; title: string }>;
            } | null;
            accessTypes: Array<{
              __typename?: "AccessType";
              code: AccessTypeCodeEnum;
            }>;
            access: Array<
              | {
                  __typename: "AccessUrl";
                  origin: string;
                  url: string;
                  loginRequired: boolean;
                }
              | { __typename: "DigitalArticleService"; issn: string }
              | {
                  __typename: "Ereol";
                  origin: string;
                  url: string;
                  canAlwaysBeLoaned: boolean;
                }
              | { __typename: "InfomediaService"; id: string }
              | { __typename: "InterLibraryLoan"; loanIsPossible: boolean }
            >;
            shelfmark?: {
              __typename?: "Shelfmark";
              postfix?: string | null;
              shelfmark: string;
            } | null;
            workYear?: {
              __typename?: "PublicationYear";
              year?: number | null;
            } | null;
            catalogueCodes: {
              __typename?: "CatalogueCodes";
              nationalBibliography: Array<string>;
              otherCatalogues: Array<string>;
            };
          };
          bestRepresentation: {
            __typename?: "Manifestation";
            pid: string;
            genreAndForm: Array<string>;
            source: Array<string>;
            publisher: Array<string>;
            titles: {
              __typename?: "ManifestationTitles";
              main: Array<string>;
              original?: Array<string> | null;
            };
            fictionNonfiction?: {
              __typename?: "FictionNonfiction";
              display: string;
              code: FictionNonfictionCodeEnum;
            } | null;
            materialTypes: Array<{
              __typename?: "MaterialType";
              materialTypeSpecific: {
                __typename?: "SpecificMaterialType";
                display: string;
              };
            }>;
            creators: Array<
              | { __typename: "Corporation"; display: string; nameSort: string }
              | { __typename: "Person"; display: string; nameSort: string }
            >;
            identifiers: Array<{ __typename?: "Identifier"; value: string }>;
            contributors: Array<
              | {
                  __typename?: "Corporation";
                  display: string;
                  roles: Array<{
                    __typename?: "Role";
                    function: { __typename?: "Translation"; singular: string };
                  }>;
                }
              | {
                  __typename?: "Person";
                  display: string;
                  roles: Array<{
                    __typename?: "Role";
                    function: { __typename?: "Translation"; singular: string };
                  }>;
                }
            >;
            edition?: {
              __typename?: "Edition";
              summary: string;
              publicationYear?: {
                __typename?: "PublicationYear";
                display: string;
              } | null;
            } | null;
            dateFirstEdition?: {
              __typename?: "PublicationYear";
              display: string;
              year?: number | null;
            } | null;
            audience?: {
              __typename?: "Audience";
              generalAudience: Array<string>;
              ages: Array<{ __typename?: "Range"; display: string }>;
            } | null;
            notes: Array<{ __typename?: "Note"; display: Array<string> }>;
            languages?: {
              __typename?: "Languages";
              notes?: Array<string> | null;
              main?: Array<{
                __typename?: "Language";
                display: string;
                isoCode: string;
              }> | null;
            } | null;
            physicalDescription?: {
              __typename?: "PhysicalUnitDescription";
              summaryFull?: string | null;
              numberOfPages?: number | null;
            } | null;
            hostPublication?: {
              __typename?: "HostPublication";
              summary: string;
            } | null;
            manifestationParts?: {
              __typename?: "ManifestationParts";
              parts: Array<{ __typename?: "ManifestationPart"; title: string }>;
            } | null;
            accessTypes: Array<{
              __typename?: "AccessType";
              code: AccessTypeCodeEnum;
            }>;
            access: Array<
              | {
                  __typename: "AccessUrl";
                  origin: string;
                  url: string;
                  loginRequired: boolean;
                }
              | { __typename: "DigitalArticleService"; issn: string }
              | {
                  __typename: "Ereol";
                  origin: string;
                  url: string;
                  canAlwaysBeLoaned: boolean;
                }
              | { __typename: "InfomediaService"; id: string }
              | { __typename: "InterLibraryLoan"; loanIsPossible: boolean }
            >;
            shelfmark?: {
              __typename?: "Shelfmark";
              postfix?: string | null;
              shelfmark: string;
            } | null;
            workYear?: {
              __typename?: "PublicationYear";
              year?: number | null;
            } | null;
            catalogueCodes: {
              __typename?: "CatalogueCodes";
              nationalBibliography: Array<string>;
              otherCatalogues: Array<string>;
            };
          };
        };
      };
    }>;
  };
};

export type SearchWithPaginationQueryVariables = Exact<{
  q: SearchQueryInput;
  offset: Scalars["Int"]["input"];
  limit: Scalars["PaginationLimitScalar"]["input"];
  filters?: InputMaybe<SearchFiltersInput>;
}>;

export type SearchWithPaginationQuery = {
  __typename?: "Query";
  search: {
    __typename?: "SearchResponse";
    hitcount: number;
    works: Array<{
      __typename?: "Work";
      workId: string;
      abstract?: Array<string> | null;
      genreAndForm: Array<string>;
      titles: {
        __typename?: "WorkTitles";
        full: Array<string>;
        original?: Array<string> | null;
      };
      creators: Array<
        | { __typename: "Corporation"; display: string }
        | { __typename: "Person"; display: string }
      >;
      series: Array<{
        __typename?: "Series";
        title: string;
        isPopular?: boolean | null;
        readThisFirst?: boolean | null;
        readThisWhenever?: boolean | null;
        members: Array<{
          __typename?: "SerieWork";
          numberInSeries?: string | null;
          work: {
            __typename?: "Work";
            workId: string;
            titles: { __typename?: "WorkTitles"; main: Array<string> };
          };
        }>;
      }>;
      workYear?: {
        __typename?: "PublicationYear";
        year?: number | null;
      } | null;
      manifestations: {
        __typename?: "Manifestations";
        all: Array<{
          __typename?: "Manifestation";
          pid: string;
          genreAndForm: Array<string>;
          source: Array<string>;
          publisher: Array<string>;
          titles: {
            __typename?: "ManifestationTitles";
            main: Array<string>;
            original?: Array<string> | null;
          };
          fictionNonfiction?: {
            __typename?: "FictionNonfiction";
            display: string;
            code: FictionNonfictionCodeEnum;
          } | null;
          materialTypes: Array<{
            __typename?: "MaterialType";
            materialTypeSpecific: {
              __typename?: "SpecificMaterialType";
              display: string;
            };
          }>;
          creators: Array<
            | { __typename: "Corporation"; display: string; nameSort: string }
            | { __typename: "Person"; display: string; nameSort: string }
          >;
          identifiers: Array<{ __typename?: "Identifier"; value: string }>;
          contributors: Array<
            | {
                __typename?: "Corporation";
                display: string;
                roles: Array<{
                  __typename?: "Role";
                  function: { __typename?: "Translation"; singular: string };
                }>;
              }
            | {
                __typename?: "Person";
                display: string;
                roles: Array<{
                  __typename?: "Role";
                  function: { __typename?: "Translation"; singular: string };
                }>;
              }
          >;
          edition?: {
            __typename?: "Edition";
            summary: string;
            publicationYear?: {
              __typename?: "PublicationYear";
              display: string;
            } | null;
          } | null;
          dateFirstEdition?: {
            __typename?: "PublicationYear";
            display: string;
            year?: number | null;
          } | null;
          audience?: {
            __typename?: "Audience";
            generalAudience: Array<string>;
            ages: Array<{ __typename?: "Range"; display: string }>;
          } | null;
          notes: Array<{ __typename?: "Note"; display: Array<string> }>;
          languages?: {
            __typename?: "Languages";
            notes?: Array<string> | null;
            main?: Array<{
              __typename?: "Language";
              display: string;
              isoCode: string;
            }> | null;
          } | null;
          physicalDescription?: {
            __typename?: "PhysicalUnitDescription";
            summaryFull?: string | null;
            numberOfPages?: number | null;
          } | null;
          hostPublication?: {
            __typename?: "HostPublication";
            summary: string;
          } | null;
          manifestationParts?: {
            __typename?: "ManifestationParts";
            parts: Array<{ __typename?: "ManifestationPart"; title: string }>;
          } | null;
          accessTypes: Array<{
            __typename?: "AccessType";
            code: AccessTypeCodeEnum;
          }>;
          access: Array<
            | {
                __typename: "AccessUrl";
                origin: string;
                url: string;
                loginRequired: boolean;
              }
            | { __typename: "DigitalArticleService"; issn: string }
            | {
                __typename: "Ereol";
                origin: string;
                url: string;
                canAlwaysBeLoaned: boolean;
              }
            | { __typename: "InfomediaService"; id: string }
            | { __typename: "InterLibraryLoan"; loanIsPossible: boolean }
          >;
          shelfmark?: {
            __typename?: "Shelfmark";
            postfix?: string | null;
            shelfmark: string;
          } | null;
          workYear?: {
            __typename?: "PublicationYear";
            year?: number | null;
          } | null;
          catalogueCodes: {
            __typename?: "CatalogueCodes";
            nationalBibliography: Array<string>;
            otherCatalogues: Array<string>;
          };
        }>;
        latest: {
          __typename?: "Manifestation";
          pid: string;
          genreAndForm: Array<string>;
          source: Array<string>;
          publisher: Array<string>;
          titles: {
            __typename?: "ManifestationTitles";
            main: Array<string>;
            original?: Array<string> | null;
          };
          fictionNonfiction?: {
            __typename?: "FictionNonfiction";
            display: string;
            code: FictionNonfictionCodeEnum;
          } | null;
          materialTypes: Array<{
            __typename?: "MaterialType";
            materialTypeSpecific: {
              __typename?: "SpecificMaterialType";
              display: string;
            };
          }>;
          creators: Array<
            | { __typename: "Corporation"; display: string; nameSort: string }
            | { __typename: "Person"; display: string; nameSort: string }
          >;
          identifiers: Array<{ __typename?: "Identifier"; value: string }>;
          contributors: Array<
            | {
                __typename?: "Corporation";
                display: string;
                roles: Array<{
                  __typename?: "Role";
                  function: { __typename?: "Translation"; singular: string };
                }>;
              }
            | {
                __typename?: "Person";
                display: string;
                roles: Array<{
                  __typename?: "Role";
                  function: { __typename?: "Translation"; singular: string };
                }>;
              }
          >;
          edition?: {
            __typename?: "Edition";
            summary: string;
            publicationYear?: {
              __typename?: "PublicationYear";
              display: string;
            } | null;
          } | null;
          dateFirstEdition?: {
            __typename?: "PublicationYear";
            display: string;
            year?: number | null;
          } | null;
          audience?: {
            __typename?: "Audience";
            generalAudience: Array<string>;
            ages: Array<{ __typename?: "Range"; display: string }>;
          } | null;
          notes: Array<{ __typename?: "Note"; display: Array<string> }>;
          languages?: {
            __typename?: "Languages";
            notes?: Array<string> | null;
            main?: Array<{
              __typename?: "Language";
              display: string;
              isoCode: string;
            }> | null;
          } | null;
          physicalDescription?: {
            __typename?: "PhysicalUnitDescription";
            summaryFull?: string | null;
            numberOfPages?: number | null;
          } | null;
          hostPublication?: {
            __typename?: "HostPublication";
            summary: string;
          } | null;
          manifestationParts?: {
            __typename?: "ManifestationParts";
            parts: Array<{ __typename?: "ManifestationPart"; title: string }>;
          } | null;
          accessTypes: Array<{
            __typename?: "AccessType";
            code: AccessTypeCodeEnum;
          }>;
          access: Array<
            | {
                __typename: "AccessUrl";
                origin: string;
                url: string;
                loginRequired: boolean;
              }
            | { __typename: "DigitalArticleService"; issn: string }
            | {
                __typename: "Ereol";
                origin: string;
                url: string;
                canAlwaysBeLoaned: boolean;
              }
            | { __typename: "InfomediaService"; id: string }
            | { __typename: "InterLibraryLoan"; loanIsPossible: boolean }
          >;
          shelfmark?: {
            __typename?: "Shelfmark";
            postfix?: string | null;
            shelfmark: string;
          } | null;
          workYear?: {
            __typename?: "PublicationYear";
            year?: number | null;
          } | null;
          catalogueCodes: {
            __typename?: "CatalogueCodes";
            nationalBibliography: Array<string>;
            otherCatalogues: Array<string>;
          };
        };
        bestRepresentation: {
          __typename?: "Manifestation";
          pid: string;
          genreAndForm: Array<string>;
          source: Array<string>;
          publisher: Array<string>;
          titles: {
            __typename?: "ManifestationTitles";
            main: Array<string>;
            original?: Array<string> | null;
          };
          fictionNonfiction?: {
            __typename?: "FictionNonfiction";
            display: string;
            code: FictionNonfictionCodeEnum;
          } | null;
          materialTypes: Array<{
            __typename?: "MaterialType";
            materialTypeSpecific: {
              __typename?: "SpecificMaterialType";
              display: string;
            };
          }>;
          creators: Array<
            | { __typename: "Corporation"; display: string; nameSort: string }
            | { __typename: "Person"; display: string; nameSort: string }
          >;
          identifiers: Array<{ __typename?: "Identifier"; value: string }>;
          contributors: Array<
            | {
                __typename?: "Corporation";
                display: string;
                roles: Array<{
                  __typename?: "Role";
                  function: { __typename?: "Translation"; singular: string };
                }>;
              }
            | {
                __typename?: "Person";
                display: string;
                roles: Array<{
                  __typename?: "Role";
                  function: { __typename?: "Translation"; singular: string };
                }>;
              }
          >;
          edition?: {
            __typename?: "Edition";
            summary: string;
            publicationYear?: {
              __typename?: "PublicationYear";
              display: string;
            } | null;
          } | null;
          dateFirstEdition?: {
            __typename?: "PublicationYear";
            display: string;
            year?: number | null;
          } | null;
          audience?: {
            __typename?: "Audience";
            generalAudience: Array<string>;
            ages: Array<{ __typename?: "Range"; display: string }>;
          } | null;
          notes: Array<{ __typename?: "Note"; display: Array<string> }>;
          languages?: {
            __typename?: "Languages";
            notes?: Array<string> | null;
            main?: Array<{
              __typename?: "Language";
              display: string;
              isoCode: string;
            }> | null;
          } | null;
          physicalDescription?: {
            __typename?: "PhysicalUnitDescription";
            summaryFull?: string | null;
            numberOfPages?: number | null;
          } | null;
          hostPublication?: {
            __typename?: "HostPublication";
            summary: string;
          } | null;
          manifestationParts?: {
            __typename?: "ManifestationParts";
            parts: Array<{ __typename?: "ManifestationPart"; title: string }>;
          } | null;
          accessTypes: Array<{
            __typename?: "AccessType";
            code: AccessTypeCodeEnum;
          }>;
          access: Array<
            | {
                __typename: "AccessUrl";
                origin: string;
                url: string;
                loginRequired: boolean;
              }
            | { __typename: "DigitalArticleService"; issn: string }
            | {
                __typename: "Ereol";
                origin: string;
                url: string;
                canAlwaysBeLoaned: boolean;
              }
            | { __typename: "InfomediaService"; id: string }
            | { __typename: "InterLibraryLoan"; loanIsPossible: boolean }
          >;
          shelfmark?: {
            __typename?: "Shelfmark";
            postfix?: string | null;
            shelfmark: string;
          } | null;
          workYear?: {
            __typename?: "PublicationYear";
            year?: number | null;
          } | null;
          catalogueCodes: {
            __typename?: "CatalogueCodes";
            nationalBibliography: Array<string>;
            otherCatalogues: Array<string>;
          };
        };
      };
    }>;
  };
};

export type ComplexSearchWithPaginationWorkAccessQueryVariables = Exact<{
  cql: Scalars["String"]["input"];
  offset: Scalars["Int"]["input"];
  limit: Scalars["PaginationLimitScalar"]["input"];
  filters: ComplexSearchFiltersInput;
}>;

export type ComplexSearchWithPaginationWorkAccessQuery = {
  __typename?: "Query";
  complexSearch: {
    __typename?: "ComplexSearchResponse";
    hitcount: number;
    works: Array<{
      __typename?: "Work";
      workId: string;
      manifestations: {
        __typename?: "Manifestations";
        all: Array<{
          __typename?: "Manifestation";
          pid: string;
          identifiers: Array<{
            __typename?: "Identifier";
            type: IdentifierTypeEnum;
            value: string;
          }>;
          access: Array<
            | {
                __typename: "AccessUrl";
                origin: string;
                url: string;
                loginRequired: boolean;
              }
            | { __typename: "DigitalArticleService"; issn: string }
            | {
                __typename: "Ereol";
                origin: string;
                url: string;
                canAlwaysBeLoaned: boolean;
              }
            | { __typename: "InfomediaService"; id: string }
            | { __typename: "InterLibraryLoan"; loanIsPossible: boolean }
          >;
        }>;
      };
    }>;
  };
};

export type ComplexSearchWithPaginationQueryVariables = Exact<{
  cql: Scalars["String"]["input"];
  offset: Scalars["Int"]["input"];
  limit: Scalars["PaginationLimitScalar"]["input"];
  filters: ComplexSearchFiltersInput;
}>;

export type ComplexSearchWithPaginationQuery = {
  __typename?: "Query";
  complexSearch: {
    __typename?: "ComplexSearchResponse";
    hitcount: number;
    works: Array<{
      __typename?: "Work";
      workId: string;
      abstract?: Array<string> | null;
      genreAndForm: Array<string>;
      titles: {
        __typename?: "WorkTitles";
        full: Array<string>;
        original?: Array<string> | null;
      };
      creators: Array<
        | { __typename: "Corporation"; display: string }
        | { __typename: "Person"; display: string }
      >;
      series: Array<{
        __typename?: "Series";
        title: string;
        isPopular?: boolean | null;
        readThisFirst?: boolean | null;
        readThisWhenever?: boolean | null;
        members: Array<{
          __typename?: "SerieWork";
          numberInSeries?: string | null;
          work: {
            __typename?: "Work";
            workId: string;
            titles: { __typename?: "WorkTitles"; main: Array<string> };
          };
        }>;
      }>;
      workYear?: {
        __typename?: "PublicationYear";
        year?: number | null;
      } | null;
      manifestations: {
        __typename?: "Manifestations";
        all: Array<{
          __typename?: "Manifestation";
          pid: string;
          genreAndForm: Array<string>;
          source: Array<string>;
          publisher: Array<string>;
          titles: {
            __typename?: "ManifestationTitles";
            main: Array<string>;
            original?: Array<string> | null;
          };
          fictionNonfiction?: {
            __typename?: "FictionNonfiction";
            display: string;
            code: FictionNonfictionCodeEnum;
          } | null;
          materialTypes: Array<{
            __typename?: "MaterialType";
            materialTypeSpecific: {
              __typename?: "SpecificMaterialType";
              display: string;
            };
          }>;
          creators: Array<
            | { __typename: "Corporation"; display: string; nameSort: string }
            | { __typename: "Person"; display: string; nameSort: string }
          >;
          identifiers: Array<{ __typename?: "Identifier"; value: string }>;
          contributors: Array<
            | {
                __typename?: "Corporation";
                display: string;
                roles: Array<{
                  __typename?: "Role";
                  function: { __typename?: "Translation"; singular: string };
                }>;
              }
            | {
                __typename?: "Person";
                display: string;
                roles: Array<{
                  __typename?: "Role";
                  function: { __typename?: "Translation"; singular: string };
                }>;
              }
          >;
          edition?: {
            __typename?: "Edition";
            summary: string;
            publicationYear?: {
              __typename?: "PublicationYear";
              display: string;
            } | null;
          } | null;
          dateFirstEdition?: {
            __typename?: "PublicationYear";
            display: string;
            year?: number | null;
          } | null;
          audience?: {
            __typename?: "Audience";
            generalAudience: Array<string>;
            ages: Array<{ __typename?: "Range"; display: string }>;
          } | null;
          notes: Array<{ __typename?: "Note"; display: Array<string> }>;
          languages?: {
            __typename?: "Languages";
            notes?: Array<string> | null;
            main?: Array<{
              __typename?: "Language";
              display: string;
              isoCode: string;
            }> | null;
          } | null;
          physicalDescription?: {
            __typename?: "PhysicalUnitDescription";
            summaryFull?: string | null;
            numberOfPages?: number | null;
          } | null;
          hostPublication?: {
            __typename?: "HostPublication";
            summary: string;
          } | null;
          manifestationParts?: {
            __typename?: "ManifestationParts";
            parts: Array<{ __typename?: "ManifestationPart"; title: string }>;
          } | null;
          accessTypes: Array<{
            __typename?: "AccessType";
            code: AccessTypeCodeEnum;
          }>;
          access: Array<
            | {
                __typename: "AccessUrl";
                origin: string;
                url: string;
                loginRequired: boolean;
              }
            | { __typename: "DigitalArticleService"; issn: string }
            | {
                __typename: "Ereol";
                origin: string;
                url: string;
                canAlwaysBeLoaned: boolean;
              }
            | { __typename: "InfomediaService"; id: string }
            | { __typename: "InterLibraryLoan"; loanIsPossible: boolean }
          >;
          shelfmark?: {
            __typename?: "Shelfmark";
            postfix?: string | null;
            shelfmark: string;
          } | null;
          workYear?: {
            __typename?: "PublicationYear";
            year?: number | null;
          } | null;
          catalogueCodes: {
            __typename?: "CatalogueCodes";
            nationalBibliography: Array<string>;
            otherCatalogues: Array<string>;
          };
        }>;
        latest: {
          __typename?: "Manifestation";
          pid: string;
          genreAndForm: Array<string>;
          source: Array<string>;
          publisher: Array<string>;
          titles: {
            __typename?: "ManifestationTitles";
            main: Array<string>;
            original?: Array<string> | null;
          };
          fictionNonfiction?: {
            __typename?: "FictionNonfiction";
            display: string;
            code: FictionNonfictionCodeEnum;
          } | null;
          materialTypes: Array<{
            __typename?: "MaterialType";
            materialTypeSpecific: {
              __typename?: "SpecificMaterialType";
              display: string;
            };
          }>;
          creators: Array<
            | { __typename: "Corporation"; display: string; nameSort: string }
            | { __typename: "Person"; display: string; nameSort: string }
          >;
          identifiers: Array<{ __typename?: "Identifier"; value: string }>;
          contributors: Array<
            | {
                __typename?: "Corporation";
                display: string;
                roles: Array<{
                  __typename?: "Role";
                  function: { __typename?: "Translation"; singular: string };
                }>;
              }
            | {
                __typename?: "Person";
                display: string;
                roles: Array<{
                  __typename?: "Role";
                  function: { __typename?: "Translation"; singular: string };
                }>;
              }
          >;
          edition?: {
            __typename?: "Edition";
            summary: string;
            publicationYear?: {
              __typename?: "PublicationYear";
              display: string;
            } | null;
          } | null;
          dateFirstEdition?: {
            __typename?: "PublicationYear";
            display: string;
            year?: number | null;
          } | null;
          audience?: {
            __typename?: "Audience";
            generalAudience: Array<string>;
            ages: Array<{ __typename?: "Range"; display: string }>;
          } | null;
          notes: Array<{ __typename?: "Note"; display: Array<string> }>;
          languages?: {
            __typename?: "Languages";
            notes?: Array<string> | null;
            main?: Array<{
              __typename?: "Language";
              display: string;
              isoCode: string;
            }> | null;
          } | null;
          physicalDescription?: {
            __typename?: "PhysicalUnitDescription";
            summaryFull?: string | null;
            numberOfPages?: number | null;
          } | null;
          hostPublication?: {
            __typename?: "HostPublication";
            summary: string;
          } | null;
          manifestationParts?: {
            __typename?: "ManifestationParts";
            parts: Array<{ __typename?: "ManifestationPart"; title: string }>;
          } | null;
          accessTypes: Array<{
            __typename?: "AccessType";
            code: AccessTypeCodeEnum;
          }>;
          access: Array<
            | {
                __typename: "AccessUrl";
                origin: string;
                url: string;
                loginRequired: boolean;
              }
            | { __typename: "DigitalArticleService"; issn: string }
            | {
                __typename: "Ereol";
                origin: string;
                url: string;
                canAlwaysBeLoaned: boolean;
              }
            | { __typename: "InfomediaService"; id: string }
            | { __typename: "InterLibraryLoan"; loanIsPossible: boolean }
          >;
          shelfmark?: {
            __typename?: "Shelfmark";
            postfix?: string | null;
            shelfmark: string;
          } | null;
          workYear?: {
            __typename?: "PublicationYear";
            year?: number | null;
          } | null;
          catalogueCodes: {
            __typename?: "CatalogueCodes";
            nationalBibliography: Array<string>;
            otherCatalogues: Array<string>;
          };
        };
        bestRepresentation: {
          __typename?: "Manifestation";
          pid: string;
          genreAndForm: Array<string>;
          source: Array<string>;
          publisher: Array<string>;
          titles: {
            __typename?: "ManifestationTitles";
            main: Array<string>;
            original?: Array<string> | null;
          };
          fictionNonfiction?: {
            __typename?: "FictionNonfiction";
            display: string;
            code: FictionNonfictionCodeEnum;
          } | null;
          materialTypes: Array<{
            __typename?: "MaterialType";
            materialTypeSpecific: {
              __typename?: "SpecificMaterialType";
              display: string;
            };
          }>;
          creators: Array<
            | { __typename: "Corporation"; display: string; nameSort: string }
            | { __typename: "Person"; display: string; nameSort: string }
          >;
          identifiers: Array<{ __typename?: "Identifier"; value: string }>;
          contributors: Array<
            | {
                __typename?: "Corporation";
                display: string;
                roles: Array<{
                  __typename?: "Role";
                  function: { __typename?: "Translation"; singular: string };
                }>;
              }
            | {
                __typename?: "Person";
                display: string;
                roles: Array<{
                  __typename?: "Role";
                  function: { __typename?: "Translation"; singular: string };
                }>;
              }
          >;
          edition?: {
            __typename?: "Edition";
            summary: string;
            publicationYear?: {
              __typename?: "PublicationYear";
              display: string;
            } | null;
          } | null;
          dateFirstEdition?: {
            __typename?: "PublicationYear";
            display: string;
            year?: number | null;
          } | null;
          audience?: {
            __typename?: "Audience";
            generalAudience: Array<string>;
            ages: Array<{ __typename?: "Range"; display: string }>;
          } | null;
          notes: Array<{ __typename?: "Note"; display: Array<string> }>;
          languages?: {
            __typename?: "Languages";
            notes?: Array<string> | null;
            main?: Array<{
              __typename?: "Language";
              display: string;
              isoCode: string;
            }> | null;
          } | null;
          physicalDescription?: {
            __typename?: "PhysicalUnitDescription";
            summaryFull?: string | null;
            numberOfPages?: number | null;
          } | null;
          hostPublication?: {
            __typename?: "HostPublication";
            summary: string;
          } | null;
          manifestationParts?: {
            __typename?: "ManifestationParts";
            parts: Array<{ __typename?: "ManifestationPart"; title: string }>;
          } | null;
          accessTypes: Array<{
            __typename?: "AccessType";
            code: AccessTypeCodeEnum;
          }>;
          access: Array<
            | {
                __typename: "AccessUrl";
                origin: string;
                url: string;
                loginRequired: boolean;
              }
            | { __typename: "DigitalArticleService"; issn: string }
            | {
                __typename: "Ereol";
                origin: string;
                url: string;
                canAlwaysBeLoaned: boolean;
              }
            | { __typename: "InfomediaService"; id: string }
            | { __typename: "InterLibraryLoan"; loanIsPossible: boolean }
          >;
          shelfmark?: {
            __typename?: "Shelfmark";
            postfix?: string | null;
            shelfmark: string;
          } | null;
          workYear?: {
            __typename?: "PublicationYear";
            year?: number | null;
          } | null;
          catalogueCodes: {
            __typename?: "CatalogueCodes";
            nationalBibliography: Array<string>;
            otherCatalogues: Array<string>;
          };
        };
      };
    }>;
  };
};

export type SuggestionsFromQueryStringQueryVariables = Exact<{
  q: Scalars["String"]["input"];
}>;

export type SuggestionsFromQueryStringQuery = {
  __typename?: "Query";
  suggest: {
    __typename?: "SuggestResponse";
    result: Array<{
      __typename?: "Suggestion";
      type: SuggestionTypeEnum;
      term: string;
      work?: {
        __typename?: "Work";
        workId: string;
        titles: { __typename?: "WorkTitles"; main: Array<string> };
        creators: Array<
          | { __typename?: "Corporation"; display: string }
          | { __typename?: "Person"; display: string }
        >;
        manifestations: {
          __typename?: "Manifestations";
          all: Array<{ __typename?: "Manifestation"; pid: string }>;
          bestRepresentation: {
            __typename?: "Manifestation";
            pid: string;
            languages?: {
              __typename?: "Languages";
              main?: Array<{
                __typename?: "Language";
                display: string;
                isoCode: string;
              }> | null;
            } | null;
          };
        };
      } | null;
    }>;
  };
};

export type SearchFacetQueryVariables = Exact<{
  q: SearchQueryInput;
  facets: Array<FacetFieldEnum> | FacetFieldEnum;
  facetLimit: Scalars["Int"]["input"];
  filters?: InputMaybe<SearchFiltersInput>;
}>;

export type SearchFacetQuery = {
  __typename?: "Query";
  search: {
    __typename?: "SearchResponse";
    facets: Array<{
      __typename?: "FacetResult";
      name: string;
      type: FacetFieldEnum;
      values: Array<{
        __typename?: "FacetValue";
        key: string;
        term: string;
        score?: number | null;
      }>;
    }>;
  };
};

export type IntelligentFacetsQueryVariables = Exact<{
  q: SearchQueryInput;
  facetsLimit: Scalars["Int"]["input"];
  valuesLimit: Scalars["Int"]["input"];
  filters: SearchFiltersInput;
}>;

export type IntelligentFacetsQuery = {
  __typename?: "Query";
  search: {
    __typename?: "SearchResponse";
    intelligentFacets: Array<{
      __typename?: "FacetResult";
      name: string;
      type: FacetFieldEnum;
      values: Array<{
        __typename?: "FacetValue";
        key: string;
        term: string;
        score?: number | null;
      }>;
    }>;
  };
};

export type PlaceCopyMutationVariables = Exact<{
  input: CopyRequestInput;
}>;

export type PlaceCopyMutation = {
  __typename?: "Mutation";
  elba: {
    __typename?: "ElbaServices";
    placeCopyRequest: {
      __typename?: "CopyRequestResponse";
      status: CopyRequestStatusEnum;
    };
  };
};

export type ManifestationsSimpleFragment = {
  __typename?: "Manifestations";
  all: Array<{
    __typename?: "Manifestation";
    pid: string;
    genreAndForm: Array<string>;
    source: Array<string>;
    publisher: Array<string>;
    titles: {
      __typename?: "ManifestationTitles";
      main: Array<string>;
      original?: Array<string> | null;
    };
    fictionNonfiction?: {
      __typename?: "FictionNonfiction";
      display: string;
      code: FictionNonfictionCodeEnum;
    } | null;
    materialTypes: Array<{
      __typename?: "MaterialType";
      materialTypeSpecific: {
        __typename?: "SpecificMaterialType";
        display: string;
      };
    }>;
    creators: Array<
      | { __typename: "Corporation"; display: string; nameSort: string }
      | { __typename: "Person"; display: string; nameSort: string }
    >;
    identifiers: Array<{ __typename?: "Identifier"; value: string }>;
    contributors: Array<
      | {
          __typename?: "Corporation";
          display: string;
          roles: Array<{
            __typename?: "Role";
            function: { __typename?: "Translation"; singular: string };
          }>;
        }
      | {
          __typename?: "Person";
          display: string;
          roles: Array<{
            __typename?: "Role";
            function: { __typename?: "Translation"; singular: string };
          }>;
        }
    >;
    edition?: {
      __typename?: "Edition";
      summary: string;
      publicationYear?: {
        __typename?: "PublicationYear";
        display: string;
      } | null;
    } | null;
    dateFirstEdition?: {
      __typename?: "PublicationYear";
      display: string;
      year?: number | null;
    } | null;
    audience?: {
      __typename?: "Audience";
      generalAudience: Array<string>;
      ages: Array<{ __typename?: "Range"; display: string }>;
    } | null;
    notes: Array<{ __typename?: "Note"; display: Array<string> }>;
    languages?: {
      __typename?: "Languages";
      notes?: Array<string> | null;
      main?: Array<{
        __typename?: "Language";
        display: string;
        isoCode: string;
      }> | null;
    } | null;
    physicalDescription?: {
      __typename?: "PhysicalUnitDescription";
      summaryFull?: string | null;
      numberOfPages?: number | null;
    } | null;
    hostPublication?: {
      __typename?: "HostPublication";
      summary: string;
    } | null;
    manifestationParts?: {
      __typename?: "ManifestationParts";
      parts: Array<{ __typename?: "ManifestationPart"; title: string }>;
    } | null;
    accessTypes: Array<{ __typename?: "AccessType"; code: AccessTypeCodeEnum }>;
    access: Array<
      | {
          __typename: "AccessUrl";
          origin: string;
          url: string;
          loginRequired: boolean;
        }
      | { __typename: "DigitalArticleService"; issn: string }
      | {
          __typename: "Ereol";
          origin: string;
          url: string;
          canAlwaysBeLoaned: boolean;
        }
      | { __typename: "InfomediaService"; id: string }
      | { __typename: "InterLibraryLoan"; loanIsPossible: boolean }
    >;
    shelfmark?: {
      __typename?: "Shelfmark";
      postfix?: string | null;
      shelfmark: string;
    } | null;
    workYear?: { __typename?: "PublicationYear"; year?: number | null } | null;
    catalogueCodes: {
      __typename?: "CatalogueCodes";
      nationalBibliography: Array<string>;
      otherCatalogues: Array<string>;
    };
  }>;
  latest: {
    __typename?: "Manifestation";
    pid: string;
    genreAndForm: Array<string>;
    source: Array<string>;
    publisher: Array<string>;
    titles: {
      __typename?: "ManifestationTitles";
      main: Array<string>;
      original?: Array<string> | null;
    };
    fictionNonfiction?: {
      __typename?: "FictionNonfiction";
      display: string;
      code: FictionNonfictionCodeEnum;
    } | null;
    materialTypes: Array<{
      __typename?: "MaterialType";
      materialTypeSpecific: {
        __typename?: "SpecificMaterialType";
        display: string;
      };
    }>;
    creators: Array<
      | { __typename: "Corporation"; display: string; nameSort: string }
      | { __typename: "Person"; display: string; nameSort: string }
    >;
    identifiers: Array<{ __typename?: "Identifier"; value: string }>;
    contributors: Array<
      | {
          __typename?: "Corporation";
          display: string;
          roles: Array<{
            __typename?: "Role";
            function: { __typename?: "Translation"; singular: string };
          }>;
        }
      | {
          __typename?: "Person";
          display: string;
          roles: Array<{
            __typename?: "Role";
            function: { __typename?: "Translation"; singular: string };
          }>;
        }
    >;
    edition?: {
      __typename?: "Edition";
      summary: string;
      publicationYear?: {
        __typename?: "PublicationYear";
        display: string;
      } | null;
    } | null;
    dateFirstEdition?: {
      __typename?: "PublicationYear";
      display: string;
      year?: number | null;
    } | null;
    audience?: {
      __typename?: "Audience";
      generalAudience: Array<string>;
      ages: Array<{ __typename?: "Range"; display: string }>;
    } | null;
    notes: Array<{ __typename?: "Note"; display: Array<string> }>;
    languages?: {
      __typename?: "Languages";
      notes?: Array<string> | null;
      main?: Array<{
        __typename?: "Language";
        display: string;
        isoCode: string;
      }> | null;
    } | null;
    physicalDescription?: {
      __typename?: "PhysicalUnitDescription";
      summaryFull?: string | null;
      numberOfPages?: number | null;
    } | null;
    hostPublication?: {
      __typename?: "HostPublication";
      summary: string;
    } | null;
    manifestationParts?: {
      __typename?: "ManifestationParts";
      parts: Array<{ __typename?: "ManifestationPart"; title: string }>;
    } | null;
    accessTypes: Array<{ __typename?: "AccessType"; code: AccessTypeCodeEnum }>;
    access: Array<
      | {
          __typename: "AccessUrl";
          origin: string;
          url: string;
          loginRequired: boolean;
        }
      | { __typename: "DigitalArticleService"; issn: string }
      | {
          __typename: "Ereol";
          origin: string;
          url: string;
          canAlwaysBeLoaned: boolean;
        }
      | { __typename: "InfomediaService"; id: string }
      | { __typename: "InterLibraryLoan"; loanIsPossible: boolean }
    >;
    shelfmark?: {
      __typename?: "Shelfmark";
      postfix?: string | null;
      shelfmark: string;
    } | null;
    workYear?: { __typename?: "PublicationYear"; year?: number | null } | null;
    catalogueCodes: {
      __typename?: "CatalogueCodes";
      nationalBibliography: Array<string>;
      otherCatalogues: Array<string>;
    };
  };
  bestRepresentation: {
    __typename?: "Manifestation";
    pid: string;
    genreAndForm: Array<string>;
    source: Array<string>;
    publisher: Array<string>;
    titles: {
      __typename?: "ManifestationTitles";
      main: Array<string>;
      original?: Array<string> | null;
    };
    fictionNonfiction?: {
      __typename?: "FictionNonfiction";
      display: string;
      code: FictionNonfictionCodeEnum;
    } | null;
    materialTypes: Array<{
      __typename?: "MaterialType";
      materialTypeSpecific: {
        __typename?: "SpecificMaterialType";
        display: string;
      };
    }>;
    creators: Array<
      | { __typename: "Corporation"; display: string; nameSort: string }
      | { __typename: "Person"; display: string; nameSort: string }
    >;
    identifiers: Array<{ __typename?: "Identifier"; value: string }>;
    contributors: Array<
      | {
          __typename?: "Corporation";
          display: string;
          roles: Array<{
            __typename?: "Role";
            function: { __typename?: "Translation"; singular: string };
          }>;
        }
      | {
          __typename?: "Person";
          display: string;
          roles: Array<{
            __typename?: "Role";
            function: { __typename?: "Translation"; singular: string };
          }>;
        }
    >;
    edition?: {
      __typename?: "Edition";
      summary: string;
      publicationYear?: {
        __typename?: "PublicationYear";
        display: string;
      } | null;
    } | null;
    dateFirstEdition?: {
      __typename?: "PublicationYear";
      display: string;
      year?: number | null;
    } | null;
    audience?: {
      __typename?: "Audience";
      generalAudience: Array<string>;
      ages: Array<{ __typename?: "Range"; display: string }>;
    } | null;
    notes: Array<{ __typename?: "Note"; display: Array<string> }>;
    languages?: {
      __typename?: "Languages";
      notes?: Array<string> | null;
      main?: Array<{
        __typename?: "Language";
        display: string;
        isoCode: string;
      }> | null;
    } | null;
    physicalDescription?: {
      __typename?: "PhysicalUnitDescription";
      summaryFull?: string | null;
      numberOfPages?: number | null;
    } | null;
    hostPublication?: {
      __typename?: "HostPublication";
      summary: string;
    } | null;
    manifestationParts?: {
      __typename?: "ManifestationParts";
      parts: Array<{ __typename?: "ManifestationPart"; title: string }>;
    } | null;
    accessTypes: Array<{ __typename?: "AccessType"; code: AccessTypeCodeEnum }>;
    access: Array<
      | {
          __typename: "AccessUrl";
          origin: string;
          url: string;
          loginRequired: boolean;
        }
      | { __typename: "DigitalArticleService"; issn: string }
      | {
          __typename: "Ereol";
          origin: string;
          url: string;
          canAlwaysBeLoaned: boolean;
        }
      | { __typename: "InfomediaService"; id: string }
      | { __typename: "InterLibraryLoan"; loanIsPossible: boolean }
    >;
    shelfmark?: {
      __typename?: "Shelfmark";
      postfix?: string | null;
      shelfmark: string;
    } | null;
    workYear?: { __typename?: "PublicationYear"; year?: number | null } | null;
    catalogueCodes: {
      __typename?: "CatalogueCodes";
      nationalBibliography: Array<string>;
      otherCatalogues: Array<string>;
    };
  };
};

export type ManifestationsAccessFragment = {
  __typename?: "Manifestations";
  all: Array<{
    __typename?: "Manifestation";
    pid: string;
    identifiers: Array<{
      __typename?: "Identifier";
      type: IdentifierTypeEnum;
      value: string;
    }>;
    access: Array<
      | {
          __typename: "AccessUrl";
          origin: string;
          url: string;
          loginRequired: boolean;
        }
      | { __typename: "DigitalArticleService"; issn: string }
      | {
          __typename: "Ereol";
          origin: string;
          url: string;
          canAlwaysBeLoaned: boolean;
        }
      | { __typename: "InfomediaService"; id: string }
      | { __typename: "InterLibraryLoan"; loanIsPossible: boolean }
    >;
  }>;
};

export type ManifestationsSimpleFieldsFragment = {
  __typename?: "Manifestation";
  pid: string;
  genreAndForm: Array<string>;
  source: Array<string>;
  publisher: Array<string>;
  titles: {
    __typename?: "ManifestationTitles";
    main: Array<string>;
    original?: Array<string> | null;
  };
  fictionNonfiction?: {
    __typename?: "FictionNonfiction";
    display: string;
    code: FictionNonfictionCodeEnum;
  } | null;
  materialTypes: Array<{
    __typename?: "MaterialType";
    materialTypeSpecific: {
      __typename?: "SpecificMaterialType";
      display: string;
    };
  }>;
  creators: Array<
    | { __typename: "Corporation"; display: string; nameSort: string }
    | { __typename: "Person"; display: string; nameSort: string }
  >;
  identifiers: Array<{ __typename?: "Identifier"; value: string }>;
  contributors: Array<
    | {
        __typename?: "Corporation";
        display: string;
        roles: Array<{
          __typename?: "Role";
          function: { __typename?: "Translation"; singular: string };
        }>;
      }
    | {
        __typename?: "Person";
        display: string;
        roles: Array<{
          __typename?: "Role";
          function: { __typename?: "Translation"; singular: string };
        }>;
      }
  >;
  edition?: {
    __typename?: "Edition";
    summary: string;
    publicationYear?: {
      __typename?: "PublicationYear";
      display: string;
    } | null;
  } | null;
  dateFirstEdition?: {
    __typename?: "PublicationYear";
    display: string;
    year?: number | null;
  } | null;
  audience?: {
    __typename?: "Audience";
    generalAudience: Array<string>;
    ages: Array<{ __typename?: "Range"; display: string }>;
  } | null;
  notes: Array<{ __typename?: "Note"; display: Array<string> }>;
  languages?: {
    __typename?: "Languages";
    notes?: Array<string> | null;
    main?: Array<{
      __typename?: "Language";
      display: string;
      isoCode: string;
    }> | null;
  } | null;
  physicalDescription?: {
    __typename?: "PhysicalUnitDescription";
    summaryFull?: string | null;
    numberOfPages?: number | null;
  } | null;
  hostPublication?: { __typename?: "HostPublication"; summary: string } | null;
  manifestationParts?: {
    __typename?: "ManifestationParts";
    parts: Array<{ __typename?: "ManifestationPart"; title: string }>;
  } | null;
  accessTypes: Array<{ __typename?: "AccessType"; code: AccessTypeCodeEnum }>;
  access: Array<
    | {
        __typename: "AccessUrl";
        origin: string;
        url: string;
        loginRequired: boolean;
      }
    | { __typename: "DigitalArticleService"; issn: string }
    | {
        __typename: "Ereol";
        origin: string;
        url: string;
        canAlwaysBeLoaned: boolean;
      }
    | { __typename: "InfomediaService"; id: string }
    | { __typename: "InterLibraryLoan"; loanIsPossible: boolean }
  >;
  shelfmark?: {
    __typename?: "Shelfmark";
    postfix?: string | null;
    shelfmark: string;
  } | null;
  workYear?: { __typename?: "PublicationYear"; year?: number | null } | null;
  catalogueCodes: {
    __typename?: "CatalogueCodes";
    nationalBibliography: Array<string>;
    otherCatalogues: Array<string>;
  };
};

export type ManifestationReviewFieldsFragment = {
  __typename?: "Manifestation";
  pid: string;
  creators: Array<
    | { __typename?: "Corporation"; display: string }
    | { __typename?: "Person"; display: string }
  >;
  access: Array<
    | { __typename: "AccessUrl"; url: string; origin: string }
    | { __typename: "DigitalArticleService"; issn: string }
    | { __typename: "Ereol" }
    | { __typename: "InfomediaService"; id: string }
    | { __typename: "InterLibraryLoan" }
  >;
  edition?: {
    __typename?: "Edition";
    publicationYear?: {
      __typename?: "PublicationYear";
      display: string;
    } | null;
  } | null;
  hostPublication?: {
    __typename?: "HostPublication";
    title: string;
    issue?: string | null;
  } | null;
  physicalDescription?: {
    __typename?: "PhysicalUnitDescription";
    summaryFull?: string | null;
  } | null;
  dateFirstEdition?: { __typename?: "PublicationYear"; display: string } | null;
  workYear?: { __typename?: "PublicationYear"; display: string } | null;
  review?: {
    __typename?: "ManifestationReview";
    rating?: string | null;
    reviewByLibrarians?: Array<{
      __typename?: "ReviewElement";
      content?: string | null;
      heading?: string | null;
      type?: ReviewElementTypeEnum | null;
      manifestations?: Array<{
        __typename?: "Manifestation";
        pid: string;
        titles: { __typename?: "ManifestationTitles"; main: Array<string> };
      } | null> | null;
    } | null> | null;
  } | null;
};

export type SeriesSimpleFragment = {
  __typename?: "Series";
  title: string;
  isPopular?: boolean | null;
  readThisFirst?: boolean | null;
  readThisWhenever?: boolean | null;
  members: Array<{
    __typename?: "SerieWork";
    numberInSeries?: string | null;
    work: {
      __typename?: "Work";
      workId: string;
      titles: { __typename?: "WorkTitles"; main: Array<string> };
    };
  }>;
};

export type WorkAccessFragment = {
  __typename?: "Work";
  workId: string;
  manifestations: {
    __typename?: "Manifestations";
    all: Array<{
      __typename?: "Manifestation";
      pid: string;
      identifiers: Array<{
        __typename?: "Identifier";
        type: IdentifierTypeEnum;
        value: string;
      }>;
      access: Array<
        | {
            __typename: "AccessUrl";
            origin: string;
            url: string;
            loginRequired: boolean;
          }
        | { __typename: "DigitalArticleService"; issn: string }
        | {
            __typename: "Ereol";
            origin: string;
            url: string;
            canAlwaysBeLoaned: boolean;
          }
        | { __typename: "InfomediaService"; id: string }
        | { __typename: "InterLibraryLoan"; loanIsPossible: boolean }
      >;
    }>;
  };
};

export type WorkSmallFragment = {
  __typename?: "Work";
  workId: string;
  abstract?: Array<string> | null;
  genreAndForm: Array<string>;
  titles: {
    __typename?: "WorkTitles";
    full: Array<string>;
    original?: Array<string> | null;
  };
  creators: Array<
    | { __typename: "Corporation"; display: string }
    | { __typename: "Person"; display: string }
  >;
  series: Array<{
    __typename?: "Series";
    title: string;
    isPopular?: boolean | null;
    readThisFirst?: boolean | null;
    readThisWhenever?: boolean | null;
    members: Array<{
      __typename?: "SerieWork";
      numberInSeries?: string | null;
      work: {
        __typename?: "Work";
        workId: string;
        titles: { __typename?: "WorkTitles"; main: Array<string> };
      };
    }>;
  }>;
  workYear?: { __typename?: "PublicationYear"; year?: number | null } | null;
  manifestations: {
    __typename?: "Manifestations";
    all: Array<{
      __typename?: "Manifestation";
      pid: string;
      genreAndForm: Array<string>;
      source: Array<string>;
      publisher: Array<string>;
      titles: {
        __typename?: "ManifestationTitles";
        main: Array<string>;
        original?: Array<string> | null;
      };
      fictionNonfiction?: {
        __typename?: "FictionNonfiction";
        display: string;
        code: FictionNonfictionCodeEnum;
      } | null;
      materialTypes: Array<{
        __typename?: "MaterialType";
        materialTypeSpecific: {
          __typename?: "SpecificMaterialType";
          display: string;
        };
      }>;
      creators: Array<
        | { __typename: "Corporation"; display: string; nameSort: string }
        | { __typename: "Person"; display: string; nameSort: string }
      >;
      identifiers: Array<{ __typename?: "Identifier"; value: string }>;
      contributors: Array<
        | {
            __typename?: "Corporation";
            display: string;
            roles: Array<{
              __typename?: "Role";
              function: { __typename?: "Translation"; singular: string };
            }>;
          }
        | {
            __typename?: "Person";
            display: string;
            roles: Array<{
              __typename?: "Role";
              function: { __typename?: "Translation"; singular: string };
            }>;
          }
      >;
      edition?: {
        __typename?: "Edition";
        summary: string;
        publicationYear?: {
          __typename?: "PublicationYear";
          display: string;
        } | null;
      } | null;
      dateFirstEdition?: {
        __typename?: "PublicationYear";
        display: string;
        year?: number | null;
      } | null;
      audience?: {
        __typename?: "Audience";
        generalAudience: Array<string>;
        ages: Array<{ __typename?: "Range"; display: string }>;
      } | null;
      notes: Array<{ __typename?: "Note"; display: Array<string> }>;
      languages?: {
        __typename?: "Languages";
        notes?: Array<string> | null;
        main?: Array<{
          __typename?: "Language";
          display: string;
          isoCode: string;
        }> | null;
      } | null;
      physicalDescription?: {
        __typename?: "PhysicalUnitDescription";
        summaryFull?: string | null;
        numberOfPages?: number | null;
      } | null;
      hostPublication?: {
        __typename?: "HostPublication";
        summary: string;
      } | null;
      manifestationParts?: {
        __typename?: "ManifestationParts";
        parts: Array<{ __typename?: "ManifestationPart"; title: string }>;
      } | null;
      accessTypes: Array<{
        __typename?: "AccessType";
        code: AccessTypeCodeEnum;
      }>;
      access: Array<
        | {
            __typename: "AccessUrl";
            origin: string;
            url: string;
            loginRequired: boolean;
          }
        | { __typename: "DigitalArticleService"; issn: string }
        | {
            __typename: "Ereol";
            origin: string;
            url: string;
            canAlwaysBeLoaned: boolean;
          }
        | { __typename: "InfomediaService"; id: string }
        | { __typename: "InterLibraryLoan"; loanIsPossible: boolean }
      >;
      shelfmark?: {
        __typename?: "Shelfmark";
        postfix?: string | null;
        shelfmark: string;
      } | null;
      workYear?: {
        __typename?: "PublicationYear";
        year?: number | null;
      } | null;
      catalogueCodes: {
        __typename?: "CatalogueCodes";
        nationalBibliography: Array<string>;
        otherCatalogues: Array<string>;
      };
    }>;
    latest: {
      __typename?: "Manifestation";
      pid: string;
      genreAndForm: Array<string>;
      source: Array<string>;
      publisher: Array<string>;
      titles: {
        __typename?: "ManifestationTitles";
        main: Array<string>;
        original?: Array<string> | null;
      };
      fictionNonfiction?: {
        __typename?: "FictionNonfiction";
        display: string;
        code: FictionNonfictionCodeEnum;
      } | null;
      materialTypes: Array<{
        __typename?: "MaterialType";
        materialTypeSpecific: {
          __typename?: "SpecificMaterialType";
          display: string;
        };
      }>;
      creators: Array<
        | { __typename: "Corporation"; display: string; nameSort: string }
        | { __typename: "Person"; display: string; nameSort: string }
      >;
      identifiers: Array<{ __typename?: "Identifier"; value: string }>;
      contributors: Array<
        | {
            __typename?: "Corporation";
            display: string;
            roles: Array<{
              __typename?: "Role";
              function: { __typename?: "Translation"; singular: string };
            }>;
          }
        | {
            __typename?: "Person";
            display: string;
            roles: Array<{
              __typename?: "Role";
              function: { __typename?: "Translation"; singular: string };
            }>;
          }
      >;
      edition?: {
        __typename?: "Edition";
        summary: string;
        publicationYear?: {
          __typename?: "PublicationYear";
          display: string;
        } | null;
      } | null;
      dateFirstEdition?: {
        __typename?: "PublicationYear";
        display: string;
        year?: number | null;
      } | null;
      audience?: {
        __typename?: "Audience";
        generalAudience: Array<string>;
        ages: Array<{ __typename?: "Range"; display: string }>;
      } | null;
      notes: Array<{ __typename?: "Note"; display: Array<string> }>;
      languages?: {
        __typename?: "Languages";
        notes?: Array<string> | null;
        main?: Array<{
          __typename?: "Language";
          display: string;
          isoCode: string;
        }> | null;
      } | null;
      physicalDescription?: {
        __typename?: "PhysicalUnitDescription";
        summaryFull?: string | null;
        numberOfPages?: number | null;
      } | null;
      hostPublication?: {
        __typename?: "HostPublication";
        summary: string;
      } | null;
      manifestationParts?: {
        __typename?: "ManifestationParts";
        parts: Array<{ __typename?: "ManifestationPart"; title: string }>;
      } | null;
      accessTypes: Array<{
        __typename?: "AccessType";
        code: AccessTypeCodeEnum;
      }>;
      access: Array<
        | {
            __typename: "AccessUrl";
            origin: string;
            url: string;
            loginRequired: boolean;
          }
        | { __typename: "DigitalArticleService"; issn: string }
        | {
            __typename: "Ereol";
            origin: string;
            url: string;
            canAlwaysBeLoaned: boolean;
          }
        | { __typename: "InfomediaService"; id: string }
        | { __typename: "InterLibraryLoan"; loanIsPossible: boolean }
      >;
      shelfmark?: {
        __typename?: "Shelfmark";
        postfix?: string | null;
        shelfmark: string;
      } | null;
      workYear?: {
        __typename?: "PublicationYear";
        year?: number | null;
      } | null;
      catalogueCodes: {
        __typename?: "CatalogueCodes";
        nationalBibliography: Array<string>;
        otherCatalogues: Array<string>;
      };
    };
    bestRepresentation: {
      __typename?: "Manifestation";
      pid: string;
      genreAndForm: Array<string>;
      source: Array<string>;
      publisher: Array<string>;
      titles: {
        __typename?: "ManifestationTitles";
        main: Array<string>;
        original?: Array<string> | null;
      };
      fictionNonfiction?: {
        __typename?: "FictionNonfiction";
        display: string;
        code: FictionNonfictionCodeEnum;
      } | null;
      materialTypes: Array<{
        __typename?: "MaterialType";
        materialTypeSpecific: {
          __typename?: "SpecificMaterialType";
          display: string;
        };
      }>;
      creators: Array<
        | { __typename: "Corporation"; display: string; nameSort: string }
        | { __typename: "Person"; display: string; nameSort: string }
      >;
      identifiers: Array<{ __typename?: "Identifier"; value: string }>;
      contributors: Array<
        | {
            __typename?: "Corporation";
            display: string;
            roles: Array<{
              __typename?: "Role";
              function: { __typename?: "Translation"; singular: string };
            }>;
          }
        | {
            __typename?: "Person";
            display: string;
            roles: Array<{
              __typename?: "Role";
              function: { __typename?: "Translation"; singular: string };
            }>;
          }
      >;
      edition?: {
        __typename?: "Edition";
        summary: string;
        publicationYear?: {
          __typename?: "PublicationYear";
          display: string;
        } | null;
      } | null;
      dateFirstEdition?: {
        __typename?: "PublicationYear";
        display: string;
        year?: number | null;
      } | null;
      audience?: {
        __typename?: "Audience";
        generalAudience: Array<string>;
        ages: Array<{ __typename?: "Range"; display: string }>;
      } | null;
      notes: Array<{ __typename?: "Note"; display: Array<string> }>;
      languages?: {
        __typename?: "Languages";
        notes?: Array<string> | null;
        main?: Array<{
          __typename?: "Language";
          display: string;
          isoCode: string;
        }> | null;
      } | null;
      physicalDescription?: {
        __typename?: "PhysicalUnitDescription";
        summaryFull?: string | null;
        numberOfPages?: number | null;
      } | null;
      hostPublication?: {
        __typename?: "HostPublication";
        summary: string;
      } | null;
      manifestationParts?: {
        __typename?: "ManifestationParts";
        parts: Array<{ __typename?: "ManifestationPart"; title: string }>;
      } | null;
      accessTypes: Array<{
        __typename?: "AccessType";
        code: AccessTypeCodeEnum;
      }>;
      access: Array<
        | {
            __typename: "AccessUrl";
            origin: string;
            url: string;
            loginRequired: boolean;
          }
        | { __typename: "DigitalArticleService"; issn: string }
        | {
            __typename: "Ereol";
            origin: string;
            url: string;
            canAlwaysBeLoaned: boolean;
          }
        | { __typename: "InfomediaService"; id: string }
        | { __typename: "InterLibraryLoan"; loanIsPossible: boolean }
      >;
      shelfmark?: {
        __typename?: "Shelfmark";
        postfix?: string | null;
        shelfmark: string;
      } | null;
      workYear?: {
        __typename?: "PublicationYear";
        year?: number | null;
      } | null;
      catalogueCodes: {
        __typename?: "CatalogueCodes";
        nationalBibliography: Array<string>;
        otherCatalogues: Array<string>;
      };
    };
  };
};

export type WorkMediumFragment = {
  __typename?: "Work";
  workId: string;
  abstract?: Array<string> | null;
  genreAndForm: Array<string>;
  materialTypes: Array<{
    __typename?: "MaterialType";
    materialTypeSpecific: {
      __typename?: "SpecificMaterialType";
      display: string;
    };
  }>;
  creators: Array<
    | { __typename: "Corporation"; nameSort: string; display: string }
    | { __typename: "Person"; nameSort: string; display: string }
  >;
  mainLanguages: Array<{
    __typename?: "Language";
    display: string;
    isoCode: string;
  }>;
  subjects: {
    __typename?: "SubjectContainer";
    all: Array<
      | { __typename?: "Corporation"; display: string }
      | { __typename?: "Mood"; display: string }
      | { __typename?: "NarrativeTechnique"; display: string }
      | { __typename?: "Person"; display: string }
      | { __typename?: "Setting"; display: string }
      | { __typename?: "SubjectText"; display: string }
      | { __typename?: "SubjectWithRating"; display: string }
      | { __typename?: "TimePeriod"; display: string }
    >;
    dbcVerified: Array<
      | { __typename?: "Corporation"; display: string }
      | { __typename?: "Mood"; display: string }
      | { __typename?: "NarrativeTechnique"; display: string }
      | { __typename?: "Person"; display: string }
      | { __typename?: "Setting"; display: string }
      | { __typename?: "SubjectText"; display: string }
      | { __typename?: "SubjectWithRating"; display: string }
      | { __typename?: "TimePeriod"; display: string }
    >;
  };
  fictionNonfiction?: {
    __typename?: "FictionNonfiction";
    display: string;
    code: FictionNonfictionCodeEnum;
  } | null;
  dk5MainEntry?: { __typename?: "DK5MainEntry"; display: string } | null;
  relations: {
    __typename?: "Relations";
    hasReview: Array<{ __typename?: "Manifestation"; pid: string }>;
    hasAdaptation: Array<{
      __typename?: "Manifestation";
      ownerWork: {
        __typename?: "Work";
        workId: string;
        workTypes: Array<WorkTypeEnum>;
        titles: { __typename?: "WorkTitles"; main: Array<string> };
      };
    }>;
  };
  titles: {
    __typename?: "WorkTitles";
    full: Array<string>;
    original?: Array<string> | null;
  };
  series: Array<{
    __typename?: "Series";
    title: string;
    isPopular?: boolean | null;
    readThisFirst?: boolean | null;
    readThisWhenever?: boolean | null;
    members: Array<{
      __typename?: "SerieWork";
      numberInSeries?: string | null;
      work: {
        __typename?: "Work";
        workId: string;
        titles: { __typename?: "WorkTitles"; main: Array<string> };
      };
    }>;
  }>;
  workYear?: { __typename?: "PublicationYear"; year?: number | null } | null;
  manifestations: {
    __typename?: "Manifestations";
    all: Array<{
      __typename?: "Manifestation";
      pid: string;
      genreAndForm: Array<string>;
      source: Array<string>;
      publisher: Array<string>;
      titles: {
        __typename?: "ManifestationTitles";
        main: Array<string>;
        original?: Array<string> | null;
      };
      fictionNonfiction?: {
        __typename?: "FictionNonfiction";
        display: string;
        code: FictionNonfictionCodeEnum;
      } | null;
      materialTypes: Array<{
        __typename?: "MaterialType";
        materialTypeSpecific: {
          __typename?: "SpecificMaterialType";
          display: string;
        };
      }>;
      creators: Array<
        | { __typename: "Corporation"; display: string; nameSort: string }
        | { __typename: "Person"; display: string; nameSort: string }
      >;
      identifiers: Array<{ __typename?: "Identifier"; value: string }>;
      contributors: Array<
        | {
            __typename?: "Corporation";
            display: string;
            roles: Array<{
              __typename?: "Role";
              function: { __typename?: "Translation"; singular: string };
            }>;
          }
        | {
            __typename?: "Person";
            display: string;
            roles: Array<{
              __typename?: "Role";
              function: { __typename?: "Translation"; singular: string };
            }>;
          }
      >;
      edition?: {
        __typename?: "Edition";
        summary: string;
        publicationYear?: {
          __typename?: "PublicationYear";
          display: string;
        } | null;
      } | null;
      dateFirstEdition?: {
        __typename?: "PublicationYear";
        display: string;
        year?: number | null;
      } | null;
      audience?: {
        __typename?: "Audience";
        generalAudience: Array<string>;
        ages: Array<{ __typename?: "Range"; display: string }>;
      } | null;
      notes: Array<{ __typename?: "Note"; display: Array<string> }>;
      languages?: {
        __typename?: "Languages";
        notes?: Array<string> | null;
        main?: Array<{
          __typename?: "Language";
          display: string;
          isoCode: string;
        }> | null;
      } | null;
      physicalDescription?: {
        __typename?: "PhysicalUnitDescription";
        summaryFull?: string | null;
        numberOfPages?: number | null;
      } | null;
      hostPublication?: {
        __typename?: "HostPublication";
        summary: string;
      } | null;
      manifestationParts?: {
        __typename?: "ManifestationParts";
        parts: Array<{ __typename?: "ManifestationPart"; title: string }>;
      } | null;
      accessTypes: Array<{
        __typename?: "AccessType";
        code: AccessTypeCodeEnum;
      }>;
      access: Array<
        | {
            __typename: "AccessUrl";
            origin: string;
            url: string;
            loginRequired: boolean;
          }
        | { __typename: "DigitalArticleService"; issn: string }
        | {
            __typename: "Ereol";
            origin: string;
            url: string;
            canAlwaysBeLoaned: boolean;
          }
        | { __typename: "InfomediaService"; id: string }
        | { __typename: "InterLibraryLoan"; loanIsPossible: boolean }
      >;
      shelfmark?: {
        __typename?: "Shelfmark";
        postfix?: string | null;
        shelfmark: string;
      } | null;
      workYear?: {
        __typename?: "PublicationYear";
        year?: number | null;
      } | null;
      catalogueCodes: {
        __typename?: "CatalogueCodes";
        nationalBibliography: Array<string>;
        otherCatalogues: Array<string>;
      };
    }>;
    latest: {
      __typename?: "Manifestation";
      pid: string;
      genreAndForm: Array<string>;
      source: Array<string>;
      publisher: Array<string>;
      titles: {
        __typename?: "ManifestationTitles";
        main: Array<string>;
        original?: Array<string> | null;
      };
      fictionNonfiction?: {
        __typename?: "FictionNonfiction";
        display: string;
        code: FictionNonfictionCodeEnum;
      } | null;
      materialTypes: Array<{
        __typename?: "MaterialType";
        materialTypeSpecific: {
          __typename?: "SpecificMaterialType";
          display: string;
        };
      }>;
      creators: Array<
        | { __typename: "Corporation"; display: string; nameSort: string }
        | { __typename: "Person"; display: string; nameSort: string }
      >;
      identifiers: Array<{ __typename?: "Identifier"; value: string }>;
      contributors: Array<
        | {
            __typename?: "Corporation";
            display: string;
            roles: Array<{
              __typename?: "Role";
              function: { __typename?: "Translation"; singular: string };
            }>;
          }
        | {
            __typename?: "Person";
            display: string;
            roles: Array<{
              __typename?: "Role";
              function: { __typename?: "Translation"; singular: string };
            }>;
          }
      >;
      edition?: {
        __typename?: "Edition";
        summary: string;
        publicationYear?: {
          __typename?: "PublicationYear";
          display: string;
        } | null;
      } | null;
      dateFirstEdition?: {
        __typename?: "PublicationYear";
        display: string;
        year?: number | null;
      } | null;
      audience?: {
        __typename?: "Audience";
        generalAudience: Array<string>;
        ages: Array<{ __typename?: "Range"; display: string }>;
      } | null;
      notes: Array<{ __typename?: "Note"; display: Array<string> }>;
      languages?: {
        __typename?: "Languages";
        notes?: Array<string> | null;
        main?: Array<{
          __typename?: "Language";
          display: string;
          isoCode: string;
        }> | null;
      } | null;
      physicalDescription?: {
        __typename?: "PhysicalUnitDescription";
        summaryFull?: string | null;
        numberOfPages?: number | null;
      } | null;
      hostPublication?: {
        __typename?: "HostPublication";
        summary: string;
      } | null;
      manifestationParts?: {
        __typename?: "ManifestationParts";
        parts: Array<{ __typename?: "ManifestationPart"; title: string }>;
      } | null;
      accessTypes: Array<{
        __typename?: "AccessType";
        code: AccessTypeCodeEnum;
      }>;
      access: Array<
        | {
            __typename: "AccessUrl";
            origin: string;
            url: string;
            loginRequired: boolean;
          }
        | { __typename: "DigitalArticleService"; issn: string }
        | {
            __typename: "Ereol";
            origin: string;
            url: string;
            canAlwaysBeLoaned: boolean;
          }
        | { __typename: "InfomediaService"; id: string }
        | { __typename: "InterLibraryLoan"; loanIsPossible: boolean }
      >;
      shelfmark?: {
        __typename?: "Shelfmark";
        postfix?: string | null;
        shelfmark: string;
      } | null;
      workYear?: {
        __typename?: "PublicationYear";
        year?: number | null;
      } | null;
      catalogueCodes: {
        __typename?: "CatalogueCodes";
        nationalBibliography: Array<string>;
        otherCatalogues: Array<string>;
      };
    };
    bestRepresentation: {
      __typename?: "Manifestation";
      pid: string;
      genreAndForm: Array<string>;
      source: Array<string>;
      publisher: Array<string>;
      titles: {
        __typename?: "ManifestationTitles";
        main: Array<string>;
        original?: Array<string> | null;
      };
      fictionNonfiction?: {
        __typename?: "FictionNonfiction";
        display: string;
        code: FictionNonfictionCodeEnum;
      } | null;
      materialTypes: Array<{
        __typename?: "MaterialType";
        materialTypeSpecific: {
          __typename?: "SpecificMaterialType";
          display: string;
        };
      }>;
      creators: Array<
        | { __typename: "Corporation"; display: string; nameSort: string }
        | { __typename: "Person"; display: string; nameSort: string }
      >;
      identifiers: Array<{ __typename?: "Identifier"; value: string }>;
      contributors: Array<
        | {
            __typename?: "Corporation";
            display: string;
            roles: Array<{
              __typename?: "Role";
              function: { __typename?: "Translation"; singular: string };
            }>;
          }
        | {
            __typename?: "Person";
            display: string;
            roles: Array<{
              __typename?: "Role";
              function: { __typename?: "Translation"; singular: string };
            }>;
          }
      >;
      edition?: {
        __typename?: "Edition";
        summary: string;
        publicationYear?: {
          __typename?: "PublicationYear";
          display: string;
        } | null;
      } | null;
      dateFirstEdition?: {
        __typename?: "PublicationYear";
        display: string;
        year?: number | null;
      } | null;
      audience?: {
        __typename?: "Audience";
        generalAudience: Array<string>;
        ages: Array<{ __typename?: "Range"; display: string }>;
      } | null;
      notes: Array<{ __typename?: "Note"; display: Array<string> }>;
      languages?: {
        __typename?: "Languages";
        notes?: Array<string> | null;
        main?: Array<{
          __typename?: "Language";
          display: string;
          isoCode: string;
        }> | null;
      } | null;
      physicalDescription?: {
        __typename?: "PhysicalUnitDescription";
        summaryFull?: string | null;
        numberOfPages?: number | null;
      } | null;
      hostPublication?: {
        __typename?: "HostPublication";
        summary: string;
      } | null;
      manifestationParts?: {
        __typename?: "ManifestationParts";
        parts: Array<{ __typename?: "ManifestationPart"; title: string }>;
      } | null;
      accessTypes: Array<{
        __typename?: "AccessType";
        code: AccessTypeCodeEnum;
      }>;
      access: Array<
        | {
            __typename: "AccessUrl";
            origin: string;
            url: string;
            loginRequired: boolean;
          }
        | { __typename: "DigitalArticleService"; issn: string }
        | {
            __typename: "Ereol";
            origin: string;
            url: string;
            canAlwaysBeLoaned: boolean;
          }
        | { __typename: "InfomediaService"; id: string }
        | { __typename: "InterLibraryLoan"; loanIsPossible: boolean }
      >;
      shelfmark?: {
        __typename?: "Shelfmark";
        postfix?: string | null;
        shelfmark: string;
      } | null;
      workYear?: {
        __typename?: "PublicationYear";
        year?: number | null;
      } | null;
      catalogueCodes: {
        __typename?: "CatalogueCodes";
        nationalBibliography: Array<string>;
        otherCatalogues: Array<string>;
      };
    };
  };
};

export type WithLanguagesFragment = {
  __typename?: "Manifestation";
  languages?: {
    __typename?: "Languages";
    main?: Array<{
      __typename?: "Language";
      display: string;
      isoCode: string;
    }> | null;
  } | null;
};

export const WithLanguagesFragmentDoc = `
    fragment WithLanguages on Manifestation {
  languages {
    main {
      display
      isoCode
    }
  }
}
    `;
export const ManifestationBasicDetailsFragmentDoc = `
    fragment ManifestationBasicDetails on Manifestation {
  ...WithLanguages
  pid
  titles {
    full
  }
  abstract
  materialTypes {
    materialTypeSpecific {
      display
    }
  }
  creators {
    display
  }
  edition {
    publicationYear {
      display
    }
  }
  series {
    title
    members {
      numberInSeries
    }
  }
}
    ${WithLanguagesFragmentDoc}`;
export const ManifestationReviewFieldsFragmentDoc = `
    fragment ManifestationReviewFields on Manifestation {
  pid
  creators {
    display
  }
  access {
    __typename
    ... on InfomediaService {
      id
    }
    ... on DigitalArticleService {
      issn
    }
    ... on AccessUrl {
      url
      origin
    }
  }
  edition {
    publicationYear {
      display
    }
  }
  hostPublication {
    title
    issue
  }
  creators {
    display
  }
  physicalDescription {
    summaryFull
  }
  dateFirstEdition {
    display
  }
  workYear {
    display
  }
  review {
    rating
    reviewByLibrarians {
      content
      heading
      type
      manifestations {
        pid
        titles {
          main
        }
      }
    }
  }
}
    `;
export const ManifestationsAccessFragmentDoc = `
    fragment ManifestationsAccess on Manifestations {
  all {
    pid
    identifiers {
      type
      value
    }
    access {
      __typename
      ... on AccessUrl {
        origin
        url
        loginRequired
      }
      ... on InfomediaService {
        id
      }
      ... on InterLibraryLoan {
        loanIsPossible
      }
      ... on Ereol {
        origin
        url
        canAlwaysBeLoaned
      }
      ... on DigitalArticleService {
        issn
      }
    }
  }
}
    `;
export const WorkAccessFragmentDoc = `
    fragment WorkAccess on Work {
  workId
  manifestations {
    ...ManifestationsAccess
  }
}
    ${ManifestationsAccessFragmentDoc}`;
export const SeriesSimpleFragmentDoc = `
    fragment SeriesSimple on Series {
  title
  isPopular
  members {
    numberInSeries
    work {
      workId
      titles {
        main
      }
    }
  }
  readThisFirst
  readThisWhenever
}
    `;
export const ManifestationsSimpleFieldsFragmentDoc = `
    fragment ManifestationsSimpleFields on Manifestation {
  pid
  genreAndForm
  source
  ...WithLanguages
  titles {
    main
    original
  }
  fictionNonfiction {
    display
    code
  }
  materialTypes {
    materialTypeSpecific {
      display
    }
  }
  creators {
    display
    nameSort
    __typename
  }
  publisher
  identifiers {
    value
  }
  contributors {
    display
    roles {
      function {
        singular
      }
    }
  }
  edition {
    summary
    publicationYear {
      display
    }
  }
  dateFirstEdition {
    display
    year
  }
  audience {
    generalAudience
    ages {
      display
    }
  }
  notes {
    display
  }
  languages {
    notes
  }
  physicalDescription {
    summaryFull
    numberOfPages
  }
  hostPublication {
    summary
  }
  manifestationParts {
    parts {
      title
    }
  }
  accessTypes {
    code
  }
  access {
    __typename
    ... on AccessUrl {
      origin
      url
      loginRequired
    }
    ... on InfomediaService {
      id
    }
    ... on InterLibraryLoan {
      loanIsPossible
    }
    ... on Ereol {
      origin
      url
      canAlwaysBeLoaned
    }
    ... on DigitalArticleService {
      issn
    }
  }
  shelfmark {
    postfix
    shelfmark
  }
  workYear {
    year
  }
  catalogueCodes {
    nationalBibliography
    otherCatalogues
  }
}
    ${WithLanguagesFragmentDoc}`;
export const ManifestationsSimpleFragmentDoc = `
    fragment ManifestationsSimple on Manifestations {
  all {
    ...ManifestationsSimpleFields
  }
  latest {
    ...ManifestationsSimpleFields
  }
  bestRepresentation {
    ...ManifestationsSimpleFields
  }
}
    ${ManifestationsSimpleFieldsFragmentDoc}`;
export const WorkSmallFragmentDoc = `
    fragment WorkSmall on Work {
  workId
  titles {
    full
    original
  }
  abstract
  creators {
    display
    __typename
  }
  series {
    ...SeriesSimple
  }
  workYear {
    year
  }
  genreAndForm
  manifestations {
    ...ManifestationsSimple
  }
}
    ${SeriesSimpleFragmentDoc}
${ManifestationsSimpleFragmentDoc}`;
export const WorkMediumFragmentDoc = `
    fragment WorkMedium on Work {
  ...WorkSmall
  materialTypes {
    materialTypeSpecific {
      display
    }
  }
  creators {
    nameSort
  }
  mainLanguages {
    display
    isoCode
  }
  subjects {
    all {
      display
    }
    dbcVerified {
      display
    }
  }
  fictionNonfiction {
    display
    code
  }
  dk5MainEntry {
    display
  }
  relations {
    hasReview {
      pid
    }
    hasAdaptation {
      ownerWork {
        workId
        workTypes
        titles {
          main
        }
      }
    }
  }
}
    ${WorkSmallFragmentDoc}`;
export const GetSmallWorkDocument = `
    query getSmallWork($id: String!) {
  work(id: $id) {
    ...WorkSmall
  }
}
    ${WorkSmallFragmentDoc}`;

export const useGetSmallWorkQuery = <
  TData = GetSmallWorkQuery,
  TError = unknown
>(
  variables: GetSmallWorkQueryVariables,
  options?: UseQueryOptions<GetSmallWorkQuery, TError, TData>
) => {
  return useQuery<GetSmallWorkQuery, TError, TData>(
    ["getSmallWork", variables],
    fetcher<GetSmallWorkQuery, GetSmallWorkQueryVariables>(
      GetSmallWorkDocument,
      variables
    ),
    options
  );
};

export const GetManifestationViaMaterialByFaustDocument = `
    query getManifestationViaMaterialByFaust($faust: String!) {
  manifestation(faust: $faust) {
    ...ManifestationBasicDetails
  }
}
    ${ManifestationBasicDetailsFragmentDoc}`;

export const useGetManifestationViaMaterialByFaustQuery = <
  TData = GetManifestationViaMaterialByFaustQuery,
  TError = unknown
>(
  variables: GetManifestationViaMaterialByFaustQueryVariables,
  options?: UseQueryOptions<
    GetManifestationViaMaterialByFaustQuery,
    TError,
    TData
  >
) => {
  return useQuery<GetManifestationViaMaterialByFaustQuery, TError, TData>(
    ["getManifestationViaMaterialByFaust", variables],
    fetcher<
      GetManifestationViaMaterialByFaustQuery,
      GetManifestationViaMaterialByFaustQueryVariables
    >(GetManifestationViaMaterialByFaustDocument, variables),
    options
  );
};

export const GetManifestationViaBestRepresentationByFaustDocument = `
    query getManifestationViaBestRepresentationByFaust($faust: String!) {
  manifestation(faust: $faust) {
    ownerWork {
      manifestations {
        bestRepresentation {
          ...ManifestationBasicDetails
        }
      }
    }
  }
}
    ${ManifestationBasicDetailsFragmentDoc}`;

export const useGetManifestationViaBestRepresentationByFaustQuery = <
  TData = GetManifestationViaBestRepresentationByFaustQuery,
  TError = unknown
>(
  variables: GetManifestationViaBestRepresentationByFaustQueryVariables,
  options?: UseQueryOptions<
    GetManifestationViaBestRepresentationByFaustQuery,
    TError,
    TData
  >
) => {
  return useQuery<
    GetManifestationViaBestRepresentationByFaustQuery,
    TError,
    TData
  >(
    ["getManifestationViaBestRepresentationByFaust", variables],
    fetcher<
      GetManifestationViaBestRepresentationByFaustQuery,
      GetManifestationViaBestRepresentationByFaustQueryVariables
    >(GetManifestationViaBestRepresentationByFaustDocument, variables),
    options
  );
};

export const GetMaterialDocument = `
    query getMaterial($wid: String!) {
  work(id: $wid) {
    ...WorkMedium
  }
}
    ${WorkMediumFragmentDoc}`;

export const useGetMaterialQuery = <TData = GetMaterialQuery, TError = unknown>(
  variables: GetMaterialQueryVariables,
  options?: UseQueryOptions<GetMaterialQuery, TError, TData>
) => {
  return useQuery<GetMaterialQuery, TError, TData>(
    ["getMaterial", variables],
    fetcher<GetMaterialQuery, GetMaterialQueryVariables>(
      GetMaterialDocument,
      variables
    ),
    options
  );
};

export const GetMaterialGloballyDocument = `
    query getMaterialGlobally($wid: String!) {
  work(id: $wid) {
    ...WorkMedium
  }
}
    ${WorkMediumFragmentDoc}`;

export const useGetMaterialGloballyQuery = <
  TData = GetMaterialGloballyQuery,
  TError = unknown
>(
  variables: GetMaterialGloballyQueryVariables,
  options?: UseQueryOptions<GetMaterialGloballyQuery, TError, TData>
) => {
  return useQuery<GetMaterialGloballyQuery, TError, TData>(
    ["getMaterialGlobally", variables],
    fetcher<GetMaterialGloballyQuery, GetMaterialGloballyQueryVariables>(
      GetMaterialGloballyDocument,
      variables
    ),
    options
  );
};

export const GetInfomediaDocument = `
    query getInfomedia($id: String!) {
  infomedia(id: $id) {
    error
    article {
      headLine
      text
    }
  }
}
    `;

export const useGetInfomediaQuery = <
  TData = GetInfomediaQuery,
  TError = unknown
>(
  variables: GetInfomediaQueryVariables,
  options?: UseQueryOptions<GetInfomediaQuery, TError, TData>
) => {
  return useQuery<GetInfomediaQuery, TError, TData>(
    ["getInfomedia", variables],
    fetcher<GetInfomediaQuery, GetInfomediaQueryVariables>(
      GetInfomediaDocument,
      variables
    ),
    options
  );
};

export const GetReviewManifestationsDocument = `
    query getReviewManifestations($pid: [String!]!) {
  manifestations(pid: $pid) {
    ...ManifestationReviewFields
  }
}
    ${ManifestationReviewFieldsFragmentDoc}`;

export const useGetReviewManifestationsQuery = <
  TData = GetReviewManifestationsQuery,
  TError = unknown
>(
  variables: GetReviewManifestationsQueryVariables,
  options?: UseQueryOptions<GetReviewManifestationsQuery, TError, TData>
) => {
  return useQuery<GetReviewManifestationsQuery, TError, TData>(
    ["getReviewManifestations", variables],
    fetcher<
      GetReviewManifestationsQuery,
      GetReviewManifestationsQueryVariables
    >(GetReviewManifestationsDocument, variables),
    options
  );
};

export const OpenOrderDocument = `
    mutation openOrder($input: SubmitOrderInput!) {
  submitOrder(input: $input, dryRun: false) {
    status
    message
    orderId
  }
}
    `;

export const useOpenOrderMutation = <TError = unknown, TContext = unknown>(
  options?: UseMutationOptions<
    OpenOrderMutation,
    TError,
    OpenOrderMutationVariables,
    TContext
  >
) => {
  return useMutation<
    OpenOrderMutation,
    TError,
    OpenOrderMutationVariables,
    TContext
  >(
    ["openOrder"],
    (variables?: OpenOrderMutationVariables) =>
      fetcher<OpenOrderMutation, OpenOrderMutationVariables>(
        OpenOrderDocument,
        variables
      )(),
    options
  );
};

export const RecommendFromFaustDocument = `
    query recommendFromFaust($faust: String!, $limit: Int!) {
  recommend(faust: $faust, limit: $limit) {
    result {
      work {
        ...WorkSmall
      }
    }
  }
}
    ${WorkSmallFragmentDoc}`;

export const useRecommendFromFaustQuery = <
  TData = RecommendFromFaustQuery,
  TError = unknown
>(
  variables: RecommendFromFaustQueryVariables,
  options?: UseQueryOptions<RecommendFromFaustQuery, TError, TData>
) => {
  return useQuery<RecommendFromFaustQuery, TError, TData>(
    ["recommendFromFaust", variables],
    fetcher<RecommendFromFaustQuery, RecommendFromFaustQueryVariables>(
      RecommendFromFaustDocument,
      variables
    ),
    options
  );
};

export const SearchWithPaginationDocument = `
    query searchWithPagination($q: SearchQueryInput!, $offset: Int!, $limit: PaginationLimitScalar!, $filters: SearchFiltersInput) {
  search(q: $q, filters: $filters) {
    hitcount
    works(offset: $offset, limit: $limit) {
      ...WorkSmall
    }
  }
}
    ${WorkSmallFragmentDoc}`;

export const useSearchWithPaginationQuery = <
  TData = SearchWithPaginationQuery,
  TError = unknown
>(
  variables: SearchWithPaginationQueryVariables,
  options?: UseQueryOptions<SearchWithPaginationQuery, TError, TData>
) => {
  return useQuery<SearchWithPaginationQuery, TError, TData>(
    ["searchWithPagination", variables],
    fetcher<SearchWithPaginationQuery, SearchWithPaginationQueryVariables>(
      SearchWithPaginationDocument,
      variables
    ),
    options
  );
};

export const ComplexSearchWithPaginationWorkAccessDocument = `
    query complexSearchWithPaginationWorkAccess($cql: String!, $offset: Int!, $limit: PaginationLimitScalar!, $filters: ComplexSearchFiltersInput!) {
  complexSearch(cql: $cql, filters: $filters) {
    hitcount
    works(offset: $offset, limit: $limit) {
      ...WorkAccess
    }
  }
}
    ${WorkAccessFragmentDoc}`;

export const useComplexSearchWithPaginationWorkAccessQuery = <
  TData = ComplexSearchWithPaginationWorkAccessQuery,
  TError = unknown
>(
  variables: ComplexSearchWithPaginationWorkAccessQueryVariables,
  options?: UseQueryOptions<
    ComplexSearchWithPaginationWorkAccessQuery,
    TError,
    TData
  >
) => {
  return useQuery<ComplexSearchWithPaginationWorkAccessQuery, TError, TData>(
    ["complexSearchWithPaginationWorkAccess", variables],
    fetcher<
      ComplexSearchWithPaginationWorkAccessQuery,
      ComplexSearchWithPaginationWorkAccessQueryVariables
    >(ComplexSearchWithPaginationWorkAccessDocument, variables),
    options
  );
};

export const ComplexSearchWithPaginationDocument = `
    query complexSearchWithPagination($cql: String!, $offset: Int!, $limit: PaginationLimitScalar!, $filters: ComplexSearchFiltersInput!) {
  complexSearch(cql: $cql, filters: $filters) {
    hitcount
    works(offset: $offset, limit: $limit) {
      ...WorkSmall
    }
  }
}
    ${WorkSmallFragmentDoc}`;

export const useComplexSearchWithPaginationQuery = <
  TData = ComplexSearchWithPaginationQuery,
  TError = unknown
>(
  variables: ComplexSearchWithPaginationQueryVariables,
  options?: UseQueryOptions<ComplexSearchWithPaginationQuery, TError, TData>
) => {
  return useQuery<ComplexSearchWithPaginationQuery, TError, TData>(
    ["complexSearchWithPagination", variables],
    fetcher<
      ComplexSearchWithPaginationQuery,
      ComplexSearchWithPaginationQueryVariables
    >(ComplexSearchWithPaginationDocument, variables),
    options
  );
};

export const SuggestionsFromQueryStringDocument = `
    query suggestionsFromQueryString($q: String!) {
  suggest(q: $q) {
    result {
      type
      term
      work {
        workId
        titles {
          main
        }
        creators {
          display
        }
        manifestations {
          all {
            pid
          }
          bestRepresentation {
            pid
            ...WithLanguages
          }
        }
      }
    }
  }
}
    ${WithLanguagesFragmentDoc}`;

export const useSuggestionsFromQueryStringQuery = <
  TData = SuggestionsFromQueryStringQuery,
  TError = unknown
>(
  variables: SuggestionsFromQueryStringQueryVariables,
  options?: UseQueryOptions<SuggestionsFromQueryStringQuery, TError, TData>
) => {
  return useQuery<SuggestionsFromQueryStringQuery, TError, TData>(
    ["suggestionsFromQueryString", variables],
    fetcher<
      SuggestionsFromQueryStringQuery,
      SuggestionsFromQueryStringQueryVariables
    >(SuggestionsFromQueryStringDocument, variables),
    options
  );
};

export const SearchFacetDocument = `
    query searchFacet($q: SearchQueryInput!, $facets: [FacetFieldEnum!]!, $facetLimit: Int!, $filters: SearchFiltersInput) {
  search(q: $q, filters: $filters) {
    facets(facets: $facets) {
      name
      type
      values(limit: $facetLimit) {
        key
        term
        score
      }
    }
  }
}
    `;

export const useSearchFacetQuery = <TData = SearchFacetQuery, TError = unknown>(
  variables: SearchFacetQueryVariables,
  options?: UseQueryOptions<SearchFacetQuery, TError, TData>
) => {
  return useQuery<SearchFacetQuery, TError, TData>(
    ["searchFacet", variables],
    fetcher<SearchFacetQuery, SearchFacetQueryVariables>(
      SearchFacetDocument,
      variables
    ),
    options
  );
};

export const IntelligentFacetsDocument = `
    query intelligentFacets($q: SearchQueryInput!, $facetsLimit: Int!, $valuesLimit: Int!, $filters: SearchFiltersInput!) {
  search(q: $q, filters: $filters) {
    intelligentFacets(limit: $facetsLimit) {
      name
      type
      values(limit: $valuesLimit) {
        key
        term
        score
      }
    }
  }
}
    `;

export const useIntelligentFacetsQuery = <
  TData = IntelligentFacetsQuery,
  TError = unknown
>(
  variables: IntelligentFacetsQueryVariables,
  options?: UseQueryOptions<IntelligentFacetsQuery, TError, TData>
) => {
  return useQuery<IntelligentFacetsQuery, TError, TData>(
    ["intelligentFacets", variables],
    fetcher<IntelligentFacetsQuery, IntelligentFacetsQueryVariables>(
      IntelligentFacetsDocument,
      variables
    ),
    options
  );
};

export const PlaceCopyDocument = `
    mutation placeCopy($input: CopyRequestInput!) {
  elba {
    placeCopyRequest(input: $input) {
      status
    }
  }
}
    `;

export const usePlaceCopyMutation = <TError = unknown, TContext = unknown>(
  options?: UseMutationOptions<
    PlaceCopyMutation,
    TError,
    PlaceCopyMutationVariables,
    TContext
  >
) => {
  return useMutation<
    PlaceCopyMutation,
    TError,
    PlaceCopyMutationVariables,
    TContext
  >(
    ["placeCopy"],
    (variables?: PlaceCopyMutationVariables) =>
      fetcher<PlaceCopyMutation, PlaceCopyMutationVariables>(
        PlaceCopyDocument,
        variables
      )(),
    options
  );
};
