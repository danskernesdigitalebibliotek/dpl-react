import FetcherCriticalHttpError from "../../fetchers/FetcherCriticalHttpError";

// This HttpError is critical because data such as availability of materials
// and managing user data is crucial for the functioning of the application.
export default class FbsServiceHttpError<
  ContextType
> extends FetcherCriticalHttpError<ContextType> {
  public readonly name = "FbsServiceHttpError";
}
