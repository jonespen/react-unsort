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
  padding: ${props => (props.sortable ? 0 : "0.75rem")};
  border-top: 1px solid #eee;
`;
const Th = Td.extend`
  text-align: left;
`.withComponent("th");

function getSortDirection(props) {
  switch (props.direction) {
    case "ascending":
      return "↓";
    case "descending":
      return "↑";
    default:
      return "↓↑";
  }
}

const Sort = styled.span`
  display: block;
  padding: 0.75rem;
  &:focus,
  &:hover {
    cursor: pointer;
    background-color: #ffc;
  }
  &::after {
    content: "${getSortDirection}";
    width: .75rem;
    font-size: .75rem;
    color: #666;
    display: inline-block;
  }
`;

function StyledTable({ rows, ...props }: { rows: Row[] }) {
  return (
    <Unsort
      {...props}
      render={({
        getTableProps,
        getSortProps,
        getSortButtonProps,
        sortKey,
        sortDirection
      }) => {
        return (
          <Table {...getTableProps()}>
            <thead>
              <Tr>
                <Th sortable {...getSortProps("name")}>
                  <Sort {...getSortButtonProps("name")}>Name</Sort>
                </Th>
                <Th sortable {...getSortProps("age")}>
                  <Sort {...getSortButtonProps("age")}>Age</Sort>
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
      initialSortDirection="ascending"
    />
  ));
