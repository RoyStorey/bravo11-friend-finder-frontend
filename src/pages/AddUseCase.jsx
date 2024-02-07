import Header from "../components/header.jsx";
import Footer from "../components/footer.jsx";
import "../styles/addUseCase.css";
import React, { useState } from "react";
import axios from "axios";
import Pitch from "../components/pitch-container.jsx";

async function postNewUseCase(useCaseObject) {
  return axios
    .post(`http://localhost:3000/addUseCase`, {
      params: { use_case_object: useCaseObject },
    })
    .then((response) => response.data)
    .catch((error) => console.error(error));
}

export default function AddUseCase() {
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    classificationLevel: "",
    preferredSkillsets: "",
    desiredDeliverable: "",
    company: "",
    location: "CUI",
    pocName: "",
    pocDiscordName: "",
    hasData: false,
  });

  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async () => {
    try {
      const response = await postNewUseCase(formData);
      console.log(response); // Log the response or handle it as needed
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
          <div className="form-container">
            <h1 className="form-header">Add Use Case</h1>
            <div className="form">
              <label>Use Case Name</label>
              <input
                type="text"
                name="title"
                value={formData.title}
                onChange={handleChange}
              />

              <label>Description</label>
              <textarea
                type="text"
                name="description"
                value={formData.description}
                onChange={handleChange}
              />

              <label>Level of Classification</label>
              <select
                name="classificationLevel"
                value={formData.classificationLevel}
                onChange={handleChange}
              >
                <option value="CUI">CUI</option>
                <option value="Secret">Secret</option>
              </select>

              <label>Preferred Skillsets (comma delimited)</label>
              <input
                type="text"
                name="preferredSkillsets"
                value={formData.preferredSkillsets}
                onChange={handleChange}
              />

              <label>Desired Deliverable</label>
              <input
                type="text"
                name="desiredDeliverable"
                value={formData.desiredDeliverable}
                onChange={handleChange}
              />

              <label>Organization</label>
              <input
                type="text"
                name="company"
                value={formData.company}
                onChange={handleChange}
              />

              <label>Where to find POC?</label>
              <input
                type="text"
                name="location"
                value={formData.location}
                onChange={handleChange}
              />

              <label>POC Name</label>
              <input
                type="text"
                name="pocName"
                value={formData.pocName}
                onChange={handleChange}
              />
              <label>POC Discord Name</label>
              <input
                type="text"
                name="pocDiscordName"
                value={formData.pocDiscordName}
                onChange={handleChange}
              />
              <label>Is Data Supplied?</label>
              <select
                name="hasData"
                value={formData.hasData}
                onChange={handleChange}
              >
                <option value="true">Yes</option>
                <option value="false">No</option>
              </select>

              <button onClick={handleSubmit}>Create Use Case</button>
            </div>
          </div>
        </div>
        <Footer />
      </div>
    </>
  );
}
