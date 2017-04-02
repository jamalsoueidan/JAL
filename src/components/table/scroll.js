import React from 'react'
import { findDOMNode } from 'react-dom'

const FakeContent = ({dataLength, rowHeight}) => {
  const height = dataLength * rowHeight;
  return(<div className="fakeContent" style={{height: height + "px", backgroundColor: "#ff0040", visibility: "hidden"}}></div>)
}

export default class Scroll extends React.Component {
  constructor(props) {
    super(props);
    this.onScroll = this.onScroll.bind(this)
    this.state = {}
  }

  get node() {
    return findDOMNode(this);
  }

  gotoPage() {
    const { page, perPage, rowHeight } = this.props;
    if(page > 0) {
      this.node.scrollTop = ((page - 1) * perPage) * rowHeight;
    }
  }

  calculateScrollWith() {
    const node = this.node
    // IE doesn't scroll if the width is scrollWidth, the fake content must be visible!
    const IEFIX = 1.5;
    const width = node.offsetWidth - node.clientWidth + IEFIX;
    console.log(width)
    this.setState({width})
  }


  onContentWheelScroll() {
    const { wheelDirection, rowHeight } = this.props;
    if(wheelDirection<0)
      this.node.scrollTop += rowHeight * 2.5;
    if(wheelDirection>0)
      this.node.scrollTop -= rowHeight * 2.5;
  }

  onManualScrollPosition() {
    const { scrollPosition } = this.props;
    this.node.scrollTop = scrollPosition
  }

  onScroll(evt) {
    const onScrollPosition = this.props.onScrollPosition;
    onScrollPosition(this.node.scrollTop)
  }

  render() {
    const {width} = this.state;
    const {dataLength, rowHeight} = this.props

    return(
      <div className="scroll" style={{width}}>
        <FakeContent dataLength={dataLength} rowHeight={rowHeight}/>
      </div>
    )
  }

  componentDidMount() {
    this.calculateScrollWith();
    this.gotoPage();
    this.node.addEventListener('scroll', this.onScroll)
  }

  componentDidUpdate(prevProps) {
    this.onContentWheelScroll();

    if(prevProps.scrollPosition !== this.props.scrollPosition) {
      this.onManualScrollPosition();
    }

    if(prevProps.page !== this.props.page) {
      this.gotoPage();
    }
  }

  componentWillUnmount() {
    this.node.removeEventListener('scroll', this.onScroll)
  }
}
