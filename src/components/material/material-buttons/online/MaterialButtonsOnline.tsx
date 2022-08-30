import * as React from "react";
import { FC } from "react";
import { ManifestationsSimpleFieldsFragment } from "../../../../core/dbc-gateway/generated/graphql";
import MaterialButtonOnlineDigitalArticle from "./MaterialButtonOnlineDigitalArticle";
import MaterialButtonOnlineExternal from "./MaterialButtonOnlineExternal";
import MaterialButtonOnlineInfomediaArticle from "./MaterialButtonOnlineInfomediaArticle";

export interface MaterialButtonsOnlineProps {
  manifestation: ManifestationsSimpleFieldsFragment;
  isOnEditionCard?: boolean;
}

const MaterialButtonsOnline: FC<MaterialButtonsOnlineProps> = ({
  manifestation,
  isOnEditionCard
}) => {
  const accessType = manifestation.access[0].__typename;

  if (accessType === "Ereol" || accessType === "AccessUrl") {
    const { origin, url: externalUrl } = manifestation.access[0];
    return (
      <MaterialButtonOnlineExternal
        externalUrl={externalUrl}
        origin={origin}
        isOnEditionCard={isOnEditionCard}
      />
    );
  }

  if (accessType === "DigitalArticleService") {
    const digitalArticleIssn = manifestation.access[0].issn;
    return (
      <MaterialButtonOnlineDigitalArticle
        digitalArticleIssn={digitalArticleIssn}
        isOnEditionCard={isOnEditionCard}
      />
    );
  }

  if (accessType === "InfomediaService") {
    const infomediaArticleId = manifestation.access[0].id;
    return (
      <MaterialButtonOnlineInfomediaArticle
        infomediaArticleId={infomediaArticleId}
        isOnEditionCard={isOnEditionCard}
      />
    );
  }

  // Last option is an Internal Library Loan, which practically will never be
  // the case because this component is only active in case of an online loan
  return null;
};

export default MaterialButtonsOnline;
