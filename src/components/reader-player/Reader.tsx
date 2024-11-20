import React, { useEffect } from "react";
import { appendAsset, readerAssets, removeAppendedAssets } from "./helper";

type ReaderType =
  | { identifier: string; orderId?: never }
  | { identifier?: never; orderId: string };

const Reader = ({ identifier, orderId }: ReaderType) => {
  useEffect(() => {
    readerAssets.forEach(appendAsset);

    return () => {
      removeAppendedAssets();
    };
  }, [identifier, orderId]);

  if (orderId) {
    return (
      <div
        id="pubhub-reader"
        // eslint-disable-next-line react/no-unknown-property
        order-id={orderId}
      />
    );
  }

  if (identifier) {
    return (
      <div
        id="pubhub-reader"
        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
        // @ts-ignore
        // eslint-disable-next-line react/no-unknown-property
        identifier={identifier}
        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
        // @ts-ignore
        // eslint-disable-next-line react/no-unknown-property
        close-href={`javascript:window.closeModal('reader-modal-${identifier}')`}
      />
    );
  }

  return null;
};

export default Reader;
