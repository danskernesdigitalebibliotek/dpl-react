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
import { ILLBibliographicRecord } from "../../../../core/fbs/model";

export interface MaterialProps {
  material?: BasicDetailsType | null;
}

type InputProps = {
  ilBibliographicRecord?: ILLBibliographicRecord;
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
        }
      }, [manifestation]);

      // if the fallback component is provided we can show it while the data is loading
      if (isLoadingAnything) {
        return FallbackComponent ? <FallbackComponent /> : null;
      }

      // In cases where the material is not found AND we don't have fallback data
      // we return null, else we would load forever.
      if (!manifestation && !props.ilBibliographicRecord) return null;

      return (
        <Component
          /* eslint-disable-next-line react/jsx-props-no-spreading */
          {...(props as P)}
          item={item}
          material={material}
          ilBibliographicRecord={props.ilBibliographicRecord}
        />
      );
    }
    return null;
  };

export default fetchMaterial;
