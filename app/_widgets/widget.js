import React from "react";
import { createRoot } from "react-dom/client";
import WidgetDynamicWrapper from "./WidgetDynamicWrapper.tsx";

const injectStyles = (callback) => {
  const stylesLoaded = [];
  const totalStyles = 2; // Number of stylesheets

  const checkAllStylesLoaded = () => {
    if (stylesLoaded.length === totalStyles) {
      if (callback) callback();
    }
  };

  // Inject animate.css
  const animateLink = document.createElement("link");
  animateLink.href =
    "https://cdnjs.cloudflare.com/ajax/libs/animate.css/4.1.1/animate.min.css";
  animateLink.rel = "stylesheet";
  animateLink.onload = () => {
    stylesLoaded.push("animate");
    checkAllStylesLoaded();
  };
  document.head.appendChild(animateLink);

  // Inject Tailwind CSS
  const tailwindLink = document.createElement("link");
  tailwindLink.href = `${site_url}/css/tailwind.min.css`;
  tailwindLink.rel = "stylesheet";
  tailwindLink.onload = () => {
    stylesLoaded.push("tailwind");
    checkAllStylesLoaded();
  };
  document.head.appendChild(tailwindLink);
};

const initializeWidget = () => {
  const container = document.getElementById("taplo-widget-container");

  if (!container) {
    console.error(
      'No Taplo widget container found (check to make sure id equals "taplo-widget-container").'
    );
    return;
  }

  const project_id = container.getAttribute("data-project-id");

  if (!project_id) {
    console.error("No Taplo project_id found.");
    return;
  }

  console.log("Initializing Widget:", {
    siteUrl: site_url,
    projectId: project_id,
  });

  createRoot(container).render(
    <WidgetDynamicWrapper siteUrl={site_url} projectId={project_id} />
  );
};

document.addEventListener("DOMContentLoaded", () => {
  injectStyles(() => {
    initializeWidget();
  });
});
