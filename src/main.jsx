import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import TagsView from "./components/TagsView";
import "./index.css";
import { BrowserRouter, Route, Routes } from "react-router-dom";

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<App />} />
        <Route path="/tagsview" element={<TagsView />} />
      </Routes>
    </BrowserRouter>
  </React.StrictMode>
);
