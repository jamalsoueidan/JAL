import React from 'react'
import Scroll from 'components/scroll'
import Header from './header'
import Content from './content'
import { findDOMNode } from 'react-dom'

require('./stylesheet.css')

export default class Table extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      scrollPercent: 0,
      scrollToPosition: 0,
      scrollMovement: 0,
      rowPosition: 0,
    }

    this.rowIndexToScrollPosition = this.rowIndexToScrollPosition.bind(this)
    this.onScroll = this.onScroll.bind(this)
    this.onMouseWheel = this.onMouseWheel.bind(this)
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
    const {scrollPercent} = this.state;

    return(
      <Content
        columns={columns}
        data={data}
        perPage={perPage}
        rowRenderer={rowRenderer}
        scrollPercent={scrollPercent}
        selected={selected} />
    )
  }

  get renderScroll() {
    const {scrollToPosition, scrollMovement } = this.state;

    // create empty element inside scroll component, so we get fake horizontal scroll!
    const height = this.dataLength * 10;

    return(
      <Scroll scrollTo={50} scrollMovement={scrollMovement} scrollHandler={this.onScroll}>
        <div style={{height: height + "px"}}></div>
      </Scroll>
    )
  }

  render() {
    const {columns} = this.props;

    return(
      <div className="table">
        { columns && this.renderHeader }
        <div className="table-list">
          { columns && this.renderItems }
          { columns && this.renderScroll }
        </div>
      </div>
    )
  }

  componentDidMount() {
    this.gotoPage();
    this.node.addEventListener("mousewheel", this.onMouseWheel);
  }

  componentDidUpdate(prevProps, prevState) {
    if(prevState.scrollMovement!==this.state.scrollMovement) {
      this.setState({scrollMovement: null})
    }

    if(prevProps.currentPage!=this.props.currentPage) {
      this.gotoPage();
    }
  }

  componentWillUnmount() {
    this.node.removeEventListener("mousewheel", this.onMouseWheel);
  }
}
