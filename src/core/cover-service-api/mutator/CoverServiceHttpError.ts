import FetcherHttpError from "../../fetchers/FetcherHttpError";

export default class CoverServiceHttpError<
  ContextType
> extends FetcherHttpError<ContextType> {
  public readonly name = "CoverServiceHttpError";
}
