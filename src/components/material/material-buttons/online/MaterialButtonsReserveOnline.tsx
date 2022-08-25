import * as React from "react";
import { FC } from "react";
import { ManifestationsSimpleFieldsFragment } from "../../../../core/dbc-gateway/generated/graphql";
import MaterialButtonReserveOnlineDigitalArticle from "./MaterialButtonReserveOnlineDigitalArticle";
import MaterialButtonReserveOnlineExternal from "./MaterialButtonReserveOnlineExternal";
import MaterialButtonReserveOnlineInfomediaArticle from "./MaterialButtonReserveOnlineInfomediaArticle";

export interface MaterialButtonsReserveOnlineProps {
  manifestation: ManifestationsSimpleFieldsFragment;
}

const MaterialButtonsReserveOnline: FC<MaterialButtonsReserveOnlineProps> = ({
  manifestation
}) => {
  const accessType = manifestation.access[0].__typename;

  if (accessType === "Ereol" || accessType === "AccessUrl") {
    const { origin, url: externalUrl } = manifestation.access[0];
    return (
      <MaterialButtonReserveOnlineExternal
        externalUrl={externalUrl}
        origin={origin}
      />
    );
  }

  if (accessType === "DigitalArticleService") {
    const digitalArticleIssn = manifestation.access[0].issn;
    return (
      <MaterialButtonReserveOnlineDigitalArticle
        digitalArticleIssn={digitalArticleIssn}
      />
    );
  }

  if (accessType === "InfomediaService") {
    const infomediaArticleId = manifestation.access[0].id;
    return (
      <MaterialButtonReserveOnlineInfomediaArticle
        infomediaArticleId={infomediaArticleId}
      />
    );
  }

  // Last option is an Internal Library Loan, which practically will never be
  // the case because this component is only active in case of an online loan
  return null;
};

export default MaterialButtonsReserveOnline;
