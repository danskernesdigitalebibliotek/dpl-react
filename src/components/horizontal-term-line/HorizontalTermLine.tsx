import React from "react";

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
  return (
    <div className="text-small-caption horizontal-term-line">
      <p className="text-label-semibold">
        {title}{" "}
        {subTitle && <span className="text-small-caption">{subTitle} </span>}
      </p>
      <ul className="horizontal-term-line__list">
        {linkList.map((item) => (
          <li>
            <a href="/" className="link-tag">
              {item}
            </a>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default HorizontalTermLine;
