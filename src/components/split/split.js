import React from 'react'
import Pane from './pane'
import { findDOMNode } from 'react-dom'

class Split extends React.Component {
  get renderPanes() {
    return this.props.children.map((c, index, arr) => {
      const showResizer = (index !== (arr.length-1))
      return(<Pane key={index} showResizer={showResizer} validateWidth={this.onValidateWidth.bind(this)}>{c}</Pane>)
    })
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
