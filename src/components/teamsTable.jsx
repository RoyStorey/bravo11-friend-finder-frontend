import React, { useState } from "react";
import { useTable } from "react-table";
import "../styles/table.css";
import axios from "axios";

const columns = [
  {
    Header: "List of Bravo 11 Teams",
    accessor: "teamName",
  },
];

export default function UseCasesTable({ data }) {
  const { getTableProps, getTableBodyProps, headerGroups, rows, prepareRow } =
    useTable({
      columns,
      data,
    });

  const [expandedRows, setExpandedRows] = useState([]);

  const toggleRowExpansion = (rowIndex) => {
    if (expandedRows.includes(rowIndex)) {
      setExpandedRows(expandedRows.filter((index) => index !== rowIndex));
    } else {
      setExpandedRows([...expandedRows, rowIndex]);
    }
  };

  return (
    <table {...getTableProps()} className="table-container">
      <thead>
        {headerGroups.map((headerGroup) => (
          <tr {...headerGroup.getHeaderGroupProps()} className="table-header">
            {headerGroup.headers.map((column) => (
              <th {...column.getHeaderProps()}>
                <h2>{column.render("Header")}</h2>
              </th>
            ))}
          </tr>
        ))}
      </thead>
      <tbody {...getTableBodyProps()}>
        {rows.map((row, rowIndex) => {
          prepareRow(row);
          return (
            <React.Fragment key={rowIndex}>
              <tr
                {...row.getRowProps()}
                onClick={() => toggleRowExpansion(rowIndex)}
                className="teams-table-row"
              >
                {row.cells.map((cell) => {
                  return (
                    <td {...cell.getCellProps()}>▼ {cell.render("Cell")}</td>
                  );
                })}
                <p>
                  <b>Classification Level: </b>
                  {data[rowIndex].classificationLevel}
                </p>
                <a href={`/single-team/${data[rowIndex].id}`}>View Team</a>
              </tr>
              {expandedRows.includes(rowIndex) && (
                <tr>
                  <td colSpan={columns.length}>
                    <p>
                      <strong>Team Name:</strong> {data[rowIndex].teamName}
                    </p>
                    <p>
                      <strong>Use Case:</strong> {data[rowIndex].useCase}
                    </p>
                    <p>
                      <strong>Number of members:</strong>{" "}
                      {data[rowIndex].members?.length ?? 0}
                    </p>
                    <p>
                      <strong>Team Captain Discord Name:</strong>{" "}
                      {data[rowIndex].captainDiscordName}
                    </p>
                    <p>
                      <strong>Git Repo:</strong> {data[rowIndex].gitRepoUrl}
                    </p>
                    <p>
                      <strong>Location:</strong> {data[rowIndex].location}
                    </p>
                    <p>
                      <strong>Preferred Work Time:</strong>{" "}
                      {data[rowIndex].preferredTimeToWork}
                    </p>
                    <p>
                      <strong>Classification Level:</strong>{" "}
                      {data[rowIndex].classificationLevel}
                    </p>
                    <p>
                      <strong>Preferred Skillsets:</strong>{" "}
                      {data[rowIndex].preferredSkillsets.toString()}
                    </p>
                  </td>
                </tr>
              )}
            </React.Fragment>
          );
        })}
      </tbody>
    </table>
  );
}
