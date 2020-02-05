import React, { useState, useEffect } from "react";
import PropTypes from "prop-types";
import urlPropType from "url-prop-type";

import OrderMaterial from "./order-material";
import OpenPlatform from "../../core/OpenPlatform";

const client = new OpenPlatform();

function OrderMaterialEntry({
  text,
  successText,
  errorText,
  checkingText,
  unavailableText,
  invalidPickupBranchText,
  id,
  loginUrl,
  pickupBranch,
  expires
}) {
  const [loading, setLoading] = useState("inactive");

  function orderMaterial() {
    setLoading("active");
    client
      .orderMaterial({ pids: [id], pickupBranch, expires })
      .catch(function onError() {
        setLoading("failed");
        setTimeout(function onRestore() {
          setLoading("inactive");
        }, 4000);
      });
  }

  useEffect(
    function getOrderStatus() {
      setLoading("checking");
      // Check that the pickup branch accepts inter-library loans.
      client
        .getBranch(pickupBranch)
        .then(function onBranchResult(branch) {
          if (branch.willReceiveIll !== "1") {
            setLoading("invalid branch");
          }

          // Check that the material is available for ILL.
          client
            .canBeOrdered(id)
            .then(function onAvailabilityResult(available) {
              setLoading(available ? "inactive" : "unavailable");
            })
            .catch(function onError() {
              setLoading("failed");
            });
        })
        .catch(function onError() {
          setLoading("failed");
        });
    },
    [id, pickupBranch]
  );

  return (
    <OrderMaterial
      text={text}
      errorText={errorText}
      successText={successText}
      checkingText={checkingText}
      unavailableText={unavailableText}
      invalidPickupBranchText={invalidPickupBranchText}
      loading={loading}
      onClick={orderMaterial}
      loginUrl={loginUrl}
      materialId={id}
    />
  );
}

OrderMaterialEntry.propTypes = {
  text: PropTypes.string,
  errorText: PropTypes.string,
  checkingText: PropTypes.string,
  unavailableText: PropTypes.string,
  invalidPickupBranchText: PropTypes.string,
  successText: PropTypes.string,
  id: PropTypes.string.isRequired,
  loginUrl: urlPropType.isRequired,
  pickupBranch: PropTypes.string.isRequired,
  expires: PropTypes.string.isRequired
};

OrderMaterialEntry.defaultProps = {
  text: "Bestil materiale",
  checkingText: "Undersøger mulighed for fjernlån",
  unavailableText: "Kan ikke fjernlånes",
  invalidPickupBranchText: "Dit afhentningsbibliotek modtager ikke fjernlån",
  errorText: "Det lykkedes ikke at bestille materialet.",
  successText: "Materialet er bestilt"
};

export default OrderMaterialEntry;
