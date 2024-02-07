import Header from "../components/header.jsx";
import Footer from "../components/footer.jsx";
import TeamsTable from "../components/teamsTable.jsx";
import "../styles/home.css";
import React, { useState, useEffect } from "react";
import axios from "axios";

// const data = [
//   {
//     id: 1,
//     team_name: "Team Alpha",
//     use_case: "Data Analytics for Financial Services",
//     members: ["User1", "User2", "User3"],
//     captain_discord_name: "CaptainAlpha",
//     captain_code_otp: "123456",
//     git_repo_url: "https://github.com/teamalpha",
//     location: "Remote",
//     preferred_time_to_work: "9:00 AM - 5:00 PM",
//     classification_level: "Confidential",
//     preferred_skillsets: ["Data Analyst", "Web Developer"],
//   },
//   {
//     id: 2,
//     team_name: "Team Bravo",
//     use_case: "AI-driven Customer Support",
//     members: ["User4", "User5", "User6"],
//     captain_discord_name: "CaptainBravo",
//     captain_code_otp: "789012",
//     git_repo_url: "https://github.com/teambravo",
//     location: "Office",
//     preferred_time_to_work: "10:00 AM - 6:00 PM",
//     classification_level: "Secret",
//     preferred_skillsets: ["AI Engineer", "Customer Support Specialist"],
//   },
// ];

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
      console.log(data, 'test');
    });
  }, []);

  return (
    <div className="home">
      <Header />
      <div className="body">
        <TeamsTable data={teamsData} />
      </div>
      <Footer />
    </div>
  );
}
