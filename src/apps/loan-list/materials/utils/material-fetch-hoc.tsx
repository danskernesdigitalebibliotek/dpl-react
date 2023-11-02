import React, { useEffect, useState, ComponentType, FC } from "react";
import { useGetManifestationViaMaterialByFaustQuery } from "../../../../core/dbc-gateway/generated/graphql";
import { Product } from "../../../../core/publizon/model";
import { BasicDetailsType } from "../../../../core/utils/types/basic-details-type";
import { mapManifestationToBasicDetailsType } from "../../../../core/utils/helpers/list-mapper";
import { ListType } from "../../../../core/utils/types/list-type";

export interface MaterialProps {
  material?: BasicDetailsType | null;
}

type InputProps = {
  digitalMaterial?: Product | null;
  item?: ListType;
};

const fetchMaterial =
  <P extends object>(
    Component: ComponentType<P & MaterialProps>,
    FallbackComponent?: ComponentType
  ): FC<P & InputProps> =>
  ({ item, ...props }: InputProps) => {
    // If this is a digital book, another HOC fetches the data and this
    // HOC just returns the component
    if (item?.identifier) {
      return (
        <Component
          /* eslint-disable-next-line react/jsx-props-no-spreading */
          {...(props as P)}
          item={item}
        />
      );
    }

    if (item?.faust) {
      const [material, setMaterial] = useState<BasicDetailsType>();

      const { isSuccess: isSuccessManifestation, data } =
        useGetManifestationViaMaterialByFaustQuery({
          faust: item.faust
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
          item={item}
          material={material}
        />
      );
    }
    return null;
  };

export default fetchMaterial;
