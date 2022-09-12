import React from "react";
import {
  setConfig as fbsSetConfig,
  Options as FbsOptions
} from "../fbs/fbsConfig";
import {
  setConfig as publizonSetConfig,
  Options as publizonOptions
} from "../publizon/publizonConfig";

export default <T,>(Component: React.ComponentType<T>) => {
  return (props: T) => {
    const pattern = /.*Config$/g;

    // Match all props that ends with config.
    const suffixEntries = Object.fromEntries(
      Object.entries(props).filter(([prop]) => {
        return String(prop).match(pattern);
      })
    );

    // and match all props that do NOT end with config.
    const nonSuffixEntries = Object.fromEntries(
      Object.entries(props).filter(([prop]) => {
        return !String(prop).match(pattern);
      })
    );

    // If the fbs config is found, set it in config
    if (suffixEntries.fbsBaseConfig) {
      fbsSetConfig(FbsOptions.baseUrl, suffixEntries.fbsBaseConfig);
    }

    // If the publizon config is found, set it in config
    if (suffixEntries.publizonBaseConfig) {
      publizonSetConfig(
        publizonOptions.baseUrl,
        suffixEntries.publizonBaseConfig
      );
    }

    // Since this is a High Order Functional Component
    // we do not know what props we are dealing with.
    // That is a part of the design.
    // eslint-disable-next-line react/jsx-props-no-spreading
    return <Component {...(nonSuffixEntries as T)} />;
  };
};
