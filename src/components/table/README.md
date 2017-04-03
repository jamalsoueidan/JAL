# Table

This is simple table component, but can handle huge dataset. [Try codepen](http://codepen.io/jamalsoueidan/pen/peqyRb?editors=0110)

It was designed to be extensible, if you need more features, you can use build them.

We provided you with example sorting, paginate, dragdrop, etc.

![](https://github.com/jamalsoueidan/react-application-library/blob/master/src/components/table/screenshot.png?raw=true)

## Examples

```js
const data = [];
for(var i=0; i<100; i++) {
  data.push({id: i, name: "jamal " + i})
}

const rowRenderer = (rowHeight) => (item) => (
  <tr key={item.id} style={{height: `${rowHeight}px`}}><td>{item.name}</td></tr>
)

export default () => (
  <Table data={data} rowRenderer={rowRenderer} perPage={30} />
)
```

## Features

- Validates columns and data columns is same!
- Customize so it works with API calls while scrolling!
- ...
