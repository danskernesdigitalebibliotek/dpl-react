import React from "react";
import {
  ExternalReview,
  InfomediaReview,
  LibrariansReview
} from "../../core/dbc-gateway/generated/graphql";
import { createJSXkey } from "../../core/utils/helpers/general";
import ReviewExternal from "./ReviewExternal";
import ReviewInfomedia from "./ReviewInfomedia";
import ReviewLibrarian from "./ReviewLibrarian";

export interface MaterialReviewsProps {
  listOfReviews: Array<LibrariansReview | ExternalReview | InfomediaReview>;
}

export const MaterialReviews: React.FC<MaterialReviewsProps> = ({
  listOfReviews
}) => {
  return (
    <ul className="reviews">
      {listOfReviews.map((review, i) => {
        const key = createJSXkey([review.author, review.date, i]);
        if (review.__typename === "ExternalReview") {
          return <ReviewExternal key={key} review={review} />;
        }
        if (review.__typename === "InfomediaReview") {
          return <ReviewInfomedia key={key} review={review} />;
        }
        return (
          <ReviewLibrarian key={key} review={review as LibrariansReview} />
        );
      })}
    </ul>
  );
};

export default MaterialReviews;
