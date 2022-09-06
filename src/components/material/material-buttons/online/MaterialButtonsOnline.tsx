import * as React from "react";
import { FC } from "react";
import { ManifestationsSimpleFieldsFragment } from "../../../../core/dbc-gateway/generated/graphql";
import { ButtonSize } from "../../../../core/utils/types/button";
import MaterialButtonOnlineDigitalArticle from "./MaterialButtonOnlineDigitalArticle";
import MaterialButtonOnlineExternal from "./MaterialButtonOnlineExternal";
import MaterialButtonOnlineInfomediaArticle from "./MaterialButtonOnlineInfomediaArticle";

export interface MaterialButtonsOnlineProps {
  manifestation: ManifestationsSimpleFieldsFragment;
  size?: ButtonSize;
}

const MaterialButtonsOnline: FC<MaterialButtonsOnlineProps> = ({
  manifestation,
  size
}) => {
  const accessType = manifestation.access[0].__typename;

  if (accessType === "Ereol" || accessType === "AccessUrl") {
    const { origin, url: externalUrl } = manifestation.access[0];
    return (
      <MaterialButtonOnlineExternal
        externalUrl={externalUrl}
        origin={origin}
        size={size}
      />
    );
  }

  if (accessType === "DigitalArticleService") {
    const digitalArticleIssn = manifestation.access[0].issn;
    return (
      <MaterialButtonOnlineDigitalArticle
        digitalArticleIssn={digitalArticleIssn}
        size={size}
      />
    );
  }

  if (accessType === "InfomediaService") {
    const infomediaArticleId = manifestation.access[0].id;
    return (
      <MaterialButtonOnlineInfomediaArticle
        infomediaArticleId={infomediaArticleId}
        size={size}
      />
    );
  }

  // Last option is an Internal Library Loan, which practically will never be
  // the case because this component is only active in case of an online loan
  return null;
};

export default MaterialButtonsOnline;
