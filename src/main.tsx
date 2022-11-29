import { PersistQueryClientProvider } from '@tanstack/react-query-persist-client'
import { QueryClient } from '@tanstack/react-query'
import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import "./index.css";
import { createIDBPersister } from './utils';

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      cacheTime: 1000 * 60 * 60 * 24, // 24 hours
    },
  },
});

// check if service worker is supported

if ("serviceWorker" in navigator) {
  navigator.serviceWorker
    .register("service-worker.js")
    .then((serviceWorker) => {
      console.log("Service worker registered successfully");
    })
    .catch(() => {
      console.error("service worker registration failed");
    });
} else {
  console.log("Your browser does not support service worker");
}

const persister = createIDBPersister()

ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
  <React.StrictMode>
    <PersistQueryClientProvider client={queryClient} persistOptions={{
      persister,
    }} >
      <App />
    </PersistQueryClientProvider>
  </React.StrictMode>
);
