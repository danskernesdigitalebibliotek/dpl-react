import FetcherHttpError from "../../fetchers/FetcherHttpError";
import { ApiResult } from "../model";

export default class PublizonServiceError<
  ContextType
> extends FetcherHttpError<ContextType> {
  public readonly name = "PublizonServiceError";
  public readonly responseBody: ApiResult;

  constructor(
    status: number,
    message: string,
    responseBody: ApiResult,
    context?: ContextType
  ) {
    super(status, message, context);
    this.responseBody = responseBody;
  }
}
