import React from 'react'
import { findDOMNode } from 'react-dom'
import { Scale } from 'utils'

class Scroll extends React.Component {
  constructor(props) {
    super(props);
    this.onScroll = this.onScroll.bind(this)
  }

  get node() {
    return findDOMNode(this);
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
    const  { scrollHandler } = this.props;
    const scrollHeight = this.node.scrollHeight - this.node.offsetHeight;
    const scrollPosition = this.node.scrollTop;
    const scrollProcent = scrollPosition / scrollHeight * 100;
    scrollHandler(scrollProcent)
  }

  render() {
    const { children } = this.props;

    return(
      <div className="table-scroll">
        {children}
      </div>
    )
  }

  componentDidMount() {
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
   * You know how much you need to scroll by using fakeHeight/items, then total * 3 items, you get the correct position.
   */
  scrollToPosition: React.PropTypes.number,
  /**
   * Type how much movement the scroll should scroll up or down, -10 then it will scroll up 10px etc.
   */
  scrollMovement: React.PropTypes.number,
  /**
   * This is callback scroll component calls whenever the scroll moves, you will get scrollPositionToRowIndex(scrollPosition, scrollMaxPosition)
   * Use math to calculate which items to show!
   */
  scrollHandler: React.PropTypes.func.isRequired
};

export default Scroll
