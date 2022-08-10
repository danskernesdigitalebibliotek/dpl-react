import dayjs from "dayjs";
import React from "react";
import customParseFormat from "dayjs/plugin/customParseFormat";
import { LinkNoStyle } from "../atoms/link-no-style";

export interface ReviewMetadataProps {
  author?: string | null;
  date?: Date | null;
  link?: string;
}

export const usDateStringToDateObj = (date: string): Date => {
  dayjs.extend(customParseFormat);
  return dayjs(date, "YYYY-MM-DD").toDate();
};

const ReviewMetadata: React.FC<ReviewMetadataProps> = ({
  author,
  date,
  link
}) => {
  const metaDataText = (
    returnAuthor: string | null | undefined,
    returnDate: Date | null | undefined
  ) => {
    return `${returnAuthor || ""}${returnAuthor && returnDate ? ", " : ""}${
      returnDate ? dayjs(returnDate).format("DD.MM.YYYY") : ""
    }`;
  };

  if (link) {
    return (
      <LinkNoStyle href={link} className="link-tag text-small-caption mb-8">
        {metaDataText(author, date)}
      </LinkNoStyle>
    );
  }

  return <div className="review__meta mb-8">{metaDataText(author, date)}</div>;
};

export default ReviewMetadata;
