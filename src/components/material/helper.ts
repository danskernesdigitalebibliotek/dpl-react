import { HoldingsV3 } from "../../core/fbs/model/holdingsV3";

// This makes a array of all periodical editions
function makePeriodicalEditionsFromHoldings(holdings: HoldingsV3[]) {
  return holdings
    .map((holding: HoldingsV3) => {
      // Make all editions from holdings into one array
      return holding.materials.flat().map((material) => {
        // Return a object that contains editions + itemNumber
        return { ...material.periodical, itemNumber: material.itemNumber };
      });
    })
    .flat();
}

export default makePeriodicalEditionsFromHoldings;
