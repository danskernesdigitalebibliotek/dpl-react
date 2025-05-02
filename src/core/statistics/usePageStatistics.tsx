import { useEffectOnce } from "react-use";
import { useStatistics } from "./useStatistics";
import { useConfig } from "../utils/config";

const usePageStatistics = () => {
  const config = useConfig();
  const domain = config("mappDomainConfig");
  const id = config("mappIdConfig");

  const { sendPageStatistics } = useStatistics();
  useEffectOnce(() => {
    sendPageStatistics({ domain, id });
  });
};

export default usePageStatistics;
