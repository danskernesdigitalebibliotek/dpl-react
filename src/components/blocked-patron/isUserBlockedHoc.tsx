import React, { useEffect, useState, ComponentType, FC } from "react";
import { useGetPatronInformationByPatronIdV2 } from "../../core/fbs/fbs";
import BlockedModal from "./blocked-modal/BlockedModal";
import { AuthenticatedPatronV6 } from "../../core/fbs/model";
import { useModalButtonHandler } from "../../core/utils/modal";

export interface PatronProps {
  patron: AuthenticatedPatronV6 | null | undefined;
}
const isUserBlockedHoc =
  <P extends object>(Component: ComponentType<P & PatronProps>): FC<P> =>
  ({ ...props }) => {
    const { open } = useModalButtonHandler();
    const [patron, setPatron] = useState<AuthenticatedPatronV6>();
    const [blockedStatus, setBlockedStatus] = useState<string>();
    const { data: patronData } = useGetPatronInformationByPatronIdV2();

    useEffect(() => {
      if (patronData) {
        setPatron(patronData);
        if (
          patronData?.patron?.blockStatus &&
          patronData?.patron?.blockStatus?.length > 0
        ) {
          setBlockedStatus(patronData.patron.blockStatus[0].blockedReason);
          open("blocked-modal");
        }
      }
    }, [open, patronData]);
    // If this is a digital book, another HOC fetches the data and this
    // HOC just returns the component
    return (
      <>
        <BlockedModal blockedStatus={blockedStatus || ""} />
        <Component
          patron={patron}
          /* eslint-disable-next-line react/jsx-props-no-spreading */
          {...(props as P)}
        />
      </>
    );
  };

export default isUserBlockedHoc;
