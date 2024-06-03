/**
 * Extracts error details from a stack trace.
 *
 * @param {string} stack - The stack trace.
 * @returns {Object} An object containing filename, lineNumber, and column.
 */
const extractErrorDetails = (stack) => {
  const stackLines = (stack || "").split("\n");
  const match = stackLines
    .map((line) => {
      const parts = line.match(/(?:\()?(.*?):(\d+):(\d+)(?:\))?/);
      if (parts) {
        return {
          filename: parts[1],
          lineNumber: parts[2],
          column: parts[3]
        };
      }
      return null;
    })
    .find((m) => m);
  return (
    match || {
      filename: "unknown",
      lineNumber: "0",
      column: "0"
    }
  );
};

export default extractErrorDetails;
