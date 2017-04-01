import React from 'react'
import Scroll from './scroll'
import Content from './content'
import { findDOMNode } from 'react-dom'

require('./stylesheet.css')

export default class Table extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      scrollPosition: 0,
      wheelDirection: null,
      rowHeight: null
    }

    this.onScrollPosition = this.onScrollPosition.bind(this)
    this.onMouseWheel = this.onMouseWheel.bind(this)
  }

  onMouseWheel(wheelDirection) {
    this.setState({wheelDirection})
  }

  componentDidUpdate(prevProp, prevState) {
    if(prevState.wheelDirection!==this.state.wheelDirection) {
      this.setState({wheelDirection: null})
    }
  }

  componentDidMount() {
    const node = findDOMNode(this);
    const rowsPerPage = this.props.rowsPerPage
    const rowHeight = node.clientHeight / rowsPerPage
    console.log(node.clientHeight, rowsPerPage, rowHeight)
    this.setState({rowHeight})
  }

  onScrollPosition(scrollPosition) {
    this.setState({scrollPosition})
  }

  renderContent(rowHeight) {
    const {items, itemRenderer, rowsPerPage} = this.props;
    const {scrollPosition} = this.state;

    return(
      <Content
        scrollPosition={scrollPosition}
        onMouseWheel={this.onMouseWheel}
        items={items}
        itemRenderer={itemRenderer(rowHeight)}
        rowHeight={rowHeight}
        rowsPerPage={rowsPerPage} />
    )
  }

  renderScroll(rowHeight) {
    const {items} = this.props;
    const {wheelDirection} = this.state;

    return(
      <Scroll
        wheelDirection={wheelDirection}
        onScrollPosition={this.onScrollPosition}
        itemsLength={items.length}
        rowHeight={rowHeight} />
    )
  }

  render() {
    const { rowHeight } = this.state

    return(
      <div className="table">
        {rowHeight && this.renderContent(rowHeight) }
        {rowHeight && this.renderScroll(rowHeight) }
      </div>
    )
  }
}
