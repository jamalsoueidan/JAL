import React from 'react'
import { findDOMNode } from 'react-dom'
import { Scale } from 'utils'

const FakeContent = ({height}) => {
  return(<div className="fakeContent" style={{height: height + "px", backgroundColor: "#ff0040", visibility: "hidden"}}></div>)
}

class Scroll extends React.Component {
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

  onWheelScroll() {
    const { scrollMovement } = this.props;
    this.node.scrollTop -= scrollMovement;
  }

  onPropScrollToPosition() {
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
    this.onPropScrollToPosition();
    this.node.addEventListener('scroll', this.onScroll)
  }

  componentDidUpdate(prevProps) {
    this.onWheelScroll();

    if(prevProps.scrollToPosition !== this.props.scrollToPosition) {
      this.onPropScrollToPosition();
    }
  }

  componentWillUnmount() {
    this.node.removeEventListener('scroll', this.onScroll)
  }
}

Scroll.propTypes = {
  /**
   * You know how much you need to scroll by ysing fakeHeight/items, then total * 3 items, you get the correct position.
   */
  scrollToPosition: React.PropTypes.number,
  /**
   * Type how much movement the scroll should scroll up or down, -10 then it will scroll up 10px etc.
   */
  scrollMovement: React.PropTypes.number,
  /**
   * We need to create fake element inside scroll component, to show a horizontal scroll,
   * the height responed to items , if the height is 1000px, and you have 100 items,
   * then you can move to item number 100 by specifing 1000 in scrollToPosition.
   */
  fakeHeight: React.PropTypes.number.isRequired,
  /**
   * This is callback scroll component calls whenever the scroll moves, you will get scrollPositionToRowIndex(scrollPosition, scrollMaxPosition)
   * Use math to calculate which items to show!
   */
  scrollPositionToRowIndex: React.PropTypes.func.isRequired
};

export default Scroll
