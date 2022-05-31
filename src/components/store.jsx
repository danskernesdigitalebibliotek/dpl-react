import React from "react";
import PropTypes from "prop-types";
import { Provider } from "react-redux";
import { PersistGate } from "redux-persist/integration/react";
import { QueryClient, QueryClientProvider } from "react-query";
import { store, persistor } from "../core/store";

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      // We need to have some sort of client caching strategy.
      // This is for temporarily testing.
      // In this case cache needs be updated after 30 seconds:
      staleTime: 1000 * 30
    }
  }
});
const Store = ({ children }) => (
  <Provider store={store}>
    <QueryClientProvider client={queryClient}>
      <PersistGate persistor={persistor}>{children}</PersistGate>
    </QueryClientProvider>
  </Provider>
);

Store.propTypes = {
  children: PropTypes.node.isRequired
};

export default Store;
