import React, { useEffect, useState, ComponentType, FC } from "react";
import BlockedModal, {
  getBlockedModalId
} from "../../components/blocked-patron/blocked-modal/BlockedModal";
import { AuthenticatedPatronV6 } from "../fbs/model";
import { useModalButtonHandler } from "./modal";
import BlockedTypes from "./types/BlockedTypes";
import { getBlockedStatus, usePatronData } from "./helpers/usePatronData";
import { useBlockedModalHasBeenVisible } from "../../components/blocked-patron/helper";

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
    // Used to check whether the modal has been opened by another component,
    // the modal should really only be showed once.
    const hasBeenVisible = useBlockedModalHasBeenVisible();
    const { open } = useModalButtonHandler();
    const blockedModalId = getBlockedModalId();

    const [blockedFromViewingContentArray] = useState<string[]>([
      BlockedTypes.extendedSuspension
    ]);

    const [blockedFromViewingContent, setBlockedFromViewingContent] = useState<
      boolean | null
    >(null);
    const { data: patronData } = usePatronData();
    const blockedStatus = getBlockedStatus(patronData?.patron);

    useEffect(() => {
      // If we do not know the blocked status, we do not have to do anything.
      if (!patronData?.patron) {
        return;
      }

      // Open modal if it has not been shown yet and we have a blocked status.
      if (blockedStatus !== BlockedTypes.unknown && !hasBeenVisible) {
        open(blockedModalId);
      }

      // Make sure to hide the content behind the modal on certain blocked statuses.
      if (blockedFromViewingContent === null) {
        setBlockedFromViewingContent(
          blockedFromViewingContentArray.includes(blockedStatus)
        );
      }
    }, [
      blockedFromViewingContent,
      blockedFromViewingContentArray,
      blockedModalId,
      blockedStatus,
      hasBeenVisible,
      open,
      patronData?.patron
    ]);

    return (
      <>
        {blockedStatus !== BlockedTypes.unknown && (
          <BlockedModal blockedStatus={blockedStatus} />
        )}
        {!blockedFromViewingContent && <Component {...(props as P)} />}
      </>
    );
  };

export default withIsPatronBlockedHoc;
