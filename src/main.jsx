import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import TagsView from "./components/TagsView";
import ItemCompose from "./components/itemCompose";
import "./index.css";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { ItemsProvider } from "./context/ItemsContext.jsx";
import { HomeProvider } from "./context/HomeContext.jsx";

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <ItemsProvider>
      <HomeProvider>
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<App />} />
            <Route path="/tagsview" element={<TagsView />} />
            <Route path="/itemCompose" element={<ItemCompose />} />
          </Routes>
        </BrowserRouter>
      </HomeProvider>
    </ItemsProvider>
  </React.StrictMode>
);
