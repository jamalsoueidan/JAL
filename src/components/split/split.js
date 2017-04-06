import React from 'react'
import Pane from './pane'
import { findDOMNode } from 'react-dom'

class Split extends React.Component {
  constructor(props) {
    super(props)
    const percentWidth = this.props.children.length / 100;
    this.state = {}
  }


  get renderPanes() {
    return this.props.children.map((c, index, arr) => {
      const pane = this.state.panes[index];
      const style = {
        width: `${pane.width}px`
      }
      return(<Pane key={index} index={index} style={style} resizeHandler={this.onResize.bind(this)}>{c}</Pane>)
    })
  }

  // TODO: Figure out another way!
  onResize(moves, index) {
    if(!moves) {
      const panes = this.state.panes.map(p => {
        p.original = p.width
        return p;
      })
      this.setState({panes})
      return;
    }
    let panes = this.state.panes
    let currentWidth = panes[index].original
    let nextWidth = panes[index+1].original || panes[index-1].original
    currentWidth = currentWidth + moves;
    nextWidth = nextWidth - moves;
    if (currentWidth<100 || nextWidth<100) return;
    console.log(currentWidth, nextWidth)
    panes[index].width = currentWidth
    panes[index+1].width = nextWidth
    this.setState({panes})
  }

  onValidateWidth(width) {
    const minimumWidth = (this.props.children.length-1) * 100;
    const allowed = width + minimumWidth;
    return allowed < this.width && width >= 110;
  }

  componentDidMount() {
    const eachPaneWidth = findDOMNode(this).clientWidth / this.props.children.length
    const panes = []
    this.props.children.forEach((c, index) => {
      panes.push({
        index: index,
        width: eachPaneWidth,
        original: eachPaneWidth
      })
    })
    this.setState({panes})
  }

  render() {
    const { direction } = this.props;
    return(
      <div className="split">
        {this.state.panes && this.renderPanes}
      </div>
    )
  }
}

export default Split
