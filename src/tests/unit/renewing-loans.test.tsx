import { expect, test } from "vitest";
import { filterRenewResponseData } from "../../components/GroupModal/helper";
import vitestData from "./__vitest_data__/renewing-loans";

test("Should filter renew response data by succeded renewals", () => {
  const { renewingResponse } = vitestData;
  const filteredRenewals = filterRenewResponseData(renewingResponse);

  expect(filteredRenewals).toHaveLength(2);
});
