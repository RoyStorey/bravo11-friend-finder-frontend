import React, { useState } from "react";
import { useTable } from "react-table";
import "../styles/table.css";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const columns = [
  {
    Header: "List of Bravo 11 Tasks",
    accessor: "title",
  },
];

export default function TasksTable({ data }) {
  const navigate = useNavigate()

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
                <a onClick={() => navigate(`/single-task/${data[rowIndex].id}`)}>
                  View Task
                </a>
              </tr>
              {expandedRows.includes(rowIndex) && (
                <tr className="expanded-team-table-row">
                  <td colSpan={columns.length}>
                    <p>
                      <strong>Description:</strong> {data[rowIndex].description}
                    </p>
                    <p>
                      <strong>Classification Required:</strong>{" "}
                      {data[rowIndex].classificationLevel}
                    </p>
                    <p>
                      <strong>POC's Name:</strong> {data[rowIndex].pocName}
                    </p>
                    <p>
                      <strong>POC's Discord Name:</strong> {data[rowIndex].pocDiscordName}
                    </p>
                    <p>
                      <strong>POC's Location:</strong> {data[rowIndex].location}
                    </p>
                    <p>
                      <strong>Organization:</strong> {data[rowIndex].company}
                    </p>
                    <p>
                      <strong>Desired Deliverable:</strong>{" "}
                      {data[rowIndex].desiredDeliverable}
                    </p>
                    <p>
                      <strong>Preferred Skillsets:</strong>{" "}
                      {data[rowIndex].desiredSkillset?.toString() ?? "None"}
                    </p>
                    <p>
                      <strong>Data Supplied:</strong>{" "}
                      {data[rowIndex].hasData ? "Yes" : "No"}
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
