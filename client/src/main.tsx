import { createRoot } from "react-dom/client";
import { useEffect } from "react";
import App from "./App";
import "./index.css";

// Update document title based on route
function updateDocumentMeta() {
  // Default page title
  document.title = "Latina Empire | Empowering Latina Professionals";
  
  // Set meta description
  let metaDescription = document.querySelector('meta[name="description"]');
  if (!metaDescription) {
    metaDescription = document.createElement('meta');
    metaDescription.setAttribute('name', 'description');
    document.head.appendChild(metaDescription);
  }
  metaDescription.setAttribute('content', 'Latina Empire builds a community where Latina professionals get the resources, mentorship, and connection they need to reach their highest potential.');
  
  // Set theme color for browser interfaces
  let themeColor = document.querySelector('meta[name="theme-color"]');
  if (!themeColor) {
    themeColor = document.createElement('meta');
    themeColor.setAttribute('name', 'theme-color');
    document.head.appendChild(themeColor);
  }
  themeColor.setAttribute('content', '#D81B60'); // Magenta theme color
}

// Call function on initial load
updateDocumentMeta();

createRoot(document.getElementById("root")!).render(<App />);
