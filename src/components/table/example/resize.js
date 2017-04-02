import React from 'react'
import { findDOMNode } from 'react-dom'

export default class Resize extends React.Component {
  constructor(props) {
    super(props)
    this.onMouseMove = this.onMouseMove.bind(this)
    this.onMouseUp = this.onMouseUp.bind(this)
    this.onMouseDown = this.onMouseDown.bind(this)
    this.onMouseOut = this.onMouseOut.bind(this)
  }

  get node() {
    return findDOMNode(this)
  }

  onMouseDown(evt) {
    this.startX = evt.clientX;
    evt.preventDefault();
    evt.stopPropagation();
    this.node.addEventListener('mousemove', this.onMouseMove, false)
    this.node.addEventListener('mouseup', this.onMouseUp, false)
    this.node.addEventListener('mouseout', this.onMouseOut, false)
  }

  onMouseMove(evt) {
    const movement = evt.clientX - this.startX;
    this.props.onResize(movement)
  }

  onMouseOut() {
    this.onMouseUp();
  }

  onMouseUp(evt) {
    this.props.onResize() // tell the parent component we are done this round!
    this.node.removeEventListener('mousemove', this.onMouseMove, false)
    this.node.removeEventListener('mouseup', this.onMouseUp, false)
    this.node.removeEventListener('mouseout', this.onMouseOut, false)
  }

  render() {
    return(
      <div className="resize" onClick={(evt) => evt.stopPropagation()}></div>
    )
  }

  componentDidMount() {
    this.node.addEventListener('mousedown', this.onMouseDown, false)
  }
}
