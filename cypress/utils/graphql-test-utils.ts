import { CyHttpMessages } from "cypress/types/net-stubbing";

// Utility to match GraphQL mutation based on the operation name
export const hasOperationName = (
  req: CyHttpMessages.IncomingHttpRequest,
  operationName: string
) => {
  const { body } = req;
  const pattern = /(?<=query.)(.*)(?=\()/g;
  const bodyOperationName = body.query.match(pattern)[0];
  return bodyOperationName === operationName;
};

// Alias query if operationName matches
export const aliasQuery = (
  req: CyHttpMessages.IncomingHttpRequest,
  operationName: string
) => {
  if (hasOperationName(req, operationName)) {
    const copyReq = req;
    copyReq.alias = `gql${operationName}Query`;
    return copyReq;
  }
  return null;
};

// Alias mutation if operationName matches
export const aliasMutation = (
  req: CyHttpMessages.IncomingHttpRequest,
  operationName: string
) => {
  if (hasOperationName(req, operationName)) {
    const copyReq = req;
    copyReq.alias = `gql${operationName}Mutation`;
    return copyReq;
  }
  return null;
};
