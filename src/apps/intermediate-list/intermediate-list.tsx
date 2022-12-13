import React, { FC } from "react";
import { Link } from "../../components/atoms/link";
import { useText } from "../../core/utils/text";
import FeeList from "./fee-list/fee-list";

const IntermedateList: FC = () => {
  const t = useText();
  return (
    <>
      <h1>Gebyrer og erstatninger {t("totalFeeAmountText")}</h1>
      <span>
        Gebyrer og erstatninger som du har fået 27/10 2020 overgår til et nyt
        system, hvor betalingen sker gennem løsningen Mit betalingsoverblik.
        Gebyrer fra før denne dato kan stadig betales her på siden.
        <Link href={new URL("https://www.google.dk")}>
          Se gebyrer og erstatningstakster
        </Link>
      </span>
      <FeeList
        totalFeeAmountText={t("totalFeeAmountText")}
        FeeCreatedText={t("feeCreatedText")}
        otherMaterialsText={t("otherMaterialsText")}
      />
    </>
  );
};

export default IntermedateList;
