import FetcherCriticalHttpError from "../fetchers/FetcherCriticalHttpError";

export default class DbcGateWayHttpError<
  ContextType
> extends FetcherCriticalHttpError<ContextType> {
  public readonly name = "DbcGateWayHttpError";
}
