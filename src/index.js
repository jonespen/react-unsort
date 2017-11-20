// @flow

import * as React from "react";

type SortDirection = "asc" | "desc";
type AriaSortDirection = "ascending" | "descending";

type SortProps = {|
  role: "button",
  tabIndex: 0,
  "aria-sort"?: AriaSortDirection,
  direction?: SortDirection,
  onClick: (event: SyntheticMouseEvent<*>) => void,
  onKeyUp: (event: SyntheticKeyboardEvent<*>) => void
|};

type RenderProps = {
  getSortDirectionFor: (key: string) => ?SortDirection,
  getSortProps: (key: string) => SortProps
};

type Props = {
  render: RenderProps => React.Node,
  sortBy?: { key: string, direction: SortDirection },
  onSort: (key: string) => void
};

type State = {};

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
