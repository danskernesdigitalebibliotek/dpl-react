import React, { useEffect, useState, ComponentType, FC } from "react";
import { FaustId } from "../../../../core/utils/types/ids";
import { useGetV1ProductsIdentifier } from "../../../../core/publizon/publizon";
import { BasicDetailsType } from "../../../../core/utils/types/basic-details-type";
import { MaterialProps } from "./material-fetch-hoc";
import { mapProductToBasicDetailsType } from "../../../../core/utils/helpers/list-mapper";

type InputProps = {
  faust?: FaustId | null;
  identifier?: string | null;
};

const fetchDigitalMaterial =
  <P extends object>(
    Component: ComponentType<P & MaterialProps>
  ): FC<P & InputProps> =>
  ({ faust, identifier, ...props }: InputProps) => {
    // If this is a physical book, another HOC fetches the data and this
    // HOC just returns the component
    if (faust) {
      return (
        <Component
          /* eslint-disable-next-line react/jsx-props-no-spreading */
          {...(props as P)}
          faust={faust}
        />
      );
    }

    if (identifier) {
      const [digitalMaterial, setDigitalMaterial] =
        useState<BasicDetailsType>();

      const { data: productsData, isSuccess: isSuccessDigital } =
        useGetV1ProductsIdentifier(identifier);

      useEffect(() => {
        if (productsData && isSuccessDigital && productsData.product) {
          setDigitalMaterial(
            mapProductToBasicDetailsType(productsData.product)
          );
        } else {
          // todo error handling, missing in figma
        }
      }, [productsData, isSuccessDigital]);

      if (!digitalMaterial) return null;

      return (
        <Component
          /* eslint-disable-next-line react/jsx-props-no-spreading */
          {...(props as P)}
          identifier={identifier}
          material={digitalMaterial}
        />
      );
    }
    return null;
  };

export default fetchDigitalMaterial;
