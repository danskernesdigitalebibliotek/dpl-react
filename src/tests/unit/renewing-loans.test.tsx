import { expect, test } from "vitest";
import vitestData from "./__vitest_data__/renewing-loans";
import {
  filterRenewResponseData,
  succeededRenewalCount
} from "../../core/utils/helpers/renewal";

test("Should filter renew response data by succeded renewals", () => {
  const { renewingResponse } = vitestData;
  const filteredRenewals = filterRenewResponseData(renewingResponse);

  expect(filteredRenewals).toHaveLength(2);
});

test("Should count filtered renew response data", () => {
  const { renewingResponse } = vitestData;
  const numberOfSuccededRenewals = succeededRenewalCount(renewingResponse);

  expect(numberOfSuccededRenewals).toBe(2);
});
