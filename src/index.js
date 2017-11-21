// @flow

import * as React from "react";
import type {
  Props,
  State,
  SortDirection,
  SortProps,
  RenderProps
} from "./types";

export const ariaSortMap = {
  asc: "ascending",
  desc: "descending"
};

const sortDirections = [...Object.keys(ariaSortMap), null];

export default class Unsort extends React.Component<Props, State> {
  props: Props;

  static defaultProps = {
    onSort: () => {}
  };

  constructor(props: Props) {
    super(props);

    this.state = {
      sortKey: this.props.initialSortKey,
      sortDirection: this.props.initialSortDirection
    };
  }

  getSortDirection = (key: string): ?SortDirection => {
    // if sortKey is changed or not set, return default sortDirections
    if (this.state.sortKey !== key) {
      return sortDirections[0];
    }
    const sortDirectionIndex = sortDirections.indexOf(this.state.sortDirection);
    return sortDirections[(sortDirectionIndex + 1) % sortDirections.length];
  };

  handleSortChange = (key: string) => {
    const sortDirection = this.getSortDirection(key);
    const sortKey = sortDirection === null ? null : key;
    const newState = { sortKey, sortDirection };
    this.props.onSort(newState);
    this.setState(newState);
  };

  getSortProps = (key: string): SortProps => {
    const { sortKey, sortDirection } = this.state;

    const sortProps: SortProps = {
      role: "button",
      tabIndex: 0,
      onClick: () => this.handleSortChange(key),
      onKeyUp: event => {
        // 13 = enter keyCode
        if (event.keyCode === 13) {
          this.handleSortChange(key);
        }
      }
    };
    if (key === sortKey && sortDirection) {
      sortProps["aria-sort"] = ariaSortMap[sortDirection];
    }
    return sortProps;
  };

  render() {
    const renderProps: RenderProps = {
      ...this.state,
      getSortProps: this.getSortProps
    };
    return this.props.render(renderProps);
  }
}

export type { Props, SortDirection, SortProps, RenderProps };
