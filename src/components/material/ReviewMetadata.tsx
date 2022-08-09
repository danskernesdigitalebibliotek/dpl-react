import dayjs from "dayjs";
import React from "react";
import customParseFormat from "dayjs/plugin/customParseFormat";

export interface ReviewMetadataProps {
  author?: string | null;
  date?: Date | null;
}

export const usDateStringToDateObj = (date: string): Date | null => {
  if (date === "undefined") {
    return null;
  }
  dayjs.extend(customParseFormat);
  return dayjs(date, "YYYY-MM-DD").toDate();
};

const ReviewMetadata: React.FC<ReviewMetadataProps> = ({ author, date }) => {
  return (
    <div className="review__meta mb-8">
      {`${author || ""}${author && date ? ", " : ""}${
        date ? dayjs(date).format("DD.MM.YYYY") : ""
      }`}
    </div>
  );
};

export default ReviewMetadata;
