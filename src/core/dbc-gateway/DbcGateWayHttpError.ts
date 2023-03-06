import FetcherCriticalHttpError from "../fetchers/FetcherCriticalHttpError";

// This HttpError is critical because it is the core of our data set in the applications.
// If we do not have this data, we cannot show the user the correct information.
export default class DbcGateWayHttpError<
  ContextType
> extends FetcherCriticalHttpError<ContextType> {
  public readonly name = "DbcGateWayHttpError";
}
