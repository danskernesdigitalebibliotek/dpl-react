import * as React from "react";
import { Hello } from "../../components/hello/hello";
import { useText } from "../../core/utils/text";

const HelloWorld: React.FC = () => {
  const t = useText();
  return (
    <article>
      <h2>{t("titleText")}</h2>
      <p>{t("introductionText")}</p>
      <p>
        <Hello what="world" shouldBeEmphasized />
      </p>
    </article>
  );
};
export default HelloWorld;
