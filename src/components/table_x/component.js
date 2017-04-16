import React from 'react'
import Table from 'components/table'
import Header from './header'
import Row from './row'

require('./stylesheet.css')

export default class TableX extends React.Component {
  rowRenderer(item, props) {
    if(props.type === "header") {
      return <Header {...props} />
    } else {
      return <Row key={item.id} item={item} {...props} />
    }
  }

  render() {
    const { data, columns } = this.props;
    return(
      <Table className="tableX" data={data} columns={columns} rowRenderer={this.rowRenderer.bind(this)}  />
    )
  }
}
