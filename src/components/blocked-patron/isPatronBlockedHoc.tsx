import React, { useEffect, useState, ComponentType, FC } from "react";
import { useDispatch } from "react-redux";
import { useGetPatronInformationByPatronIdV2 } from "../../core/fbs/fbs";
import BlockedModal from "./blocked-modal/BlockedModal";
import { AuthenticatedPatronV6 } from "../../core/fbs/model";
import { useModalButtonHandler } from "../../core/utils/modal";
import { getModalIds } from "../../core/utils/helpers/general";
import { setHasBeenVisible } from "../../core/blockedModal.slice";
import { RootState, useSelector } from "../../core/store";

export interface PatronProps {
  patron: AuthenticatedPatronV6 | null | undefined;
}

// Hoc that determines if a patron is blocked and provides a modal with
// and explanation for the user.
const isPatronBlockedHoc =
  <P extends object>(Component: ComponentType<P & PatronProps>): FC<P> =>
  ({ ...props }) => {
    const dispatch = useDispatch();
    const { open } = useModalButtonHandler();
    const { blockedModal } = getModalIds();
    const [patron, setPatron] = useState<AuthenticatedPatronV6>();
    const [blockedStatus, setBlockedStatus] = useState<string>();
    const { data: patronData } = useGetPatronInformationByPatronIdV2();

    // Used to check whether the modal has been opened by another component,
    // the modal should really only be showed once.
    const {
      data: { hasBeenVisible }
    } = useSelector((state: RootState) => state.blockedModal);

    useEffect(() => {
      if (patronData) {
        setPatron(patronData);
        // As above comment, only opens modal if it has not been visible.
        if (
          patronData?.patron?.blockStatus &&
          patronData?.patron?.blockStatus?.length > 0 &&
          !hasBeenVisible
        ) {
          setBlockedStatus(patronData.patron.blockStatus[0].blockedReason);
          open(blockedModal as string);
          dispatch(setHasBeenVisible({ hasBeenVisible: true }));
        }
      }
    }, [blockedModal, dispatch, hasBeenVisible, open, patronData]);

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

export default isPatronBlockedHoc;
