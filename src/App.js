import { BrowserRouter, Routes, Route } from "react-router-dom";
import React from "react";
import Tasks from "./pages/Tasks.jsx";
import Teams from "./pages/Teams.jsx";
import SingleTeam from "./pages/SingleTeam.jsx";
import NoPage from "./pages/NoPage.jsx";
import "./styles/app.css";
import AddTeam from "./pages/AddTeam.jsx";
import AddTask from "./pages/AddTask.jsx";
import SingleTask from "./pages/SingleTask.jsx";
import EditTeam from "./pages/EditTeam.jsx";
import JoinTeam from "./pages/JoinTeam.jsx";
import EditTask from "./pages/EditTask.jsx";
import SadBoyHours from "./pages/SadBoyHours.jsx";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route index element={<Teams />} />
        <Route path="/tasks" element={<Tasks />}></Route>
        <Route path="/add-team" element={<AddTeam />}></Route>
        <Route path="/add-task" element={<AddTask />}></Route>
        <Route path="/sad-boy-hours" element={<SadBoyHours />}></Route>
        <Route
          path="/single-team/:teamId"
          element={<SingleTeam teamId=":teamId" />}
        />
        <Route
          path="/edit-team/:teamId"
          element={<EditTeam teamId=":teamId" />}
        />
        <Route
          path="/edit-task/:taskId"
          element={<EditTask taskId=":taskId" />}
        />
        <Route
          path="/single-task/:taskId"
          element={<SingleTask taskId=":taskId" />}
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
