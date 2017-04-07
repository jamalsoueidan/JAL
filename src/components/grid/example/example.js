import React from 'react'
import Grid from 'components/grid'

const items = [];
for(var i=1; i<250; i++) {
  items.push({
    id: i,
    name: "jamal " + i,
    random: Math.random()*i
  })
}

class Example extends React.Component {
  render() {
    return(<Grid items={items}  />)
  }
}

export default Example
