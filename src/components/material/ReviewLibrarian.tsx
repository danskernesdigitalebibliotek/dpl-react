import React from "react";
import {
  LibrariansReview,
  LibrariansReviewSection
} from "../../core/dbc-gateway/generated/graphql";
import ReviewMetadata, { usDateStringToDateObj } from "./ReviewMetadata";

export interface ReviewLibrarianProps {
  review: LibrariansReview;
}

const ReviewLibrarian: React.FC<ReviewLibrarianProps> = ({ review }) => {
  return (
    <li className="review text-small-caption">
      {(review.author || review.date) && (
        <ReviewMetadata
          author={review.author}
          date={usDateStringToDateObj(review.date as string)}
        />
      )}
      {review.sections &&
        review.sections.map((section: LibrariansReviewSection) => {
          return (
            <>
              {section.heading && (
                <div className="review__headline mb-8">{section.heading}</div>
              )}
              {section.text && (
                <div className="review__body mb-8">{section.text}</div>
              )}
            </>
          );
        })}
    </li>
  );
};

export default ReviewLibrarian;
