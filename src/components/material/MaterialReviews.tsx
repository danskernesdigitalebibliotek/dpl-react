import React from "react";
import { useGetReviewManifestationsQuery } from "../../core/dbc-gateway/generated/graphql";
import { Pid } from "../../core/utils/types/ids";
import ReviewExternal from "./ReviewExternal";
import ReviewInfomedia from "./ReviewInfomedia";
import ReviewLibrarian from "./ReviewLibrarian";

export interface MaterialReviewsProps {
  pids: Pid[];
}

export const MaterialReviews: React.FC<MaterialReviewsProps> = ({ pids }) => {
  const { data, isLoading } = useGetReviewManifestationsQuery({
    pid: pids
  });

  if (isLoading) {
    return <div>temporary content</div>;
  }

  if (!data) {
    return null;
  }

  const { manifestations: reviews } = data;

  return (
    <ul className="reviews">
      {reviews.map((review) => {
        if (
          review?.access.some(
            (access) => access.__typename === "InfomediaService"
          )
        ) {
          return <ReviewInfomedia review={review} />;
        }
        if (
          review?.access.some((access) => access.__typename === "AccessUrl")
        ) {
          return <ReviewExternal review={review} />;
        }
        if (
          review?.access.some(
            (access) => access.__typename === "InterLibraryLoan"
          )
        ) {
          return <ReviewLibrarian review={review} />;
        }
        return null;
      })}
    </ul>
  );
};

export default MaterialReviews;
