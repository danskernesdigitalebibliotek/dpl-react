import FetcherCriticalHttpError from "../../fetchers/FetcherCriticalHttpError";

// This HttpError is critical because we want to inform the user that something went wrong
// while ordering a digitial article.
export default class PublizonServiceHttpError<
  ContextType
> extends FetcherCriticalHttpError<ContextType> {
  public readonly name = "PublizonServiceHttpError";
}
