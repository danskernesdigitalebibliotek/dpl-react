import dayjs from "dayjs";
import React from "react";

export interface ReviewMetadataProps {
  author?: string | null;
  date?: string | Date | null | undefined;
}

const ReviewMetadata: React.FC<ReviewMetadataProps> = ({ author, date }) => {
  return (
    <div className="review__meta mb-8">
      {`${author || ""}${author && date ? ", " : ""}${
        date ? dayjs(date).format("DD-MM-YYYY") : ""
      }`}
    </div>
  );
};

export default ReviewMetadata;
