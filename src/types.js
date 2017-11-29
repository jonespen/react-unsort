// @flow

import { type Node as ReactNode } from "react";

export type SortDirection = "ascending" | "descending" | "none" | "other";

export type SortProps = {
  "aria-sort": SortDirection
};

export type RenderProps = State & {
  getSortProps: (key: string) => SortProps,
  getTableProps: () => {|
    role: "grid"
  |},
  getSortButtonProps: (
    key: string
  ) => {
    role: "button",
    tabIndex: 0,
    onClick: (event: SyntheticMouseEvent<*>) => void,
    onKeyUp: (event: SyntheticKeyboardEvent<*>) => void
  }
};

export type Props = {
  render: RenderProps => ReactNode,
  sortDirections: Array<SortDirection>,
  initialSortKey?: string,
  initialSortDirection?: SortDirection,
  onSort: State => void
};

export type State = {
  sortKey: ?string,
  sortDirection: ?SortDirection
};
