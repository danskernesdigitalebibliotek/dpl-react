import React, { useEffect, useState, ComponentType, FC } from "react";
import { useGetMaterialManifestationQuery } from "../../../../core/dbc-gateway/generated/graphql";
import { Product } from "../../../../core/publizon/model";
import { FaustId } from "../../../../core/utils/types/ids";
import { MaterialClassification } from "../../../../core/utils/types/material-classification";
import { BasicDetailsType } from "../../../../core/utils/types/basic-details-type";
import { mapManifestationToBasicDetailsType } from "../../../../core/utils/helpers/mapper";

export interface MaterialProps {
  material?: BasicDetailsType | null;
}

type InputProps = {
  digitalMaterial?: Product | null;
  id: FaustId;
  type: MaterialClassification;
};

const fetchMaterial =
  <P extends object>(
    Component: ComponentType<P & MaterialProps>
  ): FC<P & InputProps> =>
  ({ id, type, ...props }: InputProps) => {
    // If this is a digital book, another HOC fetches the data and this
    // HOC just returns the component
    if (type === "digital") {
      return (
        <Component
          /* eslint-disable-next-line react/jsx-props-no-spreading */
          {...(props as P)}
          id={id}
        />
      );
    }

    const [material, setMaterial] = useState<BasicDetailsType>();

    // Todo error handling
    const { isSuccess: isSuccessManifestation, data } =
      useGetMaterialManifestationQuery({
        faust: id
      });

    useEffect(() => {
      if (data && isSuccessManifestation && data.manifestation) {
        setMaterial(mapManifestationToBasicDetailsType(data));
      } else {
        // todo error handling
      }
    }, [isSuccessManifestation, data]);

    return (
      <div>
        {material && (
          <Component
            /* eslint-disable-next-line react/jsx-props-no-spreading */
            {...(props as P)}
            material={material}
            type={type}
            id={id}
          />
        )}
      </div>
    );
  };

export default fetchMaterial;
