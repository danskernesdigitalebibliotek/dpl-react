import React, { FC } from "react";
import { Link } from "../../components/atoms/link";
import { useText } from "../../core/utils/text";
import FeeList from "./fee-list/fee-list";

const IntermedateList: FC = () => {
  const t = useText();
  return (
    <>
      <h1>{t("intermediateListHeadlineText")}</h1>
      <span>
        {t("intermediateListBodyText")}{" "}
        <Link className="link-tag" href={new URL("https://www.google.dk")}>
          {t("ViewFeesAndCompensationRatesText")}
        </Link>
      </span>
      <FeeList />
    </>
  );
};

export default IntermedateList;
