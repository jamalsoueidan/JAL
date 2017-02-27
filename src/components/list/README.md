# List

Renderer list with items!

## Examples

```jsx
<List data={data}/>

<List>
  <Item className="header">
    Header
  </Item>
  <List className="items" data={data} itemRenderer={(item) => <span className="testerne">{item}</span>} />
</List>
```
