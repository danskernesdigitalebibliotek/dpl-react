import React, { CSSProperties, useEffect } from "react";
import { appendAsset, readerAssets, removeAppendedAssets } from "./helper";

export type ReaderType = {
  identifier?: string;
  orderId?: string;
};

const Reader: React.FC<ReaderType> = ({ identifier, orderId }: ReaderType) => {
  useEffect(() => {
    readerAssets.forEach(appendAsset);

    return () => {
      removeAppendedAssets();
    };
  }, [identifier, orderId]);

  const readerStyles: CSSProperties = {
    height: "100vh"
  };

  if (orderId) {
    return (
      <div
        style={readerStyles}
        id="pubhub-reader"
        // eslint-disable-next-line react/no-unknown-property
        order-id={orderId}
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
  console.warn("No identifier or orderId provided for the Reader app.");
  return null;
};

export default Reader;
