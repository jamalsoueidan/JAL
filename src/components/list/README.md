# List

Renderer list with items!

## Examples

```jsx
<List data={data} itemRenderer={(item) => item}/>

<List>
  <Item className="header">
    Header
  </Item>
  <List className="items" data={data} itemRenderer={(item) => item} />
</List>
```
