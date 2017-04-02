# Table

This is optimized table list, which only renderer what is visible, and reuse the data that are already rendered.

[Demo Codepen](http://codepen.io/jamalsoueidan/pen/peqyRb?editors=0110)

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
