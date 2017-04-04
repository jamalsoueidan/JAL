import React from 'react'
import data from './data'
import Table from 'components/table'

require('./stylesheet.css')

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
