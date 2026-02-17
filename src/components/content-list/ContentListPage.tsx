import React, { FC, ReactNode } from "react";

type ContentListPageProps = {
  title: string;
  children: ReactNode;
};

const ContentListPage: FC<ContentListPageProps> = ({ title, children }) => (
  <section className="content-list-page">
    <h1 className="content-list-page__heading">{title}</h1>
    {children}
  </section>
);

export default ContentListPage;
