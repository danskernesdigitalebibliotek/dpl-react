import React, { FC } from "react";
import iconWatch from "@danskernesdigitalebibliotek/dpl-design-system/build/icons/basic/icon-watch-static.svg";
import DisclosureControllable from "../../components/Disclosures/DisclosureControllable";
import OpeningHoursSidebarSummary from "./OpeningHoursSidebarSummary";
import OpeningHoursSidebarDetails from "./OpeningHoursSidebarDetails";
import { LibraryType } from "./helper";

const OpeningHoursSidebarSidebar: FC<{ libraries: LibraryType[] }> = ({
  libraries
}) => {
  return (
    <section className="opening-hours-sidebar">
      <header className="opening-hours-sidebar__header">
        <img src={iconWatch} className="opening-hours-sidebar__icon" alt="" />
        <div className="opening-hours-sidebar__texts">
          <h2 className="opening-hours-sidebar__title">Åbningstider</h2>
          <p className="opening-hours-sidebar__date">I dag (fredag 28. maj)</p>
        </div>
      </header>

      {libraries.map(({ id, name, openingHoursData, link }, i) => (
        <DisclosureControllable
          showContent={i === 0}
          key={id}
          id={id}
          detailsClassName="opening-hours-sidebar-details"
          summaryClassName="opening-hours-sidebar-summary"
          summary={<OpeningHoursSidebarSummary name={name} />}
        >
          <OpeningHoursSidebarDetails
            openingHoursData={openingHoursData}
            link={link}
          />
        </DisclosureControllable>
      ))}
    </section>
  );
};

export default OpeningHoursSidebarSidebar;
