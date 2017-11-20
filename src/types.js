// @flow

import { type Node as ReactNode } from "react";

export type SortDirection = "asc" | "desc";
export type AriaSortDirection = "ascending" | "descending";

export type SortProps = {|
  role: "button",
  tabIndex: 0,
  "aria-sort"?: AriaSortDirection,
  direction?: SortDirection,
  onClick: (event: SyntheticMouseEvent<*>) => void,
  onKeyUp: (event: SyntheticKeyboardEvent<*>) => void
|};

export type RenderProps = {
  getSortDirectionFor: (key: string) => ?SortDirection,
  getSortProps: (key: string) => SortProps
};

export type Props = {
  render: RenderProps => ReactNode,
  sortBy?: { key: string, direction: SortDirection },
  onSort: (key: string) => void
};

export type State = {};
