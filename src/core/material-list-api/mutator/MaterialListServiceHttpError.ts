import FetcherHttpError from "../../fetchers/FetcherHttpError";

export default class MaterialListServiceHttpError<
  ContextType
> extends FetcherHttpError<ContextType> {
  public readonly name = "MaterialListServiceHttpError";
}
