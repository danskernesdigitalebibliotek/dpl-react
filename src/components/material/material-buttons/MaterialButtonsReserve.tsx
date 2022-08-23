import * as React from "react";
import { FC } from "react";
import {
  AccessTypeCode,
  useGetManifestationAccessQuery
} from "../../../core/dbc-gateway/generated/graphql";
import { convertPostIdToFaustId } from "../../../core/utils/helpers/general";
import { useText } from "../../../core/utils/text";
import { Pid } from "../../../core/utils/types/ids";
import { Button } from "../../Buttons/Button";
import MaterialButtonLoading from "./MaterialButtonLoading";
import MaterialButtonsReservePhysical from "./MaterialButtonsReservePhysical";

export interface MaterialButtonsReserveProps {
  pid: Pid;
}

const MaterialButtonsReserve: FC<MaterialButtonsReserveProps> = ({ pid }) => {
  const t = useText();
  const { data, isLoading } = useGetManifestationAccessQuery({ pid });

  if (isLoading) {
    return <MaterialButtonLoading />;
  }
  if (!data) {
    // No error handling necessary here, it is according to the specs
    return null;
  }
  if (!data.manifestations[0]) {
    return null;
  }

  const accessType = data.manifestations[0].accessTypes[0].code;
  const manifestationAccess = data.manifestations[0]?.access[0];
  const manifestationMaterialType =
    data.manifestations[0].materialTypes[0].specific;

  // Check for internal library access.
  if (accessType === AccessTypeCode.Physical) {
    const faustId = convertPostIdToFaustId(pid as Pid);
    if (!faustId) {
      return null;
    }
    return (
      <MaterialButtonsReservePhysical
        faustId={faustId}
        manifestationMaterialType={manifestationMaterialType}
      />
    );
  }

  // Otherwise external access (eReol, etc.).
  // TODO
  return (
    <Button
      label={t("goToEReolenText")}
      buttonType="external-link"
      variant="filled"
      disabled={false}
      collapsible={false}
      size="large"
    />
  );
};

export default MaterialButtonsReserve;
