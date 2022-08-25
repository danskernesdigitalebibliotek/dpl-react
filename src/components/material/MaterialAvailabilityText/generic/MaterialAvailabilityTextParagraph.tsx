import React from "react";

interface MaterialAvailabilityTextParagraphProps {
  children: React.ReactNode | string;
}

const MaterialAvailabilityTextParagraph: React.FC<
  MaterialAvailabilityTextParagraphProps
> = ({ children }) => {
  return <p className="mt-16 text-small-caption">{children}</p>;
};

export default MaterialAvailabilityTextParagraph;
