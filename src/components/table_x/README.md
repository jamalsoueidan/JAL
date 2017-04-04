# TableX

We added more features to TableX with sorting, filtering, paginate, and we would add soon drag/drop columns!

![](https://github.com/jamalsoueidan/react-application-library/blob/master/src/components/table_x/screenshot.png?raw=true)

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


export default () => (
  <div className="customTable">
    <TableX data={data} columns={columns} perPage={15} />
  </div>
)
```

## Features

- Drag/Drop
- ...
