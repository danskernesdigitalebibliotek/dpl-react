import React from "react";
import { useGetReviewManifestationsQuery } from "../../core/dbc-gateway/generated/graphql";
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

  return (
    <ul className="reviews" data-cy={dataCy}>
      {reviews.map((review) => {
        if (
          review?.access.some(
            (access) => access.__typename === "InfomediaService"
          )
        ) {
          return (
            <ReviewInfomedia review={review} dataCy={`${dataCy}-infomedia`} />
          );
        }
        if (
          review?.access.some((access) => access.__typename === "AccessUrl")
        ) {
          return (
            <ReviewExternal review={review} dataCy={`${dataCy}-external`} />
          );
        }
        if (
          review?.access.some(
            (access) => access.__typename === "InterLibraryLoan"
          )
        ) {
          return (
            <ReviewLibrarian review={review} dataCy={`${dataCy}-librarian`} />
          );
        }
        return null;
      })}
    </ul>
  );
};

export default MaterialReviews;
