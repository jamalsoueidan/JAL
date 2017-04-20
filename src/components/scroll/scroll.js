import React from 'react'
import { findDOMNode } from 'react-dom'
import cn from 'classNames'
import debounce from 'utils/debounce'

require('./stylesheet.css')

class Scroll extends React.Component {
  constructor(props) {
    super(props);
    //this.onScroll = debounce(this.onScroll.bind(this), 25).bind(this)
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

  onPropScrollToPosition() {
    const { scrollTo } = this.props;
    this.node.scrollTop = this.toScrollPosition(scrollTo);
  }

  onScroll(evt) {
    const  { onScrollHandler } = this.props;
    const scrollPosition = this.node.scrollTop;
    const scrollProcent = scrollPosition / this.scrollHeight * 100;
    onScrollHandler(scrollProcent)
  }

  render() {
    const { children, height } = this.props;
    const className = cn("scroll", this.props.className)
    return(
      <div className={className}>
        <div style={{visibility: "hidden", height: `${height}px`}}></div>
        {children}
      </div>
    )
  }

  componentDidMount() {
    this.onPropScrollToPosition();
    this.node.addEventListener('scroll', this.onScroll, false)
    if(this.props.onHeightHandler) {
      this.props.onHeightHandler(this.node.clientHeight)
    }
  }

  componentDidUpdate(prevProps) {
    if(prevProps.scrollTo !== this.props.scrollTo) {
      this.onPropScrollToPosition();
    }
  }

  componentWillUnmount() {
    this.node.removeEventListener('scroll', this.onScroll, false)
  }
}

Scroll.propTypes = {
  /**
   * scroll to what position in percent.
   */
  scrollTo: React.PropTypes.number,
  /**
   * This is callback scroll component calls whenever the scroll moves, output percent!
   */
  onScrollHandler: React.PropTypes.func.isRequired,
  onHeightHandler: React.PropTypes.func
};

export default Scroll
