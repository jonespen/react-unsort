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
  render={({ getSortProps, getSortDirectionFor }) => {
    return (
      <table>
        <thead>
          <tr>
            <th {...getSortProps("name")}>
              Name <span>{getSortDirectionFor("name")}</span>
            </th>
            <th {...getSortProps("age")}>
              Age <span>{getSortDirectionFor("age")}</span>
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
/>;
```

## Motivation

There are [other, more advanced solutions](https://reactabular.js.org/) to this
problem, but I found them way to bloated and hard to style, especially using
styled-components.

## Credits

Thanks to [Kent C. Dodds](https://github.com/kentcdodds/) for his work on
Downshift, which greatly inspired this lib.
