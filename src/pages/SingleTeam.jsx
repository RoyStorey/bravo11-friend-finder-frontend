import Header from "../components/header.jsx";
import Footer from "../components/footer.jsx";
import { useParams } from "react-router-dom";
import "../styles/singleTeam.css";
import React, { useState, useEffect } from "react";
import axios from "axios";
import Pitch from "../components/pitch-container.jsx";

const data = [
  {
    id: 1,
    teamName: "Team Alpha",
    useCase: "Data Analytics for Financial Services",
    members: ["User1", "User2", "User3"],
    captainDiscordName: "CaptainAlpha",
    captainCodeOTP: "123456",
    gitRepoUrl: "https://github.com/teamalpha",
    location: "Remote",
    preferredTimeToWork: "9:00 AM - 5:00 PM",
    classificationLevel: "Confidential",
    preferredSkillsets: ["Data Analyst", "Web Developer"],
  },
  {
    id: 2,
    teamName: "Team Bravo",
    useCase: "AI-driven Customer Support",
    members: ["User4", "User5", "User6"],
    captainDiscordName: "CaptainBravo",
    captainCodeOTP: "789012",
    gitRepoUrl: "https://github.com/teambravo",
    location: "Office",
    preferredTimeToWork: "10:00 AM - 6:00 PM",
    classificationLevel: "Secret",
    preferredSkillsets: ["AI Engineer", "Customer Support Specialist"],
  },
];

export default function SingleTeam() {
  // const [teamData, setTeamData] = useState([]);
  // let { teamId } = useParams();

  // async function getTeam(teamId) {
  //   return axios
  //     .get(`http://localhost:3000/getTeam`, { params: { id: teamId } })
  //     .then((response) => response.data)
  //     .catch((error) => console.error(error));
  // }

  // useEffect(() => {
  //   getTeam().then((data) => {
  //     setTeamData(data);
  //     console.log(data);
  //   });
  // }, []);

  return (
    <>
      <Pitch />
      <div className="home">
        <Header />
        <div className="body">
          <div className="single-team-container">
            <h1 className="team-name">{data[0].teamName}</h1>
            <h5>Team ID: {data[0].id}</h5>
            <p>
              <b>Use Case:</b> {data[0].useCase}
            </p>
            <p>
              <b>Number of Members: {data[0].members.length}</b>
            </p>
            <p>
              <b>Captain's Discord Name: </b>
              {data[0].captainDiscordName}
            </p>
            <p>
              <b>Git Repo URL: </b>
              {data[0].gitRepoUrl}
            </p>
            <p>
              <b>Location: </b>
              {data[0].location}
            </p>
            <p>
              <b>Preferred Time to Work:</b> {data[0].preferredTimeToWork}
            </p>
            <p>
              <b>Preferred Skillsets:</b>{" "}
              {data[0].preferredSkillsets.toString()}
            </p>
            <p>
              <b>Level of Classification:</b> {data[0].classificationLevel}
            </p>
          </div>
        </div>
        <Footer />
      </div>
    </>
  );
}
