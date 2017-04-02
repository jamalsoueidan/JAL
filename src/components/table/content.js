import React from 'react'
import { findDOMNode } from 'react-dom'

export default class Content extends React.Component {
  constructor(props) {
    super(props)
    this.data = props.data;
    this.onMouseWheelHandler = this.onMouseWheelHandler.bind(this)
  }

  /* This method is called when select props is set */
  scrollToSelected() {
    const { selected, onScrollPosition, rowHeight } = this.props
    if(!selected) return;
    const keys = Object.keys(selected);
    const index = this.data.findIndex((item) => keys.every(key => selected[key] === item[key]))
    onScrollPosition(index * rowHeight)
  }

  onMouseWheelHandler(evt) {
    evt.preventDefault();
    const onMouseWheel = this.props.onMouseWheel;
	  const wheelDelta = Math.max(-1, Math.min(1, (evt.wheelDelta || -evt.detail)));
    onMouseWheel(wheelDelta)
  }

  get tbody() {
    const { scrollPosition, rowHeight, data, rowRenderer, perPage, selected } = this.props;

    let from = Math.floor(scrollPosition/rowHeight);
    let to = perPage+from;
    if(to>data.length) {
      from = data.length - perPage;
      to = data.lenght;
    }
    return data.slice(from, to).map(rowRenderer({type: 'tbody', rowHeight, selected}))
  }

  get thead() {
    const { columns, rowRenderer, rowHeight } = this.props;
    return rowRenderer({type: 'thead', rowHeight})(columns)
  }

  render() {
    return(
      <div className="content">
        <table>
          <thead>
            {this.thead}
          </thead>
          <tbody>
            {this.tbody}
          </tbody>
        </table>
      </div>
    )
  }

  componentDidMount() {
    this.scrollToSelected()
    const node = findDOMNode(this);
    node.addEventListener("mousewheel", this.onMouseWheelHandler);
  }
}
