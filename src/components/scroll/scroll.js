import React from 'react'
import { findDOMNode } from 'react-dom'
import cn from 'classNames'

require('./stylesheet.css')

class Scroll extends React.Component {
  constructor(props) {
    super(props);
    this.onScroll = this.onScroll.bind(this)
  }

  get node() {
    return findDOMNode(this);
  }

  get scrollHeight() {
    return this.node.scrollHeight - this.node.offsetHeight;
  }

  toScrollPosition(percent) {
    return (percent / 100) * this.scrollHeight
  }

  onWheelScroll() {
    const { scrollMovement, scrollAmount} = this.props;
    if(scrollMovement>0) {
      this.node.scrollTop += this.toScrollPosition(scrollAmount);
    } else {
      this.node.scrollTop -= this.toScrollPosition(scrollAmount);
    }
  }

  onPropScrollToPosition() {
    const { scrollTo } = this.props;
    this.node.scrollTop = this.toScrollPosition(scrollTo);
  }

  onScroll(evt) {
    const  { scrollHandler } = this.props;
    const scrollPosition = this.node.scrollTop;
    const scrollProcent = scrollPosition / this.scrollHeight * 100;
    scrollHandler(scrollProcent)
  }

  render() {
    const { children } = this.props;
    const className = cn("scroll", this.props.className)
    return(
      <div className={className}>
        {children}
      </div>
    )
  }

  componentDidMount() {
    this.onPropScrollToPosition();
    this.node.addEventListener('scroll', this.onScroll)
  }

  componentDidUpdate(prevProps) {
    if(this.props.scrollMovement) {
      this.onWheelScroll();
    }

    if(prevProps.scrollTo !== this.props.scrollTo) {
      this.onPropScrollToPosition();
    }
  }

  componentWillUnmount() {
    this.node.removeEventListener('scroll', this.onScroll)
  }
}

Scroll.propTypes = {
  /**
   * How much to scroll in percent
   */
  scrollTo: React.PropTypes.number,
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

Scroll.defaultProps = {
  scrollAmount: .2,
  scrollTo: null,
  scrollMovement: null
}

export default Scroll
