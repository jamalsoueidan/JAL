import React from 'react'
import { findDOMNode } from 'react-dom'
import cn from 'classNames'

//TODO one callback for all events, send type with the event
// this.props.handler({type: evt.type})

class Resizer extends React.Component {
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
    this.from = {clientX: evt.clientX, clientY: evt.clientY }
    window.addEventListener('mousemove', this.onMouseMove, false);
    window.addEventListener('mouseup', this.onMouseUp, false);
    const onDragStart = this.props.onDragStart
    if(onDragStart) {
      onDragStart({from: this.from})
    }
  }

  onMouseMove(evt) {
    const to = { clientX: evt.clientX, clientY: evt.clientY }
    this.props.onDrag({from: this.from, to})
  }

  onMouseUp(evt) {
    this.props.onDragEnd();
    window.removeEventListener('mousemove', this.onMouseMove, false);
    window.removeEventListener('mouseup', this.onMouseUp, false);
  }

  render() {
    return(<div className={cn("divider", this.props.className)}></div>)
  }

  componentDidMount() {
    this.node.addEventListener('mousedown', this.onMouseDown, false)
  }
}

Resizer.propTypes = {
  className: React.PropTypes.string,
  onDragStart: React.PropTypes.func,
  onDrag: React.PropTypes.func,
  onDragEnd: React.PropTypes.func
};

export default Resizer
