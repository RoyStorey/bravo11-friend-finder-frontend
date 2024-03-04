import React, { useState, useEffect } from "react";
import Header from "../components/header.jsx";
import Footer from "../components/footer.jsx";
import TasksTable from "../components/tasksTable.jsx";
import "../styles/home.css";
import axios from "axios";
import Pitch from "../components/pitch-container.jsx";

const fug = [
  {
    id: 1,
    title: "Avionics Data Cleaning for INDOPACOM",
    description:
      "The Avionics Data Cleaning task for INDOPACOM involves the process of collecting, processing, and refining avionics data from various aircraft and sources within the Indo-Pacific Command (INDOPACOM) region. This critical task ensures that the avionics data is accurate, reliable, and ready for analysis and decision-making.",
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

export default function Tasks() {
  const [tasksData, setTasksData] = useState([]);
  let isDataPopulated = true;

  async function getTasks() {
    return axios
      .get(`http://${process.env.REACT_APP_SERVER}/tasks`)
      .then((response) => response.data)
      .catch((error) => console.error(error));
  }

  useEffect(() => {
    try {
      getTasks().then((data) => {
        setTasksData(data);
        console.log(data, "test");
      });
    } catch {
      console.log("No data found...");
    }
  }, []);

  function TasksTableConditional({ data, isDataPopulated }) {
    if (isDataPopulated) {
      return <TasksTable data={data} />;
    }
    return <h5>No task data found...</h5>;
  }

  return (
    <>
      {/* <Pitch /> */}
      <div className="home">
        <Header />
        <div className="body">
          <TasksTableConditional data={fug} isDataPopulated={isDataPopulated} />
        </div>
        <Footer />
      </div>
    </>
  );
}
