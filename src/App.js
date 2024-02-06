import { BrowserRouter, Routes, Route } from "react-router-dom";
import React from "react";
import UseCases from "./pages/UseCases.jsx";
import Teams from "./pages/Teams.jsx";
import NoPage from "./pages/NoPage.jsx";
import "./styles/app.css";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route index element={<Teams />} />
        <Route path="/use-cases" element={<UseCases />}></Route>
        <Route path="*" element={<NoPage />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
