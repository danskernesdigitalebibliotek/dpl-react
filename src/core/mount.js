import { createElement } from "react";
import { render } from "react-dom";

import { withErrorBoundary } from "react-error-boundary";
import ErrorBoundary from "../components/error/error";

/**
 * This is where we actually mount the application into the DOM elements.
 * If DOM elements exists with corresponding data-ddb-app attribute values
 * to the appName of the application we will mount it in all the places.
 * We also want to expose the rest of the data attributes to the react application.
 *
 * @param {object} options
 * @param {string} options.appName - Name of the application. This has to be the same in the DOM as well as in your .mount.js file.
 * @param {ReactNode} options.app - The React app/component that should be the start point of your application. This should be your applications .entry.js.
 */
function mount({ appName, app }) {
  const appContainers = document.querySelectorAll(
    `[data-ddb-app="${appName}"]`
  );
  appContainers.forEach(function mountApp(container) {
    render(
      createElement(withErrorBoundary(app, ErrorBoundary), {
        ...container.dataset
      }),
      container
    );
  });
}

export default mount;
