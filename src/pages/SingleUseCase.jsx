import Header from "../components/header.jsx";
import Footer from "../components/footer.jsx";
import { useParams } from "react-router-dom";
import "../styles/singleUseCase.css";
import React, { useState, useEffect } from "react";
import axios from "axios";
import Pitch from "../components/pitch-container.jsx";

export default function SingleUseCase() {
  const [useCaseData, setUseCaseData] = useState({
    title: "",
    description: "",
    pocName: "",
    pocDiscordName: "",
    company: "",
    desiredDeliverable: "",
    hasData: 0,
    desiredSkillsets: [""],
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
        console.log(data, "test");
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
      return axios
        .post(`http://localhost:3000/updateTeam`, {
          params: { useCase: useCaseName },
        })
        .then((response) => response.data)
        .catch((error) => console.error(error));
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
            <h5>Use Case ID: {useCaseData.id}</h5>
            <p>
              <b>Use Case:</b> {useCaseData.description}
            </p>
            <p>
              <b>Number of Members: {useCaseData.classificationLevel}</b>
            </p>
            <p>
              <b>Captain's Discord Name: </b>
              {useCaseData.desiredSkillsets?.toString() ?? "none"}
            </p>
            <p>
              <b>Git Repo URL: </b>
              {useCaseData.desiredDeliverable}
            </p>
            <p>
              <b>Location: </b>
              {useCaseData.company}
            </p>
            <p>
              <b>Preferred Time to Work:</b> {useCaseData.location}
            </p>
            <p>
              <b>Preferred Skillsets:</b> {useCaseData.pocName}
            </p>
            <p>
              <b>Level of Classification:</b> {useCaseData.pocDiscordName}
            </p>
            <p>
              <b>Has data?</b> {useCaseData.hasData ? "Yes" : "No"}
            </p>
          </div>
        </div>
        <Footer />
      </div>
    </>
  );
}