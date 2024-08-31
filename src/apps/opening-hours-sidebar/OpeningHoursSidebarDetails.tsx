import React, { FC } from "react";
import { LibraryType } from "./helper";
import { useText } from "../../core/utils/text";

const OpeningHoursSidebarDetails: FC<
  Pick<LibraryType, "openingHoursData" | "link">
> = ({ openingHoursData, link }) => {
  const t = useText();
  return (
    <div className="opening-hours-sidebar-details__content">
      <dl className="opening-hours-sidebar-details__list">
        {openingHoursData.map(({ term, description }, i) => (
          // eslint-disable-next-line react/no-array-index-key
          <div key={i} className="opening-hours-sidebar-details__item">
            <dt className="opening-hours-sidebar-details__term">{term}</dt>
            <dd className="opening-hours-sidebar-details__description">
              {description}
            </dd>
          </div>
        ))}
      </dl>
      <a href={link} className="opening-hours-sidebar__link">
        {t("openingHoursSidebarLinkText")}
      </a>
    </div>
  );
};

export default OpeningHoursSidebarDetails;
