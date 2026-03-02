import dayjs from "dayjs";
import React from "react";
import customParseFormat from "dayjs/plugin/customParseFormat";
import LinkNoStyle from "../atoms/links/LinkNoStyle";
import { useText } from "../../core/utils/text";

export interface ReviewMetadataProps {
  author?: string | null;
  date?: string | null;
  publication?: string | null;
  url?: URL;
  isLibrarian?: boolean;
}

export const usDateStringToDateObj = (date: string): Date => {
  dayjs.extend(customParseFormat);
  return dayjs(date, "YYYY-MM-DD").toDate();
};

const ReviewMetadata: React.FC<ReviewMetadataProps> = ({
  author,
  date,
  publication,
  url,
  isLibrarian
}) => {
  const t = useText();
  const metaDataText = (
    returnAuthor: string | null | undefined,
    returnHost: string | null | undefined,
    returnDate: string | null | undefined,
    isLibrarian: boolean | null | undefined
  ) => {
    const authorText = returnAuthor || "";
    const hostText = returnHost || "";
    const isLibrarianText = isLibrarian ? t("libraryAssessmentText") : "";
    const authorAndHostSeparator =
      authorText && (hostText || isLibrarianText) ? " - " : "";
    const dateText = returnDate ? `, ${returnDate}` : "";

    return `
    ${authorText}${authorAndHostSeparator}${hostText}${isLibrarianText}${dateText}
    `;
  };

  if (url) {
    return (
      <LinkNoStyle url={url} className="link-tag text-small-caption mb-8">
        {metaDataText(author, publication, date, isLibrarian)}
      </LinkNoStyle>
    );
  }

  return (
    <div className="review__meta mb-8">
      {metaDataText(author, publication, date, isLibrarian)}
    </div>
  );
};

export default ReviewMetadata;
