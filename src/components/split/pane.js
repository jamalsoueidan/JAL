import React from 'react'
import Resizer from './resizer'
import { findDOMNode } from 'react-dom'

class Pane extends React.Component {
  constructor(props) {
    super(props)
    this.state = { style: { flex: "1 1 auto" }};
  }

   onMove(moves) {
    const { children, resizeHandler, index } = this.props;
    resizeHandler(moves, index)
  }

  render() {
    const { showResizer, style} = this.props;
    console.log("newStyle", style)
    return(
      <div className="pane" style={style}>
        <div className="pane-content">{this.props.children}</div>
        <Resizer className="pane-divider" onMove={this.onMove.bind(this)} />
       </div>
    )
  }
}

export default Pane
