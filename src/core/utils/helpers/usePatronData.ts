import { useGetPatronInformationByPatronIdV2 } from "../../fbs/fbs";
import { isAnonymous } from "./user";

export const usePatronData = () =>
  useGetPatronInformationByPatronIdV2({
    enabled: !isAnonymous()
  });

export default {};
