import React from 'react'
import Table from 'components/table'

require('./stylesheet.css')

let data = []

for(var i=1; i<1000000; i++) {
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

export default class extends React.Component {
  constructor() {
    super();
    this.state = {select: {id: null}}
  }
  onClick() {
    this.setState({
      select: {
        id: Math.floor(Math.random()*1000)
      }
    })
  }

  render() {
    return(
      <div>
        <Table className="customTable" data={data} rowRenderer={rowRenderer} columns={columns} select={this.state.select}/>
        <button onClick={this.onClick.bind(this)}>{this.state.select.id}</button>
      </div>
    )
  }
}
