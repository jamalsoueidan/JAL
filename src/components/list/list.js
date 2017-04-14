import React from 'react'
import Item from './item'
import cn from 'classNames'

class List extends React.Component {
  get renderItems() {
    let _children = this.props.children
    if(_children) return _children

    const { className, data, itemRenderer, options } = this.props;
    let itemClassName;
    if(className) {
      itemClassName = className + "-item"
    }

    if(data) {
      return data.map((item, index) => <Item key={index} className={itemClassName}>{itemRenderer(item, options)}</Item>)
    }
  }

  render() {
    const { className, style } = this.props;
    return(
      <div className={cn("list", className)} style={style}>
        {this.renderItems}
      </div>
    )
  }
}

List.propTypes = {
  className: React.PropTypes.string,
  style: React.PropTypes.object,
  itemRenderer: React.PropTypes.func,
  data: React.PropTypes.array
}

List.defaultProps = {
  itemRenderer: (data) => data
}

export default List
