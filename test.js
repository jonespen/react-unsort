// @flow

/* eslint-env jest */
/* eslint-disable react/display-name */

import * as React from "react";
import renderer from "react-test-renderer";
import { mount } from "enzyme";

import Unsort, { ariaSortMap } from "./src";

test("exist", () => {
  expect(typeof Unsort).toBe("function");
});

test("export ariaSortMap", () => {
  expect(ariaSortMap).toBeDefined();
});

test("render prop renders content", () => {
  const json = renderer
    .create(<Unsort onSort={() => {}} render={() => <table />} />)
    .toJSON();
  expect(json).toMatchSnapshot();
});

describe("getSortProps", () => {
  let getSortProps;
  let mockOnSort = jest.fn();
  beforeEach(() => {
    getSortProps = setup({
      onSort: mockOnSort,
      initialSortKey: "foo",
      initialSortDirection: "asc"
    }).getSortProps;
  });
  afterEach(() => {
    mockOnSort.mockClear();
  });
  test("sets tabIndex", () => {
    expect(getSortProps("foo").tabIndex).toBe(0);
  });
  test("onClick triggers onSort", () => {
    const fakeEvent = { target: null };
    const { onClick } = getSortProps("foo");
    onClick(fakeEvent);
    expect(mockOnSort).toHaveBeenCalledTimes(1);
    expect(mockOnSort).toHaveBeenCalledWith({
      sortKey: "foo",
      sortDirection: "desc"
    });
  });
  test("onKeyUp triggers onSort if Enter have been pressed", () => {
    const fakeEvent = { target: null, keyCode: 13 };
    const { onKeyUp } = getSortProps("foo");
    onKeyUp(fakeEvent);
    expect(mockOnSort).toHaveBeenCalledTimes(1);
    expect(mockOnSort).toHaveBeenCalledWith({
      sortKey: "foo",
      sortDirection: "desc"
    });
  });
  test("onSort sets sortDirection in the right order", () => {
    const fakeEvent = { target: null };
    const { onClick } = getSortProps("foo");
    onClick(fakeEvent);
    onClick(fakeEvent);
    onClick(fakeEvent);
    expect(mockOnSort).toHaveBeenCalledTimes(3);
    expect(mockOnSort.mock.calls).toEqual([
      [{ sortKey: "foo", sortDirection: "desc" }],
      [{ sortKey: null, sortDirection: null }],
      [{ sortKey: "foo", sortDirection: "asc" }]
    ]);
  });
  describe("aria-sort", () => {
    test("sets aria-sort if key is sorted", () => {
      expect(getSortProps("foo")["aria-sort"]).toBe("ascending");
    });
    test("does not set aria-sort if key is not sorted", () => {
      expect(getSortProps("bar")["aria-sort"]).toBeUndefined();
    });
  });
});

test("onClick should go to next sortDirection", () => {
  const { getSortProps, renderSpy } = setup({
    initialSortKey: "foo",
    initialSortDirection: "asc"
  });
  const { onClick } = getSortProps("foo");
  onClick();
  expect(renderSpy).toHaveBeenLastCalledWith(
    expect.objectContaining({ sortDirection: "desc" })
  );
  onClick();
  expect(renderSpy).toHaveBeenLastCalledWith(
    expect.objectContaining({ sortDirection: null, sortKey: null })
  );
  onClick();
  expect(renderSpy).toHaveBeenLastCalledWith(
    expect.objectContaining({ sortDirection: "asc", sortKey: "foo" })
  );
});

test("change sort key should reset sort direction", () => {
  const { getSortProps, renderSpy } = setup({
    initialSortKey: "foo",
    initialSortDirection: "asc"
  });
  const { onClick } = getSortProps("bar");
  onClick();
  expect(renderSpy).toHaveBeenLastCalledWith(
    expect.objectContaining({ sortDirection: "asc", sortKey: "bar" })
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
    initialSortDirection: "asc"
  });
  expect(sortDirection).toBe("asc");
});

function setup(
  {
    render = (renderArgs: any) => <div />,
    onSort = jest.fn(),
    ...props
  }: any = {}
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
