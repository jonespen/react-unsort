// @flow

import * as React from "react";
import type {
  Props,
  SortDirection,
  SortProps,
  RenderProps,

  // private types
  State,
  AriaSortDirection
} from "./types";

const ariaSortMap = {
  asc: "ascending",
  desc: "descending"
};

class Unsort extends React.Component<Props, State> {
  props: Props;

  toggleKeys = ["Enter", " "]; // This matches <button> behavior

  getSortDirectionFor = (key: string): ?SortDirection => {
    const { sortBy } = this.props;
    if (sortBy && sortBy.key == key) {
      return sortBy.direction;
    }
  };

  getSortProps = (key: string) => {
    const { onSort, sortBy } = this.props;
    const direction = this.getSortDirectionFor(key);
    const sortProps: SortProps = {
      role: "button",
      tabIndex: 0,
      onClick: () => onSort(key),
      onKeyUp: event => {
        if (this.toggleKeys.indexOf(event.key) > -1) {
          onSort(key);
        }
      }
    };
    if (direction) {
      sortProps.direction = direction;
      sortProps["aria-sort"] = ariaSortMap[direction];
    }
    return sortProps;
  };

  getUnsortStateAndHelpers(): RenderProps {
    return {
      getSortDirectionFor: this.getSortDirectionFor,
      getSortProps: this.getSortProps
    };
  }

  render() {
    return this.props.render(this.getUnsortStateAndHelpers());
  }
}

export default Unsort;
export type { Props, SortDirection, SortProps, RenderProps };
