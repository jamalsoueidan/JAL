import React from 'react'
import Table from 'components/table'

const items = [];
for(var i=0; i<100; i++) {
  items.push({id: i, name: "jamal " + i})
}

const itemRenderer = (rowHeight, selected) => (item) => {
  let style = {height: `${rowHeight}px`, lineHeight: `${rowHeight}px`}

  if(selected && selected.id === item.id) {
    style["backgroundColor"] = "#ff0040"
  }

  return(
    <tr key={item.id} style={style}>
      <td>{item.name}</td>
    </tr>
  )
}

export default class Example extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      page: 0
    }
  }

  onPageClick(page) {
    this.setState({page})
  }

  get renderPages() {
    const totalPages = Math.ceil(items.length / 30) + 1;
    let _ = [];
    for(var i=1; i<totalPages; i++) {
      _.push(<button key={i} onClick={this.onPageClick.bind(this, i)}>Page {i}</button>)
    }
    return _
  }

  render() {
    return(
      <div>
        <Table items={items} itemRenderer={itemRenderer} rowsPerPage={30} page={this.state.page} />
        {this.renderPages}
      </div>
    )
  }
}
