import React, { ComponentType, FC } from "react";
import { usePageStatistics } from "../../core/statistics/useStatistics";
import { useEffectOnce } from "react-use";

const withPageStatistics = <P extends object>(
  WrappedComponent: ComponentType<P>,
  waitTime = 2500
): FC<P> => {
  return (props: P) => {
    const { sendPageStatistics } = usePageStatistics();

    useEffectOnce(() => {
      sendPageStatistics({ waitTime });
    });

    // eslint-disable-next-line react/jsx-props-no-spreading
    return <WrappedComponent {...props} />;
  };
};

export default withPageStatistics;
