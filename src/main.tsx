import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.tsx";
import { RecoilRoot } from "recoil";

import "./index.css";

const _ROOT = ReactDOM.createRoot(
  document.getElementById("root") as HTMLElement
);

_ROOT.render(
  <RecoilRoot>
    <React.StrictMode>
      <App />
    </React.StrictMode>
  </RecoilRoot>
);
