import React, { useEffect, useState, ComponentType, FC } from "react";
import { FaustId } from "../../../../core/utils/types/ids";
import { useGetV1ProductsIdentifier } from "../../../../core/publizon/publizon";
import { BasicDetailsType } from "../../../../core/utils/types/basic-details-type";
import { MaterialProps } from "./material-fetch-hoc";
import { mapProductToBasicDetailsType } from "../../../../core/utils/helpers/list-mapper";
import { useText } from "../../../../core/utils/text";

type InputProps = {
  faust: FaustId | null;
  identifier: string | null;
};

const fetchDigitalMaterial =
  <P extends object>(
    Component: ComponentType<P & MaterialProps>
  ): FC<P & InputProps> =>
  ({ faust, identifier, ...props }: InputProps) => {
    const t = useText();

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

      // Todo error handling
      const { data: productsData, isSuccess: isSuccessDigital } =
        useGetV1ProductsIdentifier(identifier);

      useEffect(() => {
        if (productsData && isSuccessDigital && productsData.product) {
          setDigitalMaterial(
            mapProductToBasicDetailsType(t, productsData.product)
          );
        } else {
          // todo error handling
        }
      }, [productsData, isSuccessDigital, t]);

      return (
        <div>
          {digitalMaterial && (
            <Component
              /* eslint-disable-next-line react/jsx-props-no-spreading */
              {...(props as P)}
              identifier={identifier}
              material={digitalMaterial}
            />
          )}
        </div>
      );
    }
    return null;
  };

export default fetchDigitalMaterial;
