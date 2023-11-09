import { useConfig } from "./config";

type Days = number;

const useLoanThresholds = (): { warning: Days; danger: Days } => {
  const config = useConfig();

  return {
    warning: Number(config<`${number}`>("expirationWarningDaysBeforeConfig")),
    danger: 0
  };
};

export default useLoanThresholds;
