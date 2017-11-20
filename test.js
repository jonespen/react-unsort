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
      sortBy: { key: "foo", direction: "asc" }
    }).getSortProps;
  });
  afterEach(() => {
    mockOnSort.mockClear();
  });
  test("sets tabIndex", () => {
    expect(getSortProps("foo").tabIndex).toBe(0);
  });
  test("passes down direction, can be used for styling", () => {
    expect(getSortProps("foo").direction).toBe("asc");
  });
  test("onClick triggers onSort", () => {
    const fakeEvent = { target: null };
    const { onClick } = getSortProps("foo");
    onClick(fakeEvent);
    expect(mockOnSort).toHaveBeenCalledTimes(1);
    expect(mockOnSort).toHaveBeenCalledWith("foo");
  });
  test("onKeyUp triggers onSort if Enter have been pressed", () => {
    const fakeEvent = { target: null, key: "Enter" };
    const { onKeyUp } = getSortProps("foo");
    onKeyUp(fakeEvent);
    expect(mockOnSort).toHaveBeenCalledTimes(1);
    expect(mockOnSort).toHaveBeenCalledWith("foo");
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

// $FlowFixMe: not sure how to type this
function setup({ render = () => <div />, ...props } = {}) {
  let renderArg;
  const renderSpy = jest.fn(controllerArg => {
    renderArg = controllerArg;
    // $FlowFixMe: not sure how to type this
    return render(controllerArg);
  });
  const wrapper = mount(<Unsort {...props} render={renderSpy} />);
  return { renderSpy, wrapper, ...renderArg };
}
