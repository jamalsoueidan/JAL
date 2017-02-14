import React from 'react'
import Position from './position'
import cn from 'classNames'

const style = {
  visibility: 'hidden',
  position: 'fixed',
  zIndex: '10000'
}
export default (WrapperComponent) => {
  return class extends React.Component {
    constructor() {
      super(...arguments)
      this.state = { style }
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
        dropdown: this
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
      this.setState({style})
    }

    render() {
      let { style, className } = this.state
      let classNames = cn(className)
      return(
        <WrapperComponent style={style}>
          {this.props.children}
        </WrapperComponent>
      )
    }
  }
}
