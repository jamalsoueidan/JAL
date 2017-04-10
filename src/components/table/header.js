import React from 'react'

class Header extends React.Component {
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

Header.propTypes = {
  columns: React.PropTypes.array,
  rowRenderer: React.PropTypes.func.isRequired
};

export default Header
