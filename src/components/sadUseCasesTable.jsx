import React from "react";
import { useTable } from "react-table";
import "../styles/table.css";

export default function SadUseCasesTable({ data }) {


  const columns = React.useMemo(
    () => [
      {
        Header: "Title",
        accessor: "title",
      },
      {
        Header: "POC Name",
        accessor: "pocName",
      },
    ],
    []
  );

  const { getTableProps, getTableBodyProps, headerGroups, rows, prepareRow } =
    useTable({
      columns,
      data,
    });
  if (!data || data.length === 0) {
    return <p>No use cases with no teams found.</p>;
  }

  return (
    <table {...getTableProps()} className="table-container">
      <thead>
        {headerGroups.map((headerGroup) => (
          <tr
            {...headerGroup.getHeaderGroupProps()}
            className="teams-table-row"
          >
            {headerGroup.headers.map((column) => (
              <th {...column.getHeaderProps()}>
                <h4>{column.render("Header")}</h4>
              </th>
            ))}
          </tr>
        ))}
      </thead>
      <tbody {...getTableBodyProps()}>
        {rows.map((row, i) => {
          prepareRow(row);
          return (
            <tr
              onClick={() => {
                window.location.href = `/single-use-case/${row.original.id}`;
              }}
              {...row.getRowProps()}
              className="teams-table-row"
              key={i}
            >
              {row.cells.map((cell) => {
                return <td {...cell.getCellProps()}>{cell.render("Cell")}</td>;
              })}
            </tr>
          );
        })}
      </tbody>
    </table>
  );
}
