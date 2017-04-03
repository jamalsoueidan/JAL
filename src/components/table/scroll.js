import React from 'react'
import { findDOMNode } from 'react-dom'

const FakeContent = ({height}) => {
  console.log(height)
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
    const { page, perPage, fakeRowHeight } = this.props;
    if(page > 0) {
      this.node.scrollTop = ((page - 1) * perPage) * fakeRowHeight;
    }
  }

  calculateScrollWith() {
    const node = this.node
    // IE doesn't scroll if there is not avaible content for scroll, so fake content must have atleast 1.5px
    const IEFIX = 1.5;
    const width = node.offsetWidth - node.clientWidth + IEFIX;
    this.setState({width})
  }


  onContentWheelScroll() {
    const { wheelDirection, fakeRowHeight } = this.props;
    if(wheelDirection<0)
      this.node.scrollTop += fakeRowHeight;
    if(wheelDirection>0)
      this.node.scrollTop -= fakeRowHeight;
  }

  onManualScrollPosition() {
    const { scrollPosition } = this.props;
    this.node.scrollTop = scrollPosition
  }

  onScroll(evt) {
    const onScrollPosition = this.props.onScrollPosition;
    onScrollPosition(this.node.scrollTop)
  }

  get calculateFakeHeight() {
    const {dataLength, fakeRowHeight} = this.props
    return dataLength * fakeRowHeight;
  }

  render() {
    const {width} = this.state;

    return(
      <div className="scroll" style={{width}}>
        <FakeContent height={this.calculateFakeHeight}/>
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
