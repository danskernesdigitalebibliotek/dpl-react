import React from "react";
import {
  InfomediaReview,
  useGetInfomediaQuery
} from "../../core/dbc-gateway/generated/graphql";
import { useText } from "../../core/utils/text";
import ReviewHearts from "./ReviewHearts";
import ReviewMetadata from "./ReviewMetadata";

export interface ReviewInfomediaProps {
  review: InfomediaReview;
}

const ReviewInfomedia: React.FC<ReviewInfomediaProps> = ({ review }) => {
  const { id } = review;
  const { data } = useGetInfomediaQuery({
    id
  });
  const t = useText();
  return (
    <li className="review text-small-caption">
      {(review.author || review.date) && (
        <ReviewMetadata author={review.author} date={review.date} />
      )}
      {review.rating && <ReviewHearts amountOfHearts={review.rating} />}
      {data?.infomedia.article?.headLine && (
        <div className="review__headline mb-8">
          {data.infomedia.article.headLine}
        </div>
      )}
      {data?.infomedia.error && (
        <div className="review__headline mb-8">
          {data?.infomedia.error === "BORROWER_NOT_LOGGED_IN"
            ? t("loginToSeeReviewText")
            : t("cantViewReviewText")}
        </div>
      )}
      {data?.infomedia.article?.text && (
        <p className="review__body mb-8">{data?.infomedia.article?.text}</p>
      )}
      {review.origin && (
        <a href={review.origin} className="link-tag text-small-caption mb-8">
          {`${review.author}${
            review.author && review.date ? ", " : ""
          }${review.date?.split("-").reverse().join(".")}`}
        </a>
      )}
    </li>
  );
};

export default ReviewInfomedia;
