import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.tsx";
import { ApiProvider } from "@reduxjs/toolkit/query/react";
import { Api } from "./api/apiSlice.ts";
import { App as AntdApp } from "antd";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <ApiProvider api={Api}>
      <AntdApp>
        <App />
      </AntdApp>
    </ApiProvider>
  </StrictMode>
);
