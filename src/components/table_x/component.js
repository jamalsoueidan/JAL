import React from 'react'
import Table from 'components/table'
import THead from './thead'
import TBody from './tbody'

require('./stylesheet.css')

const rowRenderer = (item, props) => {
  if(props.type === "thead") {
    return <THead columns={props.columns} {...props} />
  } else {
    return <TBody key={item.id} item={item} columns={props.columns} {...props} />
  }
}

export default class TableX extends React.Component {
  render() {
    const {data, columns, perPage, currentPage} = this.props;
    return(
      <Table data={data} columns={columns} rowRenderer={rowRenderer} perPage={perPage} currentPage={currentPage} />
    )
  }
}
