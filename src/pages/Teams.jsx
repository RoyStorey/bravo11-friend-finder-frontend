import Header from "../components/header.jsx";
import Footer from "../components/footer.jsx";
import TeamsTable from "../components/teamsTable.jsx";
import Pitch from "../components/pitch-container.jsx";
import "../styles/home.css";
import React, { useState, useEffect } from "react";
import axios from "axios";

export default function Teams() {
  const [teamsData, setTeamsData] = useState([]);

  async function getTeams() {
    return axios
      .get(`http://localhost:3000/getTeams`)
      .then((response) => response.data)
      .catch((error) => console.error(error));
  }

  useEffect(() => {
    getTeams().then((data) => {
      setTeamsData(data);
      console.log(data, "test");
    });
  }, []);

  return (
    <>
      <Pitch />
      <div className="home">
        <Header />
        <div className="body">
          <TeamsTable data={teamsData} />
        </div>
        <Footer />
      </div>
    </>
  );
}
