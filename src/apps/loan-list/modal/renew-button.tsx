import React, { useCallback, FC } from "react";
import { useQueryClient } from "react-query";
import { useText } from "../../../core/utils/text";
import { useRenewLoansV2, getGetLoansV2QueryKey } from "../../../core/fbs/fbs";
import { LoanId } from "../../../core/utils/types/ids";
import { Button } from "../../../components/Buttons/Button";
import { RequestStatus } from "../../../core/utils/types/request";
import { RenewedLoanV2 } from "../../../core/fbs/model";
import { getRenewButtonLabel } from "../../../core/utils/helpers/renewal";
import { useStatistics } from "../../../core/statistics/useStatistics";
import { statistics } from "../../../core/statistics/statistics";

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
  const { track } = useStatistics();
  const queryClient = useQueryClient();
  const { mutate } = useRenewLoansV2();
  const label = getRenewButtonLabel({
    isRenewable: renewable,
    renewingStatus,
    t
  });
  const trackRenewal = () => {
    track("click", {
      id: statistics.renewSelectedMaterials.id,
      name: statistics.renewSelectedMaterials.name,
      trackedData: "Forny_valgte_materialer"
    });
  };
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
        dataCy="material-renew-button"
        size="small"
        variant="filled"
        disabled={!renewable || renewingStatus === "pending"}
        onClick={() => {
          trackRenewal();
          renew(loanId);
        }}
        classNames={classNames}
        label={label}
        buttonType="none"
        collapsible={false}
      />
    </div>
  );
};

export default RenewButton;
