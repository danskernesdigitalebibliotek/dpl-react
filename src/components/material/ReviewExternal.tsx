import React from "react";
import { ExternalReview } from "../../core/dbc-gateway/generated/graphql";
import ReviewMetadata, { usDateStringToDateObj } from "./ReviewMetadata";
import ReviewHearts from "./ReviewHearts";

export interface ReviewExternalProps {
  review: ExternalReview;
}

const ReviewExternal: React.FC<ReviewExternalProps> = ({
  review: { date: reviewDate, author, rating, urls }
}) => {
  const date = reviewDate ? usDateStringToDateObj(reviewDate) : null;
  return (
    <li className="review text-small-caption">
      {(author || reviewDate) && <ReviewMetadata author={author} date={date} />}
      {rating && <ReviewHearts amountOfHearts={rating} />}
      {urls &&
        urls.map(({ url, origin }) => {
          return (
            <a href={url} className="link-tag text-small-caption mb-8">
              {origin}
            </a>
          );
        })}
    </li>
  );
};

export default ReviewExternal;
