import { DigitalArticleService } from "../../../core/dbc-gateway/generated/graphql";
import { Manifestation } from "../../../core/utils/types/entities";
import { IssnId } from "../../../core/utils/types/ids";

export const createDigitalModalId = (digitalArticleIssn: IssnId) =>
  `digital-modal-${digitalArticleIssn}`;

export const getDigitalArticleIssn = (manifestation: Manifestation) => {
  const digitalArticle = manifestation.access.find(
    ({ __typename }) => __typename === "DigitalArticleService"
  ) as DigitalArticleService;

  return digitalArticle.issn;
};

export default {};
