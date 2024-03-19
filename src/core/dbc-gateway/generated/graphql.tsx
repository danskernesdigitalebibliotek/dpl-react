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
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: string;
  String: string;
  Boolean: boolean;
  Int: number;
  Float: number;
  /** A date-time string at UTC, such as 2007-12-03T10:15:30Z, compliant with the `date-time` format outlined in section 5.6 of the RFC 3339 profile of the ISO 8601 standard for representation of dates and times using the Gregorian calendar. */
  DateTime: unknown;
  /** An integer in the range from 1 to 100 */
  PaginationLimit: unknown;
};

export type Access =
  | AccessUrl
  | DigitalArticleService
  | Ereol
  | InfomediaService
  | InterLibraryLoan;

export type AccessType = {
  __typename?: "AccessType";
  code: AccessTypeCode;
  display: Scalars["String"];
};

export enum AccessTypeCode {
  /** @deprecated No longer supported */
  NotSpecified = "NOT_SPECIFIED",
  Online = "ONLINE",
  Physical = "PHYSICAL",
  Unknown = "UNKNOWN"
}

export type AccessUrl = {
  __typename?: "AccessUrl";
  /** If the resource requires login */
  loginRequired: Scalars["Boolean"];
  /** Notes for the resource */
  note?: Maybe<Scalars["String"]>;
  /** The origin, e.g. "DBC Webarkiv" */
  origin: Scalars["String"];
  /** The type of content that can be found at this URL */
  type?: Maybe<AccessUrlType>;
  /** The url where manifestation is located */
  url: Scalars["String"];
};

export enum AccessUrlType {
  Image = "IMAGE",
  Other = "OTHER",
  Resource = "RESOURCE",
  Sample = "SAMPLE",
  TableOfContents = "TABLE_OF_CONTENTS",
  Thumbnail = "THUMBNAIL"
}

export type Audience = {
  __typename?: "Audience";
  /** Range of numbers with either beginning of range or end of range or both e.g. 6-10, 1980-1999 */
  ages: Array<Range>;
  /** Is this material for children or adults */
  childrenOrAdults: Array<ChildOrAdult>;
  /** Appropriate audience for this manifestation */
  generalAudience: Array<Scalars["String"]>;
  /** LET number of this manifestion, defines the reability level, LET stands for læseegnethedstal */
  let?: Maybe<Scalars["String"]>;
  /** Appropriate audience as recommended by the library */
  libraryRecommendation?: Maybe<Scalars["String"]>;
  /** Lix number of this manifestion, defines the reability level, Lix stands for læsbarhedsindex */
  lix?: Maybe<Scalars["String"]>;
  /** Number of players in the game. */
  players?: Maybe<Players>;
  /** Primary target audience for this manifestation */
  primaryTarget: Array<Scalars["String"]>;
  /** Is this material for use in schools (folkeskole/ungdomsuddannelse) or is this material for use in schools by the teacher (folkeskole only) */
  schoolUse: Array<SchoolUse>;
};

export type CatalogueCodes = {
  __typename?: "CatalogueCodes";
  /** CatalogueCodes from the national registers */
  nationalBibliography: Array<Scalars["String"]>;
  /** CatalogueCodes from local bibliographies or catalogues that the manifestation belongs to */
  otherCatalogues: Array<Scalars["String"]>;
};

export type ChildOrAdult = {
  __typename?: "ChildOrAdult";
  code: ChildOrAdultCode;
  display: Scalars["String"];
};

export enum ChildOrAdultCode {
  ForAdults = "FOR_ADULTS",
  ForChildren = "FOR_CHILDREN"
}

export type Classification = {
  __typename?: "Classification";
  /** The classification code */
  code: Scalars["String"];
  /** Descriptive text for the classification code (DK5 only) */
  display: Scalars["String"];
  /** The dk5Heading for the classification (DK5 only) */
  dk5Heading?: Maybe<Scalars["String"]>;
  /** For DK5 only. The DK5 entry type: main entry, national entry, or additional entry */
  entryType?: Maybe<EntryType>;
  /** Name of the classification system */
  system: Scalars["String"];
};

/** The complete facet in response */
export type ComplexSearchFacetResponse = {
  __typename?: "ComplexSearchFacetResponse";
  name?: Maybe<Scalars["String"]>;
  values?: Maybe<Array<ComplexSearchFacetValue>>;
};

/** A Facet value in response */
export type ComplexSearchFacetValue = {
  __typename?: "ComplexSearchFacetValue";
  key: Scalars["String"];
  score: Scalars["Int"];
};

/** The supported facet fields */
export enum ComplexSearchFacets {
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
  Issue = "ISSUE",
  Language = "LANGUAGE",
  Libraryrecommendation = "LIBRARYRECOMMENDATION",
  Mainlanguage = "MAINLANGUAGE",
  Musicalensembleorcast = "MUSICALENSEMBLEORCAST",
  Players = "PLAYERS",
  Primarytarget = "PRIMARYTARGET",
  Specificmaterialtype = "SPECIFICMATERIALTYPE",
  Spokenlanguage = "SPOKENLANGUAGE",
  Subject = "SUBJECT",
  Subtitlelanguage = "SUBTITLELANGUAGE",
  Typeofscore = "TYPEOFSCORE"
}

/** Search Filters */
export type ComplexSearchFilters = {
  /** Id of agency. */
  agencyId?: InputMaybe<Array<Scalars["String"]>>;
  /** Name of the branch. */
  branch?: InputMaybe<Array<Scalars["String"]>>;
  /** BranchId.  */
  branchId?: InputMaybe<Array<Scalars["String"]>>;
  /** Overall location in library (eg. Voksne). */
  department?: InputMaybe<Array<Scalars["String"]>>;
  /** Id of publishing issue. */
  issueId?: InputMaybe<Array<Scalars["String"]>>;
  /** Local id of the item. */
  itemId?: InputMaybe<Array<Scalars["String"]>>;
  /** Where is the book physically located  (eg. skønlitteratur). */
  location?: InputMaybe<Array<Scalars["String"]>>;
  /** Onloan or OnShelf. */
  status?: InputMaybe<Array<HoldingsStatus>>;
  /** More specific location (eg. Fantasy). */
  sublocation?: InputMaybe<Array<Scalars["String"]>>;
};

/** The search response */
export type ComplexSearchResponse = {
  __typename?: "ComplexSearchResponse";
  /** Error message, for instance if CQL is invalid */
  errorMessage?: Maybe<Scalars["String"]>;
  /** Facets for this response */
  facets?: Maybe<Array<ComplexSearchFacetResponse>>;
  /** Total number of works found. May be used for pagination. */
  hitcount: Scalars["Int"];
  /**
   * Time for execution on solr
   * @deprecated No longer supported
   */
  solrExecutionDurationInMs?: Maybe<Scalars["Int"]>;
  /**
   * filter applied to the query
   * @deprecated No longer supported
   */
  solrFilter?: Maybe<Scalars["String"]>;
  /**
   * the query being executed
   * @deprecated No longer supported
   */
  solrQuery?: Maybe<Scalars["String"]>;
  /**
   * Time to tokenize query
   * @deprecated No longer supported
   */
  tokenizerDurationInMs?: Maybe<Scalars["Int"]>;
  /** The works matching the given search query. Use offset and limit for pagination. */
  works: Array<Work>;
};

/** The search response */
export type ComplexSearchResponseWorksArgs = {
  limit: Scalars["PaginationLimit"];
  offset: Scalars["Int"];
  sort?: InputMaybe<Array<Sort>>;
};

export type CopyRequestInput = {
  authorOfComponent?: InputMaybe<Scalars["String"]>;
  issueOfComponent?: InputMaybe<Scalars["String"]>;
  openURL?: InputMaybe<Scalars["String"]>;
  pagesOfComponent?: InputMaybe<Scalars["String"]>;
  pickUpAgencySubdivision?: InputMaybe<Scalars["String"]>;
  /** The pid of an article or periodica */
  pid: Scalars["String"];
  publicationDateOfComponent?: InputMaybe<Scalars["String"]>;
  publicationTitle?: InputMaybe<Scalars["String"]>;
  publicationYearOfComponent?: InputMaybe<Scalars["String"]>;
  titleOfComponent?: InputMaybe<Scalars["String"]>;
  userInterestDate?: InputMaybe<Scalars["String"]>;
  userMail?: InputMaybe<Scalars["String"]>;
  userName?: InputMaybe<Scalars["String"]>;
  volumeOfComponent?: InputMaybe<Scalars["String"]>;
};

export type CopyRequestResponse = {
  __typename?: "CopyRequestResponse";
  status: CopyRequestStatus;
};

export enum CopyRequestStatus {
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
  Ok = "OK",
  UnknownUser = "UNKNOWN_USER"
}

export type Corporation = Creator &
  Subject & {
    __typename?: "Corporation";
    /** Added information about the corporation, like M. Folmer Andersen (firma) */
    attributeToName?: Maybe<Scalars["String"]>;
    /** The full corporation or conference name */
    display: Scalars["String"];
    language?: Maybe<Language>;
    local?: Maybe<Scalars["Boolean"]>;
    /** Location or jurisdiction of the corporation or conference, like Københavns Kommune, Statistisk Kontor */
    location?: Maybe<Scalars["String"]>;
    /** Main corporation or conference */
    main?: Maybe<Scalars["String"]>;
    /** The full corporation or conference name to sort after */
    nameSort: Scalars["String"];
    /** Number of the conference */
    number?: Maybe<Scalars["String"]>;
    /** A list of which kinds of contributions this corporation made to this creation */
    roles: Array<Role>;
    /** Sub corporation or conference/meeting */
    sub?: Maybe<Scalars["String"]>;
    type: SubjectType;
    /** Year of the conference */
    year?: Maybe<Scalars["String"]>;
  };

export type Cover = {
  __typename?: "Cover";
  detail?: Maybe<Scalars["String"]>;
  detail42?: Maybe<Scalars["String"]>;
  detail117?: Maybe<Scalars["String"]>;
  detail207?: Maybe<Scalars["String"]>;
  detail500?: Maybe<Scalars["String"]>;
  origin?: Maybe<Scalars["String"]>;
  thumbnail?: Maybe<Scalars["String"]>;
};

export type Creator = {
  /** Name of the creator */
  display: Scalars["String"];
  /** Name of the creator which can be used to sort after  */
  nameSort: Scalars["String"];
  /** A list of which kinds of contributions this creator made to this creation */
  roles: Array<Role>;
};

export type Dk5MainEntry = {
  __typename?: "DK5MainEntry";
  /** Main DK5 classification code */
  code: Scalars["String"];
  /** Displayable main DK5 classification */
  display: Scalars["String"];
  /** The dk5Heading for the classification */
  dk5Heading: Scalars["String"];
};

export type DidYouMean = {
  __typename?: "DidYouMean";
  /** An alternative query */
  query: Scalars["String"];
  /** A probability score between 0-1 indicating how relevant the query is */
  score: Scalars["Float"];
};

export type DigitalArticleService = {
  __typename?: "DigitalArticleService";
  /** Issn which can be used to order article through Digital Article Service */
  issn: Scalars["String"];
};

export type Edition = {
  __typename?: "Edition";
  /** Quotation of contributor statements related to the edition */
  contributors: Array<Scalars["String"]>;
  /** The edition number and name */
  edition?: Maybe<Scalars["String"]>;
  /** A note about this specific edition */
  note?: Maybe<Scalars["String"]>;
  /** A year as displayable text and as number */
  publicationYear?: Maybe<PublicationYear>;
  /** Properties 'edition', 'contributorsToEdition' and 'publicationYear' as one string, e.g.: '3. udgave, revideret af Hugin Eide, 2005' */
  summary: Scalars["String"];
};

export type ElbaServices = {
  __typename?: "ElbaServices";
  placeCopyRequest: CopyRequestResponse;
};

export type ElbaServicesPlaceCopyRequestArgs = {
  dryRun?: InputMaybe<Scalars["Boolean"]>;
  input: CopyRequestInput;
};

export enum EntryType {
  AdditionalEntry = "ADDITIONAL_ENTRY",
  MainEntry = "MAIN_ENTRY",
  NationalBibliographyAdditionalEntry = "NATIONAL_BIBLIOGRAPHY_ADDITIONAL_ENTRY",
  NationalBibliographyEntry = "NATIONAL_BIBLIOGRAPHY_ENTRY"
}

export type Ereol = {
  __typename?: "Ereol";
  /** Is this a manifestation that always can be loaned on ereolen.dk even if you've run out of loans this month */
  canAlwaysBeLoaned: Scalars["Boolean"];
  /** Notes for the resource */
  note?: Maybe<Scalars["String"]>;
  /** The origin, e.g. "Ereolen" or "Ereolen Go" */
  origin: Scalars["String"];
  /** The url where manifestation is located */
  url: Scalars["String"];
};

/** The supported facet fields */
export enum FacetField {
  AccessTypes = "accessTypes",
  Age = "age",
  CanAlwaysBeLoaned = "canAlwaysBeLoaned",
  ChildrenOrAdults = "childrenOrAdults",
  Creators = "creators",
  Dk5 = "dk5",
  FictionNonfiction = "fictionNonfiction",
  FictionalCharacters = "fictionalCharacters",
  GeneralAudience = "generalAudience",
  GenreAndForm = "genreAndForm",
  Let = "let",
  LibraryRecommendation = "libraryRecommendation",
  Lix = "lix",
  MainLanguages = "mainLanguages",
  MaterialTypesGeneral = "materialTypesGeneral",
  MaterialTypesSpecific = "materialTypesSpecific",
  Subjects = "subjects",
  WorkTypes = "workTypes",
  Year = "year"
}

/** The result for a specific facet */
export type FacetResult = {
  __typename?: "FacetResult";
  /** The name of the facet. */
  name: Scalars["String"];
  /** The values of thie facet result */
  values: Array<FacetValue>;
};

/** The result for a specific facet */
export type FacetResultValuesArgs = {
  limit: Scalars["Int"];
};

/** A facet value consists of a term and a count. */
export type FacetValue = {
  __typename?: "FacetValue";
  /** Use the key when applying filters */
  key: Scalars["String"];
  /** A score indicating relevance */
  score?: Maybe<Scalars["Int"]>;
  /** A value of a facet field */
  term: Scalars["String"];
};

export type FictionNonfiction = {
  __typename?: "FictionNonfiction";
  /** Binary code fiction/nonfiction used for filtering */
  code: FictionNonfictionCode;
  /** Displayable overall category/genre. In Danish skønlitteratur/faglitteratur for literature, fiktion/nonfiktion for other types. */
  display: Scalars["String"];
};

export enum FictionNonfictionCode {
  Fiction = "FICTION",
  Nonfiction = "NONFICTION",
  NotSpecified = "NOT_SPECIFIED"
}

export type GeneralMaterialType = {
  __typename?: "GeneralMaterialType";
  /** code for materialType # @TODO - is this a finite list ?? - and where to get it */
  code: GeneralMaterialTypeCode;
  /** Ths string to display */
  display: Scalars["String"];
};

export enum GeneralMaterialTypeCode {
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

export enum HoldingsStatus {
  /** Holding is on loan */
  OnLoan = "OnLoan",
  /** Holding is physically available at the branch */
  OnShelf = "OnShelf"
}

export type HostPublication = {
  __typename?: "HostPublication";
  /** Creator of the host publication if host publication is book */
  creator?: Maybe<Scalars["String"]>;
  /** Edition statement for the host publication */
  edition?: Maybe<Scalars["String"]>;
  /** ISBN of the publication this manifestation can be found in */
  isbn?: Maybe<Scalars["String"]>;
  /** ISSN of the publication this manifestation can be found in */
  issn?: Maybe<Scalars["String"]>;
  /** The issue of the publication this manifestation can be found in */
  issue?: Maybe<Scalars["String"]>;
  /** Notes about the publication where this manifestation can be found in */
  notes?: Maybe<Array<Scalars["String"]>>;
  /** The pages in the publication where this manifestation can be found in */
  pages?: Maybe<Scalars["String"]>;
  /** The publisher of the publication where this manifestation can be found in */
  publisher?: Maybe<Scalars["String"]>;
  /** Series of the publication this manifestation can be found in */
  series?: Maybe<Series>;
  /** All details about the publication this manifestation can be found in */
  summary: Scalars["String"];
  /** Publication this manifestation can be found in */
  title: Scalars["String"];
  /** The publication year of the publication this manifestation can be found in */
  year?: Maybe<PublicationYear>;
};

export type Identifier = {
  __typename?: "Identifier";
  /** The type of identifier */
  type: IdentifierType;
  /** The actual identifier */
  value: Scalars["String"];
};

export enum IdentifierType {
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
  byLine?: Maybe<Scalars["String"]>;
  dateLine?: Maybe<Scalars["String"]>;
  headLine?: Maybe<Scalars["String"]>;
  hedLine?: Maybe<Scalars["String"]>;
  html?: Maybe<Scalars["String"]>;
  id: Scalars["String"];
  logo?: Maybe<Scalars["String"]>;
  paper?: Maybe<Scalars["String"]>;
  subHeadLine?: Maybe<Scalars["String"]>;
  text?: Maybe<Scalars["String"]>;
};

export enum InfomediaError {
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
  error?: Maybe<InfomediaError>;
};

export type InfomediaService = {
  __typename?: "InfomediaService";
  /** Infomedia ID which can be used to fetch article through Infomedia Service */
  id: Scalars["String"];
};

export type InterLibraryLoan = {
  __typename?: "InterLibraryLoan";
  /** Is true when manifestation can be borrowed via ill */
  loanIsPossible: Scalars["Boolean"];
};

export type Language = {
  __typename?: "Language";
  /** Language as displayable text */
  display: Scalars["String"];
  /** ISO639-2 language code */
  isoCode: Scalars["String"];
};

export enum LanguageCode {
  Da = "da",
  En = "en"
}

export type Languages = {
  __typename?: "Languages";
  /** Summary/abstract languages of this manifestation, if the manifestation contains short summaries of the content in another language */
  abstract?: Maybe<Array<Language>>;
  /** Main language of this manifestation */
  main?: Maybe<Array<Language>>;
  /** Notes of the languages that describe subtitles, spoken/written (original, dubbed/synchonized), visual interpretation, parallel (notes are written in Danish) */
  notes?: Maybe<Array<Scalars["String"]>>;
  /** Original language of this manifestation */
  original?: Maybe<Array<Language>>;
  /** Parallel languages of this manifestation, if more languages are printed in the same book */
  parallel?: Maybe<Array<Language>>;
  /** Spoken language in this manifestation e.g. dubbed/syncronized language in movie */
  spoken?: Maybe<Array<Language>>;
  /** Subtitles in this manifestation */
  subtitles?: Maybe<Array<Language>>;
};

export type LinkCheckResponse = {
  __typename?: "LinkCheckResponse";
  brokenSince?: Maybe<Scalars["DateTime"]>;
  lastCheckedAt?: Maybe<Scalars["DateTime"]>;
  status: LinkCheckStatus;
  url: Scalars["String"];
};

export type LinkCheckService = {
  __typename?: "LinkCheckService";
  checks: Array<LinkCheckResponse>;
};

export type LinkCheckServiceChecksArgs = {
  urls?: InputMaybe<Array<Scalars["String"]>>;
};

export enum LinkCheckStatus {
  Broken = "BROKEN",
  Gone = "GONE",
  Invalid = "INVALID",
  Ok = "OK"
}

export type Manifestation = {
  __typename?: "Manifestation";
  /** Abstract of the entity */
  abstract: Array<Scalars["String"]>;
  /** Different options to access manifestation */
  access: Array<Access>;
  /** Access type of this manifestation */
  accessTypes: Array<AccessType>;
  /** Different kinds of definitions of appropriate audience for this manifestation */
  audience?: Maybe<Audience>;
  /** CatalogueCodes divided in codes from the national bibliography and other codes */
  catalogueCodes: CatalogueCodes;
  /** Classification codes for this manifestation from any classification system */
  classifications: Array<Classification>;
  /** Contributors to the manifestation, actors, illustrators etc */
  contributors: Array<Creator>;
  /** Additional contributors of this manifestation as described on the publication. E.g. 'på dansk ved Vivi Berendt' */
  contributorsFromDescription: Array<Scalars["String"]>;
  /** Cover for this manifestation */
  cover: Cover;
  /** Primary creators of the manifestation e.g. authors, directors, musicians etc */
  creators: Array<Creator>;
  /** Additional creators of this manifestation as described on the publication. E.g. 'tekst af William Warren' */
  creatorsFromDescription: Array<Scalars["String"]>;
  /** The year for the publication of the first edition for this work  */
  dateFirstEdition?: Maybe<PublicationYear>;
  /** Edition details for this manifestation */
  edition?: Maybe<Edition>;
  /** Overall literary category/genre of this manifestation. e.g. fiction or nonfiction. In Danish skønlitteratur/faglitteratur for literature, fiktion/nonfiktion for other types. */
  fictionNonfiction?: Maybe<FictionNonfiction>;
  /** The genre, (literary) form, type etc. of this manifestation */
  genreAndForm: Array<Scalars["String"]>;
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
  /** The type of material of the manifestation based on bibliotek.dk types */
  materialTypes: Array<MaterialType>;
  /** Notes about the manifestation */
  notes: Array<Note>;
  /** The work that this manifestation is part of */
  ownerWork: Work;
  /** Physical description of this manifestation like extent (pages/minutes), illustrations etc. */
  physicalDescriptions: Array<PhysicalDescription>;
  /** Unique identification of the manifestation e.g 870970-basis:54029519 */
  pid: Scalars["String"];
  /** Publisher of this manifestion */
  publisher: Array<Scalars["String"]>;
  /** The creation date of the record describing this manifestation in the format YYYYMMDD */
  recordCreationDate: Scalars["String"];
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
  source: Array<Scalars["String"]>;
  /** Subjects for this manifestation */
  subjects: SubjectContainer;
  /** Quotation of the manifestation's table of contents or a similar content list */
  tableOfContents?: Maybe<TableOfContent>;
  /** Different kinds of titles for this work */
  titles: ManifestationTitles;
  /** id of the manifestaion unit */
  unit?: Maybe<Unit>;
  /**
   * Universe for this manifestation
   * @deprecated Use 'universes' instead
   */
  universe?: Maybe<Universe>;
  /** Universes for this manifestation */
  universes: Array<Universe>;
  /** Information about on which volume this manifestation is in multi volume work */
  volume?: Maybe<Scalars["String"]>;
  /** Worktypes for this manifestations work */
  workTypes: Array<WorkType>;
  /** The year this manifestation was originally published or produced */
  workYear?: Maybe<PublicationYear>;
};

export type ManifestationPart = {
  __typename?: "ManifestationPart";
  /** Classification of this entry (music track or literary analysis) */
  classifications: Array<Classification>;
  /** Contributors from description - additional contributor to this entry */
  contributorsFromDescription: Array<Scalars["String"]>;
  /** The creator of the music track or literary analysis */
  creators: Array<Creator>;
  /** Additional creator or contributor to this entry (music track or literary analysis) as described on the publication. E.g. 'arr.: H. Cornell' */
  creatorsFromDescription: Array<Scalars["String"]>;
  /** The playing time for this specific part (i.e. the duration of a music track)  */
  playingTime?: Maybe<Scalars["String"]>;
  /** Subjects of this entry (music track or literary analysis) */
  subjects?: Maybe<Array<Subject>>;
  /** The title of the entry (music track or title of a literary analysis) */
  title: Scalars["String"];
};

export enum ManifestationPartType {
  MusicTracks = "MUSIC_TRACKS",
  NotSpecified = "NOT_SPECIFIED",
  PartsOfBook = "PARTS_OF_BOOK",
  SheetMusicContent = "SHEET_MUSIC_CONTENT"
}

export type ManifestationParts = {
  __typename?: "ManifestationParts";
  /** Heading for the music content note */
  heading?: Maybe<Scalars["String"]>;
  /** The creator and title etc of the individual parts */
  parts: Array<ManifestationPart>;
  /** The type of manifestation parts, is this music tracks, book parts etc. */
  type: ManifestationPartType;
};

export type ManifestationReview = {
  __typename?: "ManifestationReview";
  rating?: Maybe<Scalars["String"]>;
  reviewByLibrarians?: Maybe<Array<Maybe<ReviewElement>>>;
};

export type ManifestationTitles = {
  __typename?: "ManifestationTitles";
  /** Alternative titles for this manifestation e.g. a title in a different language */
  alternative: Array<Scalars["String"]>;
  /** The full title(s) of the manifestation including subtitles etc */
  full: Array<Scalars["String"]>;
  /** Information that distinguishes this manifestation from a similar manifestation with same title, e.g. 'illustrated by Ted Kirby' */
  identifyingAddition?: Maybe<Scalars["String"]>;
  /** The main title(s) of the work */
  main: Array<Scalars["String"]>;
  /** The title of the work that this expression/manifestation is translated from or based on. The original title(s) of a film which has a different distribution title. */
  original?: Maybe<Array<Scalars["String"]>>;
  /** Titles (in other languages) parallel to the main 'title' of the manifestation */
  parallel: Array<Scalars["String"]>;
  /** The sorted title of the entity */
  sort: Scalars["String"];
  /** The standard title of the entity, used for music and movies */
  standard?: Maybe<Scalars["String"]>;
  /** The title of the entity with the language of the entity in parenthesis after. This field is only generated for non-danish titles. */
  titlePlusLanguage?: Maybe<Scalars["String"]>;
  /** Danish translation of the main title */
  translated?: Maybe<Array<Scalars["String"]>>;
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

export type MaterialType = {
  __typename?: "MaterialType";
  /**
   * The general type of material of the manifestation based on a grouping of bibliotek.dk material types, e.g. bøger, lydbøger etc.
   * @TODO - this on is deprecated pr. 1/2 '24
   * @deprecated Use 'materialTypeGenerel' instead
   */
  general: Scalars["String"];
  /** jed 1.1 - the general materialtype */
  materialTypeGeneral: GeneralMaterialType;
  /** jed 1.1 - the specific materialtType */
  materialTypeSpecific: SpecificMaterialType;
  /**
   * The type of material of the manifestation based on bibliotek.dk types
   * @TODO - this on is deprecated pr. 1/2 '24
   * @deprecated Use 'materialtTypeSpecific' instead
   */
  specific: Scalars["String"];
};

export type Mood = Subject & {
  __typename?: "Mood";
  display: Scalars["String"];
  language?: Maybe<Language>;
  local?: Maybe<Scalars["Boolean"]>;
  type: SubjectType;
};

export type Mutation = {
  __typename?: "Mutation";
  elba: ElbaServices;
  submitOrder?: Maybe<SubmitOrder>;
  /** @deprecated Use 'Elba.placeCopyRequest' instead */
  submitPeriodicaArticleOrder: PeriodicaArticleOrderResponse;
};

export type MutationSubmitOrderArgs = {
  dryRun?: InputMaybe<Scalars["Boolean"]>;
  input: SubmitOrderInput;
};

export type MutationSubmitPeriodicaArticleOrderArgs = {
  dryRun?: InputMaybe<Scalars["Boolean"]>;
  input: PeriodicaArticleOrder;
};

export type NarrativeTechnique = Subject & {
  __typename?: "NarrativeTechnique";
  display: Scalars["String"];
  language?: Maybe<Language>;
  local?: Maybe<Scalars["Boolean"]>;
  type: SubjectType;
};

export type Note = {
  __typename?: "Note";
  /** The actual notes */
  display: Array<Scalars["String"]>;
  /** Heading before note */
  heading?: Maybe<Scalars["String"]>;
  /** The type of note - e.g. note about language, genre etc, NOT_SPECIFIED if not known.  */
  type: NoteType;
};

export enum NoteType {
  ConnectionToOtherWorks = "CONNECTION_TO_OTHER_WORKS",
  DescriptionOfMaterial = "DESCRIPTION_OF_MATERIAL",
  Dissertation = "DISSERTATION",
  Edition = "EDITION",
  Frequency = "FREQUENCY",
  MusicalEnsembleOrCast = "MUSICAL_ENSEMBLE_OR_CAST",
  NotSpecified = "NOT_SPECIFIED",
  OccasionForPublication = "OCCASION_FOR_PUBLICATION",
  OriginalTitle = "ORIGINAL_TITLE",
  OriginalVersion = "ORIGINAL_VERSION",
  References = "REFERENCES",
  RestrictionsOnUse = "RESTRICTIONS_ON_USE",
  TypeOfScore = "TYPE_OF_SCORE"
}

export type NumberInSeries = {
  __typename?: "NumberInSeries";
  /** The number in the series as text, quoted form the publication, e.g. 'Vol. IX' */
  display: Scalars["String"];
  /** The number in the series as integer */
  number?: Maybe<Array<Scalars["Int"]>>;
};

export enum OrderType {
  Estimate = "ESTIMATE",
  Hold = "HOLD",
  Loan = "LOAN",
  NonReturnableCopy = "NON_RETURNABLE_COPY",
  Normal = "NORMAL",
  StackRetrieval = "STACK_RETRIEVAL"
}

export type PeriodicaArticleOrder = {
  authorOfComponent?: InputMaybe<Scalars["String"]>;
  pagination?: InputMaybe<Scalars["String"]>;
  pickUpBranch: Scalars["String"];
  /** The pid of an article or periodica */
  pid: Scalars["String"];
  publicationDateOfComponent?: InputMaybe<Scalars["String"]>;
  titleOfComponent?: InputMaybe<Scalars["String"]>;
  userMail?: InputMaybe<Scalars["String"]>;
  userName?: InputMaybe<Scalars["String"]>;
  volume?: InputMaybe<Scalars["String"]>;
};

export type PeriodicaArticleOrderResponse = {
  __typename?: "PeriodicaArticleOrderResponse";
  status: PeriodicaArticleOrderStatus;
};

export enum PeriodicaArticleOrderStatus {
  ErrorAgencyNotSubscribed = "ERROR_AGENCY_NOT_SUBSCRIBED",
  ErrorInvalidPickupBranch = "ERROR_INVALID_PICKUP_BRANCH",
  ErrorNoNameOrEmail = "ERROR_NO_NAME_OR_EMAIL",
  ErrorPidNotReservable = "ERROR_PID_NOT_RESERVABLE",
  ErrorUnauthorizedUser = "ERROR_UNAUTHORIZED_USER",
  Ok = "OK"
}

export type Person = Creator &
  Subject & {
    __typename?: "Person";
    /** Creator aliases, creators behind used pseudonym */
    aliases: Array<Person>;
    /** Added information about the person, like Henri, konge af Frankrig */
    attributeToName?: Maybe<Scalars["String"]>;
    /** Birth year of the person */
    birthYear?: Maybe<Scalars["String"]>;
    /** The person's whole name in normal order */
    display: Scalars["String"];
    /** First name of the person */
    firstName?: Maybe<Scalars["String"]>;
    language?: Maybe<Language>;
    /** Last name of the person */
    lastName?: Maybe<Scalars["String"]>;
    local?: Maybe<Scalars["Boolean"]>;
    /** The person's full name inverted */
    nameSort: Scalars["String"];
    /** A list of which kinds of contributions this person made to this creation */
    roles: Array<Role>;
    /** A roman numeral added to the person, like Christian IV */
    romanNumeral?: Maybe<Scalars["String"]>;
    type: SubjectType;
  };

export type PhysicalDescription = {
  __typename?: "PhysicalDescription";
  /** Material that comes with the manifestation (bilag) */
  accompanyingMaterial?: Maybe<Scalars["String"]>;
  /** Additional physical description of the manifestation (e.g illustrations etc) */
  additionalDescription?: Maybe<Scalars["String"]>;
  /** Extent of the manifestation like pages and number of items */
  extent?: Maybe<Scalars["String"]>;
  /** Number of pages of the manifestation as number */
  numberOfPages?: Maybe<Scalars["Int"]>;
  /** Number of units, like 3 cassettes, or 1 score etc. */
  numberOfUnits?: Maybe<Scalars["String"]>;
  /** The playing time of the manifestation (e.g 2 hours 5 minutes) */
  playingTime?: Maybe<Scalars["String"]>;
  /** The necessary equipment to use the material */
  requirements?: Maybe<Scalars["String"]>;
  /** Size of the manifestation */
  size?: Maybe<Scalars["String"]>;
  /** A summary of the physical description of this manifestation like extent (pages/minutes), illustrations etc. */
  summary: Scalars["String"];
  /** Technical information about the manifestation (e.g blu-ray disc) */
  technicalInformation?: Maybe<Scalars["String"]>;
  /** Ratio of text vs. illustration from 1-5 as a number, where 1 means no illustrations and 5 means illustrations on all pages */
  textVsIllustrations?: Maybe<Scalars["Int"]>;
};

export type Players = {
  __typename?: "Players";
  /** Number of players interval begin. */
  begin?: Maybe<Scalars["Int"]>;
  /** Display name for the number of players. */
  display?: Maybe<Scalars["String"]>;
  /** Number of players interval end. */
  end?: Maybe<Scalars["Int"]>;
};

export type Printing = {
  __typename?: "Printing";
  /** The printing number and name */
  printing: Scalars["String"];
  /** A year as displayable text and as number */
  publicationYear?: Maybe<PublicationYear>;
  /** Publisher of printing when other than the original publisher of the edition (260*b) */
  publisher?: Maybe<Scalars["String"]>;
  /** Properties 'printing' and 'publicationYear' as one string, e.g.: '11. oplag, 2020' */
  summary: Scalars["String"];
};

export type PublicationYear = {
  __typename?: "PublicationYear";
  display: Scalars["String"];
  endYear?: Maybe<Scalars["Int"]>;
  frequency?: Maybe<Scalars["String"]>;
  year?: Maybe<Scalars["Int"]>;
};

export type Query = {
  __typename?: "Query";
  complexSearch: ComplexSearchResponse;
  infomedia: InfomediaResponse;
  linkCheck: LinkCheckService;
  localSuggest: LocalSuggestResponse;
  manifestation?: Maybe<Manifestation>;
  manifestations: Array<Maybe<Manifestation>>;
  /** Get recommendations */
  recommend: RecommendationResponse;
  refWorks: Scalars["String"];
  relatedSubjects?: Maybe<Array<Scalars["String"]>>;
  ris: Scalars["String"];
  search: SearchResponse;
  suggest: SuggestResponse;
  work?: Maybe<Work>;
  works: Array<Maybe<Work>>;
};

export type QueryComplexSearchArgs = {
  cql: Scalars["String"];
  facets?: InputMaybe<ComplexSearchFacets>;
  filters?: InputMaybe<ComplexSearchFilters>;
};

export type QueryInfomediaArgs = {
  id: Scalars["String"];
};

export type QueryLocalSuggestArgs = {
  branchId?: InputMaybe<Scalars["String"]>;
  limit?: InputMaybe<Scalars["Int"]>;
  q: Scalars["String"];
  suggestType?: InputMaybe<Array<SuggestionType>>;
};

export type QueryManifestationArgs = {
  faust?: InputMaybe<Scalars["String"]>;
  pid?: InputMaybe<Scalars["String"]>;
};

export type QueryManifestationsArgs = {
  faust?: InputMaybe<Array<Scalars["String"]>>;
  pid?: InputMaybe<Array<Scalars["String"]>>;
};

export type QueryRecommendArgs = {
  branchId?: InputMaybe<Scalars["String"]>;
  faust?: InputMaybe<Scalars["String"]>;
  id?: InputMaybe<Scalars["String"]>;
  limit?: InputMaybe<Scalars["Int"]>;
  pid?: InputMaybe<Scalars["String"]>;
};

export type QueryRefWorksArgs = {
  pids: Array<Scalars["String"]>;
};

export type QueryRelatedSubjectsArgs = {
  limit?: InputMaybe<Scalars["Int"]>;
  q: Array<Scalars["String"]>;
};

export type QueryRisArgs = {
  pids: Array<Scalars["String"]>;
};

export type QuerySearchArgs = {
  filters?: InputMaybe<SearchFilters>;
  q: SearchQuery;
  search_exact?: InputMaybe<Scalars["Boolean"]>;
};

export type QuerySuggestArgs = {
  limit?: InputMaybe<Scalars["Int"]>;
  q: Scalars["String"];
  suggestType?: InputMaybe<SuggestionType>;
  workType?: InputMaybe<WorkType>;
};

export type QueryWorkArgs = {
  faust?: InputMaybe<Scalars["String"]>;
  id?: InputMaybe<Scalars["String"]>;
  language?: InputMaybe<LanguageCode>;
  oclc?: InputMaybe<Scalars["String"]>;
  pid?: InputMaybe<Scalars["String"]>;
};

export type QueryWorksArgs = {
  faust?: InputMaybe<Array<Scalars["String"]>>;
  id?: InputMaybe<Array<Scalars["String"]>>;
  language?: InputMaybe<LanguageCode>;
  oclc?: InputMaybe<Array<Scalars["String"]>>;
  pid?: InputMaybe<Array<Scalars["String"]>>;
};

export type Range = {
  __typename?: "Range";
  begin?: Maybe<Scalars["Int"]>;
  display: Scalars["String"];
  end?: Maybe<Scalars["Int"]>;
};

export type Recommendation = {
  __typename?: "Recommendation";
  /** The recommended manifestation */
  manifestation: Manifestation;
  /** Info on how this recommendation was generated */
  reader: Array<Scalars["String"]>;
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
  faust?: Maybe<Scalars["String"]>;
  /** Notes describing the relation of the related periodical/journal/publication */
  heading: Scalars["String"];
  /** ISBN of the related publication */
  isbn?: Maybe<Scalars["String"]>;
  /** ISSN of the related periodical/journal/publication */
  issn?: Maybe<Scalars["String"]>;
  /** Title of the related periodical/journal */
  title: Array<Scalars["String"]>;
  /** URL of the related publication */
  url?: Maybe<Scalars["String"]>;
  /** Note regarding the URL of the related publication */
  urlText?: Maybe<Scalars["String"]>;
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
  content?: Maybe<Scalars["String"]>;
  /**
   * This is a paragraph containing markup where links to manifestations
   * can be inserted. For instance '"Axel Steens nye job minder om [870970-basis:20307021] fra ...'.
   * Relevant manifestations are located in the manifestations field.
   */
  contentSubstitute?: Maybe<Scalars["String"]>;
  heading?: Maybe<Scalars["String"]>;
  /** Manifestations that can be used to generate and insert links into 'contentSubsitute'. */
  manifestations?: Maybe<Array<Maybe<Manifestation>>>;
  type?: Maybe<ReviewElementType>;
};

export enum ReviewElementType {
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
  functionCode: Scalars["String"];
};

export type SchoolUse = {
  __typename?: "SchoolUse";
  code: SchoolUseCode;
  display: Scalars["String"];
};

export enum SchoolUseCode {
  ForSchoolUse = "FOR_SCHOOL_USE",
  ForTeacher = "FOR_TEACHER"
}

/** Search Filters */
export type SearchFilters = {
  accessTypes?: InputMaybe<Array<Scalars["String"]>>;
  age?: InputMaybe<Array<Scalars["String"]>>;
  ageRange?: InputMaybe<Array<Scalars["String"]>>;
  branchId?: InputMaybe<Array<Scalars["String"]>>;
  canAlwaysBeLoaned?: InputMaybe<Array<Scalars["String"]>>;
  childrenOrAdults?: InputMaybe<Array<Scalars["String"]>>;
  creators?: InputMaybe<Array<Scalars["String"]>>;
  department?: InputMaybe<Array<Scalars["String"]>>;
  dk5?: InputMaybe<Array<Scalars["String"]>>;
  fictionNonfiction?: InputMaybe<Array<Scalars["String"]>>;
  fictionalCharacters?: InputMaybe<Array<Scalars["String"]>>;
  generalAudience?: InputMaybe<Array<Scalars["String"]>>;
  genreAndForm?: InputMaybe<Array<Scalars["String"]>>;
  letRange?: InputMaybe<Array<Scalars["String"]>>;
  libraryRecommendation?: InputMaybe<Array<Scalars["String"]>>;
  lixRange?: InputMaybe<Array<Scalars["String"]>>;
  location?: InputMaybe<Array<Scalars["String"]>>;
  mainLanguages?: InputMaybe<Array<Scalars["String"]>>;
  materialTypesGeneral?: InputMaybe<Array<Scalars["String"]>>;
  materialTypesSpecific?: InputMaybe<Array<Scalars["String"]>>;
  status?: InputMaybe<Array<HoldingsStatus>>;
  subjects?: InputMaybe<Array<Scalars["String"]>>;
  sublocation?: InputMaybe<Array<Scalars["String"]>>;
  workTypes?: InputMaybe<Array<Scalars["String"]>>;
  year?: InputMaybe<Array<Scalars["String"]>>;
};

/** The supported fields to query */
export type SearchQuery = {
  /**
   * Search for title, creator, subject or a combination.
   * This is typically used where a single search box is desired.
   */
  all?: InputMaybe<Scalars["String"]>;
  /** Search for creator */
  creator?: InputMaybe<Scalars["String"]>;
  /** Search for specific subject */
  subject?: InputMaybe<Scalars["String"]>;
  /** Search for specific title */
  title?: InputMaybe<Scalars["String"]>;
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
  hitcount: Scalars["Int"];
  /** Will return the facets that best match the input query and filters */
  intelligentFacets: Array<FacetResult>;
  /** The works matching the given search query. Use offset and limit for pagination. */
  works: Array<Work>;
};

/** The simple search response */
export type SearchResponseDidYouMeanArgs = {
  limit?: InputMaybe<Scalars["Int"]>;
};

/** The simple search response */
export type SearchResponseFacetsArgs = {
  facets: Array<FacetField>;
};

/** The simple search response */
export type SearchResponseIntelligentFacetsArgs = {
  limit?: InputMaybe<Scalars["Int"]>;
};

/** The simple search response */
export type SearchResponseWorksArgs = {
  limit: Scalars["PaginationLimit"];
  offset: Scalars["Int"];
};

export type SerieWork = {
  __typename?: "SerieWork";
  /** The number of work in the series as a number (as text) */
  numberInSeries?: Maybe<Scalars["String"]>;
  /** Information about whether this work in the series should be read first */
  readThisFirst?: Maybe<Scalars["Boolean"]>;
  /** Information about whether this work in the series can be read without considering the order of the series, it can be read at any time */
  readThisWhenever?: Maybe<Scalars["Boolean"]>;
  /** Work of a serieWork */
  work: Work;
};

export type Series = {
  __typename?: "Series";
  /** A alternative title to the main 'title' of the series */
  alternativeTitles: Array<Scalars["String"]>;
  /** Description of the series */
  description?: Maybe<Scalars["String"]>;
  /** Whether this is a popular series or general series */
  isPopular?: Maybe<Scalars["Boolean"]>;
  /** MainLanguages of the series */
  mainLanguages: Array<Scalars["String"]>;
  /** Members of this serie.  */
  members: Array<SerieWork>;
  /**
   * The number in the series as text qoutation and a number
   * @deprecated field 'NumberInSeries.number' is removed and only String value of 'NumberInSeries.display' is returned
   */
  numberInSeries?: Maybe<NumberInSeries>;
  /** A parallel title to the main 'title' of the series, in a different language */
  parallelTitles: Array<Scalars["String"]>;
  /** Information about whether this work in the series should be read first */
  readThisFirst?: Maybe<Scalars["Boolean"]>;
  /** Information about whether this work in the series can be read without considering the order of the series, it can be read at any time */
  readThisWhenever?: Maybe<Scalars["Boolean"]>;
  /** The title of the series */
  title: Scalars["String"];
  /** WorkTypes for the series */
  workTypes: Array<Scalars["String"]>;
};

export type SeriesMembersArgs = {
  limit?: InputMaybe<Scalars["Int"]>;
  offset?: InputMaybe<Scalars["Int"]>;
};

export type Setting = Subject & {
  __typename?: "Setting";
  display: Scalars["String"];
  language?: Maybe<Language>;
  local?: Maybe<Scalars["Boolean"]>;
  type: SubjectType;
};

export type Shelfmark = {
  __typename?: "Shelfmark";
  /** A postfix to the shelfmark, eg. 99.4 Christensen, Inger. f. 1935 */
  postfix?: Maybe<Scalars["String"]>;
  /** The actual shelfmark - e.g. information about on which shelf in the library this manifestation can be found, e.g. 99.4 */
  shelfmark: Scalars["String"];
};

export type Sort = {
  index: Scalars["String"];
  order: SortOrder;
};

export enum SortOrder {
  Asc = "ASC",
  Desc = "DESC"
  // /** @deprecated No longer supported */
  // Asc = 'asc',
  // /** @deprecated No longer supported */
  // Desc = 'desc'
}

export type SpecificMaterialType = {
  __typename?: "SpecificMaterialType";
  /** code for materialType */
  code: Scalars["String"];
  /** Ths string to display */
  display: Scalars["String"];
};

export type Subject = {
  display: Scalars["String"];
  /** Language of the subject - contains display and isoCode  */
  language?: Maybe<Language>;
  local?: Maybe<Scalars["Boolean"]>;
  /** The type of subject - 'location', 'time period' etc., 'topic' if not specific kind of subject term */
  type: SubjectType;
};

export type SubjectContainer = {
  __typename?: "SubjectContainer";
  /** All subjects */
  all: Array<Subject>;
  /** Only DBC verified subjects */
  dbcVerified: Array<Subject>;
};

export type SubjectText = Subject & {
  __typename?: "SubjectText";
  display: Scalars["String"];
  language?: Maybe<Language>;
  local?: Maybe<Scalars["Boolean"]>;
  type: SubjectType;
};

export enum SubjectType {
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
  Topic = "TOPIC"
}

export type SubmitOrder = {
  __typename?: "SubmitOrder";
  deleted?: Maybe<Scalars["Boolean"]>;
  message?: Maybe<Scalars["String"]>;
  /** if order was submitted successfully */
  ok?: Maybe<Scalars["Boolean"]>;
  orderId?: Maybe<Scalars["String"]>;
  orsId?: Maybe<Scalars["String"]>;
  status: SubmitOrderStatus;
};

export type SubmitOrderInput = {
  author?: InputMaybe<Scalars["String"]>;
  authorOfComponent?: InputMaybe<Scalars["String"]>;
  exactEdition?: InputMaybe<Scalars["Boolean"]>;
  expires?: InputMaybe<Scalars["String"]>;
  key?: InputMaybe<Scalars["String"]>;
  orderType?: InputMaybe<OrderType>;
  pagination?: InputMaybe<Scalars["String"]>;
  pickUpBranch: Scalars["String"];
  pids: Array<Scalars["String"]>;
  publicationDate?: InputMaybe<Scalars["String"]>;
  publicationDateOfComponent?: InputMaybe<Scalars["String"]>;
  title?: InputMaybe<Scalars["String"]>;
  titleOfComponent?: InputMaybe<Scalars["String"]>;
  userParameters: SubmitOrderUserParameters;
  volume?: InputMaybe<Scalars["String"]>;
};

export enum SubmitOrderStatus {
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

export type SubmitOrderUserParameters = {
  barcode?: InputMaybe<Scalars["String"]>;
  cardno?: InputMaybe<Scalars["String"]>;
  cpr?: InputMaybe<Scalars["String"]>;
  customId?: InputMaybe<Scalars["String"]>;
  pincode?: InputMaybe<Scalars["String"]>;
  userAddress?: InputMaybe<Scalars["String"]>;
  userDateOfBirth?: InputMaybe<Scalars["String"]>;
  userId?: InputMaybe<Scalars["String"]>;
  userMail?: InputMaybe<Scalars["String"]>;
  userName?: InputMaybe<Scalars["String"]>;
  userTelephone?: InputMaybe<Scalars["String"]>;
};

export type SuggestResponse = {
  __typename?: "SuggestResponse";
  result: Array<Suggestion>;
};

export type Suggestion = {
  __typename?: "Suggestion";
  /** The suggested term which can be searched for */
  term: Scalars["String"];
  /** The type of suggestion: creator, subject or title */
  type: SuggestionType;
  /** A work related to the term */
  work?: Maybe<Work>;
};

export enum SuggestionType {
  Composit = "COMPOSIT",
  Creator = "CREATOR",
  Subject = "SUBJECT",
  Title = "TITLE"
}

export type TableOfContent = {
  __typename?: "TableOfContent";
  content?: Maybe<Scalars["String"]>;
  heading?: Maybe<Scalars["String"]>;
  listOfContent?: Maybe<Array<TableOfContent>>;
};

export type TimePeriod = Subject & {
  __typename?: "TimePeriod";
  display: Scalars["String"];
  language?: Maybe<Language>;
  local?: Maybe<Scalars["Boolean"]>;
  period: Range;
  type: SubjectType;
};

export type Translation = {
  __typename?: "Translation";
  /** Translation in plural form, e.g. forfattere, komponister, instruktører etc. */
  plural: Scalars["String"];
  /** Translation in singular form, e.g. forfatter, komponist, instruktør */
  singular: Scalars["String"];
};

export type TvSeries = {
  __typename?: "TvSeries";
  /** Dansih translated title of the tv serie */
  danishLaunchTitle?: Maybe<Scalars["String"]>;
  /** Detailed information about the disc */
  disc?: Maybe<TvSeriesDetails>;
  /** Detailed information about the episode */
  episode?: Maybe<TvSeriesDetails>;
  /** Episode titles */
  episodeTitles?: Maybe<Array<Scalars["String"]>>;
  /** Detailed information about the season */
  season?: Maybe<TvSeriesDetails>;
  /** Title of the tv serie */
  title?: Maybe<Scalars["String"]>;
  /** Detailed information about the volume */
  volume?: Maybe<TvSeriesDetails>;
};

export type TvSeriesDetails = {
  __typename?: "TvSeriesDetails";
  display?: Maybe<Scalars["String"]>;
  numbers?: Maybe<Array<Scalars["Int"]>>;
};

export type Unit = {
  __typename?: "Unit";
  id: Scalars["String"];
  manifestations: Array<Manifestation>;
};

export type Universe = {
  __typename?: "Universe";
  /** A alternative title to the main 'title' of the universe */
  alternativeTitles: Array<Scalars["String"]>;
  /** both series and works in a list */
  content: UniverseContentResult;
  /** Description of the universe */
  description?: Maybe<Scalars["String"]>;
  /** A key that identifies a universe. */
  key: Scalars["String"];
  /** All series within the universe */
  series: Array<Series>;
  /** Literary/movie universe this work is part of e.g. Wizarding World, Marvel Cinematic Universe */
  title: Scalars["String"];
  /** work types that are in this universe */
  workTypes: Array<WorkType>;
  /** All works within the universe but not in any series */
  works: Array<Work>;
};

export type UniverseContentArgs = {
  limit?: InputMaybe<Scalars["Int"]>;
  offset?: InputMaybe<Scalars["Int"]>;
  workType?: InputMaybe<WorkType>;
};

export type UniverseSeriesArgs = {
  limit?: InputMaybe<Scalars["Int"]>;
  offset?: InputMaybe<Scalars["Int"]>;
  workType?: InputMaybe<WorkType>;
};

export type UniverseWorksArgs = {
  limit?: InputMaybe<Scalars["Int"]>;
  offset?: InputMaybe<Scalars["Int"]>;
  workType?: InputMaybe<WorkType>;
};

export type UniverseContent = Series | Work;

export type UniverseContentResult = {
  __typename?: "UniverseContentResult";
  entries: Array<UniverseContent>;
  hitcount: Scalars["Int"];
};

export type Work = {
  __typename?: "Work";
  /** Abstract of the entity */
  abstract?: Maybe<Array<Scalars["String"]>>;
  /** Creators */
  creators: Array<Creator>;
  /** DK5 main entry for this work */
  dk5MainEntry?: Maybe<Dk5MainEntry>;
  /** Overall literary category/genre of this work. e.g. fiction or nonfiction. In Danish skønlitteratur/faglitteratur for literature, fiktion/nonfiktion for other types. */
  fictionNonfiction?: Maybe<FictionNonfiction>;
  /** The genre, (literary) form, type etc. of this work */
  genreAndForm: Array<Scalars["String"]>;
  /** The main language(s) of the work's content */
  mainLanguages: Array<Language>;
  /** Details about the manifestations of this work */
  manifestations: Manifestations;
  /** The type of material of the manifestation based on bibliotek.dk types */
  materialTypes: Array<MaterialType>;
  /** Relations to other manifestations */
  relations: Relations;
  /** Series for this work */
  series: Array<Series>;
  /**
   * Members of a series that this work is part of
   * @deprecated Use 'Work.series.members' instead
   */
  seriesMembers: Array<Work>;
  /** Subjects for this work */
  subjects: SubjectContainer;
  titles: WorkTitles;
  /**
   * Literary/movie universe this work is part of, e.g. Wizarding World, Marvel Universe
   * @deprecated Use 'universes' instead
   */
  universe?: Maybe<Universe>;
  /** Literary/movie universes this work is part of, e.g. Wizarding World, Marvel Universe */
  universes: Array<Universe>;
  /** Unique identification of the work based on work-presentation id e.g work-of:870970-basis:54029519 */
  workId: Scalars["String"];
  /** Worktypes for this work - 'none' replaced by 'other' */
  workTypes: Array<WorkType>;
  /** The year this work was originally published or produced */
  workYear?: Maybe<PublicationYear>;
};

export type WorkTitles = {
  __typename?: "WorkTitles";
  /** The full title(s) of the work including subtitles etc */
  full: Array<Scalars["String"]>;
  /** The main title(s) of the work */
  main: Array<Scalars["String"]>;
  /** The title of the work that this expression/manifestation is translated from or based on. The original title(s) of a film which has a different distribution title. */
  original?: Maybe<Array<Scalars["String"]>>;
  /** Titles (in other languages) parallel to the main 'title' of the work */
  parallel: Array<Scalars["String"]>;
  /** The sorted title of the entity */
  sort: Scalars["String"];
  /** The standard title of the entity, used for music and movies */
  standard?: Maybe<Scalars["String"]>;
  /** The title of the entity with the language of the entity in parenthesis after. This field is only generated for non-danish titles. */
  titlePlusLanguage?: Maybe<Scalars["String"]>;
  /** Danish translation of the main title */
  translated?: Maybe<Array<Scalars["String"]>>;
  /** detailed title for tv series  */
  tvSeries?: Maybe<TvSeries>;
};

export enum WorkType {
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

/** The facets to ask for */
export type ComplexSearchFacetsNew = {
  facetLimit: Scalars["Int"];
  facets: Array<ComplexSearchFacets>;
};

export type LocalSuggestResponse = {
  __typename?: "localSuggestResponse";
  result: Array<Suggestion>;
};

export type GetSmallWorkQueryVariables = Exact<{
  id: Scalars["String"];
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
      numberInSeries?: {
        __typename?: "NumberInSeries";
        display: string;
        number?: Array<number> | null;
      } | null;
    }>;
    seriesMembers: Array<{
      __typename?: "Work";
      workId: string;
      titles: {
        __typename?: "WorkTitles";
        main: Array<string>;
        full: Array<string>;
        original?: Array<string> | null;
      };
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
          code: FictionNonfictionCode;
        } | null;
        materialTypes: Array<{
          __typename?: "MaterialType";
          materialTypeSpecific: {
            __typename?: "SpecificMaterialType";
            display: string;
          };
        }>;
        creators: Array<
          | { __typename: "Corporation"; display: string }
          | { __typename: "Person"; display: string }
        >;
        identifiers: Array<{ __typename?: "Identifier"; value: string }>;
        contributors: Array<
          | { __typename?: "Corporation"; display: string }
          | { __typename?: "Person"; display: string }
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
        } | null;
        physicalDescriptions: Array<{
          __typename?: "PhysicalDescription";
          numberOfPages?: number | null;
          playingTime?: string | null;
        }>;
        accessTypes: Array<{ __typename?: "AccessType"; code: AccessTypeCode }>;
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
        languages?: {
          __typename?: "Languages";
          main?: Array<{
            __typename?: "Language";
            display: string;
            isoCode: string;
          }> | null;
        } | null;
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
          code: FictionNonfictionCode;
        } | null;
        materialTypes: Array<{
          __typename?: "MaterialType";
          materialTypeSpecific: {
            __typename?: "SpecificMaterialType";
            display: string;
          };
        }>;
        creators: Array<
          | { __typename: "Corporation"; display: string }
          | { __typename: "Person"; display: string }
        >;
        identifiers: Array<{ __typename?: "Identifier"; value: string }>;
        contributors: Array<
          | { __typename?: "Corporation"; display: string }
          | { __typename?: "Person"; display: string }
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
        } | null;
        physicalDescriptions: Array<{
          __typename?: "PhysicalDescription";
          numberOfPages?: number | null;
          playingTime?: string | null;
        }>;
        accessTypes: Array<{ __typename?: "AccessType"; code: AccessTypeCode }>;
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
        languages?: {
          __typename?: "Languages";
          main?: Array<{
            __typename?: "Language";
            display: string;
            isoCode: string;
          }> | null;
        } | null;
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
          code: FictionNonfictionCode;
        } | null;
        materialTypes: Array<{
          __typename?: "MaterialType";
          materialTypeSpecific: {
            __typename?: "SpecificMaterialType";
            display: string;
          };
        }>;
        creators: Array<
          | { __typename: "Corporation"; display: string }
          | { __typename: "Person"; display: string }
        >;
        identifiers: Array<{ __typename?: "Identifier"; value: string }>;
        contributors: Array<
          | { __typename?: "Corporation"; display: string }
          | { __typename?: "Person"; display: string }
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
        } | null;
        physicalDescriptions: Array<{
          __typename?: "PhysicalDescription";
          numberOfPages?: number | null;
          playingTime?: string | null;
        }>;
        accessTypes: Array<{ __typename?: "AccessType"; code: AccessTypeCode }>;
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
    numberInSeries?: {
      __typename?: "NumberInSeries";
      number?: Array<number> | null;
    } | null;
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
  faust: Scalars["String"];
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
      numberInSeries?: {
        __typename?: "NumberInSeries";
        number?: Array<number> | null;
      } | null;
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
  faust: Scalars["String"];
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
            numberInSeries?: {
              __typename?: "NumberInSeries";
              number?: Array<number> | null;
            } | null;
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
  wid: Scalars["String"];
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
        | { __typename?: "TimePeriod"; display: string }
      >;
      dbcVerified: Array<
        | { __typename?: "Corporation"; display: string }
        | { __typename?: "Mood"; display: string }
        | { __typename?: "NarrativeTechnique"; display: string }
        | { __typename?: "Person"; display: string }
        | { __typename?: "Setting"; display: string }
        | { __typename?: "SubjectText"; display: string }
        | { __typename?: "TimePeriod"; display: string }
      >;
    };
    fictionNonfiction?: {
      __typename?: "FictionNonfiction";
      display: string;
      code: FictionNonfictionCode;
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
          workTypes: Array<WorkType>;
          titles: { __typename?: "WorkTitles"; main: Array<string> };
        };
      }>;
    };
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
      numberInSeries?: {
        __typename?: "NumberInSeries";
        display: string;
        number?: Array<number> | null;
      } | null;
    }>;
    seriesMembers: Array<{
      __typename?: "Work";
      workId: string;
      titles: {
        __typename?: "WorkTitles";
        main: Array<string>;
        full: Array<string>;
        original?: Array<string> | null;
      };
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
          code: FictionNonfictionCode;
        } | null;
        materialTypes: Array<{
          __typename?: "MaterialType";
          materialTypeSpecific: {
            __typename?: "SpecificMaterialType";
            display: string;
          };
        }>;
        creators: Array<
          | { __typename: "Corporation"; display: string }
          | { __typename: "Person"; display: string }
        >;
        identifiers: Array<{ __typename?: "Identifier"; value: string }>;
        contributors: Array<
          | { __typename?: "Corporation"; display: string }
          | { __typename?: "Person"; display: string }
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
        } | null;
        physicalDescriptions: Array<{
          __typename?: "PhysicalDescription";
          numberOfPages?: number | null;
          playingTime?: string | null;
        }>;
        accessTypes: Array<{ __typename?: "AccessType"; code: AccessTypeCode }>;
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
        languages?: {
          __typename?: "Languages";
          main?: Array<{
            __typename?: "Language";
            display: string;
            isoCode: string;
          }> | null;
        } | null;
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
          code: FictionNonfictionCode;
        } | null;
        materialTypes: Array<{
          __typename?: "MaterialType";
          materialTypeSpecific: {
            __typename?: "SpecificMaterialType";
            display: string;
          };
        }>;
        creators: Array<
          | { __typename: "Corporation"; display: string }
          | { __typename: "Person"; display: string }
        >;
        identifiers: Array<{ __typename?: "Identifier"; value: string }>;
        contributors: Array<
          | { __typename?: "Corporation"; display: string }
          | { __typename?: "Person"; display: string }
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
        } | null;
        physicalDescriptions: Array<{
          __typename?: "PhysicalDescription";
          numberOfPages?: number | null;
          playingTime?: string | null;
        }>;
        accessTypes: Array<{ __typename?: "AccessType"; code: AccessTypeCode }>;
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
        languages?: {
          __typename?: "Languages";
          main?: Array<{
            __typename?: "Language";
            display: string;
            isoCode: string;
          }> | null;
        } | null;
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
          code: FictionNonfictionCode;
        } | null;
        materialTypes: Array<{
          __typename?: "MaterialType";
          materialTypeSpecific: {
            __typename?: "SpecificMaterialType";
            display: string;
          };
        }>;
        creators: Array<
          | { __typename: "Corporation"; display: string }
          | { __typename: "Person"; display: string }
        >;
        identifiers: Array<{ __typename?: "Identifier"; value: string }>;
        contributors: Array<
          | { __typename?: "Corporation"; display: string }
          | { __typename?: "Person"; display: string }
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
        } | null;
        physicalDescriptions: Array<{
          __typename?: "PhysicalDescription";
          numberOfPages?: number | null;
          playingTime?: string | null;
        }>;
        accessTypes: Array<{ __typename?: "AccessType"; code: AccessTypeCode }>;
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
};

export type GetMaterialGloballyQueryVariables = Exact<{
  wid: Scalars["String"];
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
        | { __typename?: "TimePeriod"; display: string }
      >;
      dbcVerified: Array<
        | { __typename?: "Corporation"; display: string }
        | { __typename?: "Mood"; display: string }
        | { __typename?: "NarrativeTechnique"; display: string }
        | { __typename?: "Person"; display: string }
        | { __typename?: "Setting"; display: string }
        | { __typename?: "SubjectText"; display: string }
        | { __typename?: "TimePeriod"; display: string }
      >;
    };
    fictionNonfiction?: {
      __typename?: "FictionNonfiction";
      display: string;
      code: FictionNonfictionCode;
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
          workTypes: Array<WorkType>;
          titles: { __typename?: "WorkTitles"; main: Array<string> };
        };
      }>;
    };
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
      numberInSeries?: {
        __typename?: "NumberInSeries";
        display: string;
        number?: Array<number> | null;
      } | null;
    }>;
    seriesMembers: Array<{
      __typename?: "Work";
      workId: string;
      titles: {
        __typename?: "WorkTitles";
        main: Array<string>;
        full: Array<string>;
        original?: Array<string> | null;
      };
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
          code: FictionNonfictionCode;
        } | null;
        materialTypes: Array<{
          __typename?: "MaterialType";
          materialTypeSpecific: {
            __typename?: "SpecificMaterialType";
            display: string;
          };
        }>;
        creators: Array<
          | { __typename: "Corporation"; display: string }
          | { __typename: "Person"; display: string }
        >;
        identifiers: Array<{ __typename?: "Identifier"; value: string }>;
        contributors: Array<
          | { __typename?: "Corporation"; display: string }
          | { __typename?: "Person"; display: string }
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
        } | null;
        physicalDescriptions: Array<{
          __typename?: "PhysicalDescription";
          numberOfPages?: number | null;
          playingTime?: string | null;
        }>;
        accessTypes: Array<{ __typename?: "AccessType"; code: AccessTypeCode }>;
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
        languages?: {
          __typename?: "Languages";
          main?: Array<{
            __typename?: "Language";
            display: string;
            isoCode: string;
          }> | null;
        } | null;
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
          code: FictionNonfictionCode;
        } | null;
        materialTypes: Array<{
          __typename?: "MaterialType";
          materialTypeSpecific: {
            __typename?: "SpecificMaterialType";
            display: string;
          };
        }>;
        creators: Array<
          | { __typename: "Corporation"; display: string }
          | { __typename: "Person"; display: string }
        >;
        identifiers: Array<{ __typename?: "Identifier"; value: string }>;
        contributors: Array<
          | { __typename?: "Corporation"; display: string }
          | { __typename?: "Person"; display: string }
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
        } | null;
        physicalDescriptions: Array<{
          __typename?: "PhysicalDescription";
          numberOfPages?: number | null;
          playingTime?: string | null;
        }>;
        accessTypes: Array<{ __typename?: "AccessType"; code: AccessTypeCode }>;
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
        languages?: {
          __typename?: "Languages";
          main?: Array<{
            __typename?: "Language";
            display: string;
            isoCode: string;
          }> | null;
        } | null;
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
          code: FictionNonfictionCode;
        } | null;
        materialTypes: Array<{
          __typename?: "MaterialType";
          materialTypeSpecific: {
            __typename?: "SpecificMaterialType";
            display: string;
          };
        }>;
        creators: Array<
          | { __typename: "Corporation"; display: string }
          | { __typename: "Person"; display: string }
        >;
        identifiers: Array<{ __typename?: "Identifier"; value: string }>;
        contributors: Array<
          | { __typename?: "Corporation"; display: string }
          | { __typename?: "Person"; display: string }
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
        } | null;
        physicalDescriptions: Array<{
          __typename?: "PhysicalDescription";
          numberOfPages?: number | null;
          playingTime?: string | null;
        }>;
        accessTypes: Array<{ __typename?: "AccessType"; code: AccessTypeCode }>;
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
};

export type GetInfomediaQueryVariables = Exact<{
  id: Scalars["String"];
}>;

export type GetInfomediaQuery = {
  __typename?: "Query";
  infomedia: {
    __typename?: "InfomediaResponse";
    error?: InfomediaError | null;
    article?: {
      __typename?: "InfomediaArticle";
      headLine?: string | null;
      text?: string | null;
    } | null;
  };
};

export type GetReviewManifestationsQueryVariables = Exact<{
  pid: Array<Scalars["String"]> | Scalars["String"];
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
    physicalDescriptions: Array<{
      __typename?: "PhysicalDescription";
      summary: string;
    }>;
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
        type?: ReviewElementType | null;
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
    status: SubmitOrderStatus;
    message?: string | null;
    orderId?: string | null;
  } | null;
};

export type RecommendFromFaustQueryVariables = Exact<{
  faust: Scalars["String"];
  limit: Scalars["Int"];
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
          numberInSeries?: {
            __typename?: "NumberInSeries";
            display: string;
            number?: Array<number> | null;
          } | null;
        }>;
        seriesMembers: Array<{
          __typename?: "Work";
          workId: string;
          titles: {
            __typename?: "WorkTitles";
            main: Array<string>;
            full: Array<string>;
            original?: Array<string> | null;
          };
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
              code: FictionNonfictionCode;
            } | null;
            materialTypes: Array<{
              __typename?: "MaterialType";
              materialTypeSpecific: {
                __typename?: "SpecificMaterialType";
                display: string;
              };
            }>;
            creators: Array<
              | { __typename: "Corporation"; display: string }
              | { __typename: "Person"; display: string }
            >;
            identifiers: Array<{ __typename?: "Identifier"; value: string }>;
            contributors: Array<
              | { __typename?: "Corporation"; display: string }
              | { __typename?: "Person"; display: string }
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
            } | null;
            physicalDescriptions: Array<{
              __typename?: "PhysicalDescription";
              numberOfPages?: number | null;
              playingTime?: string | null;
            }>;
            accessTypes: Array<{
              __typename?: "AccessType";
              code: AccessTypeCode;
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
            languages?: {
              __typename?: "Languages";
              main?: Array<{
                __typename?: "Language";
                display: string;
                isoCode: string;
              }> | null;
            } | null;
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
              code: FictionNonfictionCode;
            } | null;
            materialTypes: Array<{
              __typename?: "MaterialType";
              materialTypeSpecific: {
                __typename?: "SpecificMaterialType";
                display: string;
              };
            }>;
            creators: Array<
              | { __typename: "Corporation"; display: string }
              | { __typename: "Person"; display: string }
            >;
            identifiers: Array<{ __typename?: "Identifier"; value: string }>;
            contributors: Array<
              | { __typename?: "Corporation"; display: string }
              | { __typename?: "Person"; display: string }
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
            } | null;
            physicalDescriptions: Array<{
              __typename?: "PhysicalDescription";
              numberOfPages?: number | null;
              playingTime?: string | null;
            }>;
            accessTypes: Array<{
              __typename?: "AccessType";
              code: AccessTypeCode;
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
            languages?: {
              __typename?: "Languages";
              main?: Array<{
                __typename?: "Language";
                display: string;
                isoCode: string;
              }> | null;
            } | null;
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
              code: FictionNonfictionCode;
            } | null;
            materialTypes: Array<{
              __typename?: "MaterialType";
              materialTypeSpecific: {
                __typename?: "SpecificMaterialType";
                display: string;
              };
            }>;
            creators: Array<
              | { __typename: "Corporation"; display: string }
              | { __typename: "Person"; display: string }
            >;
            identifiers: Array<{ __typename?: "Identifier"; value: string }>;
            contributors: Array<
              | { __typename?: "Corporation"; display: string }
              | { __typename?: "Person"; display: string }
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
            } | null;
            physicalDescriptions: Array<{
              __typename?: "PhysicalDescription";
              numberOfPages?: number | null;
              playingTime?: string | null;
            }>;
            accessTypes: Array<{
              __typename?: "AccessType";
              code: AccessTypeCode;
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
    }>;
  };
};

export type SearchWithPaginationQueryVariables = Exact<{
  q: SearchQuery;
  offset: Scalars["Int"];
  limit: Scalars["PaginationLimit"];
  filters?: InputMaybe<SearchFilters>;
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
        numberInSeries?: {
          __typename?: "NumberInSeries";
          display: string;
          number?: Array<number> | null;
        } | null;
      }>;
      seriesMembers: Array<{
        __typename?: "Work";
        workId: string;
        titles: {
          __typename?: "WorkTitles";
          main: Array<string>;
          full: Array<string>;
          original?: Array<string> | null;
        };
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
            code: FictionNonfictionCode;
          } | null;
          materialTypes: Array<{
            __typename?: "MaterialType";
            materialTypeSpecific: {
              __typename?: "SpecificMaterialType";
              display: string;
            };
          }>;
          creators: Array<
            | { __typename: "Corporation"; display: string }
            | { __typename: "Person"; display: string }
          >;
          identifiers: Array<{ __typename?: "Identifier"; value: string }>;
          contributors: Array<
            | { __typename?: "Corporation"; display: string }
            | { __typename?: "Person"; display: string }
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
          } | null;
          physicalDescriptions: Array<{
            __typename?: "PhysicalDescription";
            numberOfPages?: number | null;
            playingTime?: string | null;
          }>;
          accessTypes: Array<{
            __typename?: "AccessType";
            code: AccessTypeCode;
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
          languages?: {
            __typename?: "Languages";
            main?: Array<{
              __typename?: "Language";
              display: string;
              isoCode: string;
            }> | null;
          } | null;
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
            code: FictionNonfictionCode;
          } | null;
          materialTypes: Array<{
            __typename?: "MaterialType";
            materialTypeSpecific: {
              __typename?: "SpecificMaterialType";
              display: string;
            };
          }>;
          creators: Array<
            | { __typename: "Corporation"; display: string }
            | { __typename: "Person"; display: string }
          >;
          identifiers: Array<{ __typename?: "Identifier"; value: string }>;
          contributors: Array<
            | { __typename?: "Corporation"; display: string }
            | { __typename?: "Person"; display: string }
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
          } | null;
          physicalDescriptions: Array<{
            __typename?: "PhysicalDescription";
            numberOfPages?: number | null;
            playingTime?: string | null;
          }>;
          accessTypes: Array<{
            __typename?: "AccessType";
            code: AccessTypeCode;
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
          languages?: {
            __typename?: "Languages";
            main?: Array<{
              __typename?: "Language";
              display: string;
              isoCode: string;
            }> | null;
          } | null;
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
            code: FictionNonfictionCode;
          } | null;
          materialTypes: Array<{
            __typename?: "MaterialType";
            materialTypeSpecific: {
              __typename?: "SpecificMaterialType";
              display: string;
            };
          }>;
          creators: Array<
            | { __typename: "Corporation"; display: string }
            | { __typename: "Person"; display: string }
          >;
          identifiers: Array<{ __typename?: "Identifier"; value: string }>;
          contributors: Array<
            | { __typename?: "Corporation"; display: string }
            | { __typename?: "Person"; display: string }
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
          } | null;
          physicalDescriptions: Array<{
            __typename?: "PhysicalDescription";
            numberOfPages?: number | null;
            playingTime?: string | null;
          }>;
          accessTypes: Array<{
            __typename?: "AccessType";
            code: AccessTypeCode;
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
    }>;
  };
};

export type ComplexSearchWithPaginationWorkAccessQueryVariables = Exact<{
  cql: Scalars["String"];
  offset: Scalars["Int"];
  limit: Scalars["PaginationLimit"];
  filters: ComplexSearchFilters;
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
            type: IdentifierType;
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
  cql: Scalars["String"];
  offset: Scalars["Int"];
  limit: Scalars["PaginationLimit"];
  filters: ComplexSearchFilters;
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
        numberInSeries?: {
          __typename?: "NumberInSeries";
          display: string;
          number?: Array<number> | null;
        } | null;
      }>;
      seriesMembers: Array<{
        __typename?: "Work";
        workId: string;
        titles: {
          __typename?: "WorkTitles";
          main: Array<string>;
          full: Array<string>;
          original?: Array<string> | null;
        };
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
            code: FictionNonfictionCode;
          } | null;
          materialTypes: Array<{
            __typename?: "MaterialType";
            materialTypeSpecific: {
              __typename?: "SpecificMaterialType";
              display: string;
            };
          }>;
          creators: Array<
            | { __typename: "Corporation"; display: string }
            | { __typename: "Person"; display: string }
          >;
          identifiers: Array<{ __typename?: "Identifier"; value: string }>;
          contributors: Array<
            | { __typename?: "Corporation"; display: string }
            | { __typename?: "Person"; display: string }
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
          } | null;
          physicalDescriptions: Array<{
            __typename?: "PhysicalDescription";
            numberOfPages?: number | null;
            playingTime?: string | null;
          }>;
          accessTypes: Array<{
            __typename?: "AccessType";
            code: AccessTypeCode;
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
          languages?: {
            __typename?: "Languages";
            main?: Array<{
              __typename?: "Language";
              display: string;
              isoCode: string;
            }> | null;
          } | null;
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
            code: FictionNonfictionCode;
          } | null;
          materialTypes: Array<{
            __typename?: "MaterialType";
            materialTypeSpecific: {
              __typename?: "SpecificMaterialType";
              display: string;
            };
          }>;
          creators: Array<
            | { __typename: "Corporation"; display: string }
            | { __typename: "Person"; display: string }
          >;
          identifiers: Array<{ __typename?: "Identifier"; value: string }>;
          contributors: Array<
            | { __typename?: "Corporation"; display: string }
            | { __typename?: "Person"; display: string }
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
          } | null;
          physicalDescriptions: Array<{
            __typename?: "PhysicalDescription";
            numberOfPages?: number | null;
            playingTime?: string | null;
          }>;
          accessTypes: Array<{
            __typename?: "AccessType";
            code: AccessTypeCode;
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
          languages?: {
            __typename?: "Languages";
            main?: Array<{
              __typename?: "Language";
              display: string;
              isoCode: string;
            }> | null;
          } | null;
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
            code: FictionNonfictionCode;
          } | null;
          materialTypes: Array<{
            __typename?: "MaterialType";
            materialTypeSpecific: {
              __typename?: "SpecificMaterialType";
              display: string;
            };
          }>;
          creators: Array<
            | { __typename: "Corporation"; display: string }
            | { __typename: "Person"; display: string }
          >;
          identifiers: Array<{ __typename?: "Identifier"; value: string }>;
          contributors: Array<
            | { __typename?: "Corporation"; display: string }
            | { __typename?: "Person"; display: string }
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
          } | null;
          physicalDescriptions: Array<{
            __typename?: "PhysicalDescription";
            numberOfPages?: number | null;
            playingTime?: string | null;
          }>;
          accessTypes: Array<{
            __typename?: "AccessType";
            code: AccessTypeCode;
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
    }>;
  };
};

export type SuggestionsFromQueryStringQueryVariables = Exact<{
  q: Scalars["String"];
}>;

export type SuggestionsFromQueryStringQuery = {
  __typename?: "Query";
  suggest: {
    __typename?: "SuggestResponse";
    result: Array<{
      __typename?: "Suggestion";
      type: SuggestionType;
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
  q: SearchQuery;
  facets: Array<FacetField> | FacetField;
  facetLimit: Scalars["Int"];
  filters?: InputMaybe<SearchFilters>;
}>;

export type SearchFacetQuery = {
  __typename?: "Query";
  search: {
    __typename?: "SearchResponse";
    facets: Array<{
      __typename?: "FacetResult";
      name: string;
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
  q: SearchQuery;
  facetsLimit: Scalars["Int"];
  valuesLimit: Scalars["Int"];
  filters: SearchFilters;
}>;

export type IntelligentFacetsQuery = {
  __typename?: "Query";
  search: {
    __typename?: "SearchResponse";
    intelligentFacets: Array<{
      __typename?: "FacetResult";
      name: string;
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
      status: CopyRequestStatus;
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
      code: FictionNonfictionCode;
    } | null;
    materialTypes: Array<{
      __typename?: "MaterialType";
      materialTypeSpecific: {
        __typename?: "SpecificMaterialType";
        display: string;
      };
    }>;
    creators: Array<
      | { __typename: "Corporation"; display: string }
      | { __typename: "Person"; display: string }
    >;
    identifiers: Array<{ __typename?: "Identifier"; value: string }>;
    contributors: Array<
      | { __typename?: "Corporation"; display: string }
      | { __typename?: "Person"; display: string }
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
    } | null;
    physicalDescriptions: Array<{
      __typename?: "PhysicalDescription";
      numberOfPages?: number | null;
      playingTime?: string | null;
    }>;
    accessTypes: Array<{ __typename?: "AccessType"; code: AccessTypeCode }>;
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
    languages?: {
      __typename?: "Languages";
      main?: Array<{
        __typename?: "Language";
        display: string;
        isoCode: string;
      }> | null;
    } | null;
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
      code: FictionNonfictionCode;
    } | null;
    materialTypes: Array<{
      __typename?: "MaterialType";
      materialTypeSpecific: {
        __typename?: "SpecificMaterialType";
        display: string;
      };
    }>;
    creators: Array<
      | { __typename: "Corporation"; display: string }
      | { __typename: "Person"; display: string }
    >;
    identifiers: Array<{ __typename?: "Identifier"; value: string }>;
    contributors: Array<
      | { __typename?: "Corporation"; display: string }
      | { __typename?: "Person"; display: string }
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
    } | null;
    physicalDescriptions: Array<{
      __typename?: "PhysicalDescription";
      numberOfPages?: number | null;
      playingTime?: string | null;
    }>;
    accessTypes: Array<{ __typename?: "AccessType"; code: AccessTypeCode }>;
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
    languages?: {
      __typename?: "Languages";
      main?: Array<{
        __typename?: "Language";
        display: string;
        isoCode: string;
      }> | null;
    } | null;
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
      code: FictionNonfictionCode;
    } | null;
    materialTypes: Array<{
      __typename?: "MaterialType";
      materialTypeSpecific: {
        __typename?: "SpecificMaterialType";
        display: string;
      };
    }>;
    creators: Array<
      | { __typename: "Corporation"; display: string }
      | { __typename: "Person"; display: string }
    >;
    identifiers: Array<{ __typename?: "Identifier"; value: string }>;
    contributors: Array<
      | { __typename?: "Corporation"; display: string }
      | { __typename?: "Person"; display: string }
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
    } | null;
    physicalDescriptions: Array<{
      __typename?: "PhysicalDescription";
      numberOfPages?: number | null;
      playingTime?: string | null;
    }>;
    accessTypes: Array<{ __typename?: "AccessType"; code: AccessTypeCode }>;
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

export type ManifestationsAccessFragment = {
  __typename?: "Manifestations";
  all: Array<{
    __typename?: "Manifestation";
    pid: string;
    identifiers: Array<{
      __typename?: "Identifier";
      type: IdentifierType;
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
    code: FictionNonfictionCode;
  } | null;
  materialTypes: Array<{
    __typename?: "MaterialType";
    materialTypeSpecific: {
      __typename?: "SpecificMaterialType";
      display: string;
    };
  }>;
  creators: Array<
    | { __typename: "Corporation"; display: string }
    | { __typename: "Person"; display: string }
  >;
  identifiers: Array<{ __typename?: "Identifier"; value: string }>;
  contributors: Array<
    | { __typename?: "Corporation"; display: string }
    | { __typename?: "Person"; display: string }
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
  audience?: { __typename?: "Audience"; generalAudience: Array<string> } | null;
  physicalDescriptions: Array<{
    __typename?: "PhysicalDescription";
    numberOfPages?: number | null;
    playingTime?: string | null;
  }>;
  accessTypes: Array<{ __typename?: "AccessType"; code: AccessTypeCode }>;
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
  languages?: {
    __typename?: "Languages";
    main?: Array<{
      __typename?: "Language";
      display: string;
      isoCode: string;
    }> | null;
  } | null;
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
  physicalDescriptions: Array<{
    __typename?: "PhysicalDescription";
    summary: string;
  }>;
  dateFirstEdition?: { __typename?: "PublicationYear"; display: string } | null;
  workYear?: { __typename?: "PublicationYear"; display: string } | null;
  review?: {
    __typename?: "ManifestationReview";
    rating?: string | null;
    reviewByLibrarians?: Array<{
      __typename?: "ReviewElement";
      content?: string | null;
      heading?: string | null;
      type?: ReviewElementType | null;
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
  numberInSeries?: {
    __typename?: "NumberInSeries";
    display: string;
    number?: Array<number> | null;
  } | null;
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
        type: IdentifierType;
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
    numberInSeries?: {
      __typename?: "NumberInSeries";
      display: string;
      number?: Array<number> | null;
    } | null;
  }>;
  seriesMembers: Array<{
    __typename?: "Work";
    workId: string;
    titles: {
      __typename?: "WorkTitles";
      main: Array<string>;
      full: Array<string>;
      original?: Array<string> | null;
    };
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
        code: FictionNonfictionCode;
      } | null;
      materialTypes: Array<{
        __typename?: "MaterialType";
        materialTypeSpecific: {
          __typename?: "SpecificMaterialType";
          display: string;
        };
      }>;
      creators: Array<
        | { __typename: "Corporation"; display: string }
        | { __typename: "Person"; display: string }
      >;
      identifiers: Array<{ __typename?: "Identifier"; value: string }>;
      contributors: Array<
        | { __typename?: "Corporation"; display: string }
        | { __typename?: "Person"; display: string }
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
      } | null;
      physicalDescriptions: Array<{
        __typename?: "PhysicalDescription";
        numberOfPages?: number | null;
        playingTime?: string | null;
      }>;
      accessTypes: Array<{ __typename?: "AccessType"; code: AccessTypeCode }>;
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
      languages?: {
        __typename?: "Languages";
        main?: Array<{
          __typename?: "Language";
          display: string;
          isoCode: string;
        }> | null;
      } | null;
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
        code: FictionNonfictionCode;
      } | null;
      materialTypes: Array<{
        __typename?: "MaterialType";
        materialTypeSpecific: {
          __typename?: "SpecificMaterialType";
          display: string;
        };
      }>;
      creators: Array<
        | { __typename: "Corporation"; display: string }
        | { __typename: "Person"; display: string }
      >;
      identifiers: Array<{ __typename?: "Identifier"; value: string }>;
      contributors: Array<
        | { __typename?: "Corporation"; display: string }
        | { __typename?: "Person"; display: string }
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
      } | null;
      physicalDescriptions: Array<{
        __typename?: "PhysicalDescription";
        numberOfPages?: number | null;
        playingTime?: string | null;
      }>;
      accessTypes: Array<{ __typename?: "AccessType"; code: AccessTypeCode }>;
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
      languages?: {
        __typename?: "Languages";
        main?: Array<{
          __typename?: "Language";
          display: string;
          isoCode: string;
        }> | null;
      } | null;
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
        code: FictionNonfictionCode;
      } | null;
      materialTypes: Array<{
        __typename?: "MaterialType";
        materialTypeSpecific: {
          __typename?: "SpecificMaterialType";
          display: string;
        };
      }>;
      creators: Array<
        | { __typename: "Corporation"; display: string }
        | { __typename: "Person"; display: string }
      >;
      identifiers: Array<{ __typename?: "Identifier"; value: string }>;
      contributors: Array<
        | { __typename?: "Corporation"; display: string }
        | { __typename?: "Person"; display: string }
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
      } | null;
      physicalDescriptions: Array<{
        __typename?: "PhysicalDescription";
        numberOfPages?: number | null;
        playingTime?: string | null;
      }>;
      accessTypes: Array<{ __typename?: "AccessType"; code: AccessTypeCode }>;
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
      | { __typename?: "TimePeriod"; display: string }
    >;
    dbcVerified: Array<
      | { __typename?: "Corporation"; display: string }
      | { __typename?: "Mood"; display: string }
      | { __typename?: "NarrativeTechnique"; display: string }
      | { __typename?: "Person"; display: string }
      | { __typename?: "Setting"; display: string }
      | { __typename?: "SubjectText"; display: string }
      | { __typename?: "TimePeriod"; display: string }
    >;
  };
  fictionNonfiction?: {
    __typename?: "FictionNonfiction";
    display: string;
    code: FictionNonfictionCode;
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
        workTypes: Array<WorkType>;
        titles: { __typename?: "WorkTitles"; main: Array<string> };
      };
    }>;
  };
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
    numberInSeries?: {
      __typename?: "NumberInSeries";
      display: string;
      number?: Array<number> | null;
    } | null;
  }>;
  seriesMembers: Array<{
    __typename?: "Work";
    workId: string;
    titles: {
      __typename?: "WorkTitles";
      main: Array<string>;
      full: Array<string>;
      original?: Array<string> | null;
    };
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
        code: FictionNonfictionCode;
      } | null;
      materialTypes: Array<{
        __typename?: "MaterialType";
        materialTypeSpecific: {
          __typename?: "SpecificMaterialType";
          display: string;
        };
      }>;
      creators: Array<
        | { __typename: "Corporation"; display: string }
        | { __typename: "Person"; display: string }
      >;
      identifiers: Array<{ __typename?: "Identifier"; value: string }>;
      contributors: Array<
        | { __typename?: "Corporation"; display: string }
        | { __typename?: "Person"; display: string }
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
      } | null;
      physicalDescriptions: Array<{
        __typename?: "PhysicalDescription";
        numberOfPages?: number | null;
        playingTime?: string | null;
      }>;
      accessTypes: Array<{ __typename?: "AccessType"; code: AccessTypeCode }>;
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
      languages?: {
        __typename?: "Languages";
        main?: Array<{
          __typename?: "Language";
          display: string;
          isoCode: string;
        }> | null;
      } | null;
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
        code: FictionNonfictionCode;
      } | null;
      materialTypes: Array<{
        __typename?: "MaterialType";
        materialTypeSpecific: {
          __typename?: "SpecificMaterialType";
          display: string;
        };
      }>;
      creators: Array<
        | { __typename: "Corporation"; display: string }
        | { __typename: "Person"; display: string }
      >;
      identifiers: Array<{ __typename?: "Identifier"; value: string }>;
      contributors: Array<
        | { __typename?: "Corporation"; display: string }
        | { __typename?: "Person"; display: string }
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
      } | null;
      physicalDescriptions: Array<{
        __typename?: "PhysicalDescription";
        numberOfPages?: number | null;
        playingTime?: string | null;
      }>;
      accessTypes: Array<{ __typename?: "AccessType"; code: AccessTypeCode }>;
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
      languages?: {
        __typename?: "Languages";
        main?: Array<{
          __typename?: "Language";
          display: string;
          isoCode: string;
        }> | null;
      } | null;
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
        code: FictionNonfictionCode;
      } | null;
      materialTypes: Array<{
        __typename?: "MaterialType";
        materialTypeSpecific: {
          __typename?: "SpecificMaterialType";
          display: string;
        };
      }>;
      creators: Array<
        | { __typename: "Corporation"; display: string }
        | { __typename: "Person"; display: string }
      >;
      identifiers: Array<{ __typename?: "Identifier"; value: string }>;
      contributors: Array<
        | { __typename?: "Corporation"; display: string }
        | { __typename?: "Person"; display: string }
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
      } | null;
      physicalDescriptions: Array<{
        __typename?: "PhysicalDescription";
        numberOfPages?: number | null;
        playingTime?: string | null;
      }>;
      accessTypes: Array<{ __typename?: "AccessType"; code: AccessTypeCode }>;
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
    numberInSeries {
      number
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
  physicalDescriptions {
    summary
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
  numberInSeries {
    display
    number
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
    __typename
  }
  publisher
  identifiers {
    value
  }
  contributors {
    display
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
  }
  physicalDescriptions {
    numberOfPages
    playingTime
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
  seriesMembers {
    workId
    titles {
      main
      full
      original
    }
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
) =>
  useQuery<GetSmallWorkQuery, TError, TData>(
    ["getSmallWork", variables],
    fetcher<GetSmallWorkQuery, GetSmallWorkQueryVariables>(
      GetSmallWorkDocument,
      variables
    ),
    options
  );
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
) =>
  useQuery<GetManifestationViaMaterialByFaustQuery, TError, TData>(
    ["getManifestationViaMaterialByFaust", variables],
    fetcher<
      GetManifestationViaMaterialByFaustQuery,
      GetManifestationViaMaterialByFaustQueryVariables
    >(GetManifestationViaMaterialByFaustDocument, variables),
    options
  );
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
) =>
  useQuery<GetManifestationViaBestRepresentationByFaustQuery, TError, TData>(
    ["getManifestationViaBestRepresentationByFaust", variables],
    fetcher<
      GetManifestationViaBestRepresentationByFaustQuery,
      GetManifestationViaBestRepresentationByFaustQueryVariables
    >(GetManifestationViaBestRepresentationByFaustDocument, variables),
    options
  );
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
) =>
  useQuery<GetMaterialQuery, TError, TData>(
    ["getMaterial", variables],
    fetcher<GetMaterialQuery, GetMaterialQueryVariables>(
      GetMaterialDocument,
      variables
    ),
    options
  );
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
) =>
  useQuery<GetMaterialGloballyQuery, TError, TData>(
    ["getMaterialGlobally", variables],
    fetcher<GetMaterialGloballyQuery, GetMaterialGloballyQueryVariables>(
      GetMaterialGloballyDocument,
      variables
    ),
    options
  );
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
) =>
  useQuery<GetInfomediaQuery, TError, TData>(
    ["getInfomedia", variables],
    fetcher<GetInfomediaQuery, GetInfomediaQueryVariables>(
      GetInfomediaDocument,
      variables
    ),
    options
  );
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
) =>
  useQuery<GetReviewManifestationsQuery, TError, TData>(
    ["getReviewManifestations", variables],
    fetcher<
      GetReviewManifestationsQuery,
      GetReviewManifestationsQueryVariables
    >(GetReviewManifestationsDocument, variables),
    options
  );
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
) =>
  useMutation<OpenOrderMutation, TError, OpenOrderMutationVariables, TContext>(
    ["openOrder"],
    (variables?: OpenOrderMutationVariables) =>
      fetcher<OpenOrderMutation, OpenOrderMutationVariables>(
        OpenOrderDocument,
        variables
      )(),
    options
  );
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
) =>
  useQuery<RecommendFromFaustQuery, TError, TData>(
    ["recommendFromFaust", variables],
    fetcher<RecommendFromFaustQuery, RecommendFromFaustQueryVariables>(
      RecommendFromFaustDocument,
      variables
    ),
    options
  );
export const SearchWithPaginationDocument = `
    query searchWithPagination($q: SearchQuery!, $offset: Int!, $limit: PaginationLimit!, $filters: SearchFilters) {
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
) =>
  useQuery<SearchWithPaginationQuery, TError, TData>(
    ["searchWithPagination", variables],
    fetcher<SearchWithPaginationQuery, SearchWithPaginationQueryVariables>(
      SearchWithPaginationDocument,
      variables
    ),
    options
  );
export const ComplexSearchWithPaginationWorkAccessDocument = `
    query complexSearchWithPaginationWorkAccess($cql: String!, $offset: Int!, $limit: PaginationLimit!, $filters: ComplexSearchFilters!) {
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
) =>
  useQuery<ComplexSearchWithPaginationWorkAccessQuery, TError, TData>(
    ["complexSearchWithPaginationWorkAccess", variables],
    fetcher<
      ComplexSearchWithPaginationWorkAccessQuery,
      ComplexSearchWithPaginationWorkAccessQueryVariables
    >(ComplexSearchWithPaginationWorkAccessDocument, variables),
    options
  );
export const ComplexSearchWithPaginationDocument = `
    query complexSearchWithPagination($cql: String!, $offset: Int!, $limit: PaginationLimit!, $filters: ComplexSearchFilters!) {
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
) =>
  useQuery<ComplexSearchWithPaginationQuery, TError, TData>(
    ["complexSearchWithPagination", variables],
    fetcher<
      ComplexSearchWithPaginationQuery,
      ComplexSearchWithPaginationQueryVariables
    >(ComplexSearchWithPaginationDocument, variables),
    options
  );
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
) =>
  useQuery<SuggestionsFromQueryStringQuery, TError, TData>(
    ["suggestionsFromQueryString", variables],
    fetcher<
      SuggestionsFromQueryStringQuery,
      SuggestionsFromQueryStringQueryVariables
    >(SuggestionsFromQueryStringDocument, variables),
    options
  );
export const SearchFacetDocument = `
    query searchFacet($q: SearchQuery!, $facets: [FacetField!]!, $facetLimit: Int!, $filters: SearchFilters) {
  search(q: $q, filters: $filters) {
    facets(facets: $facets) {
      name
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
) =>
  useQuery<SearchFacetQuery, TError, TData>(
    ["searchFacet", variables],
    fetcher<SearchFacetQuery, SearchFacetQueryVariables>(
      SearchFacetDocument,
      variables
    ),
    options
  );
export const IntelligentFacetsDocument = `
    query intelligentFacets($q: SearchQuery!, $facetsLimit: Int!, $valuesLimit: Int!, $filters: SearchFilters!) {
  search(q: $q, filters: $filters) {
    intelligentFacets(limit: $facetsLimit) {
      name
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
) =>
  useQuery<IntelligentFacetsQuery, TError, TData>(
    ["intelligentFacets", variables],
    fetcher<IntelligentFacetsQuery, IntelligentFacetsQueryVariables>(
      IntelligentFacetsDocument,
      variables
    ),
    options
  );
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
) =>
  useMutation<PlaceCopyMutation, TError, PlaceCopyMutationVariables, TContext>(
    ["placeCopy"],
    (variables?: PlaceCopyMutationVariables) =>
      fetcher<PlaceCopyMutation, PlaceCopyMutationVariables>(
        PlaceCopyDocument,
        variables
      )(),
    options
  );
