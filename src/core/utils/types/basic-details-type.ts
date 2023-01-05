import { Pid } from "./ids";
import { Nullable } from "./nullable";

interface BasicDetails {
  authors: string;
  firstAuthor: string;
  pid: Pid;
  externalProductId: string;
  materialType: string;
  description: string;
  year: string;
  title: string;
  series: string;
}

export type BasicDetailsType = Nullable<Partial<BasicDetails>>;
