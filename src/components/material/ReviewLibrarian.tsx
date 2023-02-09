import React from "react";
import { ManifestationReviewFieldsFragment } from "../../core/dbc-gateway/generated/graphql";
import {
  getAuthorNames,
  getReviewRelease
} from "../../core/utils/helpers/general";
import ReviewMetadata from "./ReviewMetadata";

export interface ReviewLibrarianProps {
  review: ManifestationReviewFieldsFragment;
  dataCy?: string;
}

const ReviewLibrarian: React.FC<ReviewLibrarianProps> = ({
  review: { workYear, dateFirstEdition, creators, review, edition },
  dataCy = "review-librarian"
}) => {
  const date = getReviewRelease(dateFirstEdition, workYear, edition);
  const authors = getAuthorNames(creators);

  return (
    <li className="review text-small-caption" data-cy={dataCy}>
      {(authors || date) && <ReviewMetadata author={authors} date={date} />}
      {review?.reviewByLibrarians &&
        review.reviewByLibrarians.map((librarianReview) => {
          return (
            <>
              {librarianReview?.heading && (
                <div className="review__headline mb-8">
                  {librarianReview.heading}
                </div>
              )}
              {librarianReview?.content && (
                <div className="review__body mb-8">
                  {librarianReview.content}
                </div>
              )}
            </>
          );
        })}
    </li>
  );
};

export default ReviewLibrarian;
