import { Factory } from "fishery";
import type { AvailabilityV3 } from "../../../src/core/fbs/model/availabilityV3";

// Factory for individual availability records
const fbsAvailabilityRecordFactory = Factory.define<AvailabilityV3>(() => ({
  recordId: "",
  reservable: false,
  available: false,
  reservations: 0
}));

// Predefined availability responses based on real API data from our test runs
export const availabilityResponses = {
  // Available book with reservations - "De syv søstre"
  "53292968": fbsAvailabilityRecordFactory.build({
    recordId: "53292968",
    reservable: true,
    available: true,
    reservations: 2
  }),

  // Unavailable book with reservations - "De syv søstre" (different edition)
  "52557240": fbsAvailabilityRecordFactory.build({
    recordId: "52557240",
    reservable: true,
    available: false,
    reservations: 2
  }),

  // Available audiobook with no reservations - "De syv søstre" audiobook
  "52643414": fbsAvailabilityRecordFactory.build({
    recordId: "52643414",
    reservable: true,
    available: true,
    reservations: 0
  })
};

// Helper function to get availability response by record ID
export const getFbsAvailabilityResponse = (
  recordId: string
): AvailabilityV3[] => {
  const response =
    availabilityResponses[recordId as keyof typeof availabilityResponses];
  if (response) {
    return [response];
  }

  // Default response for unknown record IDs
  return [
    fbsAvailabilityRecordFactory.build({
      recordId,
      available: false,
      reservations: 0
    })
  ];
};

// Helper to extract record ID from URL
export const extractRecordIdFromAvailabilityUrl = (url: string): string => {
  const match = url.match(/recordid=([^&]+)/);
  return match ? match[1] : "unknown";
};
