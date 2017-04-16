import { findDOMNode } from 'react-dom'
import React from 'react'
import Pane from './pane'
import Validator from './validator'
import cn from 'classNames'

require('./stylesheet.css')

const VERTICAL_ORIENTATION = "vertical"
const HORIZONTAL_ORIENTATION = "horizontal"

/**
 * General component description.
 */
class Splitter extends React.Component {
  constructor(props) {
    super(props)
    this.state = {}

    this.onDragStart = this.onDragStart.bind(this);
    this.onDrag = this.onDrag.bind(this);
    this.onDragEnd = this.onDragEnd.bind(this);
  }


  get renderPanes() {
    const { orientation } = this.props;
    return this.props.children.map((c, index, arr) => {
      const pane = this.state.panes[index];

      const style = {
        [(this.isVerticalOrientation ? "width" : "height")]: `${pane.length}%`,
        flexDirection: this.flexDirection,
      }

      return(<Pane key={index} className={orientation} index={index} style={style} onDragStart={this.onDragStart} onDrag={this.onDrag} onDragEnd={this.onDragEnd}>{c}</Pane>)
    })
  }

  onDragStart({index}) {
    const { onDragStart } = this.props;
    if (onDragStart) {
      onDragStart();
    }
  }

  // TODO: Figure out another way!
  onDrag({from, to, element, index}) {
    const panes = this.state.panes
    const currentPane = { ...panes[index] }
    const nextPane = { ...panes[index+1] }

    const elementPosition = ( this.isVerticalOrientation ? element.left : element.top ) // get pane x or y position depending on orientation
    const clientLength = ( this.isVerticalOrientation ? to.clientX+5 : to.clientY+5 ) // get mouse x or y position depending on orientation
    const length = clientLength - elementPosition; // set new height or width depending on orientation
    currentPane.length = (length / this.state.totalLength) * 100; // convert to percent
    nextPane.length = (currentPane.startLength - currentPane.length) + nextPane.startLength // move the unfilled space to the next pane
    if(currentPane.length<4 || nextPane.length<4) return; /// ??

    this.setState({panes: { ...panes, [index]: currentPane, [index+1]: nextPane }})
  }

  onDragEnd({index}) {
    const panes = this.state.panes
    const currentPane = { ...panes[index] }
    const nextPane = { ...panes[index+1] }

    currentPane.startLength = currentPane.length;
    nextPane.startLength = nextPane.length;

    const nextPanes = {panes: { ...panes, [index]: currentPane, [index+1]: nextPane }};

    const { onDragEnd } = this.props;
    if (onDragEnd) {
      onDragEnd(nextPanes.panes);
    }

    this.setState(nextPanes)
  }

  get isVerticalOrientation() {
    return this.props.orientation !== HORIZONTAL_ORIENTATION
  }

  componentDidMount() {
    const children = this.props.children;
    const panes = this.props.panes;
    const statePanes = {}
    const totalLength = findDOMNode(this)[(this.isVerticalOrientation ? "clientWidth" : "clientHeight")];
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

  get flexDirection() {
    return (this.props.orientation === VERTICAL_ORIENTATION ? "row" : "column" )
  }

  render() {
    const { orientation } = this.props;
    const classNames = cn("splitter", orientation)
    return(
      <div className={classNames} style={{flexDirection: this.flexDirection}}>
        {this.state.panes && this.renderPanes}
      </div>
    )
  }
}

Splitter.propTypes = {
  orientation: React.PropTypes.string,
  className: React.PropTypes.string,
  panes: Validator.panes,
  onDragStart: React.PropTypes.func,
  onDragEnd: React.PropTypes.func
};

Splitter.defaultProps = {
  orientation: VERTICAL_ORIENTATION
}

export default Splitter
