import React, { FC } from "react";
import { Link } from "../../components/atoms/link";
import { useText } from "../../core/utils/text";
import { useUrls } from "../../core/utils/url";
import FeeList from "./fee-list/fee-list";

const IntermedateList: FC = () => {
  const t = useText();
  const { viewFeesAndCompensationRatesUrl } = useUrls();
  return (
    <>
      <h1>{t("intermediateListHeadlineText")}</h1>
      <span>
        {t("intermediateListBodyText")}{" "}
        <Link
          className="link-tag"
          href={new URL(viewFeesAndCompensationRatesUrl)}
        >
          {t("viewFeesAndCompensationRatesText")}
        </Link>
      </span>
      <FeeList />
    </>
  );
};

export default IntermedateList;
