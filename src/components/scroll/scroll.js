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
    const { height } = this.props;
    const className = cn("scroll", this.props.className)
    return(
      <div className={className}>
        <div style={{height: `${height}px`}}></div>
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
   * scroll to what position in percent.
   */
  scrollTo: React.PropTypes.number,
  /**
   * height of the fake content
   */
  height: React.PropTypes.number.isRequired,
  /**
   * what direction should we scroll (used with wheel events +1 down, -1 up).
   */
  scrollMovement: React.PropTypes.number,
  /**
   * scrollMovement, choose the direction, here is specify the amount of movement.
   */
  scrollAmount: React.PropTypes.number,
  /**
   * This is callback scroll component calls whenever the scroll moves, output percent!
   */
  scrollHandler: React.PropTypes.func.isRequired
};

Scroll.defaultProps = {
  scrollAmount: .2
}

export default Scroll
