/**
 * Formats a number as a Danish Krone (DKK) currency string using the "da-DK" locale.
 *
 * @param {number} number - The numeric value to format into a currency string.
 * @returns {string} A string formatted in Danish Krone currency format.
 */
export function formatCurrency(number: number): string {
  const options = { style: "currency", currency: "DKK" };
  return number.toLocaleString("da-DK", options);
}

export default {};
