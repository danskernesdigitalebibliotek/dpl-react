import React, { useCallback, FC } from "react";
import { useQueryClient } from "react-query";
import { useText } from "../../../core/utils/text";
import { useRenewLoansV2, getGetLoansV2QueryKey } from "../../../core/fbs/fbs";
import { LoanId } from "../../../core/utils/types/ids";
import { Button } from "../../../components/Buttons/Button";
import { RequestStatus } from "../../../core/utils/types/request";
import { RenewedLoanV2 } from "../../../core/fbs/model";

interface RenewButtonProps {
  loanId: LoanId;
  renewable: boolean;
  classNames?: string;
  hideOnMobile: boolean;
  setRenewingStatus: (status: RequestStatus) => void;
  renewingStatus: RequestStatus;
  setRenewingResponse: (response: RenewedLoanV2[] | null) => void;
}

const RenewButton: FC<RenewButtonProps> = ({
  loanId,
  renewable,
  classNames,
  hideOnMobile,
  setRenewingStatus,
  renewingStatus,
  setRenewingResponse
}) => {
  const t = useText();
  const queryClient = useQueryClient();
  const { mutate } = useRenewLoansV2();

  const renew = useCallback(
    (renewId: number) => {
      setRenewingStatus("pending");
      mutate(
        {
          data: [renewId]
        },
        {
          onSuccess: (result) => {
            if (result) {
              queryClient.invalidateQueries(getGetLoansV2QueryKey());
              setRenewingResponse(result);
              setRenewingStatus("success");
            }
          },
          // todo error handling, missing in figma
          onError: () => {
            setRenewingStatus("error");
          }
        }
      );
    },
    [mutate, queryClient, setRenewingResponse, setRenewingStatus]
  );

  return (
    <div
      className={`${
        hideOnMobile && `modal-details__buttons--hide-on-mobile`
      } modal-details__buttons`}
    >
      <Button
        size="small"
        variant="filled"
        disabled={!renewable || renewingStatus === "pending"}
        onClick={() => renew(loanId)}
        classNames={classNames}
        label={
          renewingStatus === "pending"
            ? t("renewProcessingText")
            : t("renewButtonText")
        }
        buttonType="none"
        collapsible={false}
      />
    </div>
  );
};

export default RenewButton;
