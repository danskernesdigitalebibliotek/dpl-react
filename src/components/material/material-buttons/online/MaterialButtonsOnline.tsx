import * as React from "react";
import { FC } from "react";
import {
  AccessUrl,
  DigitalArticleService
} from "../../../../core/dbc-gateway/generated/graphql";
import { statistics } from "../../../../core/statistics/statistics";
import { useStatistics } from "../../../../core/statistics/useStatistics";
import { ButtonSize } from "../../../../core/utils/types/button";
import { Manifestation } from "../../../../core/utils/types/entities";
import { WorkId } from "../../../../core/utils/types/ids";
import MaterialButtonOnlineDigitalArticle from "./MaterialButtonOnlineDigitalArticle";
import MaterialButtonOnlineExternal from "./MaterialButtonOnlineExternal";
import MaterialButtonOnlineInfomediaArticle from "./MaterialButtonOnlineInfomediaArticle";

export interface MaterialButtonsOnlineProps {
  manifestation: Manifestation;
  size?: ButtonSize;
  workId: WorkId;
}

const MaterialButtonsOnline: FC<MaterialButtonsOnlineProps> = ({
  manifestation,
  manifestation: {
    access: [accessElement],
    access: [{ __typename: accessType }]
  },
  size,
  workId
}) => {
  const { track } = useStatistics();
  const trackOnlineView = () => {
    track("click", {
      id: statistics.onlineReservation.id,
      name: statistics.onlineReservation.name,
      trackedData: workId
    });
  };
  // If the access type is an external type we'll show corresponding button.
  if (["Ereol", "AccessUrl"].includes(accessType)) {
    const {
      origin,
      url: externalUrl,
      loginRequired
    } = accessElement as AccessUrl;
    return (
      <MaterialButtonOnlineExternal
        loginRequired={loginRequired}
        externalUrl={externalUrl}
        origin={origin}
        size={size}
        trackOnlineView={trackOnlineView}
        manifestation={manifestation}
      />
    );
  }

  if (accessType === "DigitalArticleService") {
    const { issn: digitalArticleIssn } = accessElement as DigitalArticleService;
    return (
      <MaterialButtonOnlineDigitalArticle
        digitalArticleIssn={digitalArticleIssn}
        size={size}
      />
    );
  }

  if (accessType === "InfomediaService") {
    return (
      <MaterialButtonOnlineInfomediaArticle
        size={size}
        manifestation={manifestation}
        trackOnlineView={trackOnlineView}
      />
    );
  }

  // Last option is an Internal Library Loan, which practically will never be
  // the case because this component is only active in case of an online loan
  return null;
};

export default MaterialButtonsOnline;
