import React from 'react'
import Item from './item'

class List extends React.Component {
  get children() {
    let _children = this.props.children
    if(_children) return _children

    let { data, itemRenderer } = this.props;
    if(data) {
      return data.map( (d,i) => {
        return(<Item key={i}>test</Item>)
      })
    }
  }

  render() {
    return(
      <div className="list">{this.children}</div>
    )
  }
}

export default List
