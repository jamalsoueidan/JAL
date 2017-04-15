import React from 'react'
import Resizer from './resizer'
import { findDOMNode } from 'react-dom'
import cn from 'classNames'

class Pane extends React.Component {
  constructor(props) {
    super(props)
    this.state = { style: { flex: "1 1 auto" }};
  }

  onDragStart() {
    const { onDragStart, index } = this.props;
    if (onDragStart) {
      onDragStart({index});
    }
  }

  onDrag({from, to}) {
    const { onDrag, index } = this.props;
    const element = findDOMNode(this).getBoundingClientRect();
    onDrag({from, to, element, index})
  }

  onDragEnd() {
    const { onDragEnd, index } = this.props;
    if (onDragEnd) {
      onDragEnd({index});
    }
  }

  render() {
    const { showResizer, style, className } = this.props;
    const classNames = cn("pane", className )
    return(
      <div className={classNames} style={style}>
        <div className="pane-content">{this.props.children}</div>
        <Resizer className="pane-divider" onDragStart={this.onDragStart.bind(this)} onDrag={this.onDrag.bind(this)} onDragEnd={this.onDragEnd.bind(this)} />
      </div>
    )
  }
}

Pane.propTypes = {
  className: React.PropTypes.string,
  showResizer: React.PropTypes.bool,
  index: React.PropTypes.number,
  style: React.PropTypes.object,
  onDragStart: React.PropTypes.func,
  onDrag: React.PropTypes.func,
  onDragEnd: React.PropTypes.func
};

export default Pane
