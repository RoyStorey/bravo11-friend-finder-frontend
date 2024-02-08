import Header from "../components/header.jsx";
import Footer from "../components/footer.jsx";
import "../styles/addTeam.css";
import React, { useState } from "react";
import axios from "axios";
import Pitch from "../components/pitch-container.jsx";

async function postNewTeam(teamObject) {
  return axios
    .post(`http://localhost:3000/addTeam`, teamObject)
    .then((response) => response.data)
    .catch((error) => console.error(error));
}

const OTP = makeid(6); // Generate the ID once

function makeid(length) {
  let result = "";
  const characters =
    "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
  const charactersLength = characters.length;
  for (let i = 0; i < length; i++) {
    result += characters.charAt(Math.floor(Math.random() * charactersLength));
  }
  return result;
}

export default function AddTeam() {
  const [formData, setFormData] = useState({
    teamName: "",
    useCase: "",
    captainName: "",
    captainSkillset: "",
    captainDiscordName: "",
    captainCode: OTP,
    gitRepoUrl: "",
    location: "",
    preferredTimeToWork: "",
    classificationLevel: "CUI",
    preferredSkillsets: "",
    image: "",
  });

  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async () => {
    try {
      console.log(formData, "form data");
      await postNewTeam(formData);
      window.alert(
        `Team successfully created! Your Captain PIN is "${OTP}". Write this down! If you want to make any changes in the future, it will ask for your PIN.`
      );
      window.location.href = "/";
    } catch (error) {
      console.error("Error creating team:", error);
      window.alert("Failed to create team. Please try again.");
    }
  };
  const UploadImage = () => {
    const [selectedFile, setSelectedFile] = useState(null);

    const handleFileChange = (event) => {
      const file = event.target.files[0];
      setSelectedFile(file);
    };

    const handleUpload = async () => {
      if (selectedFile) {
        try {
          const picFormData = new FormData();
          picFormData.append("image", selectedFile);

          setFormData({ ...formData, image: picFormData });

          // Handle the response as needed
          console.log("Upload successful:");
        } catch (error) {
          console.error("Error uploading image:", error);
        }
      } else {
        console.warn("No file selected.");
      }
    };

    return (
      <div>
        <input
          type="file"
          accept=".png,.jpg,.jpeg"
          onChange={handleFileChange}
        />
        <button onClick={handleUpload}>Upload</button>
      </div>
    );
  };

  return (
    <>
      <Pitch />
      <div className="home">
        <Header />
        <div className="body">
          <h1 className="form-header">Add Team</h1>
          <div className="form-container">
            <div className="left-side-of-form">
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
                <h2>Captain Information</h2>
                <label>Captain's Name</label>
                <input
                  type="text"
                  name="captainName"
                  value={formData.captainName}
                  onChange={handleChange}
                />
                <label>Captain's Discord Name</label>
                <input
                  type="text"
                  name="captainDiscordName"
                  value={formData.captainDiscordName}
                  onChange={handleChange}
                />
                <label>Captain's Skillset (comma delimited)</label>
                <input
                  type="text"
                  name="captainSkillset"
                  value={formData.captainSkillset}
                  onChange={handleChange}
                />

                <button onClick={handleSubmit}>Create Team</button>
              </div>
            </div>
            <div className="right-side-of-form">
              <UploadImage />
            </div>
          </div>
        </div>
        <Footer />
      </div>
    </>
  );
}
