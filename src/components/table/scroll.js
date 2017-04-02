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

  componentDidMount() {
    const node = findDOMNode(this);
    const width = node.offsetWidth - node.clientWidth;
    const style = this.state.style
    this.setState({style: {...style, width}})
    node.addEventListener('scroll', this.onScroll)
  }

  componentDidUpdate(prevProps) {
    this.onContentWheelScroll();
    if(prevProps.scrollPosition !==this.props.scrollPosition) {
      this.onManualScrollPosition();
    }
  }

  onContentWheelScroll() {
    const { wheelDirection, rowHeight } = this.props;
    const node = findDOMNode(this);
    if(wheelDirection<0)
      node.scrollTop += rowHeight * 2.5;
    if(wheelDirection>0)
      node.scrollTop -= rowHeight * 2.5;
  }

  onManualScrollPosition() {
    const { scrollPosition } = this.props;
    const node = findDOMNode(this);
    node.scrollTop = scrollPosition
  }

  onScroll(evt) {
    const node = findDOMNode(this);
    const onScrollPosition = this.props.onScrollPosition;
    onScrollPosition(node.scrollTop)
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
