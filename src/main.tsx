import "./index.css";
import "./App.css";
import "react-toastify/dist/ReactToastify.css";

import { StrictMode } from "react";
import ReactDOM from "react-dom/client";
import { createHashHistory, createRouter, RouterProvider } from '@tanstack/react-router'


// Import the generated route tree
import { routeTree } from "./routeTree.gen";

// Create a new router instance
const history = createHashHistory();

const router = createRouter({ routeTree, history });

// Register the router instance for type safety
declare module "@tanstack/react-router" {
  interface Register {
    router: typeof router;
  }
}

// Render the app
// eslint-disable-next-line @typescript-eslint/no-non-null-assertion
const rootElement = document.getElementById("root")!;
if (!rootElement.innerHTML) {
  const root = ReactDOM.createRoot(rootElement);
  root.render(
    <StrictMode>
      <RouterProvider router={router} />
    </StrictMode>
  );
}
