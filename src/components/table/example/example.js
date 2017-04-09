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
  if(props.type === "header") {
    return(
      <div className="customHeader">
        {props.columns.map((c) => {
          return(<div key={c.attribute}>{c.displayName}</div>)
        })}
      </div>
    )
  }

  return(
    <div className="customItem">
      <div>{item.id}</div>
      <div>{item.first_name}</div>
    </div>
  )
}

export default () => (
  <div className="customTable">
    <Table data={data} rowRenderer={rowRenderer} rowHeight={40} columns={columns} />
  </div>
)
