import React from 'react'
import data from './data'
import TableX from 'components/table_x'

const columns = [
  {
    attribute: 'id',
    displayName: '#',
    visibility: true
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

export default class Example extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      page: 1,
      perPage: 10,
      columns
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

  onChange(column) {
    const { columns } = this.state;
    if(column.visibility && columns.filter(c => c.visibility).length===1) {
      return;
    }

    const newColumns = [...columns].map(c => {
      if(c.attribute === column.attribute) {
        c.visibility = (c.visibility ? false : true);
      }
      return c;
    })

    this.setState({columns: newColumns})
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
        </div>
        <div className="filtering">
          <h2>Filtering</h2>
          {columns.map(c=> {
            return(<div key={c.attribute}><label htmlFor={c.attribute}><input id={c.attribute} type="checkbox" name={c.attribute} checked={c.visibility} onChange={this.onChange.bind(this, c)} />{c.displayName}</label></div>)
          })}
        </div>
      </div>
    )
  }

  render() {
    return(
      <TableX data={data} columns={this.state.columns} perPage={this.state.perPage} currentPage={this.state.page} />
    )
  }
}
