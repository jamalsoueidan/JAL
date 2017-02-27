# List

Renderer list with items!

## Examples

```jsx
<List data={data}/>

<List data={data} itemRenderer={(item) => <div>{item}</div>} />

<List>
  <Item className="header">
    Header
  </Item>
  <List className="items" data={data} itemRenderer={(item) => <span className="testerne">{item}</span>} />
</List>
```
