import Header from "../components/header.jsx";
import Footer from "../components/footer.jsx";
import "../styles/joinTeam.css";
import React, { useState, useEffect } from "react";
import axios from "axios";
import Pitch from "../components/pitch-container.jsx";
import { useParams } from "react-router-dom";

export default function JoinTeam() {
  let { teamId } = useParams();

  const [teamData, setTeamData] = useState({});
  const [userData, setUserData] = useState({});

  async function getTeam(teamId) {
    return axios
      .get(`http://localhost:3000/getTeam/${teamId}`)
      .then((response) => response.data)
      .catch((error) => console.error(error));
  }
  useEffect(() => {
    getTeam(teamId)
      .then((data) => {
        setTeamData(data[0]);
      })
      .catch((error) => {
        console.error("Error fetching team data:", error);
      });
  }, []);

  const handleChange = (event) => {
    const { name, value } = event.target;
    setUserData({ ...userData, [name]: value });
  };

  async function addUserToTeam(data, teamid) {
    return axios
      .post(`http://localhost:3000/addMemberTeam`, {
        ...data,
        teamId: teamid,
      })
      .then((response) => response.data)
      .catch((error) => console.error(error));
  }

  async function handleSubmit() {
    try {
      console.log(userData, teamId);
      await addUserToTeam(userData, teamId);
    } catch (error) {
      console.error(error);
    }
  }

  return (
    <>
      <Pitch />
      <div className="home">
        <Header />
        <div className="body">
          <h1 className="form-header">Join Team {teamData.teamName}</h1>
          <div className="form-container">
            <div className="form">
              <div className="left-side-of-form">
                <label>Name</label>
                <input
                  onChange={handleChange}
                  name="name"
                  value={userData.name}
                />
                <label>Discord Name</label>
                <input
                  onChange={handleChange}
                  name="discordName"
                  value={userData.discordName}
                />
                <label>Skillsets (comma delimited)</label>
                <input
                  onChange={handleChange}
                  name="skillsets"
                  value={userData.skillsets}
                />

                <button
                  onClick={() => {
                    handleSubmit();
                  }}
                >
                  Join Team
                </button>
              </div>
            </div>
          </div>
        </div>
        <Footer />
      </div>
    </>
  );
}