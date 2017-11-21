// @flow

import * as React from "react";
import { storiesOf, action } from "@storybook/react";
import Unsort, { type RenderProps } from "../src";

export type Row = {
  id: string,
  name: string,
  age: number,
  country: string
};

export const initialRows = [
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

export function Table({ rows, ...props }: { rows: Row[] }) {
  return (
    <Unsort
      {...props}
      render={({ getSortProps, sortKey, sortDirection }) => {
        return (
          <table>
            <thead>
              <tr>
                <th {...getSortProps("name")}>
                  Name <span>{sortKey === "name" && sortDirection}</span>
                </th>
                <th {...getSortProps("age")}>
                  Age <span>{sortKey === "age" && sortDirection}</span>
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
  .add("basic", () => <Table rows={initialRows} onSort={action("onSort")} />)
  .add("sorted", () => (
    <Table
      rows={initialRows}
      onSort={action("onSort")}
      initialSortKey="name"
      initialSortDirection="asc"
    />
  ));
