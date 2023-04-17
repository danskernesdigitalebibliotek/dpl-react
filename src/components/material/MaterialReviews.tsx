import React from "react";
import { useGetReviewManifestationsQuery } from "../../core/dbc-gateway/generated/graphql";
import { ReviewManifestation } from "../../core/utils/types/entities";
import { Pid } from "../../core/utils/types/ids";
import ReviewExternal from "./ReviewExternal";
import ReviewInfomedia from "./ReviewInfomedia";
import ReviewLibrarian from "./ReviewLibrarian";
import ReviewSkeleton from "./ReviewSkeleton";

export interface MaterialReviewsProps {
  pids: Pid[];
  dataCy?: string;
}

export const MaterialReviews: React.FC<MaterialReviewsProps> = ({
  pids,
  dataCy = "material-reviews"
}) => {
  const { data, isLoading } = useGetReviewManifestationsQuery({
    pid: pids
  });

  if (isLoading) {
    return <ReviewSkeleton />;
  }

  if (!data) {
    return null;
  }

  const { manifestations: reviews } = data;

  const getReviewType = (review: ReviewManifestation) => {
    if (
      review?.access.some((access) => access.__typename === "InfomediaService")
    ) {
      return "infomedia";
    }
    if (review?.access.some((access) => access.__typename === "AccessUrl")) {
      return "external";
    }
    if (
      review?.access.some((access) => access.__typename === "InterLibraryLoan")
    ) {
      return "librarian";
    }
    return null;
  };

  const chooseReview = (
    reviewType: "infomedia" | "external" | "librarian" | null,
    review: ReviewManifestation
  ) => {
    switch (reviewType) {
      case null:
        return null;
      case "infomedia":
        return (
          <ReviewInfomedia review={review} dataCy={`${dataCy}-infomedia`} />
        );
      case "external":
        return <ReviewExternal review={review} dataCy={`${dataCy}-external`} />;
      case "librarian":
        return (
          <ReviewLibrarian review={review} dataCy={`${dataCy}-librarian`} />
        );
      default:
        return null;
    }
  };

  return (
    <ul className="reviews" data-cy={dataCy}>
      {reviews.map((review) => {
        if (!review) {
          return null;
        }
        return chooseReview(
          getReviewType(review as ReviewManifestation),
          review as ReviewManifestation
        );
      })}
    </ul>
  );
};

export default MaterialReviews;
