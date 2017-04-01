import React from 'react'
import Table from 'components/table'

const items = [];
for(var i=0; i<100; i++) {
  items.push({id: i, name: "jamal " + i})
}

const itemRenderer = (rowHeight) => (item) => (
  <tr key={item.id} style={{height: `${rowHeight}px`}}><td>{item.name}</td></tr>
)

export default () => (
  <Table items={items} itemRenderer={itemRenderer} rowsPerPage={30} />
)
