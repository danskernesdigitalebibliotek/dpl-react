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
      // TODO: Temporary workaround to reload the page when the reader is closed.
      // The issue seems to be related to browser caching the reader, preventing it from properly refreshing.
      // Replace this with a better solution in the future.
      window.location.reload();
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
      />
    );
  }

  return null;
};

export default Reader;
