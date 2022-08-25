import * as React from "react";
import { Pid } from "../../../../core/utils/types/ids";

interface MaterialAvailabilityTextOnlineProps {
  pid?: Pid;
}

const MaterialAvailabilityTextOnline: React.FC<
  MaterialAvailabilityTextOnlineProps
> = () => {
  return (
    <p className="mt-16 text-small-caption">MaterialAvailabilityTextOnline</p>
  );
};

export default MaterialAvailabilityTextOnline;
