import Header from "../components/header.jsx";
import Footer from "../components/footer.jsx";
import "../styles/addUseCase.css";
import React, { useState } from "react";
import axios from "axios";
import Pitch from "../components/pitch-container.jsx";

async function postNewUseCase(useCaseObject) {
  return axios
    .post(`http://localhost:3000/addUseCase`, useCaseObject)
    .then((response) => response.data)
    .catch((error) => console.error(error));
}

export default function AddUseCase() {
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    classificationLevel: "CUI",
    desiredSkillsets: "",
    desiredDeliverable: "",
    company: "",
    location: "",
    pocName: "",
    pocDiscordName: "",
    hasData: false,
    image: "",
  });

  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async () => {
    try {
      const response = await postNewUseCase(formData);
      window.alert("Use Case successfully created!");
      window.location.href = "/use-cases/";
      console.log(response); // Log the response or handle it as needed
    } catch (error) {
      console.error(error);
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
          <h1 className="form-header">Add Use Case</h1>
          <div className="form-container">
            <div className="left-side-of-form">
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
                  name="desiredSkillsets"
                  value={formData.desiredSkillsets}
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
                  <option value={1}>Yes</option>
                  <option value={0}>No</option>
                </select>

                <button onClick={handleSubmit}>Create Use Case</button>
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
