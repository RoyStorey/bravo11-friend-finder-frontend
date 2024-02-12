import React from "react";
import "../styles/table.css";

export default function SadTeamsTable({ data }) {
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
            onClick={() => {
              window.location.href = `/single-team/${useCase.id}`;
            }}
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
