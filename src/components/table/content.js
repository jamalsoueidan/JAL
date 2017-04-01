import React from 'react'
import { findDOMNode } from 'react-dom'

export default class Content extends React.Component {
  constructor(props) {
    super(props)
    this.onMouseWheelHandler = this.onMouseWheelHandler.bind(this)
  }

  componentDidMount() {
    const node = findDOMNode(this);
    node.addEventListener("mousewheel", this.onMouseWheelHandler);
  }

  onMouseWheelHandler(evt) {
    evt.preventDefault();
    const onMouseWheel = this.props.onMouseWheel;
	  const delta = Math.max(-1, Math.min(1, (evt.wheelDelta || -evt.detail)));
    onMouseWheel(delta)
  }

  get body() {
    const { scrollPosition, rowHeight, items, itemRenderer, rowsPerPage } = this.props;
    const from = Math.floor(scrollPosition/rowHeight);
    const to = rowsPerPage+from;
    //console.log("scrollPosition", scrollPosition, "from", from, "to", to, "rowsPerPage", rowsPerPage)
    return items.slice(from, to).map(itemRenderer)
  }

  render() {
    return(
      <div className="content">
        <table>
          <tbody>
            {this.body}
          </tbody>
        </table>
      </div>
    )
  }
}
