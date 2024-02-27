export type ValidSelectedIncrements = 4 | 8 | 12 | 16 | 20 | 24 | 28 | 32;

export const MaterialGridValidIncrements: ValidSelectedIncrements[] = [
  4, 8, 12, 16, 20, 24, 28, 32
];

export function calculateAmountToDisplay(
  fetchedCount: number,
  selectedAmount: ValidSelectedIncrements
): ValidSelectedIncrements {
  if (fetchedCount >= selectedAmount) {
    return selectedAmount;
  }

  const suitableIncrement = MaterialGridValidIncrements.reverse().find(
    (increment) => increment <= fetchedCount
  );

  return suitableIncrement || MaterialGridValidIncrements[0];
}
