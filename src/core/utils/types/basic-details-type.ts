import { Pid } from "./ids";
import { Nullable } from "./nullable";

interface BasicDetails {
  authors: string;
  pid: Pid;
  externalProductId: string;
  materialType: string;
  description: string;
  year: string;
  title: string;
}

export type BasicDetailsType = Nullable<Partial<BasicDetails>>;
