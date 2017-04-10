import React from 'react'
import { findDOMNode } from 'react-dom'
import Header from './header'
import List from './list'
import Scroll from 'components/scroll'

require('./stylesheet.css')

class Table extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      scrollTo: 0,
      scrollMovement: 0,
      indexAt: 0
    }

    this.onScroll = this.onScroll.bind(this)
    this.onSelect = this.onSelect.bind(this)
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

  // onScroll => update list
  onScroll(percent) {
    const data = this.props.data
    const indexAt = percent / 100 * data.length;
    this.setState({indexAt})
  }

  // onSelect => update scroll
  onSelect(index) {
    const data = this.props.data
    const scrollTo = index / data.length * 100
    this.setState({scrollTo})
  }

  render() {
    const {data, columns, perPage, rowRenderer, select} = this.props;
    const {indexAt, scrollTo, scrollMovement} = this.state;

    return(
      <div className="table">
        <Header rowRenderer={rowRenderer} columns={columns} />
        <List data={data} indexAt={indexAt} rowRenderer={rowRenderer} columns={columns} select={select} perPage={perPage} selectHandler={this.onSelect} />
        <Scroll className="table-scroll" scrollTo={scrollTo} scrollMovement={scrollMovement} scrollHandler={this.onScroll} height={data.length * 10}/>
      </div>
    )
  }

  componentDidMount() {
    findDOMNode(this).addEventListener("mousewheel", this.onMouseWheel);
  }

  componentWillUnmount() {
    findDOMNode(this).removeEventListener("mousewheel", this.onMouseWheel);
  }

  componentDidUpdate(prevProps, prevState) {
    if(prevState.scrollMovement!==this.state.scrollMovement) {
      this.setState({scrollMovement: null})
    }
  }
}

Table.propTypes = {
  columns: React.PropTypes.array.isRequired,
  data: React.PropTypes.array.isRequired,
  perPage: React.PropTypes.number.isRequired,
  rowRenderer: React.PropTypes.func.isRequired,
  select: React.PropTypes.object
};

Table.defaultProps = {
  perPage: 30
}

export default Table
