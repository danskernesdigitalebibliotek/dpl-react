import type { Preview } from "@storybook/react-webpack5";
import "../src/components/components.scss";
import "@danskernesdigitalebibliotek/dpl-design-system/build/css/base.css";
import { setToken, TOKEN_LIBRARY_KEY, TOKEN_USER_KEY } from "../src/core/token";
import "../src/core/mount";
import React from "react";
import { withErrorBoundary } from "react-error-boundary";
import ErrorBoundaryAlert from "../src/components/error-boundary-alert/ErrorBoundaryAlert";
import Store from "../src/components/store";


const getSessionStorage = (type) => window.sessionStorage.getItem(type);
const userToken =
  process.env.STORYBOOK_USER_TOKEN ?? getSessionStorage(TOKEN_USER_KEY);
const libraryToken =
  process.env.STORYBOOK_LIBRARY_TOKEN ?? getSessionStorage(TOKEN_LIBRARY_KEY);

if (userToken) {
  setToken(TOKEN_USER_KEY, userToken);
}

// If the library token has been set manually in the input field in library token story
// it has been added to session storage and we make sure to set it via setToken()
// so it is accessible by components that depend on it.
if (libraryToken) {
  setToken(TOKEN_LIBRARY_KEY, libraryToken);
}

// If we have not set the library token manually we use the user token
// because it at least provide the same access as a library token.
if (!libraryToken && userToken) {
  setToken(TOKEN_LIBRARY_KEY, userToken);
}

const WrappedStory = (app) =>
  withErrorBoundary(app, {
    FallbackComponent: ErrorBoundaryAlert,
    onError(error, info) {
      // Logging should be acceptable in an error handler.
      // eslint-disable-next-line no-console
      console.error(error, info);
    }
  });

function App({ story }) {
  return (
    <Store>
      <>{story}</>
    </Store>
  );
}

const preview: Preview = {
  parameters: {
    layout: "fullscreen",
    controls: {
      expanded: true
    }
  },
  decorators: [
    (Story) => (
      <>
        <App story={Story()} />
      </>
    )
  ]
};

export default preview;
