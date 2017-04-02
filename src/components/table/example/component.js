import React from 'react'
import Table from 'components/table'

const items = [];
for(var i=0; i<100; i++) {
  items.push({id: i, name: "jamal " + i, random: Math.random()*i})
}

const itemRenderer = (rowHeight, selected) => (item) => {
  let style = {height: `${rowHeight}px`, lineHeight: `${rowHeight}px`}

  if(selected && selected.id === item.id) {
    style["backgroundColor"] = "#ff0040"
  }

  return(
    <tr key={item.id} style={style}>
      <td>{item.id}</td>
      <td>{item.name}</td>
      <td>{item.random}</td>
    </tr>
  )
}

export default class Example extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      page: 0,
      rowsPerPage: 20
    }
  }

  onPageClick(page) {
    this.setState({page})
  }

  onPerPageClick(rowsPerPage) {
    this.setState({rowsPerPage})
  }

  get renderPages() {
    const totalPages = Math.ceil(items.length / this.state.rowsPerPage) + 1;
    let _ = [];
    for(var i=1; i<totalPages; i++) {
      _.push(<button key={i} onClick={this.onPageClick.bind(this, i)}>Page {i}</button>)
    }
    return _
  }

  get renderRowsPerPage() {
    const rowsPerPage = [10,15,20,25];
    return rowsPerPage.map(perPage =>
      <button key={perPage} onClick={this.onPerPageClick.bind(this, perPage)}>rowsPerPage {perPage}</button>
    )
  }

  render() {
    return(
      <div>
        <Table items={items} itemRenderer={itemRenderer} rowsPerPage={this.state.rowsPerPage} page={this.state.page} />
        {this.renderRowsPerPage} <br />
        {this.renderPages}
      </div>
    )
  }
}
