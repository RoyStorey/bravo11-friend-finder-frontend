import Header from "../components/header.jsx";
import Footer from "../components/footer.jsx";
import { useNavigate, useParams } from "react-router-dom";
import "../styles/singleTeam.css";
import React, { useState, useEffect } from "react";
import axios from "axios";
import Pitch from "../components/pitch-container.jsx";

export default function SingleTeam() {
  const [teamData, setTeamData] = useState({
    id: 0,
    teamName: "No Team Selected",
    useCase: "",
    members: [""],
    captainDiscordName: "",
    captainCodeOTP: "",
    gitRepoUrl: "",
    location: "",
    preferredTimeToWork: "",
    classificationLevel: "",
    preferredSkillsets: [""],
    image: "",
  });

  let { teamId } = useParams(); //THIS IS CORRECT
  const navigate = useNavigate();

  async function getTeam(teamId) {
    try {
      const response = await axios.get(
        `http://localhost:3000/getTeam/${teamId}`
      );
      return response.data;
    } catch (error) {
      console.error(error);
      throw error; // Rethrow the error to handle it in the component
    }
  }

  useEffect(() => {
    getTeam(teamId)
      .then((data) => {
        setTeamData(data[0]); // Update state with the received data
        console.log(data, "BONKO");
      })
      .catch((error) => {
        console.error("Error fetching team data:", error);
        // Handle error if necessary
      });
  }, []);
  //Correctly querying

  function handleTeamDelete(teamId, teamName) {
    let otpCheck = window.prompt("Enter your team PIN:");

    if (window.confirm("Are you sure you would like to delete this team?")) {
      axios
        .post("http://localhost:3000/removeTeam", {
          id: teamId,
          captainCode: otpCheck,
          teamName: teamName,
        })
        .then((response) => {
          if (response.status === 200) {
            window.alert("Team deleted successfully.");
            window.location.href = "/use-cases/";
          } else {
            window.alert("Failed to delete team. Please try again.");
          }
        })
        .catch((error) => {
          if (error.response && error.response.status === 403) {
            window.alert("Incorrect team PIN. Please try again.");
          } else {
            console.error("Error deleting team:", error);
            window.alert("An error occurred while deleting the team.");
          }
        });
    }
  }

  function handleMemberDelete(teamId, memberId) {
    let otpCheck = window.prompt("Enter your team PIN:");

    if (window.confirm("Are you sure you would like to delete this user?")) {
      try {
        axios
          .post("http://localhost:3000/removeMember", {
            teamId: teamId,
            memberId: memberId,
            captainCode: otpCheck,
          })
          .then((response) => {
            if (response.status === 200) {
              window.alert("Member successfully deleted.");
            } else {
              window.alert("Failed to delete member. Please try again.");
            }
          })
          .catch((error) => {
            console.error(error);
            window.alert("An error occurred while deleting the member.");
          });
      } catch (error) {
        console.error(error);
      }
    }
  }

  function TeamMembersList({ teamId }) {
    const [teamMembers, setTeamMembers] = useState([]);

    useEffect(() => {
      async function fetchTeamMembers() {
        try {
          const response = await axios.get(
            `http://localhost:3000/getMembersByTeam/${teamId}`
          );
          setTeamMembers(response.data);
          console.log(response.data)
        } catch (error) {
          console.error(error);
        }
      }

      fetchTeamMembers();
    }, [teamId]);

    return (
      <div>
        <h2>Team Members</h2>
        <ol>
          {teamMembers.map((member, index) => (


            <div className="team-member">


              <div className="team-data-column">
                <li key={index}>
                  <b>{`${index}. Name: `}</b>
                  {`${member.name}`}
                </li>
              </div>

              <div className="team-data-column">
                <b>Discord Name: </b>
                {member.discordName}
              </div>

              <div className="team-data-column">
                <b>Skills: </b>
                <div className="skills-container">
                  {member.skillsets?.split(',').map((skill,i)=>{
                    return <div className="skill-pill" key={i}><p>{skill}</p></div>
                  })}
                </div>
              </div>


              <button
                onClick={() => {
                  handleMemberDelete(teamId, member.id);
                }}
              >
                Remove Team Member
              </button>
            </div>
          ))}
        </ol>
      </div>
    );
  }
  console.log(teamData);

  return (
    <>
      <Pitch />
      <div className="home">
        <Header />
        <div className="body">
          <div className="single-team-container">
            {/* <ImageComponent base64Image={JSON.stringify(teamData.image)} /> */}
            {/* <p>{JSON.stringify(teamData.image)}</p> */}
            <h1 className="team-name">{teamData.teamName}</h1>
            <h5>Team ID: {teamData.id}</h5>
            <p>
              <b>Task:</b> {teamData.useCase}
            </p>
            <p>
              <b>Captain's Discord Name: </b>
              {teamData.captainDiscordName}
            </p>
            <p>
              <b>Git Repo URL: </b>
              <a href={teamData.gitRepoUrl}>{teamData.gitRepoUrl}</a>
            </p>
            <p>
              <b>Location: </b>
              {teamData.location}
            </p>
            <p>
              <b>Preferred Time to Work:</b> {teamData.preferredTimeToWork}
            </p>
            <p>
              <b>Preferred Skillsets:</b>{" "}
              {teamData.preferredSkills?.toString() ?? "No Skillsets Specified"}
            </p>
            <p>
              <b>Level of Classification:</b> {teamData.classificationLevel}
            </p>
            <TeamMembersList teamId={teamId} />
          </div>
          <button onClick={() => navigate(`/edit-team/${teamId}`)} className="edit-team-button">
            Edit Team
          </button>
          <button onClick={() => navigate(`/join-team/${teamId}`)} className="edit-team-button">
            Join Team
          </button>
          <button
            className="edit-team-button"
            onClick={() => {
              handleTeamDelete(teamId, teamData.teamName);
            }}
          >
            Delete Team
          </button>
        </div>
        <Footer />
      </div >
    </>
  );
}
