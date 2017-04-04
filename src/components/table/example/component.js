import React from 'react'
import Table from 'components/table'
import THead from './thead'
import TBody from './tbody'

import data from './data'

require('./stylesheet.css')

const columns = [
  {
    attribute: 'id',
    displayName: '#',
    visibility: false
  },
  {
    attribute: 'first_name',
    displayName: 'First Name',
    visibility: true
  },
  {
    attribute: 'last_name',
    displayName: 'Last Name',
    visibility: true
  },
  {
    attribute: 'gender',
    displayName: 'Gender',
    visibility: true
  }
]

const rowRenderer = (item, props) => {
  if(props.type === "thead") {
    return <THead columns={props.columns} {...props} />
  } else {
    return <TBody key={item.id} item={item} columns={props.columns} {...props} />
  }
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
    const perPage = [5, 10,15,40];
    return perPage.map(perPage =>
      <button key={perPage} onClick={this.onPerPageClick.bind(this, perPage)}>perPage {perPage}</button>
    )
  }

  onChangeInput(evt) {
    this.onPageClick(evt.target.value);
  }

  get renderPaginate() {
    return(
      <div className="positionRight">
        <div className="paginate">
          Total pages: <strong>{this.totalPages-1}</strong><br />
          Total rows: <strong>{data.length}</strong><br />
          Current page: <strong>{this.state.page}</strong><br />
          <button onClick={this.onPageClick.bind(this, (this.state.page-1))}>Prev</button>
          <button onClick={this.onPageClick.bind(this, this.state.page+1)}>Next</button><br />
          <input type="text" onChange={this.onChangeInput.bind(this)} />
        </div>
        <div className="filtering">
          <h2>Filtering</h2>
          {columns.map(c=> {
            return(<div key={c.attribute}><input type="checkbox" name={c.attribute} onChange={() => c.visibility = !c.visibility} checked={(c.visibility ? "checked" : "")}/>{c.displayName}</div>)
          })}
        </div>
      </div>
    )
  }

  render() {
    return(
      <div>
        <div className="border">
          <Table data={data} columns={columns} rowRenderer={rowRenderer} perPage={this.state.perPage} currentPage={this.state.page} />
        </div>
        {this.renderperPage} <br />
        {this.renderPaginate}
      </div>
    )
  }
}
