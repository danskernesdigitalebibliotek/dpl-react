import { useGetPatronInformationByPatronIdV2 } from "../../core/fbs/fbs";
import { isAnonymous } from "../../core/utils/helpers/user";

export const usePatronData = () => {
  const { isLoading, data } = useGetPatronInformationByPatronIdV2({
    enabled: !isAnonymous()
  });

  return { isLoading, data };
};

export default {};
