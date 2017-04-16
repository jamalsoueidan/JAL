import React from 'react'
import Table from 'components/table'

require('./stylesheet.css')

let data = []

for(var i=1; i<1001; i++) {
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
  <Table className="customTable" data={data} rowRenderer={rowRenderer} columns={columns} select={{id:500}} />
)
