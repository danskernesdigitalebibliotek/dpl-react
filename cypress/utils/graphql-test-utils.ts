import { CyHttpMessages } from "cypress/types/net-stubbing";

// Utility to match GraphQL mutation based on the operation name
export const hasOperationName = (
  req: CyHttpMessages.IncomingHttpRequest,
  operationName: string
) => {
  const pattern = /(query|mutation) (\w+)[(]*/g;
  const matches = pattern.exec(req.body.query);
  return matches && operationName === matches[2];
};

// Alias query if operationName matches
export const aliasOperation = (
  req: CyHttpMessages.IncomingHttpRequest,
  operationName: string
) => {
  if (hasOperationName(req, operationName)) {
    const copyReq = req;
    copyReq.alias = `gql${operationName}Operation`;
  }
};
