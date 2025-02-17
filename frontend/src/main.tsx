import React from "react";
import { createRoot } from "react-dom/client";
import "./style.css";
import App from "./App";
import ReduxProvider from "./store/redux-provider";

const container = document.getElementById("root");

const root = createRoot(container!);

root.render(
  <React.StrictMode>
    <ReduxProvider>
      <App />
    </ReduxProvider>
  </React.StrictMode>
);
