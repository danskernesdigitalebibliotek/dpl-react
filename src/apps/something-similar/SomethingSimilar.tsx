import React, { FC, useEffect, useState } from "react";
import { getWorkIdFromQueryParam } from "../../core/utils/helpers/url";
import { FaustId } from "../../core/utils/types/ids";
import SomethingSimilarList from "./SomethingSimilarList";

const SomethingSimilar: FC = () => {
  const [loanForRecommender, setLoanForRecommender] = useState<string | null>(
    null
  );

  useEffect(() => {
    setLoanForRecommender(getWorkIdFromQueryParam());
  }, []);

  return (
    <div className="recommender recommender--bright">
      {loanForRecommender && (
        <SomethingSimilarList
          faust={loanForRecommender as FaustId}
          id={loanForRecommender as FaustId}
        />
      )}
    </div>
  );
};

export default SomethingSimilar;
