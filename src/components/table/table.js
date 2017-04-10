import React from 'react'
import Header from './header'
import List from './list'

require('./stylesheet.css')

class Table extends React.Component {
  render() {
    const {data, columns, perPage, rowRenderer, selected} = this.props;

    return(
      <div className="table">
        <Header rowRenderer={rowRenderer} columns={columns} />
        <List data={data} rowRenderer={rowRenderer} columns={columns} selected={selected} perPage={perPage} />
      </div>
    )
  }
}

Table.propTypes = {
  columns: React.PropTypes.array.isRequired,
  data: React.PropTypes.array.isRequired,
  perPage: React.PropTypes.number.isRequired,
  rowRenderer: React.PropTypes.func.isRequired,
  selected: React.PropTypes.object
};

Table.defaultProps = {
  perPage: 30
}

export default Table
