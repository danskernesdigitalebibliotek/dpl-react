export type ValidSelectedIncrements = 4 | 8 | 12 | 16 | 20 | 24 | 28 | 32;

export const MaterialGridValidIncrements: ValidSelectedIncrements[] = [
  4, 8, 12, 16, 20, 24, 28, 32
];

export function calculateAmountToDisplay(
  availableAmount: number,
  selectedAmount?: ValidSelectedIncrements
): ValidSelectedIncrements {
  // If selectedAmount is defined and less than or equal to availableAmount, return it
  if (selectedAmount && availableAmount >= selectedAmount) {
    return selectedAmount;
  }

  // Find the largest increment that does not exceed availableAmount
  const suitableIncrement = [...MaterialGridValidIncrements]
    .reverse()
    .find((increment) => increment <= availableAmount);

  // Return the found increment, or the smallest increment if none are suitable
  return suitableIncrement || MaterialGridValidIncrements[0];
}
