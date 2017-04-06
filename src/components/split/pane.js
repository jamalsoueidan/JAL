import React from 'react'
import Resizer from './resizer'
import { findDOMNode } from 'react-dom'

class Pane extends React.Component {
  constructor(props) {
    super(props)
    this.state = { style: { flex: "1 1 auto" }};
  }

   onMove(from, to) {
    const { resizeHandler, index } = this.props;
    const element = findDOMNode(this).getBoundingClientRect();
    resizeHandler(from, to, element, index)
  }

  render() {
    const { showResizer, style} = this.props;
    return(
      <div className="pane" style={style}>
        <div className="pane-content">{this.props.children}</div>
        <Resizer className="pane-divider" onMove={this.onMove.bind(this)} />
       </div>
    )
  }
}

export default Pane
