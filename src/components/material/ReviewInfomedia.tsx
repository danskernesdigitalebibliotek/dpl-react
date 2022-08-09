import dayjs from "dayjs";
import React from "react";
import {
  InfomediaReview,
  useGetInfomediaQuery
} from "../../core/dbc-gateway/generated/graphql";
import { usDateStringToEurDateObj } from "../../core/utils/helpers";
import { useText } from "../../core/utils/text";
import ReviewHearts from "./ReviewHearts";
import ReviewMetadata from "./ReviewMetadata";

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
  if (infomedia.error) {
    return (
      <li className="review text-small-caption">
        {(review.author || review.date) && (
          <ReviewMetadata
            author={review.author}
            date={usDateStringToEurDateObj(review.date)}
          />
        )}
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
        <ReviewMetadata
          author={review.author}
          date={usDateStringToEurDateObj(review.date)}
        />
      )}
      {review.rating && <ReviewHearts amountOfHearts={review.rating} />}
      {infomedia.article?.headLine && (
        <div className="review__headline mb-8">
          {infomedia.article.headLine}
        </div>
      )}
      {infomedia.article?.text && (
        <p className="review__body mb-8">{infomedia.article?.text}</p>
      )}
      {review.origin && (
        <a href={review.origin} className="link-tag text-small-caption mb-8">
          {`${review.author}${review.author && review.date ? ", " : ""}${
            review.date ? dayjs(review.date).format("DD-MM-YYYY") : ""
          }`}
        </a>
      )}
    </li>
  );
};

export default ReviewInfomedia;
