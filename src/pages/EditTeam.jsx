import Header from "../components/header.jsx";
import Footer from "../components/footer.jsx";
import "../styles/addTeam.css";
import React, { useState, useEffect } from "react";
import axios from "axios";
import Pitch from "../components/pitch-container.jsx";
import { useParams } from "react-router-dom";

export default function EditTeam() {
  let { teamId } = useParams();

  const [formData, setFormData] = useState({});
  const [oldFormData, setOldFormData] = useState({});
  async function getTeam(teamId) {
    return axios
      .get(`http://localhost:3000/getTeam/${teamId}`)
      .then((response) => response.data)
      .catch((error) => console.error(error));
  }
  useEffect(() => {
    getTeam(teamId)
      .then((data) => {
        setOldFormData(data[0]); // Update state with the received data
      })
      .catch((error) => {
        console.error("Error fetching team data:", error);
        // Handle error if necessary
      });
  }, []);
  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormData({ ...formData, [name]: value });
  };
  async function updateTeam(teamId, formData) {
    return axios
      .post(`http://localhost:3000/updateTeam`, { ...formData, id: teamId })
      .then((response) => response.data)
      .catch((error) => console.error(error));
  }
  const handleSubmit = async () => {
    try {
      console.log(formData, "form data");
      await updateTeam(teamId, formData);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <>
      <Pitch />
      <div className="home">
        <Header />
        <div className="body">
          <h1 className="form-header">Edit Team {formData.teamName}</h1>
          <div className="form-container">
            <div className="left-side-of-form">
              <div className="form">
                <label>Team Name</label>
                <input
                  type="text"
                  name="teamName"
                  value={formData.teamName}
                  onChange={handleChange}
                  placeholder={oldFormData.teamName}
                />

                <label>Use Case</label>
                <input
                  type="text"
                  name="useCase"
                  value={formData.useCase}
                  onChange={handleChange}
                  placeholder={oldFormData.useCase}
                />

                <label>Captain's Discord Name</label>
                <input
                  type="text"
                  name="captainDiscordName"
                  value={formData.captainDiscordName}
                  onChange={handleChange}
                  placeholder={oldFormData.captainDiscordName}
                />

                <label>Git Repo URL</label>
                <input
                  type="text"
                  name="gitRepoUrl"
                  value={formData.gitRepoUrl}
                  onChange={handleChange}
                  placeholder={oldFormData.gitRepoUrl}
                />

                <label>Working Location</label>
                <input
                  type="text"
                  name="location"
                  value={formData.location}
                  placeholder={oldFormData.location}
                  onChange={handleChange}
                />

                <label>Preferred Time to Work</label>
                <input
                  type="text"
                  name="preferredTimeToWork"
                  value={formData.preferredTimeToWork}
                  placeholder={oldFormData.preferredTimeToWork}
                  onChange={handleChange}
                />

                <label>Required Classification Level</label>
                <select
                  name="classificationLevel"
                  value={formData.classificationLevel}
                  placeholder={oldFormData.classificationLevel}
                  onChange={handleChange}
                >
                  <option value="CUI">CUI</option>
                  <option value="Secret">Secret</option>
                </select>

                <label>Preferred Skillsets</label>
                <input
                  type="text"
                  name="preferredSkillsets"
                  value={formData.preferredSkillsets}
                  placeholder={oldFormData.preferredSkillsets}
                  onChange={handleChange}
                />
                <button onClick={() => handleSubmit()}>Push Edits</button>
              </div>
            </div>
            <div className="right-side-of-form"></div>
          </div>
        </div>
        <Footer />
      </div>
    </>
  );
}
