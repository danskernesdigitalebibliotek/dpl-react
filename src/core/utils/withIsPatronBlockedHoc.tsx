import React, { useEffect, useState, ComponentType, FC } from "react";
import { useDispatch } from "react-redux";
import BlockedModal from "../../components/blocked-patron/blocked-modal/BlockedModal";
import { AuthenticatedPatronV6 } from "../fbs/model";
import { useModalButtonHandler } from "./modal";
import { setHasBeenVisible } from "../blockedModal.slice";
import { RootState, useSelector } from "../store";
import BlockedTypes from "./types/BlockedTypes";
import { redirectTo } from "./helpers/url";
import { usePatronData } from "./helpers/user";
import { getModalIds } from "./helpers/modal-helpers";

export interface PatronProps {
  patron: AuthenticatedPatronV6 | null | undefined;
}

type InputProps = {
  // This should be a redirect to the front page.
  redirectOnBlocked: string;
};

// Hoc that determines if a patron is blocked and provides a modal with
// and explanation for the user.
const withIsPatronBlockedHoc =
  <P extends object>(Component: ComponentType<P>): FC<P & InputProps> =>
  ({ redirectOnBlocked, ...props }) => {
    const dispatch = useDispatch();
    const { open } = useModalButtonHandler();
    const { blockedModal } = getModalIds();

    const [blockedFromViewingContentArray] = useState<string[]>([
      BlockedTypes.deceased,
      BlockedTypes.automatonBlocked,
      BlockedTypes.extendedExclusion,
      BlockedTypes.stolen
    ]);

    const [blockedStatus, setBlockedStatus] = useState<string>();
    const [blockedFromViewingContent, setBlockedFromViewingContent] = useState<
      boolean | null
    >(null);
    const { data: patronData } = usePatronData();

    // Used to check whether the modal has been opened by another component,
    // the modal should really only be showed once.
    const {
      data: { hasBeenVisible }
    } = useSelector((state: RootState) => state.blockedModal);

    useEffect(() => {
      if (!patronData) {
        return;
      }
      if (
        patronData?.patron?.blockStatus &&
        patronData?.patron?.blockStatus?.length > 0
      ) {
        setBlockedStatus(patronData.patron.blockStatus[0].blockedReason);
        // As above comment, only opens modal if it has not already been visible.
        if (!hasBeenVisible && typeof blockedModal === "string") {
          open(blockedModal);
          dispatch(setHasBeenVisible({ hasBeenVisible: true }));
        }
      } else {
        setBlockedFromViewingContent(false);
      }
    }, [blockedModal, dispatch, hasBeenVisible, open, patronData]);

    useEffect(() => {
      if (!blockedStatus) {
        return;
      }
      if (blockedFromViewingContentArray.includes(blockedStatus)) {
        setBlockedFromViewingContent(true);
        redirectTo(new URL(redirectOnBlocked));
      } else {
        setBlockedFromViewingContent(false);
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

export default withIsPatronBlockedHoc;
