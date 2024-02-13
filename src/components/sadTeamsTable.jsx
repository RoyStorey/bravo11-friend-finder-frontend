import React from "react";
import "../styles/table.css";
import { useNavigate } from "react-router-dom";

export default function SadTeamsTable({ data }) {
  const navigate = useNavigate();

  if (!data || data.length === 0) {
    return <p>No teams needing members found.</p>;
  }

  return (
    <table className="table-container">
      <thead>
        <tr className=" teams-table-row">
          <th>Team Name</th>
          <th>Classification Level</th>
          <th>Captain Discord Name</th>
        </tr>
      </thead>
      <tbody>
        {data.map((useCase, index) => (
          <tr
            key={index}
            className="teams-table-row"
            onClick={() => navigate(`/single-team/${useCase.id}`)}
          >
            <td>{useCase.teamName}</td>
            <td>{useCase.classificationLevel}</td>
            <td>{useCase.captainDiscordName}</td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}
