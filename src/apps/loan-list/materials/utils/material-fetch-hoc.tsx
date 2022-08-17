import React, { useEffect, useState, ComponentType } from "react";
import {
  GetMaterialManifestationQuery,
  useGetMaterialManifestationQuery
} from "../../../../core/dbc-gateway/generated/graphql";
import { LoanDetailsV2 } from "../../../../core/fbs/model";
import { FaustId } from "../../../../core/utils/types/ids";

export interface MaterialDetailsProps {
  loanDetails: LoanDetailsV2;
}

export interface SelectableMaterialProps {
  loanDetails: LoanDetailsV2;
  renewableStatus?: string[];
  loanType?: string;
  disabled?: boolean;
  materialsToRenew?: number[];
  onChecked?: (faust: FaustId) => void;
}

export interface StackableMaterialProps {
  loanDetails: LoanDetailsV2;
  amountOfMaterialsWithDueDate?: number;
  selectDueDate?: () => void;
  selectMaterial?: ({
    material,
    loanDetails
  }: {
    material: GetMaterialManifestationQuery | undefined | null;
    loanDetails: LoanDetailsV2;
  }) => void;
}

export interface MaterialProps {
  material: GetMaterialManifestationQuery;
}

type InputProps = { faust: FaustId } & (
  | StackableMaterialProps
  | SelectableMaterialProps
  | MaterialDetailsProps
);
export type WithMaterialProps = MaterialProps &
  (SelectableMaterialProps | StackableMaterialProps | MaterialDetailsProps);

export function FetchMaterial(
  WrappedComponent: ComponentType<WithMaterialProps>
) {
  const WithFetchMaterial = ({ faust, ...props }: InputProps) => {
    const [material, setMaterial] = useState<GetMaterialManifestationQuery>();
    // Todo error handling
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
        {/* eslint-disable-next-line react/jsx-props-no-spreading */}
        {material && <WrappedComponent {...props} material={material} />}
        {/* todo loading screen missing in figma */}
        {!material && <div />}
      </>
    );
  };

  return WithFetchMaterial;
}

export default FetchMaterial;
