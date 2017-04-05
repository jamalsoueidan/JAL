import React from 'react'
import Resizer from './resizer'
import { findDOMNode } from 'react-dom'

class Pane extends React.Component {
  constructor(props) {
    super(props)
    this.state = { style: { flex: "1 1 auto" }};
  }

   onMove(clientX, index) {
    const { children, validateWidth } = this.props;
    const node = findDOMNode(this)
    let width = (this.width+clientX);
    const style = this.state.style;
    if(validateWidth(width)) {
      this.setState({style: { width, flex: "none"}})
    }
  }

  componentDidMount() {
    this.width = findDOMNode(this).clientWidth;
  }

  render() {
    const { showResizer } = this.props;

    return(
      <div className="pane" style={this.state.style}>
        <div className="pane-content">{this.props.children}</div>
        <Resizer className="pane-divider" onMove={this.onMove.bind(this)} />
       </div>
    )
  }
}

export default Pane
