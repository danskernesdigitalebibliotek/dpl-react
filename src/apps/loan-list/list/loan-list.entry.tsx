import * as React from "react";
import LoanList from "./loan-list";

export interface LoanListEntryProps {}

const LoanListEntry: React.FC<LoanListEntryProps> = ({ searchUrl }) => (
  <LoanList />
);

export default LoanListEntry;
