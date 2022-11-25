import React, { FC } from "react";
import FeeList from "./fee-list/fee-list";

const IntermedateList: FC = () => {
  return (
    <>
      <h1>Gebyrer og erstatninger</h1>
      <span>
        Gebyrer og erstatninger som du har fået 27/10 2020 overgår til et nyt
        system, hvor betalingen sker gennem løsningen Mit betalingsoverblik.
        Gebyrer fra før denne dato kan stadig betales her på siden.
      </span>
      <FeeList />
    </>
  );
};

export default IntermedateList;
