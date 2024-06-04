import FetcherHttpError from "../../fetchers/FetcherHttpError";

export default class DplCmsServiceHttpError<
  ContextType
> extends FetcherHttpError<ContextType> {
  public readonly name = "DplCmsServiceHttpError";
}
