import React from 'react'
import { findDOMNode } from 'react-dom'

export default class Resize extends React.Component {
  constructor(props) {
    super(props)
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
    this.startX = evt.clientX;
    window.addEventListener('mousemove', this.onMouseMove, false);
    window.addEventListener('mouseup', this.onMouseUp, false);
  }

  onMouseMove(evt) {
    if(!evt.clientX && isNan(evt.clientX)) return;
    this.props.onResize(evt.clientX)
  }

  onMouseUp(evt) {
    window.removeEventListener('mousemove', this.onMouseMove, false);
    window.removeEventListener('mouseup', this.onMouseUp, false);
  }

  render() {
    return(
      <div className="resize"></div>
    )
  }

  componentDidMount() {
    this.node.addEventListener('mousedown', this.onMouseDown, false)
  }
}
