import React from 'react'
import Position from './position'

export default class extends React.Component {
  constructor() {
    super(...arguments)
    this.state = {
      style: {
        visibility: 'hidden'
      }
    }
  }

  componentDidUpdate(prevProps, prevState) {
    let { style } = this.state
    if(style.visibility === "hidden") return;
    let positionLeft = Math.ceil(this.position.getStyle().left)
    let styleLeft = Math.ceil(style.left)

    if(positionLeft !== styleLeft) {
      this.calculateStyle();
    }
  }

  show(target) {
    this.target = target
    this.position = new Position({
      target: this.target,
      element: this
    })
    this.calculateStyle();
  }

  calculateStyle() {
    this.setState({
      style: this.position.getStyle(),
      className: this.position.getClassName()
    })
  }

  hide() {
    this.setState({
      style: {
        visibility: 'hidden'
      }
    })
  }

  render() {
    return(<div className={"dropdown " + this.state.className} style={this.state.style}>{this.props.children}</div>)
  }
}
