# Table

This is optimized table list, which only renderer what is visible, and reuse the items that are already rendered.

[Demo Codepen](http://codepen.io/jamalsoueidan/pen/peqyRb?editors=0110)

## Examples

```js
const items = [];
for(var i=0; i<100; i++) {
  items.push({id: i, name: "jamal " + i})
}

const itemRenderer = (rowHeight) => (item) => (
  <tr key={item.id} style={{height: `${rowHeight}px`}}><td>{item.name}</td></tr>
)

export default () => (
  <Table items={items} itemRenderer={itemRenderer} rowsPerPage={30} />
)
```
