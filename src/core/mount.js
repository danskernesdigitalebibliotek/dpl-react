import { createRoot } from "react-dom/client";
import { createElement } from "react";
import { withErrorBoundary } from "react-error-boundary";
import { setToken } from "./token";
import Store from "../components/store";
import { persistor, store } from "./store";
import ErrorBoundaryAlert from "../components/error-boundary-alert/ErrorBoundaryAlert";
import { closeLastModal } from "./modal.slice";
import forwardError from "./utils/forwardError";

/**
 * We look for containers and corresponding applications.
 * Thereafter we mount them if a corresponding container and application can be found.
 *
 * @param {HTMLElement} context - The HTML element you want to search for app containers in.
 */
function mount(context) {
  if (!context) return;
  const appContainers = context.querySelectorAll("[data-dpl-app]");

  function mountApp(container) {
    const appName = container?.dataset?.dplApp;
    const app = window.dplReact?.apps?.[appName];
    // Ensure that the application exists.
    const isValidMount = app;
    if (isValidMount) {
      const root = createRoot(container);

      // After the update, ensure that prefixes (identifierPrefix) are specified for all apps.
      // This will guarantee unique IDs everywhere useID() is utilized.
      root.render(
        createElement(
          Store,
          {},
          createElement(
            withErrorBoundary(app, {
              FallbackComponent: ErrorBoundaryAlert,
              onError(error, info) {
                // Logging should be acceptable in an error handler.
                // eslint-disable-next-line no-console
                console.error(error, info);
                forwardError(error, info);
              }
            }),
            {
              ...container.dataset
            }
          )
        )
      );
    }
  }

  appContainers.forEach((app) => setTimeout(() => mountApp(app), 0));
}

/**
 * If you want to remove all dpl apps in a certain context.
 *
 * @param {HTMLElement} context - The HTML element you want to search for app containers in.
 */
function unmount(context) {
  if (!context) return;
  const appContainers = context.querySelectorAll("[data-dpl-app]");

  function unMountApp(container) {
    const appContainerToUnmount = container;
    appContainerToUnmount.innerHTML = "";
  }
  appContainers.forEach(unMountApp);
}

/**
 * Resets any stored state of all components.
 *
 * @returns {Promise<any>}
 */
function reset() {
  return persistor.purge();
}

function init() {
  // We only want to close the single last modal when the user hits escape.
  // Consequently we only want a single event listener. We cannot guarantee this
  // on the app (or component) level as a page may contain multiple apps.
  // init provides a single entry point for loading all apps and is suitable for our
  // purpose.
  document.addEventListener("keydown", (e) => {
    if (e.key === "Escape") {
      store.dispatch(closeLastModal());
    }
  });

  const initial = {
    apps: {},
    setToken,
    mount,
    unmount,
    reset
  };
  window.dplReact = {
    ...(window.dplReact || {}),
    ...initial
  };
}

// Inject into the global namespace for third party access.
init();
