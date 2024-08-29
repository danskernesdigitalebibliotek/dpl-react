import React from "react";
import iconWatch from "@danskernesdigitalebibliotek/dpl-design-system/build/icons/basic/icon-watch-static.svg";
import DisclosureControllable from "../../components/Disclosures/DisclosureControllable";
import OpeningHoursSidebarSummary from "./OpeningHoursSidebarSummary";
import OpeningHoursSidebarDetails from "./OpeningHoursSidebarDetails";

const libraries = [
  {
    id: "1",
    name: "Hovedbiblioteket",
    openingHoursData: [
      { term: "Selvbetjening & læsesale", description: "7:00 - 22:00" },
      { term: "Personlig betjening:", description: "9:00 - 16:00" },
      { term: "Telefon (+45 30 30 30 30):", description: "7:00 - 22:00" }
    ]
  },
  {
    id: "2",
    name: "BIBLIOTEKET Rentemestervej",
    openingHoursData: [
      { term: "Selvbetjening & læsesale", description: "7:00 - 22:00" },
      { term: "Personlig betjening:", description: "9:00 - 16:00" },
      { term: "Telefon (+45 30 30 30 30):", description: "7:00 - 22:00" }
    ]
  },
  {
    id: "3",
    name: "Bibliotekshuset",
    openingHoursData: [
      { term: "Selvbetjening & læsesale", description: "7:00 - 22:00" },
      { term: "Personlig betjening:", description: "9:00 - 16:00" },
      { term: "Telefon (+45 30 30 30 30):", description: "7:00 - 22:00" }
    ]
  },
  {
    id: "4",
    name: "Blågårdens Bibliotek",
    openingHoursData: [
      { term: "Selvbetjening & læsesale", description: "7:00 - 22:00" },
      { term: "Personlig betjening:", description: "9:00 - 16:00" },
      { term: "Telefon (+45 30 30 30 30):", description: "7:00 - 22:00" }
    ]
  }
];

const OpeningHoursSidebarSidebar = () => {
  return (
    <section className="opening-hours-sidebar">
      <header className="opening-hours-sidebar__header">
        <img src={iconWatch} className="opening-hours-sidebar__icon" alt="" />
        <div className="opening-hours-sidebar__texts">
          <h2 className="opening-hours-sidebar__title">Åbningstider</h2>
          <p className="opening-hours-sidebar__date">I dag (fredag 28. maj)</p>
        </div>
      </header>

      {libraries.map(({ id, name, openingHoursData }, i) => (
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
            link="#"
          />
        </DisclosureControllable>
      ))}
    </section>
  );
};

export default OpeningHoursSidebarSidebar;
