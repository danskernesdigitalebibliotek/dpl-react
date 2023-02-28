import FetcherHttpError from "../../fetchers/FetcherHttpError";

export default class PublizonServiceHttpError<
  ContextType
> extends FetcherHttpError<ContextType> {
  public readonly name = "PublizonServiceHttpError";
}
