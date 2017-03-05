import React from 'react'

export default class Area extends React.Component {
  render() {
    let attributes = {
      transform: `translate(${this.props.left}, ${this.props.top})`,
    }

    return(
      <g {...attributes}>
        {this.props.children}
      </g>
    )
  }
}
