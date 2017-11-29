// @flow

import * as React from "react";
import type {
  Props,
  State,
  SortDirection,
  SortProps,
  RenderProps
} from "./types";

export default class Unsort extends React.Component<Props, State> {
  props: Props;

  static defaultProps = {
    onSort: () => {},
    sortDirections: ["none", "ascending", "descending"]
  };

  constructor(props: Props) {
    super(props);

    this.state = {
      sortKey: this.props.initialSortKey,
      sortDirection: this.props.initialSortDirection
    };
  }

  getNextSortDirection = (key: string): ?SortDirection => {
    const { sortDirections } = this.props;
    const { sortDirection } = this.state;
    if (!sortDirection) {
      return sortDirections[1];
    }
    // if sortKey is changed or not set, return default sortDirections
    if (this.state.sortKey !== key) {
      return sortDirections[1];
    }
    const sortDirectionIndex = sortDirections.indexOf(sortDirection);
    return sortDirections[(sortDirectionIndex + 1) % sortDirections.length];
  };

  handleSortChange = (key: string) => {
    const sortDirection = this.getNextSortDirection(key);
    const sortKey = sortDirection === null ? null : key;
    const newState = { sortKey, sortDirection };
    this.props.onSort(newState);
    this.setState(newState);
  };

  getSortDirection = (key: string): SortDirection => {
    const { sortDirections } = this.props;
    const { sortKey, sortDirection } = this.state;
    return key === sortKey && sortDirection ? sortDirection : sortDirections[0];
  };

  getSortProps = (key: string): SortProps => {
    return {
      ["aria-sort"]: this.getSortDirection(key)
    };
  };

  getTableProps = () => {
    return { role: "grid" };
  };

  getSortButtonProps = (key: string) => {
    return {
      role: "button",
      tabIndex: 0,
      onClick: () => this.handleSortChange(key),
      onKeyUp: (event: SyntheticKeyboardEvent<*>) => {
        // 13 = enter keyCode
        if (event.keyCode === 13) {
          this.handleSortChange(key);
        }
      },
      direction: this.getSortDirection(key)
    };
  };

  render() {
    const renderProps: RenderProps = {
      ...this.state,
      getSortProps: this.getSortProps,
      getTableProps: this.getTableProps,
      getSortButtonProps: this.getSortButtonProps
    };
    return this.props.render(renderProps);
  }
}

export type { Props, SortDirection, SortProps, RenderProps };
