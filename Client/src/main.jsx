import React from "react";
import ReactDOM from "react-dom/client";
import { MapaPage } from "./pages/MapaPage";
import { SocketProvider } from "./Context/SocketContext";
import "./index.css";

ReactDOM.createRoot(document.getElementById("root")).render(
  <SocketProvider>
    <MapaPage />
  </SocketProvider>
);
