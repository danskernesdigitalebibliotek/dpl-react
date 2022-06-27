import * as React from "react";
import { Hello } from "../../components/hello/hello";
import { useText } from "../../core/utils/text";

import { getLoansV2 } from "../../core/fbs/fbs";

const HelloWorld: React.FC = () => {
  const t = useText();

  const test = getLoansV2();
  console.log(test);

  return (
    <article>
      <h2>{t("titleText")}</h2>
      <p>{t("introductionText")}</p>
      <p>
        <Hello shouldBeEmphasized />
      </p>
    </article>
  );
};
export default HelloWorld;
