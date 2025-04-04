import React from "react";
import { Provider } from "react-redux";
import { PersistGate } from "redux-persist/integration/react";
import { QueryClient, QueryClientProvider } from "react-query";
import { store, persistor } from "../core/store";
import FetcherHttpError from "../core/fetchers/FetcherHttpError";
import FetcherError from "../core/fetchers/FetcherError";
import FetcherCriticalHttpError from "../core/fetchers/FetcherCriticalHttpError";
import InvalidUrlError from "../core/errors/InvalidUrlError";

const queryErrorHandler = (error: unknown) => {
  // If we get an error that controls the error boundary make sure it does just that.
  if (
    error instanceof FetcherHttpError ||
    error instanceof FetcherCriticalHttpError ||
    error instanceof FetcherError ||
    error instanceof InvalidUrlError
  ) {
    return error.useErrorBoundary;
  }

  // Default is showing the error boundary for all other errors.
  return true;
};

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      // We need to have some sort of client caching strategy.
      // This is for temporarily testing.
      // In this case cache needs be updated after 2 minutes:
      staleTime: 1000 * 120,
      useErrorBoundary: queryErrorHandler
    },
    mutations: {
      useErrorBoundary: queryErrorHandler
    }
  }
});

interface StoreProps {
  children: React.ReactNode;
}

function Store({ children }: StoreProps) {
  return (
    <Provider store={store}>
      <QueryClientProvider client={queryClient}>
        <PersistGate persistor={persistor}>{children}</PersistGate>
      </QueryClientProvider>
    </Provider>
  );
}

export default Store;
