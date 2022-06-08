import * as React from "react";
import { useText } from "../../core/utils/text";

export type TextProps = { whatText: string };
export interface HelloProps {
  shouldBeEmphasized: boolean;
}

export const Hello: React.FC<HelloProps> = ({ shouldBeEmphasized }) => {
  const t = useText();

  return (
    <>
      Hello{" "}
      {shouldBeEmphasized ? <strong>{t("whatText")}</strong> : t("whatText")}!
    </>
  );
};

export default Hello;
