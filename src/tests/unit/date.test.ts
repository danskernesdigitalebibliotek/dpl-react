import { describe, expect, it } from "vitest";
import dayjs from "dayjs";
import {
  formatDate,
  formatDateDependingOnDigitalMaterial,
  formatDateTime
} from "../../core/utils/helpers/date";
import {
  dateFormatDash,
  dateFormatDashWithTime
} from "../../core/configuration/date-format";

// We're describing a test suite for the `dateHasPassed` function
describe("formatDate helper function", () => {
  it('should correctly format the date in "DD-MM-YYYY" format', () => {
    // Prepare a date string for testing
    const testDate = "2022-01-01";

    // Call our function with the test date
    const result = formatDate(testDate);

    // We use dayjs to format the test date in the same way as our function
    // This will be the expected result
    const expectedResult = dayjs(testDate).format(dateFormatDash);

    // We compare the result of our function to the expected result
    // If they match, our function is working correctly
    expect(result).toEqual(expectedResult);
  });
});

// We are going to test our "formatDateTime" function
describe("formatDateTime", () => {
  // We need to test whether the function correctly formats the dates
  it("should correctly format dates", () => {
    // Test data
    const date = "2022-04-22T14:30:00Z";

    // Expected result from the function
    const expectedResult = dayjs(date).format(dateFormatDashWithTime);

    // Call the function with the test data
    const result = formatDateTime(date);

    // Check if the result is as expected
    expect(result).toEqual(expectedResult);
  });
  // We need to test whether the function correctly formats the dates
});

describe("Date helper tests", () => {
  // Test for formatDateTime function
  it("should correctly format date and time", () => {
    const date = dayjs().format(); // Get current date
    const formattedDate = formatDateTime(date);
    expect(formattedDate).toBe(dayjs(date).format(dateFormatDashWithTime));
  });
  // Test for formatDate function
  it("should correctly format date", () => {
    const date = dayjs().format(); // Get current date
    const formattedDate = formatDate(date);
    expect(formattedDate).toBe(dayjs(date).format(dateFormatDash));
  });
  // Test for formatDateDependingOnDigitalMaterial function
  it("should format date depending on digital material", () => {
    const date = dayjs().format(); // Get current date
    const digitalMaterial = { date, isDigital: true };
    const nonDigitalMaterial = { date, isDigital: false };

    const formattedDigitalMaterialDate =
      formatDateDependingOnDigitalMaterial(digitalMaterial);
    const formattedNonDigitalMaterialDate =
      formatDateDependingOnDigitalMaterial(nonDigitalMaterial);

    // Check if date is formatted correctly depending on whether material is digital or not
    expect(formattedDigitalMaterialDate).toBe(
      dayjs(date).format(dateFormatDashWithTime)
    );
    expect(formattedNonDigitalMaterialDate).toBe(
      dayjs(date).format(dateFormatDash)
    );
  });
});
