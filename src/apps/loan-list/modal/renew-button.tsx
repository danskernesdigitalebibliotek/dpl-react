import React, { useState, useCallback, FC } from "react";
import { RenewedLoanV2 } from "../../../core/fbs/model";
import { useText } from "../../../core/utils/text";
import { useRenewLoansV2 } from "../../../core/fbs/fbs";
import IconCheckmark from "../../../components/icon-checkmark/icon-checkmark";

interface RenewButtonProps {
  faust: string;
  setDueDate: (date: string) => void;
}

const RenewButton: FC<RenewButtonProps> = ({ faust, setDueDate }) => {
  const t = useText();
  const { mutate } = useRenewLoansV2();
  const [statusText, setStatusText] = useState<string>();
  const [renewable, setRenewable] = useState<boolean>(true);
  const [renewed, setRenewed] = useState<boolean>(false);

  const determineStatusText = useCallback(
    ({ renewalStatus }: RenewedLoanV2) => {
      const [status] = renewalStatus;
      setRenewable(false);
      switch (status) {
        case "deniedMaxRenewalsReached":
          setStatusText(t("loanListDeniedOtherReasonText"));
          break;
        case "deniedOtherReason":
          setStatusText(t("loanListDeniedOtherReasonText"));
          break;
        case "deniedReserved":
          setStatusText(t("loanListDeniedOtherReasonText"));
          break;
        case "renewed":
          setRenewed(true);
          setStatusText(t("loanListDeniedOtherReasonText"));
          break;
        default:
          break;
      }
    },
    [t]
  );

  const renew = useCallback(
    (renewId: number) => {
      mutate(
        {
          data: [renewId]
        },
        {
          onSuccess: (result) => {
            if (result) {
              setDueDate(result[0].loanDetails.dueDate);
              determineStatusText(result[0]);
            }
          },
          // todo error handling, missing in figma
          onError: () => {}
        }
      );
    },
    [determineStatusText, mutate, setDueDate]
  );

  return (
    <div className="modal-details__buttons">
      {renewable && faust && (
        <button
          type="button"
          onClick={() => renew(parseInt(faust, 10))}
          className="btn-primary btn-filled btn-small arrow__hover--right-small"
        >
          {t("materialDetailsRenewLoanButtonText")}
        </button>
      )}
      {!renewed && !renewable && (
        <>
          <span className="text-small-caption px-16 my-16">{statusText}</span>
          <button
            type="button"
            disabled
            className="btn-primary btn-outline btn-small arrow__hover--right-small my-4"
          >
            {t("materialDetailsButtonNotRenewableText")}
          </button>
        </>
      )}
      {renewed && (
        <button
          type="button"
          disabled
          className="btn-primary btn-outline btn-small arrow__hover--right-small"
        >
          {t("materialDetailsButtonRenewedText")}
          <div className="btn-icon">
            <IconCheckmark />
          </div>
        </button>
      )}
    </div>
  );
};

export default RenewButton;
