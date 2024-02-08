import Header from "../components/header.jsx";
import Footer from "../components/footer.jsx";
import "../styles/addTeam.css";
import React, { useState, useEffect } from "react";
import axios from "axios";
import Pitch from "../components/pitch-container.jsx";
import { useParams } from "react-router-dom";

export default function EditUseCase() {
  let { useCaseId } = useParams();

  const [formData, setFormData] = useState({});
  const [oldFormData, setOldFormData] = useState({});
  async function getUseCase(useCaseId) {
    return axios
      .get(`http://localhost:3000/getUseCase/${useCaseId}`)
      .then((response) => response.data)
      .catch((error) => console.error(error));
  }
  useEffect(() => {
    getUseCase(useCaseId)
      .then((data) => {
        setOldFormData(data[0]); // Update state with the received data
      })
      .catch((error) => {
        console.error("Error fetching useCase data:", error);
        // Handle error if necessary
      });
  }, []);
  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormData({ ...formData, [name]: value });
  };
  async function updateUseCase(useCaseId, formData, otp) {
    return axios
      .post(`http://localhost:3000/updateUseCase`, {
        ...formData,
        id: useCaseId,
        useCaseCode: otp,
      })
      .then((response) => response.data)
      .catch((error) => console.error(error));
  }
  const handleSubmit = async () => {
    let otpCheck = window.prompt("Supply your use case PIN:");
    try {
      console.log(formData, "form data");
      await updateUseCase(useCaseId, formData, otpCheck);
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
          <h1 className="form-header">Edit Use Case {formData.title}</h1>
          <div className="form-container">
            <div className="left-side-of-form">
              <div className="form">
                <label>Use Case Name</label>
                <input
                  type="text"
                  name="title"
                  value={formData.title}
                  onChange={handleChange}
                  placeholder={oldFormData.title}
                />

                <label>Description</label>
                <textarea
                  type="text"
                  name="description"
                  value={formData.description}
                  onChange={handleChange}
                  placeholder={oldFormData.description}
                />

                <label>POC Name</label>
                <input
                  type="text"
                  name="pocName"
                  value={formData.pocName}
                  onChange={handleChange}
                  placeholder={oldFormData.pocName}
                />

                <label>POC Discord Name</label>
                <input
                  type="text"
                  name="pocDiscordName"
                  value={formData.pocDiscordName}
                  onChange={handleChange}
                  placeholder={oldFormData.pocDiscordName}
                />

                <label>Organization</label>
                <input
                  type="text"
                  name="company"
                  value={formData.company}
                  placeholder={oldFormData.company}
                  onChange={handleChange}
                />

                <label>Desired Deliverable</label>
                <input
                  type="text"
                  name="desiredDeliverable"
                  value={formData.desiredDeliverable}
                  placeholder={oldFormData.desiredDeliverable}
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
                  name="desiredSkillsets"
                  value={formData.desiredSkillsets}
                  placeholder={oldFormData.desiredSkillsets}
                  onChange={handleChange}
                />
                <label>Location of POC</label>
                <input
                  type="text"
                  name="location"
                  value={formData.location}
                  placeholder={oldFormData.location}
                  onChange={handleChange}
                />
                <label>Has Data?</label>
                <select
                  name="hasData"
                  value={formData.hasData}
                  placeholder={oldFormData.hasData}
                  onChange={handleChange}
                >
                  <option value="0">False</option>
                  <option value="1">True</option>
                </select>
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
