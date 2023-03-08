import React from "react";
import {
  AccessUrl,
  InfomediaService,
  useGetInfomediaQuery
} from "../../core/dbc-gateway/generated/graphql";
import {
  getAuthorNames,
  getReviewRelease
} from "../../core/utils/helpers/general";
import {
  currentLocationWithParametersUrl,
  isUrlValid,
  redirectToLoginAndBack
} from "../../core/utils/helpers/url";
import { useText } from "../../core/utils/text";
import { ReviewManifestation } from "../../core/utils/types/entities";
import { useUrls } from "../../core/utils/url";
import { useScrollToLocation } from "../../core/utils/UseScrollToLocation";
import { Button } from "../Buttons/Button";
import ReviewHearts from "./ReviewHearts";
import ReviewMetadata from "./ReviewMetadata";

export interface ReviewInfomediaProps {
  review: ReviewManifestation;
  dataCy?: string;
}

const ReviewInfomedia: React.FC<ReviewInfomediaProps> = ({
  review: { workYear, dateFirstEdition, access, creators, review, edition },
  dataCy = "review-infomedia"
}) => {
  const date = getReviewRelease(dateFirstEdition, workYear, edition);
  const authors = getAuthorNames(creators);
  const infomediaAccess = access.filter(
    (accessItem) => accessItem.__typename === "InfomediaService"
  ) as Pick<InfomediaService, "id">[];
  const infomediaId = infomediaAccess[0].id;
  const { data, error } = useGetInfomediaQuery({
    id: infomediaId
  });
  const t = useText();
  const { authUrl } = useUrls();
  const onClick = (reviewId: string) => {
    const returnUrl = currentLocationWithParametersUrl({
      disclosure: "disclosure-reviews"
    });
    returnUrl.hash = reviewId;
    redirectToLoginAndBack({ authUrl, returnUrl });
  };

  // If there is an anchor we scroll down to it.
  useScrollToLocation(data);

  if (error) {
    return null;
  }
  if (!data) {
    return null;
  }
  const { infomedia } = data;
  if (infomedia.error) {
    return (
      <li className="review text-small-caption" data-cy={dataCy}>
        {(authors || date) && <ReviewMetadata author={authors} date={date} />}
        {review?.rating && <ReviewHearts amountOfHearts={review.rating} />}
        <h4 className="review__headline mb-8">
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
        </h4>
      </li>
    );
  }

  const accessUrls = access.filter(
    (accessItem) => accessItem.__typename === "AccessUrl"
  ) as Pick<AccessUrl, "origin" | "url">[];

  return (
    <li className="review text-small-caption" id={infomediaId}>
      {(authors || date) && <ReviewMetadata author={authors} date={date} />}
      {review?.rating && <ReviewHearts amountOfHearts={review.rating} />}
      {infomedia.article?.headLine && (
        <h4 className="review__headline mb-8">{infomedia.article.headLine}</h4>
      )}
      {/* We consider infomedia to be a trustworthy source & decided not to
      sanitize the text data that we render as HTML. */}
      {/* eslint-disable react/no-danger */}
      {infomedia.article?.text && (
        <p
          className="review__body mb-8"
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
