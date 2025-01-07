import React, { CSSProperties, useEffect } from "react";
import { appendAsset, readerAssets, removeAppendedAssets } from "./helper";

export type ReaderType = {
  identifier?: string;
  // orderid must be in lowercase bacause its comes from the url / Drupal
  orderid?: string;
};

const Reader: React.FC<ReaderType> = ({ identifier, orderid }: ReaderType) => {
  useEffect(() => {
    readerAssets.forEach(appendAsset);

    return () => {
      removeAppendedAssets();
    };
  }, [identifier, orderid]);

  const readerStyles: CSSProperties = {
    height: "100vh"
  };

  if (orderid) {
    return (
      <div
        style={readerStyles}
        id="pubhub-reader"
        // The iframe that is created by the reader app has order-id and close-href attribute
        // that are not valid HTML attributes. This is why we have to use the @ts-ignore
        // eslint-disable-next-line react/no-unknown-property
        order-id={orderid}
        // eslint-disable-next-line react/no-unknown-property, no-script-url
        close-href="javascript:window.history.back()"
      />
    );
  }

  if (identifier) {
    return (
      <div
        style={readerStyles}
        id="pubhub-reader"
        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
        // @ts-ignore
        // eslint-disable-next-line react/no-unknown-property
        identifier={identifier}
        // eslint-disable-next-line react/no-unknown-property, no-script-url
        close-href="javascript:window.history.back()"
      />
    );
  }

  // eslint-disable-next-line no-console
  console.warn("No identifier or orderid provided for the Reader app.");
  return null;
};

export default Reader;
