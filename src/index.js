import React from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App";
import { Provider } from "react-redux";
import { BrowserRouter } from "react-router-dom";
import { store } from "./Data/Store";
import { ErrorBoundary } from "react-error-boundary";
const container = document.getElementById("root");
const root = createRoot(container);
root.render(
  <BrowserRouter>
    <Provider store={store}>
      <ErrorBoundary
        fallback={
          <h1 className="dislay-1 text-center">
            gagal fetch data tolong restart
          </h1>
        }
      >
        <App />
      </ErrorBoundary>
    </Provider>
  </BrowserRouter>
);
