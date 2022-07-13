import React from "react";

interface MaterialHeaderTextProps {
  title: string;
  author: string;
}

const MaterialHeaderText: React.FC<MaterialHeaderTextProps> = ({
  title,
  author
}) => {
  return (
    <>
      <h1 className="text-header-h1 mb-16">{title}</h1>
      <p className="text-body-large">
        <span>Af </span>
        {author}
      </p>
    </>
  );
};

export default MaterialHeaderText;
