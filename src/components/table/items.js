import React from 'react'
import { findDOMNode } from 'react-dom'

export default class Items extends React.Component {
  scrollToSelected() {
    const { selected, selectHandler, data } = this.props
    if(!selected) return;
    const keys = Object.keys(selected);
    const index = data.findIndex((item) => keys.every(key => selected[key] === item[key]))
    const percent = index / data.length * 100
    selectHandler(percent)
  }

  get data() {
    const { scrollPercent, data} = this.props;

    const perPage = 10;

    const dataLength = data.length
    let from = scrollPercent/100 * dataLength;
    let to = from + perPage;

    if(to >= dataLength) {
      from = dataLength - perPage;
      to = dataLength;
    }

    return data.slice(from, to)
  }

  get style() {
    const { rowPosition, perPage, tableHeight, data } = this.props;
    const rowHeight = 40;
    const length = data.length - perPage;
    const percent = (rowPosition / length * 100);
    const top = (percent / 100) * ((rowHeight * (perPage+1)) - tableHeight)
    return { top: `-${top}px` }
  }

  get items() {
    const { rowRenderer, columns, selected } = this.props;
    return this.data.map(item => (
      <div key={item.id} className="item">
        { rowRenderer(item, {type: 'item', selected, columns}) }
      </div>
    ));
  }

  render() {
    return(
      <div className="table-list-items" style={this.style}>
        {this.items}
      </div>
    )
  }

  componentDidMount() {
    this.scrollToSelected()
  }

  componentDidUpdate(prevProps, prevState) {
    if(prevProps.selected!==this.props.selected) {
      this.scrollToSelected()
    }
  }
}
