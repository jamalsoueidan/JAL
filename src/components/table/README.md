# Table

This is simple table component, but can handle huge dataset. [Try codepen](http://codepen.io/jamalsoueidan/pen/peqyRb?editors=0110)

It was designed to be extensible, if you need more features, you can use build them.

We provided you with example sorting, paginate, filtering in TableX, etc.

![](https://github.com/jamalsoueidan/react-application-library/blob/master/src/components/table/screenshot.png?raw=true)

Responsive

![](https://github.com/jamalsoueidan/react-application-library/blob/master/src/components/table/screenshot1.png?raw=true)

## Examples

```js
let data = []

for(var i=1; i<1000; i++) {
  data.push({id: i, first_name: "jamal"})
}

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
  if(props.type === "header") {
    return(
      <div className="header">
        {props.columns.map((c) => {
          return(<div className="column" key={c.attribute}>{c.displayName}</div>)
        })}
      </div>
    )
  }

  return(
    <div className="row">
      {props.columns.map((c) => (
        <div key={c.attribute} className="column">
          <div className="attribute">{c.displayName}:</div>
          <div className="value">{item[c.attribute]}</div>
        </div>
      ))}
    </div>
  )
}

export default () => (
  <Table className="customTable" data={data} rowRenderer={rowRenderer} columns={columns} />
)
```

## Requires

- List

## Features

- Validates columns and data columns is same!
- Customize so it works with API calls while scrolling!
- ...
