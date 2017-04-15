# Table

This is simple table component, but can handle huge dataset. [Try codepen](http://codepen.io/jamalsoueidan/pen/peqyRb?editors=0110)

It was designed to be extensible, if you need more features, you can use build them.

We provided you with example sorting, paginate, filtering in TableX, etc.

![](https://github.com/jamalsoueidan/react-application-library/blob/master/src/components/table/screenshot.png?raw=true)

## Examples

```js
const columns = [
  {
    attribute: 'id',
    displayName: '#',
  },
  {
    attribute: 'first_name',
    displayName: 'First Name',
  }
]


const rowRenderer = (item, props) => {
  if(props.type === "thead") {
    return(
      <tr>
        {props.columns.map((c) => {
          return(<td key={c.attribute} style={props.style}><div>{c.displayName}</div></td>)
        })}
      </tr>
    )
  }

  return(
    <tr key={item.id}>
      <td style={props.style}>
        <div>{item.id}</div>
      </td>
      <td style={props.style}>
        <div>{item.first_name}</div>
      </td>
    </tr>
  )
}

export default () => (
  <div className="customTable">
    <Table data={data} rowRenderer={rowRenderer} perPage={15} columns={columns} />
  </div>
)
```

## Requires

- List

## Features

- Validates columns and data columns is same!
- Customize so it works with API calls while scrolling!
- ...
