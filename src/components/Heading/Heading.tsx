import React from "react";

export type HeadingLevelType = "h2" | "h3" | "h4" | "h5";

type HeadingProps = {
  children: React.ReactNode;
  level?: HeadingLevelType;
  className?: string;
};

const Heading: React.FunctionComponent<HeadingProps> = ({
  children,
  level = "h2",
  className
}) => {
  const HeadingTag = {
    h2: "h2",
    h3: "h3",
    h4: "h4",
    h5: "h5"
  }[level] as keyof JSX.IntrinsicElements;

  return <HeadingTag className={className}>{children}</HeadingTag>;
};

export default Heading;
