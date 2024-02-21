import Header from "../components/header.jsx";
import Footer from "../components/footer.jsx";
import TeamsTable from "../components/teamsTable.jsx";
import Pitch from "../components/pitch-container.jsx";
import "../styles/sadBoyHours.css";
import React, { useState, useEffect } from "react";
import axios from "axios";
import SadTasksTable from "../components/sadTasksTable.jsx";
import SadTeamsTable from "../components/sadTeamsTable.jsx";

export default function SadBoyHours() {
  const [noTeamUseCaseData, setNoTeamUseCaseData] = useState([]);
  const [noUseCaseTeamData, setNoUseCaseTeamData] = useState([]);

  let isTeamsDataPopulated = false;
  let isTasksDataPopulated = false;

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
    try{
    getNoTeamUseCaseData().then((data) => {
      setNoTeamUseCaseData(data);
      isTasksDataPopulated = true;
    });
    }catch{
      console.log('No tasks that are unassigned.')
    }
  try{
    getNoUseCaseTeamsData().then((data) => {
      setNoUseCaseTeamData(data);
      isTeamsDataPopulated = true;
    });
    }catch{
      console.log("No teams that need members.")
    }
  }, []);

  function SadTeamsTableConditional({data,isTeamsDataPopulated}){
    if(isTeamsDataPopulated){
      return <SadTeamsTable data={data} />
    }
    return <h5>No team data found...</h5>
  }

  function SadTasksTableConditional({data,isTasksDataPopulated}){
    if(isTasksDataPopulated){
      return <SadTasksTable data={data} />
    }
    return <h5>No team data found...</h5>
  }

  return (
    <>
      <Pitch />
      <div className="home">
        <Header />
        <div className="body">
          <div className="tables-container">
            <div className="left-side">
              <h3>Tasks With No Teams</h3>
              <SadTasksTableConditional isTasksDataPopulated={isTasksDataPopulated} data={noTeamUseCaseData} />
            </div>
            <div className="right-side">
              <h3>Teams That Need Members</h3>
              <SadTeamsTableConditional isTeamsDataPopulated={isTeamsDataPopulated} data={noUseCaseTeamData} />
            </div>
          </div>
        </div>
        <Footer />
      </div>
    </>
  );
}
