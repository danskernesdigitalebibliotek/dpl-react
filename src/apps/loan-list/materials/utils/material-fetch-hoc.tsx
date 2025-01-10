import React, { useEffect, useState, ComponentType, FC } from "react";
import {
  ManifestationBasicDetailsFragment,
  useGetManifestationViaBestRepresentationByFaustQuery,
  useGetManifestationViaMaterialByFaustQuery
} from "../../../../core/dbc-gateway/generated/graphql";
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
  // TODO: rewrite the code below and remove the eslint-disable-next-line react/display-name comment
  // eslint-disable-next-line react/display-name
  ({ item, ...props }: InputProps) => {
    // If this is a digital book, another HOC fetches the data and this
    // HOC just returns the component
    if (item?.identifier) {
      return <Component {...(props as P)} item={item} />;
    }

    if (item?.faust) {
      const [material, setMaterial] = useState<BasicDetailsType>();
      let isLoadingAnything = false;
      let manifestation: ManifestationBasicDetailsFragment | null = null;
      if (item.reservationIds && item.reservationIds.length > 1) {
        const { isSuccess, data, isLoading } =
          useGetManifestationViaBestRepresentationByFaustQuery({
            faust: item.faust
          });
        isLoadingAnything = isLoading;
        if (isSuccess && data?.manifestation) {
          manifestation =
            data.manifestation.ownerWork.manifestations.bestRepresentation;
        }
      } else {
        const { isSuccess, data, isLoading } =
          useGetManifestationViaMaterialByFaustQuery({
            faust: item.faust
          });
        isLoadingAnything = isLoading;
        if (isSuccess && data?.manifestation) {
          manifestation = data.manifestation;
        }
      }

      useEffect(() => {
        if (manifestation) {
          setMaterial(mapManifestationToBasicDetailsType(manifestation));
        } else if (item.details) {
          setMaterial(item.details);
        }
      }, [manifestation, item.details]);

      // if the fallback component is provided we can show it while the data is loading
      if (isLoadingAnything) {
        return FallbackComponent ? <FallbackComponent /> : null;
      }

      // in cases where the material is not found we return null, else we would load forever
      if (!material) return null;

      return <Component {...(props as P)} item={item} material={material} />;
    }
    return null;
  };

export default fetchMaterial;
