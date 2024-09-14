// widget.js
import React from "react";
import { createRoot } from "react-dom/client";
import WidgetComponent from "./WidgetComponent";

const injectStyles = () => {
  // Inject Tailwind CSS
  const tailwindLink = document.createElement("link");
  tailwindLink.href =
    "https://cdn.jsdelivr.net/npm/tailwindcss@2.2.19/dist/tailwind.min.css";
  tailwindLink.rel = "stylesheet";
  document.head.appendChild(tailwindLink);

  // Inject animate.css
  const animateLink = document.createElement("link");
  animateLink.href =
    "https://cdnjs.cloudflare.com/ajax/libs/animate.css/4.1.1/animate.min.css";
  animateLink.rel = "stylesheet";
  document.head.appendChild(animateLink);
};

(function () {
  injectStyles(); // Inject necessary stylesheets
  const container = document.getElementById("taplo-widget-container");
  if (!container) {
    console.error(`Container with ID 'taplo-widget-container' not found.`);
    return;
  }

  const apiUrl = target.getAttribute("data-api-url");
  if (!apiUrl) {
    console.error("Taplo api url not found.");
    return;
  }

  const root = createRoot(container);
  root.render(<WidgetComponent apiUrl={apiUrl} />);
})();
