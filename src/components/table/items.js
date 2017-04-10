import React from 'react'
import { findDOMNode } from 'react-dom'

export default class Items extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

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

    const perPage = 15;

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
    const scrollPercent = this.props.scrollPercent;
    const missingHeight = this.state.missingHeight;
    const top = scrollPercent / 100 * missingHeight;
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
      <div className="table-list-items" style={this.style} style={this.style}>
        {this.items}
      </div>
    )
  }

  componentDidMount() {
    this.scrollToSelected()
    const node = findDOMNode(this);
    const missingHeight = node.scrollHeight - node.clientHeight;
    this.setState({missingHeight})
  }

  componentDidUpdate(prevProps, prevState) {
    if(prevProps.selected!==this.props.selected) {
      this.scrollToSelected()
    }
  }
}
