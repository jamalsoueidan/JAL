import React from 'react'
import { findDOMNode } from 'react-dom'

export default class Content extends React.Component {
  constructor(props) {
    super(props)
    this.items = props.items;
    this.onMouseWheelHandler = this.onMouseWheelHandler.bind(this)
  }

  /* This method is called when select props is set */
  scrollToSelected() {
    const { selected, onScrollPosition, rowHeight } = this.props
    if(!selected) return;
    const keys = Object.keys(selected);
    const index = this.items.findIndex((item) => keys.every(key => selected[key] === item[key]))
    onScrollPosition(index * rowHeight)
  }

  componentDidMount() {
    this.scrollToSelected()
    const node = findDOMNode(this);
    node.addEventListener("mousewheel", this.onMouseWheelHandler);
  }

  onMouseWheelHandler(evt) {
    evt.preventDefault();
    const onMouseWheel = this.props.onMouseWheel;
	  const wheelDelta = Math.max(-1, Math.min(1, (evt.wheelDelta || -evt.detail)));
    onMouseWheel(wheelDelta)
  }

  get body() {
    const { scrollPosition, rowHeight, items, itemRenderer, rowsPerPage } = this.props;
    let from = Math.floor(scrollPosition/rowHeight);
    let to = rowsPerPage+from;
    if(to>items.length) {
      from = items.length - rowsPerPage;
      to = items.lenght;
    }
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
