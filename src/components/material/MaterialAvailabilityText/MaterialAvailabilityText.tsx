import * as React from "react";
import { getAllIdentifiers } from "../../../apps/material/helper";
import { AccessTypeCodeEnum } from "../../../core/dbc-gateway/generated/graphql";
import {
  getAllPids,
  getMaterialType
} from "../../../core/utils/helpers/general";
import { Manifestation } from "../../../core/utils/types/entities";
import { hasCorrectAccessType } from "../material-buttons/helper";
import MaterialAvailabilityTextOnline from "./online/MaterialAvailabilityTextOnline";
import MaterialAvailabilityTextPhysical from "./physical/MaterialAvailabilityTextPhysical";
import useReservableFromAnotherLibrary from "../../../core/utils/useReservableFromAnotherLibrary";
import MaterialAvailabilityTextParagraph from "./generic/MaterialAvailabilityTextParagraph";
import { useText } from "../../../core/utils/text";

interface Props {
  manifestations: Manifestation[];
}

const MaterialAvailabilityText: React.FC<Props> = ({ manifestations }) => {
  const t = useText();
  const materialType = getMaterialType(manifestations);
  const isbns = getAllIdentifiers(manifestations);
  const { materialIsReservableFromAnotherLibrary } =
    useReservableFromAnotherLibrary(manifestations);

  if (hasCorrectAccessType(AccessTypeCodeEnum.Physical, manifestations)) {
    const pids = getAllPids(manifestations);
    if (materialIsReservableFromAnotherLibrary) {
      return (
        <MaterialAvailabilityTextParagraph>
          {t("reservableFromAnotherLibraryText")}
        </MaterialAvailabilityTextParagraph>
      );
    }
    return <MaterialAvailabilityTextPhysical pids={pids} />;
  }

  if (
    hasCorrectAccessType(AccessTypeCodeEnum.Online, manifestations) &&
    isbns.length > 0 &&
    materialType
  ) {
    return (
      <MaterialAvailabilityTextOnline
        isbns={isbns}
        materialType={materialType}
      />
    );
  }

  return null;
};

export default MaterialAvailabilityText;
