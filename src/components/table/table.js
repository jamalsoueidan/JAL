import { findDOMNode } from 'react-dom'
import React from 'react'
import Content from './content'
import Scroll from 'components/scroll'
import cn from 'classNames'
import Resize from 'highorder/resize'

require('./stylesheet.css')

class Table extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      scrollTo: 0,
      scrollHeight: 0,
      indexAt: 0
    }

    this.onScroll = this.onScroll.bind(this)
    this.onSelect = this.onSelect.bind(this)
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

  onHeightHandler(scrollHeight) {
    this.setState({scrollHeight})
  }

  render() {
    const {data, columns, perPage, rowRenderer, select, className} = this.props;
    const {indexAt, scrollTo, scrollMovement} = this.state;

    return(
      <div className={cn("table", className)}>
        <Scroll className="table-scroll" onHeightHandler={this.onHeightHandler.bind(this)} scrollTo={scrollTo} onScrollHandler={this.onScroll} height={data.length * 1}>
          <Content scrollHeight={this.state.scrollHeight} data={data} indexAt={indexAt} rowRenderer={rowRenderer} columns={columns} select={select} perPage={perPage} selectHandler={this.onSelect} />
        </Scroll>
      </div>
    )
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
  scrollVisible: true,
  perPage: 40
}

export default Resize(Table)
