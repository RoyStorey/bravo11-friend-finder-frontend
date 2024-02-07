import Header from "../components/header.jsx";
import Footer from "../components/footer.jsx";
import "../styles/addTeam.css";
import React, { useState } from "react";
import axios from "axios";

async function postNewTeam(teamObject) {
  return axios
    .get(`http://localhost:3000/addTeam`, {
      params: { team_object: teamObject },
    })
    .then((response) => response.data)
    .catch((error) => console.error(error));
}

export default function AddTeam() {
  const [formData, setFormData] = useState({
    teamName: "",
    useCase: "",
    captainDiscordName: "",
    gitRepoUrl: "",
    location: "",
    preferredTimeToWork: "",
    classificationLevel: "CUI",
    preferredSkillsets: "",
  });

  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async () => {
    try {
      const response = await postNewTeam(formData);
      console.log(response); // Log the response or handle it as needed
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className="home">
      <Header />
      <div className="body">
        <div className="form-container">
          <div className="form">
            <label>Team Name</label>
            <input
              type="text"
              name="teamName"
              value={formData.teamName}
              onChange={handleChange}
            />

            <label>Use Case</label>
            <input
              type="text"
              name="useCase"
              value={formData.useCase}
              onChange={handleChange}
            />

            <label>Captain's Discord Name</label>
            <input
              type="text"
              name="captainDiscordName"
              value={formData.captainDiscordName}
              onChange={handleChange}
            />

            <label>Git Repo URL</label>
            <input
              type="text"
              name="gitRepoUrl"
              value={formData.gitRepoUrl}
              onChange={handleChange}
            />

            <label>Working Location</label>
            <input
              type="text"
              name="location"
              value={formData.location}
              onChange={handleChange}
            />

            <label>Preferred Time to Work</label>
            <input
              type="text"
              name="preferredTimeToWork"
              value={formData.preferredTimeToWork}
              onChange={handleChange}
            />

            <label>Required Classification Level</label>
            <select
              name="classificationLevel"
              value={formData.classificationLevel}
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
              onChange={handleChange}
            />

            <button onClick={handleSubmit}>Create Team</button>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
}
