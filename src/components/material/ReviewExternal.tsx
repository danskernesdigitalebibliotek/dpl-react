import React from "react";
import {
  AccessUrl,
  ManifestationReviewFieldsFragment
} from "../../core/dbc-gateway/generated/graphql";
import ReviewMetadata from "./ReviewMetadata";
import ReviewHearts from "./ReviewHearts";
import {
  getAuthorNames,
  getReviewRelease
} from "../../core/utils/helpers/general";

export interface ReviewExternalProps {
  review: ManifestationReviewFieldsFragment;
  dataCy?: string;
}

const ReviewExternal: React.FC<ReviewExternalProps> = ({
  review: { workYear, dateFirstEdition, creators, review, access, edition },
  dataCy = "review-external"
}) => {
  const date = getReviewRelease(dateFirstEdition, workYear, edition);
  const authors = getAuthorNames(creators);
  // This value needs to be casted, because TS for some reason doesn't accept that we filter the access
  const accessUrls = access.filter(
    (accessItem) => accessItem.__typename === "AccessUrl"
  ) as Pick<AccessUrl, "origin" | "url">[];

  return (
    <li className="review text-small-caption" data-cy={dataCy}>
      {(authors || date) && <ReviewMetadata author={authors} date={date} />}
      {review?.rating && <ReviewHearts amountOfHearts={review.rating} />}
      {accessUrls &&
        accessUrls.map(({ url, origin }, index) => {
          return (
            <>
              <span>{index > 0 ? ", " : ""}</span>
              <a href={url} className="link-tag text-small-caption mb-8">
                {origin}
              </a>
            </>
          );
        })}
    </li>
  );
};

export default ReviewExternal;
