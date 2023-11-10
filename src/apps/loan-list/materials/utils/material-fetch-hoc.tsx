import React, { useEffect, useState, ComponentType, FC } from "react";
import { useGetManifestationViaMaterialByFaustQuery } from "../../../../core/dbc-gateway/generated/graphql";
import { Product } from "../../../../core/publizon/model";
import { FaustId } from "../../../../core/utils/types/ids";
import { BasicDetailsType } from "../../../../core/utils/types/basic-details-type";
import { mapManifestationToBasicDetailsType } from "../../../../core/utils/helpers/list-mapper";

export interface MaterialProps {
  material?: BasicDetailsType | null;
}

type InputProps = {
  digitalMaterial?: Product | null;
  faust?: FaustId | null;
  identifier?: string | null;
};

const fetchMaterial =
  <P extends object>(
    Component: ComponentType<P & MaterialProps>,
    FallbackComponent?: ComponentType
  ): FC<P & InputProps> =>
  ({ identifier, faust, ...props }: InputProps) => {
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

      const { isSuccess: isSuccessManifestation, data } =
        useGetManifestationViaMaterialByFaustQuery({
          faust
        });

      useEffect(() => {
        if (data && isSuccessManifestation && data.manifestation) {
          setMaterial(mapManifestationToBasicDetailsType(data));
        } else {
          // todo error handling, missing in figma
        }
      }, [isSuccessManifestation, data]);

      // in cases where the material is not found we return null, else we would load forever
      if (data && data.manifestation === null) return null;

      // if the fallback component is provided we can show it while the data is loading
      if (!material) return FallbackComponent ? <FallbackComponent /> : null;

      return (
        <Component
          /* eslint-disable-next-line react/jsx-props-no-spreading */
          {...(props as P)}
          material={material}
          faust={faust}
        />
      );
    }
    return null;
  };

export default fetchMaterial;
