import React from 'react'
import Scroll from './scroll'
import Header from './header'
import Content from './content'
import { Scale } from 'utils'
import { findDOMNode } from 'react-dom'

require('./stylesheet.css')

export default class Table extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      scrollToPosition: 0,
      scrollMovement: 0,
      rowPosition: 0,
      rowHeight: null,
      fakeRowHeight: 10,
      tableHeight: 0
    }

    this.rowIndexToScrollPosition = this.rowIndexToScrollPosition.bind(this)
    this.onScroll = this.onScroll.bind(this)
    this.onMouseWheel = this.onMouseWheel.bind(this)
    this.onResize = this.onResize.bind(this)
  }

  get perPage() {
    const { perPage, columns } = this.props
    if(columns) return perPage + 1; // if we have thead then +1 perPage
    return perPage;
  }

  get dataLength() {
    const { data, columns } = this.props
    if(columns) return data.length + 1; // if we have thead then +1 perPage
    return data.length;
  }

  get node() {
    return findDOMNode(this);
  }

  calculateRowHeight() {
    this.setState({rowHeight: 40, tableHeight: this.node.offsetHeight})
  }

  onResize() {
    this.calculateRowHeight();
  }

  gotoPage() {
    const { currentPage, perPage } = this.props;
    if(currentPage > 0) {
      const scrollToPosition = ((currentPage - 1) * perPage) * this.state.fakeRowHeight;
      this.setState({scrollToPosition});
    }
  }

  onMouseWheel(evt) {
    evt.preventDefault();
    const wheelDelta = Math.max(-1, Math.min(1, (evt.wheelDelta || -evt.detail)));
    let scrollMovement = this.state.fakeRowHeight
    if(wheelDelta<0) {
      scrollMovement -= scrollMovement*2
    }
    this.setState({scrollMovement})
  }

  rowIndexToScrollPosition(rowIndex) {
    const scrollToPosition = rowIndex * this.state.fakeRowHeight;
    this.setState({scrollToPosition})
  }

  onScroll(scrollPercent) {
    console.log(scrollPercent)
    this.setState({scrollPercent: scrollPercent})
  }

  get renderHeader() {
    const attributes = {
      rowRenderer: this.props.rowRenderer,
      rowHeight: this.props.rowHeight,
      columns: this.props.columns
    }

    return <Header { ... attributes } />
  }

  get renderItems() {
    const {data, rowRenderer, perPage, selected, columns} = this.props;
    const {scrollPosition, rowHeight, rowPosition, tableHeight} = this.state;

    return(
      <Content
        rowIndexToScrollPosition={this.rowIndexToScrollPosition}
        columns={columns}
        scrollPosition={scrollPosition}
        data={data}
        rowRenderer={rowRenderer}
        rowHeight={rowHeight}
        selected={selected}
        perPage={perPage}
        tableHeight={tableHeight}
        rowPosition={rowPosition} />
    )
  }

  get renderScroll() {
    const {scrollToPosition, scrollMovement } = this.state;

    // create empty element inside scroll component, so we get fake horizontal scroll!
    const height = this.dataLength * 10;

    return(
      <Scroll scrollToPosition={scrollToPosition} scrollMovement={scrollMovement} scrollHandler={this.onScroll}>
        <div style={{height: height + "px"}}></div>
      </Scroll>
    )
  }

  render() {
    const {rowHeight} = this.state;

    return(
      <div className="table">
        { rowHeight && this.renderHeader }
        <div className="table-list">
          { rowHeight && this.renderItems }
          { rowHeight && this.renderScroll }
        </div>
      </div>
    )
  }

  componentDidMount() {
    this.calculateRowHeight();
    this.gotoPage();
    window.addEventListener("resize", this.onResize);
    this.node.addEventListener("mousewheel", this.onMouseWheel);
  }

  componentDidUpdate(prevProps, prevState) {
    if(prevState.scrollMovement!==this.state.scrollMovement) {
      this.setState({scrollMovement: null})
    }

    if(prevProps.perPage!=this.props.perPage) {
      this.calculateRowHeight();
    }

    if(prevProps.currentPage!=this.props.currentPage) {
      this.gotoPage();
    }
  }

  componentWillUnmount() {
    window.removeEventListener("resize", this.onResize);
    this.node.removeEventListener("mousewheel", this.onMouseWheel);
  }
}
