import React from "react";
import {
  getAuthorNames,
  getPublicationName,
  getReviewRelease
} from "../../core/utils/helpers/general";
import { ReviewManifestation } from "../../core/utils/types/entities";
import ReviewMetadata from "./ReviewMetadata";
import { createUrlHash, HashPrefix } from "../../core/utils/helpers/url";

export interface ReviewLibrarianProps {
  review: ReviewManifestation;
  dataCy?: string;
}

const ReviewLibrarian: React.FC<ReviewLibrarianProps> = ({
  review: {
    pid,
    workYear,
    dateFirstEdition,
    creators,
    review,
    edition,
    hostPublication
  },
  dataCy = "review-librarian"
}) => {
  const date = getReviewRelease(dateFirstEdition, workYear, edition);
  const authors = getAuthorNames(creators);
  const publication = getPublicationName(hostPublication);

  return (
    <li
      className="review text-small-caption"
      id={createUrlHash(HashPrefix.REVIEW, pid)}
      data-scroll-target={createUrlHash(HashPrefix.REVIEW, pid)}
      data-cy={dataCy}
    >
      {(authors || date || publication) && (
        <ReviewMetadata
          author={authors}
          date={date}
          publication={publication}
          isLibrarian={true}
        />
      )}
      {review?.reviewByLibrarians &&
        review.reviewByLibrarians.map((librarianReview) => {
          return (
            <>
              {librarianReview?.heading && (
                <h3 className="review__headline mb-8">
                  {librarianReview.heading}
                </h3>
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
