import React, { useState } from "react";
import ExpandMoreIcon from "@danskernesdigitalebibliotek/dpl-design-system/build/icons/collection/ExpandMore.svg";
import clsx from "clsx";
import Link from "../atoms/links/Link";
import { useText } from "../../core/utils/text";

export interface HorizontalTermLineProps {
  title: string;
  subTitle?: string;
  linkList: {
    url: URL;
    term: string;
  }[];
  dataCy?: string;
}

const HorizontalTermLine: React.FC<HorizontalTermLineProps> = ({
  title,
  subTitle,
  linkList,
  dataCy = "horizontal-term-line"
}) => {
  const t = useText();
  const numberOfItemsToShow = 3;
  const [showMore, setShowMore] = useState(false);
  const itemsToShow = showMore
    ? linkList
    : linkList.slice(0, numberOfItemsToShow);
  const showMoreButton = linkList.length > numberOfItemsToShow;

  return (
    <div data-cy={dataCy} className="text-small-caption horizontal-term-line">
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
            <Link href={url} className="link-tag">
              {term}
            </Link>
          </span>
        );
      })}

      {showMoreButton && (
        <button
          type="button"
          onClick={() => setShowMore(!showMore)}
          aria-label={t("expandMoreText")}
        >
          <img
            className={clsx("horizontal-term-line__expand", {
              "horizontal-term-line__expand--expanded": showMore
            })}
            src={ExpandMoreIcon}
            alt=""
          />
        </button>
      )}
    </div>
  );
};

export default HorizontalTermLine;
