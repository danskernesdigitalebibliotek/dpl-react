import FetcherCriticalHttpError from "../../fetchers/FetcherCriticalHttpError";

export default class PublizonServiceHttpError<
  ContextType
> extends FetcherCriticalHttpError<ContextType> {
  public readonly name = "PublizonServiceHttpError";
}
