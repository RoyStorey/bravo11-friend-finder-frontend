import { BrowserRouter, Routes, Route } from "react-router-dom";
import React from "react";
import UseCases from "./pages/UseCases.jsx";
import Teams from "./pages/Teams.jsx";
import SingleTeam from "./pages/SingleTeam.jsx";
import NoPage from "./pages/NoPage.jsx";
import "./styles/app.css";
import AddTeam from "./pages/AddTeam.jsx";
import AddUseCase from "./pages/AddUseCase.jsx";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route index element={<Teams />} />
        <Route path="/use-cases" element={<UseCases />}></Route>
        <Route path="/add-team" element={<AddTeam />}></Route>
        <Route path="/add-use-case" element={<AddUseCase />}></Route>
        <Route
          path="/single-team/:teamId"
          element={<SingleTeam teamId=":teamId" />}
        />
        <Route path="*" element={<NoPage />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
