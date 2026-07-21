import React from "react";
import { createRoot } from "react-dom/client";
import "../app/globals.css";
import { StarfallProfile } from "../app/starfall-profile";

declare global {
  var __STARFALL_BASE__: string | undefined;
}

globalThis.__STARFALL_BASE__ = import.meta.env.BASE_URL;

createRoot(document.getElementById("root")!).render(
  <React.StrictMode><StarfallProfile /></React.StrictMode>,
);
