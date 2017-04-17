import React from 'react'
import cn from 'classNames'

class Item extends React.Component {
  render() {
    const { className, children } = this.props
    return(<div className={cn("item", className)}>{children}</div>)
  }
}

Item.propTypes = {
  className: React.PropTypes.string
}

export default Item
