import { Pid } from "./ids";

type Nullable<T> = { [K in keyof T]: T[K] | null };

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
