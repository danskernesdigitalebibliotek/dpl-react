import React, { FC, ReactNode } from "react";
import clsx from "clsx";

type ContentListPageProps = {
  title: ReactNode;
  children?: ReactNode;
  headingLevel?: "h1" | "h2";
  headingClassName?: string;
  headingId?: string;
  headingDataCy?: string;
  headingAriaLive?: "polite" | "assertive" | "off";
  dataCy?: string;
};

const ContentListPage: FC<ContentListPageProps> = ({
  title,
  children,
  headingLevel: Heading = "h1",
  headingClassName,
  headingId,
  headingDataCy,
  headingAriaLive,
  dataCy
}) => (
  <section className="content-list-page" data-cy={dataCy}>
    <Heading
      className={clsx("content-list-page__heading", headingClassName)}
      id={headingId}
      data-cy={headingDataCy}
      aria-live={headingAriaLive}
    >
      {title}
    </Heading>
    {children}
  </section>
);

export default ContentListPage;
