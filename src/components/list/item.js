import React from 'react'

class Item extends React.Component {
  render() {
    return(<div className="item">{this.props.children}</div>)
  }
}

Item.propTypes = {
  className: React.PropTypes.string,
  children: React.PropTypes.element.isRequired
}

Item.defaultProps = {
  className: "item"
}

export default Item
