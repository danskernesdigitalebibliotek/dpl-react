import React from "react";
import { ExternalReview } from "../../core/dbc-gateway/generated/graphql";
import ReviewHearts from "./ReviewHearts";
import ReviewMetadata from "./ReviewMetadata";

export interface ReviewExternalProps {
  review: ExternalReview;
}

const ReviewExternal: React.FC<ReviewExternalProps> = ({ review }) => {
  return (
    <li className="review text-small-caption">
      {(review.author || review.date) && (
        <ReviewMetadata author={review.author} date={review.date} />
      )}
      {review.rating && <ReviewHearts amountOfHearts={review.rating} />}
      {review.urls &&
        review.urls.length >= 1 &&
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
