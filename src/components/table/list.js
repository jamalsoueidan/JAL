import React from 'react'
import { findDOMNode } from 'react-dom'
import Items from './items'
import Scroll from 'components/scroll'

export default class List extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      scrollTo: 0,
      scrollMovement: 0,
      scrollPercent: 0
    }

    this.onSelected = this.onSelected.bind(this)
    this.onScroll = this.onScroll.bind(this)
    this.onMouseWheel = this.onMouseWheel.bind(this)
  }

  onMouseWheel(evt) {
    evt.preventDefault();
    if(evt.wheelDelta>0) {
      this.setState({scrollMovement: -1})
    } else {
      this.setState({scrollMovement: 1})
    }
  }

  onSelected(scrollTo) {
    this.setState({scrollTo})
  }

  onScroll(scrollPercent) {
    this.setState({scrollPercent})
  }

  get renderItems() {
    return(<Items {...this.props} scrollPercent={this.state.scrollPercent} selectHandler={this.onSelected} />)
  }

  get renderScroll() {
    const {scrollTo, scrollMovement} = this.state;

    // create empty element inside scroll component, so we get fake horizontal scroll!
    return(
      <Scroll className="table-list-scroll" scrollTo={scrollTo} scrollMovement={scrollMovement} scrollHandler={this.onScroll}>
        <div style={{height: this.props.data.length * 10 + "px"}}></div>
      </Scroll>
    )
  }

  render() {
    const {columns} = this.props;

    return(
      <div className="table-list">
        { columns && this.renderItems }
        { columns && this.renderScroll }
      </div>
    )
  }

  componentDidMount() {
    findDOMNode(this).addEventListener("mousewheel", this.onMouseWheel);
  }

  componentDidUpdate(prevProps, prevState) {
    if(prevState.scrollMovement!==this.state.scrollMovement) {
      this.setState({scrollMovement: null})
    }
  }

  componentWillUnmount() {
    findDOMNode(this).removeEventListener("mousewheel", this.onMouseWheel);
  }
}
