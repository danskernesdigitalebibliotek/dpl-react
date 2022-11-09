import React from "react";
import HeartIconFilled from "@danskernesdigitalebibliotek/dpl-design-system/build/icons/basic/icon-heart-filled.svg";
import HeartIconGrey from "@danskernesdigitalebibliotek/dpl-design-system/build/icons/basic/icon-heart-grey.svg";
import { useText } from "../../core/utils/text";

export interface ReviewHeartsProps {
  amountOfHearts: string;
}

const ReviewHearts: React.FC<ReviewHeartsProps> = ({ amountOfHearts }) => {
  const t = useText();
  const heartArray = amountOfHearts.split("/");
  const filledHeartsArray = Array.from(
    { length: Number(heartArray[0]) },
    (_, i) => i + 1
  );
  const emptyHeartsArray = Array.from(
    { length: Number(heartArray[1]) - Number(heartArray[0]) },
    (_, i) => i + 1
  );
  const ariaLabel = t("ratingIsText", {
    placeholders: {
      "@heartCount": filledHeartsArray.length,
      "@numberOfHeartsPossible": heartArray[1]
    }
  });
  return (
    <div className="mb-4" role="figure" aria-label={ariaLabel}>
      {filledHeartsArray.map(() => {
        return <img src={HeartIconFilled} className="review__heart" alt="" />;
      })}
      {emptyHeartsArray.map(() => {
        return <img src={HeartIconGrey} className="review__heart" alt="" />;
      })}
    </div>
  );
};

export default ReviewHearts;
