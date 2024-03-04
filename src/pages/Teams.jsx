import Header from "../components/header.jsx";
import Footer from "../components/footer.jsx";
import TeamsTable from "../components/teamsTable.jsx";
import Pitch from "../components/pitch-container.jsx";
import "../styles/home.css";
import React, { useState, useEffect } from "react";
import axios from "axios";

export default function Teams() {
  const [teamsData, setTeamsData] = useState([]);
  let isDataPopulated = false;

  async function getTeams() {
    return axios
      .get(`http://${process.env.REACT_APP_SERVER}/teams`)
      .then((response) => response.data)
      .catch((error) => console.error(error));
  }

  useEffect(() => {
    try {
      getTeams().then((data) => {
        setTeamsData(data);
        console.log(data, "test");
        isDataPopulated = true;
      });
    } catch {
      console.log("No data found.");
    }
  }, []);

  function TeamsTableConditional({ data, isDataPopulated }) {
    if (isDataPopulated) {
      return <TeamsTable data={data} />;
    }
    return <h5>No team data found...</h5>;
  }

  return (
    <>
      {/* <Pitch /> */}
      <div className="home">
        <Header />
        <div className="body">
          <TeamsTableConditional
            data={teamsData}
            isDataPopulated={isDataPopulated}
          />
        </div>
        <Footer />
      </div>
    </>
  );
}
