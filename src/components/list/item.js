import React from 'react'

class Item extends React.Component {
  render() {
    return(<div className="item">{this.props.children}</div>)
  }
}

export default Item
