import React, { useCallback, FC } from "react";
import { useQueryClient } from "react-query";
import { useText } from "../../../core/utils/text";
import { useRenewLoansV2, getGetLoansV2QueryKey } from "../../../core/fbs/fbs";
import { FaustId } from "../../../core/utils/types/ids";
import { useModalButtonHandler } from "../../../core/utils/modal";

interface RenewButtonProps {
  loanId: number;
  renewable: boolean;
  faust: FaustId;
}

const RenewButton: FC<RenewButtonProps> = ({ loanId, faust, renewable }) => {
  const t = useText();
  const queryClient = useQueryClient();
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
              queryClient.invalidateQueries(getGetLoansV2QueryKey());
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
    [close, faust, mutate, queryClient]
  );

  return (
    <div className="modal-details__buttons">
      <button
        type="button"
        disabled={!renewable}
        onClick={() => renew(loanId)}
        className={`btn-primary btn-filled btn-small arrow__hover--right-small ${
          !renewable ? "btn-outline" : ""
        }`}
      >
        {t("materialDetailsRenewLoanButtonText")}
      </button>
    </div>
  );
};

export default RenewButton;
