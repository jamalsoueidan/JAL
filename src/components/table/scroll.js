import React from 'react'
import { findDOMNode } from 'react-dom'

const FakeContent = ({itemsLength, rowHeight}) => {
  const height = itemsLength * rowHeight;
  return(<div className="fakeContent" style={{height: height + "px"}}></div>)
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

  componentDidMount() {
    this.calculateScrollWith();
    this.gotoPage();
    this.node.addEventListener('scroll', this.onScroll)
  }

  gotoPage() {
    const { page, rowsPerPage, rowHeight } = this.props;
    if(page > 0) {
      this.node.scrollTop = ((page - 1) * rowsPerPage) * rowHeight;
    }
  }

  calculateScrollWith() {
    const node = this.node
    const width = node.offsetWidth - node.clientWidth;
    const style = this.state.style
    this.setState({style: {...style, width}})
  }

  componentWillUnmount() {
    this.node.removeEventListener('scroll', this.onScroll)
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
    const {itemsLength, rowHeight} = this.props

    return(
      <div className="scroll" style={{width}}>
        <FakeContent itemsLength={itemsLength} rowHeight={rowHeight}/>
      </div>
    )
  }
}
