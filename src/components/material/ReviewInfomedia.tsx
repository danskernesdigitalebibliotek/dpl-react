import React from "react";
import {
  InfomediaReview,
  useGetInfomediaQuery
} from "../../core/dbc-gateway/generated/graphql";
import { useText } from "../../core/utils/text";
import ReviewHearts from "./ReviewHearts";
import ReviewMetadata, { usDateStringToDateObj } from "./ReviewMetadata";

export interface ReviewInfomediaProps {
  review: InfomediaReview;
}

const ReviewInfomedia: React.FC<ReviewInfomediaProps> = ({ review }) => {
  const { id } = review;
  const { data, error } = useGetInfomediaQuery({
    id
  });
  const t = useText();
  if (error) {
    return null;
  }
  if (!data) {
    return null;
  }
  const { infomedia } = data;
  const date = review.date ? usDateStringToDateObj(review.date) : null;
  if (infomedia.error) {
    return (
      <li className="review text-small-caption">
        {(review.author || review.date) && (
          <ReviewMetadata author={review.author} date={date} />
        )}
        {review.rating && <ReviewHearts amountOfHearts={review.rating} />}
        <div className="review__headline mb-8">
          {infomedia.error === "BORROWER_NOT_LOGGED_IN"
            ? t("loginToSeeReviewText")
            : t("cantViewReviewText")}
        </div>
      </li>
    );
  }
  return (
    <li className="review text-small-caption">
      {(review.author || review.date) && (
        <ReviewMetadata author={review.author} date={date} />
      )}
      {review.rating && <ReviewHearts amountOfHearts={review.rating} />}
      {infomedia.article?.headLine && (
        <div className="review__headline mb-8">
          {infomedia.article.headLine}
        </div>
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
      {/* eslint-enable react/no-danger */}
      {review.origin && (
        <ReviewMetadata
          author={review.author}
          date={date}
          url={new URL(review.origin)}
        />
      )}
    </li>
  );
};

export default ReviewInfomedia;
