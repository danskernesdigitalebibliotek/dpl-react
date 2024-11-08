import React, { useState } from "react";
import clsx from "clsx";
import Link from "../atoms/links/Link";
import ButtonExpand from "../button-expand/ButtonExpand";

export interface HorizontalTermLineProps {
  title: string;
  subTitle?: string;
  linkList: {
    url: URL;
    term: string;
  }[];
  dataCy?: string;
  classNames?: string;
}

const HorizontalTermLine: React.FC<HorizontalTermLineProps> = ({
  title,
  subTitle,
  linkList,
  classNames,
  dataCy = "horizontal-term-line"
}) => {
  const numberOfItemsToShow = 3;
  const [showMore, setShowMore] = useState(false);
  const itemsToShow = showMore
    ? linkList
    : linkList.slice(0, numberOfItemsToShow);
  const showMoreButton = linkList.length > numberOfItemsToShow;

  if (linkList.length === 0) {
    return null;
  }

  return (
    <div
      data-cy={dataCy}
      className={clsx("text-small-caption horizontal-term-line", classNames)}
    >
      <h3 className="text-label-bold">
        {title || ""}{" "}
        {subTitle && (
          <span className="text-small-caption">{` ${subTitle}`}</span>
        )}
      </h3>

      {itemsToShow.map((item) => {
        const { term, url } = item;
        return (
          <span key={term}>
            <Link href={url} className="link-tag" stopPropagation>
              {term}
            </Link>
          </span>
        );
      })}

      {showMoreButton && (
        <ButtonExpand showMore={showMore} setShowMore={setShowMore} />
      )}
    </div>
  );
};

export default HorizontalTermLine;
