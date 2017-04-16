import React from 'react'

class Header extends React.Component {
  get header() {
    const { rowRenderer, options } = this.props;
    return rowRenderer(null, options)
  }

  render() {
    const options = this.props.options;
    if(!options.columns) return;

    return(
      <div className="table-header">
        {this.header}
      </div>
    )
  }

  shouldComponentUpdate() {
    return false;
  }
}

Header.propTypes = {
  options: React.PropTypes.object,
  rowRenderer: React.PropTypes.func.isRequired
};

export default Header
