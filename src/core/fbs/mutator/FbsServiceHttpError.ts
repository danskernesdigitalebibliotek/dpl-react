import FetcherCriticalHttpError from "../../fetchers/FetcherCriticalHttpError";

export default class FbsServiceHttpError<
  ContextType
> extends FetcherCriticalHttpError<ContextType> {
  public readonly name = "FbsServiceHttpError";
}
