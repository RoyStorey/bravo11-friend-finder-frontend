import React, { useState, useEffect } from "react";
import Header from "../components/header.jsx";
import Footer from "../components/footer.jsx";
import UseCasesTable from "../components/useCasesTable.jsx";
import "../styles/home.css";
import axios from "axios";
import Pitch from "../components/pitch-container.jsx";

// const data = [
//   {
//     id: 1,
//     title: "Avionics Data Cleaning for INDOPACOM",
//     description:
//       "The Avionics Data Cleaning use-case for INDOPACOM involves the process of collecting, processing, and refining avionics data from various aircraft and sources within the Indo-Pacific Command (INDOPACOM) region. This critical task ensures that the avionics data is accurate, reliable, and ready for analysis and decision-making.",
//     classificationLevel: "Secret",
//     desiredSkillsets: ["ui/ux developer", "data scientist"],
//     desiredDeliverable: "Application that cleans data",
//     company: "INDOPACOM",
//     location: "E2",
//     pocName: "john smite",
//     pocDiscordName: "smiteyou",
//     hasData: true,
//   },
// ];

export default function UseCases() {
  const [useCasesData, setUseCasesData] = useState([]);
  let isDataPopulated = false;

  async function getUseCases() {
    return axios
      .get(`http://localhost:3000/getUseCases`)
      .then((response) => response.data)
      .catch((error) => console.error(error));
  }

  useEffect(() => {
    try{
    getUseCases().then((data) => {
      setUseCasesData(data);
      console.log(data, "test");
    });
  }catch{
    console.log('No data found...')
  }
  }, []);

  function UseCasesTableConditional({data,isDataPopulated}){
    if(isDataPopulated){
      return <UseCasesTable data={data} />
    }
    return <h5>No task data found...</h5>
  }

  return (
    <>
      <Pitch />
      <div className="home">
        <Header />
        <div className="body">
          <UseCasesTableConditional data={useCasesData} isDataPopulated={isDataPopulated} />
        </div>
        <Footer />
      </div>
    </>
  );
}
