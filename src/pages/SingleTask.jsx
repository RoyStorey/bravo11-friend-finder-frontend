import Header from "../components/header.jsx";
import Footer from "../components/footer.jsx";
import { useParams } from "react-router-dom";
import "../styles/singleTask.css";
import React, { useState, useEffect } from "react";
import axios from "axios";
import Pitch from "../components/pitch-container.jsx";
import { useNavigate } from "react-router-dom";

export default function SingleTask() {
  const navigate = useNavigate()
  const [taskData, setTaskData] = useState({
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
  let { taskId } = useParams();

  async function getTask(taskId) {
    return axios
      .get(`http://localhost:3000/tasks/${taskId}`)
      .then((response) => response.data)
      .catch((error) => console.error(error));
  }

  useEffect(() => {
    getTask(taskId)
      .then((data) => {
        setTaskData(data[0]); // Update state with the received data
      })
      .catch((error) => {
        console.error("Error fetching team data:", error);
        // Handle error if necessary
      });
  }, []);
  //Correctly querying

  function handleAddAsTeamsTask(taskId) {
    let yesNoCheck = window.confirm(
      "Are you sure that you want to add this as your team's task? Your team can only have ONE task, so if you add this as your task, then any prior task will be overwritten."
    );

    if (yesNoCheck) {
      let teamName = window.prompt("Please enter your team name:")
      let otpCheck = window.prompt("Please enter your team-captain PIN:");

      return axios
        .post(`http://localhost:3000/tasks/${taskId}/join`, {
          captainCode: otpCheck,
          team_name:teamName
        })
        .then((response) => {
          if (response.status === 200) {
            window.alert("Team's use case added successfully!");
            window.location.href = "/tasks/";
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

  function handleTaskDelete(taskId) {
    if (window.confirm("Are you sure you would like to delete this team?")) {
      let taskCode = window.prompt("Enter your TASK CODE to delete this task.")
      try {
        axios.post(`http://localhost:3000/tasks/delete/${taskId}`, {
          taskCode: taskCode,
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
          <div className="single-task-container">
            <div className="task-header">
              <h1 className="task">{taskData.title}</h1>
              <button
                className="task-button"
                onClick={() => {
                  handleAddAsTeamsTask(taskData.title);
                }}
              >
                Add as team's task
              </button>
            </div>
            <h5>Task ID: {taskData.id}</h5>
            <p>
              <b>Task Description:</b> {taskData.description}
            </p>
            <p>
              <b>Task Classification Level: {taskData.classificationLevel}</b>
            </p>
            <p>
              <b>POC's Name:</b> {taskData.pocName}
            </p>
            <p>
              <b>POC's Discord Name: </b>
              {taskData.pocDiscordName}
            </p>
            <p>
              <b>POC's Location:</b> {taskData.location}
            </p>
            <p>
              <b>Organization: </b>
              {taskData.company}
            </p>
            <p>
              <b>Desired Deliverable: </b>
              {taskData.desiredDeliverable}
            </p>
            <p>
              <b>Preferred Skillsets:</b> {taskData.desiredSkillset?.toString() ?? "none"}
            </p>
            <p>
              <b>Data Supplied: </b> {taskData.hasData ? "Yes" : "No"}
            </p>
          </div>
          <button className="edit-team-button">
            <a onClick={() => navigate(`/edit-task/${taskId}`)}>Edit Task</a>
          </button>
          <button
            className="edit-team-button"
            onClick={() => {
              handleTaskDelete(taskId);
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
