import React from "react";
import {
  ExternalReview,
  InfomediaReview,
  LibrariansReview
} from "../../core/dbc-gateway/generated/graphql";
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
      {listOfReviews.map((review) => {
        if (review.__typename === "ExternalReview") {
          return <ReviewExternal review={review} />;
        }
        if (review.__typename === "InfomediaReview") {
          return <ReviewInfomedia review={review} />;
        }
        return <ReviewLibrarian review={review as LibrariansReview} />;
      })}
    </ul>
  );
};

export default MaterialReviews;
