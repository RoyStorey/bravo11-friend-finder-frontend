import { BrowserRouter, Routes, Route } from "react-router-dom";
import React from "react";
import UseCases from "./pages/UseCases.jsx";
import Teams from "./pages/Teams.jsx";
import SingleTeam from "./pages/SingleTeam.jsx";
import NoPage from "./pages/NoPage.jsx";
import "./styles/app.css";
import AddTeam from "./pages/AddTeam.jsx";
import AddUseCase from "./pages/AddUseCase.jsx";
import SingleUseCase from "./pages/SingleUseCase.jsx";
import EditTeam from "./pages/EditTeam.jsx";
import JoinTeam from "./pages/JoinTeam.jsx";
import EditUseCase from "./pages/EditUseCase.jsx";

function addMemberToTeam(memberData, teamId) {}

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
        <Route
          path="/edit-team/:teamId"
          element={<EditTeam teamId=":teamId" />}
        />
        <Route
          path="/edit-use-case/:useCaseId"
          element={<EditUseCase useCaseId=":useCaseId" />}
        />
        <Route
          path="/single-use-case/:useCaseId"
          element={<SingleUseCase useCaseId=":useCaseId" />}
        />
        <Route
          path="/join-team/:teamId"
          element={<JoinTeam teamId=":teamId" />}
        />
        <Route path="*" element={<NoPage />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
