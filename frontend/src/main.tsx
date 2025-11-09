import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.tsx";

import { initializeApp } from "firebase/app";

const firebaseConfig = {
  apiKey: "AIzaSyA7PPW2-14uAFzGpx2qOUHXtxr4pQOkbPs",
  authDomain: "mern-stories-2ddc9.firebaseapp.com",
  projectId: "mern-stories-2ddc9",
  storageBucket: "mern-stories-2ddc9.firebasestorage.app",
  messagingSenderId: "553061112735",
  appId: "1:553061112735:web:ef46aa349e1c70bd593baa",
};

initializeApp(firebaseConfig);

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <App />
  </StrictMode>
);
