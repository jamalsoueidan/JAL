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
      indexAt: 0
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

  onSelected(index) {
    const data = this.props.data
    const scrollTo = index / data.length * 100
    this.setState({scrollTo})
  }

  onScroll(percent) {
    const data = this.props.data
    const indexAt = percent / 100 * data.length;
    this.setState({indexAt})
  }

  render() {
    const {columns, data, rowRenderer, select, perPage } = this.props;
    const {scrollTo, scrollMovement, indexAt} = this.state;

    return(
      <div className="table-list">
        <Items columns={columns} data={data} rowRenderer={rowRenderer} select={select} indexAt={indexAt} perPage={perPage} selectHandler={this.onSelected} />
        <Scroll className="table-list-scroll" scrollTo={scrollTo} scrollMovement={scrollMovement} scrollHandler={this.onScroll} height={data.length * 10}/>
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
