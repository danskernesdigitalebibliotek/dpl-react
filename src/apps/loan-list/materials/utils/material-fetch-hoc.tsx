import React, { useEffect, useState, ComponentType, FC } from "react";
import { useGetMaterialManifestationQuery } from "../../../../core/dbc-gateway/generated/graphql";
import { Product } from "../../../../core/publizon/model";
import { FaustId } from "../../../../core/utils/types/ids";
import { BasicDetailsType } from "../../../../core/utils/types/basic-details-type";
import { mapManifestationToBasicDetailsType } from "../../../../core/utils/helpers/list-mapper";
import { useText } from "../../../../core/utils/text";

export interface MaterialProps {
  material?: BasicDetailsType | null;
}

type InputProps = {
  digitalMaterial?: Product | null;
  faust: FaustId | null;
  identifier: string | null;
};

const fetchMaterial =
  <P extends object>(
    Component: ComponentType<P & MaterialProps>
  ): FC<P & InputProps> =>
  ({ identifier, faust, ...props }: InputProps) => {
    const t = useText();

    // If this is a digital book, another HOC fetches the data and this
    // HOC just returns the component
    if (identifier) {
      return (
        <Component
          /* eslint-disable-next-line react/jsx-props-no-spreading */
          {...(props as P)}
          identifier={identifier}
        />
      );
    }

    if (faust) {
      const [material, setMaterial] = useState<BasicDetailsType>();

      // Todo error handling
      const { isSuccess: isSuccessManifestation, data } =
        useGetMaterialManifestationQuery({
          faust
        });

      useEffect(() => {
        if (data && isSuccessManifestation && data.manifestation) {
          setMaterial(mapManifestationToBasicDetailsType(t, data));
        } else {
          // todo error handling
        }
      }, [isSuccessManifestation, data, t]);

      return (
        <div>
          {material && (
            <Component
              /* eslint-disable-next-line react/jsx-props-no-spreading */
              {...(props as P)}
              material={material}
              faust={faust}
            />
          )}
        </div>
      );
    }
    return null;
  };

export default fetchMaterial;
