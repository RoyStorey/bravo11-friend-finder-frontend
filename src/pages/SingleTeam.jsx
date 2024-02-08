import Header from "../components/header.jsx";
import Footer from "../components/footer.jsx";
import { useParams } from "react-router-dom";
import "../styles/singleTeam.css";
import React, { useState, useEffect } from "react";
import axios from "axios";
import Pitch from "../components/pitch-container.jsx";

export default function SingleTeam() {
  const [teamData, setTeamData] = useState({
    id: 0,
    teamName: "No Team Selected",
    useCase: "",
    members: [""],
    captainDiscordName: "",
    captainCodeOTP: "",
    gitRepoUrl: "",
    location: "",
    preferredTimeToWork: "",
    classificationLevel: "",
    preferredSkillsets: [""],
  });
  const [members, setMembers] = useState([]);

  let { teamId } = useParams(); //THIS IS CORRECT

  async function getTeam(teamId) {
    try {
      const response = await axios.get(
        `http://localhost:3000/getTeam/${teamId}`
      );
      return response.data;
    } catch (error) {
      console.error(error);
      throw error; // Rethrow the error to handle it in the component
    }
  }

  useEffect(() => {
    getTeam(teamId)
      .then((data) => {
        setTeamData(data[0]); // Update state with the received data
      })
      .catch((error) => {
        console.error("Error fetching team data:", error);
        // Handle error if necessary
      });
  }, []);
  //Correctly querying

  function handleTeamDelete(teamId, teamName) {
    let otpCheck = window.prompt("Enter your team PIN:");

    if (window.confirm("Are you sure you would like to delete this team?")) {
      try {
        axios.post("http://localhost:3000/removeTeam", {
          id: teamId,
          captainCode: otpCheck,
          teamName: teamName,
        });
      } catch (error) {
        console.error(error);
      }
    }
  }

  function handleMemberDelete(teamId, memberId) {
    let otpCheck = window.prompt("Enter your team PIN:");

    if (window.confirm("Are you sure you would like to delete this user?")) {
      try {
        axios.post("http://localhost:3000/removeMember", {
          teamId: teamId,
          memberId: memberId,
          captainCode: otpCheck,
        });
      } catch (error) {
        console.error(error);
      }
    }
  }

  function TeamMembersList({ teamId }) {
    const [teamMembers, setTeamMembers] = useState([]);

    useEffect(() => {
      async function fetchTeamMembers() {
        try {
          const response = await axios.get(
            `http://localhost:3000/getMembersByTeam/${teamId}`
          );
          setTeamMembers(response.data);
        } catch (error) {
          console.error(error);
        }
      }

      fetchTeamMembers();
    }, [teamId]);

    return (
      <div>
        <h2>Team Members</h2>
        <ul>
          {teamMembers.map((member, index) => (
            <li key={index}>{member.name}</li>
          ))}
        </ul>
      </div>
    );
  }

  return (
    <>
      <Pitch />
      <div className="home">
        <Header />
        <div className="body">
          <div className="single-team-container">
            <h1 className="team-name">{teamData.teamName}</h1>
            <h5>Team ID: {teamData.id}</h5>
            <p>
              <b>Use Case:</b> {teamData.useCase}
            </p>
            <p>
              <b>Number of Members: {teamData.members?.length ?? "0"}</b>
            </p>
            <p>
              <b>Captain's Discord Name: </b>
              {teamData.captainDiscordName}
            </p>
            <p>
              <b>Git Repo URL: </b>
              {teamData.gitRepoUrl}
            </p>
            <p>
              <b>Location: </b>
              {teamData.location}
            </p>
            <p>
              <b>Preferred Time to Work:</b> {teamData.preferredTimeToWork}
            </p>
            <p>
              <b>Preferred Skillsets:</b>{" "}
              {teamData.preferredSkillsets?.toString() ?? "0"}
            </p>
            <p>
              <b>Level of Classification:</b> {teamData.classificationLevel}
            </p>
            <TeamMembersList teamId={teamId} />
          </div>
          <button className="edit-team-button">
            <a href={`/edit-team/${teamId}`}>Edit Team</a>
          </button>
          <button className="edit-team-button">
            <a href={`/join-team/${teamId}`}>Join Team</a>
          </button>
          <button
            className="edit-team-button"
            onClick={() => {
              handleTeamDelete(teamId, teamData.teamName);
            }}
          >
            Delete Team
          </button>
        </div>
        <Footer />
      </div>
    </>
  );
}
