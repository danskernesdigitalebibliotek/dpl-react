import React from "react";
import { constructSearchUrl } from "../../core/utils/helpers/url";
import { useUrls } from "../../core/utils/url";
import { Link } from "../atoms/link";

export interface HorizontalTermLineProps {
  title: string;
  subTitle?: string;
  linkList: string[];
}

const HorizontalTermLine: React.FC<HorizontalTermLineProps> = ({
  title,
  subTitle,
  linkList
}) => {
  const { searchUrl } = useUrls();

  return (
    <div className="text-small-caption horizontal-term-line">
      <p className="text-label-bold">
        {title || ""}{" "}
        {subTitle && (
          <span className="text-small-caption">{` ${subTitle}`}</span>
        )}
      </p>

      {linkList.map((term) => {
        const termUrl = constructSearchUrl(searchUrl, term);

        return (
          <span key={term}>
            <Link href={termUrl} className="link-tag">
              {term}
            </Link>
          </span>
        );
      })}
    </div>
  );
};

export default HorizontalTermLine;
