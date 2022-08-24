import * as React from "react";
import { FC } from "react";
import { ManifestationsSimpleFieldsFragment } from "../../../../core/dbc-gateway/generated/graphql";
import MaterialButtonReserveOnlineDigitalArticle from "./MaterialButtonReserveOnlineDigitalArticle";
import MaterialButtonReserveOnlineEreol from "./MaterialButtonReserveOnlineExternal";
import MaterialButtonReserveOnlineInfomediaArticle from "./MaterialButtonReserveOnlineInfomediaArticle";

export interface MaterialButtonsReserveOnlineProps {
  manifestation: ManifestationsSimpleFieldsFragment;
}

const MaterialButtonsReserveOnline: FC<MaterialButtonsReserveOnlineProps> = ({
  manifestation
}) => {
  const accessType = manifestation.access[0].__typename;

  if (accessType === "Ereol" || accessType === "AccessUrl") {
    const externalUrl = manifestation.access[0].url;
    const { origin } = manifestation.access[0];
    return (
      <MaterialButtonReserveOnlineEreol
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

  // Internal Library Loan should never be the case here for external loans
  // But we need to exclude it to access infomedia article id
  if (accessType === "InterLibraryLoan") {
    return null;
  }

  const infomediaArticleId = manifestation.access[0].id;
  return (
    <MaterialButtonReserveOnlineInfomediaArticle
      infomediaArticleId={infomediaArticleId}
    />
  );
};

export default MaterialButtonsReserveOnline;
