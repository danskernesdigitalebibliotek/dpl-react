import FetcherHttpError from "../../fetchers/FetcherHttpError";

export default class PublizonServiceHttpError<
  ContextType
> extends FetcherHttpError<ContextType> {
  public readonly name = "PublizonServiceHttpError";
  public readonly responseBody: unknown;

  constructor(
    status: number,
    message: string,
    responseBody: unknown,
    context?: ContextType
  ) {
    super(status, message, context);
    this.responseBody = responseBody;
  }
}
