import FetcherCriticalHttpError from "../fetchers/FetcherCriticalHttpError";
// This HttpError is critical because data such as fetching user data
// is crucial for the functioning of the application.
export default class AdgangsPlatformenServiceHttpError<
  ContextType
> extends FetcherCriticalHttpError<ContextType> {
  public readonly name = "AdgangsPlatformenServiceHttpError";
}
