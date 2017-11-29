// @flow

/* eslint-env jest */
/* eslint-disable react/display-name */

import * as React from "react";
import renderer from "react-test-renderer";
import { mount } from "enzyme";

import Unsort from "./src";

test("exist", () => {
  expect(typeof Unsort).toBe("function");
});

test("render prop renders content", () => {
  const json = renderer
    .create(<Unsort onSort={() => {}} render={() => <table />} />)
    .toJSON();
  expect(json).toMatchSnapshot();
});

describe("getTableProps", () => {
  const { getTableProps } = setup();
  expect(getTableProps()).toHaveProperty("role", "grid");
});

describe("getSortButtonProps", () => {
  const { getSortButtonProps } = setup();
  expect(getSortButtonProps()).toHaveProperty("role", "button");
  expect(getSortButtonProps()).toHaveProperty("tabIndex", 0);
});

describe("getSortButtonProps", () => {
  let getSortButtonProps;
  let getSortProps;
  let mockOnSort = jest.fn();
  beforeEach(() => {
    const s = setup({
      onSort: mockOnSort,
      initialSortKey: "foo",
      initialSortDirection: "ascending"
    });
    getSortProps = s.getSortProps;
    getSortButtonProps = s.getSortButtonProps;
  });
  afterEach(() => {
    mockOnSort.mockClear();
  });
  test("sets tabIndex", () => {
    expect(getSortButtonProps("foo").tabIndex).toBe(0);
  });
  test("onClick triggers onSort", () => {
    const fakeEvent = { target: null };
    const { onClick } = getSortButtonProps("foo");
    onClick(fakeEvent);
    expect(mockOnSort).toHaveBeenCalledTimes(1);
    expect(mockOnSort).toHaveBeenCalledWith({
      sortKey: "foo",
      sortDirection: "descending"
    });
  });
  test("onKeyUp triggers onSort if Enter have been pressed", () => {
    const fakeEvent = { target: null, keyCode: 13 };
    const { onKeyUp } = getSortButtonProps("foo");
    onKeyUp(fakeEvent);
    expect(mockOnSort).toHaveBeenCalledTimes(1);
    expect(mockOnSort).toHaveBeenCalledWith({
      sortKey: "foo",
      sortDirection: "descending"
    });
  });
  test("onSort sets sortDirection in the right order", () => {
    const fakeEvent = { target: null };
    const { onClick } = getSortButtonProps("foo");
    onClick(fakeEvent);
    onClick(fakeEvent);
    onClick(fakeEvent);
    expect(mockOnSort).toHaveBeenCalledTimes(3);
    expect(mockOnSort.mock.calls).toEqual([
      [{ sortKey: "foo", sortDirection: "descending" }],
      [{ sortKey: "foo", sortDirection: "none" }],
      [{ sortKey: "foo", sortDirection: "ascending" }]
    ]);
  });
  describe("aria-sort", () => {
    test("sets aria-sort if key is sorted", () => {
      expect(getSortProps("foo")["aria-sort"]).toBe("ascending");
    });
    test("sets aria-sort to none if the sort direction is not set", () => {
      expect(getSortProps("bar")["aria-sort"]).toBe("none");
    });
  });
});

test("onClick should go to next sortDirection", () => {
  const { getSortButtonProps, renderSpy } = setup({
    initialSortKey: "foo",
    initialSortDirection: "ascending"
  });
  const { onClick } = getSortButtonProps("foo");
  onClick();
  expect(renderSpy).toHaveBeenLastCalledWith(
    expect.objectContaining({ sortDirection: "descending" })
  );
  onClick();
  expect(renderSpy).toHaveBeenLastCalledWith(
    expect.objectContaining({ sortDirection: "none", sortKey: "foo" })
  );
  onClick();
  expect(renderSpy).toHaveBeenLastCalledWith(
    expect.objectContaining({ sortDirection: "ascending", sortKey: "foo" })
  );
});

test("change sort key should reset sort direction", () => {
  const { getSortButtonProps, renderSpy } = setup({
    initialSortKey: "foo",
    initialSortDirection: "ascending"
  });
  const { onClick } = getSortButtonProps("bar");
  onClick();
  expect(renderSpy).toHaveBeenLastCalledWith(
    expect.objectContaining({ sortDirection: "ascending", sortKey: "bar" })
  );
});

test("sortKey is inherited from initialSortKey", () => {
  const { sortKey } = setup({
    onSort: jest.fn(),
    initialSortKey: "foo"
  });
  expect(sortKey).toBe("foo");
});

test("sortDirection is inherited from initialSortDirection", () => {
  const { sortDirection } = setup({
    onSort: jest.fn(),
    initialSortDirection: "ascending"
  });
  expect(sortDirection).toBe("ascending");
});

function setup(
  { render = () => <div />, onSort = jest.fn(), ...props }: any = {}
) {
  let renderArg;
  const renderSpy = jest.fn(controllerArg => {
    renderArg = controllerArg;
    return render(controllerArg);
  });
  const wrapper = mount(
    <Unsort onSort={onSort} {...props} render={renderSpy} />
  );
  return { renderSpy, wrapper, ...renderArg };
}
