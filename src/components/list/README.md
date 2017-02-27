# List

Renderer list with items!

![](https://github.com/jamalsoueidan/react-application-library/blob/master/src/components/list/screenshot.png?raw=true)

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
