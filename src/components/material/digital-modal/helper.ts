import {
  CopyRequestStatus,
  DigitalArticleService,
  PlaceCopyMutation
} from "../../../core/dbc-gateway/generated/graphql";
import { UseTextFunction } from "../../../core/utils/text";
import { Manifestation } from "../../../core/utils/types/entities";
import { IssnId, Pid } from "../../../core/utils/types/ids";

export const createDigitalModalId = (id: Pid) => `digital-modal-${id}`;

export const getDigitalArticleIssnIds = (manifestations: Manifestation[]) => {
  const digitalArticles = manifestations.map(
    (manifestation) =>
      manifestation.access.find(
        ({ __typename }) => __typename === "DigitalArticleService"
      ) as DigitalArticleService
  );

  return digitalArticles.map((article) => article.issn) as IssnId[];
};

export const constantCaseToTitleCase = (string: string) => {
  return string
    .toLowerCase()
    .split("_")
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
    .join("");
};

export const getResponseMessage = (
  articleResponse: PlaceCopyMutation | undefined,
  t: UseTextFunction
) => {
  return articleResponse
    ? Object.values(CopyRequestStatus).reduce(
        (acc: { [key: string]: string }, current) => {
          return {
            ...acc,
            [current]: t(
              `orderDigitalCopyFeedback${constantCaseToTitleCase(current)}Text`
            )
          };
        },
        {}
      )[articleResponse.elba.placeCopyRequest.status]
    : null;
};

export default {};
