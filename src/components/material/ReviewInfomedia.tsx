import React from "react";
import {
  AccessUrl,
  InfomediaService,
  useGetInfomediaQuery
} from "../../core/dbc-gateway/generated/graphql";
import {
  getAuthorNames,
  getPublicationName,
  getReviewRelease
} from "../../core/utils/helpers/general";
import {
  getCurrentLocation,
  isUrlValid,
  redirectToLoginAndBack,
  createUrlHash,
  HashPrefix
} from "../../core/utils/helpers/url";
import { useText } from "../../core/utils/text";
import { ReviewManifestation } from "../../core/utils/types/entities";
import { useUrls } from "../../core/utils/url";
import { Button } from "../Buttons/Button";
import ReviewHearts from "./ReviewHearts";
import ReviewMetadata from "./ReviewMetadata";

export interface ReviewInfomediaProps {
  review: ReviewManifestation;
  dataCy?: string;
}

const ReviewInfomedia: React.FC<ReviewInfomediaProps> = ({
  review: {
    workYear,
    dateFirstEdition,
    access,
    creators,
    review,
    edition,
    hostPublication
  },
  dataCy = "review-infomedia"
}) => {
  const t = useText();
  const u = useUrls();
  const authUrl = u("authUrl");

  const date = getReviewRelease(dateFirstEdition, workYear, edition);
  const authors = getAuthorNames(creators);
  const publication = getPublicationName(hostPublication);
  const infomediaAccess = access.filter(
    (accessItem) => accessItem.__typename === "InfomediaService"
  ) as Pick<InfomediaService, "id">[];
  const infomediaId = infomediaAccess[0].id;
  const { data, error } = useGetInfomediaQuery({
    id: infomediaId
  });

  const onClick = (reviewId: string) => {
    const returnUrl = new URL(getCurrentLocation());
    returnUrl.hash = createUrlHash(HashPrefix.REVIEW, reviewId);
    redirectToLoginAndBack({ authUrl, returnUrl });
  };

  if (error) {
    return null;
  }
  if (!data) {
    return null;
  }
  const { infomedia } = data;
  if (infomedia.error) {
    return (
      <li
        className="review text-small-caption"
        id={createUrlHash(HashPrefix.REVIEW, infomediaId)}
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
        <div className="review__headline mb-8">
          {infomedia.error === "BORROWER_NOT_LOGGED_IN" ? (
            <Button
              label={t("loginToSeeReviewText")}
              buttonType="none"
              disabled={false}
              collapsible={false}
              size="xsmall"
              variant="outline"
              onClick={() => {
                onClick(infomediaId);
              }}
            />
          ) : (
            t("cantViewReviewText")
          )}
        </div>
      </li>
    );
  }

  const accessUrls = access.filter(
    (accessItem) => accessItem.__typename === "AccessUrl"
  ) as Pick<AccessUrl, "origin" | "url">[];

  return (
    <li
      className="review text-small-caption"
      id={createUrlHash(HashPrefix.REVIEW, infomediaId)}
    >
      {(authors || date || publication) && (
        <ReviewMetadata
          author={authors}
          date={date}
          publication={publication}
        />
      )}
      {review?.rating && <ReviewHearts amountOfHearts={review.rating} />}
      {infomedia.article?.headLine && (
        <h3 className="review__headline mb-8">{infomedia.article.headLine}</h3>
      )}
      {/* We consider infomedia to be a trustworthy source & decided not to
      sanitize the text data that we render as HTML. */}
      {infomedia.article?.text && (
        <p
          className="review__body mb-8"
          // eslint-disable-next-line react/no-danger
          dangerouslySetInnerHTML={{ __html: infomedia.article?.text }}
        />
      )}
      {access.some((a) => a.__typename === "AccessUrl") &&
        isUrlValid(accessUrls[0].url) && (
          <ReviewMetadata
            author={authors}
            date={date}
            url={new URL(accessUrls[0].url)}
          />
        )}
    </li>
  );
};

export default ReviewInfomedia;
