import { Pid } from "./ids";

export interface BasicDetailsType {
  authors?: string | null;
  pid: Pid | null | undefined;
  externalProductId?: string | null;
  materialType?: string | null;
  description?: string | null;
  year?: string | null;
  title?: string | null;
}
