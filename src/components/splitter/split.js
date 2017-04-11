import React from 'react'
import Pane from './pane'
import { findDOMNode } from 'react-dom'
import cn from 'classNames'

require('./stylesheet.css')

const ROW_DIRECTION = "row"
const COLUMN_DIRECTION = "column"

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
        [(this.isRowDirection ? "width" : "height")]: `${pane.length}%`,
        flexDirection: this.direction,
      }

      return(<Pane key={index} className={this.direction} index={index} style={style} resizeHandler={this.onResize.bind(this)}>{c}</Pane>)
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
      const elementPosition = ( this.isRowDirection ? element.left : element.top ) // get pane x or y position depending on direction
      const clientLength = ( this.isRowDirection ? to.clientX : to.clientY ) // get mouse x or y position depending on direction
      const length = clientLength - elementPosition; // set new height or width depending on direction
      currentPane.length = (length / this.state.totalLength) * 100; // convert to percent
      nextPane.length = (currentPane.startLength - currentPane.length) + nextPane.startLength // move the unfilled space to the next pane
      if(currentPane.length<4 || nextPane.length<4) return;
    }

    this.setState({panes: { ...panes,
      [index]: currentPane,
      [index+1]: nextPane
    }})
  }

  get direction() {
    const { direction } = this.props;
    if(direction) return direction;
    return ROW_DIRECTION;
  }

  get isRowDirection() {
    return this.direction !== COLUMN_DIRECTION
  }

  componentDidMount() {
    const children = this.props.children;
    const panes = this.props.panes;
    const statePanes = {}
    const totalLength = findDOMNode(this)[(this.isRowDirection ? "clientWidth" : "clientHeight")];
    let length = 100 / children.length
    children.forEach((c, index) => {
      if(panes && panes[index]) {
        length = panes[index];
      }
      statePanes[index] = {
        length: length,
        startLength: length
      };
    })
    this.setState({totalLength, panes: statePanes})
  }

  render() {
    const classNames = cn("split", this.direction)
    return(
      <div className={classNames} style={{flexDirection: this.direction}}>
        {this.state.panes && this.renderPanes}
      </div>
    )
  }
}

export default Split
