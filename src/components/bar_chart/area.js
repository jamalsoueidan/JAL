import React from 'react'
import * as d3 from 'd3'

class Area extends React.Component {
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

export default Area
