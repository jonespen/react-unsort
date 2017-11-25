// @flow

import * as React from "react";
import { storiesOf, action } from "@storybook/react";
import styled from "styled-components";
import Unsort from "../src";
import { initialRows, type Row } from "./table";

const Table = styled.table`
  border-collapse: collapse;
  font-family: sans-serif;
`;
const Tr = styled.tr``;
const Td = styled.td`
  padding: 0.75rem;
  border-top: 1px solid #eee;
`;
const Th = Td.extend`
  text-align: left;
  &:focus,
  &:hover {
    cursor: ${props => (props.sortable ? "pointer" : "default")};
    background-color: ${props => (props.sortable ? "#ffc" : "inherit")};
  }
`.withComponent("th");

function getSortDirection(props) {
  if (props.direction && props.visible) {
    return props.direction === "asc" ? "↓" : "↑";
  }
}
const Sort = styled.span`
  &::after {
    content: "${getSortDirection}";
    width: .25rem;
    font-size: .75rem;
    color: #666;
    display: inline-block;
  }
`;

function StyledTable({ rows, ...props }: { rows: Row[] }) {
  return (
    <Unsort
      {...props}
      render={({ getSortProps, sortKey, sortDirection }) => {
        return (
          <Table>
            <thead>
              <Tr>
                <Th sortable {...getSortProps("name")}>
                  Name
                  <Sort
                    visible={sortKey === "name"}
                    direction={sortDirection}
                  />
                </Th>
                <Th sortable {...getSortProps("age")}>
                  Age<Sort
                    visible={sortKey === "age"}
                    direction={sortDirection}
                  />
                </Th>
                <Th>Country (not sortable)</Th>
              </Tr>
            </thead>
            <tbody>
              {rows.map(row => {
                return (
                  <Tr key={row.id}>
                    <Td>{row.name}</Td>
                    <Td>{row.age}</Td>
                    <Td>{row.country}</Td>
                  </Tr>
                );
              })}
            </tbody>
          </Table>
        );
      }}
    />
  );
}

storiesOf("With styled-components", module)
  .add("basic", () => (
    <StyledTable rows={initialRows} onSort={action("onSort")} />
  ))
  .add("sorted", () => (
    <StyledTable
      rows={initialRows}
      onSort={action("onSort")}
      initialSortKey="name"
      initialSortDirection="asc"
    />
  ));
