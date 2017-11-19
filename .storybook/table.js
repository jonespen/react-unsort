// @flow

import * as React from "react";
import { storiesOf, action } from "@storybook/react";
import Unsort from "../src";

const rows = [
  {
    id: "ola",
    name: "Ola",
    age: 30,
    country: "Norway"
  },
  {
    id: "frederik",
    name: "Fredrik",
    age: 25,
    country: "Sweden"
  }
];

function Table({ rows, ...props }) {
  return (
    <Unsort
      {...props}
      render={({ getSortProps, getSortDirectionFor }) => {
        return (
          <table>
            <thead>
              <tr>
                <th {...getSortProps("name")}>
                  Name <span>{getSortDirectionFor("name")}</span>
                </th>
                <th {...getSortProps("age")}>
                  Age <span>{getSortDirectionFor("age")}</span>
                </th>
                <th>Country (not sortable)</th>
              </tr>
            </thead>
            <tbody>
              {rows.map(row => {
                return (
                  <tr key={row.id}>
                    <td>{row.name}</td>
                    <td>{row.age}</td>
                    <td>{row.country}</td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        );
      }}
    />
  );
}

storiesOf("Table", module)
  .add("basic", () => <Table rows={rows} onSort={action("onSort")} />)
  .add("sorted", () => (
    <Table
      rows={rows}
      onSort={action("onSort")}
      sortBy={{ key: "name", direction: "asc" }}
    />
  ));
