import React from 'react'
import Resizer from './resizer'
import { findDOMNode } from 'react-dom'

class Pane extends React.Component {
  constructor(props) {
    super(props)
    this.state = { style: { flex: "1 1 auto" }};
  }

   onMove(startX, clientX) {
    const { children, resizeHandler, index } = this.props;
    const node = findDOMNode(this)
    const width = startX + (clientX - startX)
    this.setState({style: {
      width: width + "px"
    }})
  }

  render() {
    const { showResizer } = this.props;
    console.log("newStyle", this.state.style)
    return(
      <div className="pane" style={this.state.style}>
        <div className="pane-content">{this.props.children}</div>
        <Resizer className="pane-divider" onMove={this.onMove.bind(this)} />
       </div>
    )
  }
}

export default Pane
