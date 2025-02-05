import * as React from "react";
import { FC } from "react";
import { AccessUrl } from "../../../../core/dbc-gateway/generated/graphql";
import InvalidUrlError from "../../../../core/errors/InvalidUrlError";
import { statistics } from "../../../../core/statistics/statistics";
import { useStatistics } from "../../../../core/statistics/useStatistics";
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
import featureFlag from "../../../../core/utils/featureFlag";
import useReaderPlayer from "../../../../core/utils/useReaderPlayer";

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
  const { track } = useStatistics();
  const trackOnlineView = () => {
    return track("click", {
      id: statistics.onlineReservation.id,
      name: statistics.onlineReservation.name,
      trackedData: workId
    });
  };
  const { orderId } = useReaderPlayer(manifestations);

  // Todo: Move logic for Player / Reader buttons / Links to here.
  // if (condition) {
  //   return <MaterialButtonsOnlineInternal manifestations={manifestations} />;
  // }

  // Find 'Ereol' object or default to the first 'access' object
  const accessElement =
    manifestations[0].access.find((item) => item.__typename === "Ereol") ||
    manifestations[0].access[0];

  // If the access type is an external type we'll show corresponding button.
  if (
    hasCorrectAccess("Ereol", manifestations) ||
    hasCorrectAccess("AccessUrl", manifestations)
  ) {
    const { origin, url: externalUrl } = accessElement as AccessUrl;

    //  We have experienced that externalUrl is not always valid.
    if (!isUrlValid(externalUrl)) {
      throw new InvalidUrlError(
        `The external url is not valid. ( ${externalUrl} )`
      );
    }

    return (
      <>
        {/* Display MaterialButtonOnlineExternal if the material is not part of the user's loans */}
        {!orderId && (
          <MaterialButtonOnlineExternal
            externalUrl={externalUrl}
            origin={origin}
            size={size}
            trackOnlineView={trackOnlineView}
            manifestations={manifestations}
            dataCy={`${dataCy}-external`}
            ariaLabelledBy={ariaLabelledBy}
          />
        )}
        {featureFlag.isActive("readerPlayer") && (
          <MaterialButtonsOnlineInternal
            openModal
            size={size}
            manifestations={manifestations}
            dataCy={`${dataCy}-publizon`}
          />
        )}
      </>
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
