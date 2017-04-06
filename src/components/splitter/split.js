import React from 'react'
import Pane from './pane'
import { findDOMNode } from 'react-dom'

require('./stylesheet.css')

class Split extends React.Component {
  constructor(props) {
    super(props)
    const percentWidth = this.props.children.length / 100;
    this.state = {}
  }


  get renderPanes() {
    const { direction } = this.props;
    return this.props.children.map((c, index, arr) => {
      const pane = this.state.panes[index];
      const style = {
        [(direction !== "column" ? "width" : "height")]: `${pane.length}%`
      }

      return(<Pane key={index} index={index} style={style} resizeHandler={this.onResize.bind(this)}>{c}</Pane>)
    })
  }

  // TODO: Figure out another way!
  onResize(from, to, element, index) {
    const panes = this.state.panes
    const currentPane = { ...panes[index] }
    const nextPane = { ...panes[index+1] }

    if(!from) {
      currentPane.startLength = currentPane.length;
      nextPane.startLength = nextPane.length;
    } else {
      const length = to - element.left; //get current width
      currentPane.length = (length / this.state.totalLength) * 100; // convert to percent
      nextPane.length = (currentPane.startLength - currentPane.length) + nextPane.startLength // move the unfilled space to the next pane
      if(currentPane.length<4 || nextPane.length<4) return;
    }

    this.setState({panes: { ...panes,
      [index]: currentPane,
      [index+1]: nextPane
    }})
  }

  componentDidMount() {
    const { direction } = this.props;

    const totalLength = findDOMNode(this)[(direction !== "column" ? "clientWidth" : "clientHeight")];
    const length = 100 / this.props.children.length
    const panes = {}
    this.props.children.forEach((c, index) => {
      panes[index] = {
        length: length,
        startLength: length
      };
    })
    this.setState({totalLength, panes})
  }

  render() {
    const { direction } = this.props;
    return(
      <div className="split" style={{flexDirection: direction}}>
        {this.state.panes && this.renderPanes}
      </div>
    )
  }
}

export default Split
