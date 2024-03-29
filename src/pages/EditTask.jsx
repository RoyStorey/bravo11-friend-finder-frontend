import Header from "../components/header.jsx";
import Footer from "../components/footer.jsx";
import "../styles/addTeam.css";
import React, { useState, useEffect } from "react";
import axios from "axios";
import Pitch from "../components/pitch-container.jsx";
import { useParams } from "react-router-dom";

export default function EditTask() {
  let { taskId } = useParams();

  const [formData, setFormData] = useState({});
  const [oldFormData, setOldFormData] = useState({});
  async function getTask(taskId) {
    return axios
      .get(`http://${process.env.REACT_APP_SERVER}/tasks/${taskId}`)
      .then((response) => response.data)
      .catch((error) => console.error(error));
  }
  useEffect(() => {
    getTask(taskId)
      .then((data) => {
        setOldFormData(data[0]); // Update state with the received data
      })
      .catch((error) => {
        console.error("Error fetching task data:", error);
        // Handle error if necessary
      });
  }, []);
  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormData({ ...formData, [name]: value });
  };
  async function updateTask(taskId, formData, otp) {
    try {
      const response = await axios.post(
        `http://${process.env.REACT_APP_SERVER}/tasks/${taskId}`,
        {
          ...formData,
          taskCode: otp,
        }
      );
      return response.data;
    } catch (error) {
      console.error(error);
      throw error;
    }
  }

  const handleSubmit = async () => {
    let otpCheck = window.prompt("Supply your task PIN:");
    try {
      await updateTask(taskId, formData, otpCheck);
      window.alert("Task updated successfully!");
    } catch (error) {
      if (error.response && error.response.status === 403) {
        window.alert("Incorrect task PIN. Please try again.");
      } else {
        console.error("Error updating task:", error);
        window.alert("Failed to update task. Please try again.");
      }
    }
  };

  return (
    <>
      {/* <Pitch /> */}
      <div className="home">
        <Header />
        <div className="body">
          <h1 className="form-header">Edit Task {formData.title}</h1>
          <div className="form-container">
            <div className="left-side-of-form">
              <div className="form">
                <label>Task Name</label>
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
