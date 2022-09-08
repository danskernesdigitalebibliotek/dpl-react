import React, { useEffect, useState, ComponentType } from "react";
import {
  GetMaterialManifestationQuery,
  useGetMaterialManifestationQuery
} from "../../../../core/dbc-gateway/generated/graphql";
import { LoanMetaDataType } from "../../../../core/utils/helpers/LoanMetaDataType";
import { FaustId } from "../../../../core/utils/types/ids";

export interface MaterialDetailsProps {
  loanMetaData: LoanMetaDataType;
}

export interface SelectableMaterialProps {
  loanMetaData: LoanMetaDataType;
  disabled?: boolean;
  materialsToRenew?: number[];
  onChecked?: (faust: FaustId) => void;
} 

export interface StackableMaterialProps {
  loanMetaData: LoanMetaDataType;
  amountOfMaterialsWithDueDate?: number;
  dueDateLabel?: string;
  selectDueDate?: (dueDate: string, id: string) => void;
  selectMaterial?: ({
    material,
    loanMetaData
  }: {
    material: GetMaterialManifestationQuery | undefined | null;
    loanMetaData: LoanMetaDataType;
  }) => void;
}

export interface MaterialProps {
  material: GetMaterialManifestationQuery;
}

type InputProps = { loanMetaData: LoanMetaDataType } & (
  | StackableMaterialProps
  | SelectableMaterialProps
  | MaterialDetailsProps
);
export type WithMaterialProps = MaterialProps &
  (SelectableMaterialProps | StackableMaterialProps | MaterialDetailsProps);

export function FetchMaterial(
  WrappedComponent: ComponentType<WithMaterialProps>
) {
  const WithFetchMaterial = ({ loanMetaData, ...props }: InputProps) => {
    const [material, setMaterial] = useState<GetMaterialManifestationQuery>();
    // Todo error handling
    const { isSuccess: isSuccessManifestation, data } =
      useGetMaterialManifestationQuery({
        faust: loanMetaData?.id
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
            loanMetaData={loanMetaData}
            /* eslint-disable-next-line react/jsx-props-no-spreading */
            {...props}
            material={material}
          />
        )}
        {/* todo loading screen missing in figma */}
        {!material && <div />}
      </>
    );
  };

  return WithFetchMaterial;
}

export default FetchMaterial;
