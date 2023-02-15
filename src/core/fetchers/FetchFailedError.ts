import { FetcherError } from "./FetcherError";

export default class FetchFailedError<
  ContextType
> extends FetcherError<ContextType> {
  context: ContextType | undefined;

  public readonly name = "FetchFailedError";

  public readonly useErrorBoundary: boolean = false;

  constructor(message: string, context?: ContextType | undefined) {
    super(message);
    this.context = context;
  }
}
