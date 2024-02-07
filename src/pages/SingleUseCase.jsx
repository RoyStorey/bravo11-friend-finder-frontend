import Header from "../components/header.jsx";
import Footer from "../components/footer.jsx";
import { useParams } from "react-router-dom";
import "../styles/singleUseCase.css";
import React, { useState, useEffect } from "react";
import axios from "axios";
import Pitch from "../components/pitch-container.jsx";

const data = [
  {
    id: 1,
    title: "Avionics Data Cleaning for INDOPACOM",
    description:
      "The Avionics Data Cleaning use-case for INDOPACOM involves the process of collecting, processing, and refining avionics data from various aircraft and sources within the Indo-Pacific Command (INDOPACOM) region. This critical task ensures that the avionics data is accurate, reliable, and ready for analysis and decision-making.",
    classificationLevel: "Secret",
    desiredSkillsets: ["ui/ux developer", "data scientist"],
    desiredDeliverable: "Application that cleans data",
    company: "INDOPACOM",
    location: "E2",
    pocName: "john smite",
    pocDiscordName: "smiteyou",
    hasData: true,
  },
];

export default function SingleUseCase() {
  // const [teamData, setTeamData] = useState([]);
  // let { teamId } = useParams();

  // async function getTeam(teamId) {
  //   return axios
  //     .get(`http://localhost:3000/getTeam`, { params: { id: teamId } })
  //     .then((response) => response.data)
  //     .catch((error) => console.error(error));
  // }

  // useEffect(() => {
  //   getTeam().then((data) => {
  //     setTeamData(data);
  //     console.log(data);
  //   });
  // }, []);

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
              <h1 className="use-case">{data[0].title}</h1>
              <button
                className="use-case-button"
                onClick={() => {
                  handleAddAsTeamsUseCase(data[0].title);
                }}
              >
                Add as team's use-case
              </button>
            </div>
            <h5>Use Case ID: {data[0].id}</h5>
            <p>
              <b>Use Case:</b> {data[0].description}
            </p>
            <p>
              <b>Number of Members: {data[0].classificationLevel}</b>
            </p>
            <p>
              <b>Captain's Discord Name: </b>
              {data[0].desiredSkillsets.toString()}
            </p>
            <p>
              <b>Git Repo URL: </b>
              {data[0].desiredDeliverable}
            </p>
            <p>
              <b>Location: </b>
              {data[0].company}
            </p>
            <p>
              <b>Preferred Time to Work:</b> {data[0].location}
            </p>
            <p>
              <b>Preferred Skillsets:</b> {data[0].pocName}
            </p>
            <p>
              <b>Level of Classification:</b> {data[0].pocDiscordName}
            </p>
            <p>
              <b>Has data?</b> {data[0].hasData ? "Yes" : "No"}
            </p>
          </div>
        </div>
        <Footer />
      </div>
    </>
  );
}
