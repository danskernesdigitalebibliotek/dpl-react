import React, { useEffect, useState, ComponentType, FC } from "react";
import {
  GetMaterialManifestationQuery,
  useGetMaterialManifestationQuery
} from "../../../../core/dbc-gateway/generated/graphql";
import { FaustId } from "../../../../core/utils/types/ids";

export interface MaterialProps {
  material: GetMaterialManifestationQuery;
}

type InputProps = {
  id: FaustId;
};

const fetchMaterial =
  <P extends object>(
    Component: ComponentType<P & MaterialProps>
  ): FC<P & InputProps> =>
  ({ id, ...props }: InputProps) => {
    const [material, setMaterial] = useState<GetMaterialManifestationQuery>();

    // Todo error handling
    const { isSuccess: isSuccessManifestation, data } =
      useGetMaterialManifestationQuery({
        faust: id
      });

    useEffect(() => {
      if (data && isSuccessManifestation) {
        setMaterial(data);
      }
    }, [isSuccessManifestation, data]);

    return (
      <>
        {material && (
          <Component
            /* eslint-disable-next-line react/jsx-props-no-spreading */
            {...(props as P)}
            material={material}
          />
        )}
        {/* todo loading screen missing in figma */}
        {!material && <div />}
      </>
    );
  };

export default fetchMaterial;
