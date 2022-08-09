import React from "react";
import { ExternalReview } from "../../core/dbc-gateway/generated/graphql";
import ReviewMetadata, { usDateStringToDateObj } from "./ReviewMetadata";
import ReviewHearts from "./ReviewHearts";

export interface ReviewExternalProps {
  review: ExternalReview;
}

const ReviewExternal: React.FC<ReviewExternalProps> = ({ review }) => {
  const date = review.date ? usDateStringToDateObj(review.date) : null;
  return (
    <li className="review text-small-caption">
      {(review.author || review.date) && (
        <ReviewMetadata author={review.author} date={date} />
      )}
      {review.rating && <ReviewHearts amountOfHearts={review.rating} />}
      {review.urls &&
        review.urls.map((url) => {
          return (
            <a href={url.url} className="link-tag text-small-caption mb-8">
              {url.origin}
            </a>
          );
        })}
    </li>
  );
};

export default ReviewExternal;
