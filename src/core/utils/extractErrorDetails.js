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
      // Extract filename, lineNumber, and column from a string formatted like "filename:line:column"
      const parts = line.match(/(?:\()?(.*?):(\d+):(\d+)(?:\))?/);
      if (parts) {
        const [, filename, lineNumber, column] = parts;
        return {
          filename,
          lineNumber,
          column
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
