import React from 'react'

export default class Header extends React.Component {
  get header() {
    const { rowRenderer, columns } = this.props;
    return rowRenderer(null, {type: 'header', columns})
  }

  render() {
    const { columns } = this.props;
    if(!columns) return;

    return(
      <div className="table-header">
        {this.header}
      </div>
    )
  }
}
