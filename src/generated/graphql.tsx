import { useQuery, UseQueryOptions } from "react-query";
import { fetcher } from "../core/graphql-fetcher";

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
  Any: unknown;
  /** The `BigInt` scalar type represents non-fractional signed whole numeric values. */
  BigInt: unknown;
  Binary: unknown;
  /** The `Byte` scalar type represents byte value as a Buffer */
  Byte: unknown;
  /** A field whose value is a Currency: https://en.wikipedia.org/wiki/ISO4217. */
  Currency: unknown;
  /** Using dayjs to format dates and support localization. https://day.js.org/docs/en/display/format */
  CustomDateFormat: unknown;
  /** A date string, such as 2007-12-03, compliant with the `full-date` format outlined in section 5.6 of the RFC 3339 profile of the ISO 8601 standard for representation of dates and times using the Gregorian calendar. */
  Date: unknown;
  /** A date-time string at UTC, such as 2007-12-03T10:15:30Z, compliant with the `date-time` format outlined in section 5.6 of the RFC 3339 profile of the ISO 8601 standard for representation of dates and times using the Gregorian calendar. */
  DateTime: unknown;
  DateTimeTz: unknown;
  DatetimeIso8601: unknown;
  /**
   *
   *     A string representing a duration conforming to the ISO8601 standard,
   *     such as: P1W1DT13H23M34S
   *     P is the duration designator (for period) placed at the start of the duration representation.
   *     Y is the year designator that follows the value for the number of years.
   *     M is the month designator that follows the value for the number of months.
   *     W is the week designator that follows the value for the number of weeks.
   *     D is the day designator that follows the value for the number of days.
   *     T is the time designator that precedes the time components of the representation.
   *     H is the hour designator that follows the value for the number of hours.
   *     M is the minute designator that follows the value for the number of minutes.
   *     S is the second designator that follows the value for the number of seconds.
   *
   *     Note the time designator, T, that precedes the time value.
   *
   *     Matches moment.js, Luxon and DateFns implementations
   *     ,/. is valid for decimal places and +/- is a valid prefix
   *
   */
  Duration: unknown;
  /** A field whose value conforms to the standard internet email address format as specified in RFC822: https://www.w3.org/Protocols/rfc822/. */
  EmailAddress: unknown;
  /** A field whose value is a generic Universally Unique Identifier: https://en.wikipedia.org/wiki/Universally_unique_identifier. */
  GUID: unknown;
  /** A field whose value is a CSS HSL color: https://developer.mozilla.org/en-US/docs/Web/CSS/color_value#hsl()_and_hsla(). */
  HSL: unknown;
  /** A field whose value is a CSS HSLA color: https://developer.mozilla.org/en-US/docs/Web/CSS/color_value#hsl()_and_hsla(). */
  HSLA: unknown;
  /** A field whose value is a hex color code: https://en.wikipedia.org/wiki/Web_colors. */
  HexColorCode: unknown;
  /** A field whose value is a hexadecimal: https://en.wikipedia.org/wiki/Hexadecimal. */
  Hexadecimal: unknown;
  /** A field whose value is an International Bank Account Number (IBAN): https://en.wikipedia.org/wiki/International_Bank_Account_Number. */
  IBAN: unknown;
  /** A field whose value is a IPv4 address: https://en.wikipedia.org/wiki/IPv4. */
  IPv4: unknown;
  /** A field whose value is a IPv6 address: https://en.wikipedia.org/wiki/IPv6. */
  IPv6: unknown;
  /** A field whose value is a ISBN-10 or ISBN-13 number: https://en.wikipedia.org/wiki/International_Standard_Book_Number. */
  ISBN: unknown;
  /**
   *
   *     A string representing a duration conforming to the ISO8601 standard,
   *     such as: P1W1DT13H23M34S
   *     P is the duration designator (for period) placed at the start of the duration representation.
   *     Y is the year designator that follows the value for the number of years.
   *     M is the month designator that follows the value for the number of months.
   *     W is the week designator that follows the value for the number of weeks.
   *     D is the day designator that follows the value for the number of days.
   *     T is the time designator that precedes the time components of the representation.
   *     H is the hour designator that follows the value for the number of hours.
   *     M is the minute designator that follows the value for the number of minutes.
   *     S is the second designator that follows the value for the number of seconds.
   *
   *     Note the time designator, T, that precedes the time value.
   *
   *     Matches moment.js, Luxon and DateFns implementations
   *     ,/. is valid for decimal places and +/- is a valid prefix
   *
   */
  ISO8601Duration: unknown;
  Integer: unknown;
  /** The `JSON` scalar type represents JSON values as specified by [ECMA-404](http://www.ecma-international.org/publications/files/ECMA-ST/ECMA-404.pdf). */
  JSON: unknown;
  /** The `JSONObject` scalar type represents JSON objects as specified by [ECMA-404](http://www.ecma-international.org/publications/files/ECMA-ST/ECMA-404.pdf). */
  JSONObject: unknown;
  /** A field whose value is a JSON Web Token (JWT): https://jwt.io/introduction. */
  JWT: unknown;
  /** A field whose value is a valid decimal degrees latitude number (53.471): https://en.wikipedia.org/wiki/Latitude */
  Latitude: unknown;
  /** A local date string (i.e., with no associated timezone) in `YYYY-MM-DD` format, e.g. `2020-01-01`. */
  LocalDate: unknown;
  /** A local time string (i.e., with no associated timezone) in 24-hr `HH:mm[:ss[.SSS]]` format, e.g. `14:25` or `14:25:06` or `14:25:06.123`.  This scalar is very similar to the `LocalTime`, with the only difference being that `LocalEndTime` also allows `24:00` as a valid value to indicate midnight of the following day.  This is useful when using the scalar to represent the exclusive upper bound of a time block. */
  LocalEndTime: unknown;
  /** A local time string (i.e., with no associated timezone) in 24-hr `HH:mm[:ss[.SSS]]` format, e.g. `14:25` or `14:25:06` or `14:25:06.123`. */
  LocalTime: unknown;
  /** The `BigInt` scalar type represents non-fractional signed whole numeric values. */
  Long: unknown;
  /** A field whose value is a valid decimal degrees longitude number (53.471): https://en.wikipedia.org/wiki/Longitude */
  Longitude: unknown;
  /** A field whose value is a IEEE 802 48-bit MAC address: https://en.wikipedia.org/wiki/MAC_address. */
  MAC: unknown;
  Map: unknown;
  /** Floats that will have a value less than 0. */
  NegativeFloat: unknown;
  /** Integers that will have a value less than 0. */
  NegativeInt: unknown;
  /** A string that cannot be passed as an empty value */
  NonEmptyString: unknown;
  /** Floats that will have a value of 0 or more. */
  NonNegativeFloat: unknown;
  /** Integers that will have a value of 0 or more. */
  NonNegativeInt: unknown;
  /** Floats that will have a value of 0 or less. */
  NonPositiveFloat: unknown;
  /** Integers that will have a value of 0 or less. */
  NonPositiveInt: unknown;
  /** A field whose value conforms with the standard mongodb object ID as described here: https://docs.mongodb.com/manual/reference/method/ObjectId/#ObjectId. Example: 5e5677d71bdc2ae76344968c */
  ObjectID: unknown;
  /** An integer in the range from 1 to 100 */
  PaginationLimit: unknown;
  /** A field whose value conforms to the standard E.164 format as specified in: https://en.wikipedia.org/wiki/E.164. Basically this is +17895551234. */
  PhoneNumber: unknown;
  /** A field whose value is a valid TCP port within the range of 0 to 65535: https://en.wikipedia.org/wiki/Transmission_Control_Protocol#TCP_ports */
  Port: unknown;
  /** Floats that will have a value greater than 0. */
  PositiveFloat: unknown;
  /** Integers that will have a value greater than 0. */
  PositiveInt: unknown;
  /** A field whose value conforms to the standard postal code formats for United States, United Kingdom, Germany, Canada, France, Italy, Australia, Netherlands, Spain, Denmark, Sweden, Belgium, India, Austria, Portugal, Switzerland or Luxembourg. */
  PostalCode: unknown;
  /** A field whose value is a CSS RGB color: https://developer.mozilla.org/en-US/docs/Web/CSS/color_value#rgb()_and_rgba(). */
  RGB: unknown;
  /** A field whose value is a CSS RGBA color: https://developer.mozilla.org/en-US/docs/Web/CSS/color_value#rgb()_and_rgba(). */
  RGBA: unknown;
  /** The `SafeInt` scalar type represents non-fractional signed whole numeric values that are considered safe as defined by the ECMAScript specification. */
  SafeInt: unknown;
  /** A time string at UTC, such as 10:15:30Z, compliant with the `full-time` format outlined in section 5.6 of the RFC 3339profile of the ISO 8601 standard for representation of dates and times using the Gregorian calendar. */
  Time: unknown;
  Timespan: unknown;
  /** The javascript `Date` as integer. Type represents date and time as number of milliseconds from start of UNIX epoch. */
  Timestamp: unknown;
  /** A field whose value conforms to the standard URL format as specified in RFC3986: https://www.ietf.org/rfc/rfc3986.txt. */
  URL: unknown;
  /** A currency string, such as $21.25 */
  USCurrency: unknown;
  /** A field whose value is a generic Universally Unique Identifier: https://en.wikipedia.org/wiki/Universally_unique_identifier. */
  UUID: unknown;
  /** Floats that will have a value of 0 or more. */
  UnsignedFloat: unknown;
  /** Integers that will have a value of 0 or more. */
  UnsignedInt: unknown;
  Upload: unknown;
  /** A field whose value is a UTC Offset: https://en.wikipedia.org/wiki/List_of_tz_database_time_zones */
  UtcOffset: unknown;
  /** Represents NULL values */
  Void: unknown;
};

export type AdminData = {
  __typename?: "AdminData";
  creationDate?: Maybe<Scalars["String"]>;
  requestButton?: Maybe<Scalars["Boolean"]>;
};

export type AgencyHolding = {
  __typename?: "AgencyHolding";
  agencyId?: Maybe<Scalars["String"]>;
  localIdentifier?: Maybe<Scalars["String"]>;
  localisationPid?: Maybe<Scalars["String"]>;
};

export type Availability = {
  __typename?: "Availability";
  expectedDelivery?: Maybe<Scalars["String"]>;
  orderPossible?: Maybe<Scalars["Boolean"]>;
  orderPossibleReason?: Maybe<Scalars["String"]>;
  willLend?: Maybe<Scalars["Boolean"]>;
};

/** The 'Custom block' entity type. */
export type BlockContent = {
  /** The time that the custom block was last edited. */
  changed?: Maybe<Scalars["Timestamp"]>;
  /** A flag indicating whether this is the default translation. */
  defaultLangcode?: Maybe<Scalars["Boolean"]>;
  entityAccess?: Maybe<Scalars["Boolean"]>;
  entityBundle?: Maybe<Scalars["String"]>;
  entityChanged?: Maybe<Scalars["String"]>;
  entityCreated?: Maybe<Scalars["String"]>;
  entityId?: Maybe<Scalars["String"]>;
  entityLabel?: Maybe<Scalars["String"]>;
  entityLanguage?: Maybe<Language>;
  entityPublished?: Maybe<Scalars["Boolean"]>;
  entityQueryExclusive: EntityQueryResult;
  /** Renders 'Custom block' entities in the given view mode. */
  entityRendered?: Maybe<Scalars["String"]>;
  entityRevisions: EntityQueryResult;
  entityTranslation?: Maybe<Entity>;
  entityTranslations?: Maybe<Array<Maybe<Entity>>>;
  entityType?: Maybe<Scalars["String"]>;
  entityUrl?: Maybe<Url>;
  entityUuid?: Maybe<Scalars["String"]>;
  /** The custom block ID. */
  id?: Maybe<Scalars["Int"]>;
  /** A brief description of your block. */
  info?: Maybe<Scalars["String"]>;
  /** The custom block language code. */
  langcode?: Maybe<FieldBlockContentLangcode>;
  /** Query reference: The user ID of the author of the current revision. */
  queryRevisionUser?: Maybe<EntityQueryResult>;
  /** Query reference: The block type. */
  queryType?: Maybe<EntityQueryResult>;
  /** A boolean indicating whether this block is reusable. */
  reusable?: Maybe<Scalars["Boolean"]>;
  /** The time that the current revision was created. */
  revisionCreated?: Maybe<Scalars["Timestamp"]>;
  /** A flag indicating whether this was a default revision when it was saved. */
  revisionDefault?: Maybe<Scalars["Boolean"]>;
  /** The revision ID. */
  revisionId?: Maybe<Scalars["Int"]>;
  /** The log entry explaining the changes in this revision. */
  revisionLog?: Maybe<Scalars["String"]>;
  /** Indicates if the last edit of a translation belongs to current revision. */
  revisionTranslationAffected?: Maybe<Scalars["Boolean"]>;
  /** The user ID of the author of the current revision. */
  revisionUser?: Maybe<FieldBlockContentRevisionUser>;
  status?: Maybe<Scalars["Boolean"]>;
  /** The block type. */
  type?: Maybe<FieldBlockContentType>;
  /** The custom block UUID. */
  uuid?: Maybe<Scalars["String"]>;
};

/** The 'Custom block' entity type. */
export type BlockContentEntityAccessArgs = {
  operation: Scalars["String"];
};

/** The 'Custom block' entity type. */
export type BlockContentEntityChangedArgs = {
  format?: InputMaybe<Scalars["String"]>;
};

/** The 'Custom block' entity type. */
export type BlockContentEntityCreatedArgs = {
  format?: InputMaybe<Scalars["String"]>;
};

/** The 'Custom block' entity type. */
export type BlockContentEntityQueryExclusiveArgs = {
  bundles?: InputMaybe<EntityQueryBundleMode>;
  filter?: InputMaybe<EntityQueryFilterInput>;
  limit?: InputMaybe<Scalars["Int"]>;
  offset?: InputMaybe<Scalars["Int"]>;
  revisions?: InputMaybe<EntityQueryRevisionMode>;
  sort?: InputMaybe<Array<InputMaybe<EntityQuerySortInput>>>;
};

/** The 'Custom block' entity type. */
export type BlockContentEntityRenderedArgs = {
  mode?: InputMaybe<BlockContentDisplayModeId>;
};

/** The 'Custom block' entity type. */
export type BlockContentEntityRevisionsArgs = {
  filter?: InputMaybe<EntityQueryFilterInput>;
  limit?: InputMaybe<Scalars["Int"]>;
  offset?: InputMaybe<Scalars["Int"]>;
  sort?: InputMaybe<Array<InputMaybe<EntityQuerySortInput>>>;
};

/** The 'Custom block' entity type. */
export type BlockContentEntityTranslationArgs = {
  language: LanguageId;
};

/** The 'Custom block' entity type. */
export type BlockContentQueryRevisionUserArgs = {
  filter?: InputMaybe<EntityQueryFilterInput>;
  limit?: InputMaybe<Scalars["Int"]>;
  offset?: InputMaybe<Scalars["Int"]>;
  revisions?: InputMaybe<EntityQueryRevisionMode>;
  sort?: InputMaybe<Array<InputMaybe<EntityQuerySortInput>>>;
};

/** The 'Custom block' entity type. */
export type BlockContentQueryTypeArgs = {
  filter?: InputMaybe<EntityQueryFilterInput>;
  limit?: InputMaybe<Scalars["Int"]>;
  offset?: InputMaybe<Scalars["Int"]>;
  revisions?: InputMaybe<EntityQueryRevisionMode>;
  sort?: InputMaybe<Array<InputMaybe<EntityQuerySortInput>>>;
};

/** The 'Basic block' bundle of the 'Custom block' entity type. */
export type BlockContentBasic = BlockContent &
  Entity &
  EntityPublishable &
  EntityRevisionable & {
    __typename?: "BlockContentBasic";
    body?: Maybe<FieldBlockContentBasicBody>;
    /** The time that the custom block was last edited. */
    changed?: Maybe<Scalars["Timestamp"]>;
    /** A flag indicating whether this is the default translation. */
    defaultLangcode?: Maybe<Scalars["Boolean"]>;
    entityAccess?: Maybe<Scalars["Boolean"]>;
    entityBundle?: Maybe<Scalars["String"]>;
    entityChanged?: Maybe<Scalars["String"]>;
    entityCreated?: Maybe<Scalars["String"]>;
    entityId?: Maybe<Scalars["String"]>;
    entityLabel?: Maybe<Scalars["String"]>;
    entityLanguage?: Maybe<Language>;
    entityPublished?: Maybe<Scalars["Boolean"]>;
    entityQueryExclusive: EntityQueryResult;
    /** Renders 'Custom block' entities in the given view mode. */
    entityRendered?: Maybe<Scalars["String"]>;
    entityRevisions: EntityQueryResult;
    entityTranslation?: Maybe<Entity>;
    entityTranslations?: Maybe<Array<Maybe<Entity>>>;
    entityType?: Maybe<Scalars["String"]>;
    entityUrl?: Maybe<Url>;
    entityUuid?: Maybe<Scalars["String"]>;
    /** The custom block ID. */
    id?: Maybe<Scalars["Int"]>;
    /** A brief description of your block. */
    info?: Maybe<Scalars["String"]>;
    /** The custom block language code. */
    langcode?: Maybe<FieldBlockContentLangcode>;
    /** Query reference: The user ID of the author of the current revision. */
    queryRevisionUser?: Maybe<EntityQueryResult>;
    /** Query reference: The block type. */
    queryType?: Maybe<EntityQueryResult>;
    /** A boolean indicating whether this block is reusable. */
    reusable?: Maybe<Scalars["Boolean"]>;
    /** The time that the current revision was created. */
    revisionCreated?: Maybe<Scalars["Timestamp"]>;
    /** A flag indicating whether this was a default revision when it was saved. */
    revisionDefault?: Maybe<Scalars["Boolean"]>;
    /** The revision ID. */
    revisionId?: Maybe<Scalars["Int"]>;
    /** The log entry explaining the changes in this revision. */
    revisionLog?: Maybe<Scalars["String"]>;
    /** Indicates if the last edit of a translation belongs to current revision. */
    revisionTranslationAffected?: Maybe<Scalars["Boolean"]>;
    /** The user ID of the author of the current revision. */
    revisionUser?: Maybe<FieldBlockContentRevisionUser>;
    status?: Maybe<Scalars["Boolean"]>;
    /** The block type. */
    type?: Maybe<FieldBlockContentType>;
    /** The custom block UUID. */
    uuid?: Maybe<Scalars["String"]>;
  };

/** The 'Basic block' bundle of the 'Custom block' entity type. */
export type BlockContentBasicEntityAccessArgs = {
  operation: Scalars["String"];
};

/** The 'Basic block' bundle of the 'Custom block' entity type. */
export type BlockContentBasicEntityChangedArgs = {
  format?: InputMaybe<Scalars["String"]>;
};

/** The 'Basic block' bundle of the 'Custom block' entity type. */
export type BlockContentBasicEntityCreatedArgs = {
  format?: InputMaybe<Scalars["String"]>;
};

/** The 'Basic block' bundle of the 'Custom block' entity type. */
export type BlockContentBasicEntityQueryExclusiveArgs = {
  bundles?: InputMaybe<EntityQueryBundleMode>;
  filter?: InputMaybe<EntityQueryFilterInput>;
  limit?: InputMaybe<Scalars["Int"]>;
  offset?: InputMaybe<Scalars["Int"]>;
  revisions?: InputMaybe<EntityQueryRevisionMode>;
  sort?: InputMaybe<Array<InputMaybe<EntityQuerySortInput>>>;
};

/** The 'Basic block' bundle of the 'Custom block' entity type. */
export type BlockContentBasicEntityRenderedArgs = {
  mode?: InputMaybe<BlockContentDisplayModeId>;
};

/** The 'Basic block' bundle of the 'Custom block' entity type. */
export type BlockContentBasicEntityRevisionsArgs = {
  filter?: InputMaybe<EntityQueryFilterInput>;
  limit?: InputMaybe<Scalars["Int"]>;
  offset?: InputMaybe<Scalars["Int"]>;
  sort?: InputMaybe<Array<InputMaybe<EntityQuerySortInput>>>;
};

/** The 'Basic block' bundle of the 'Custom block' entity type. */
export type BlockContentBasicEntityTranslationArgs = {
  language: LanguageId;
};

/** The 'Basic block' bundle of the 'Custom block' entity type. */
export type BlockContentBasicQueryRevisionUserArgs = {
  filter?: InputMaybe<EntityQueryFilterInput>;
  limit?: InputMaybe<Scalars["Int"]>;
  offset?: InputMaybe<Scalars["Int"]>;
  revisions?: InputMaybe<EntityQueryRevisionMode>;
  sort?: InputMaybe<Array<InputMaybe<EntityQuerySortInput>>>;
};

/** The 'Basic block' bundle of the 'Custom block' entity type. */
export type BlockContentBasicQueryTypeArgs = {
  filter?: InputMaybe<EntityQueryFilterInput>;
  limit?: InputMaybe<Scalars["Int"]>;
  offset?: InputMaybe<Scalars["Int"]>;
  revisions?: InputMaybe<EntityQueryRevisionMode>;
  sort?: InputMaybe<Array<InputMaybe<EntityQuerySortInput>>>;
};

/** The available display modes for 'Custom block' entities. */
export enum BlockContentDisplayModeId {
  /** The 'Full' display mode for 'Custom block' entities. */
  Full = "FULL"
}

export type Borchk = {
  __typename?: "Borchk";
  RequestStatus?: Maybe<BorchkRequestStatus>;
};

export enum BorchkRequestStatus {
  BorrowerNotFound = "borrower_not_found",
  BorrowerNotInMunicipality = "borrower_not_in_municipality",
  BorrowercheckNotAllowed = "borrowercheck_not_allowed",
  ErrorInRequest = "error_in_request",
  InternalError = "internal_error",
  LibraryNotFound = "library_not_found",
  MunicipalityCheckNotSupportedByLibrary = "municipality_check_not_supported_by_library",
  NoUserInRequest = "no_user_in_request",
  Ok = "ok",
  ServiceNotLicensed = "service_not_licensed",
  ServiceUnavailable = "service_unavailable"
}

export type Branch = {
  __typename?: "Branch";
  agencyId: Scalars["String"];
  agencyName?: Maybe<Scalars["String"]>;
  /** Whether this branch's agency supports borrowerCheck */
  borrowerCheck: Scalars["Boolean"];
  branchCatalogueUrl?: Maybe<Scalars["String"]>;
  branchId: Scalars["String"];
  branchWebsiteUrl?: Maybe<Scalars["String"]>;
  city?: Maybe<Scalars["String"]>;
  digitalCopyAccess: Scalars["Boolean"];
  highlights: Array<Highlight>;
  holdingStatus?: Maybe<DetailedHoldings>;
  infomediaAccess: Scalars["Boolean"];
  lookupUrl?: Maybe<Scalars["String"]>;
  name: Scalars["String"];
  openingHours?: Maybe<Scalars["String"]>;
  orderPolicy?: Maybe<CheckOrderPolicy>;
  pickupAllowed: Scalars["Boolean"];
  postalAddress?: Maybe<Scalars["String"]>;
  postalCode?: Maybe<Scalars["String"]>;
  userParameters: Array<UserParameter>;
  userStatusUrl?: Maybe<Scalars["String"]>;
};

export type BranchHoldingStatusArgs = {
  pids?: InputMaybe<Array<InputMaybe<Scalars["String"]>>>;
};

export type BranchOrderPolicyArgs = {
  pid: Scalars["String"];
};

export type BranchResult = {
  __typename?: "BranchResult";
  agencyUrl?: Maybe<Scalars["String"]>;
  hitcount: Scalars["Int"];
  result: Array<Branch>;
};

export type CheckOrderPolicy = {
  __typename?: "CheckOrderPolicy";
  lookUpUrl?: Maybe<Scalars["String"]>;
  orderPossible?: Maybe<Scalars["Boolean"]>;
  orderPossibleReason?: Maybe<OrderPossibleReason>;
};

/** The 'Comment' entity type. */
export type Comment = {
  /** The time that the comment was last edited. */
  changed?: Maybe<Scalars["Timestamp"]>;
  /** The comment ID. */
  cid?: Maybe<Scalars["Int"]>;
  /** The comment type. */
  commentType?: Maybe<FieldCommentCommentType>;
  /** The time that the comment was created. */
  created?: Maybe<Scalars["Timestamp"]>;
  /** A flag indicating whether this is the default translation. */
  defaultLangcode?: Maybe<Scalars["Boolean"]>;
  entityAccess?: Maybe<Scalars["Boolean"]>;
  entityBundle?: Maybe<Scalars["String"]>;
  entityChanged?: Maybe<Scalars["String"]>;
  entityCreated?: Maybe<Scalars["String"]>;
  entityId?: Maybe<Scalars["String"]>;
  /** The ID of the entity of which this comment is a reply. */
  entityIdOfComment?: Maybe<FieldCommentEntityId>;
  entityLabel?: Maybe<Scalars["String"]>;
  entityLanguage?: Maybe<Language>;
  entityOwner?: Maybe<DrupalUser>;
  entityPublished?: Maybe<Scalars["Boolean"]>;
  entityQueryExclusive: EntityQueryResult;
  /** Renders 'Comment' entities in the given view mode. */
  entityRendered?: Maybe<Scalars["String"]>;
  entityTranslation?: Maybe<Entity>;
  entityTranslations?: Maybe<Array<Maybe<Entity>>>;
  entityType?: Maybe<Scalars["String"]>;
  /** The entity type to which this comment is attached. */
  entityTypeOfComment?: Maybe<Scalars["String"]>;
  entityUrl?: Maybe<Url>;
  entityUuid?: Maybe<Scalars["String"]>;
  /** The field name through which this comment was added. */
  fieldName?: Maybe<Scalars["String"]>;
  /** The comment author's home page address. */
  homepage?: Maybe<Scalars["String"]>;
  /** The comment author's hostname. */
  hostname?: Maybe<Scalars["String"]>;
  /** The comment language code. */
  langcode?: Maybe<FieldCommentLangcode>;
  /** The comment author's email address. */
  mail?: Maybe<Scalars["String"]>;
  /** The comment author's name. */
  name?: Maybe<Scalars["String"]>;
  /** The parent comment ID if this is a reply to a comment. */
  pid?: Maybe<FieldCommentPid>;
  /** Query reference: The comment type. */
  queryCommentType?: Maybe<EntityQueryResult>;
  /** Query reference: The ID of the entity of which this comment is a reply. */
  queryEntityId?: Maybe<EntityQueryResult>;
  /** Query reference: The parent comment ID if this is a reply to a comment. */
  queryPid?: Maybe<EntityQueryResult>;
  /** Query reference: The user ID of the comment author. */
  queryUid?: Maybe<EntityQueryResult>;
  /** Reverse reference: The parent comment ID if this is a reply to a comment. */
  reversePidComment: EntityQueryResult;
  status?: Maybe<Scalars["Boolean"]>;
  subject?: Maybe<Scalars["String"]>;
  /** The alphadecimal representation of the comment's place in a thread, consisting of a base 36 string prefixed by an integer indicating its length. */
  thread?: Maybe<Scalars["String"]>;
  /** The user ID of the comment author. */
  uid?: Maybe<FieldCommentUid>;
  /** The comment UUID. */
  uuid?: Maybe<Scalars["String"]>;
};

/** The 'Comment' entity type. */
export type CommentEntityAccessArgs = {
  operation: Scalars["String"];
};

/** The 'Comment' entity type. */
export type CommentEntityChangedArgs = {
  format?: InputMaybe<Scalars["String"]>;
};

/** The 'Comment' entity type. */
export type CommentEntityCreatedArgs = {
  format?: InputMaybe<Scalars["String"]>;
};

/** The 'Comment' entity type. */
export type CommentEntityQueryExclusiveArgs = {
  bundles?: InputMaybe<EntityQueryBundleMode>;
  filter?: InputMaybe<EntityQueryFilterInput>;
  limit?: InputMaybe<Scalars["Int"]>;
  offset?: InputMaybe<Scalars["Int"]>;
  revisions?: InputMaybe<EntityQueryRevisionMode>;
  sort?: InputMaybe<Array<InputMaybe<EntityQuerySortInput>>>;
};

/** The 'Comment' entity type. */
export type CommentEntityRenderedArgs = {
  mode?: InputMaybe<CommentDisplayModeId>;
};

/** The 'Comment' entity type. */
export type CommentEntityTranslationArgs = {
  language: LanguageId;
};

/** The 'Comment' entity type. */
export type CommentQueryCommentTypeArgs = {
  filter?: InputMaybe<EntityQueryFilterInput>;
  limit?: InputMaybe<Scalars["Int"]>;
  offset?: InputMaybe<Scalars["Int"]>;
  revisions?: InputMaybe<EntityQueryRevisionMode>;
  sort?: InputMaybe<Array<InputMaybe<EntityQuerySortInput>>>;
};

/** The 'Comment' entity type. */
export type CommentQueryEntityIdArgs = {
  filter?: InputMaybe<EntityQueryFilterInput>;
  limit?: InputMaybe<Scalars["Int"]>;
  offset?: InputMaybe<Scalars["Int"]>;
  revisions?: InputMaybe<EntityQueryRevisionMode>;
  sort?: InputMaybe<Array<InputMaybe<EntityQuerySortInput>>>;
};

/** The 'Comment' entity type. */
export type CommentQueryPidArgs = {
  filter?: InputMaybe<EntityQueryFilterInput>;
  limit?: InputMaybe<Scalars["Int"]>;
  offset?: InputMaybe<Scalars["Int"]>;
  revisions?: InputMaybe<EntityQueryRevisionMode>;
  sort?: InputMaybe<Array<InputMaybe<EntityQuerySortInput>>>;
};

/** The 'Comment' entity type. */
export type CommentQueryUidArgs = {
  filter?: InputMaybe<EntityQueryFilterInput>;
  limit?: InputMaybe<Scalars["Int"]>;
  offset?: InputMaybe<Scalars["Int"]>;
  revisions?: InputMaybe<EntityQueryRevisionMode>;
  sort?: InputMaybe<Array<InputMaybe<EntityQuerySortInput>>>;
};

/** The 'Comment' entity type. */
export type CommentReversePidCommentArgs = {
  filter?: InputMaybe<EntityQueryFilterInput>;
  limit?: InputMaybe<Scalars["Int"]>;
  offset?: InputMaybe<Scalars["Int"]>;
  revisions?: InputMaybe<EntityQueryRevisionMode>;
  sort?: InputMaybe<Array<InputMaybe<EntityQuerySortInput>>>;
};

/** The 'Default comments' bundle of the 'Comment' entity type. */
export type CommentComment = Comment &
  Entity &
  EntityOwnable &
  EntityPublishable & {
    __typename?: "CommentComment";
    /** The time that the comment was last edited. */
    changed?: Maybe<Scalars["Timestamp"]>;
    /** The comment ID. */
    cid?: Maybe<Scalars["Int"]>;
    commentBody?: Maybe<FieldCommentCommentCommentBody>;
    /** The comment type. */
    commentType?: Maybe<FieldCommentCommentType>;
    /** The time that the comment was created. */
    created?: Maybe<Scalars["Timestamp"]>;
    /** A flag indicating whether this is the default translation. */
    defaultLangcode?: Maybe<Scalars["Boolean"]>;
    entityAccess?: Maybe<Scalars["Boolean"]>;
    entityBundle?: Maybe<Scalars["String"]>;
    entityChanged?: Maybe<Scalars["String"]>;
    entityCreated?: Maybe<Scalars["String"]>;
    entityId?: Maybe<Scalars["String"]>;
    /** The ID of the entity of which this comment is a reply. */
    entityIdOfComment?: Maybe<FieldCommentEntityId>;
    /** The ID of the entity of which this comment is a reply. */
    entityIdOfCommentComment?: Maybe<FieldCommentCommentEntityId>;
    entityLabel?: Maybe<Scalars["String"]>;
    entityLanguage?: Maybe<Language>;
    entityOwner?: Maybe<DrupalUser>;
    entityPublished?: Maybe<Scalars["Boolean"]>;
    entityQueryExclusive: EntityQueryResult;
    /** Renders 'Comment' entities in the given view mode. */
    entityRendered?: Maybe<Scalars["String"]>;
    entityTranslation?: Maybe<Entity>;
    entityTranslations?: Maybe<Array<Maybe<Entity>>>;
    entityType?: Maybe<Scalars["String"]>;
    /** The entity type to which this comment is attached. */
    entityTypeOfComment?: Maybe<Scalars["String"]>;
    entityUrl?: Maybe<Url>;
    entityUuid?: Maybe<Scalars["String"]>;
    /** The field name through which this comment was added. */
    fieldName?: Maybe<Scalars["String"]>;
    /** The comment author's home page address. */
    homepage?: Maybe<Scalars["String"]>;
    /** The comment author's hostname. */
    hostname?: Maybe<Scalars["String"]>;
    /** The comment language code. */
    langcode?: Maybe<FieldCommentLangcode>;
    /** The comment author's email address. */
    mail?: Maybe<Scalars["String"]>;
    /** The comment author's name. */
    name?: Maybe<Scalars["String"]>;
    /** The parent comment ID if this is a reply to a comment. */
    pid?: Maybe<FieldCommentPid>;
    /** Query reference: The comment type. */
    queryCommentType?: Maybe<EntityQueryResult>;
    /** Query reference: The ID of the entity of which this comment is a reply. */
    queryEntityId?: Maybe<EntityQueryResult>;
    /** Query reference: The parent comment ID if this is a reply to a comment. */
    queryPid?: Maybe<EntityQueryResult>;
    /** Query reference: The user ID of the comment author. */
    queryUid?: Maybe<EntityQueryResult>;
    /** Reverse reference: The parent comment ID if this is a reply to a comment. */
    reversePidComment: EntityQueryResult;
    status?: Maybe<Scalars["Boolean"]>;
    subject?: Maybe<Scalars["String"]>;
    /** The alphadecimal representation of the comment's place in a thread, consisting of a base 36 string prefixed by an integer indicating its length. */
    thread?: Maybe<Scalars["String"]>;
    /** The user ID of the comment author. */
    uid?: Maybe<FieldCommentUid>;
    /** The user ID of the comment author. */
    uidOfCommentComment?: Maybe<FieldCommentCommentUid>;
    /** The comment UUID. */
    uuid?: Maybe<Scalars["String"]>;
  };

/** The 'Default comments' bundle of the 'Comment' entity type. */
export type CommentCommentEntityAccessArgs = {
  operation: Scalars["String"];
};

/** The 'Default comments' bundle of the 'Comment' entity type. */
export type CommentCommentEntityChangedArgs = {
  format?: InputMaybe<Scalars["String"]>;
};

/** The 'Default comments' bundle of the 'Comment' entity type. */
export type CommentCommentEntityCreatedArgs = {
  format?: InputMaybe<Scalars["String"]>;
};

/** The 'Default comments' bundle of the 'Comment' entity type. */
export type CommentCommentEntityQueryExclusiveArgs = {
  bundles?: InputMaybe<EntityQueryBundleMode>;
  filter?: InputMaybe<EntityQueryFilterInput>;
  limit?: InputMaybe<Scalars["Int"]>;
  offset?: InputMaybe<Scalars["Int"]>;
  revisions?: InputMaybe<EntityQueryRevisionMode>;
  sort?: InputMaybe<Array<InputMaybe<EntityQuerySortInput>>>;
};

/** The 'Default comments' bundle of the 'Comment' entity type. */
export type CommentCommentEntityRenderedArgs = {
  mode?: InputMaybe<CommentDisplayModeId>;
};

/** The 'Default comments' bundle of the 'Comment' entity type. */
export type CommentCommentEntityTranslationArgs = {
  language: LanguageId;
};

/** The 'Default comments' bundle of the 'Comment' entity type. */
export type CommentCommentQueryCommentTypeArgs = {
  filter?: InputMaybe<EntityQueryFilterInput>;
  limit?: InputMaybe<Scalars["Int"]>;
  offset?: InputMaybe<Scalars["Int"]>;
  revisions?: InputMaybe<EntityQueryRevisionMode>;
  sort?: InputMaybe<Array<InputMaybe<EntityQuerySortInput>>>;
};

/** The 'Default comments' bundle of the 'Comment' entity type. */
export type CommentCommentQueryEntityIdArgs = {
  filter?: InputMaybe<EntityQueryFilterInput>;
  limit?: InputMaybe<Scalars["Int"]>;
  offset?: InputMaybe<Scalars["Int"]>;
  revisions?: InputMaybe<EntityQueryRevisionMode>;
  sort?: InputMaybe<Array<InputMaybe<EntityQuerySortInput>>>;
};

/** The 'Default comments' bundle of the 'Comment' entity type. */
export type CommentCommentQueryPidArgs = {
  filter?: InputMaybe<EntityQueryFilterInput>;
  limit?: InputMaybe<Scalars["Int"]>;
  offset?: InputMaybe<Scalars["Int"]>;
  revisions?: InputMaybe<EntityQueryRevisionMode>;
  sort?: InputMaybe<Array<InputMaybe<EntityQuerySortInput>>>;
};

/** The 'Default comments' bundle of the 'Comment' entity type. */
export type CommentCommentQueryUidArgs = {
  filter?: InputMaybe<EntityQueryFilterInput>;
  limit?: InputMaybe<Scalars["Int"]>;
  offset?: InputMaybe<Scalars["Int"]>;
  revisions?: InputMaybe<EntityQueryRevisionMode>;
  sort?: InputMaybe<Array<InputMaybe<EntityQuerySortInput>>>;
};

/** The 'Default comments' bundle of the 'Comment' entity type. */
export type CommentCommentReversePidCommentArgs = {
  filter?: InputMaybe<EntityQueryFilterInput>;
  limit?: InputMaybe<Scalars["Int"]>;
  offset?: InputMaybe<Scalars["Int"]>;
  revisions?: InputMaybe<EntityQueryRevisionMode>;
  sort?: InputMaybe<Array<InputMaybe<EntityQuerySortInput>>>;
};

/** The available display modes for 'Comment' entities. */
export enum CommentDisplayModeId {
  /** The 'Full comment' display mode for 'Comment' entities. */
  Full = "FULL"
}

export type ConstraintViolation = {
  __typename?: "ConstraintViolation";
  code?: Maybe<Scalars["String"]>;
  message?: Maybe<Scalars["String"]>;
  path?: Maybe<Scalars["String"]>;
};

/** The 'Contact message' entity type. */
export type ContactMessage = {
  /** The ID of the associated form. */
  contactForm?: Maybe<FieldContactMessageContactForm>;
  /** Whether to send a copy of the message to the sender. */
  copy?: Maybe<Scalars["Boolean"]>;
  entityAccess?: Maybe<Scalars["Boolean"]>;
  entityBundle?: Maybe<Scalars["String"]>;
  entityChanged?: Maybe<Scalars["String"]>;
  entityCreated?: Maybe<Scalars["String"]>;
  entityId?: Maybe<Scalars["String"]>;
  entityLabel?: Maybe<Scalars["String"]>;
  entityLanguage?: Maybe<Language>;
  entityQueryExclusive: EntityQueryResult;
  entityTranslation?: Maybe<Entity>;
  entityTranslations?: Maybe<Array<Maybe<Entity>>>;
  entityType?: Maybe<Scalars["String"]>;
  entityUrl?: Maybe<Url>;
  entityUuid?: Maybe<Scalars["String"]>;
  /** The message language code. */
  langcode?: Maybe<FieldContactMessageLangcode>;
  /** The email of the person that is sending the contact message. */
  mail?: Maybe<Scalars["String"]>;
  message?: Maybe<Scalars["String"]>;
  /** The name of the person that is sending the contact message. */
  name?: Maybe<Scalars["String"]>;
  /** Query reference: The ID of the associated form. */
  queryContactForm?: Maybe<EntityQueryResult>;
  /** Query reference: The ID of the recipient user for personal contact messages. */
  queryRecipient?: Maybe<EntityQueryResult>;
  /** The ID of the recipient user for personal contact messages. */
  recipient?: Maybe<FieldContactMessageRecipient>;
  subject?: Maybe<Scalars["String"]>;
  /** The message UUID. */
  uuid?: Maybe<Scalars["String"]>;
};

/** The 'Contact message' entity type. */
export type ContactMessageEntityAccessArgs = {
  operation: Scalars["String"];
};

/** The 'Contact message' entity type. */
export type ContactMessageEntityChangedArgs = {
  format?: InputMaybe<Scalars["String"]>;
};

/** The 'Contact message' entity type. */
export type ContactMessageEntityCreatedArgs = {
  format?: InputMaybe<Scalars["String"]>;
};

/** The 'Contact message' entity type. */
export type ContactMessageEntityQueryExclusiveArgs = {
  bundles?: InputMaybe<EntityQueryBundleMode>;
  filter?: InputMaybe<EntityQueryFilterInput>;
  limit?: InputMaybe<Scalars["Int"]>;
  offset?: InputMaybe<Scalars["Int"]>;
  revisions?: InputMaybe<EntityQueryRevisionMode>;
  sort?: InputMaybe<Array<InputMaybe<EntityQuerySortInput>>>;
};

/** The 'Contact message' entity type. */
export type ContactMessageEntityTranslationArgs = {
  language: LanguageId;
};

/** The 'Contact message' entity type. */
export type ContactMessageQueryContactFormArgs = {
  filter?: InputMaybe<EntityQueryFilterInput>;
  limit?: InputMaybe<Scalars["Int"]>;
  offset?: InputMaybe<Scalars["Int"]>;
  revisions?: InputMaybe<EntityQueryRevisionMode>;
  sort?: InputMaybe<Array<InputMaybe<EntityQuerySortInput>>>;
};

/** The 'Contact message' entity type. */
export type ContactMessageQueryRecipientArgs = {
  filter?: InputMaybe<EntityQueryFilterInput>;
  limit?: InputMaybe<Scalars["Int"]>;
  offset?: InputMaybe<Scalars["Int"]>;
  revisions?: InputMaybe<EntityQueryRevisionMode>;
  sort?: InputMaybe<Array<InputMaybe<EntityQuerySortInput>>>;
};

/** The 'Website feedback' bundle of the 'Contact message' entity type. */
export type ContactMessageFeedback = ContactMessage &
  Entity & {
    __typename?: "ContactMessageFeedback";
    /** The ID of the associated form. */
    contactForm?: Maybe<FieldContactMessageContactForm>;
    /** Whether to send a copy of the message to the sender. */
    copy?: Maybe<Scalars["Boolean"]>;
    entityAccess?: Maybe<Scalars["Boolean"]>;
    entityBundle?: Maybe<Scalars["String"]>;
    entityChanged?: Maybe<Scalars["String"]>;
    entityCreated?: Maybe<Scalars["String"]>;
    entityId?: Maybe<Scalars["String"]>;
    entityLabel?: Maybe<Scalars["String"]>;
    entityLanguage?: Maybe<Language>;
    entityQueryExclusive: EntityQueryResult;
    entityTranslation?: Maybe<Entity>;
    entityTranslations?: Maybe<Array<Maybe<Entity>>>;
    entityType?: Maybe<Scalars["String"]>;
    entityUrl?: Maybe<Url>;
    entityUuid?: Maybe<Scalars["String"]>;
    /** The message language code. */
    langcode?: Maybe<FieldContactMessageLangcode>;
    /** The email of the person that is sending the contact message. */
    mail?: Maybe<Scalars["String"]>;
    message?: Maybe<Scalars["String"]>;
    /** The name of the person that is sending the contact message. */
    name?: Maybe<Scalars["String"]>;
    /** Query reference: The ID of the associated form. */
    queryContactForm?: Maybe<EntityQueryResult>;
    /** Query reference: The ID of the recipient user for personal contact messages. */
    queryRecipient?: Maybe<EntityQueryResult>;
    /** The ID of the recipient user for personal contact messages. */
    recipient?: Maybe<FieldContactMessageRecipient>;
    subject?: Maybe<Scalars["String"]>;
    /** The message UUID. */
    uuid?: Maybe<Scalars["String"]>;
  };

/** The 'Website feedback' bundle of the 'Contact message' entity type. */
export type ContactMessageFeedbackEntityAccessArgs = {
  operation: Scalars["String"];
};

/** The 'Website feedback' bundle of the 'Contact message' entity type. */
export type ContactMessageFeedbackEntityChangedArgs = {
  format?: InputMaybe<Scalars["String"]>;
};

/** The 'Website feedback' bundle of the 'Contact message' entity type. */
export type ContactMessageFeedbackEntityCreatedArgs = {
  format?: InputMaybe<Scalars["String"]>;
};

/** The 'Website feedback' bundle of the 'Contact message' entity type. */
export type ContactMessageFeedbackEntityQueryExclusiveArgs = {
  bundles?: InputMaybe<EntityQueryBundleMode>;
  filter?: InputMaybe<EntityQueryFilterInput>;
  limit?: InputMaybe<Scalars["Int"]>;
  offset?: InputMaybe<Scalars["Int"]>;
  revisions?: InputMaybe<EntityQueryRevisionMode>;
  sort?: InputMaybe<Array<InputMaybe<EntityQuerySortInput>>>;
};

/** The 'Website feedback' bundle of the 'Contact message' entity type. */
export type ContactMessageFeedbackEntityTranslationArgs = {
  language: LanguageId;
};

/** The 'Website feedback' bundle of the 'Contact message' entity type. */
export type ContactMessageFeedbackQueryContactFormArgs = {
  filter?: InputMaybe<EntityQueryFilterInput>;
  limit?: InputMaybe<Scalars["Int"]>;
  offset?: InputMaybe<Scalars["Int"]>;
  revisions?: InputMaybe<EntityQueryRevisionMode>;
  sort?: InputMaybe<Array<InputMaybe<EntityQuerySortInput>>>;
};

/** The 'Website feedback' bundle of the 'Contact message' entity type. */
export type ContactMessageFeedbackQueryRecipientArgs = {
  filter?: InputMaybe<EntityQueryFilterInput>;
  limit?: InputMaybe<Scalars["Int"]>;
  offset?: InputMaybe<Scalars["Int"]>;
  revisions?: InputMaybe<EntityQueryRevisionMode>;
  sort?: InputMaybe<Array<InputMaybe<EntityQuerySortInput>>>;
};

/** The 'Personal contact form' bundle of the 'Contact message' entity type. */
export type ContactMessagePersonal = ContactMessage &
  Entity & {
    __typename?: "ContactMessagePersonal";
    /** The ID of the associated form. */
    contactForm?: Maybe<FieldContactMessageContactForm>;
    /** Whether to send a copy of the message to the sender. */
    copy?: Maybe<Scalars["Boolean"]>;
    entityAccess?: Maybe<Scalars["Boolean"]>;
    entityBundle?: Maybe<Scalars["String"]>;
    entityChanged?: Maybe<Scalars["String"]>;
    entityCreated?: Maybe<Scalars["String"]>;
    entityId?: Maybe<Scalars["String"]>;
    entityLabel?: Maybe<Scalars["String"]>;
    entityLanguage?: Maybe<Language>;
    entityQueryExclusive: EntityQueryResult;
    entityTranslation?: Maybe<Entity>;
    entityTranslations?: Maybe<Array<Maybe<Entity>>>;
    entityType?: Maybe<Scalars["String"]>;
    entityUrl?: Maybe<Url>;
    entityUuid?: Maybe<Scalars["String"]>;
    /** The message language code. */
    langcode?: Maybe<FieldContactMessageLangcode>;
    /** The email of the person that is sending the contact message. */
    mail?: Maybe<Scalars["String"]>;
    message?: Maybe<Scalars["String"]>;
    /** The name of the person that is sending the contact message. */
    name?: Maybe<Scalars["String"]>;
    /** Query reference: The ID of the associated form. */
    queryContactForm?: Maybe<EntityQueryResult>;
    /** Query reference: The ID of the recipient user for personal contact messages. */
    queryRecipient?: Maybe<EntityQueryResult>;
    /** The ID of the recipient user for personal contact messages. */
    recipient?: Maybe<FieldContactMessageRecipient>;
    subject?: Maybe<Scalars["String"]>;
    /** The message UUID. */
    uuid?: Maybe<Scalars["String"]>;
  };

/** The 'Personal contact form' bundle of the 'Contact message' entity type. */
export type ContactMessagePersonalEntityAccessArgs = {
  operation: Scalars["String"];
};

/** The 'Personal contact form' bundle of the 'Contact message' entity type. */
export type ContactMessagePersonalEntityChangedArgs = {
  format?: InputMaybe<Scalars["String"]>;
};

/** The 'Personal contact form' bundle of the 'Contact message' entity type. */
export type ContactMessagePersonalEntityCreatedArgs = {
  format?: InputMaybe<Scalars["String"]>;
};

/** The 'Personal contact form' bundle of the 'Contact message' entity type. */
export type ContactMessagePersonalEntityQueryExclusiveArgs = {
  bundles?: InputMaybe<EntityQueryBundleMode>;
  filter?: InputMaybe<EntityQueryFilterInput>;
  limit?: InputMaybe<Scalars["Int"]>;
  offset?: InputMaybe<Scalars["Int"]>;
  revisions?: InputMaybe<EntityQueryRevisionMode>;
  sort?: InputMaybe<Array<InputMaybe<EntityQuerySortInput>>>;
};

/** The 'Personal contact form' bundle of the 'Contact message' entity type. */
export type ContactMessagePersonalEntityTranslationArgs = {
  language: LanguageId;
};

/** The 'Personal contact form' bundle of the 'Contact message' entity type. */
export type ContactMessagePersonalQueryContactFormArgs = {
  filter?: InputMaybe<EntityQueryFilterInput>;
  limit?: InputMaybe<Scalars["Int"]>;
  offset?: InputMaybe<Scalars["Int"]>;
  revisions?: InputMaybe<EntityQueryRevisionMode>;
  sort?: InputMaybe<Array<InputMaybe<EntityQuerySortInput>>>;
};

/** The 'Personal contact form' bundle of the 'Contact message' entity type. */
export type ContactMessagePersonalQueryRecipientArgs = {
  filter?: InputMaybe<EntityQueryFilterInput>;
  limit?: InputMaybe<Scalars["Int"]>;
  offset?: InputMaybe<Scalars["Int"]>;
  revisions?: InputMaybe<EntityQueryRevisionMode>;
  sort?: InputMaybe<Array<InputMaybe<EntityQuerySortInput>>>;
};

export type Cover = {
  __typename?: "Cover";
  detail?: Maybe<Scalars["String"]>;
  detail42?: Maybe<Scalars["String"]>;
  detail117?: Maybe<Scalars["String"]>;
  detail207?: Maybe<Scalars["String"]>;
  detail500?: Maybe<Scalars["String"]>;
  thumbnail?: Maybe<Scalars["String"]>;
};

export type Creator = {
  __typename?: "Creator";
  description: Scalars["String"];
  functionCode: Scalars["String"];
  functionPlural: Scalars["String"];
  functionSingular: Scalars["String"];
  imageUrl?: Maybe<Scalars["String"]>;
  name: Scalars["String"];
  type: Scalars["String"];
};

export type Dk5 = {
  __typename?: "DK5";
  searchCode: Scalars["String"];
  searchString: Scalars["String"];
  value: Scalars["String"];
};

export type DataCollectExampleInput = {
  example: Scalars["String"];
  session_id: Scalars["String"];
};

export type DataCollectInput = {
  example?: InputMaybe<DataCollectExampleInput>;
  recommender_click?: InputMaybe<DataCollectRecommenderClickInput>;
  search?: InputMaybe<DataCollectSearchInput>;
  search_work?: InputMaybe<DataCollectSearchWorkInput>;
  suggest_click?: InputMaybe<DataCollectSuggestClickInput>;
  suggest_presented?: InputMaybe<DataCollectSuggestPresentedInput>;
};

export type DataCollectRecommenderClickInput = {
  recommender_based_on: Scalars["String"];
  recommender_click_hit: Scalars["Int"];
  recommender_click_reader: Scalars["String"];
  recommender_click_work: Scalars["String"];
  recommender_shown_recommendations: Array<Scalars["String"]>;
  session_id: Scalars["String"];
};

export type DataCollectSearchInput = {
  search_request: DataCollectSearchRequest;
  session_id: Scalars["String"];
};

export type DataCollectSearchRequest = {
  filters?: InputMaybe<SearchFilters>;
  q: SearchQuery;
};

export type DataCollectSearchWorkInput = {
  search_query_hit: Scalars["Int"];
  search_query_work: Scalars["String"];
  search_request: DataCollectSearchRequest;
  session_id: Scalars["String"];
};

export type DataCollectSuggestClickInput = {
  session_id: Scalars["String"];
  suggest_query: Scalars["String"];
  suggest_query_hit: Scalars["Int"];
  suggest_query_request_types: Array<Scalars["String"]>;
  suggest_query_result: DataCollectSuggestionInput;
};

export type DataCollectSuggestPresentedInput = {
  session_id: Scalars["String"];
  suggest_query: Scalars["String"];
  suggest_query_request_types: Array<Scalars["String"]>;
  suggest_query_results: Array<DataCollectSuggestionInput>;
};

export type DataCollectSuggestionInput = {
  type: Scalars["String"];
  value: Scalars["String"];
};

export type Debt = {
  __typename?: "Debt";
  amount: Scalars["String"];
  creator?: Maybe<Scalars["String"]>;
  currency?: Maybe<Scalars["String"]>;
  date?: Maybe<Scalars["DateTime"]>;
  title?: Maybe<Scalars["String"]>;
};

export type DefaultInternalUrl = InternalUrl &
  Url & {
    __typename?: "DefaultInternalUrl";
    blocksByRegion?: Maybe<Array<Maybe<Entity>>>;
    breadcrumb?: Maybe<Array<Maybe<Link>>>;
    currentUserContext?: Maybe<DrupalUser>;
    languageInterfaceContext?: Maybe<Language>;
    languageSwitchLinks?: Maybe<Array<Maybe<LanguageSwitchLink>>>;
    nodeContext?: Maybe<Node>;
    /** The processed url path. */
    path?: Maybe<Scalars["String"]>;
    /** The url's path alias if any. */
    pathAlias?: Maybe<Scalars["String"]>;
    /** The route's internal path. */
    pathInternal?: Maybe<Scalars["String"]>;
    request?: Maybe<InternalResponse>;
    /** Boolean indicating whether this is a routed (internal) path. */
    routed?: Maybe<Scalars["Boolean"]>;
    /** The translated url object. */
    translate?: Maybe<Url>;
  };

export type DefaultInternalUrlBlocksByRegionArgs = {
  region: Scalars["String"];
};

export type DefaultInternalUrlLanguageSwitchLinksArgs = {
  language?: InputMaybe<LanguageId>;
};

export type DefaultInternalUrlTranslateArgs = {
  language: LanguageId;
};

export type DetailedHoldings = {
  __typename?: "DetailedHoldings";
  agencyHoldings?: Maybe<Array<Maybe<AgencyHolding>>>;
  branchId?: Maybe<Scalars["String"]>;
  count: Scalars["Int"];
  expectedDelivery?: Maybe<Scalars["String"]>;
  holdingItems?: Maybe<Array<Maybe<Status>>>;
  lamp?: Maybe<Lamp>;
};

export type DigitalCopy = {
  __typename?: "DigitalCopy";
  issn: Scalars["String"];
};

export type DraftAccess =
  | DraftDigitalArticleService
  | DraftEreol
  | DraftIll
  | DraftInfomediaService
  | DraftUrl;

export type DraftAccessType = {
  __typename?: "Draft_AccessType";
  code: DraftAccessTypeCode;
  display: Scalars["String"];
};

export enum DraftAccessTypeCode {
  Fysisk = "FYSISK",
  Online = "ONLINE",
  Ukendt = "UKENDT"
}

export type DraftAudience = {
  __typename?: "Draft_Audience";
  /** Range of numbers with either beginning of range or end of range or both e.g. 6-10, 1980-1999 */
  ages: Array<DraftRange>;
  /** Is this material for children or adults */
  childrenOrAdults: Array<DraftChildOrAdult>;
  /** Appropriate audience for this manifestation */
  generalAudience: Array<Scalars["String"]>;
  /** LET number of this manifestion, defines the reability level, LET stands for læseegnethedstal */
  let?: Maybe<Scalars["String"]>;
  /** Appropriate audience as recommended by the library */
  libraryRecommendation?: Maybe<Scalars["String"]>;
  /** Lix number of this manifestion, defines the reability level, Lix stands for læsbarhedsindex */
  lix?: Maybe<Scalars["String"]>;
  /** Primary target audience for this manifestation */
  primaryTarget: Array<Scalars["String"]>;
  /** Is this material for use in schools (folkeskole/ungdomsuddannelse) or is this material for use in schools by the teacher (folkeskole only) */
  schoolUse: Array<DraftSchoolUse>;
};

export type DraftChildOrAdult = {
  __typename?: "Draft_ChildOrAdult";
  code: DraftChildOrAdultCode;
  display: Scalars["String"];
};

export enum DraftChildOrAdultCode {
  ForAdults = "FOR_ADULTS",
  ForChildren = "FOR_CHILDREN"
}

export type DraftClassification = {
  __typename?: "Draft_Classification";
  /** The classification code */
  code: Scalars["String"];
  /** Descriptive text for the classification code (DK5 only) */
  display: Scalars["String"];
  /** For DK5 only. The DK5 entry type: main entry, national entry, or additional entry */
  entryType?: Maybe<DraftEntryType>;
  /** Name of the classification system */
  system: Scalars["String"];
};

export type DraftCorporation = DraftCreator &
  DraftSubject & {
    __typename?: "Draft_Corporation";
    /** Added information about the corporation, like M. Folmer Andersen (firma) */
    attributeToName?: Maybe<Scalars["String"]>;
    /** The full corporation or conference name */
    display: Scalars["String"];
    /** Location or jurisdiction of the corporation or conference, like Københavns Kommune, Statistisk Kontor */
    location?: Maybe<Scalars["String"]>;
    /** Main corporation or conference */
    main?: Maybe<Scalars["String"]>;
    /** The full corporation or conference name to sort after */
    nameSort: Scalars["String"];
    /** Number of the conference */
    number?: Maybe<Scalars["String"]>;
    /** A list of which kinds of contributions this corporation made to this creation */
    roles: Array<DraftRole>;
    /** Sub corporation or conference/meeting */
    sub?: Maybe<Scalars["String"]>;
    /** Year of the conference */
    year?: Maybe<Scalars["String"]>;
  };

export type DraftCreator = {
  /** Name of the creator */
  display: Scalars["String"];
  /** Name of the creator which can be used to sort after  */
  nameSort: Scalars["String"];
};

export type DraftDk5MainEntry = {
  __typename?: "Draft_DK5MainEntry";
  /** Main DK5 classification code */
  code: Scalars["String"];
  /** Displayable main DK5 classification */
  display: Scalars["String"];
};

export type DraftDigitalArticleService = {
  __typename?: "Draft_DigitalArticleService";
  /** Issn which can be used to order article through Digital Article Service */
  issn: Scalars["String"];
  /** Is true when access token belongs to a user whose municipality of residence is subscribed to Digital Article Service   */
  subscribed: Scalars["Boolean"];
};

export type DraftDigitalArticleServiceResponse = {
  __typename?: "Draft_DigitalArticleServiceResponse";
  msg: Scalars["String"];
};

export type DraftEdition = {
  __typename?: "Draft_Edition";
  /** Quotation of contributor statements related to the edition */
  contributors: Array<Scalars["String"]>;
  /** The edition number and name */
  edition?: Maybe<Scalars["String"]>;
  /** A year as displayable text and as number */
  publicationYear?: Maybe<DraftPublicationYear>;
  /** Properties 'edition', 'contributorsToEdition' and 'publicationYear' as one string, e.g.: '3. udgave, revideret af Hugin Eide, 2005' */
  summary: Scalars["String"];
};

export enum DraftEntryType {
  AdditionalEntry = "ADDITIONAL_ENTRY",
  MainEntry = "MAIN_ENTRY",
  NationalBibliographyEntry = "NATIONAL_BIBLIOGRAPHY_ENTRY"
}

export type DraftEreol = {
  __typename?: "Draft_Ereol";
  /** Is this a manifestation that always can be loaned on ereolen.dk even if you've run out of loans this month */
  canAlwaysBeLoaned: Scalars["Boolean"];
  /** The origin, e.g. "Ereolen" or "Ereolen Go" */
  origin: Scalars["String"];
  /** The url where manifestation is located */
  url: Scalars["String"];
};

export type DraftExternalReview = DraftReview & {
  __typename?: "Draft_ExternalReview";
  author?: Maybe<Scalars["String"]>;
  date?: Maybe<Scalars["String"]>;
  rating?: Maybe<Scalars["String"]>;
  urls: Array<DraftUrl>;
};

export type DraftFictionNonfiction = {
  __typename?: "Draft_FictionNonfiction";
  /** Binary code fiction/nonfiction used for filtering */
  code: DraftFictionNonfictionCode;
  /** Displayable overall category/genre. In Danish skønlitteratur/faglitteratur for literature, fiktion/nonfiktion for other types. */
  display: Scalars["String"];
};

export enum DraftFictionNonfictionCode {
  Fiction = "FICTION",
  Nonfiction = "NONFICTION",
  NotSpecified = "NOT_SPECIFIED"
}

export type DraftGeneralSeries = {
  __typename?: "Draft_GeneralSeries";
  /** The number in the series as text quotation and a number */
  numberInSeries?: Maybe<DraftNumberInSeries>;
  /** A parallel title to the main 'title' of the series, in a different language */
  parallelTitles: Array<Scalars["String"]>;
  /** The title of the series */
  title: Scalars["String"];
  /** Works in the series */
  works: Array<Work>;
};

export type DraftHostPublication = {
  __typename?: "Draft_HostPublication";
  /** Creator of the host publication if host publication is book */
  creator?: Maybe<Scalars["String"]>;
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
  series?: Maybe<DraftGeneralSeries>;
  /** All details about the publication this manifestation can be found in */
  summary: Scalars["String"];
  /** Publication this manifestation can be found in */
  title: Scalars["String"];
  /** The publication year of the publication this manifestation can be found in */
  year?: Maybe<DraftPublicationYear>;
};

export type DraftIdentifier = {
  __typename?: "Draft_Identifier";
  /** The type of identifier */
  type: IdentifierType;
  /** The actual identifier */
  value: Scalars["String"];
};

export type DraftIll = {
  __typename?: "Draft_Ill";
  /** Is true when manifestation can be borrowed via ill */
  ill: Scalars["Boolean"];
};

export type DraftInfomediaReview = DraftReview & {
  __typename?: "Draft_InfomediaReview";
  author?: Maybe<Scalars["String"]>;
  date?: Maybe<Scalars["String"]>;
  id: Scalars["String"];
  origin?: Maybe<Scalars["String"]>;
  rating?: Maybe<Scalars["String"]>;
};

export type DraftInfomediaService = {
  __typename?: "Draft_InfomediaService";
  /** Infomedia ID which can be used to fetch article through Infomedia Service */
  id: Scalars["String"];
};

export type DraftLanguage = {
  __typename?: "Draft_Language";
  /** Language as displayable text */
  display: Scalars["String"];
  /** ISO639-2 language code */
  isoCode: Scalars["String"];
};

export type DraftLanguages = {
  __typename?: "Draft_Languages";
  /** Summary/abstract languages of this manifestation, if the manifestation contains short summaries of the content in another language */
  abstract?: Maybe<Array<DraftLanguage>>;
  /** Main language of this manifestation */
  main?: Maybe<Array<DraftLanguage>>;
  /** Original language of this manifestation */
  original?: Maybe<Array<DraftLanguage>>;
  /** Parallel languages of this manifestation, if more languages are printed in the same book */
  parallel?: Maybe<Array<DraftLanguage>>;
  /** Spoken language in this manifestation e.g. dubbed/syncronized language in movie */
  spoken?: Maybe<Array<DraftLanguage>>;
  /** Subtitles in this manifestation */
  subtitles?: Maybe<Array<DraftLanguage>>;
};

export type DraftLibrariansReview = DraftReview & {
  __typename?: "Draft_LibrariansReview";
  author?: Maybe<Scalars["String"]>;
  date?: Maybe<Scalars["String"]>;
  /**  This is a pid  */
  id: Scalars["String"];
  sections: Array<TextWithWork>;
};

export type DraftManifestation = {
  __typename?: "Draft_Manifestation";
  /** Abstract of the entity */
  abstract: Array<Scalars["String"]>;
  /** Different options to access manifestation */
  access: Array<DraftAccess>;
  /** Access type of this manifestation */
  accessTypes: Array<DraftAccessType>;
  /** Different kinds of definitions of appropriate audience for this manifestation */
  audience?: Maybe<DraftAudience>;
  /** Classification codes for this manifestation from any classification system */
  classifications: Array<DraftClassification>;
  /** Contributors to the manifestation, actors, illustrators etc */
  contributors: Array<DraftCreator>;
  /** Additional contributors of this manifestation as described on the publication. E.g. 'på dansk ved Vivi Berendt' */
  contributorsFromDescription: Array<Scalars["String"]>;
  /** Primary creators of the manifestation e.g. authors, directors, musicians etc */
  creators: Array<DraftCreator>;
  /** Additional creators of this manifestation as described on the publication. E.g. 'tekst af William Warren' */
  creatorsFromDescription: Array<Scalars["String"]>;
  /** Edition details for this manifestation */
  edition: DraftEdition;
  /** Overall literary category/genre of this manifestation. e.g. fiction or nonfiction. In Danish skønlitteratur/faglitteratur for literature, fiktion/nonfiktion for other types. */
  fictionNonfiction?: Maybe<DraftFictionNonfiction>;
  /** The genre, (literary) form, type etc. of this manifestation */
  genreAndForm: Array<Scalars["String"]>;
  /** Details about the host publications of this manifestation */
  hostPublication?: Maybe<DraftHostPublication>;
  /** Identifiers for this manifestation - often used for search indexes */
  identifiers: Array<DraftIdentifier>;
  /** Languages in this manifestation */
  languages?: Maybe<DraftLanguages>;
  /** Details about the latest printing of this manifestation */
  latestPrinting?: Maybe<DraftPrinting>;
  /** Tracks on music album, sheet music content, or articles/short stories etc. in this manifestation */
  manifestationParts?: Maybe<DraftManifestationParts>;
  /** The type of material of the manifestation based on bibliotek.dk types */
  materialTypes: DraftMaterialTypes;
  /** Notes about the manifestation */
  notes: Array<DraftNote>;
  /** Physical description of this manifestation like extent (pages/minutes), illustrations etc. */
  physicalDescriptions: Array<DraftPhysicalDescription>;
  /** Unique identification of the manifestation e.g 870970-basis:54029519 */
  pid: Scalars["String"];
  /** The publication year of the manifestation - OBS! was datePublished */
  publicationYear: DraftPublicationYear2;
  /** Publisher of this manifestion */
  publisher: Array<Scalars["String"]>;
  /** The creation date of the record describing this manifestation in the format YYYYMMDD */
  recordCreationDate: Scalars["String"];
  /** Notes about relations to this book/periodical/journal, - like previous names or related journals */
  relatedPublications: Array<DraftRelatedPublication>;
  /** Series for this work */
  series?: Maybe<DraftSeriesContainer>;
  /** Information about on which shelf in the library this manifestation can be found */
  shelfmark?: Maybe<DraftShelfmark>;
  /** The source of the manifestation, e.g. own library catalogue (Bibliotekskatalog) or online source e.g. Filmstriben, Ebook Central, eReolen Global etc. */
  source: Array<Scalars["String"]>;
  /** Subjects for this manifestation */
  subjects: DraftSubjectContainer;
  /** Quotation of the manifestation's table of contents or a similar content list */
  tableOfContents?: Maybe<DraftTableOfContent>;
  /** Different kinds of titles for this work */
  titles: DraftManifestationTitles;
  /** Information about on which volume this manifestation is in multi volume work */
  volume?: Maybe<Scalars["String"]>;
};

export type DraftManifestationPart = {
  __typename?: "Draft_ManifestationPart";
  /** Classification of this entry (music track or literary analysis) */
  classifications: Array<DraftClassification>;
  /** The creator of the music track or literary analysis */
  creators: Array<DraftCreator>;
  /** Additional creator or contributor to this entry (music track or literary analysis) as described on the publication. E.g. 'arr.: H. Cornell' */
  creatorsFromDescription: Array<Scalars["String"]>;
  /** Subjects of this entry (music track or literary analysis) */
  subjects?: Maybe<Array<DraftSubject>>;
  /** The title of the entry (music track or title of a literary analysis) */
  title: Scalars["String"];
};

export enum DraftManifestationPartType {
  MusicTracks = "MUSIC_TRACKS",
  NotSpecified = "NOT_SPECIFIED",
  PartsOfBook = "PARTS_OF_BOOK",
  SheetMusicContent = "SHEET_MUSIC_CONTENT"
}

export type DraftManifestationParts = {
  __typename?: "Draft_ManifestationParts";
  /** Heading for the music content note */
  heading?: Maybe<Scalars["String"]>;
  /** The creator and title etc of the individual parts */
  parts: Array<DraftManifestationPart>;
  /** The type of manifestation parts, is this music tracks, book parts etc. */
  type: DraftManifestationPartType;
};

export type DraftManifestationTitles = {
  __typename?: "Draft_ManifestationTitles";
  /** Alternative titles for this manifestation e.g. a title in a different language */
  alternative: Array<Scalars["String"]>;
  /** The full title(s) of the work including subtitles etc */
  full: Array<Scalars["String"]>;
  /** Information that distinguishes this manifestation from a similar manifestation with same title, e.g. 'illustrated by Ted Kirby' */
  identifyingAddition?: Maybe<Scalars["String"]>;
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
  /** Danish translation of the main title */
  translated?: Maybe<Array<Scalars["String"]>>;
};

export type DraftManifestations = {
  __typename?: "Draft_Manifestations";
  all: Array<DraftManifestation>;
  first: DraftManifestation;
  latest: DraftManifestation;
};

export type DraftMaterialTypes = {
  __typename?: "Draft_MaterialTypes";
  /** The general type of material of the manifestation based on a grouping of bibliotek.dk material types, e.g. bøger, lydbøger etc.  */
  general: Array<Scalars["String"]>;
  /** The type of material of the manifestation based on bibliotek.dk types */
  specific: Array<Scalars["String"]>;
};

export type DraftNote = {
  __typename?: "Draft_Note";
  /** The actual notes */
  display: Array<Scalars["String"]>;
  /** Heading before note */
  heading?: Maybe<Scalars["String"]>;
  /** The type of note - e.g. note about language, genre etc, NOT_SPECIFIED if not known.  */
  type: DraftNoteType;
};

export enum DraftNoteType {
  ConnectionToOtherWorks = "CONNECTION_TO_OTHER_WORKS",
  DescriptionOfMaterial = "DESCRIPTION_OF_MATERIAL",
  Dissertation = "DISSERTATION",
  Language = "LANGUAGE",
  MusicalEnsembleOrCast = "MUSICAL_ENSEMBLE_OR_CAST",
  NotSpecified = "NOT_SPECIFIED",
  OccasionForPublication = "OCCASION_FOR_PUBLICATION",
  OriginalTitle = "ORIGINAL_TITLE",
  OriginalVersion = "ORIGINAL_VERSION",
  References = "REFERENCES",
  RestrictionsOnUse = "RESTRICTIONS_ON_USE"
}

export type DraftNumberInSeries = {
  __typename?: "Draft_NumberInSeries";
  /** The number in the series as text, quoted form the publication, e.g. 'Vol. IX' */
  display: Scalars["String"];
  /** The number in the series as integer */
  number: Scalars["Int"];
};

export type DraftPerson = DraftCreator &
  DraftSubject & {
    __typename?: "Draft_Person";
    /** Creator aliases, creators behind used pseudonym */
    aliases: Array<DraftPerson>;
    /** Added information about the person, like Henri, konge af Frankrig */
    attributeToName?: Maybe<Scalars["String"]>;
    /** Birth year of the person */
    birthYear?: Maybe<Scalars["String"]>;
    /** The person's whole name in normal order */
    display: Scalars["String"];
    /** First name of the person */
    firstName?: Maybe<Scalars["String"]>;
    /** Last name of the person */
    lastName?: Maybe<Scalars["String"]>;
    /** The person's full name inverted */
    nameSort: Scalars["String"];
    /** A list of which kinds of contributions this person made to this creation */
    roles: Array<DraftRole>;
    /** A roman numeral added to the person, like Christian IV */
    romanNumeral?: Maybe<Scalars["String"]>;
  };

export type DraftPhysicalDescription = {
  __typename?: "Draft_PhysicalDescription";
  /** Material that comes with the manifestation (bilag) */
  accompanyingMaterial?: Maybe<Scalars["String"]>;
  /** Additional physical description of the manifestation (e.g illustrations etc) */
  additionalDescription?: Maybe<Scalars["String"]>;
  /** Extent of the manifestation like pages and number of items */
  extent?: Maybe<Scalars["String"]>;
  /** Number of pages of the manifestation as number */
  numberOfPages?: Maybe<Scalars["Int"]>;
  /** Number of units, like 3 cassettes, or 1 score etc. */
  numberOfUnits?: Maybe<Scalars["Int"]>;
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

export type DraftPopularSeries = {
  __typename?: "Draft_PopularSeries";
  /** A alternative title to the main 'title' of the series */
  alternativeTitles: Array<Scalars["String"]>;
  /** The number in the series as text qoutation and a number */
  numberInSeries?: Maybe<DraftNumberInSeries>;
  /** Information about whether this work in the series should be read first */
  readThisFirst?: Maybe<Scalars["Boolean"]>;
  /** Information about whether this work in the series can be read without considering the order of the series, it can be read at any time */
  readThisWhenever?: Maybe<Scalars["Boolean"]>;
  /** The title of the series */
  title: Scalars["String"];
  /** Works in the series */
  works: Array<Work>;
};

export type DraftPrinting = {
  __typename?: "Draft_Printing";
  /** The printing number and name */
  printing: Scalars["String"];
  /** A year as displayable text and as number */
  publicationYear?: Maybe<DraftPublicationYear>;
  /** Properties 'printing' and 'publicationYear' as one string, e.g.: '11. oplag, 2020' */
  summary: Scalars["String"];
};

export type DraftPublicationYear = {
  __typename?: "Draft_PublicationYear";
  display: Scalars["String"];
  endYear?: Maybe<Scalars["Int"]>;
  frequency?: Maybe<Scalars["String"]>;
  year?: Maybe<Scalars["Int"]>;
};

export type DraftPublicationYear2 = {
  __typename?: "Draft_PublicationYear2";
  display: Scalars["String"];
  endYear?: Maybe<Scalars["Int"]>;
  frequency?: Maybe<Scalars["String"]>;
  year?: Maybe<Scalars["Int"]>;
};

export type DraftQuery = {
  __typename?: "Draft_Query";
  manifestation?: Maybe<DraftManifestation>;
  manifestations: Array<Maybe<DraftManifestation>>;
  /** Get recommendations based on a pid */
  recommend: DraftRecommendationResponse;
  suggest: DraftSuggestResponse;
  work?: Maybe<DraftWork>;
  works: Array<Maybe<DraftWork>>;
};

export type DraftQueryManifestationArgs = {
  faust?: InputMaybe<Scalars["String"]>;
  pid?: InputMaybe<Scalars["String"]>;
};

export type DraftQueryManifestationsArgs = {
  faust?: InputMaybe<Array<Scalars["String"]>>;
  pid?: InputMaybe<Array<Scalars["String"]>>;
};

export type DraftQueryRecommendArgs = {
  pid: Scalars["String"];
};

export type DraftQuerySuggestArgs = {
  q: Scalars["String"];
  suggestType?: InputMaybe<DraftSuggestionType>;
  workType?: InputMaybe<WorkType>;
};

export type DraftQueryWorkArgs = {
  faust?: InputMaybe<Scalars["String"]>;
  id?: InputMaybe<Scalars["String"]>;
  pid?: InputMaybe<Scalars["String"]>;
};

export type DraftQueryWorksArgs = {
  faust?: InputMaybe<Array<Scalars["String"]>>;
  id?: InputMaybe<Array<Scalars["String"]>>;
  pid?: InputMaybe<Array<Scalars["String"]>>;
};

export type DraftRange = {
  __typename?: "Draft_Range";
  begin?: Maybe<Scalars["Int"]>;
  display: Scalars["String"];
  end?: Maybe<Scalars["Int"]>;
};

export type DraftRecommendation = {
  __typename?: "Draft_Recommendation";
  /** The recommended manifestation */
  manifestation: DraftManifestation;
  /** The recommended work */
  work: DraftWork;
};

export type DraftRecommendationResponse = {
  __typename?: "Draft_RecommendationResponse";
  result: Array<DraftRecommendation>;
};

export type DraftRelatedPublication = {
  __typename?: "Draft_RelatedPublication";
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

export type DraftReview = {
  author?: Maybe<Scalars["String"]>;
  date?: Maybe<Scalars["String"]>;
};

export type DraftRole = {
  __typename?: "Draft_Role";
  /** The type of creator/contributor as text in singular and plural in Danish, e.g. forfatter/forfattere, komponist/komponister etc */
  function: DraftTranslation;
  /** The code for the type of creator or contributor, e.g. 'aut' for author, 'ill' for illustrator etc */
  functionCode: Scalars["String"];
};

export type DraftSchoolUse = {
  __typename?: "Draft_SchoolUse";
  code: DraftSchoolUseCode;
  display: Scalars["String"];
};

export enum DraftSchoolUseCode {
  ForSchoolUse = "FOR_SCHOOL_USE",
  ForTeacher = "FOR_TEACHER"
}

export type DraftSeriesContainer = {
  __typename?: "Draft_SeriesContainer";
  all: Array<DraftGeneralSeries>;
  popular: Array<DraftPopularSeries>;
};

export type DraftShelfmark = {
  __typename?: "Draft_Shelfmark";
  /** A prefix to the shelfmark */
  prefix: Scalars["String"];
  /** The actual shelfmark - e.g. information about on which shelf in the library this manifestation can be found */
  shelfmark: Scalars["String"];
};

export type DraftSubject = {
  display: Scalars["String"];
};

export type DraftSubjectContainer = {
  __typename?: "Draft_SubjectContainer";
  /** All subjects */
  all: Array<DraftSubject>;
  /** Only DBC verified subjects */
  dbcVerified: Array<DraftSubject>;
};

export type DraftSubjectText = DraftSubject & {
  __typename?: "Draft_SubjectText";
  display: Scalars["String"];
  type: DraftSubjectType;
};

export enum DraftSubjectType {
  FictionalCharacter = "FICTIONAL_CHARACTER",
  FilmNationality = "FILM_NATIONALITY",
  LibraryOfCongressSubjectHeading = "LIBRARY_OF_CONGRESS_SUBJECT_HEADING",
  Location = "LOCATION",
  MusicalInstrumentation = "MUSICAL_INSTRUMENTATION",
  MusicCountryOfOrigin = "MUSIC_COUNTRY_OF_ORIGIN",
  MusicTimePeriod = "MUSIC_TIME_PERIOD",
  TimePeriod = "TIME_PERIOD",
  Topic = "TOPIC"
}

export type DraftSuggestResponse = {
  __typename?: "Draft_SuggestResponse";
  result: Array<DraftSuggestion>;
};

export type DraftSuggestion = {
  __typename?: "Draft_Suggestion";
  /** The suggested term which can be searched for */
  term: Scalars["String"];
  /** The type of suggestion: creator, subject or title */
  type: DraftSuggestionType;
  /** A work related to the term */
  work?: Maybe<DraftWork>;
};

export enum DraftSuggestionType {
  Creator = "creator",
  Subject = "subject",
  Title = "title"
}

export type DraftTableOfContent = {
  __typename?: "Draft_TableOfContent";
  content?: Maybe<Scalars["String"]>;
  heading?: Maybe<Scalars["String"]>;
  listOfContent?: Maybe<Array<DraftTableOfContent>>;
};

export type DraftTimePeriod = DraftSubject & {
  __typename?: "Draft_TimePeriod";
  display: Scalars["String"];
  period: DraftRange;
};

export type DraftTranslation = {
  __typename?: "Draft_Translation";
  /** Translation in plural form, e.g. forfattere, komponister, instruktører etc. */
  plural: Scalars["String"];
  /** Translation in singular form, e.g. forfatter, komponist, instruktør */
  singular: Scalars["String"];
};

export type DraftUrl = {
  __typename?: "Draft_URL";
  /** The origin, e.g. "DBC Webarkiv" */
  origin: Scalars["String"];
  /** The url where manifestation is located */
  url: Scalars["String"];
};

export type DraftUniverse = {
  __typename?: "Draft_Universe";
  /** Literary/movie universe this work is part of e.g. Wizarding World, Marvel Universe */
  title: Scalars["String"];
};

export type DraftWork = {
  __typename?: "Draft_Work";
  /** Abstract of the entity */
  abstract?: Maybe<Array<Scalars["String"]>>;
  /** Creators */
  creators: Array<DraftCreator>;
  /** DK5 main entry for this work */
  dk5MainEntry?: Maybe<DraftDk5MainEntry>;
  /** Overall literary category/genre of this work. e.g. fiction or nonfiction. In Danish skønlitteratur/faglitteratur for literature, fiktion/nonfiktion for other types. */
  fictionNonfiction?: Maybe<DraftFictionNonfiction>;
  /** The genre, (literary) form, type etc. of this work */
  genreAndForm: Array<Scalars["String"]>;
  /** The main language(s) of the work's content */
  mainLanguages: Array<DraftLanguage>;
  /** Details about the manifestations of this work */
  manifestations: DraftManifestations;
  /** The type of material of the manifestation based on bibliotek.dk types */
  materialTypes: DraftMaterialTypes;
  reviews: Array<DraftReview>;
  /** Series for this work */
  series?: Maybe<DraftSeriesContainer>;
  /** Subjects for this work */
  subjects: DraftSubjectContainer;
  titles: DraftWorkTitles;
  /** Literary/movie universe this work is part of, e.g. Wizarding World, Marvel Universe */
  universe?: Maybe<DraftUniverse>;
  /** Unique identification of the work based on work-presentation id e.g work-of:870970-basis:54029519 */
  workId: Scalars["String"];
  /** Worktypes for this work - 'none' replaced by 'other' */
  workTypes: Array<DraftWorkType>;
  /** The year this work was originally published or produced */
  workYear?: Maybe<Scalars["String"]>;
};

export type DraftWorkTitles = {
  __typename?: "Draft_WorkTitles";
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
  /** Danish translation of the main title */
  translated?: Maybe<Array<Scalars["String"]>>;
};

export enum DraftWorkType {
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

/** The 'User' entity type. */
export type DrupalUser = Entity & {
  __typename?: "DrupalUser";
  /** The time that the user last accessed the site. */
  access?: Maybe<Scalars["Timestamp"]>;
  /** The time that the user was last edited. */
  changed?: Maybe<Scalars["Timestamp"]>;
  /** The time that the user was created. */
  created?: Maybe<Scalars["Timestamp"]>;
  /** A flag indicating whether this is the default translation. */
  defaultLangcode?: Maybe<Scalars["Boolean"]>;
  entityAccess?: Maybe<Scalars["Boolean"]>;
  entityBundle?: Maybe<Scalars["String"]>;
  entityChanged?: Maybe<Scalars["String"]>;
  entityCreated?: Maybe<Scalars["String"]>;
  entityId?: Maybe<Scalars["String"]>;
  entityLabel?: Maybe<Scalars["String"]>;
  entityLanguage?: Maybe<Language>;
  entityQueryExclusive: EntityQueryResult;
  /** Renders 'User' entities in the given view mode. */
  entityRendered?: Maybe<Scalars["String"]>;
  entityTranslation?: Maybe<Entity>;
  entityTranslations?: Maybe<Array<Maybe<Entity>>>;
  entityType?: Maybe<Scalars["String"]>;
  entityUrl?: Maybe<Url>;
  entityUuid?: Maybe<Scalars["String"]>;
  /** The email address used for initial account creation. */
  init?: Maybe<Scalars["String"]>;
  /** The user language code. */
  langcode?: Maybe<FieldUserLangcode>;
  /** The time that the user last logged in. */
  login?: Maybe<Scalars["Timestamp"]>;
  /** The email of this user. */
  mail?: Maybe<Scalars["String"]>;
  /** The name of this user. */
  name?: Maybe<Scalars["String"]>;
  /** The password of this user (hashed). */
  pass?: Maybe<FieldUserPass>;
  /** The user's preferred language code for viewing administration pages. */
  preferredAdminLangcode?: Maybe<FieldUserPreferredAdminLangcode>;
  /** The user's preferred language code for receiving emails and viewing the site. */
  preferredLangcode?: Maybe<FieldUserPreferredLangcode>;
  /** Query reference: The roles the user has. */
  queryRoles?: Maybe<EntityQueryResult>;
  /** Reverse reference: The ID of the recipient user for personal contact messages. */
  reverseRecipientContactMessage: EntityQueryResult;
  /** Reverse reference: The user ID of the author of the current revision. */
  reverseRevisionUidNode: EntityQueryResult;
  /** Reverse reference: The user ID of the author of the current revision. */
  reverseRevisionUserBlockContent: EntityQueryResult;
  /** Reverse reference: The user ID of the author of the current revision. */
  reverseRevisionUserMenuLinkContent: EntityQueryResult;
  /** Reverse reference: The user ID of the author of the current revision. */
  reverseRevisionUserTaxonomyTerm: EntityQueryResult;
  /** Reverse reference: The user ID of the comment author. */
  reverseUidComment: EntityQueryResult;
  /** Reverse reference: The user ID of the file. */
  reverseUidFile: EntityQueryResult;
  /** Reverse reference: The username of the content author. */
  reverseUidNode: EntityQueryResult;
  /** The roles the user has. */
  roles?: Maybe<Array<Maybe<FieldUserRoles>>>;
  /** Whether the user is active or blocked. */
  status?: Maybe<Scalars["Boolean"]>;
  /** The timezone of this user. */
  timezone?: Maybe<Scalars["String"]>;
  /** The user ID. */
  uid?: Maybe<Scalars["Int"]>;
  /** Your virtual face or picture. */
  userPicture?: Maybe<FieldUserUserPicture>;
  /** The user UUID. */
  uuid?: Maybe<Scalars["String"]>;
};

/** The 'User' entity type. */
export type DrupalUserEntityAccessArgs = {
  operation: Scalars["String"];
};

/** The 'User' entity type. */
export type DrupalUserEntityChangedArgs = {
  format?: InputMaybe<Scalars["String"]>;
};

/** The 'User' entity type. */
export type DrupalUserEntityCreatedArgs = {
  format?: InputMaybe<Scalars["String"]>;
};

/** The 'User' entity type. */
export type DrupalUserEntityQueryExclusiveArgs = {
  bundles?: InputMaybe<EntityQueryBundleMode>;
  filter?: InputMaybe<EntityQueryFilterInput>;
  limit?: InputMaybe<Scalars["Int"]>;
  offset?: InputMaybe<Scalars["Int"]>;
  revisions?: InputMaybe<EntityQueryRevisionMode>;
  sort?: InputMaybe<Array<InputMaybe<EntityQuerySortInput>>>;
};

/** The 'User' entity type. */
export type DrupalUserEntityRenderedArgs = {
  mode?: InputMaybe<UserDisplayModeId>;
};

/** The 'User' entity type. */
export type DrupalUserEntityTranslationArgs = {
  language: LanguageId;
};

/** The 'User' entity type. */
export type DrupalUserQueryRolesArgs = {
  filter?: InputMaybe<EntityQueryFilterInput>;
  limit?: InputMaybe<Scalars["Int"]>;
  offset?: InputMaybe<Scalars["Int"]>;
  revisions?: InputMaybe<EntityQueryRevisionMode>;
  sort?: InputMaybe<Array<InputMaybe<EntityQuerySortInput>>>;
};

/** The 'User' entity type. */
export type DrupalUserReverseRecipientContactMessageArgs = {
  filter?: InputMaybe<EntityQueryFilterInput>;
  limit?: InputMaybe<Scalars["Int"]>;
  offset?: InputMaybe<Scalars["Int"]>;
  revisions?: InputMaybe<EntityQueryRevisionMode>;
  sort?: InputMaybe<Array<InputMaybe<EntityQuerySortInput>>>;
};

/** The 'User' entity type. */
export type DrupalUserReverseRevisionUidNodeArgs = {
  filter?: InputMaybe<EntityQueryFilterInput>;
  limit?: InputMaybe<Scalars["Int"]>;
  offset?: InputMaybe<Scalars["Int"]>;
  revisions?: InputMaybe<EntityQueryRevisionMode>;
  sort?: InputMaybe<Array<InputMaybe<EntityQuerySortInput>>>;
};

/** The 'User' entity type. */
export type DrupalUserReverseRevisionUserBlockContentArgs = {
  filter?: InputMaybe<EntityQueryFilterInput>;
  limit?: InputMaybe<Scalars["Int"]>;
  offset?: InputMaybe<Scalars["Int"]>;
  revisions?: InputMaybe<EntityQueryRevisionMode>;
  sort?: InputMaybe<Array<InputMaybe<EntityQuerySortInput>>>;
};

/** The 'User' entity type. */
export type DrupalUserReverseRevisionUserMenuLinkContentArgs = {
  filter?: InputMaybe<EntityQueryFilterInput>;
  limit?: InputMaybe<Scalars["Int"]>;
  offset?: InputMaybe<Scalars["Int"]>;
  revisions?: InputMaybe<EntityQueryRevisionMode>;
  sort?: InputMaybe<Array<InputMaybe<EntityQuerySortInput>>>;
};

/** The 'User' entity type. */
export type DrupalUserReverseRevisionUserTaxonomyTermArgs = {
  filter?: InputMaybe<EntityQueryFilterInput>;
  limit?: InputMaybe<Scalars["Int"]>;
  offset?: InputMaybe<Scalars["Int"]>;
  revisions?: InputMaybe<EntityQueryRevisionMode>;
  sort?: InputMaybe<Array<InputMaybe<EntityQuerySortInput>>>;
};

/** The 'User' entity type. */
export type DrupalUserReverseUidCommentArgs = {
  filter?: InputMaybe<EntityQueryFilterInput>;
  limit?: InputMaybe<Scalars["Int"]>;
  offset?: InputMaybe<Scalars["Int"]>;
  revisions?: InputMaybe<EntityQueryRevisionMode>;
  sort?: InputMaybe<Array<InputMaybe<EntityQuerySortInput>>>;
};

/** The 'User' entity type. */
export type DrupalUserReverseUidFileArgs = {
  filter?: InputMaybe<EntityQueryFilterInput>;
  limit?: InputMaybe<Scalars["Int"]>;
  offset?: InputMaybe<Scalars["Int"]>;
  revisions?: InputMaybe<EntityQueryRevisionMode>;
  sort?: InputMaybe<Array<InputMaybe<EntityQuerySortInput>>>;
};

/** The 'User' entity type. */
export type DrupalUserReverseUidNodeArgs = {
  filter?: InputMaybe<EntityQueryFilterInput>;
  limit?: InputMaybe<Scalars["Int"]>;
  offset?: InputMaybe<Scalars["Int"]>;
  revisions?: InputMaybe<EntityQueryRevisionMode>;
  sort?: InputMaybe<Array<InputMaybe<EntityQuerySortInput>>>;
};

/** Common entity interface containing generic entity properties. */
export type Entity = {
  entityAccess?: Maybe<Scalars["Boolean"]>;
  entityBundle?: Maybe<Scalars["String"]>;
  entityChanged?: Maybe<Scalars["String"]>;
  entityCreated?: Maybe<Scalars["String"]>;
  entityId?: Maybe<Scalars["String"]>;
  entityLabel?: Maybe<Scalars["String"]>;
  entityLanguage?: Maybe<Language>;
  entityQueryExclusive: EntityQueryResult;
  entityTranslation?: Maybe<Entity>;
  entityTranslations?: Maybe<Array<Maybe<Entity>>>;
  entityType?: Maybe<Scalars["String"]>;
  entityUrl?: Maybe<Url>;
  entityUuid?: Maybe<Scalars["String"]>;
};

/** Common entity interface containing generic entity properties. */
export type EntityEntityAccessArgs = {
  operation: Scalars["String"];
};

/** Common entity interface containing generic entity properties. */
export type EntityEntityChangedArgs = {
  format?: InputMaybe<Scalars["String"]>;
};

/** Common entity interface containing generic entity properties. */
export type EntityEntityCreatedArgs = {
  format?: InputMaybe<Scalars["String"]>;
};

/** Common entity interface containing generic entity properties. */
export type EntityEntityQueryExclusiveArgs = {
  bundles?: InputMaybe<EntityQueryBundleMode>;
  filter?: InputMaybe<EntityQueryFilterInput>;
  limit?: InputMaybe<Scalars["Int"]>;
  offset?: InputMaybe<Scalars["Int"]>;
  revisions?: InputMaybe<EntityQueryRevisionMode>;
  sort?: InputMaybe<Array<InputMaybe<EntityQuerySortInput>>>;
};

/** Common entity interface containing generic entity properties. */
export type EntityEntityTranslationArgs = {
  language: LanguageId;
};

/** The canonical entity url. */
export type EntityCanonicalUrl = InternalUrl &
  Url & {
    __typename?: "EntityCanonicalUrl";
    blocksByRegion?: Maybe<Array<Maybe<Entity>>>;
    breadcrumb?: Maybe<Array<Maybe<Link>>>;
    currentUserContext?: Maybe<DrupalUser>;
    /** The entity belonging to the current url. */
    entity?: Maybe<Entity>;
    languageInterfaceContext?: Maybe<Language>;
    languageSwitchLinks?: Maybe<Array<Maybe<LanguageSwitchLink>>>;
    nodeContext?: Maybe<Node>;
    /** The processed url path. */
    path?: Maybe<Scalars["String"]>;
    /** The url's path alias if any. */
    pathAlias?: Maybe<Scalars["String"]>;
    /** The route's internal path. */
    pathInternal?: Maybe<Scalars["String"]>;
    request?: Maybe<InternalResponse>;
    /** Boolean indicating whether this is a routed (internal) path. */
    routed?: Maybe<Scalars["Boolean"]>;
    /** The translated url object. */
    translate?: Maybe<Url>;
  };

/** The canonical entity url. */
export type EntityCanonicalUrlBlocksByRegionArgs = {
  region: Scalars["String"];
};

/** The canonical entity url. */
export type EntityCanonicalUrlLanguageSwitchLinksArgs = {
  language?: InputMaybe<LanguageId>;
};

/** The canonical entity url. */
export type EntityCanonicalUrlTranslateArgs = {
  language: LanguageId;
};

export type EntityCrudOutput = {
  __typename?: "EntityCrudOutput";
  entity?: Maybe<Entity>;
  errors?: Maybe<Array<Maybe<Scalars["String"]>>>;
  violations?: Maybe<Array<Maybe<ConstraintViolation>>>;
};

/** Common interface for entities that are describable. */
export type EntityDescribable = {
  entityAccess?: Maybe<Scalars["Boolean"]>;
  entityBundle?: Maybe<Scalars["String"]>;
  entityChanged?: Maybe<Scalars["String"]>;
  entityCreated?: Maybe<Scalars["String"]>;
  entityDescription?: Maybe<Scalars["String"]>;
  entityId?: Maybe<Scalars["String"]>;
  entityLabel?: Maybe<Scalars["String"]>;
  entityLanguage?: Maybe<Language>;
  entityQueryExclusive: EntityQueryResult;
  entityTranslation?: Maybe<Entity>;
  entityTranslations?: Maybe<Array<Maybe<Entity>>>;
  entityType?: Maybe<Scalars["String"]>;
  entityUrl?: Maybe<Url>;
  entityUuid?: Maybe<Scalars["String"]>;
};

/** Common interface for entities that are describable. */
export type EntityDescribableEntityAccessArgs = {
  operation: Scalars["String"];
};

/** Common interface for entities that are describable. */
export type EntityDescribableEntityChangedArgs = {
  format?: InputMaybe<Scalars["String"]>;
};

/** Common interface for entities that are describable. */
export type EntityDescribableEntityCreatedArgs = {
  format?: InputMaybe<Scalars["String"]>;
};

/** Common interface for entities that are describable. */
export type EntityDescribableEntityQueryExclusiveArgs = {
  bundles?: InputMaybe<EntityQueryBundleMode>;
  filter?: InputMaybe<EntityQueryFilterInput>;
  limit?: InputMaybe<Scalars["Int"]>;
  offset?: InputMaybe<Scalars["Int"]>;
  revisions?: InputMaybe<EntityQueryRevisionMode>;
  sort?: InputMaybe<Array<InputMaybe<EntityQuerySortInput>>>;
};

/** Common interface for entities that are describable. */
export type EntityDescribableEntityTranslationArgs = {
  language: LanguageId;
};

/** Common interface for entities that have a owner. */
export type EntityOwnable = {
  entityAccess?: Maybe<Scalars["Boolean"]>;
  entityBundle?: Maybe<Scalars["String"]>;
  entityChanged?: Maybe<Scalars["String"]>;
  entityCreated?: Maybe<Scalars["String"]>;
  entityId?: Maybe<Scalars["String"]>;
  entityLabel?: Maybe<Scalars["String"]>;
  entityLanguage?: Maybe<Language>;
  entityOwner?: Maybe<DrupalUser>;
  entityQueryExclusive: EntityQueryResult;
  entityTranslation?: Maybe<Entity>;
  entityTranslations?: Maybe<Array<Maybe<Entity>>>;
  entityType?: Maybe<Scalars["String"]>;
  entityUrl?: Maybe<Url>;
  entityUuid?: Maybe<Scalars["String"]>;
};

/** Common interface for entities that have a owner. */
export type EntityOwnableEntityAccessArgs = {
  operation: Scalars["String"];
};

/** Common interface for entities that have a owner. */
export type EntityOwnableEntityChangedArgs = {
  format?: InputMaybe<Scalars["String"]>;
};

/** Common interface for entities that have a owner. */
export type EntityOwnableEntityCreatedArgs = {
  format?: InputMaybe<Scalars["String"]>;
};

/** Common interface for entities that have a owner. */
export type EntityOwnableEntityQueryExclusiveArgs = {
  bundles?: InputMaybe<EntityQueryBundleMode>;
  filter?: InputMaybe<EntityQueryFilterInput>;
  limit?: InputMaybe<Scalars["Int"]>;
  offset?: InputMaybe<Scalars["Int"]>;
  revisions?: InputMaybe<EntityQueryRevisionMode>;
  sort?: InputMaybe<Array<InputMaybe<EntityQuerySortInput>>>;
};

/** Common interface for entities that have a owner. */
export type EntityOwnableEntityTranslationArgs = {
  language: LanguageId;
};

/** Common interface for entities that are publishable. */
export type EntityPublishable = {
  entityAccess?: Maybe<Scalars["Boolean"]>;
  entityBundle?: Maybe<Scalars["String"]>;
  entityChanged?: Maybe<Scalars["String"]>;
  entityCreated?: Maybe<Scalars["String"]>;
  entityId?: Maybe<Scalars["String"]>;
  entityLabel?: Maybe<Scalars["String"]>;
  entityLanguage?: Maybe<Language>;
  entityPublished?: Maybe<Scalars["Boolean"]>;
  entityQueryExclusive: EntityQueryResult;
  entityTranslation?: Maybe<Entity>;
  entityTranslations?: Maybe<Array<Maybe<Entity>>>;
  entityType?: Maybe<Scalars["String"]>;
  entityUrl?: Maybe<Url>;
  entityUuid?: Maybe<Scalars["String"]>;
};

/** Common interface for entities that are publishable. */
export type EntityPublishableEntityAccessArgs = {
  operation: Scalars["String"];
};

/** Common interface for entities that are publishable. */
export type EntityPublishableEntityChangedArgs = {
  format?: InputMaybe<Scalars["String"]>;
};

/** Common interface for entities that are publishable. */
export type EntityPublishableEntityCreatedArgs = {
  format?: InputMaybe<Scalars["String"]>;
};

/** Common interface for entities that are publishable. */
export type EntityPublishableEntityQueryExclusiveArgs = {
  bundles?: InputMaybe<EntityQueryBundleMode>;
  filter?: InputMaybe<EntityQueryFilterInput>;
  limit?: InputMaybe<Scalars["Int"]>;
  offset?: InputMaybe<Scalars["Int"]>;
  revisions?: InputMaybe<EntityQueryRevisionMode>;
  sort?: InputMaybe<Array<InputMaybe<EntityQuerySortInput>>>;
};

/** Common interface for entities that are publishable. */
export type EntityPublishableEntityTranslationArgs = {
  language: LanguageId;
};

export enum EntityQueryBundleMode {
  /** Loads entities across all bundles. */
  All = "ALL",
  /** Loads only entities that share the same bundle with the parent entity. */
  Same = "SAME"
}

export type EntityQueryFilterConditionInput = {
  enabled?: InputMaybe<Scalars["Boolean"]>;
  field: Scalars["String"];
  language?: InputMaybe<LanguageId>;
  operator?: InputMaybe<QueryOperator>;
  value?: InputMaybe<Array<InputMaybe<Scalars["String"]>>>;
};

export type EntityQueryFilterInput = {
  conditions?: InputMaybe<Array<InputMaybe<EntityQueryFilterConditionInput>>>;
  conjunction?: InputMaybe<QueryConjunction>;
  groups?: InputMaybe<Array<InputMaybe<EntityQueryFilterInput>>>;
};

/** Wrapper type for entity query results containing the list of loaded entities and the full entity count for pagination purposes. */
export type EntityQueryResult = {
  __typename?: "EntityQueryResult";
  count?: Maybe<Scalars["Int"]>;
  entities?: Maybe<Array<Maybe<Entity>>>;
};

/** Wrapper type for entity query results containing the list of loaded entities and the full entity count for pagination purposes. */
export type EntityQueryResultEntitiesArgs = {
  language?: InputMaybe<LanguageId>;
};

export enum EntityQueryRevisionMode {
  /** Loads all revisions. */
  All = "ALL",
  /** Loads the current (default) revisions. */
  Default = "DEFAULT",
  /** Loads latest revision. */
  Latest = "LATEST"
}

export type EntityQuerySortInput = {
  direction?: InputMaybe<SortOrder>;
  field: Scalars["String"];
  language?: InputMaybe<LanguageId>;
};

/** Common interface for entities that are revisionable. */
export type EntityRevisionable = {
  entityAccess?: Maybe<Scalars["Boolean"]>;
  entityBundle?: Maybe<Scalars["String"]>;
  entityChanged?: Maybe<Scalars["String"]>;
  entityCreated?: Maybe<Scalars["String"]>;
  entityId?: Maybe<Scalars["String"]>;
  entityLabel?: Maybe<Scalars["String"]>;
  entityLanguage?: Maybe<Language>;
  entityQueryExclusive: EntityQueryResult;
  entityRevisions: EntityQueryResult;
  entityTranslation?: Maybe<Entity>;
  entityTranslations?: Maybe<Array<Maybe<Entity>>>;
  entityType?: Maybe<Scalars["String"]>;
  entityUrl?: Maybe<Url>;
  entityUuid?: Maybe<Scalars["String"]>;
};

/** Common interface for entities that are revisionable. */
export type EntityRevisionableEntityAccessArgs = {
  operation: Scalars["String"];
};

/** Common interface for entities that are revisionable. */
export type EntityRevisionableEntityChangedArgs = {
  format?: InputMaybe<Scalars["String"]>;
};

/** Common interface for entities that are revisionable. */
export type EntityRevisionableEntityCreatedArgs = {
  format?: InputMaybe<Scalars["String"]>;
};

/** Common interface for entities that are revisionable. */
export type EntityRevisionableEntityQueryExclusiveArgs = {
  bundles?: InputMaybe<EntityQueryBundleMode>;
  filter?: InputMaybe<EntityQueryFilterInput>;
  limit?: InputMaybe<Scalars["Int"]>;
  offset?: InputMaybe<Scalars["Int"]>;
  revisions?: InputMaybe<EntityQueryRevisionMode>;
  sort?: InputMaybe<Array<InputMaybe<EntityQuerySortInput>>>;
};

/** Common interface for entities that are revisionable. */
export type EntityRevisionableEntityRevisionsArgs = {
  filter?: InputMaybe<EntityQueryFilterInput>;
  limit?: InputMaybe<Scalars["Int"]>;
  offset?: InputMaybe<Scalars["Int"]>;
  sort?: InputMaybe<Array<InputMaybe<EntityQuerySortInput>>>;
};

/** Common interface for entities that are revisionable. */
export type EntityRevisionableEntityTranslationArgs = {
  language: LanguageId;
};

export type ExternalResponse = {
  __typename?: "ExternalResponse";
  code?: Maybe<Scalars["Int"]>;
  content?: Maybe<Scalars["String"]>;
  header?: Maybe<Scalars["String"]>;
};

export type ExternalResponseHeaderArgs = {
  key?: InputMaybe<Scalars["String"]>;
};

export type ExternalUrl = Url & {
  __typename?: "ExternalUrl";
  /** The processed url path. */
  path?: Maybe<Scalars["String"]>;
  request?: Maybe<ExternalResponse>;
  /** Boolean indicating whether this is a routed (internal) path. */
  routed?: Maybe<Scalars["Boolean"]>;
  /** The translated url object. */
  translate?: Maybe<Url>;
};

export type ExternalUrlTranslateArgs = {
  language: LanguageId;
};

/** The supported facet fields */
export enum FacetField {
  AccessType = "accessType",
  Audience = "audience",
  Creator = "creator",
  FictionNonfiction = "fictionNonfiction",
  FictiveCharacter = "fictiveCharacter",
  Genre = "genre",
  Language = "language",
  MaterialType = "materialType",
  Subject = "subject",
  WorkType = "workType"
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
  /** The count of the term for a facet field */
  count?: Maybe<Scalars["Int"]>;
  /** Use the key when applying filters */
  key: Scalars["String"];
  /** A value of a facet field */
  term: Scalars["String"];
};

export type FieldBlockContentBasicBody = {
  __typename?: "FieldBlockContentBasicBody";
  format?: Maybe<Scalars["String"]>;
  /** The text with the text format applied. */
  processed?: Maybe<Scalars["String"]>;
  summary?: Maybe<Scalars["String"]>;
  /** The summary text with the text format applied. */
  summaryProcessed?: Maybe<Scalars["String"]>;
  value?: Maybe<Scalars["String"]>;
};

/** The custom block language code. */
export type FieldBlockContentLangcode = {
  __typename?: "FieldBlockContentLangcode";
  /** The referenced language */
  language?: Maybe<Language>;
  value?: Maybe<Scalars["String"]>;
};

/** The user ID of the author of the current revision. */
export type FieldBlockContentRevisionUser = {
  __typename?: "FieldBlockContentRevisionUser";
  /** The referenced entity */
  entity?: Maybe<DrupalUser>;
  targetId?: Maybe<Scalars["Int"]>;
};

/** The block type. */
export type FieldBlockContentType = {
  __typename?: "FieldBlockContentType";
  /** The referenced entity */
  entity?: Maybe<Entity>;
  targetId?: Maybe<Scalars["String"]>;
};

export type FieldCommentCommentCommentBody = {
  __typename?: "FieldCommentCommentCommentBody";
  format?: Maybe<Scalars["String"]>;
  /** The text with the text format applied. */
  processed?: Maybe<Scalars["String"]>;
  value?: Maybe<Scalars["String"]>;
};

/** The ID of the entity of which this comment is a reply. */
export type FieldCommentCommentEntityId = {
  __typename?: "FieldCommentCommentEntityId";
  /** The referenced entity */
  entity?: Maybe<Node>;
  targetId?: Maybe<Scalars["Int"]>;
};

/** The comment type. */
export type FieldCommentCommentType = {
  __typename?: "FieldCommentCommentType";
  /** The referenced entity */
  entity?: Maybe<Entity>;
  targetId?: Maybe<Scalars["String"]>;
};

/** The user ID of the comment author. */
export type FieldCommentCommentUid = {
  __typename?: "FieldCommentCommentUid";
  /** The referenced entity */
  entity?: Maybe<DrupalUser>;
  targetId?: Maybe<Scalars["Int"]>;
};

/** The ID of the entity of which this comment is a reply. */
export type FieldCommentEntityId = {
  __typename?: "FieldCommentEntityId";
  /** The referenced entity */
  entity?: Maybe<Node>;
  targetId?: Maybe<Scalars["Int"]>;
};

/** The comment language code. */
export type FieldCommentLangcode = {
  __typename?: "FieldCommentLangcode";
  /** The referenced language */
  language?: Maybe<Language>;
  value?: Maybe<Scalars["String"]>;
};

/** The parent comment ID if this is a reply to a comment. */
export type FieldCommentPid = {
  __typename?: "FieldCommentPid";
  /** The referenced entity */
  entity?: Maybe<Comment>;
  targetId?: Maybe<Scalars["Int"]>;
};

/** The user ID of the comment author. */
export type FieldCommentUid = {
  __typename?: "FieldCommentUid";
  /** The referenced entity */
  entity?: Maybe<DrupalUser>;
  targetId?: Maybe<Scalars["Int"]>;
};

/** The ID of the associated form. */
export type FieldContactMessageContactForm = {
  __typename?: "FieldContactMessageContactForm";
  /** The referenced entity */
  entity?: Maybe<Entity>;
  targetId?: Maybe<Scalars["String"]>;
};

/** The message language code. */
export type FieldContactMessageLangcode = {
  __typename?: "FieldContactMessageLangcode";
  /** The referenced language */
  language?: Maybe<Language>;
  value?: Maybe<Scalars["String"]>;
};

/** The ID of the recipient user for personal contact messages. */
export type FieldContactMessageRecipient = {
  __typename?: "FieldContactMessageRecipient";
  /** The referenced entity */
  entity?: Maybe<DrupalUser>;
  targetId?: Maybe<Scalars["Int"]>;
};

/** The file language code. */
export type FieldFileLangcode = {
  __typename?: "FieldFileLangcode";
  /** The referenced language */
  language?: Maybe<Language>;
  value?: Maybe<Scalars["String"]>;
};

/** The user ID of the file. */
export type FieldFileUid = {
  __typename?: "FieldFileUid";
  /** The referenced entity */
  entity?: Maybe<DrupalUser>;
  targetId?: Maybe<Scalars["Int"]>;
};

/** The URI to access the file (either local or remote). */
export type FieldFileUri = {
  __typename?: "FieldFileUri";
  url?: Maybe<Scalars["String"]>;
  value?: Maybe<Scalars["String"]>;
};

/** The menu link language code. */
export type FieldMenuLinkContentLangcode = {
  __typename?: "FieldMenuLinkContentLangcode";
  /** The referenced language */
  language?: Maybe<Language>;
  value?: Maybe<Scalars["String"]>;
};

/** The location this menu link points to. */
export type FieldMenuLinkContentLink = {
  __typename?: "FieldMenuLinkContentLink";
  attribute?: Maybe<Scalars["String"]>;
  options?: Maybe<Scalars["Map"]>;
  title?: Maybe<Scalars["String"]>;
  uri?: Maybe<Scalars["String"]>;
  url?: Maybe<Url>;
};

/** The location this menu link points to. */
export type FieldMenuLinkContentLinkAttributeArgs = {
  key: Scalars["String"];
};

/** The user ID of the author of the current revision. */
export type FieldMenuLinkContentRevisionUser = {
  __typename?: "FieldMenuLinkContentRevisionUser";
  /** The referenced entity */
  entity?: Maybe<DrupalUser>;
  targetId?: Maybe<Scalars["Int"]>;
};

export type FieldNodeArticleBody = {
  __typename?: "FieldNodeArticleBody";
  format?: Maybe<Scalars["String"]>;
  /** The text with the text format applied. */
  processed?: Maybe<Scalars["String"]>;
  summary?: Maybe<Scalars["String"]>;
  /** The summary text with the text format applied. */
  summaryProcessed?: Maybe<Scalars["String"]>;
  value?: Maybe<Scalars["String"]>;
};

export type FieldNodeArticleComment = {
  __typename?: "FieldNodeArticleComment";
  cid?: Maybe<Scalars["Int"]>;
  /** The number of comments. */
  commentCount?: Maybe<Scalars["Int"]>;
  /** The name of the user posting the last comment. */
  lastCommentName?: Maybe<Scalars["String"]>;
  /** The time that the last comment was created. */
  lastCommentTimestamp?: Maybe<Scalars["Int"]>;
  lastCommentUid?: Maybe<Scalars["Int"]>;
  status?: Maybe<Scalars["Int"]>;
};

/** Overwrite default link to article - external link (target=_blank) should start with http - relative links should start with / */
export type FieldNodeArticleFieldAlternativeArticleUrl = {
  __typename?: "FieldNodeArticleFieldAlternativeArticleUrl";
  attribute?: Maybe<Scalars["String"]>;
  options?: Maybe<Scalars["Map"]>;
  title?: Maybe<Scalars["String"]>;
  uri?: Maybe<Scalars["String"]>;
  url?: Maybe<Url>;
};

/** Overwrite default link to article - external link (target=_blank) should start with http - relative links should start with / */
export type FieldNodeArticleFieldAlternativeArticleUrlAttributeArgs = {
  key: Scalars["String"];
};

export type FieldNodeArticleFieldImage = {
  __typename?: "FieldNodeArticleFieldImage";
  /** Alternative image text, for the image's 'alt' attribute. */
  alt?: Maybe<Scalars["String"]>;
  derivative?: Maybe<ImageResource>;
  /** The referenced entity */
  entity?: Maybe<File>;
  height?: Maybe<Scalars["Int"]>;
  targetId?: Maybe<Scalars["Int"]>;
  /** Image title text, for the image's 'title' attribute. */
  title?: Maybe<Scalars["String"]>;
  url?: Maybe<Scalars["String"]>;
  width?: Maybe<Scalars["Int"]>;
};

export type FieldNodeArticleFieldImageDerivativeArgs = {
  style: ImageStyleId;
};

/** Enter a comma-separated list. For example: Amsterdam, Mexico City, "Cleveland, Ohio" */
export type FieldNodeArticleFieldTags = {
  __typename?: "FieldNodeArticleFieldTags";
  /** The referenced entity */
  entity?: Maybe<TaxonomyTerm>;
  targetId?: Maybe<Scalars["Int"]>;
};

/** The source language from which this translation was created. */
export type FieldNodeContentTranslationSource = {
  __typename?: "FieldNodeContentTranslationSource";
  /** The referenced language */
  language?: Maybe<Language>;
  value?: Maybe<Scalars["String"]>;
};

export type FieldNodeFaqBody = {
  __typename?: "FieldNodeFaqBody";
  format?: Maybe<Scalars["String"]>;
  /** The text with the text format applied. */
  processed?: Maybe<Scalars["String"]>;
  summary?: Maybe<Scalars["String"]>;
  /** The summary text with the text format applied. */
  summaryProcessed?: Maybe<Scalars["String"]>;
  value?: Maybe<Scalars["String"]>;
};

/** Category for this frequently asked question. First tag is used as Category - could be 'bestillinger', 'Søgninger' or 'Login'. Faq's will be grouped by category */
export type FieldNodeFaqFieldTags = {
  __typename?: "FieldNodeFaqFieldTags";
  /** The referenced entity */
  entity?: Maybe<TaxonomyTerm>;
  targetId?: Maybe<Scalars["Int"]>;
};

export type FieldNodeHelpTextBody = {
  __typename?: "FieldNodeHelpTextBody";
  format?: Maybe<Scalars["String"]>;
  /** The text with the text format applied. */
  processed?: Maybe<Scalars["String"]>;
  summary?: Maybe<Scalars["String"]>;
  /** The summary text with the text format applied. */
  summaryProcessed?: Maybe<Scalars["String"]>;
  value?: Maybe<Scalars["String"]>;
};

export type FieldNodeHelpTextFieldImage = {
  __typename?: "FieldNodeHelpTextFieldImage";
  /** Alternative image text, for the image's 'alt' attribute. */
  alt?: Maybe<Scalars["String"]>;
  derivative?: Maybe<ImageResource>;
  /** The referenced entity */
  entity?: Maybe<File>;
  height?: Maybe<Scalars["Int"]>;
  targetId?: Maybe<Scalars["Int"]>;
  /** Image title text, for the image's 'title' attribute. */
  title?: Maybe<Scalars["String"]>;
  url?: Maybe<Scalars["String"]>;
  width?: Maybe<Scalars["Int"]>;
};

export type FieldNodeHelpTextFieldImageDerivativeArgs = {
  style: ImageStyleId;
};

export type FieldNodeLangcode = {
  __typename?: "FieldNodeLangcode";
  /** The referenced language */
  language?: Maybe<Language>;
  value?: Maybe<Scalars["String"]>;
};

export type FieldNodeNotificationFieldNotificationText = {
  __typename?: "FieldNodeNotificationFieldNotificationText";
  format?: Maybe<Scalars["String"]>;
  /** The text with the text format applied. */
  processed?: Maybe<Scalars["String"]>;
  value?: Maybe<Scalars["String"]>;
};

export type FieldNodePath = {
  __typename?: "FieldNodePath";
  alias?: Maybe<Scalars["String"]>;
  langcode?: Maybe<Scalars["String"]>;
  pid?: Maybe<Scalars["Int"]>;
};

/** The user ID of the author of the current revision. */
export type FieldNodeRevisionUid = {
  __typename?: "FieldNodeRevisionUid";
  /** The referenced entity */
  entity?: Maybe<DrupalUser>;
  targetId?: Maybe<Scalars["Int"]>;
};

export type FieldNodeType = {
  __typename?: "FieldNodeType";
  /** The referenced entity */
  entity?: Maybe<Entity>;
  targetId?: Maybe<Scalars["String"]>;
};

/** The username of the content author. */
export type FieldNodeUid = {
  __typename?: "FieldNodeUid";
  /** The referenced entity */
  entity?: Maybe<DrupalUser>;
  targetId?: Maybe<Scalars["Int"]>;
};

export type FieldPathAliasLangcode = {
  __typename?: "FieldPathAliasLangcode";
  /** The referenced language */
  language?: Maybe<Language>;
  value?: Maybe<Scalars["String"]>;
};

/** The language code of the shortcut. */
export type FieldShortcutLangcode = {
  __typename?: "FieldShortcutLangcode";
  /** The referenced language */
  language?: Maybe<Language>;
  value?: Maybe<Scalars["String"]>;
};

/** The location this shortcut points to. */
export type FieldShortcutLink = {
  __typename?: "FieldShortcutLink";
  attribute?: Maybe<Scalars["String"]>;
  options?: Maybe<Scalars["Map"]>;
  title?: Maybe<Scalars["String"]>;
  uri?: Maybe<Scalars["String"]>;
  url?: Maybe<Url>;
};

/** The location this shortcut points to. */
export type FieldShortcutLinkAttributeArgs = {
  key: Scalars["String"];
};

/** The bundle of the shortcut. */
export type FieldShortcutShortcutSet = {
  __typename?: "FieldShortcutShortcutSet";
  /** The referenced entity */
  entity?: Maybe<Entity>;
  targetId?: Maybe<Scalars["String"]>;
};

export type FieldTaxonomyTermDescription = {
  __typename?: "FieldTaxonomyTermDescription";
  format?: Maybe<Scalars["String"]>;
  /** The text with the text format applied. */
  processed?: Maybe<Scalars["String"]>;
  value?: Maybe<Scalars["String"]>;
};

/** The term language code. */
export type FieldTaxonomyTermLangcode = {
  __typename?: "FieldTaxonomyTermLangcode";
  /** The referenced language */
  language?: Maybe<Language>;
  value?: Maybe<Scalars["String"]>;
};

/** The parents of this term. */
export type FieldTaxonomyTermParent = {
  __typename?: "FieldTaxonomyTermParent";
  /** The referenced entity */
  entity?: Maybe<TaxonomyTerm>;
  targetId?: Maybe<Scalars["Int"]>;
};

export type FieldTaxonomyTermPath = {
  __typename?: "FieldTaxonomyTermPath";
  alias?: Maybe<Scalars["String"]>;
  langcode?: Maybe<Scalars["String"]>;
  pid?: Maybe<Scalars["Int"]>;
};

/** The user ID of the author of the current revision. */
export type FieldTaxonomyTermRevisionUser = {
  __typename?: "FieldTaxonomyTermRevisionUser";
  /** The referenced entity */
  entity?: Maybe<DrupalUser>;
  targetId?: Maybe<Scalars["Int"]>;
};

export type FieldTaxonomyTermTagsDescription = {
  __typename?: "FieldTaxonomyTermTagsDescription";
  format?: Maybe<Scalars["String"]>;
  /** The text with the text format applied. */
  processed?: Maybe<Scalars["String"]>;
  value?: Maybe<Scalars["String"]>;
};

/** The parents of this term. */
export type FieldTaxonomyTermTagsParent = {
  __typename?: "FieldTaxonomyTermTagsParent";
  /** The referenced entity */
  entity?: Maybe<TaxonomyTerm>;
  targetId?: Maybe<Scalars["Int"]>;
};

export type FieldTaxonomyTermTagsPath = {
  __typename?: "FieldTaxonomyTermTagsPath";
  alias?: Maybe<Scalars["String"]>;
  langcode?: Maybe<Scalars["String"]>;
  pid?: Maybe<Scalars["Int"]>;
};

/** The vocabulary to which the term is assigned. */
export type FieldTaxonomyTermVid = {
  __typename?: "FieldTaxonomyTermVid";
  /** The referenced entity */
  entity?: Maybe<Entity>;
  targetId?: Maybe<Scalars["String"]>;
};

/** The user language code. */
export type FieldUserLangcode = {
  __typename?: "FieldUserLangcode";
  /** The referenced language */
  language?: Maybe<Language>;
  value?: Maybe<Scalars["String"]>;
};

/** The password of this user (hashed). */
export type FieldUserPass = {
  __typename?: "FieldUserPass";
  existing?: Maybe<Scalars["String"]>;
  preHashed?: Maybe<Scalars["Boolean"]>;
  value?: Maybe<Scalars["String"]>;
};

/** The user's preferred language code for viewing administration pages. */
export type FieldUserPreferredAdminLangcode = {
  __typename?: "FieldUserPreferredAdminLangcode";
  /** The referenced language */
  language?: Maybe<Language>;
  value?: Maybe<Scalars["String"]>;
};

/** The user's preferred language code for receiving emails and viewing the site. */
export type FieldUserPreferredLangcode = {
  __typename?: "FieldUserPreferredLangcode";
  /** The referenced language */
  language?: Maybe<Language>;
  value?: Maybe<Scalars["String"]>;
};

/** The roles the user has. */
export type FieldUserRoles = {
  __typename?: "FieldUserRoles";
  /** The referenced entity */
  entity?: Maybe<Entity>;
  targetId?: Maybe<Scalars["String"]>;
};

/** Your virtual face or picture. */
export type FieldUserUserPicture = {
  __typename?: "FieldUserUserPicture";
  /** Alternative image text, for the image's 'alt' attribute. */
  alt?: Maybe<Scalars["String"]>;
  derivative?: Maybe<ImageResource>;
  /** The referenced entity */
  entity?: Maybe<File>;
  height?: Maybe<Scalars["Int"]>;
  targetId?: Maybe<Scalars["Int"]>;
  /** Image title text, for the image's 'title' attribute. */
  title?: Maybe<Scalars["String"]>;
  url?: Maybe<Scalars["String"]>;
  width?: Maybe<Scalars["Int"]>;
};

/** Your virtual face or picture. */
export type FieldUserUserPictureDerivativeArgs = {
  style: ImageStyleId;
};

/** The 'File' entity type. */
export type File = Entity &
  EntityOwnable & {
    __typename?: "File";
    /** The timestamp that the file was last changed. */
    changed?: Maybe<Scalars["Timestamp"]>;
    /** The timestamp that the file was created. */
    created?: Maybe<Scalars["Timestamp"]>;
    entityAccess?: Maybe<Scalars["Boolean"]>;
    entityBundle?: Maybe<Scalars["String"]>;
    entityChanged?: Maybe<Scalars["String"]>;
    entityCreated?: Maybe<Scalars["String"]>;
    entityId?: Maybe<Scalars["String"]>;
    entityLabel?: Maybe<Scalars["String"]>;
    entityLanguage?: Maybe<Language>;
    entityOwner?: Maybe<DrupalUser>;
    entityQueryExclusive: EntityQueryResult;
    entityTranslation?: Maybe<Entity>;
    entityTranslations?: Maybe<Array<Maybe<Entity>>>;
    entityType?: Maybe<Scalars["String"]>;
    entityUrl?: Maybe<Url>;
    entityUuid?: Maybe<Scalars["String"]>;
    /** The file ID. */
    fid?: Maybe<Scalars["Int"]>;
    /** The file's MIME type. */
    filemime?: Maybe<Scalars["String"]>;
    /** Name of the file with no path components. */
    filename?: Maybe<Scalars["String"]>;
    /** The size of the file in bytes. */
    filesize?: Maybe<Scalars["Int"]>;
    /** The file language code. */
    langcode?: Maybe<FieldFileLangcode>;
    /** Query reference: The user ID of the file. */
    queryUid?: Maybe<EntityQueryResult>;
    /** The status of the file, temporary (FALSE) and permanent (TRUE). */
    status?: Maybe<Scalars["Boolean"]>;
    /** The user ID of the file. */
    uid?: Maybe<FieldFileUid>;
    /** The URI to access the file (either local or remote). */
    uri?: Maybe<FieldFileUri>;
    url?: Maybe<Scalars["String"]>;
    /** The file UUID. */
    uuid?: Maybe<Scalars["String"]>;
  };

/** The 'File' entity type. */
export type FileEntityAccessArgs = {
  operation: Scalars["String"];
};

/** The 'File' entity type. */
export type FileEntityChangedArgs = {
  format?: InputMaybe<Scalars["String"]>;
};

/** The 'File' entity type. */
export type FileEntityCreatedArgs = {
  format?: InputMaybe<Scalars["String"]>;
};

/** The 'File' entity type. */
export type FileEntityQueryExclusiveArgs = {
  bundles?: InputMaybe<EntityQueryBundleMode>;
  filter?: InputMaybe<EntityQueryFilterInput>;
  limit?: InputMaybe<Scalars["Int"]>;
  offset?: InputMaybe<Scalars["Int"]>;
  revisions?: InputMaybe<EntityQueryRevisionMode>;
  sort?: InputMaybe<Array<InputMaybe<EntityQuerySortInput>>>;
};

/** The 'File' entity type. */
export type FileEntityTranslationArgs = {
  language: LanguageId;
};

/** The 'File' entity type. */
export type FileQueryUidArgs = {
  filter?: InputMaybe<EntityQueryFilterInput>;
  limit?: InputMaybe<Scalars["Int"]>;
  offset?: InputMaybe<Scalars["Int"]>;
  revisions?: InputMaybe<EntityQueryRevisionMode>;
  sort?: InputMaybe<Array<InputMaybe<EntityQuerySortInput>>>;
};

export type HelpResponse = {
  __typename?: "HelpResponse";
  result: Array<HelpRow>;
};

export type HelpRow = {
  __typename?: "HelpRow";
  body: Scalars["String"];
  group: Scalars["String"];
  nid: Scalars["Int"];
  orgTitle: Scalars["String"];
  title: Scalars["String"];
};

export type Highlight = {
  __typename?: "Highlight";
  key: Scalars["String"];
  value: Scalars["String"];
};

export type HostPublication = {
  __typename?: "HostPublication";
  details: Scalars["String"];
  title: Scalars["String"];
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
  Publizon = "PUBLIZON"
}

export type ImageResource = {
  __typename?: "ImageResource";
  height?: Maybe<Scalars["Int"]>;
  url?: Maybe<Scalars["String"]>;
  width?: Maybe<Scalars["Int"]>;
};

export enum ImageStyleId {
  /** Large (480×480) */
  Large = "LARGE",
  /** Medium (220×220) */
  Medium = "MEDIUM",
  /** Thumbnail (100×100) */
  Thumbnail = "THUMBNAIL"
}

export type InfomediaContent = {
  __typename?: "InfomediaContent";
  byLine: Scalars["String"];
  dateLine: Scalars["String"];
  headLine: Scalars["String"];
  hedLine: Scalars["String"];
  html: Scalars["String"];
  id: Scalars["String"];
  logo: Scalars["String"];
  origin: Scalars["String"];
  paper: Scalars["String"];
  subHeadLine: Scalars["String"];
  text: Scalars["String"];
};

export type InfomediaReference = {
  __typename?: "InfomediaReference";
  error?: Maybe<Scalars["String"]>;
  infomediaId: Scalars["String"];
  pid: Scalars["String"];
};

export type InternalResponse = {
  __typename?: "InternalResponse";
  code?: Maybe<Scalars["Int"]>;
  content?: Maybe<Scalars["String"]>;
  header?: Maybe<Scalars["String"]>;
};

export type InternalResponseHeaderArgs = {
  key?: InputMaybe<Scalars["String"]>;
};

/** Common interface for internal urls. */
export type InternalUrl = {
  blocksByRegion?: Maybe<Array<Maybe<Entity>>>;
  breadcrumb?: Maybe<Array<Maybe<Link>>>;
  currentUserContext?: Maybe<DrupalUser>;
  languageInterfaceContext?: Maybe<Language>;
  languageSwitchLinks?: Maybe<Array<Maybe<LanguageSwitchLink>>>;
  nodeContext?: Maybe<Node>;
  /** The processed url path. */
  path?: Maybe<Scalars["String"]>;
  /** The url's path alias if any. */
  pathAlias?: Maybe<Scalars["String"]>;
  /** The route's internal path. */
  pathInternal?: Maybe<Scalars["String"]>;
  request?: Maybe<InternalResponse>;
  /** Boolean indicating whether this is a routed (internal) path. */
  routed?: Maybe<Scalars["Boolean"]>;
  /** The translated url object. */
  translate?: Maybe<Url>;
};

/** Common interface for internal urls. */
export type InternalUrlBlocksByRegionArgs = {
  region: Scalars["String"];
};

/** Common interface for internal urls. */
export type InternalUrlLanguageSwitchLinksArgs = {
  language?: InputMaybe<LanguageId>;
};

/** Common interface for internal urls. */
export type InternalUrlTranslateArgs = {
  language: LanguageId;
};

export type Lamp = {
  __typename?: "Lamp";
  color?: Maybe<Scalars["String"]>;
  message?: Maybe<Scalars["String"]>;
};

export type Language = {
  __typename?: "Language";
  /** The language id prepared as a language enum value. */
  argument?: Maybe<Scalars["String"]>;
  /** The language direction (rtl or ltr). */
  direction?: Maybe<Scalars["String"]>;
  /** The language id. */
  id?: Maybe<Scalars["String"]>;
  /** Boolean indicating if this is the configured default language. */
  isDefault?: Maybe<Scalars["Boolean"]>;
  /** Boolean indicating if this language is locked. */
  isLocked?: Maybe<Scalars["Boolean"]>;
  /** The human-readable name of the language. */
  name?: Maybe<Scalars["String"]>;
  /** The weight of the language. */
  weight?: Maybe<Scalars["Int"]>;
};

export enum LanguageCode {
  Da = "da",
  En = "en"
}

export enum LanguageId {
  /** Danish */
  Da = "DA",
  /** English */
  En = "EN",
  /** en-gb */
  EnGb = "EN_GB"
}

export type LanguageSwitchLink = {
  __typename?: "LanguageSwitchLink";
  active?: Maybe<Scalars["Boolean"]>;
  language?: Maybe<Language>;
  title?: Maybe<Scalars["String"]>;
  url?: Maybe<InternalUrl>;
};

export type Link = {
  __typename?: "Link";
  /** The label of a link. */
  text?: Maybe<Scalars["String"]>;
  /** The url of a link. */
  url?: Maybe<Url>;
};

export type Loan = {
  __typename?: "Loan";
  dueDate: Scalars["DateTime"];
  loanId: Scalars["String"];
  manifestation: WorkManifestation;
};

export type Localizations = {
  __typename?: "Localizations";
  agencies?: Maybe<Array<Maybe<HoldingAgency>>>;
  count?: Maybe<Scalars["Int"]>;
};

export type MaterialType = {
  __typename?: "MaterialType";
  cover: Cover;
  localizations?: Maybe<Localizations>;
  manifestations: Array<WorkManifestation>;
  materialType: Scalars["String"];
};

export type Menu = {
  __typename?: "Menu";
  /** The menu's description. */
  description?: Maybe<Scalars["String"]>;
  links?: Maybe<Array<Maybe<MenuLink>>>;
  /** The menu's name. */
  name?: Maybe<Scalars["String"]>;
};

export type MenuLink = {
  __typename?: "MenuLink";
  attribute?: Maybe<Scalars["String"]>;
  description?: Maybe<Scalars["String"]>;
  expanded?: Maybe<Scalars["Boolean"]>;
  label?: Maybe<Scalars["String"]>;
  links?: Maybe<Array<Maybe<MenuLink>>>;
  url?: Maybe<Url>;
};

export type MenuLinkAttributeArgs = {
  key: Scalars["String"];
};

/** The 'Custom menu link' entity type. */
export type MenuLinkContent = {
  /** The content menu link bundle. */
  bundle?: Maybe<Scalars["String"]>;
  /** The time that the menu link was last edited. */
  changed?: Maybe<Scalars["Timestamp"]>;
  /** A flag indicating whether this is the default translation. */
  defaultLangcode?: Maybe<Scalars["Boolean"]>;
  /** Shown when hovering over the menu link. */
  description?: Maybe<Scalars["String"]>;
  /** A flag for whether the link should be enabled in menus or hidden. */
  enabled?: Maybe<Scalars["Boolean"]>;
  entityAccess?: Maybe<Scalars["Boolean"]>;
  entityBundle?: Maybe<Scalars["String"]>;
  entityChanged?: Maybe<Scalars["String"]>;
  entityCreated?: Maybe<Scalars["String"]>;
  entityId?: Maybe<Scalars["String"]>;
  entityLabel?: Maybe<Scalars["String"]>;
  entityLanguage?: Maybe<Language>;
  entityPublished?: Maybe<Scalars["Boolean"]>;
  entityQueryExclusive: EntityQueryResult;
  entityRevisions: EntityQueryResult;
  entityTranslation?: Maybe<Entity>;
  entityTranslations?: Maybe<Array<Maybe<Entity>>>;
  entityType?: Maybe<Scalars["String"]>;
  entityUrl?: Maybe<Url>;
  entityUuid?: Maybe<Scalars["String"]>;
  /** If selected and this menu link has children, the menu will always appear expanded. This option may be overridden for the entire menu tree when placing a menu block. */
  expanded?: Maybe<Scalars["Boolean"]>;
  /** A flag to indicate if the link points to a full URL starting with a protocol, like http:// (1 = external, 0 = internal). */
  external?: Maybe<Scalars["Boolean"]>;
  /** The entity ID for this menu link content entity. */
  id?: Maybe<Scalars["Int"]>;
  /** The menu link language code. */
  langcode?: Maybe<FieldMenuLinkContentLangcode>;
  /** The location this menu link points to. */
  link?: Maybe<FieldMenuLinkContentLink>;
  /** The menu name. All links with the same menu name (such as "tools") are part of the same menu. */
  menuName?: Maybe<Scalars["String"]>;
  /** The ID of the parent menu link plugin, or empty string when at the top level of the hierarchy. */
  parent?: Maybe<Scalars["String"]>;
  /** Query reference: The user ID of the author of the current revision. */
  queryRevisionUser?: Maybe<EntityQueryResult>;
  rediscover?: Maybe<Scalars["Boolean"]>;
  /** The time that the current revision was created. */
  revisionCreated?: Maybe<Scalars["Timestamp"]>;
  /** A flag indicating whether this was a default revision when it was saved. */
  revisionDefault?: Maybe<Scalars["Boolean"]>;
  revisionId?: Maybe<Scalars["Int"]>;
  /** Briefly describe the changes you have made. */
  revisionLogMessage?: Maybe<Scalars["String"]>;
  /** Indicates if the last edit of a translation belongs to current revision. */
  revisionTranslationAffected?: Maybe<Scalars["Boolean"]>;
  /** The user ID of the author of the current revision. */
  revisionUser?: Maybe<FieldMenuLinkContentRevisionUser>;
  /** The text to be used for this link in the menu. */
  title?: Maybe<Scalars["String"]>;
  /** The content menu link UUID. */
  uuid?: Maybe<Scalars["String"]>;
  /** Link weight among links in the same menu at the same depth. In the menu, the links with high weight will sink and links with a low weight will be positioned nearer the top. */
  weight?: Maybe<Scalars["Int"]>;
};

/** The 'Custom menu link' entity type. */
export type MenuLinkContentEntityAccessArgs = {
  operation: Scalars["String"];
};

/** The 'Custom menu link' entity type. */
export type MenuLinkContentEntityChangedArgs = {
  format?: InputMaybe<Scalars["String"]>;
};

/** The 'Custom menu link' entity type. */
export type MenuLinkContentEntityCreatedArgs = {
  format?: InputMaybe<Scalars["String"]>;
};

/** The 'Custom menu link' entity type. */
export type MenuLinkContentEntityQueryExclusiveArgs = {
  bundles?: InputMaybe<EntityQueryBundleMode>;
  filter?: InputMaybe<EntityQueryFilterInput>;
  limit?: InputMaybe<Scalars["Int"]>;
  offset?: InputMaybe<Scalars["Int"]>;
  revisions?: InputMaybe<EntityQueryRevisionMode>;
  sort?: InputMaybe<Array<InputMaybe<EntityQuerySortInput>>>;
};

/** The 'Custom menu link' entity type. */
export type MenuLinkContentEntityRevisionsArgs = {
  filter?: InputMaybe<EntityQueryFilterInput>;
  limit?: InputMaybe<Scalars["Int"]>;
  offset?: InputMaybe<Scalars["Int"]>;
  sort?: InputMaybe<Array<InputMaybe<EntityQuerySortInput>>>;
};

/** The 'Custom menu link' entity type. */
export type MenuLinkContentEntityTranslationArgs = {
  language: LanguageId;
};

/** The 'Custom menu link' entity type. */
export type MenuLinkContentQueryRevisionUserArgs = {
  filter?: InputMaybe<EntityQueryFilterInput>;
  limit?: InputMaybe<Scalars["Int"]>;
  offset?: InputMaybe<Scalars["Int"]>;
  revisions?: InputMaybe<EntityQueryRevisionMode>;
  sort?: InputMaybe<Array<InputMaybe<EntityQuerySortInput>>>;
};

/** The 'Custom menu link' bundle of the 'Custom menu link' entity type. */
export type MenuLinkContentMenuLinkContent = Entity &
  EntityPublishable &
  EntityRevisionable &
  MenuLinkContent & {
    __typename?: "MenuLinkContentMenuLinkContent";
    /** The content menu link bundle. */
    bundle?: Maybe<Scalars["String"]>;
    /** The time that the menu link was last edited. */
    changed?: Maybe<Scalars["Timestamp"]>;
    /** A flag indicating whether this is the default translation. */
    defaultLangcode?: Maybe<Scalars["Boolean"]>;
    /** Shown when hovering over the menu link. */
    description?: Maybe<Scalars["String"]>;
    /** A flag for whether the link should be enabled in menus or hidden. */
    enabled?: Maybe<Scalars["Boolean"]>;
    entityAccess?: Maybe<Scalars["Boolean"]>;
    entityBundle?: Maybe<Scalars["String"]>;
    entityChanged?: Maybe<Scalars["String"]>;
    entityCreated?: Maybe<Scalars["String"]>;
    entityId?: Maybe<Scalars["String"]>;
    entityLabel?: Maybe<Scalars["String"]>;
    entityLanguage?: Maybe<Language>;
    entityPublished?: Maybe<Scalars["Boolean"]>;
    entityQueryExclusive: EntityQueryResult;
    entityRevisions: EntityQueryResult;
    entityTranslation?: Maybe<Entity>;
    entityTranslations?: Maybe<Array<Maybe<Entity>>>;
    entityType?: Maybe<Scalars["String"]>;
    entityUrl?: Maybe<Url>;
    entityUuid?: Maybe<Scalars["String"]>;
    /** If selected and this menu link has children, the menu will always appear expanded. This option may be overridden for the entire menu tree when placing a menu block. */
    expanded?: Maybe<Scalars["Boolean"]>;
    /** A flag to indicate if the link points to a full URL starting with a protocol, like http:// (1 = external, 0 = internal). */
    external?: Maybe<Scalars["Boolean"]>;
    /** The entity ID for this menu link content entity. */
    id?: Maybe<Scalars["Int"]>;
    /** The menu link language code. */
    langcode?: Maybe<FieldMenuLinkContentLangcode>;
    /** The location this menu link points to. */
    link?: Maybe<FieldMenuLinkContentLink>;
    /** The menu name. All links with the same menu name (such as "tools") are part of the same menu. */
    menuName?: Maybe<Scalars["String"]>;
    /** The ID of the parent menu link plugin, or empty string when at the top level of the hierarchy. */
    parent?: Maybe<Scalars["String"]>;
    /** Query reference: The user ID of the author of the current revision. */
    queryRevisionUser?: Maybe<EntityQueryResult>;
    rediscover?: Maybe<Scalars["Boolean"]>;
    /** The time that the current revision was created. */
    revisionCreated?: Maybe<Scalars["Timestamp"]>;
    /** A flag indicating whether this was a default revision when it was saved. */
    revisionDefault?: Maybe<Scalars["Boolean"]>;
    revisionId?: Maybe<Scalars["Int"]>;
    /** Briefly describe the changes you have made. */
    revisionLogMessage?: Maybe<Scalars["String"]>;
    /** Indicates if the last edit of a translation belongs to current revision. */
    revisionTranslationAffected?: Maybe<Scalars["Boolean"]>;
    /** The user ID of the author of the current revision. */
    revisionUser?: Maybe<FieldMenuLinkContentRevisionUser>;
    /** The text to be used for this link in the menu. */
    title?: Maybe<Scalars["String"]>;
    /** The content menu link UUID. */
    uuid?: Maybe<Scalars["String"]>;
    /** Link weight among links in the same menu at the same depth. In the menu, the links with high weight will sink and links with a low weight will be positioned nearer the top. */
    weight?: Maybe<Scalars["Int"]>;
  };

/** The 'Custom menu link' bundle of the 'Custom menu link' entity type. */
export type MenuLinkContentMenuLinkContentEntityAccessArgs = {
  operation: Scalars["String"];
};

/** The 'Custom menu link' bundle of the 'Custom menu link' entity type. */
export type MenuLinkContentMenuLinkContentEntityChangedArgs = {
  format?: InputMaybe<Scalars["String"]>;
};

/** The 'Custom menu link' bundle of the 'Custom menu link' entity type. */
export type MenuLinkContentMenuLinkContentEntityCreatedArgs = {
  format?: InputMaybe<Scalars["String"]>;
};

/** The 'Custom menu link' bundle of the 'Custom menu link' entity type. */
export type MenuLinkContentMenuLinkContentEntityQueryExclusiveArgs = {
  bundles?: InputMaybe<EntityQueryBundleMode>;
  filter?: InputMaybe<EntityQueryFilterInput>;
  limit?: InputMaybe<Scalars["Int"]>;
  offset?: InputMaybe<Scalars["Int"]>;
  revisions?: InputMaybe<EntityQueryRevisionMode>;
  sort?: InputMaybe<Array<InputMaybe<EntityQuerySortInput>>>;
};

/** The 'Custom menu link' bundle of the 'Custom menu link' entity type. */
export type MenuLinkContentMenuLinkContentEntityRevisionsArgs = {
  filter?: InputMaybe<EntityQueryFilterInput>;
  limit?: InputMaybe<Scalars["Int"]>;
  offset?: InputMaybe<Scalars["Int"]>;
  sort?: InputMaybe<Array<InputMaybe<EntityQuerySortInput>>>;
};

/** The 'Custom menu link' bundle of the 'Custom menu link' entity type. */
export type MenuLinkContentMenuLinkContentEntityTranslationArgs = {
  language: LanguageId;
};

/** The 'Custom menu link' bundle of the 'Custom menu link' entity type. */
export type MenuLinkContentMenuLinkContentQueryRevisionUserArgs = {
  filter?: InputMaybe<EntityQueryFilterInput>;
  limit?: InputMaybe<Scalars["Int"]>;
  offset?: InputMaybe<Scalars["Int"]>;
  revisions?: InputMaybe<EntityQueryRevisionMode>;
  sort?: InputMaybe<Array<InputMaybe<EntityQuerySortInput>>>;
};

export type Mutation = {
  __typename?: "Mutation";
  data_collect: Scalars["String"];
  deleteSession: Scalars["String"];
  /**
   * Order digital article through Digital Article Service
   * Link to article is sent via email
   */
  digitalArticleService: DraftDigitalArticleServiceResponse;
  submitOrder?: Maybe<SubmitOrder>;
  submitPeriodicaArticleOrder: PeriodicaArticleOrderResponse;
  submitSession: Scalars["String"];
};

export type MutationDataCollectArgs = {
  input: DataCollectInput;
};

export type MutationDigitalArticleServiceArgs = {
  authorOfComponent?: InputMaybe<Scalars["String"]>;
  pagination?: InputMaybe<Scalars["String"]>;
  pid: Scalars["String"];
  publicationDateOfComponent?: InputMaybe<Scalars["String"]>;
  titleOfComponent?: InputMaybe<Scalars["String"]>;
  volume?: InputMaybe<Scalars["String"]>;
};

export type MutationSubmitOrderArgs = {
  input: SubmitOrderInput;
};

export type MutationSubmitPeriodicaArticleOrderArgs = {
  input: PeriodicaArticleOrder;
};

export type MutationSubmitSessionArgs = {
  input: SessionInput;
};

/** The 'Content' entity type. */
export type Node = {
  /** The time that the node was last edited. */
  changed?: Maybe<Scalars["Timestamp"]>;
  /** A boolean indicating whether this translation needs to be updated. */
  contentTranslationOutdated?: Maybe<Scalars["Boolean"]>;
  /** The source language from which this translation was created. */
  contentTranslationSource?: Maybe<FieldNodeContentTranslationSource>;
  /** The time that the node was created. */
  created?: Maybe<Scalars["Timestamp"]>;
  /** A flag indicating whether this is the default translation. */
  defaultLangcode?: Maybe<Scalars["Boolean"]>;
  entityAccess?: Maybe<Scalars["Boolean"]>;
  entityBundle?: Maybe<Scalars["String"]>;
  entityChanged?: Maybe<Scalars["String"]>;
  entityCreated?: Maybe<Scalars["String"]>;
  entityId?: Maybe<Scalars["String"]>;
  entityLabel?: Maybe<Scalars["String"]>;
  entityLanguage?: Maybe<Language>;
  entityOwner?: Maybe<DrupalUser>;
  entityPublished?: Maybe<Scalars["Boolean"]>;
  entityQueryExclusive: EntityQueryResult;
  /** Renders 'Content' entities in the given view mode. */
  entityRendered?: Maybe<Scalars["String"]>;
  entityRevisions: EntityQueryResult;
  entityTranslation?: Maybe<Entity>;
  entityTranslations?: Maybe<Array<Maybe<Entity>>>;
  entityType?: Maybe<Scalars["String"]>;
  entityUrl?: Maybe<Url>;
  entityUuid?: Maybe<Scalars["String"]>;
  langcode?: Maybe<FieldNodeLangcode>;
  nid?: Maybe<Scalars["Int"]>;
  path?: Maybe<FieldNodePath>;
  promote?: Maybe<Scalars["Boolean"]>;
  /** Query reference: The user ID of the author of the current revision. */
  queryRevisionUid?: Maybe<EntityQueryResult>;
  /** Query reference:  */
  queryType?: Maybe<EntityQueryResult>;
  /** Query reference: The username of the content author. */
  queryUid?: Maybe<EntityQueryResult>;
  /** Reverse reference: The ID of the entity of which this comment is a reply. */
  reverseEntityIdComment: EntityQueryResult;
  /** A flag indicating whether this was a default revision when it was saved. */
  revisionDefault?: Maybe<Scalars["Boolean"]>;
  /** Briefly describe the changes you have made. */
  revisionLog?: Maybe<Scalars["String"]>;
  /** The time that the current revision was created. */
  revisionTimestamp?: Maybe<Scalars["Timestamp"]>;
  /** Indicates if the last edit of a translation belongs to current revision. */
  revisionTranslationAffected?: Maybe<Scalars["Boolean"]>;
  /** The user ID of the author of the current revision. */
  revisionUid?: Maybe<FieldNodeRevisionUid>;
  status?: Maybe<Scalars["Boolean"]>;
  sticky?: Maybe<Scalars["Boolean"]>;
  title?: Maybe<Scalars["String"]>;
  type?: Maybe<FieldNodeType>;
  /** The username of the content author. */
  uid?: Maybe<FieldNodeUid>;
  uuid?: Maybe<Scalars["String"]>;
  vid?: Maybe<Scalars["Int"]>;
};

/** The 'Content' entity type. */
export type NodeEntityAccessArgs = {
  operation: Scalars["String"];
};

/** The 'Content' entity type. */
export type NodeEntityChangedArgs = {
  format?: InputMaybe<Scalars["String"]>;
};

/** The 'Content' entity type. */
export type NodeEntityCreatedArgs = {
  format?: InputMaybe<Scalars["String"]>;
};

/** The 'Content' entity type. */
export type NodeEntityQueryExclusiveArgs = {
  bundles?: InputMaybe<EntityQueryBundleMode>;
  filter?: InputMaybe<EntityQueryFilterInput>;
  limit?: InputMaybe<Scalars["Int"]>;
  offset?: InputMaybe<Scalars["Int"]>;
  revisions?: InputMaybe<EntityQueryRevisionMode>;
  sort?: InputMaybe<Array<InputMaybe<EntityQuerySortInput>>>;
};

/** The 'Content' entity type. */
export type NodeEntityRenderedArgs = {
  mode?: InputMaybe<NodeDisplayModeId>;
};

/** The 'Content' entity type. */
export type NodeEntityRevisionsArgs = {
  filter?: InputMaybe<EntityQueryFilterInput>;
  limit?: InputMaybe<Scalars["Int"]>;
  offset?: InputMaybe<Scalars["Int"]>;
  sort?: InputMaybe<Array<InputMaybe<EntityQuerySortInput>>>;
};

/** The 'Content' entity type. */
export type NodeEntityTranslationArgs = {
  language: LanguageId;
};

/** The 'Content' entity type. */
export type NodeQueryRevisionUidArgs = {
  filter?: InputMaybe<EntityQueryFilterInput>;
  limit?: InputMaybe<Scalars["Int"]>;
  offset?: InputMaybe<Scalars["Int"]>;
  revisions?: InputMaybe<EntityQueryRevisionMode>;
  sort?: InputMaybe<Array<InputMaybe<EntityQuerySortInput>>>;
};

/** The 'Content' entity type. */
export type NodeQueryTypeArgs = {
  filter?: InputMaybe<EntityQueryFilterInput>;
  limit?: InputMaybe<Scalars["Int"]>;
  offset?: InputMaybe<Scalars["Int"]>;
  revisions?: InputMaybe<EntityQueryRevisionMode>;
  sort?: InputMaybe<Array<InputMaybe<EntityQuerySortInput>>>;
};

/** The 'Content' entity type. */
export type NodeQueryUidArgs = {
  filter?: InputMaybe<EntityQueryFilterInput>;
  limit?: InputMaybe<Scalars["Int"]>;
  offset?: InputMaybe<Scalars["Int"]>;
  revisions?: InputMaybe<EntityQueryRevisionMode>;
  sort?: InputMaybe<Array<InputMaybe<EntityQuerySortInput>>>;
};

/** The 'Content' entity type. */
export type NodeReverseEntityIdCommentArgs = {
  filter?: InputMaybe<EntityQueryFilterInput>;
  limit?: InputMaybe<Scalars["Int"]>;
  offset?: InputMaybe<Scalars["Int"]>;
  revisions?: InputMaybe<EntityQueryRevisionMode>;
  sort?: InputMaybe<Array<InputMaybe<EntityQuerySortInput>>>;
};

/** The 'Article' bundle of the 'Content' entity type. */
export type NodeArticle = Entity &
  EntityOwnable &
  EntityPublishable &
  EntityRevisionable &
  Node & {
    __typename?: "NodeArticle";
    body?: Maybe<FieldNodeArticleBody>;
    /** The time that the node was last edited. */
    changed?: Maybe<Scalars["Timestamp"]>;
    comment?: Maybe<FieldNodeArticleComment>;
    /** A boolean indicating whether this translation needs to be updated. */
    contentTranslationOutdated?: Maybe<Scalars["Boolean"]>;
    /** The source language from which this translation was created. */
    contentTranslationSource?: Maybe<FieldNodeContentTranslationSource>;
    /** The time that the node was created. */
    created?: Maybe<Scalars["Timestamp"]>;
    /** A flag indicating whether this is the default translation. */
    defaultLangcode?: Maybe<Scalars["Boolean"]>;
    entityAccess?: Maybe<Scalars["Boolean"]>;
    entityBundle?: Maybe<Scalars["String"]>;
    entityChanged?: Maybe<Scalars["String"]>;
    entityCreated?: Maybe<Scalars["String"]>;
    entityId?: Maybe<Scalars["String"]>;
    entityLabel?: Maybe<Scalars["String"]>;
    entityLanguage?: Maybe<Language>;
    entityOwner?: Maybe<DrupalUser>;
    entityPublished?: Maybe<Scalars["Boolean"]>;
    entityQueryExclusive: EntityQueryResult;
    /** Renders 'Content' entities in the given view mode. */
    entityRendered?: Maybe<Scalars["String"]>;
    entityRevisions: EntityQueryResult;
    entityTranslation?: Maybe<Entity>;
    entityTranslations?: Maybe<Array<Maybe<Entity>>>;
    entityType?: Maybe<Scalars["String"]>;
    entityUrl?: Maybe<Url>;
    entityUuid?: Maybe<Scalars["String"]>;
    /** Overwrite default link to article - external link (target=_blank) should start with http - relative links should start with / */
    fieldAlternativeArticleUrl?: Maybe<FieldNodeArticleFieldAlternativeArticleUrl>;
    /** Position of article in section. From left to right */
    fieldArticlePosition?: Maybe<Scalars["String"]>;
    /** Sections on frontpage are numbered from top to bottom 1,2,3 ... */
    fieldArticleSection?: Maybe<Scalars["String"]>;
    fieldImage?: Maybe<FieldNodeArticleFieldImage>;
    fieldRubrik?: Maybe<Scalars["String"]>;
    /** Enter a comma-separated list. For example: Amsterdam, Mexico City, "Cleveland, Ohio" */
    fieldTags?: Maybe<Array<Maybe<FieldNodeArticleFieldTags>>>;
    langcode?: Maybe<FieldNodeLangcode>;
    nid?: Maybe<Scalars["Int"]>;
    path?: Maybe<FieldNodePath>;
    promote?: Maybe<Scalars["Boolean"]>;
    /** Query reference:  */
    queryFieldTags?: Maybe<EntityQueryResult>;
    /** Query reference: The user ID of the author of the current revision. */
    queryRevisionUid?: Maybe<EntityQueryResult>;
    /** Query reference:  */
    queryType?: Maybe<EntityQueryResult>;
    /** Query reference: The username of the content author. */
    queryUid?: Maybe<EntityQueryResult>;
    /** Reverse reference: The ID of the entity of which this comment is a reply. */
    reverseEntityIdComment: EntityQueryResult;
    /** A flag indicating whether this was a default revision when it was saved. */
    revisionDefault?: Maybe<Scalars["Boolean"]>;
    /** Briefly describe the changes you have made. */
    revisionLog?: Maybe<Scalars["String"]>;
    /** The time that the current revision was created. */
    revisionTimestamp?: Maybe<Scalars["Timestamp"]>;
    /** Indicates if the last edit of a translation belongs to current revision. */
    revisionTranslationAffected?: Maybe<Scalars["Boolean"]>;
    /** The user ID of the author of the current revision. */
    revisionUid?: Maybe<FieldNodeRevisionUid>;
    status?: Maybe<Scalars["Boolean"]>;
    sticky?: Maybe<Scalars["Boolean"]>;
    title?: Maybe<Scalars["String"]>;
    type?: Maybe<FieldNodeType>;
    /** The username of the content author. */
    uid?: Maybe<FieldNodeUid>;
    uuid?: Maybe<Scalars["String"]>;
    vid?: Maybe<Scalars["Int"]>;
  };

/** The 'Article' bundle of the 'Content' entity type. */
export type NodeArticleEntityAccessArgs = {
  operation: Scalars["String"];
};

/** The 'Article' bundle of the 'Content' entity type. */
export type NodeArticleEntityChangedArgs = {
  format?: InputMaybe<Scalars["String"]>;
};

/** The 'Article' bundle of the 'Content' entity type. */
export type NodeArticleEntityCreatedArgs = {
  format?: InputMaybe<Scalars["String"]>;
};

/** The 'Article' bundle of the 'Content' entity type. */
export type NodeArticleEntityQueryExclusiveArgs = {
  bundles?: InputMaybe<EntityQueryBundleMode>;
  filter?: InputMaybe<EntityQueryFilterInput>;
  limit?: InputMaybe<Scalars["Int"]>;
  offset?: InputMaybe<Scalars["Int"]>;
  revisions?: InputMaybe<EntityQueryRevisionMode>;
  sort?: InputMaybe<Array<InputMaybe<EntityQuerySortInput>>>;
};

/** The 'Article' bundle of the 'Content' entity type. */
export type NodeArticleEntityRenderedArgs = {
  mode?: InputMaybe<NodeDisplayModeId>;
};

/** The 'Article' bundle of the 'Content' entity type. */
export type NodeArticleEntityRevisionsArgs = {
  filter?: InputMaybe<EntityQueryFilterInput>;
  limit?: InputMaybe<Scalars["Int"]>;
  offset?: InputMaybe<Scalars["Int"]>;
  sort?: InputMaybe<Array<InputMaybe<EntityQuerySortInput>>>;
};

/** The 'Article' bundle of the 'Content' entity type. */
export type NodeArticleEntityTranslationArgs = {
  language: LanguageId;
};

/** The 'Article' bundle of the 'Content' entity type. */
export type NodeArticleQueryFieldTagsArgs = {
  filter?: InputMaybe<EntityQueryFilterInput>;
  limit?: InputMaybe<Scalars["Int"]>;
  offset?: InputMaybe<Scalars["Int"]>;
  revisions?: InputMaybe<EntityQueryRevisionMode>;
  sort?: InputMaybe<Array<InputMaybe<EntityQuerySortInput>>>;
};

/** The 'Article' bundle of the 'Content' entity type. */
export type NodeArticleQueryRevisionUidArgs = {
  filter?: InputMaybe<EntityQueryFilterInput>;
  limit?: InputMaybe<Scalars["Int"]>;
  offset?: InputMaybe<Scalars["Int"]>;
  revisions?: InputMaybe<EntityQueryRevisionMode>;
  sort?: InputMaybe<Array<InputMaybe<EntityQuerySortInput>>>;
};

/** The 'Article' bundle of the 'Content' entity type. */
export type NodeArticleQueryTypeArgs = {
  filter?: InputMaybe<EntityQueryFilterInput>;
  limit?: InputMaybe<Scalars["Int"]>;
  offset?: InputMaybe<Scalars["Int"]>;
  revisions?: InputMaybe<EntityQueryRevisionMode>;
  sort?: InputMaybe<Array<InputMaybe<EntityQuerySortInput>>>;
};

/** The 'Article' bundle of the 'Content' entity type. */
export type NodeArticleQueryUidArgs = {
  filter?: InputMaybe<EntityQueryFilterInput>;
  limit?: InputMaybe<Scalars["Int"]>;
  offset?: InputMaybe<Scalars["Int"]>;
  revisions?: InputMaybe<EntityQueryRevisionMode>;
  sort?: InputMaybe<Array<InputMaybe<EntityQuerySortInput>>>;
};

/** The 'Article' bundle of the 'Content' entity type. */
export type NodeArticleReverseEntityIdCommentArgs = {
  filter?: InputMaybe<EntityQueryFilterInput>;
  limit?: InputMaybe<Scalars["Int"]>;
  offset?: InputMaybe<Scalars["Int"]>;
  revisions?: InputMaybe<EntityQueryRevisionMode>;
  sort?: InputMaybe<Array<InputMaybe<EntityQuerySortInput>>>;
};

/** The available display modes for 'Content' entities. */
export enum NodeDisplayModeId {
  /** The 'Full content' display mode for 'Content' entities. */
  Full = "FULL",
  /** The 'RSS' display mode for 'Content' entities. */
  Rss = "RSS",
  /** The 'Search index' display mode for 'Content' entities. */
  Searchindex = "SEARCHINDEX",
  /** The 'Search result highlighting input' display mode for 'Content' entities. */
  Searchresult = "SEARCHRESULT",
  /** The 'Teaser' display mode for 'Content' entities. */
  Teaser = "TEASER"
}

/** The 'faq' bundle of the 'Content' entity type. */
export type NodeFaq = Entity &
  EntityOwnable &
  EntityPublishable &
  EntityRevisionable &
  Node & {
    __typename?: "NodeFaq";
    body?: Maybe<FieldNodeFaqBody>;
    /** The time that the node was last edited. */
    changed?: Maybe<Scalars["Timestamp"]>;
    /** A boolean indicating whether this translation needs to be updated. */
    contentTranslationOutdated?: Maybe<Scalars["Boolean"]>;
    /** The source language from which this translation was created. */
    contentTranslationSource?: Maybe<FieldNodeContentTranslationSource>;
    /** The time that the node was created. */
    created?: Maybe<Scalars["Timestamp"]>;
    /** A flag indicating whether this is the default translation. */
    defaultLangcode?: Maybe<Scalars["Boolean"]>;
    entityAccess?: Maybe<Scalars["Boolean"]>;
    entityBundle?: Maybe<Scalars["String"]>;
    entityChanged?: Maybe<Scalars["String"]>;
    entityCreated?: Maybe<Scalars["String"]>;
    entityId?: Maybe<Scalars["String"]>;
    entityLabel?: Maybe<Scalars["String"]>;
    entityLanguage?: Maybe<Language>;
    entityOwner?: Maybe<DrupalUser>;
    entityPublished?: Maybe<Scalars["Boolean"]>;
    entityQueryExclusive: EntityQueryResult;
    /** Renders 'Content' entities in the given view mode. */
    entityRendered?: Maybe<Scalars["String"]>;
    entityRevisions: EntityQueryResult;
    entityTranslation?: Maybe<Entity>;
    entityTranslations?: Maybe<Array<Maybe<Entity>>>;
    entityType?: Maybe<Scalars["String"]>;
    entityUrl?: Maybe<Url>;
    entityUuid?: Maybe<Scalars["String"]>;
    /** Category for this frequently asked question. First tag is used as Category - could be 'bestillinger', 'Søgninger' or 'Login'. Faq's will be grouped by category */
    fieldTags?: Maybe<Array<Maybe<FieldNodeFaqFieldTags>>>;
    langcode?: Maybe<FieldNodeLangcode>;
    nid?: Maybe<Scalars["Int"]>;
    path?: Maybe<FieldNodePath>;
    promote?: Maybe<Scalars["Boolean"]>;
    /** Query reference:  */
    queryFieldTags?: Maybe<EntityQueryResult>;
    /** Query reference: The user ID of the author of the current revision. */
    queryRevisionUid?: Maybe<EntityQueryResult>;
    /** Query reference:  */
    queryType?: Maybe<EntityQueryResult>;
    /** Query reference: The username of the content author. */
    queryUid?: Maybe<EntityQueryResult>;
    /** Reverse reference: The ID of the entity of which this comment is a reply. */
    reverseEntityIdComment: EntityQueryResult;
    /** A flag indicating whether this was a default revision when it was saved. */
    revisionDefault?: Maybe<Scalars["Boolean"]>;
    /** Briefly describe the changes you have made. */
    revisionLog?: Maybe<Scalars["String"]>;
    /** The time that the current revision was created. */
    revisionTimestamp?: Maybe<Scalars["Timestamp"]>;
    /** Indicates if the last edit of a translation belongs to current revision. */
    revisionTranslationAffected?: Maybe<Scalars["Boolean"]>;
    /** The user ID of the author of the current revision. */
    revisionUid?: Maybe<FieldNodeRevisionUid>;
    status?: Maybe<Scalars["Boolean"]>;
    sticky?: Maybe<Scalars["Boolean"]>;
    title?: Maybe<Scalars["String"]>;
    type?: Maybe<FieldNodeType>;
    /** The username of the content author. */
    uid?: Maybe<FieldNodeUid>;
    uuid?: Maybe<Scalars["String"]>;
    vid?: Maybe<Scalars["Int"]>;
  };

/** The 'faq' bundle of the 'Content' entity type. */
export type NodeFaqEntityAccessArgs = {
  operation: Scalars["String"];
};

/** The 'faq' bundle of the 'Content' entity type. */
export type NodeFaqEntityChangedArgs = {
  format?: InputMaybe<Scalars["String"]>;
};

/** The 'faq' bundle of the 'Content' entity type. */
export type NodeFaqEntityCreatedArgs = {
  format?: InputMaybe<Scalars["String"]>;
};

/** The 'faq' bundle of the 'Content' entity type. */
export type NodeFaqEntityQueryExclusiveArgs = {
  bundles?: InputMaybe<EntityQueryBundleMode>;
  filter?: InputMaybe<EntityQueryFilterInput>;
  limit?: InputMaybe<Scalars["Int"]>;
  offset?: InputMaybe<Scalars["Int"]>;
  revisions?: InputMaybe<EntityQueryRevisionMode>;
  sort?: InputMaybe<Array<InputMaybe<EntityQuerySortInput>>>;
};

/** The 'faq' bundle of the 'Content' entity type. */
export type NodeFaqEntityRenderedArgs = {
  mode?: InputMaybe<NodeDisplayModeId>;
};

/** The 'faq' bundle of the 'Content' entity type. */
export type NodeFaqEntityRevisionsArgs = {
  filter?: InputMaybe<EntityQueryFilterInput>;
  limit?: InputMaybe<Scalars["Int"]>;
  offset?: InputMaybe<Scalars["Int"]>;
  sort?: InputMaybe<Array<InputMaybe<EntityQuerySortInput>>>;
};

/** The 'faq' bundle of the 'Content' entity type. */
export type NodeFaqEntityTranslationArgs = {
  language: LanguageId;
};

/** The 'faq' bundle of the 'Content' entity type. */
export type NodeFaqQueryFieldTagsArgs = {
  filter?: InputMaybe<EntityQueryFilterInput>;
  limit?: InputMaybe<Scalars["Int"]>;
  offset?: InputMaybe<Scalars["Int"]>;
  revisions?: InputMaybe<EntityQueryRevisionMode>;
  sort?: InputMaybe<Array<InputMaybe<EntityQuerySortInput>>>;
};

/** The 'faq' bundle of the 'Content' entity type. */
export type NodeFaqQueryRevisionUidArgs = {
  filter?: InputMaybe<EntityQueryFilterInput>;
  limit?: InputMaybe<Scalars["Int"]>;
  offset?: InputMaybe<Scalars["Int"]>;
  revisions?: InputMaybe<EntityQueryRevisionMode>;
  sort?: InputMaybe<Array<InputMaybe<EntityQuerySortInput>>>;
};

/** The 'faq' bundle of the 'Content' entity type. */
export type NodeFaqQueryTypeArgs = {
  filter?: InputMaybe<EntityQueryFilterInput>;
  limit?: InputMaybe<Scalars["Int"]>;
  offset?: InputMaybe<Scalars["Int"]>;
  revisions?: InputMaybe<EntityQueryRevisionMode>;
  sort?: InputMaybe<Array<InputMaybe<EntityQuerySortInput>>>;
};

/** The 'faq' bundle of the 'Content' entity type. */
export type NodeFaqQueryUidArgs = {
  filter?: InputMaybe<EntityQueryFilterInput>;
  limit?: InputMaybe<Scalars["Int"]>;
  offset?: InputMaybe<Scalars["Int"]>;
  revisions?: InputMaybe<EntityQueryRevisionMode>;
  sort?: InputMaybe<Array<InputMaybe<EntityQuerySortInput>>>;
};

/** The 'faq' bundle of the 'Content' entity type. */
export type NodeFaqReverseEntityIdCommentArgs = {
  filter?: InputMaybe<EntityQueryFilterInput>;
  limit?: InputMaybe<Scalars["Int"]>;
  offset?: InputMaybe<Scalars["Int"]>;
  revisions?: InputMaybe<EntityQueryRevisionMode>;
  sort?: InputMaybe<Array<InputMaybe<EntityQuerySortInput>>>;
};

/** The 'help text' bundle of the 'Content' entity type. */
export type NodeHelpText = Entity &
  EntityOwnable &
  EntityPublishable &
  EntityRevisionable &
  Node & {
    __typename?: "NodeHelpText";
    body?: Maybe<FieldNodeHelpTextBody>;
    /** The time that the node was last edited. */
    changed?: Maybe<Scalars["Timestamp"]>;
    /** A boolean indicating whether this translation needs to be updated. */
    contentTranslationOutdated?: Maybe<Scalars["Boolean"]>;
    /** The source language from which this translation was created. */
    contentTranslationSource?: Maybe<FieldNodeContentTranslationSource>;
    /** The time that the node was created. */
    created?: Maybe<Scalars["Timestamp"]>;
    /** A flag indicating whether this is the default translation. */
    defaultLangcode?: Maybe<Scalars["Boolean"]>;
    entityAccess?: Maybe<Scalars["Boolean"]>;
    entityBundle?: Maybe<Scalars["String"]>;
    entityChanged?: Maybe<Scalars["String"]>;
    entityCreated?: Maybe<Scalars["String"]>;
    entityId?: Maybe<Scalars["String"]>;
    entityLabel?: Maybe<Scalars["String"]>;
    entityLanguage?: Maybe<Language>;
    entityOwner?: Maybe<DrupalUser>;
    entityPublished?: Maybe<Scalars["Boolean"]>;
    entityQueryExclusive: EntityQueryResult;
    /** Renders 'Content' entities in the given view mode. */
    entityRendered?: Maybe<Scalars["String"]>;
    entityRevisions: EntityQueryResult;
    entityTranslation?: Maybe<Entity>;
    entityTranslations?: Maybe<Array<Maybe<Entity>>>;
    entityType?: Maybe<Scalars["String"]>;
    entityUrl?: Maybe<Url>;
    entityUuid?: Maybe<Scalars["String"]>;
    /** the group help text belongs to */
    fieldHelpTextGroup?: Maybe<Scalars["String"]>;
    fieldImage?: Maybe<FieldNodeHelpTextFieldImage>;
    langcode?: Maybe<FieldNodeLangcode>;
    nid?: Maybe<Scalars["Int"]>;
    path?: Maybe<FieldNodePath>;
    promote?: Maybe<Scalars["Boolean"]>;
    /** Query reference: The user ID of the author of the current revision. */
    queryRevisionUid?: Maybe<EntityQueryResult>;
    /** Query reference:  */
    queryType?: Maybe<EntityQueryResult>;
    /** Query reference: The username of the content author. */
    queryUid?: Maybe<EntityQueryResult>;
    /** Reverse reference: The ID of the entity of which this comment is a reply. */
    reverseEntityIdComment: EntityQueryResult;
    /** A flag indicating whether this was a default revision when it was saved. */
    revisionDefault?: Maybe<Scalars["Boolean"]>;
    /** Briefly describe the changes you have made. */
    revisionLog?: Maybe<Scalars["String"]>;
    /** The time that the current revision was created. */
    revisionTimestamp?: Maybe<Scalars["Timestamp"]>;
    /** Indicates if the last edit of a translation belongs to current revision. */
    revisionTranslationAffected?: Maybe<Scalars["Boolean"]>;
    /** The user ID of the author of the current revision. */
    revisionUid?: Maybe<FieldNodeRevisionUid>;
    status?: Maybe<Scalars["Boolean"]>;
    sticky?: Maybe<Scalars["Boolean"]>;
    title?: Maybe<Scalars["String"]>;
    type?: Maybe<FieldNodeType>;
    /** The username of the content author. */
    uid?: Maybe<FieldNodeUid>;
    uuid?: Maybe<Scalars["String"]>;
    vid?: Maybe<Scalars["Int"]>;
  };

/** The 'help text' bundle of the 'Content' entity type. */
export type NodeHelpTextEntityAccessArgs = {
  operation: Scalars["String"];
};

/** The 'help text' bundle of the 'Content' entity type. */
export type NodeHelpTextEntityChangedArgs = {
  format?: InputMaybe<Scalars["String"]>;
};

/** The 'help text' bundle of the 'Content' entity type. */
export type NodeHelpTextEntityCreatedArgs = {
  format?: InputMaybe<Scalars["String"]>;
};

/** The 'help text' bundle of the 'Content' entity type. */
export type NodeHelpTextEntityQueryExclusiveArgs = {
  bundles?: InputMaybe<EntityQueryBundleMode>;
  filter?: InputMaybe<EntityQueryFilterInput>;
  limit?: InputMaybe<Scalars["Int"]>;
  offset?: InputMaybe<Scalars["Int"]>;
  revisions?: InputMaybe<EntityQueryRevisionMode>;
  sort?: InputMaybe<Array<InputMaybe<EntityQuerySortInput>>>;
};

/** The 'help text' bundle of the 'Content' entity type. */
export type NodeHelpTextEntityRenderedArgs = {
  mode?: InputMaybe<NodeDisplayModeId>;
};

/** The 'help text' bundle of the 'Content' entity type. */
export type NodeHelpTextEntityRevisionsArgs = {
  filter?: InputMaybe<EntityQueryFilterInput>;
  limit?: InputMaybe<Scalars["Int"]>;
  offset?: InputMaybe<Scalars["Int"]>;
  sort?: InputMaybe<Array<InputMaybe<EntityQuerySortInput>>>;
};

/** The 'help text' bundle of the 'Content' entity type. */
export type NodeHelpTextEntityTranslationArgs = {
  language: LanguageId;
};

/** The 'help text' bundle of the 'Content' entity type. */
export type NodeHelpTextQueryRevisionUidArgs = {
  filter?: InputMaybe<EntityQueryFilterInput>;
  limit?: InputMaybe<Scalars["Int"]>;
  offset?: InputMaybe<Scalars["Int"]>;
  revisions?: InputMaybe<EntityQueryRevisionMode>;
  sort?: InputMaybe<Array<InputMaybe<EntityQuerySortInput>>>;
};

/** The 'help text' bundle of the 'Content' entity type. */
export type NodeHelpTextQueryTypeArgs = {
  filter?: InputMaybe<EntityQueryFilterInput>;
  limit?: InputMaybe<Scalars["Int"]>;
  offset?: InputMaybe<Scalars["Int"]>;
  revisions?: InputMaybe<EntityQueryRevisionMode>;
  sort?: InputMaybe<Array<InputMaybe<EntityQuerySortInput>>>;
};

/** The 'help text' bundle of the 'Content' entity type. */
export type NodeHelpTextQueryUidArgs = {
  filter?: InputMaybe<EntityQueryFilterInput>;
  limit?: InputMaybe<Scalars["Int"]>;
  offset?: InputMaybe<Scalars["Int"]>;
  revisions?: InputMaybe<EntityQueryRevisionMode>;
  sort?: InputMaybe<Array<InputMaybe<EntityQuerySortInput>>>;
};

/** The 'help text' bundle of the 'Content' entity type. */
export type NodeHelpTextReverseEntityIdCommentArgs = {
  filter?: InputMaybe<EntityQueryFilterInput>;
  limit?: InputMaybe<Scalars["Int"]>;
  offset?: InputMaybe<Scalars["Int"]>;
  revisions?: InputMaybe<EntityQueryRevisionMode>;
  sort?: InputMaybe<Array<InputMaybe<EntityQuerySortInput>>>;
};

/** The 'notification' bundle of the 'Content' entity type. */
export type NodeNotification = Entity &
  EntityOwnable &
  EntityPublishable &
  EntityRevisionable &
  Node & {
    __typename?: "NodeNotification";
    /** The time that the node was last edited. */
    changed?: Maybe<Scalars["Timestamp"]>;
    /** A boolean indicating whether this translation needs to be updated. */
    contentTranslationOutdated?: Maybe<Scalars["Boolean"]>;
    /** The source language from which this translation was created. */
    contentTranslationSource?: Maybe<FieldNodeContentTranslationSource>;
    /** The time that the node was created. */
    created?: Maybe<Scalars["Timestamp"]>;
    /** A flag indicating whether this is the default translation. */
    defaultLangcode?: Maybe<Scalars["Boolean"]>;
    entityAccess?: Maybe<Scalars["Boolean"]>;
    entityBundle?: Maybe<Scalars["String"]>;
    entityChanged?: Maybe<Scalars["String"]>;
    entityCreated?: Maybe<Scalars["String"]>;
    entityId?: Maybe<Scalars["String"]>;
    entityLabel?: Maybe<Scalars["String"]>;
    entityLanguage?: Maybe<Language>;
    entityOwner?: Maybe<DrupalUser>;
    entityPublished?: Maybe<Scalars["Boolean"]>;
    entityQueryExclusive: EntityQueryResult;
    /** Renders 'Content' entities in the given view mode. */
    entityRendered?: Maybe<Scalars["String"]>;
    entityRevisions: EntityQueryResult;
    entityTranslation?: Maybe<Entity>;
    entityTranslations?: Maybe<Array<Maybe<Entity>>>;
    entityType?: Maybe<Scalars["String"]>;
    entityUrl?: Maybe<Url>;
    entityUuid?: Maybe<Scalars["String"]>;
    fieldNotificationText?: Maybe<FieldNodeNotificationFieldNotificationText>;
    /** type of notification */
    fieldNotificationType?: Maybe<Scalars["String"]>;
    langcode?: Maybe<FieldNodeLangcode>;
    nid?: Maybe<Scalars["Int"]>;
    path?: Maybe<FieldNodePath>;
    promote?: Maybe<Scalars["Boolean"]>;
    /** Query reference: The user ID of the author of the current revision. */
    queryRevisionUid?: Maybe<EntityQueryResult>;
    /** Query reference:  */
    queryType?: Maybe<EntityQueryResult>;
    /** Query reference: The username of the content author. */
    queryUid?: Maybe<EntityQueryResult>;
    /** Reverse reference: The ID of the entity of which this comment is a reply. */
    reverseEntityIdComment: EntityQueryResult;
    /** A flag indicating whether this was a default revision when it was saved. */
    revisionDefault?: Maybe<Scalars["Boolean"]>;
    /** Briefly describe the changes you have made. */
    revisionLog?: Maybe<Scalars["String"]>;
    /** The time that the current revision was created. */
    revisionTimestamp?: Maybe<Scalars["Timestamp"]>;
    /** Indicates if the last edit of a translation belongs to current revision. */
    revisionTranslationAffected?: Maybe<Scalars["Boolean"]>;
    /** The user ID of the author of the current revision. */
    revisionUid?: Maybe<FieldNodeRevisionUid>;
    status?: Maybe<Scalars["Boolean"]>;
    sticky?: Maybe<Scalars["Boolean"]>;
    title?: Maybe<Scalars["String"]>;
    type?: Maybe<FieldNodeType>;
    /** The username of the content author. */
    uid?: Maybe<FieldNodeUid>;
    uuid?: Maybe<Scalars["String"]>;
    vid?: Maybe<Scalars["Int"]>;
  };

/** The 'notification' bundle of the 'Content' entity type. */
export type NodeNotificationEntityAccessArgs = {
  operation: Scalars["String"];
};

/** The 'notification' bundle of the 'Content' entity type. */
export type NodeNotificationEntityChangedArgs = {
  format?: InputMaybe<Scalars["String"]>;
};

/** The 'notification' bundle of the 'Content' entity type. */
export type NodeNotificationEntityCreatedArgs = {
  format?: InputMaybe<Scalars["String"]>;
};

/** The 'notification' bundle of the 'Content' entity type. */
export type NodeNotificationEntityQueryExclusiveArgs = {
  bundles?: InputMaybe<EntityQueryBundleMode>;
  filter?: InputMaybe<EntityQueryFilterInput>;
  limit?: InputMaybe<Scalars["Int"]>;
  offset?: InputMaybe<Scalars["Int"]>;
  revisions?: InputMaybe<EntityQueryRevisionMode>;
  sort?: InputMaybe<Array<InputMaybe<EntityQuerySortInput>>>;
};

/** The 'notification' bundle of the 'Content' entity type. */
export type NodeNotificationEntityRenderedArgs = {
  mode?: InputMaybe<NodeDisplayModeId>;
};

/** The 'notification' bundle of the 'Content' entity type. */
export type NodeNotificationEntityRevisionsArgs = {
  filter?: InputMaybe<EntityQueryFilterInput>;
  limit?: InputMaybe<Scalars["Int"]>;
  offset?: InputMaybe<Scalars["Int"]>;
  sort?: InputMaybe<Array<InputMaybe<EntityQuerySortInput>>>;
};

/** The 'notification' bundle of the 'Content' entity type. */
export type NodeNotificationEntityTranslationArgs = {
  language: LanguageId;
};

/** The 'notification' bundle of the 'Content' entity type. */
export type NodeNotificationQueryRevisionUidArgs = {
  filter?: InputMaybe<EntityQueryFilterInput>;
  limit?: InputMaybe<Scalars["Int"]>;
  offset?: InputMaybe<Scalars["Int"]>;
  revisions?: InputMaybe<EntityQueryRevisionMode>;
  sort?: InputMaybe<Array<InputMaybe<EntityQuerySortInput>>>;
};

/** The 'notification' bundle of the 'Content' entity type. */
export type NodeNotificationQueryTypeArgs = {
  filter?: InputMaybe<EntityQueryFilterInput>;
  limit?: InputMaybe<Scalars["Int"]>;
  offset?: InputMaybe<Scalars["Int"]>;
  revisions?: InputMaybe<EntityQueryRevisionMode>;
  sort?: InputMaybe<Array<InputMaybe<EntityQuerySortInput>>>;
};

/** The 'notification' bundle of the 'Content' entity type. */
export type NodeNotificationQueryUidArgs = {
  filter?: InputMaybe<EntityQueryFilterInput>;
  limit?: InputMaybe<Scalars["Int"]>;
  offset?: InputMaybe<Scalars["Int"]>;
  revisions?: InputMaybe<EntityQueryRevisionMode>;
  sort?: InputMaybe<Array<InputMaybe<EntityQuerySortInput>>>;
};

/** The 'notification' bundle of the 'Content' entity type. */
export type NodeNotificationReverseEntityIdCommentArgs = {
  filter?: InputMaybe<EntityQueryFilterInput>;
  limit?: InputMaybe<Scalars["Int"]>;
  offset?: InputMaybe<Scalars["Int"]>;
  revisions?: InputMaybe<EntityQueryRevisionMode>;
  sort?: InputMaybe<Array<InputMaybe<EntityQuerySortInput>>>;
};

export type OnlineAccess =
  | DigitalCopy
  | InfomediaReference
  | UrlReference
  | WebArchive;

export type Order = {
  __typename?: "Order";
  manifestation: WorkManifestation;
  orderDate: Scalars["DateTime"];
  orderId: Scalars["String"];
  pickUpBranch: Branch;
  pickUpExpiryDate: Scalars["DateTime"];
  status: OrderStatus;
};

export enum OrderPossibleReason {
  NotOwnedAcceptedByConsortia = "NOT_OWNED_ACCEPTED_BY_CONSORTIA",
  NotOwnedIllLoc = "NOT_OWNED_ILL_LOC",
  NotOwnedNoIllLoc = "NOT_OWNED_NO_ILL_LOC",
  NotOwnedWrongIllMediumtype = "NOT_OWNED_WRONG_ILL_MEDIUMTYPE",
  OwnedAccepted = "OWNED_ACCEPTED",
  OwnedOwnCatalogue = "OWNED_OWN_CATALOGUE",
  OwnedWrongMediumtype = "OWNED_WRONG_MEDIUMTYPE"
}

export enum OrderStatus {
  Active = "ACTIVE",
  AtReservationShelf = "AT_RESERVATION_SHELF",
  AvailableForPickup = "AVAILABLE_FOR_PICKUP",
  Expired = "EXPIRED",
  InProcess = "IN_PROCESS",
  RequestedViaIll = "REQUESTED_VIA_ILL",
  Unknown = "UNKNOWN"
}

export enum OrderType {
  Estimate = "ESTIMATE",
  Hold = "HOLD",
  Loan = "LOAN",
  NonReturnableCopy = "NON_RETURNABLE_COPY",
  Normal = "NORMAL",
  StackRetrieval = "STACK_RETRIEVAL"
}

/** The 'URL alias' entity type. */
export type PathAlias = Entity &
  EntityPublishable &
  EntityRevisionable & {
    __typename?: "PathAlias";
    /** An alias used with this path. */
    alias?: Maybe<Scalars["String"]>;
    entityAccess?: Maybe<Scalars["Boolean"]>;
    entityBundle?: Maybe<Scalars["String"]>;
    entityChanged?: Maybe<Scalars["String"]>;
    entityCreated?: Maybe<Scalars["String"]>;
    entityId?: Maybe<Scalars["String"]>;
    entityLabel?: Maybe<Scalars["String"]>;
    entityLanguage?: Maybe<Language>;
    entityPublished?: Maybe<Scalars["Boolean"]>;
    entityQueryExclusive: EntityQueryResult;
    entityRevisions: EntityQueryResult;
    entityTranslation?: Maybe<Entity>;
    entityTranslations?: Maybe<Array<Maybe<Entity>>>;
    entityType?: Maybe<Scalars["String"]>;
    entityUrl?: Maybe<Url>;
    entityUuid?: Maybe<Scalars["String"]>;
    id?: Maybe<Scalars["Int"]>;
    langcode?: Maybe<FieldPathAliasLangcode>;
    /** The path that this alias belongs to. */
    path?: Maybe<Scalars["String"]>;
    /** A flag indicating whether this was a default revision when it was saved. */
    revisionDefault?: Maybe<Scalars["Boolean"]>;
    revisionId?: Maybe<Scalars["Int"]>;
    status?: Maybe<Scalars["Boolean"]>;
    uuid?: Maybe<Scalars["String"]>;
  };

/** The 'URL alias' entity type. */
export type PathAliasEntityAccessArgs = {
  operation: Scalars["String"];
};

/** The 'URL alias' entity type. */
export type PathAliasEntityChangedArgs = {
  format?: InputMaybe<Scalars["String"]>;
};

/** The 'URL alias' entity type. */
export type PathAliasEntityCreatedArgs = {
  format?: InputMaybe<Scalars["String"]>;
};

/** The 'URL alias' entity type. */
export type PathAliasEntityQueryExclusiveArgs = {
  bundles?: InputMaybe<EntityQueryBundleMode>;
  filter?: InputMaybe<EntityQueryFilterInput>;
  limit?: InputMaybe<Scalars["Int"]>;
  offset?: InputMaybe<Scalars["Int"]>;
  revisions?: InputMaybe<EntityQueryRevisionMode>;
  sort?: InputMaybe<Array<InputMaybe<EntityQuerySortInput>>>;
};

/** The 'URL alias' entity type. */
export type PathAliasEntityRevisionsArgs = {
  filter?: InputMaybe<EntityQueryFilterInput>;
  limit?: InputMaybe<Scalars["Int"]>;
  offset?: InputMaybe<Scalars["Int"]>;
  sort?: InputMaybe<Array<InputMaybe<EntityQuerySortInput>>>;
};

/** The 'URL alias' entity type. */
export type PathAliasEntityTranslationArgs = {
  language: LanguageId;
};

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
  ErrorPidNotReservable = "ERROR_PID_NOT_RESERVABLE",
  ErrorUnauthorizedUser = "ERROR_UNAUTHORIZED_USER",
  Ok = "OK"
}

export type Query = {
  __typename?: "Query";
  /** Loads the list of available languages. */
  availableLanguages?: Maybe<Array<Maybe<Language>>>;
  /** Loads 'Custom block' entities by their id. */
  blockContentById?: Maybe<BlockContent>;
  /** Loads 'Custom block' entities. */
  blockContentQuery?: Maybe<EntityQueryResult>;
  /** Loads 'Custom block' entity revision by their revision id. */
  blockContentRevisionById?: Maybe<BlockContent>;
  borchk: BorchkRequestStatus;
  branches: BranchResult;
  /** Loads 'Comment' entities by their id. */
  commentById?: Maybe<Comment>;
  /** Loads 'Comment' entities. */
  commentQuery?: Maybe<EntityQueryResult>;
  /** Loads 'Contact message' entities by their id. */
  contactMessageById?: Maybe<ContactMessage>;
  /** Loads 'Contact message' entities. */
  contactMessageQuery?: Maybe<EntityQueryResult>;
  currentUserContext?: Maybe<DrupalUser>;
  deleteOrder?: Maybe<SubmitOrder>;
  draft: DraftQuery;
  /** Loads 'File' entities by their id. */
  fileById?: Maybe<File>;
  /** Loads 'File' entities. */
  fileQuery?: Maybe<EntityQueryResult>;
  help?: Maybe<HelpResponse>;
  howru?: Maybe<Scalars["String"]>;
  infomediaContent?: Maybe<Array<Maybe<InfomediaContent>>>;
  languageInterfaceContext?: Maybe<Language>;
  localizations?: Maybe<Localizations>;
  manifestation: WorkManifestation;
  /** Loads a menu by its machine-readable name. */
  menuByName?: Maybe<Menu>;
  /** Loads 'Custom menu link' entities by their id. */
  menuLinkContentById?: Maybe<MenuLinkContent>;
  /** Loads 'Custom menu link' entities. */
  menuLinkContentQuery?: Maybe<EntityQueryResult>;
  /** Loads 'Custom menu link' entity revision by their revision id. */
  menuLinkContentRevisionById?: Maybe<MenuLinkContent>;
  monitor: Scalars["String"];
  /** Loads 'Content' entities by their id. */
  nodeById?: Maybe<Node>;
  nodeContext?: Maybe<Node>;
  /** Loads 'Content' entities. */
  nodeQuery?: Maybe<EntityQueryResult>;
  /** Loads 'Content' entity revision by their revision id. */
  nodeRevisionById?: Maybe<Node>;
  /** Loads 'URL alias' entities by their id. */
  pathAliasById?: Maybe<PathAlias>;
  /** Loads 'URL alias' entities. */
  pathAliasQuery?: Maybe<EntityQueryResult>;
  /** Loads 'URL alias' entity revision by their revision id. */
  pathAliasRevisionById?: Maybe<PathAlias>;
  refWorks: Scalars["String"];
  ris: Scalars["String"];
  /** Loads a route by its path. */
  route?: Maybe<Url>;
  search: SearchResponse;
  session?: Maybe<Session>;
  /** Loads 'Shortcut link' entities by their id. */
  shortcutById?: Maybe<Shortcut>;
  /** Loads 'Shortcut link' entities. */
  shortcutQuery?: Maybe<EntityQueryResult>;
  suggest: SuggestResponse;
  /** Loads 'Taxonomy term' entities by their id. */
  taxonomyTermById?: Maybe<TaxonomyTerm>;
  /** Loads 'Taxonomy term' entities. */
  taxonomyTermQuery?: Maybe<EntityQueryResult>;
  /** Loads 'Taxonomy term' entity revision by their revision id. */
  taxonomyTermRevisionById?: Maybe<TaxonomyTerm>;
  user: User;
  /** Loads 'User' entities by their id. */
  userById?: Maybe<DrupalUser>;
  /** Loads 'User' entities. */
  userQuery?: Maybe<EntityQueryResult>;
  work?: Maybe<Work>;
  works: Array<Maybe<Work>>;
};

export type QueryBlockContentByIdArgs = {
  id: Scalars["String"];
  language?: InputMaybe<LanguageId>;
};

export type QueryBlockContentQueryArgs = {
  filter?: InputMaybe<EntityQueryFilterInput>;
  limit?: InputMaybe<Scalars["Int"]>;
  offset?: InputMaybe<Scalars["Int"]>;
  revisions?: InputMaybe<EntityQueryRevisionMode>;
  sort?: InputMaybe<Array<InputMaybe<EntityQuerySortInput>>>;
};

export type QueryBlockContentRevisionByIdArgs = {
  id: Scalars["String"];
  language?: InputMaybe<LanguageId>;
};

export type QueryBorchkArgs = {
  libraryCode: Scalars["String"];
  userId: Scalars["String"];
  userPincode: Scalars["String"];
};

export type QueryBranchesArgs = {
  agencyid?: InputMaybe<Scalars["String"]>;
  branchId?: InputMaybe<Scalars["String"]>;
  language?: InputMaybe<LanguageCode>;
  limit?: InputMaybe<Scalars["PaginationLimit"]>;
  offset?: InputMaybe<Scalars["Int"]>;
  q?: InputMaybe<Scalars["String"]>;
};

export type QueryCommentByIdArgs = {
  id: Scalars["String"];
  language?: InputMaybe<LanguageId>;
};

export type QueryCommentQueryArgs = {
  filter?: InputMaybe<EntityQueryFilterInput>;
  limit?: InputMaybe<Scalars["Int"]>;
  offset?: InputMaybe<Scalars["Int"]>;
  revisions?: InputMaybe<EntityQueryRevisionMode>;
  sort?: InputMaybe<Array<InputMaybe<EntityQuerySortInput>>>;
};

export type QueryContactMessageByIdArgs = {
  id: Scalars["String"];
};

export type QueryContactMessageQueryArgs = {
  filter?: InputMaybe<EntityQueryFilterInput>;
  limit?: InputMaybe<Scalars["Int"]>;
  offset?: InputMaybe<Scalars["Int"]>;
  revisions?: InputMaybe<EntityQueryRevisionMode>;
  sort?: InputMaybe<Array<InputMaybe<EntityQuerySortInput>>>;
};

export type QueryDeleteOrderArgs = {
  orderId: Scalars["String"];
  orderType: OrderType;
};

export type QueryFileByIdArgs = {
  id: Scalars["String"];
};

export type QueryFileQueryArgs = {
  filter?: InputMaybe<EntityQueryFilterInput>;
  limit?: InputMaybe<Scalars["Int"]>;
  offset?: InputMaybe<Scalars["Int"]>;
  revisions?: InputMaybe<EntityQueryRevisionMode>;
  sort?: InputMaybe<Array<InputMaybe<EntityQuerySortInput>>>;
};

export type QueryHelpArgs = {
  language?: InputMaybe<LanguageCode>;
  q: Scalars["String"];
};

export type QueryInfomediaContentArgs = {
  pid: Scalars["String"];
};

export type QueryLocalizationsArgs = {
  pids: Array<Scalars["String"]>;
};

export type QueryManifestationArgs = {
  pid: Scalars["String"];
};

export type QueryMenuByNameArgs = {
  language?: InputMaybe<LanguageId>;
  name: Scalars["String"];
};

export type QueryMenuLinkContentByIdArgs = {
  id: Scalars["String"];
  language?: InputMaybe<LanguageId>;
};

export type QueryMenuLinkContentQueryArgs = {
  filter?: InputMaybe<EntityQueryFilterInput>;
  limit?: InputMaybe<Scalars["Int"]>;
  offset?: InputMaybe<Scalars["Int"]>;
  revisions?: InputMaybe<EntityQueryRevisionMode>;
  sort?: InputMaybe<Array<InputMaybe<EntityQuerySortInput>>>;
};

export type QueryMenuLinkContentRevisionByIdArgs = {
  id: Scalars["String"];
  language?: InputMaybe<LanguageId>;
};

export type QueryMonitorArgs = {
  name: Scalars["String"];
};

export type QueryNodeByIdArgs = {
  id: Scalars["String"];
  language?: InputMaybe<LanguageId>;
};

export type QueryNodeQueryArgs = {
  filter?: InputMaybe<EntityQueryFilterInput>;
  limit?: InputMaybe<Scalars["Int"]>;
  offset?: InputMaybe<Scalars["Int"]>;
  revisions?: InputMaybe<EntityQueryRevisionMode>;
  sort?: InputMaybe<Array<InputMaybe<EntityQuerySortInput>>>;
};

export type QueryNodeRevisionByIdArgs = {
  id: Scalars["String"];
  language?: InputMaybe<LanguageId>;
};

export type QueryPathAliasByIdArgs = {
  id: Scalars["String"];
};

export type QueryPathAliasQueryArgs = {
  filter?: InputMaybe<EntityQueryFilterInput>;
  limit?: InputMaybe<Scalars["Int"]>;
  offset?: InputMaybe<Scalars["Int"]>;
  revisions?: InputMaybe<EntityQueryRevisionMode>;
  sort?: InputMaybe<Array<InputMaybe<EntityQuerySortInput>>>;
};

export type QueryPathAliasRevisionByIdArgs = {
  id: Scalars["String"];
};

export type QueryRefWorksArgs = {
  pid: Scalars["String"];
};

export type QueryRisArgs = {
  pid: Scalars["String"];
};

export type QueryRouteArgs = {
  path: Scalars["String"];
};

export type QuerySearchArgs = {
  filters?: InputMaybe<SearchFilters>;
  q: SearchQuery;
};

export type QueryShortcutByIdArgs = {
  id: Scalars["String"];
  language?: InputMaybe<LanguageId>;
};

export type QueryShortcutQueryArgs = {
  filter?: InputMaybe<EntityQueryFilterInput>;
  limit?: InputMaybe<Scalars["Int"]>;
  offset?: InputMaybe<Scalars["Int"]>;
  revisions?: InputMaybe<EntityQueryRevisionMode>;
  sort?: InputMaybe<Array<InputMaybe<EntityQuerySortInput>>>;
};

export type QuerySuggestArgs = {
  q: Scalars["String"];
  suggesttype?: InputMaybe<Scalars["String"]>;
  worktype?: InputMaybe<WorkType>;
};

export type QueryTaxonomyTermByIdArgs = {
  id: Scalars["String"];
  language?: InputMaybe<LanguageId>;
};

export type QueryTaxonomyTermQueryArgs = {
  filter?: InputMaybe<EntityQueryFilterInput>;
  limit?: InputMaybe<Scalars["Int"]>;
  offset?: InputMaybe<Scalars["Int"]>;
  revisions?: InputMaybe<EntityQueryRevisionMode>;
  sort?: InputMaybe<Array<InputMaybe<EntityQuerySortInput>>>;
};

export type QueryTaxonomyTermRevisionByIdArgs = {
  id: Scalars["String"];
  language?: InputMaybe<LanguageId>;
};

export type QueryUserByIdArgs = {
  id: Scalars["String"];
  language?: InputMaybe<LanguageId>;
};

export type QueryUserQueryArgs = {
  filter?: InputMaybe<EntityQueryFilterInput>;
  limit?: InputMaybe<Scalars["Int"]>;
  offset?: InputMaybe<Scalars["Int"]>;
  revisions?: InputMaybe<EntityQueryRevisionMode>;
  sort?: InputMaybe<Array<InputMaybe<EntityQuerySortInput>>>;
};

export type QueryWorkArgs = {
  faust?: InputMaybe<Scalars["String"]>;
  id?: InputMaybe<Scalars["String"]>;
};

export type QueryWorksArgs = {
  faust?: InputMaybe<Array<Scalars["String"]>>;
  id?: InputMaybe<Array<Scalars["String"]>>;
};

export enum QueryConjunction {
  And = "AND",
  Or = "OR"
}

export enum QueryOperator {
  Between = "BETWEEN",
  Equal = "EQUAL",
  GreaterThan = "GREATER_THAN",
  GreaterThanOrEqual = "GREATER_THAN_OR_EQUAL",
  In = "IN",
  IsNotNull = "IS_NOT_NULL",
  IsNull = "IS_NULL",
  Like = "LIKE",
  NotBetween = "NOT_BETWEEN",
  NotEqual = "NOT_EQUAL",
  NotIn = "NOT_IN",
  NotLike = "NOT_LIKE",
  SmallerThan = "SMALLER_THAN",
  SmallerThanOrEqual = "SMALLER_THAN_OR_EQUAL"
}

export type Recommendation = {
  __typename?: "Recommendation";
  manifestation: WorkManifestation;
  reader?: Maybe<Scalars["String"]>;
  value?: Maybe<Scalars["Float"]>;
  work: Work;
};

export type Review = ReviewExternalMedia | ReviewInfomedia | ReviewMatVurd;

export type ReviewExternalMedia = {
  __typename?: "ReviewExternalMedia";
  alternateUrl?: Maybe<Scalars["String"]>;
  author: Scalars["String"];
  date: Scalars["String"];
  media: Scalars["String"];
  rating: Scalars["String"];
  url: Scalars["String"];
};

export type ReviewInfomedia = {
  __typename?: "ReviewInfomedia";
  author: Scalars["String"];
  date: Scalars["String"];
  media: Scalars["String"];
  rating: Scalars["String"];
  reference?: Maybe<Array<Maybe<InfomediaReference>>>;
};

export type ReviewMatVurd = {
  __typename?: "ReviewMatVurd";
  about: Array<TextWithWork>;
  all: Array<TextWithWork>;
  author: Scalars["String"];
  date: Scalars["String"];
  description: Array<TextWithWork>;
  evaluation: Array<TextWithWork>;
  other: Array<TextWithWork>;
};

export type Seo = {
  __typename?: "SEO";
  description: Scalars["String"];
  title: Scalars["String"];
};

/** Search Filters */
export type SearchFilters = {
  accessType?: InputMaybe<Array<Scalars["String"]>>;
  audience?: InputMaybe<Array<Scalars["String"]>>;
  creator?: InputMaybe<Array<Scalars["String"]>>;
  fictionNonfiction?: InputMaybe<Array<Scalars["String"]>>;
  fictiveCharacter?: InputMaybe<Array<Scalars["String"]>>;
  genre?: InputMaybe<Array<Scalars["String"]>>;
  language?: InputMaybe<Array<Scalars["String"]>>;
  materialType?: InputMaybe<Array<Scalars["String"]>>;
  subject?: InputMaybe<Array<Scalars["String"]>>;
  workType?: InputMaybe<Array<Scalars["String"]>>;
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
  /**
   * Make sure only to fetch this when needed
   * This may take seconds to complete
   */
  facets: Array<FacetResult>;
  /** Total number of works found. May be used for pagination. */
  hitcount: Scalars["Int"];
  /** The works matching the given search query. Use offset and limit for pagination. */
  works: Array<Work>;
};

/** The simple search response */
export type SearchResponseFacetsArgs = {
  facets: Array<FacetField>;
};

/** The simple search response */
export type SearchResponseWorksArgs = {
  limit: Scalars["PaginationLimit"];
  offset: Scalars["Int"];
};

export type Series = {
  __typename?: "Series";
  part?: Maybe<Scalars["String"]>;
  title?: Maybe<Scalars["String"]>;
  works: Array<Work>;
};

export type Session = {
  __typename?: "Session";
  pickupBranch?: Maybe<Scalars["String"]>;
  userParameters?: Maybe<SessionUserParameters>;
};

export type SessionInput = {
  pickupBranch?: InputMaybe<Scalars["String"]>;
  userParameters?: InputMaybe<SessionUserParametersInput>;
};

export type SessionUserParameters = {
  __typename?: "SessionUserParameters";
  barcode?: Maybe<Scalars["String"]>;
  cardno?: Maybe<Scalars["String"]>;
  cpr?: Maybe<Scalars["String"]>;
  customId?: Maybe<Scalars["String"]>;
  userAddress?: Maybe<Scalars["String"]>;
  userDateOfBirth?: Maybe<Scalars["String"]>;
  userId?: Maybe<Scalars["String"]>;
  userMail?: Maybe<Scalars["String"]>;
  userName?: Maybe<Scalars["String"]>;
  userTelephone?: Maybe<Scalars["String"]>;
};

export type SessionUserParametersInput = {
  barcode?: InputMaybe<Scalars["String"]>;
  cardno?: InputMaybe<Scalars["String"]>;
  cpr?: InputMaybe<Scalars["String"]>;
  customId?: InputMaybe<Scalars["String"]>;
  userAddress?: InputMaybe<Scalars["String"]>;
  userDateOfBirth?: InputMaybe<Scalars["String"]>;
  userId?: InputMaybe<Scalars["String"]>;
  userMail?: InputMaybe<Scalars["String"]>;
  userName?: InputMaybe<Scalars["String"]>;
  userTelephone?: InputMaybe<Scalars["String"]>;
};

export type Shelf = {
  __typename?: "Shelf";
  prefix?: Maybe<Scalars["String"]>;
  shelfmark?: Maybe<Scalars["String"]>;
};

/** The 'Shortcut link' entity type. */
export type Shortcut = {
  /** A flag indicating whether this is the default translation. */
  defaultLangcode?: Maybe<Scalars["Boolean"]>;
  entityAccess?: Maybe<Scalars["Boolean"]>;
  entityBundle?: Maybe<Scalars["String"]>;
  entityChanged?: Maybe<Scalars["String"]>;
  entityCreated?: Maybe<Scalars["String"]>;
  entityId?: Maybe<Scalars["String"]>;
  entityLabel?: Maybe<Scalars["String"]>;
  entityLanguage?: Maybe<Language>;
  entityQueryExclusive: EntityQueryResult;
  entityTranslation?: Maybe<Entity>;
  entityTranslations?: Maybe<Array<Maybe<Entity>>>;
  entityType?: Maybe<Scalars["String"]>;
  entityUrl?: Maybe<Url>;
  entityUuid?: Maybe<Scalars["String"]>;
  /** The ID of the shortcut. */
  id?: Maybe<Scalars["Int"]>;
  /** The language code of the shortcut. */
  langcode?: Maybe<FieldShortcutLangcode>;
  /** The location this shortcut points to. */
  link?: Maybe<FieldShortcutLink>;
  /** Query reference: The bundle of the shortcut. */
  queryShortcutSet?: Maybe<EntityQueryResult>;
  /** The bundle of the shortcut. */
  shortcutSet?: Maybe<FieldShortcutShortcutSet>;
  /** The name of the shortcut. */
  title?: Maybe<Scalars["String"]>;
  /** The UUID of the shortcut. */
  uuid?: Maybe<Scalars["String"]>;
  /** Weight among shortcuts in the same shortcut set. */
  weight?: Maybe<Scalars["Int"]>;
};

/** The 'Shortcut link' entity type. */
export type ShortcutEntityAccessArgs = {
  operation: Scalars["String"];
};

/** The 'Shortcut link' entity type. */
export type ShortcutEntityChangedArgs = {
  format?: InputMaybe<Scalars["String"]>;
};

/** The 'Shortcut link' entity type. */
export type ShortcutEntityCreatedArgs = {
  format?: InputMaybe<Scalars["String"]>;
};

/** The 'Shortcut link' entity type. */
export type ShortcutEntityQueryExclusiveArgs = {
  bundles?: InputMaybe<EntityQueryBundleMode>;
  filter?: InputMaybe<EntityQueryFilterInput>;
  limit?: InputMaybe<Scalars["Int"]>;
  offset?: InputMaybe<Scalars["Int"]>;
  revisions?: InputMaybe<EntityQueryRevisionMode>;
  sort?: InputMaybe<Array<InputMaybe<EntityQuerySortInput>>>;
};

/** The 'Shortcut link' entity type. */
export type ShortcutEntityTranslationArgs = {
  language: LanguageId;
};

/** The 'Shortcut link' entity type. */
export type ShortcutQueryShortcutSetArgs = {
  filter?: InputMaybe<EntityQueryFilterInput>;
  limit?: InputMaybe<Scalars["Int"]>;
  offset?: InputMaybe<Scalars["Int"]>;
  revisions?: InputMaybe<EntityQueryRevisionMode>;
  sort?: InputMaybe<Array<InputMaybe<EntityQuerySortInput>>>;
};

/** The 'Default' bundle of the 'Shortcut link' entity type. */
export type ShortcutDefault = Entity &
  Shortcut & {
    __typename?: "ShortcutDefault";
    /** A flag indicating whether this is the default translation. */
    defaultLangcode?: Maybe<Scalars["Boolean"]>;
    entityAccess?: Maybe<Scalars["Boolean"]>;
    entityBundle?: Maybe<Scalars["String"]>;
    entityChanged?: Maybe<Scalars["String"]>;
    entityCreated?: Maybe<Scalars["String"]>;
    entityId?: Maybe<Scalars["String"]>;
    entityLabel?: Maybe<Scalars["String"]>;
    entityLanguage?: Maybe<Language>;
    entityQueryExclusive: EntityQueryResult;
    entityTranslation?: Maybe<Entity>;
    entityTranslations?: Maybe<Array<Maybe<Entity>>>;
    entityType?: Maybe<Scalars["String"]>;
    entityUrl?: Maybe<Url>;
    entityUuid?: Maybe<Scalars["String"]>;
    /** The ID of the shortcut. */
    id?: Maybe<Scalars["Int"]>;
    /** The language code of the shortcut. */
    langcode?: Maybe<FieldShortcutLangcode>;
    /** The location this shortcut points to. */
    link?: Maybe<FieldShortcutLink>;
    /** Query reference: The bundle of the shortcut. */
    queryShortcutSet?: Maybe<EntityQueryResult>;
    /** The bundle of the shortcut. */
    shortcutSet?: Maybe<FieldShortcutShortcutSet>;
    /** The name of the shortcut. */
    title?: Maybe<Scalars["String"]>;
    /** The UUID of the shortcut. */
    uuid?: Maybe<Scalars["String"]>;
    /** Weight among shortcuts in the same shortcut set. */
    weight?: Maybe<Scalars["Int"]>;
  };

/** The 'Default' bundle of the 'Shortcut link' entity type. */
export type ShortcutDefaultEntityAccessArgs = {
  operation: Scalars["String"];
};

/** The 'Default' bundle of the 'Shortcut link' entity type. */
export type ShortcutDefaultEntityChangedArgs = {
  format?: InputMaybe<Scalars["String"]>;
};

/** The 'Default' bundle of the 'Shortcut link' entity type. */
export type ShortcutDefaultEntityCreatedArgs = {
  format?: InputMaybe<Scalars["String"]>;
};

/** The 'Default' bundle of the 'Shortcut link' entity type. */
export type ShortcutDefaultEntityQueryExclusiveArgs = {
  bundles?: InputMaybe<EntityQueryBundleMode>;
  filter?: InputMaybe<EntityQueryFilterInput>;
  limit?: InputMaybe<Scalars["Int"]>;
  offset?: InputMaybe<Scalars["Int"]>;
  revisions?: InputMaybe<EntityQueryRevisionMode>;
  sort?: InputMaybe<Array<InputMaybe<EntityQuerySortInput>>>;
};

/** The 'Default' bundle of the 'Shortcut link' entity type. */
export type ShortcutDefaultEntityTranslationArgs = {
  language: LanguageId;
};

/** The 'Default' bundle of the 'Shortcut link' entity type. */
export type ShortcutDefaultQueryShortcutSetArgs = {
  filter?: InputMaybe<EntityQueryFilterInput>;
  limit?: InputMaybe<Scalars["Int"]>;
  offset?: InputMaybe<Scalars["Int"]>;
  revisions?: InputMaybe<EntityQueryRevisionMode>;
  sort?: InputMaybe<Array<InputMaybe<EntityQuerySortInput>>>;
};

export enum SortOrder {
  Asc = "ASC",
  Desc = "DESC"
}

export type Status = {
  __typename?: "Status";
  branch?: Maybe<Scalars["String"]>;
  branchId?: Maybe<Scalars["String"]>;
  circulationRule?: Maybe<Scalars["String"]>;
  department?: Maybe<Scalars["String"]>;
  expectedDelivery?: Maybe<Scalars["String"]>;
  issueId?: Maybe<Scalars["String"]>;
  issueText?: Maybe<Scalars["String"]>;
  localHoldingsId?: Maybe<Scalars["String"]>;
  location?: Maybe<Scalars["String"]>;
  note?: Maybe<Scalars["String"]>;
  readyForLoan?: Maybe<Scalars["String"]>;
  status?: Maybe<Scalars["String"]>;
  subLocation?: Maybe<Scalars["String"]>;
  willLend?: Maybe<Scalars["String"]>;
};

export type Subject = {
  __typename?: "Subject";
  type?: Maybe<Scalars["String"]>;
  value: Scalars["String"];
};

export type SubmitOrder = {
  __typename?: "SubmitOrder";
  deleted?: Maybe<Scalars["Boolean"]>;
  orderId?: Maybe<Scalars["String"]>;
  orsId?: Maybe<Scalars["String"]>;
  status?: Maybe<Scalars["String"]>;
};

export type SubmitOrderInput = {
  author?: InputMaybe<Scalars["String"]>;
  authorOfComponent?: InputMaybe<Scalars["String"]>;
  exactEdition?: InputMaybe<Scalars["Boolean"]>;
  expires?: InputMaybe<Scalars["String"]>;
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

export type SubmitOrderUserParameters = {
  barcode?: InputMaybe<Scalars["String"]>;
  cardno?: InputMaybe<Scalars["String"]>;
  cpr?: InputMaybe<Scalars["String"]>;
  customId?: InputMaybe<Scalars["String"]>;
  userAddress?: InputMaybe<Scalars["String"]>;
  userDateOfBirth?: InputMaybe<Scalars["String"]>;
  userId?: InputMaybe<Scalars["String"]>;
  userMail?: InputMaybe<Scalars["String"]>;
  userName?: InputMaybe<Scalars["String"]>;
  userTelephone?: InputMaybe<Scalars["String"]>;
};

export type SuggestResponse = {
  __typename?: "SuggestResponse";
  result: Array<SuggestRow>;
};

export type SuggestRow = Creator | Subject | Work;

export type SuggestSubject = {
  __typename?: "SuggestSubject";
  title: Scalars["String"];
};

/** The 'Taxonomy term' entity type. */
export type TaxonomyTerm = {
  /** The time that the term was last edited. */
  changed?: Maybe<Scalars["Timestamp"]>;
  /** A flag indicating whether this is the default translation. */
  defaultLangcode?: Maybe<Scalars["Boolean"]>;
  description?: Maybe<FieldTaxonomyTermDescription>;
  entityAccess?: Maybe<Scalars["Boolean"]>;
  entityBundle?: Maybe<Scalars["String"]>;
  entityChanged?: Maybe<Scalars["String"]>;
  entityCreated?: Maybe<Scalars["String"]>;
  entityId?: Maybe<Scalars["String"]>;
  entityLabel?: Maybe<Scalars["String"]>;
  entityLanguage?: Maybe<Language>;
  entityPublished?: Maybe<Scalars["Boolean"]>;
  entityQueryExclusive: EntityQueryResult;
  /** Renders 'Taxonomy term' entities in the given view mode. */
  entityRendered?: Maybe<Scalars["String"]>;
  entityRevisions: EntityQueryResult;
  entityTranslation?: Maybe<Entity>;
  entityTranslations?: Maybe<Array<Maybe<Entity>>>;
  entityType?: Maybe<Scalars["String"]>;
  entityUrl?: Maybe<Url>;
  entityUuid?: Maybe<Scalars["String"]>;
  /** The term language code. */
  langcode?: Maybe<FieldTaxonomyTermLangcode>;
  name?: Maybe<Scalars["String"]>;
  /** The parents of this term. */
  parent?: Maybe<Array<Maybe<FieldTaxonomyTermParent>>>;
  path?: Maybe<FieldTaxonomyTermPath>;
  /** Query reference: The parents of this term. */
  queryParent?: Maybe<EntityQueryResult>;
  /** Query reference: The user ID of the author of the current revision. */
  queryRevisionUser?: Maybe<EntityQueryResult>;
  /** Query reference: The vocabulary to which the term is assigned. */
  queryVid?: Maybe<EntityQueryResult>;
  /** Reverse reference:  */
  reverseFieldTagsNode: EntityQueryResult;
  /** Reverse reference: The parents of this term. */
  reverseParentTaxonomyTerm: EntityQueryResult;
  /** The time that the current revision was created. */
  revisionCreated?: Maybe<Scalars["Timestamp"]>;
  /** A flag indicating whether this was a default revision when it was saved. */
  revisionDefault?: Maybe<Scalars["Boolean"]>;
  revisionId?: Maybe<Scalars["Int"]>;
  /** Briefly describe the changes you have made. */
  revisionLogMessage?: Maybe<Scalars["String"]>;
  /** Indicates if the last edit of a translation belongs to current revision. */
  revisionTranslationAffected?: Maybe<Scalars["Boolean"]>;
  /** The user ID of the author of the current revision. */
  revisionUser?: Maybe<FieldTaxonomyTermRevisionUser>;
  status?: Maybe<Scalars["Boolean"]>;
  /** The term ID. */
  tid?: Maybe<Scalars["Int"]>;
  /** The term UUID. */
  uuid?: Maybe<Scalars["String"]>;
  /** The vocabulary to which the term is assigned. */
  vid?: Maybe<FieldTaxonomyTermVid>;
  /** The weight of this term in relation to other terms. */
  weight?: Maybe<Scalars["Int"]>;
};

/** The 'Taxonomy term' entity type. */
export type TaxonomyTermEntityAccessArgs = {
  operation: Scalars["String"];
};

/** The 'Taxonomy term' entity type. */
export type TaxonomyTermEntityChangedArgs = {
  format?: InputMaybe<Scalars["String"]>;
};

/** The 'Taxonomy term' entity type. */
export type TaxonomyTermEntityCreatedArgs = {
  format?: InputMaybe<Scalars["String"]>;
};

/** The 'Taxonomy term' entity type. */
export type TaxonomyTermEntityQueryExclusiveArgs = {
  bundles?: InputMaybe<EntityQueryBundleMode>;
  filter?: InputMaybe<EntityQueryFilterInput>;
  limit?: InputMaybe<Scalars["Int"]>;
  offset?: InputMaybe<Scalars["Int"]>;
  revisions?: InputMaybe<EntityQueryRevisionMode>;
  sort?: InputMaybe<Array<InputMaybe<EntityQuerySortInput>>>;
};

/** The 'Taxonomy term' entity type. */
export type TaxonomyTermEntityRenderedArgs = {
  mode?: InputMaybe<TaxonomyTermDisplayModeId>;
};

/** The 'Taxonomy term' entity type. */
export type TaxonomyTermEntityRevisionsArgs = {
  filter?: InputMaybe<EntityQueryFilterInput>;
  limit?: InputMaybe<Scalars["Int"]>;
  offset?: InputMaybe<Scalars["Int"]>;
  sort?: InputMaybe<Array<InputMaybe<EntityQuerySortInput>>>;
};

/** The 'Taxonomy term' entity type. */
export type TaxonomyTermEntityTranslationArgs = {
  language: LanguageId;
};

/** The 'Taxonomy term' entity type. */
export type TaxonomyTermQueryParentArgs = {
  filter?: InputMaybe<EntityQueryFilterInput>;
  limit?: InputMaybe<Scalars["Int"]>;
  offset?: InputMaybe<Scalars["Int"]>;
  revisions?: InputMaybe<EntityQueryRevisionMode>;
  sort?: InputMaybe<Array<InputMaybe<EntityQuerySortInput>>>;
};

/** The 'Taxonomy term' entity type. */
export type TaxonomyTermQueryRevisionUserArgs = {
  filter?: InputMaybe<EntityQueryFilterInput>;
  limit?: InputMaybe<Scalars["Int"]>;
  offset?: InputMaybe<Scalars["Int"]>;
  revisions?: InputMaybe<EntityQueryRevisionMode>;
  sort?: InputMaybe<Array<InputMaybe<EntityQuerySortInput>>>;
};

/** The 'Taxonomy term' entity type. */
export type TaxonomyTermQueryVidArgs = {
  filter?: InputMaybe<EntityQueryFilterInput>;
  limit?: InputMaybe<Scalars["Int"]>;
  offset?: InputMaybe<Scalars["Int"]>;
  revisions?: InputMaybe<EntityQueryRevisionMode>;
  sort?: InputMaybe<Array<InputMaybe<EntityQuerySortInput>>>;
};

/** The 'Taxonomy term' entity type. */
export type TaxonomyTermReverseFieldTagsNodeArgs = {
  filter?: InputMaybe<EntityQueryFilterInput>;
  limit?: InputMaybe<Scalars["Int"]>;
  offset?: InputMaybe<Scalars["Int"]>;
  revisions?: InputMaybe<EntityQueryRevisionMode>;
  sort?: InputMaybe<Array<InputMaybe<EntityQuerySortInput>>>;
};

/** The 'Taxonomy term' entity type. */
export type TaxonomyTermReverseParentTaxonomyTermArgs = {
  filter?: InputMaybe<EntityQueryFilterInput>;
  limit?: InputMaybe<Scalars["Int"]>;
  offset?: InputMaybe<Scalars["Int"]>;
  revisions?: InputMaybe<EntityQueryRevisionMode>;
  sort?: InputMaybe<Array<InputMaybe<EntityQuerySortInput>>>;
};

/** The available display modes for 'Taxonomy term' entities. */
export enum TaxonomyTermDisplayModeId {
  /** The 'Taxonomy term page' display mode for 'Taxonomy term' entities. */
  Full = "FULL"
}

/** The 'Tags' bundle of the 'Taxonomy term' entity type. */
export type TaxonomyTermTags = Entity &
  EntityPublishable &
  EntityRevisionable &
  TaxonomyTerm & {
    __typename?: "TaxonomyTermTags";
    /** The time that the term was last edited. */
    changed?: Maybe<Scalars["Timestamp"]>;
    /** A flag indicating whether this is the default translation. */
    defaultLangcode?: Maybe<Scalars["Boolean"]>;
    description?: Maybe<FieldTaxonomyTermDescription>;
    descriptionOfTaxonomyTermTags?: Maybe<FieldTaxonomyTermTagsDescription>;
    entityAccess?: Maybe<Scalars["Boolean"]>;
    entityBundle?: Maybe<Scalars["String"]>;
    entityChanged?: Maybe<Scalars["String"]>;
    entityCreated?: Maybe<Scalars["String"]>;
    entityId?: Maybe<Scalars["String"]>;
    entityLabel?: Maybe<Scalars["String"]>;
    entityLanguage?: Maybe<Language>;
    entityPublished?: Maybe<Scalars["Boolean"]>;
    entityQueryExclusive: EntityQueryResult;
    /** Renders 'Taxonomy term' entities in the given view mode. */
    entityRendered?: Maybe<Scalars["String"]>;
    entityRevisions: EntityQueryResult;
    entityTranslation?: Maybe<Entity>;
    entityTranslations?: Maybe<Array<Maybe<Entity>>>;
    entityType?: Maybe<Scalars["String"]>;
    entityUrl?: Maybe<Url>;
    entityUuid?: Maybe<Scalars["String"]>;
    /** The term language code. */
    langcode?: Maybe<FieldTaxonomyTermLangcode>;
    name?: Maybe<Scalars["String"]>;
    /** The parents of this term. */
    parent?: Maybe<Array<Maybe<FieldTaxonomyTermParent>>>;
    /** The parents of this term. */
    parentOfTaxonomyTermTags?: Maybe<Array<Maybe<FieldTaxonomyTermTagsParent>>>;
    path?: Maybe<FieldTaxonomyTermPath>;
    pathOfTaxonomyTermTags?: Maybe<FieldTaxonomyTermTagsPath>;
    /** Query reference: The parents of this term. */
    queryParent?: Maybe<EntityQueryResult>;
    /** Query reference: The user ID of the author of the current revision. */
    queryRevisionUser?: Maybe<EntityQueryResult>;
    /** Query reference: The vocabulary to which the term is assigned. */
    queryVid?: Maybe<EntityQueryResult>;
    /** Reverse reference:  */
    reverseFieldTagsNode: EntityQueryResult;
    /** Reverse reference: The parents of this term. */
    reverseParentTaxonomyTerm: EntityQueryResult;
    /** The time that the current revision was created. */
    revisionCreated?: Maybe<Scalars["Timestamp"]>;
    /** A flag indicating whether this was a default revision when it was saved. */
    revisionDefault?: Maybe<Scalars["Boolean"]>;
    revisionId?: Maybe<Scalars["Int"]>;
    /** Briefly describe the changes you have made. */
    revisionLogMessage?: Maybe<Scalars["String"]>;
    /** Indicates if the last edit of a translation belongs to current revision. */
    revisionTranslationAffected?: Maybe<Scalars["Boolean"]>;
    /** The user ID of the author of the current revision. */
    revisionUser?: Maybe<FieldTaxonomyTermRevisionUser>;
    status?: Maybe<Scalars["Boolean"]>;
    /** The term ID. */
    tid?: Maybe<Scalars["Int"]>;
    /** The term UUID. */
    uuid?: Maybe<Scalars["String"]>;
    /** The vocabulary to which the term is assigned. */
    vid?: Maybe<FieldTaxonomyTermVid>;
    /** The weight of this term in relation to other terms. */
    weight?: Maybe<Scalars["Int"]>;
  };

/** The 'Tags' bundle of the 'Taxonomy term' entity type. */
export type TaxonomyTermTagsEntityAccessArgs = {
  operation: Scalars["String"];
};

/** The 'Tags' bundle of the 'Taxonomy term' entity type. */
export type TaxonomyTermTagsEntityChangedArgs = {
  format?: InputMaybe<Scalars["String"]>;
};

/** The 'Tags' bundle of the 'Taxonomy term' entity type. */
export type TaxonomyTermTagsEntityCreatedArgs = {
  format?: InputMaybe<Scalars["String"]>;
};

/** The 'Tags' bundle of the 'Taxonomy term' entity type. */
export type TaxonomyTermTagsEntityQueryExclusiveArgs = {
  bundles?: InputMaybe<EntityQueryBundleMode>;
  filter?: InputMaybe<EntityQueryFilterInput>;
  limit?: InputMaybe<Scalars["Int"]>;
  offset?: InputMaybe<Scalars["Int"]>;
  revisions?: InputMaybe<EntityQueryRevisionMode>;
  sort?: InputMaybe<Array<InputMaybe<EntityQuerySortInput>>>;
};

/** The 'Tags' bundle of the 'Taxonomy term' entity type. */
export type TaxonomyTermTagsEntityRenderedArgs = {
  mode?: InputMaybe<TaxonomyTermDisplayModeId>;
};

/** The 'Tags' bundle of the 'Taxonomy term' entity type. */
export type TaxonomyTermTagsEntityRevisionsArgs = {
  filter?: InputMaybe<EntityQueryFilterInput>;
  limit?: InputMaybe<Scalars["Int"]>;
  offset?: InputMaybe<Scalars["Int"]>;
  sort?: InputMaybe<Array<InputMaybe<EntityQuerySortInput>>>;
};

/** The 'Tags' bundle of the 'Taxonomy term' entity type. */
export type TaxonomyTermTagsEntityTranslationArgs = {
  language: LanguageId;
};

/** The 'Tags' bundle of the 'Taxonomy term' entity type. */
export type TaxonomyTermTagsQueryParentArgs = {
  filter?: InputMaybe<EntityQueryFilterInput>;
  limit?: InputMaybe<Scalars["Int"]>;
  offset?: InputMaybe<Scalars["Int"]>;
  revisions?: InputMaybe<EntityQueryRevisionMode>;
  sort?: InputMaybe<Array<InputMaybe<EntityQuerySortInput>>>;
};

/** The 'Tags' bundle of the 'Taxonomy term' entity type. */
export type TaxonomyTermTagsQueryRevisionUserArgs = {
  filter?: InputMaybe<EntityQueryFilterInput>;
  limit?: InputMaybe<Scalars["Int"]>;
  offset?: InputMaybe<Scalars["Int"]>;
  revisions?: InputMaybe<EntityQueryRevisionMode>;
  sort?: InputMaybe<Array<InputMaybe<EntityQuerySortInput>>>;
};

/** The 'Tags' bundle of the 'Taxonomy term' entity type. */
export type TaxonomyTermTagsQueryVidArgs = {
  filter?: InputMaybe<EntityQueryFilterInput>;
  limit?: InputMaybe<Scalars["Int"]>;
  offset?: InputMaybe<Scalars["Int"]>;
  revisions?: InputMaybe<EntityQueryRevisionMode>;
  sort?: InputMaybe<Array<InputMaybe<EntityQuerySortInput>>>;
};

/** The 'Tags' bundle of the 'Taxonomy term' entity type. */
export type TaxonomyTermTagsReverseFieldTagsNodeArgs = {
  filter?: InputMaybe<EntityQueryFilterInput>;
  limit?: InputMaybe<Scalars["Int"]>;
  offset?: InputMaybe<Scalars["Int"]>;
  revisions?: InputMaybe<EntityQueryRevisionMode>;
  sort?: InputMaybe<Array<InputMaybe<EntityQuerySortInput>>>;
};

/** The 'Tags' bundle of the 'Taxonomy term' entity type. */
export type TaxonomyTermTagsReverseParentTaxonomyTermArgs = {
  filter?: InputMaybe<EntityQueryFilterInput>;
  limit?: InputMaybe<Scalars["Int"]>;
  offset?: InputMaybe<Scalars["Int"]>;
  revisions?: InputMaybe<EntityQueryRevisionMode>;
  sort?: InputMaybe<Array<InputMaybe<EntityQuerySortInput>>>;
};

export type TextWithWork = {
  __typename?: "TextWithWork";
  heading: Scalars["String"];
  /** @deprecated Use heading instead */
  name: Scalars["String"];
  /** A piece of text mentioning a work at the end. */
  text: Scalars["String"];
  /** The work the text is refering to. When work is null, the text does not refer to a work. */
  work?: Maybe<Work>;
};

/** Fallback type for otherwise unexposed entities. */
export type UnexposedEntity = Entity & {
  __typename?: "UnexposedEntity";
  entityAccess?: Maybe<Scalars["Boolean"]>;
  entityBundle?: Maybe<Scalars["String"]>;
  entityChanged?: Maybe<Scalars["String"]>;
  entityCreated?: Maybe<Scalars["String"]>;
  entityId?: Maybe<Scalars["String"]>;
  entityLabel?: Maybe<Scalars["String"]>;
  entityLanguage?: Maybe<Language>;
  entityQueryExclusive: EntityQueryResult;
  entityTranslation?: Maybe<Entity>;
  entityTranslations?: Maybe<Array<Maybe<Entity>>>;
  entityType?: Maybe<Scalars["String"]>;
  entityUrl?: Maybe<Url>;
  entityUuid?: Maybe<Scalars["String"]>;
};

/** Fallback type for otherwise unexposed entities. */
export type UnexposedEntityEntityAccessArgs = {
  operation: Scalars["String"];
};

/** Fallback type for otherwise unexposed entities. */
export type UnexposedEntityEntityChangedArgs = {
  format?: InputMaybe<Scalars["String"]>;
};

/** Fallback type for otherwise unexposed entities. */
export type UnexposedEntityEntityCreatedArgs = {
  format?: InputMaybe<Scalars["String"]>;
};

/** Fallback type for otherwise unexposed entities. */
export type UnexposedEntityEntityQueryExclusiveArgs = {
  bundles?: InputMaybe<EntityQueryBundleMode>;
  filter?: InputMaybe<EntityQueryFilterInput>;
  limit?: InputMaybe<Scalars["Int"]>;
  offset?: InputMaybe<Scalars["Int"]>;
  revisions?: InputMaybe<EntityQueryRevisionMode>;
  sort?: InputMaybe<Array<InputMaybe<EntityQuerySortInput>>>;
};

/** Fallback type for otherwise unexposed entities. */
export type UnexposedEntityEntityTranslationArgs = {
  language: LanguageId;
};

/** Common interface for internal and external urls. */
export type Url = {
  /** The processed url path. */
  path?: Maybe<Scalars["String"]>;
  /** Boolean indicating whether this is a routed (internal) path. */
  routed?: Maybe<Scalars["Boolean"]>;
  /** The translated url object. */
  translate?: Maybe<Url>;
};

/** Common interface for internal and external urls. */
export type UrlTranslateArgs = {
  language: LanguageId;
};

export type UrlReference = {
  __typename?: "UrlReference";
  accessType?: Maybe<Scalars["String"]>;
  note: Scalars["String"];
  origin: Scalars["String"];
  url: Scalars["String"];
};

export type User = {
  __typename?: "User";
  address?: Maybe<Scalars["String"]>;
  agency: BranchResult;
  culrMail?: Maybe<Scalars["String"]>;
  debt: Array<Debt>;
  loans: Array<Loan>;
  mail?: Maybe<Scalars["String"]>;
  name: Scalars["String"];
  orders: Array<Order>;
  postalCode?: Maybe<Scalars["String"]>;
};

export type UserAgencyArgs = {
  language?: InputMaybe<LanguageCode>;
};

/** The available display modes for 'User' entities. */
export enum UserDisplayModeId {
  /** The 'Compact' display mode for 'User' entities. */
  Compact = "COMPACT",
  /** The 'User account' display mode for 'User' entities. */
  Full = "FULL"
}

export type UserParameter = {
  __typename?: "UserParameter";
  description?: Maybe<Scalars["String"]>;
  parameterRequired: Scalars["Boolean"];
  userParameterType: VipUserParameter;
};

export enum VipUserParameter {
  Barcode = "barcode",
  Cardno = "cardno",
  Cpr = "cpr",
  CustomId = "customId",
  UserAddress = "userAddress",
  UserDateOfBirth = "userDateOfBirth",
  UserId = "userId",
  UserMail = "userMail",
  UserName = "userName",
  UserTelephone = "userTelephone"
}

export type WebArchive = {
  __typename?: "WebArchive";
  pid: Scalars["String"];
  type: Scalars["String"];
  url: Scalars["String"];
};

export type Work = {
  __typename?: "Work";
  cover: Cover;
  creators: Array<Creator>;
  description?: Maybe<Scalars["String"]>;
  fullTitle?: Maybe<Scalars["String"]>;
  id: Scalars["String"];
  manifestations: Array<WorkManifestation>;
  materialTypes: Array<MaterialType>;
  path: Array<Scalars["String"]>;
  reviews: Array<Review>;
  seo: Seo;
  series?: Maybe<Series>;
  subjects: Array<Subject>;
  title?: Maybe<Scalars["String"]>;
  workTypes: Array<WorkType>;
};

export type WorkManifestation = {
  __typename?: "WorkManifestation";
  admin?: Maybe<AdminData>;
  availability?: Maybe<Availability>;
  checkorder?: Maybe<CheckOrderPolicy>;
  content?: Maybe<Array<Scalars["String"]>>;
  cover: Cover;
  creators: Array<Creator>;
  datePublished: Scalars["CustomDateFormat"];
  description: Scalars["String"];
  dk5: Array<Dk5>;
  edition: Scalars["String"];
  fullTitle: Scalars["String"];
  /** Where this manifestation is published. For instance, in which magazine an article is published. */
  hostPublication?: Maybe<HostPublication>;
  hostPublicationPid?: Maybe<Scalars["String"]>;
  inLanguage?: Maybe<Scalars["String"]>;
  isbn?: Maybe<Scalars["String"]>;
  language: Array<Scalars["String"]>;
  materialType: Scalars["String"];
  notes: Array<Scalars["String"]>;
  onlineAccess: Array<OnlineAccess>;
  originalTitle?: Maybe<Scalars["String"]>;
  originals: Array<Scalars["String"]>;
  physicalDescription: Scalars["String"];
  physicalDescriptionArticles?: Maybe<Scalars["String"]>;
  pid: Scalars["String"];
  publisher: Array<Scalars["String"]>;
  recommendations: Array<Maybe<Recommendation>>;
  shelf?: Maybe<Shelf>;
  title?: Maybe<Scalars["String"]>;
  usedLanguage?: Maybe<Array<Maybe<Scalars["String"]>>>;
  volume?: Maybe<Scalars["String"]>;
};

export type WorkManifestationCheckorderArgs = {
  pickupBranch: Scalars["String"];
};

export type WorkManifestationDatePublishedArgs = {
  format?: InputMaybe<Scalars["String"]>;
  locale?: InputMaybe<Scalars["String"]>;
};

export type WorkManifestationRecommendationsArgs = {
  limit?: InputMaybe<Scalars["Int"]>;
};

export enum WorkType {
  Analysis = "analysis",
  Article = "article",
  Bookdescription = "bookdescription",
  Game = "game",
  Literature = "literature",
  Map = "map",
  Movie = "movie",
  Music = "music",
  None = "none",
  Periodica = "periodica",
  Portrait = "portrait",
  Review = "review",
  Sheetmusic = "sheetmusic",
  Track = "track"
}

export type HoldingAgency = {
  __typename?: "holdingAgency";
  agencyId?: Maybe<Scalars["String"]>;
  holdingItems?: Maybe<Array<Maybe<HoldingsItem>>>;
};

export type HoldingsItem = {
  __typename?: "holdingsItem";
  codes?: Maybe<Scalars["String"]>;
  localIdentifier?: Maybe<Scalars["String"]>;
  localizationPid?: Maybe<Scalars["String"]>;
};

export type SuggestionsFromQueryStringQueryVariables = Exact<{
  q: Scalars["String"];
}>;

export type SuggestionsFromQueryStringQuery = {
  __typename?: "Query";
  suggest: {
    __typename?: "SuggestResponse";
    result: Array<
      | { __typename: "Creator"; name: string }
      | { __typename: "Subject"; value: string }
      | { __typename: "Work"; id: string; title?: string | null }
    >;
  };
};

export const SuggestionsFromQueryStringDocument = `
    query suggestionsFromQueryString($q: String!) {
  suggest(q: $q) {
    result {
      __typename
      ... on Subject {
        value
      }
      ... on Creator {
        name
      }
      ... on Work {
        id
        title
      }
    }
  }
}
    `;
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
