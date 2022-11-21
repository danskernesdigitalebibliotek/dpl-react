import React from "react";
import {
  LibrariansReview,
  LibrariansReviewSection
} from "../../core/dbc-gateway/generated/graphql";
import { createJSXkey } from "../../core/utils/helpers/general";
import ReviewMetadata, { usDateStringToDateObj } from "./ReviewMetadata";

export interface ReviewLibrarianProps {
  review: LibrariansReview;
}

const ReviewLibrarian: React.FC<ReviewLibrarianProps> = ({ review }) => {
  const date = review.date ? usDateStringToDateObj(review.date) : null;
  return (
    <li className="review text-small-caption">
      {(review.author || review.date) && (
        <ReviewMetadata author={review.author} date={date} />
      )}
      {review.sections &&
        review.sections.map((section: LibrariansReviewSection, i) => {
          return (
            <div key={createJSXkey([section.heading, i])}>
              {section.heading && (
                <div className="review__headline mb-8">{section.heading}</div>
              )}
              {section.text && (
                <div className="review__body mb-8">{section.text}</div>
              )}
            </div>
          );
        })}
    </li>
  );
};

export default ReviewLibrarian;
