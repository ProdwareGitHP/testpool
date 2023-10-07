import { CssBaseline } from "@mui/material";
import React from "react";
import { render } from "react-dom";
import { QueryClientProvider } from "react-query";
import { ReactQueryDevtools } from "react-query/devtools";
import { ThemeProvider } from "@mui/material/styles";
import { Provider } from "react-redux";
import { persistStore } from "redux-persist";
import { PersistGate } from "redux-persist/integration/react";
import { store } from "./redux/store";
import evoTheme from "./theme";
import queryClient from "./query";
import App from "./App";
import EvoErrorBoundary from "./components/EvoErrorBoundary";

const root = document.getElementById("root");

render(
  <EvoErrorBoundary>
    <QueryClientProvider client={queryClient}>
      <Provider store={store}>
        <PersistGate loading={null} persistor={persistStore(store)}>
          <ThemeProvider theme={evoTheme}>
            <CssBaseline />
            <App />
          </ThemeProvider>
        </PersistGate>
      </Provider>
      <ReactQueryDevtools initialIsOpen={false} />
    </QueryClientProvider>
  </EvoErrorBoundary>,
  root
);
