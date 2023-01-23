import * as React from "react";
import { FC } from "react";
import { AccessUrl } from "../../../../core/dbc-gateway/generated/graphql";
import { statistics } from "../../../../core/statistics/statistics";
import { useStatistics } from "../../../../core/statistics/useStatistics";
import { ButtonSize } from "../../../../core/utils/types/button";
import { Manifestation } from "../../../../core/utils/types/entities";
import { WorkId } from "../../../../core/utils/types/ids";
import { hasCorrectMaterialType } from "../helper";
import MaterialButtonOnlineDigitalArticle from "./MaterialButtonOnlineDigitalArticle";
import MaterialButtonOnlineExternal from "./MaterialButtonOnlineExternal";
import MaterialButtonOnlineInfomediaArticle from "./MaterialButtonOnlineInfomediaArticle";

export interface MaterialButtonsOnlineProps {
  selectedManifestations: Manifestation[];
  size?: ButtonSize;
  workId: WorkId;
  dataCy?: string;
}

const MaterialButtonsOnline: FC<MaterialButtonsOnlineProps> = ({
  selectedManifestations,
  size,
  workId,
  dataCy = "material-buttons-online"
}) => {
  const { track } = useStatistics();
  const trackOnlineView = () => {
    return track("click", {
      id: statistics.onlineReservation.id,
      name: statistics.onlineReservation.name,
      trackedData: workId
    });
  };

  const accessElement = selectedManifestations[0].access[0];
  const access = accessElement?.__typename;

  // If the access type is an external type we'll show corresponding button.
  if (["Ereol", "AccessUrl"].includes(access)) {
    const {
      origin,
      url: externalUrl,
      loginRequired
    } = accessElement as AccessUrl;
    // TODO:  We have experienced that externalUrl is not always valid.
    // We should use isUrlValid helper function to check is it is valid.
    return (
      <MaterialButtonOnlineExternal
        loginRequired={loginRequired}
        externalUrl={externalUrl}
        origin={origin}
        size={size}
        trackOnlineView={trackOnlineView}
        selectedManifestations={selectedManifestations}
        dataCy={`${dataCy}-external`}
      />
    );
  }

  if (
    access === "DigitalArticleService" &&
    hasCorrectMaterialType("tidsskriftsartikel", selectedManifestations)
  ) {
    return (
      <MaterialButtonOnlineDigitalArticle
        pid={selectedManifestations[0].pid}
        size={size}
        dataCy={`${dataCy}-digital-article`}
      />
    );
  }

  if (access === "InfomediaService") {
    return (
      <MaterialButtonOnlineInfomediaArticle
        size={size}
        selectedManifestations={selectedManifestations}
        trackOnlineView={trackOnlineView}
        dataCy={`${dataCy}-infomedia-article`}
      />
    );
  }

  // Last option is an Internal Library Loan, which practically will never be
  // the case because this component is only active in case of an online loan
  return null;
};

export default MaterialButtonsOnline;
