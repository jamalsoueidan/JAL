import React from 'react'
import Pane from './pane'
import { findDOMNode } from 'react-dom'

class Split extends React.Component {
  constructor(props) {
    super(props)
    const percentWidth = this.props.children.length / 100;
    this.state = {
      percentWidth
    }
  }


  get renderPanes() {
    return this.props.children.map((c, index, arr) => {
      const showResizer = (index !== (arr.length-1))
      let movement = null;
      if(this.state.index === index) {
        movement = this.state.movement;
      }
      return(<Pane key={index} index={index} movement={movement} percentWidth={this.state.percentWidth} resizeHandler={this.onResize.bind(this)}>{c}</Pane>)
    })
  }

  onResize(movement, index) {
    this.setState({movement, index})
  }

  onValidateWidth(width) {
    const minimumWidth = (this.props.children.length-1) * 100;
    const allowed = width + minimumWidth;
    return allowed < this.width && width >= 110;
  }

  componentDidMount() {
    this.width = findDOMNode(this).clientWidth;
  }

  render() {
    const { direction } = this.props;
    return(
      <div className="split">
        {this.renderPanes}
      </div>
    )
  }
}

export default Split
