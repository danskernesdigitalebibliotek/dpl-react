import React, { useEffect, useState, ComponentType, FC } from "react";
import { FaustId } from "../../../../core/utils/types/ids";
import { useGetV1ProductsIdentifier } from "../../../../core/publizon/publizon";
import { MaterialClassification } from "../../../../core/utils/types/material-classification";
import { BasicDetailsType } from "../../../../core/utils/types/basic-details-type";
import { mapProductToBasicDetailsType } from "../../../../core/utils/helpers/general";
import { MaterialProps } from "./material-fetch-hoc";

type InputProps = {
  id: FaustId;
  type: MaterialClassification;
};

const fetchDigitalMaterial =
  <P extends object>(
    Component: ComponentType<P & MaterialProps>
  ): FC<P & InputProps> =>
  ({ id, type, ...props }: InputProps) => {
    // If this is a physical book, another HOC fetches the data and this
    // HOC just returns the component
    if (type === "physical") {
      return (
        <Component
          /* eslint-disable-next-line react/jsx-props-no-spreading */
          {...(props as P)}
          id={id}
        />
      );
    }

    const [digitalMaterial, setDigitalMaterial] = useState<BasicDetailsType>();

    // Todo error handling
    const { data: productsData, isSuccess: isSuccessDigital } =
      useGetV1ProductsIdentifier(id);

    useEffect(() => {
      if (productsData && isSuccessDigital && productsData.product) {
        setDigitalMaterial(mapProductToBasicDetailsType(productsData.product));
      } else {
        // todo error handling
      }
    }, [productsData, isSuccessDigital]);

    return (
      <div>
        {digitalMaterial && (
          <Component
            /* eslint-disable-next-line react/jsx-props-no-spreading */
            {...(props as P)}
            type={type}
            id={id}
            material={digitalMaterial}
          />
        )}
      </div>
    );
  };

export default fetchDigitalMaterial;
