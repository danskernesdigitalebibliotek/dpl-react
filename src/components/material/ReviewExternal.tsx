import React from "react";
import { AccessUrl } from "../../core/dbc-gateway/generated/graphql";
import ReviewMetadata from "./ReviewMetadata";
import ReviewHearts from "./ReviewHearts";
import {
  getAuthorNames,
  getPublicationName,
  getReviewRelease
} from "../../core/utils/helpers/general";
import { ReviewManifestation } from "../../core/utils/types/entities";
import Link from "../atoms/links/Link";
import { createUrlHash, HashPrefix } from "../../core/utils/helpers/url";

export interface ReviewExternalProps {
  review: ReviewManifestation;
  dataCy?: string;
}

const ReviewExternal: React.FC<ReviewExternalProps> = ({
  review: {
    pid,
    workYear,
    dateFirstEdition,
    creators,
    review,
    access,
    edition,
    hostPublication
  },
  dataCy = "review-external"
}) => {
  const date = getReviewRelease(dateFirstEdition, workYear, edition);
  const authors = getAuthorNames(creators);
  const publication = getPublicationName(hostPublication);
  // This value needs to be casted, because TS for some reason doesn't accept that we filter the access
  const accessUrls = access.filter(
    (accessItem) => accessItem.__typename === "AccessUrl"
  ) as Pick<AccessUrl, "origin" | "url">[];

  return (
    <li
      className="review text-small-caption"
      id={createUrlHash(HashPrefix.REVIEW, pid)}
      data-cy={dataCy}
    >
      {(authors || date || publication) && (
        <ReviewMetadata
          author={authors}
          date={date}
          publication={publication}
        />
      )}
      {review?.rating && <ReviewHearts amountOfHearts={review.rating} />}
      {accessUrls &&
        accessUrls.map(({ url, origin }, index) => {
          return (
            <>
              <span>{index > 0 ? ", " : ""}</span>
              <Link
                href={new URL(url)}
                className="link-tag text-small-caption mb-8"
              >
                {origin}
              </Link>
            </>
          );
        })}
    </li>
  );
};

export default ReviewExternal;
