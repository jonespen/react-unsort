// @flow

import * as React from "react";
import { storiesOf, action } from "@storybook/react";
import Unsort from "../src";
import { Table, initialRows, type Row } from "./table";

type Props = { initialRows: Row[] };
type State = { rows: Row[] };

const compare = key => (a, b) => {
  if (a && b && a.hasOwnProperty(key) && b.hasOwnProperty(key)) {
    if (a[key] < b[key]) return -1;
    if (a[key] > b[key]) return 1;
  }
  return 0;
};

class WithSorting extends React.Component<Props, State> {
  constructor(props) {
    super(props);
    this.state = {
      rows: this.props.initialRows
    };
  }
  onSort = ({ sortKey, sortDirection }) => {
    if (!sortKey) {
      this.setState({ rows: this.props.initialRows });
    }

    const rows = this.state.rows.sort(compare(sortKey));

    if (sortDirection === "desc") {
      rows.reverse();
    }

    this.setState({ rows });
  };
  render() {
    return <Table rows={this.state.rows} onSort={this.onSort} />;
  }
}

storiesOf("With sorting", module).add("basic", () => (
  <WithSorting initialRows={initialRows} />
));
