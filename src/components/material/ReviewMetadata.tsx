import React from "react";

export interface ReviewMetadataProps {
  author?: string | null;
  date?: string | null;
}

const ReviewMetadata: React.FC<ReviewMetadataProps> = ({ author, date }) => {
  return (
    <div className="review__meta mb-8">
      {`${author}${author && date ? ", " : ""}${date
        ?.split("-")
        .reverse()
        .join(".")}`}
    </div>
  );
};

export default ReviewMetadata;
