import React, { useCallback, FC } from "react";
import { useText } from "../../../core/utils/text";
import { useRenewLoansV2 } from "../../../core/fbs/fbs";
import { FaustId } from "../../../core/utils/types/ids";
import { useModalButtonHandler } from "../../../core/utils/modal";

interface RenewButtonProps {
  faust: FaustId;
  setDueDate: (date: string) => void;
}

const RenewButton: FC<RenewButtonProps> = ({ faust }) => {
  const t = useText();
  const { close } = useModalButtonHandler();
  const { mutate } = useRenewLoansV2();

  const renew = useCallback(
    (renewId: number) => {
      mutate(
        {
          data: [renewId]
        },
        {
          onSuccess: (result) => {
            if (result) {
              close(faust);
            }
          },
          // todo error handling, missing in figma
          onError: () => {
            close(faust);
          }
        }
      );
    },
    [close, faust, mutate]
  );

  return (
    <div className="modal-details__buttons">
      <button
        type="button"
        onClick={() => renew(parseInt(faust, 10))}
        className="btn-primary btn-filled btn-small arrow__hover--right-small"
      >
        {t("materialDetailsRenewLoanButtonText")}
      </button>
    </div>
  );
};

export default RenewButton;
