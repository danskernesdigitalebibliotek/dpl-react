import React, { useEffect, useState } from "react";
import {
  GetMaterialManifestationQuery,
  useGetMaterialManifestationQuery
} from "../../../../core/dbc-gateway/generated/graphql";
import { LoanDetailsV2 } from "../../../../core/fbs/model";

interface WithMaterialProps {
  loanDetails: LoanDetailsV2;
  renewalStatusList?: string[];
  material: GetMaterialManifestationQuery;
  selectDueDate?: () => void;
  selectMaterial?: ({
    material,
    loanDetails
  }: {
    material: GetMaterialManifestationQuery | undefined | null;
    loanDetails: LoanDetailsV2;
  }) => void;
  amountOfMaterialsWithDueDate?: number;
  renewableStatus?: string[];
}
interface InputProps {
  faust: string;
  loanDetails: LoanDetailsV2;
  selectDueDate?: () => void;
  selectMaterial?: ({
    material,
    loanDetails
  }: {
    material: GetMaterialManifestationQuery | undefined | null;
    loanDetails: LoanDetailsV2;
  }) => void;
  amountOfMaterialsWithDueDate?: number;
  renewableStatus?: string[];
}

export function FetchMaterial(
  WrappedComponent: React.ComponentType<WithMaterialProps>
) {
  const WithFetchMaterial = ({
    faust,
    loanDetails,
    selectDueDate,
    selectMaterial,
    amountOfMaterialsWithDueDate,
    renewableStatus
  }: InputProps) => {
    const [material, setMaterial] = useState<GetMaterialManifestationQuery>();
    const { isSuccess: isSuccessManifestation, data } =
      useGetMaterialManifestationQuery({
        faust
      });
    useEffect(() => {
      if (data && isSuccessManifestation) {
        setMaterial(data);
      }
    }, [isSuccessManifestation, data]);

    return (
      <>
        {material && (
          <WrappedComponent
            loanDetails={loanDetails}
            renewableStatus={renewableStatus}
            selectDueDate={selectDueDate}
            selectMaterial={selectMaterial}
            amountOfMaterialsWithDueDate={amountOfMaterialsWithDueDate}
            material={material}
          />
        )}
        {/* todo loading figma? */}
        {!material && <div />}
      </>
    );
  };

  return WithFetchMaterial;
}

export default FetchMaterial;
