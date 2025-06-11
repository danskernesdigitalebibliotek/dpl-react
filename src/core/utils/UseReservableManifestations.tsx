import { useEffect, useState } from "react";
import {
  getAvailability,
  filterManifestationsByType,
  useGetHoldings
} from "../../apps/material/helper";
import { convertPostIdToFaustId, getAllFaustIds } from "./helpers/general";
import { Manifestation } from "./types/entities";
import { useConfig } from "./config";
import { AgencyBranch } from "../fbs/model";
import { excludeBlacklistedBranches } from "./branches";
import {
  getInstantLoanBranchHoldings,
  getInstantLoanBranchHoldingsAboveThreshold
} from "../../components/reservation/helper";
import { InstantLoanConfigType } from "./types/instant-loan";

const UseReservableManifestations = ({
  manifestations,
  type
}: {
  manifestations: Manifestation[];
  type?: string;
}) => {
  const config = useConfig();
  const faustIds = getAllFaustIds(manifestations);
  const branches = config<AgencyBranch[]>("branchesConfig", {
    transformer: "jsonParse"
  });
  const blacklistBranchesInstantLoan = config(
    "blacklistedInstantLoanBranchesConfig",
    {
      transformer: "stringToArray"
    }
  );
  const blacklistPickupBranches = config("blacklistedPickupBranchesConfig", {
    transformer: "stringToArray"
  });
  const whitelistBranches = excludeBlacklistedBranches(
    branches,
    blacklistBranchesInstantLoan.concat(blacklistPickupBranches)
  );

  const { data: holdingsData } = useGetHoldings({
    faustIds,
    config,
    blacklist: "availability"
  });
  console.group("UseReservableManifestations");
  console.log("🚀 ~ faustIds:", faustIds);

  console.log("🚀 ~ holdingsData:", holdingsData);

  const {
    matchStrings: instantLoanMatchStrings,
    threshold: instantLoanThreshold
  } = config<InstantLoanConfigType>("instantLoanConfig", {
    transformer: "jsonParse"
  });

  const instantLoanBranchHoldings = holdingsData
    ? getInstantLoanBranchHoldings(
        holdingsData?.[0].holdings,
        whitelistBranches,
        instantLoanMatchStrings ?? []
      )
    : [];
  console.log("🚀 ~ instantLoanBranchHoldings:", instantLoanBranchHoldings);
  console.groupEnd();

  const [reservableManifestations, setReservableManifestations] = useState<
    Manifestation[] | null
  >(null);
  const [unReservableManifestations, setUnReservableManifestations] = useState<
    Manifestation[] | null
  >(null);

  useEffect(() => {
    if (
      !manifestations.length ||
      reservableManifestations ||
      unReservableManifestations
    ) {
      return;
    }

    const fetchAvailability = async (m: Manifestation[]) => {
      // Fetch availability data.
      const dataAvailability = await getAvailability({ faustIds, config });

      // If we for some reason do not get any dataAvailability, we return empty arrays.
      if (!dataAvailability) {
        return { reservable: [], unReservable: [] };
      }

      // If type is set, filter the manifestations by the type.
      // Otherwise leave as is.
      const filterableManifestations = type
        ? filterManifestationsByType(type, m)
        : m;
      // Get manifestations that are reservable.
      const reservable = filterableManifestations.filter((manifestation) =>
        dataAvailability.some(
          (item) =>
            item.reservable &&
            item.recordId === convertPostIdToFaustId(manifestation.pid)
        )
      );

      // Get manifestations that are unReservable.
      const unReservable = filterableManifestations.filter((manifestation) =>
        dataAvailability.some(
          (item) =>
            !item.reservable &&
            item.recordId === convertPostIdToFaustId(manifestation.pid)
        )
      );
      return { reservable, unReservable };
    };

    fetchAvailability(manifestations).then(({ reservable, unReservable }) => {
      setReservableManifestations(reservable);
      setUnReservableManifestations(unReservable);
    });
  }, [
    manifestations,
    faustIds,
    type,
    reservableManifestations,
    unReservableManifestations,
    config
  ]);

  return {
    reservableManifestations,
    unReservableManifestations
  };
};

export default UseReservableManifestations;
