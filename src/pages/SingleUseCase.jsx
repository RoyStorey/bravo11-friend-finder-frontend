import Header from "../components/header.jsx";
import Footer from "../components/footer.jsx";
import { useParams } from "react-router-dom";
import "../styles/singleUseCase.css";
import React, { useState, useEffect } from "react";
import axios from "axios";
import Pitch from "../components/pitch-container.jsx";
import { useNavigate } from "react-router-dom";

export default function SingleUseCase() {
  const navigate = useNavigate()
  const [useCaseData, setUseCaseData] = useState({
    title: "",
    description: "",
    pocName: "",
    pocDiscordName: "",
    company: "",
    desiredDeliverable: "",
    hasData: 0,
    desiredSkillset: [""],
    classificationLevel: "CUI",
    location: "",
    image: "",
  });
  let { useCaseId } = useParams();

  async function getUseCase(useCaseId) {
    return axios
      .get(`http://localhost:3000/getUseCase/${useCaseId}`)
      .then((response) => response.data)
      .catch((error) => console.error(error));
  }

  useEffect(() => {
    getUseCase(useCaseId)
      .then((data) => {
        setUseCaseData(data[0]); // Update state with the received data
      })
      .catch((error) => {
        console.error("Error fetching team data:", error);
        // Handle error if necessary
      });
  }, []);
  //Correctly querying

  function handleAddAsTeamsUseCase(useCaseName) {
    let yesNoCheck = window.confirm(
      "Are you sure that you want to add this as your team's use-case? Your team can only have ONE use-case, so if you add this as your use-case, then any prior use-case will be overwritten."
    );

    if (yesNoCheck) {
      let otpCheck = window.prompt("Please enter your team-captain PIN:");

      return axios
        .post(`http://localhost:3000/addTeamToUseCase`, {
          captainCode: otpCheck,
          useCaseTitle: useCaseName,
        })
        .then((response) => {
          if (response.status === 200) {
            window.alert("Team's use case added successfully!");
            window.location.href = "/use-cases/";
          } else {
            window.alert("Failed to add team's use case. Please try again.");
          }
          return response.data;
        })
        .catch((error) => {
          console.error("Error adding team's use case:", error);
          window.alert("An error occurred while adding team's use case.");
        });
    }
  }

  function handleUseCaseDelete(useCaseId) {
    if (window.confirm("Are you sure you would like to delete this team?")) {
      try {
        axios.post("http://localhost:3000/removeUseCase", {
          id: useCaseId,
        });
      } catch (error) {
        console.error(error);
      }
    }
  }

  return (
    <>
      <Pitch />
      <div className="home">
        <Header />
        <div className="body">
          <div className="single-use-case-container">
            <div className="use-case-header">
              <h1 className="use-case">{useCaseData.title}</h1>
              <button
                className="use-case-button"
                onClick={() => {
                  handleAddAsTeamsUseCase(useCaseData.title);
                }}
              >
                Add as team's use-case
              </button>
            </div>
            <h5>Task ID: {useCaseData.id}</h5>
            <p>
              <b>Task Description:</b> {useCaseData.description}
            </p>
            <p>
              <b>Task Classification Level: {useCaseData.classificationLevel}</b>
            </p>
            <p>
              <b>POC's Name:</b> {useCaseData.pocName}
            </p>
            <p>
              <b>POC's Discord Name: </b>
              {useCaseData.pocDiscordName}
            </p>
            <p>
              <b>POC's Location:</b> {useCaseData.location}
            </p>
            <p>
              <b>Organization: </b>
              {useCaseData.company}
            </p>
            <p>
              <b>Desired Deliverable: </b>
              {useCaseData.desiredDeliverable}
            </p>
            <p>
              <b>Preferred Skillsets:</b> {useCaseData.desiredSkillset?.toString() ?? "none"}
            </p>
            <p>
              <b>Data Supplied: </b> {useCaseData.hasData ? "Yes" : "No"}
            </p>
          </div>
          <button className="edit-team-button">
            <a onClick={() => navigate(`/edit-use-case/${useCaseId}`)}>Edit Task</a>
          </button>
          <button
            className="edit-team-button"
            onClick={() => {
              handleUseCaseDelete(useCaseId);
            }}
          >
            Delete Task
          </button>
        </div>
        <Footer />
      </div>
    </>
  );
}
