import Header from "../components/header.jsx";
import Footer from "../components/footer.jsx";
import TeamsTable from "../components/teamsTable.jsx";
import Pitch from "../components/pitch-container.jsx";
import "../styles/sadBoyHours.css";
import React, { useState, useEffect } from "react";
import axios from "axios";
import SadUseCasesTable from "../components/sadUseCasesTable.jsx";
import SadTeamsTable from "../components/sadTeamsTable.jsx";

export default function SadBoyHours() {
  const [noTeamUseCaseData, setNoTeamUseCaseData] = useState([]);
  const [noUseCaseTeamData, setNoUseCaseTeamData] = useState([]);

  async function getNoTeamUseCaseData() {
    return axios
      .get(`http://localhost:3000/getNoTeamUseCase`)
      .then((response) => response.data)
      .catch((error) => console.error(error));
  }
  async function getNoUseCaseTeamsData() {
    return axios
      .get(`http://localhost:3000/getNoUseCaseTeam`)
      .then((response) => response.data)
      .catch((error) => console.error(error));
  }

  useEffect(() => {
    getNoTeamUseCaseData().then((data) => {
      setNoTeamUseCaseData(data);
    });
    getNoUseCaseTeamsData().then((data) => {
      setNoUseCaseTeamData(data);
    });
  }, []);

  return (
    <>
      <Pitch />
      <div className="home">
        <Header />
        <div className="body">
          <div className="tables-container">
            <div className="left-side">
              <h3>Use Cases With No Teams</h3>
              <SadUseCasesTable data={noTeamUseCaseData} />
            </div>
            <div className="right-side">
              <h3>Teams That Need Members</h3>
              <SadTeamsTable data={noUseCaseTeamData} />
            </div>
          </div>
        </div>
        <Footer />
      </div>
    </>
  );
}
