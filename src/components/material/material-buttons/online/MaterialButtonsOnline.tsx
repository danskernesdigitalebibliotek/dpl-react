import * as React from "react";
import { FC } from "react";
import { first } from "lodash";
import { AccessUrl } from "../../../../core/dbc-gateway/generated/graphql";
import InvalidUrlError from "../../../../core/errors/InvalidUrlError";
import { statistics } from "../../../../core/statistics/statistics";
import { useTrackStatistics } from "../../../../core/statistics/useStatistics";
import { isUrlValid } from "../../../../core/utils/helpers/url";
import { ButtonSize } from "../../../../core/utils/types/button";
import { Manifestation } from "../../../../core/utils/types/entities";
import { WorkId } from "../../../../core/utils/types/ids";
import { hasCorrectAccess, hasCorrectMaterialType } from "../helper";
import MaterialButtonOnlineDigitalArticle from "./MaterialButtonOnlineDigitalArticle";
import MaterialButtonOnlineExternal from "./MaterialButtonOnlineExternal";
import MaterialButtonOnlineInfomediaArticle from "./MaterialButtonOnlineInfomediaArticle";
import { ManifestationMaterialType } from "../../../../core/utils/types/material-type";
import MaterialButtonsOnlineInternal from "./MaterialButtonsOnlineInternal";
import { getReaderPlayerType } from "../../../reader-player/helper";
import { getFirstManifestation } from "../../../../apps/material/helper";

export interface MaterialButtonsOnlineProps {
  manifestations: Manifestation[];
  size?: ButtonSize;
  workId: WorkId;
  dataCy?: string;
  ariaLabelledBy: string;
}

const MaterialButtonsOnline: FC<MaterialButtonsOnlineProps> = ({
  manifestations,
  size,
  workId,
  dataCy = "material-buttons-online",
  ariaLabelledBy
}) => {
  const { track } = useTrackStatistics();
  const trackOnlineView = () => {
    return track("click", {
      id: statistics.onlineReservation.id,
      name: statistics.onlineReservation.name,
      trackedData: workId
    });
  };
  const readerPlayerType = getReaderPlayerType(
    getFirstManifestation(manifestations)
  );

  if (readerPlayerType === "player" || readerPlayerType === "reader") {
    return (
      <MaterialButtonsOnlineInternal
        openModal
        size={size}
        manifestations={manifestations}
        dataCy={`${dataCy}-internal`}
      />
    );
  }

  // Check if the access type is external (e.g., Filmstriben or eReolen Global).
  if (hasCorrectAccess("AccessUrl", manifestations)) {
    // Get the first manifestation
    const manifestation = first(manifestations);

    // Get the first active access element, but prefer DBC Webarkiv.
    const accessElement =
      manifestation?.access?.find(
        (access) =>
          access.__typename === "AccessUrl" &&
          access.status === "OK" &&
          access.origin === "DBC Webarkiv"
      ) ||
      manifestation?.access?.find(
        (access) => access.__typename === "AccessUrl" && access.status === "OK"
      );

    if (!accessElement) {
      // If there is no active access element, don't render anything.
      return null;
    }
    const { origin, url: externalUrl } = accessElement as AccessUrl;

    //  We have experienced that externalUrl is not always valid.
    if (!isUrlValid(externalUrl)) {
      throw new InvalidUrlError(
        `The external url is not valid. ( ${externalUrl} )`
      );
    }

    return (
      <MaterialButtonOnlineExternal
        externalUrl={externalUrl}
        origin={origin}
        size={size}
        trackOnlineView={trackOnlineView}
        manifestations={manifestations}
        dataCy={`${dataCy}-external`}
        ariaLabelledBy={ariaLabelledBy}
      />
    );
  }

  if (
    hasCorrectAccess("DigitalArticleService", manifestations) &&
    hasCorrectMaterialType(ManifestationMaterialType.article, manifestations)
  ) {
    return (
      <MaterialButtonOnlineDigitalArticle
        pid={manifestations[0].pid}
        size={size}
        dataCy={`${dataCy}-digital-article`}
      />
    );
  }

  if (hasCorrectAccess("InfomediaService", manifestations)) {
    return (
      <MaterialButtonOnlineInfomediaArticle
        size={size}
        manifestations={manifestations}
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
