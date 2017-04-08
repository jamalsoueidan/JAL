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
      <div className="header" style={props.style}>
        {props.columns.map((c) => {
          return(<div key={c.attribute}>{c.displayName}</div>)
        })}
      </div>
    )
  }

  return(
    <div key={item.id}  className="item" style={props.style}>
      <div>{item.id}</div>
      <div>{item.first_name}</div>
    </div>
  )
}

export default () => (
  <div className="customTable">
    <Table data={data} rowRenderer={rowRenderer} perPage={15} columns={columns} />
  </div>
)
