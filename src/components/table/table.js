import React from 'react'
import Header from './header'
import List from './list'

require('./stylesheet.css')

export default class Table extends React.Component {
  render() {
    const {data, rowRenderer, selected, columns} = this.props;

    return(
      <div className="table">
        <Header rowRenderer={rowRenderer} columns={columns} />
        <List data={data} rowRenderer={rowRenderer} columns={columns} selected={selected} />
      </div>
    )
  }
}
