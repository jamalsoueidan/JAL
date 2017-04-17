import React from 'react'
import Table from 'components/table'
import Header from './header'
import Row from './row'

require('./stylesheet.css')

export default class TableX extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      data: props.data
    }
    this.onSort = this.onSort.bind(this)
  }

  rowRenderer(item, props) {
    if(props.type === "header") {
      return <Header {...props} onSort={this.onSort} />
    } else {
      return <Row key={item.id} item={item} {...props} />
    }
  }

  onSort( attribute ) {
    const data = this.state.data
    const sort = (atttribute) => (a,b) => {
      if ( a[atttribute] < b[atttribute] )
         return 1;
      if ( a[atttribute] > b[atttribute] )
         return -1;

      return 0;
    }

    this.setState({data: [...data].sort(sort(attribute))})
  }


  render() {
    const { data, columns } = this.props;
    return(
      <Table className="tableX" data={this.state.data} columns={columns} rowRenderer={this.rowRenderer.bind(this)} />
    )
  }
}
