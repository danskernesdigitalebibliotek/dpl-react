import { createElement } from "react";
import { render } from "react-dom";
import { withErrorBoundary } from "react-error-boundary";

import ErrorBoundary from "../components/alert/alert";
import { setToken } from "./token";
import Store from "../components/store";
import { persistor } from "./store";

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
    // Ensure that the application exists and that the container isn't already populated.
    const isValidMount = app && !container.innerHTML;
    if (isValidMount) {
      render(
        createElement(
          Store,
          {},
          createElement(
            withErrorBoundary(app, {
              FallbackComponent: ErrorBoundary,
              onError(error, info) {
                // Logging should be acceptable in an error handler.
                // eslint-disable-next-line no-console
                console.error(error, info);
              }
            }),
            {
              ...container.dataset
            }
          )
        ),
        container
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
