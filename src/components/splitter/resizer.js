import React from 'react'
import { findDOMNode } from 'react-dom'
import cn from 'classNames'

//TODO one callback for all events, send type with the event
// this.props.handler({type: evt.type})

class Resizer extends React.Component {
  constructor(props) {
    super(props)
    this.state = {}
    this.onMouseMove = this.onMouseMove.bind(this)
    this.onMouseUp = this.onMouseUp.bind(this)
    this.onMouseDown = this.onMouseDown.bind(this)
  }

  get node() {
    return findDOMNode(this)
  }

  onMouseDown(evt) {
    evt.preventDefault();
    evt.stopPropagation();
    this.from = evt.clientX;
    window.addEventListener('mousemove', this.onMouseMove, false);
    window.addEventListener('mouseup', this.onMouseUp, false);
  }

  onMouseMove(evt) {
    const to = evt.clientX
    this.props.onMove(this.from, to)
  }

  onMouseUp(evt) {
    this.props.onMove();
    window.removeEventListener('mousemove', this.onMouseMove, false);
    window.removeEventListener('mouseup', this.onMouseUp, false);
  }

  render() {
    let style = {}
    if(this.state.left) {
      style['left'] = this.state.left;
    }

    const className = cn("divider", this.props.className)
    return(<div className={className} style={style}></div>)
  }

  componentDidMount() {
    this.node.addEventListener('mousedown', this.onMouseDown, false)
  }
}

export default Resizer
