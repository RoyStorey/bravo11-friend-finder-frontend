import React, { useState, useEffect } from "react";
import Header from "../components/header.jsx";
import Footer from "../components/footer.jsx";
import UseCasesTable from "../components/useCasesTable.jsx";
import "../styles/home.css";
import axios from "axios";

// const data = [
//   {
//     useCase: "Avionics Data Cleaning for INDOPACOM",
//     description:
//       "The Avionics Data Cleaning use-case for INDOPACOM involves the process of collecting, processing, and refining avionics data from various aircraft and sources within the Indo-Pacific Command (INDOPACOM) region. This critical task ensures that the avionics data is accurate, reliable, and ready for analysis and decision-making.",
//     classificationLevel: "Secret",
//     beneficialSkillsets: ["ui/ux developer", "data scientist"],
//     desiredDeliverable: "Application that cleans data",
//     organization: "INDOPACOM",
//     locationDuringEvent: "E2",
//     POC: { name: "john smith", discordName: "starlord" },
//     dataSupplied: true,
//   },
// ];

export default function UseCases() {
  const [useCasesData, setUseCasesData] = useState([]);

  async function getUseCases() {
    return axios
      .get(`http://localhost:3000/getUseCases`)
      .then((response) => response.data)
      .catch((error) => console.error(error));
  }

  useEffect(() => {
    getUseCases().then((data) => {
      setUseCasesData(data);
      console.log(data, 'test');
    });
  }, []);

  return (
    <div className="home">
      <Header />
      <div className="body">
        <UseCasesTable data={useCasesData} />
      </div>
      <Footer />
    </div>
  );
}
