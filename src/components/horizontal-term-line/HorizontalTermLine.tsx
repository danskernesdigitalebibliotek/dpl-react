import React from "react";

export interface HorizontalTermLineProps {
  title: string;
  subTitle?: string;
  linkList: string[];
  searchUrl?: string;
}

const HorizontalTermLine: React.FC<HorizontalTermLineProps> = ({
  title,
  subTitle,
  linkList,
  searchUrl
}) => {
  return (
    <div className="text-small-caption horizontal-term-line">
      <p className="text-label-bold">
        {title || ""}{" "}
        {subTitle && (
          <span className="text-small-caption">{` ${subTitle}`}</span>
        )}
      </p>

      {linkList.map((identifier) => {
        return (
          <span key={identifier}>
            <a href={`${searchUrl}&args=q:${identifier}`} className="link-tag">
              {identifier}
            </a>
          </span>
        );
      })}
    </div>
  );
};

export default HorizontalTermLine;
