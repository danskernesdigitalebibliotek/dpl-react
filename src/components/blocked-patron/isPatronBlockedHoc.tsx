import React, { useEffect, useState, ComponentType, FC } from "react";
import { useDispatch } from "react-redux";
import { useGetPatronInformationByPatronIdV2 } from "../../core/fbs/fbs";
import BlockedModal from "./blocked-modal/BlockedModal";
import { AuthenticatedPatronV6 } from "../../core/fbs/model";
import { useModalButtonHandler } from "../../core/utils/modal";
import { getModalIds } from "../../core/utils/helpers/general";
import { setHasBeenVisible } from "../../core/blockedModal.slice";
import { RootState, useSelector } from "../../core/store";
import { redirectTo } from "../../core/utils/helpers/url";

export interface PatronProps {
  patron: AuthenticatedPatronV6 | null | undefined;
}

type InputProps = {
  redirectOnBlocked: string;
};

// Hoc that determines if a patron is blocked and provides a modal with
// and explanation for the user.
const isPatronBlockedHoc =
  <P extends object>(Component: ComponentType<P>): FC<P & InputProps> =>
  ({ redirectOnBlocked, ...props }) => {
    const dispatch = useDispatch();
    const { open } = useModalButtonHandler();
    const { blockedModal } = getModalIds();
    const [blockedFromViewingContentArray] = useState<string[]>([
      "D",
      "S",
      "F",
      "O"
    ]);
    const [blockedStatus, setBlockedStatus] = useState<string>();
    const [blockedFromViewingContent, setBlockedFromViewingContent] =
      useState<boolean>(true);
    const { data: patronData } = useGetPatronInformationByPatronIdV2();

    // Used to check whether the modal has been opened by another component,
    // the modal should really only be showed once.
    const {
      data: { hasBeenVisible }
    } = useSelector((state: RootState) => state.blockedModal);

    useEffect(() => {
      if (patronData) {
        if (
          patronData?.patron?.blockStatus &&
          patronData?.patron?.blockStatus?.length > 0
        ) {
          const reason = patronData.patron.blockStatus[0].blockedReason;
          setBlockedStatus(reason);
          // As above comment, only opens modal if it has not already been visible.
          if (!hasBeenVisible) {
            open(blockedModal as string);
            dispatch(setHasBeenVisible({ hasBeenVisible: true }));
          }
        }
      }
    }, [blockedModal, dispatch, hasBeenVisible, open, patronData]);

    useEffect(() => {
      if (blockedStatus) {
        if (blockedFromViewingContentArray.includes(blockedStatus)) {
          setBlockedFromViewingContent(true);
          redirectTo(new URL(redirectOnBlocked));
        } else {
          setBlockedFromViewingContent(false);
        }
      }
    }, [blockedFromViewingContentArray, blockedStatus, redirectOnBlocked]);

    return (
      <>
        <BlockedModal blockedStatus={blockedStatus || ""} />
        {!blockedFromViewingContent && (
          <Component
            /* eslint-disable-next-line react/jsx-props-no-spreading */
            {...(props as P)}
          />
        )}
      </>
    );
  };

export default isPatronBlockedHoc;
