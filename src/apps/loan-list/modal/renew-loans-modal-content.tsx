import React, { useState, useEffect, FC } from "react";
import { useText } from "../../../core/utils/text";
import CheckBox from "../materials/utils/checkbox";
import { LoanV2 } from "../../../core/fbs/model/loanV2";
import SelectableMaterial from "../materials/selectable-material";
import { useRenewLoansV2 } from "../../../core/fbs/fbs";
import { RenewedLoanV2 } from "../../../core/fbs/model";
import { getRenewableMaterials, getAmountOfRenewableLoans } from "../helpers";

interface RenewLoansModalContentProps {
  renewable: number | null;
  loansModal: LoanV2[];
  buttonLabel: string;
  checkboxLabel: string;
}

const RenewLoansModalContent: FC<RenewLoansModalContentProps> = ({
  renewable,
  loansModal,
  checkboxLabel,
  buttonLabel
}) => {
  const t = useText();
  const { mutate } = useRenewLoansV2();
  const [materialsToRenew, setMaterialsToRenew] = useState<number[]>([]);
  const [allRenewableMaterials, setAllRenewableMaterials] = useState<number>(0);
  const [loans, setLoans] = useState<Array<LoanV2>>([]);
  const [renewedLoans, setRenewedLoans] = useState<
    Array<RenewedLoanV2> | undefined | null
  >(null);

  const renewSelected = () => {
    mutate(
      {
        data: materialsToRenew
      },
      {
        onSuccess: (result) => {
          if (result) {
            const renewedIds = result.map(
              ({ loanDetails }) => loanDetails.recordId
            );
            const filteredLoans = loans.filter((item) => {
              return renewedIds.indexOf(item.loanDetails.recordId) === -1;
            });
            setMaterialsToRenew([]);
            setLoans(filteredLoans);
            setRenewedLoans(result);
          }
        },
        onError: () => {}
      }
    );
  };

  useEffect(() => {
    setMaterialsToRenew(getRenewableMaterials(loansModal));
    setLoans(loansModal);
    setAllRenewableMaterials(getAmountOfRenewableLoans(loansModal));
  }, [loansModal]);

  const selectAll = () => {
    if (materialsToRenew.length > 0) {
      setMaterialsToRenew([]);
    } else {
      setMaterialsToRenew(getRenewableMaterials(loansModal));
    }
  };

  const onChecked = (faust: string) => {
    const faustNumber = parseInt(faust, 10);
    const materialsToRenewCopy = materialsToRenew;

    const indexOfItemToRemove = materialsToRenew.indexOf(faustNumber);
    if (indexOfItemToRemove > -1) {
      materialsToRenewCopy.splice(indexOfItemToRemove, 1);
    } else {
      materialsToRenewCopy.push(parseInt(faust, 10));
    }
    setMaterialsToRenew(materialsToRenewCopy);
  };

  return (
    <>
      <div className="modal-loan__buttons">
        <CheckBox
          selected={materialsToRenew.length === allRenewableMaterials}
          id="checkbox-select-all"
          onChecked={selectAll}
          label={checkboxLabel}
        />
        <button
          type="button"
          id="renew-several"
          disabled={renewable === 0}
          onClick={renewSelected}
          className="btn-primary btn-filled btn-small arrow__hover--right-small"
        >
          {buttonLabel} ({renewable})
        </button>
      </div>
      <div className="modal-loan__list">
        <ul className="modal-loan__list-materials">
          {renewedLoans &&
            renewedLoans.map(({ renewalStatus, loanDetails }) => {
              return (
                <SelectableMaterial
                  disabled
                  onChecked={onChecked}
                  faust={loanDetails.recordId}
                  loanDetails={loanDetails}
                  renewableStatus={renewalStatus}
                />
              );
            })}
          {loans.map(({ renewalStatusList, isRenewable, loanDetails }) => {
            return (
              <SelectableMaterial
                faust={loanDetails.recordId}
                materialsToRenew={materialsToRenew}
                onChecked={onChecked}
                disabled={!isRenewable}
                loanDetails={loanDetails}
                renewableStatus={renewalStatusList}
              />
            );
          })}
        </ul>
      </div>
    </>
  );
};

export default RenewLoansModalContent;
