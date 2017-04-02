import React from 'react'
import Table from 'components/table'
import Column from './column'

import data from './data'

require('./stylesheet.css')

const columns = [
  {
    attribute: 'id',
    displayName: '#'
  },
  {
    attribute: 'first_name',
    displayName: 'first name'
  },
  {
    attribute: 'last_name',
    displayName: 'last name'
  },
  {
    attribute: 'gender',
    displayName: 'gender'
  }
]

const headRenderer = (props) => (item) => {
  let style = {height: `${props.rowHeight}px`, lineHeight: `${props.rowHeight}px`}

  return(
    <tr key="thead" style={style}>
      <Column item={item[0]} {...props} />
      <Column item={item[1]} {...props} />
      <Column item={item[2]} {...props} />
      <Column item={item[3]} {...props} />
    </tr>
  )
}

const rowRenderer = (props) => (item) => {
  if(props.type === "thead") {
    return headRenderer(props)(item)
  }

  let style = {height: `${props.rowHeight}px`, lineHeight: `${props.rowHeight}px`}

  if(props.selected && props.selected.id === item.id) {
    style["backgroundColor"] = "#ff0040"
  }

  return(
    <tr key={item.id} style={style}>
      <td>{item.id}</td>
      <td>{item.first_name}</td>
      <td>{item.last_name}</td>
      <td>{item.gender}</td>
    </tr>
  )
}

export default class Example extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      page: 1,
      perPage: 10
    }
  }

  onPageClick(page) {
    if(page > 0 && page < this.totalPages) {
      this.setState({page})
    }
  }

  get totalPages() {
    return Math.ceil(data.length / this.state.perPage) + 1;
  }

  onPerPageClick(perPage) {
    this.setState({perPage, page: 1})
  }

  get renderPages() {
    const totalPages = Math.ceil(data.length / this.state.perPage) + 1;
    let _ = [];
    for(var i=1; i<totalPages; i++) {
      _.push(<button key={i} onClick={this.onPageClick.bind(this, i)}>Page {i}</button>)
    }
    return _
  }

  get renderperPage() {
    const perPage = [10,15,20,25];
    return perPage.map(perPage =>
      <button key={perPage} onClick={this.onPerPageClick.bind(this, perPage)}>perPage {perPage}</button>
    )
  }

  onChangeInput(evt) {
    this.onPageClick(evt.target.value);
  }

  get renderPaginate() {
    return(
      <div className="paginate">
        Total pages: <strong>{this.totalPages-1}</strong><br />
        Total rows: <strong>{data.length}</strong><br />
        Current page: <strong>{this.state.page}</strong><br />
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
          <Table data={data} columns={columns} rowRenderer={rowRenderer} perPage={this.state.perPage} page={this.state.page} />
        </div>
        {this.renderperPage} <br />
        {this.renderPaginate}
      </div>
    )
  }
}
