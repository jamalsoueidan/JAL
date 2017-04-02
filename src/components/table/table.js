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
    this.onResize = this.onResize.bind(this)
  }

  onMouseWheel(wheelDirection) {
    this.setState({wheelDirection})
  }

  componentDidUpdate(prevProp, prevState) {
    if(prevState.wheelDirection!==this.state.wheelDirection) {
      this.setState({wheelDirection: null})
    }
  }

  calculateRowHeight() {
    const node = findDOMNode(this);
    const rowsPerPage = this.props.rowsPerPage
    const rowHeight = (node.offsetHeight / rowsPerPage)
    // TODO: Fix this issue with rowHeight becoming 13.4 with 400px as example!
    const checkMistake = (rowHeight + "").split(".")
    if(checkMistake[1] !== "5") {
      console.error(`${rowHeight} is not acceptable in css, please change height of the table, it must be .5 and not .1, .2, .3 etc.`)
    }
    this.setState({rowHeight})
  }

  componentDidMount() {
    this.calculateRowHeight();
    window.addEventListener("resize", this.onResize);
  }

  componentWillUnmount() {
    window.removeEventListener("resize", this.onResize);
  }

  onResize() {
    this.calculateRowHeight();
  }

  onScrollPosition(scrollPosition) {
    this.setState({scrollPosition})
  }

  renderContent(rowHeight) {
    const {items, itemRenderer, rowsPerPage, selected} = this.props;
    const {scrollPosition} = this.state;

    return(
      <Content
        scrollPosition={scrollPosition}
        onMouseWheel={this.onMouseWheel}
        onScrollPosition={this.onScrollPosition}
        items={items}
        itemRenderer={itemRenderer(rowHeight, selected)}
        rowHeight={rowHeight}
        selected={selected}
        rowsPerPage={rowsPerPage} />
    )
  }

  renderScroll(rowHeight) {
    const {items, page, rowsPerPage} = this.props;
    const {wheelDirection, scrollPosition} = this.state;

    return(
      <Scroll
        scrollPosition={scrollPosition}
        wheelDirection={wheelDirection}
        rowsPerPage={rowsPerPage}
        onScrollPosition={this.onScrollPosition}
        itemsLength={items.length}
        page={page}
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
