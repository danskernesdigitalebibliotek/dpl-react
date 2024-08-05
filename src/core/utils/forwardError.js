import extractErrorDetails from "./extractErrorDetails";

/**
 * Forwards an error to the window.onerror handler.
 *
 * @param {Error} error - The error object.
 * @param {Object} info - Additional info, including component stack trace.
 */
const forwardError = (error, info) => {
  const { filename, lineNumber, column } = extractErrorDetails(
    info.componentStack
  );

  // Call window.onerror to send the error to the error logging system.
  if (window.onerror) {
    window.onerror(
      `${error.name}: ${error.message}`,
      filename,
      lineNumber,
      column,
      {
        ...info,
        stack: info.componentStack
      }
    );
  }
};

export default forwardError;
