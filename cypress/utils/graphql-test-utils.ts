import { Operations } from "../../src/core/dbc-gateway/types";
import { CyHttpMessages } from "../support/types/net-stubbing";

// Utility to match GraphQL mutation based on the operation name
export const hasOperationName = (
  req: CyHttpMessages.IncomingHttpRequest,
  operationName: Operations
) => {
  const pattern = /(query|mutation) (\w+)[(]*/g;
  const matches = pattern.exec(req.body.query);
  return matches && operationName === matches[2];
};

// Alias query if operationName matches
export const aliasOperation = (
  req: CyHttpMessages.IncomingHttpRequest,
  operationName: Operations
) => {
  if (hasOperationName(req, operationName)) {
    const copyReq = req;
    copyReq.alias = `gql${operationName}Operation`;
  }
};
