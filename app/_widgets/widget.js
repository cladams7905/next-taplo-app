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

// Wait for the DOM to be fully loaded before executing the script
document.addEventListener("DOMContentLoaded", function () {
  injectStyles(); // Inject necessary stylesheets

  // Dynamically create the container if it doesn't already exist
  let container = document.createElement("div");
  container.id = "taplo-widget-container";

  // Setting the API URL attribute
  const apiUrl = "https://your-api-url.com/notifications";
  container.setAttribute("data-api-url", apiUrl); // Set apiUrl attribute

  document.body.appendChild(container); // Append the container to the body

  // Render the React component once the container is in the DOM
  const root = createRoot(container);
  root.render(<WidgetComponent apiUrl={apiUrl} />); // Passing apiUrl correctly
});
