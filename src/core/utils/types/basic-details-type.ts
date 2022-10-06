import { Pid } from "./ids";

export interface BasicDetailsType {
  authors: string | null | undefined;
  pid: Pid | null | undefined;
  externalProductId: string | null | undefined;
  materialType: string | null | undefined;
  description: string | null | undefined;
  year: string | null | undefined;
  title: string | null | undefined;
}
