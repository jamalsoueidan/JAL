import React from 'react'
import Scroll from './scroll'
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
    this.scrollPositionToRowIndex = this.scrollPositionToRowIndex.bind(this)
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
    const rowHeight = (this.node.offsetHeight / this.perPage)
    // TODO: Fix this issue with rowHeight becoming 13.4 with 400px as example!
    const checkMistake = (rowHeight + "").split(".")
    if(checkMistake[1] && checkMistake[1] !== "5") {
      console.error(`${rowHeight} is not acceptable in css, please change height of the table, it must be .5 and not .1, .2, .3 etc.`)
      console.error("You can actually figure out what the best height for table, by saying 11 rows x 10 perPage = 440pixel")
    }
    this.setState({rowHeight, tableHeight: this.node.offsetHeight})
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

  scrollPositionToRowIndex(scrollPosition, scrollMaxPosition) {
    const scale = new Scale().domain(0, scrollMaxPosition).range(0, this.props.data.length-this.props.perPage);
    this.setState({rowPosition: scale(scrollPosition)})
  }

  renderContent() {
    const {data, rowRenderer, perPage, selected, columns} = this.props;
    const {scrollPosition, rowHeight, rowPosition, fakeRowHeight} = this.state;

    return(
      <Content
        rowIndexToScrollPosition={this.rowIndexToScrollPosition}
        columns={columns}
        scrollPosition={scrollPosition}
        onScrollPosition={this.onScrollPosition}
        data={data}
        rowRenderer={rowRenderer}
        rowHeight={rowHeight}
        selected={selected}
        perPage={perPage}
        rowPosition={rowPosition}
        fakeRowHeight={fakeRowHeight} />
    )
  }

  renderScroll() {
    const {scrollToPosition, scrollMovement, fakeRowHeight} = this.state;

    // create empty element inside scroll component, so we get fake horizontal scroll!
    const fakeHeight = this.dataLength * fakeRowHeight;

    return(
      <Scroll
        scrollToPosition={scrollToPosition}
        scrollMovement={scrollMovement}
        fakeHeight={fakeHeight}
        scrollPositionToRowIndex={this.scrollPositionToRowIndex} />
    )
  }

  render() {
    const {rowHeight} = this.state;

    return(
      <div className="table">
        {rowHeight && this.renderContent() }
        {rowHeight && this.renderScroll() }
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
