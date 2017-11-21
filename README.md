# react-unsort

Render prop component for accessible sorting.

## The problem

You want to sort something in react (e.g. a list or some table rows), and have
full control over styling.

## This solution

This follows the patterns in [downshift](https://github.com/paypal/downshift) to
expose an API that renders nothing and simply encapsulates the logic of a
sorting component. Note that it doesn't do any actual sorting, thats entirely up
to you.

## Installation

```sh
npm install react-unsort
```

> This package also depends on react. Please make sure you have that installed
> as well.

## Usage

Todo: fill out this with props and stuff

```js
<Unsort
  {...props}
  render={({ getSortProps, sortKey, sortDirection }) => {
    return (
      <table>
        <thead>
          <tr>
            <th {...getSortProps("name")}>
              Name <span>{sortKey === "name" && sortDirection}</span>
            </th>
            <th {...getSortProps("age")}>
              Age <span>{sortKey === "age" && sortDirection}</span>
            </th>
            <th>Country (not sortable)</th>
          </tr>
        </thead>
        <tbody>
          {rows.map(row => {
            return (
              <tr key={row.id}>
                <td>{row.name}</td>
                <td>{row.age}</td>
                <td>{row.country}</td>
              </tr>
            );
          })}
        </tbody>
      </table>
    );
  }}
/>
```

## Props

### `render:(RenderProps) => React.Node`
This is where you render whatever you want to based on the state of react-unsort.

Gets the following props:
```
getSortProps: (key: string) => SortProps
sortKey: ?string
sortDirection: ?SortDirection
```

### `onSort:({ sortKey: ?string, sortDirection: "asc" | "desc" | null }) => void`
Called when the element with `getSortProps` applied is clicked or enter key is pressed.

## Motivation

There are [other, more advanced solutions](https://reactabular.js.org/) to this
problem, but I found them way to bloated and hard to style, especially using
styled-components.

## Credits

Thanks to [Kent C. Dodds](https://github.com/kentcdodds/) for his work on
Downshift, which greatly inspired this lib.
