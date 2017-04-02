import React from 'react'
import Table from 'components/table'

require('./stylesheet.css')

const items = [];
for(var i=0; i<500; i++) {
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
      page: 1,
      rowsPerPage: 10
    }
  }

  onPageClick(page) {
    if(page > 0 && page < this.totalPages) {
      this.setState({page})
    }
  }

  get totalPages() {
    return Math.ceil(items.length / this.state.rowsPerPage) + 1;
  }

  onPerPageClick(rowsPerPage) {
    this.setState({rowsPerPage, page: 1})
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

  onChangeInput(evt) {
    this.onPageClick(evt.target.value);
  }

  get renderPaginate() {
    return(
      <div className="paginate">
        Current page: {this.state.page}<br />
        Total pages: {this.totalPages-1}<br />
        <button onClick={this.onPageClick.bind(this, (this.state.page-1))}>Prev</button>
        <button onClick={this.onPageClick.bind(this, this.state.page+1)}>Next</button><br />
        <input type="text" onChange={this.onChangeInput.bind(this)} />
      </div>
    )
  }

  render() {
    return(
      <div>
        <div className="border">
          <Table items={items} itemRenderer={itemRenderer} rowsPerPage={this.state.rowsPerPage} page={this.state.page} />
        </div>
        {this.renderRowsPerPage} <br />
        {this.renderPaginate}
      </div>
    )
  }
}
