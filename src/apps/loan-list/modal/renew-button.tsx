import React, { useCallback, FC } from "react";
import { useQueryClient } from "react-query";
import { useText } from "../../../core/utils/text";
import { useRenewLoansV2, getGetLoansV2QueryKey } from "../../../core/fbs/fbs";
import { FaustId, LoanId } from "../../../core/utils/types/ids";
import { useModalButtonHandler } from "../../../core/utils/modal";
import { Button } from "../../../components/Buttons/Button";

interface RenewButtonProps {
  loanId: LoanId;
  renewable: boolean;
  faust: FaustId;
  classNames?: string;
}

const RenewButton: FC<RenewButtonProps> = ({
  loanId,
  faust,
  renewable,
  classNames
}) => {
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
      <Button
        size="small"
        variant="filled"
        disabled={!renewable}
        onClick={() => renew(loanId)}
        classNames={classNames}
        label={t("materialDetailsRenewLoanButtonText")}
        buttonType="none"
        collapsible={false}
      />
    </div>
  );
};

export default RenewButton;
