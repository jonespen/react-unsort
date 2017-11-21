// @flow

import { type Node as ReactNode } from "react";

export type SortDirection = "asc" | "desc";

type AriaSortDirection = "ascending" | "descending";

export type SortProps = {|
  role: "button",
  tabIndex: 0,
  "aria-sort"?: AriaSortDirection,
  onClick: (event: SyntheticMouseEvent<*>) => void,
  onKeyUp: (event: SyntheticKeyboardEvent<*>) => void
|};

export type RenderProps = State & {
  getSortProps: (key: string) => SortProps
};

export type Props = {
  render: RenderProps => ReactNode,
  initialSortKey?: string,
  initialSortDirection?: SortDirection,
  onSort: State => void
};

export type State = {
  sortKey: ?string,
  sortDirection: ?SortDirection
};
