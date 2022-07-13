import React from "react";
import { useText } from "../../core/utils/text";

interface MaterialHeaderTextProps {
  title: string;
  author: string;
}

const MaterialHeaderText: React.FC<MaterialHeaderTextProps> = ({
  title,
  author
}) => {
  const t = useText();

  return (
    <>
      <h1 className="text-header-h1 mb-16">{title}</h1>
      <p className="text-body-large">
        <span>{t("Af")} </span>
        {author}
      </p>
    </>
  );
};

export default MaterialHeaderText;
