import React from "react";
import { convertPostIdToFaustId } from "../../core/utils/helpers/general";
import { useText } from "../../core/utils/text";
import { Manifestation } from "../../core/utils/types/entities";
import AvailabilityLabel from "../availability-label/availability-label";

type InstantLoanBranchProps = {
  branch: string;
  manifestation: Manifestation;
};

const InstantLoanBranch: React.FunctionComponent<InstantLoanBranchProps> = ({
  branch,
  manifestation
}) => {
  const t = useText();
  const { pid, materialTypes, accessTypes, identifiers } = manifestation;
  const materialType = materialTypes[0].specific;
  const faustId = convertPostIdToFaustId(pid);
  const accessTypesCodes = accessTypes.map((item) => item.code);
  const isbn = identifiers?.[0].value;

  return (
    <div className="instant-loan-branch cursor-pointer px-24">
      <p className="text-header-h5">{branch}</p>
      <AvailabilityLabel
        faustIds={[faustId]}
        manifestText={materialType}
        accessTypes={accessTypesCodes}
        isbn={isbn}
      />
    </div>
  );
};

export default InstantLoanBranch;
