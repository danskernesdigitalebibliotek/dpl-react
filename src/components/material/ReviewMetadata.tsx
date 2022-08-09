import dayjs, { Dayjs } from "dayjs";
import React from "react";
import customParseFormat from "dayjs/plugin/customParseFormat";

export interface ReviewMetadataProps {
  author?: string | null;
  date?: string | Dayjs;
}

export const usDateStringToDateObj = (date: string) => {
  dayjs.extend(customParseFormat);
  return dayjs(date, "YYYY-MM-DD");
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
