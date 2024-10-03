import React from "react";
import { createRoot } from "react-dom/client";
import WidgetComponent from "./WidgetComponent.tsx";

let root = null; // Declare a variable to store the root instance
let isWidgetInitialized = false;

const injectStyles = (callback) => {
  const stylesLoaded = new Set();
  const totalStyles = 2; // Number of stylesheets

  const checkAllStylesLoaded = () => {
    if (stylesLoaded.size === totalStyles && callback) {
      callback();
    }
  };

  // Inject animate.css
  if (!document.querySelector('link[href*="animate.min.css"]')) {
    const animateLink = document.createElement("link");
    animateLink.href =
      "https://cdnjs.cloudflare.com/ajax/libs/animate.css/4.1.1/animate.min.css";
    animateLink.rel = "stylesheet";
    animateLink.onload = () => {
      stylesLoaded.add("animate");
      checkAllStylesLoaded();
    };
    document.head.appendChild(animateLink);
  } else {
    stylesLoaded.add("animate");
  }

  // Inject Tailwind CSS
  if (
    !document.querySelector(`link[href*="${site_url}/css/tailwind.min.css"]`)
  ) {
    const tailwindLink = document.createElement("link");
    tailwindLink.href = `${site_url}/css/tailwind.min.css`;
    tailwindLink.rel = "stylesheet";
    tailwindLink.onload = () => {
      stylesLoaded.add("tailwind");
      checkAllStylesLoaded();
    };
    document.head.appendChild(tailwindLink);
  } else {
    stylesLoaded.add("tailwind");
  }

  checkAllStylesLoaded();
};

const initializeWidget = (isFirstMount = true) => {
  if (isWidgetInitialized) return;

  const container = document.getElementById("taplo-widget-container");

  if (!container) {
    if (isFirstMount) {
      console.error(
        'No Taplo widget container found (check to make sure id equals "taplo-widget-container").'
      );
    }
    return;
  }

  const project_id = container.getAttribute("data-project-id");

  if (!project_id) {
    console.error("No Taplo project_id found.");
    return;
  }

  console.log("Re-initializing Widget:", {
    siteUrl: site_url,
    projectId: project_id,
  });

  root = createRoot(container);
  root.render(<WidgetComponent siteUrl={site_url} projectId={project_id} />);

  isWidgetInitialized = true;
};

const unmountWidget = () => {
  if (isWidgetInitialized && root) {
    root.unmount(); // Unmount using the root's unmount method
    isWidgetInitialized = false;
  }
};

// Load styles and initialize the widget for the current page
injectStyles(initializeWidget);

// Listen to popstate events, which indicate back/forward navigation
window.addEventListener("popstate", () => {
  // Unmount the current widget before reinitializing
  unmountWidget();

  // Re-initialize the widget for the new page state
  injectStyles(initializeWidget(false));
});
