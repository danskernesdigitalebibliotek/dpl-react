import dayjs from "dayjs";
import React from "react";
import customParseFormat from "dayjs/plugin/customParseFormat";
import LinkNoStyle from "../atoms/links/LinkNoStyle";

export interface ReviewMetadataProps {
  author?: string | null;
  date?: string | null;
  publication?: string | null;
  url?: URL;
}

export const usDateStringToDateObj = (date: string): Date => {
  dayjs.extend(customParseFormat);
  return dayjs(date, "YYYY-MM-DD").toDate();
};

const ReviewMetadata: React.FC<ReviewMetadataProps> = ({
  author,
  date,
  publication,
  url
}) => {
  const metaDataText = (
    returnAuthor: string | null | undefined,
    returnHost: string | null | undefined,
    returnDate: string | null | undefined
  ) => {
    const authorText = returnAuthor || "";
    const hostText = returnHost || "";
    const authorAndHostSeparator = authorText && hostText ? " - " : "";
    const dateText = returnDate && `, ${returnDate}`;

    return `
    ${authorText}${authorAndHostSeparator}${hostText}${dateText}
    `;
  };

  if (url) {
    return (
      <LinkNoStyle url={url} className="link-tag text-small-caption mb-8">
        {metaDataText(author, publication, date)}
      </LinkNoStyle>
    );
  }

  return (
    <div className="review__meta mb-8">
      {metaDataText(author, publication, date)}
    </div>
  );
};

export default ReviewMetadata;
