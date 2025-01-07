import React, { useEffect, useState, ComponentType, FC } from "react";
import { useGetV1ProductsIdentifier } from "../../../../core/publizon/publizon";
import { BasicDetailsType } from "../../../../core/utils/types/basic-details-type";
import { MaterialProps } from "./material-fetch-hoc";
import { mapProductToBasicDetailsType } from "../../../../core/utils/helpers/list-mapper";
import { ListType } from "../../../../core/utils/types/list-type";

type InputProps = {
  item: ListType;
};

const fetchDigitalMaterial =
  <P extends object>(
    Component: ComponentType<P & MaterialProps>,
    LoadingComponent?: ComponentType
  ): FC<P & InputProps> =>
  ({ item, ...props }: InputProps) => {
    // If this is a physical book, another HOC fetches the data and this
    // HOC just returns the component
    if (item.faust) {
      return (
        <Component
          /* eslint-disable-next-line react/jsx-props-no-spreading */
          {...(props as P)}
          item={item}
        />
      );
    }

    if (item.identifier) {
      const [digitalMaterial, setDigitalMaterial] =
        useState<BasicDetailsType>();

      const {
        data: productsData,
        isSuccess: isSuccessDigital,
        isLoading
      } = useGetV1ProductsIdentifier(item.identifier, {
        query: {
          // We never want to pass an empty string to the API
          // So we only enable the query if we have an isbn
          enabled: !!item.identifier
        }
      });

      useEffect(() => {
        if (productsData && isSuccessDigital && productsData.product) {
          setDigitalMaterial(
            mapProductToBasicDetailsType(productsData.product)
          );
        } else {
          // todo error handling, missing in figma
        }
      }, [productsData, isSuccessDigital]);

      // if the fallback component is provided we can show it while the data is loading
      if (isLoading) return LoadingComponent ? <LoadingComponent /> : null;

      if (!digitalMaterial) return null;

      return (
        <Component
          /* eslint-disable-next-line react/jsx-props-no-spreading */
          {...(props as P)}
          item={item}
          material={digitalMaterial}
        />
      );
    }
    return null;
  };

export default fetchDigitalMaterial;
