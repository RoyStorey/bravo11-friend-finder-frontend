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
  const [teamsData, setTeamsData] = useState([]);
  const [tasksData, setTasksData] = useState([]);

  let isTeamsDataPopulated = false;
  let isTasksDataPopulated = false;

  async function getTeamsData() {
    return axios
      .get(`http://localhost:3000/teams/`)
      .then((response) => response.data)
      .catch((error) => console.error(error));
  }
  async function getTasksData() {
    return axios
      .get(`http://localhost:3000/tasks/`)
      .then((response) => response.data)
      .catch((error) => console.error(error));
  }

  useEffect(() => {
    try{
    getTeamsData().then((data) => {
      setTeamsData(data);
      isTeamsDataPopulated = true;
    });
    }catch{
      console.log('No teams data.')
    }
  try{
    getTasksData().then((data) => {
      setTasksData(data);
      isTasksDataPopulated = true;
    });
    }catch{
      console.log("No tasks data.")
    }
  }, []);

  let teamsWithNoMembers = []
  let tasksWithNoTeams = []

  teamsData.forEach((team)=>{
    if(team.members.length == 0){
      teamsWithNoMembers.push(team)
    }
  })

  tasksData.forEach((task)=>{
    if(task.teams.length == 0){
      tasksWithNoTeams.push(task)
    }
  })

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
              <SadTasksTableConditional isTasksDataPopulated={isTasksDataPopulated} data={tasksWithNoTeams} />
            </div>
            <div className="right-side">
              <h3>Teams That Need Members</h3>
              <SadTeamsTableConditional isTeamsDataPopulated={isTeamsDataPopulated} data={teamsWithNoMembers} />
            </div>
          </div>
        </div>
        <Footer />
      </div>
    </>
  );
}
