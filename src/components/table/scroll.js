import React from 'react'
import { findDOMNode } from 'react-dom'
import { Scale } from 'utils'

const FakeContent = ({height}) => {
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

  calculateScrollWith() {
    const node = this.node
    // IE doesn't scroll if there is not avaible content for scroll, so fake content must have atleast 1.5px
    const IEFIX = 1.5;
    const width = node.offsetWidth - node.clientWidth + IEFIX;
    this.setState({width})
  }

  onContentWheelScroll() {
    const { scrollMovement } = this.props;
    this.node.scrollTop -= scrollMovement;
  }

  onPropScrollPosition() {
    const { scrollToPosition } = this.props;
    const scrollHeight = this.node.scrollHeight;
    const scrollMaxPosition = scrollHeight - this.node.offsetHeight;
    const scale = new Scale().domain(0, this.node.scrollHeight).range(0, scrollMaxPosition);
    this.node.scrollTop = scale(scrollToPosition);
  }

  onScroll(evt) {
    const  { scrollPositionToRowIndex } = this.props;
    const scrollMaxPosition = this.node.scrollHeight - this.node.offsetHeight;
    scrollPositionToRowIndex(this.node.scrollTop, scrollMaxPosition)
  }

  render() {
    const {width} = this.state;
    const {fakeHeight} = this.props;

    return(
      <div className="scroll" style={{width}}>
        <FakeContent height={fakeHeight}/>
      </div>
    )
  }

  componentDidMount() {
    this.calculateScrollWith();
    this.onPropScrollPosition();
    this.node.addEventListener('scroll', this.onScroll)
  }

  componentDidUpdate(prevProps) {
    this.onContentWheelScroll();

    if(prevProps.scrollPosition !== this.props.scrollPosition) {
      this.onPropScrollPosition();
    }
  }

  componentWillUnmount() {
    this.node.removeEventListener('scroll', this.onScroll)
  }
}
