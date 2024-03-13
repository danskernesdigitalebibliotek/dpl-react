// Formats a number as a Danish Krone (DKK) currency string using the "da-DK" locale.
export function formatCurrency(number: number): string {
  const options = { style: "currency", currency: "DKK" };
  return number.toLocaleString("da-DK", options);
}

export default {};
