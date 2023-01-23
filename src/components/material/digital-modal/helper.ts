import { DigitalArticleService } from "../../../core/dbc-gateway/generated/graphql";
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

export default {};
