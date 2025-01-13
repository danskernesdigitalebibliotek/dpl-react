// Exhaustive Type Checking in TypeScript
// Inspired by https://stackoverflow.com/a/39419171
//
// enum Color {
//   Red = "r",
//   Green = "g"",
//   Blue = "b"
// }
//
// // Example:
// const getColorName = (c: Color) => {
//   switch (c) {
//     case Color.Red:
//       return "red";
//     case Color.Green:
//       return "green";
//     default:
//       return invalidSwitchCase<string>(c);
//   }
// };
// Error: Argument of type 'Color' is not assignable to parameter of type 'never'.ts(2345)
// (parameter) c: Color.Blue
//
// Usage:
// const color = "b";
// const name = getColorName(color as Color);

// This function is used to check if all the cases are covered in a switch statement
function invalidSwitchCase<T>(x: never): T {
  console.error(`Invalid case for ${x}`);
  return x;
}

export default invalidSwitchCase;
