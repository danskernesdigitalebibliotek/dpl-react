import React, { useState, useEffect } from "react";
import PropTypes from "prop-types";
import urlPropType from "url-prop-type";

import OrderMaterial from "./order-material";
import OpenPlatform from "../../core/OpenPlatform";

const client = new OpenPlatform();

function OrderMaterialEntry({
  text,
  successText,
  successMessage,
  errorText,
  checkingText,
  progressText,
  unavailableText,
  invalidPickupBranchText,
  id,
  loginUrl,
  pickupBranch,
  expires
}) {
  const [status, setStatus] = useState("initial");

  function orderMaterial() {
    setStatus("processing");
    client
      .orderMaterial({ pids: [id], pickupBranch, expires })
      .then(function materialOrdered() {
        setStatus("finished");
      })
      .catch(function onError() {
        setStatus("failed");
      });
  }

  useEffect(
    function getOrderStatus() {
      setStatus("checking");
      // Check that the pickup branch accepts inter-library loans.
      client
        .getBranch(pickupBranch)
        .then(function onBranchResult(branch) {
          if (branch.willReceiveIll !== "1") {
            setStatus("invalid branch");
          } else {
            // Check that the material is available for ILL.
            client
              .canBeOrdered(id)
              .then(function onAvailabilityResult(available) {
                setStatus(available ? "ready" : "unavailable");
              })
              .catch(function onError() {
                setStatus("failed");
              });
          }
        })
        .catch(function onError() {
          setStatus("failed");
        });
    },
    [id, pickupBranch]
  );

  return (
    <OrderMaterial
      text={text}
      errorText={errorText}
      successText={successText}
      successMessage={successMessage}
      checkingText={checkingText}
      progressText={progressText}
      unavailableText={unavailableText}
      invalidPickupBranchText={invalidPickupBranchText}
      status={status}
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
  progressText: PropTypes.string,
  unavailableText: PropTypes.string,
  invalidPickupBranchText: PropTypes.string,
  successText: PropTypes.string,
  successMessage: PropTypes.string,
  id: PropTypes.string.isRequired,
  loginUrl: urlPropType.isRequired,
  pickupBranch: PropTypes.string.isRequired,
  expires: PropTypes.string.isRequired
};

OrderMaterialEntry.defaultProps = {
  text: "Bestil materiale",
  checkingText: "Undersøger mulighed for fjernlån",
  progressText: "Bestiller materiale",
  unavailableText: "Kan ikke fjernlånes",
  invalidPickupBranchText: "Dit afhentningsbibliotek modtager ikke fjernlån",
  errorText: "Det lykkedes ikke at bestille materialet.",
  successText: "Materialet er bestilt",
  successMessage:
    "Materialet er bestilt, dit bibliotek vil give besked når det er klar til afhentning."
};

export default OrderMaterialEntry;
