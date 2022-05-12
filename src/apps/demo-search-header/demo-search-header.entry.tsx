import * as React from "react";
import DemoSearchHeader from "./demo-search-header";

export interface DemoSearchHeaderEntryProps {
  searchUrl: string;
}

const DemoSearchHeaderEntry: React.FC<DemoSearchHeaderEntryProps> = ({
  searchUrl
}) => <DemoSearchHeader searchUrl={searchUrl} />;

export default DemoSearchHeaderEntry;
