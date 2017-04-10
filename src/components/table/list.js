import React from 'react'
import { findDOMNode } from 'react-dom'
import Items from './items'

export default class List extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  findSelected() {
    const { data, select, selectHandler } = this.props
    if(!select) return;
    const keys = Object.keys(select);
    const index = data.findIndex((item) => keys.every(key => select[key] === item[key]))
    selectHandler(index)
  }

  calculateTop() {
    const node = findDOMNode(this);
    const missingHeight = node.scrollHeight - node.clientHeight;
    this.setState({missingHeight})
  }

  get data() {
    const { data, perPage, indexAt} = this.props;
    const dataLength = data.length

    let from = indexAt;
    let to = from + perPage;
    if(to >= dataLength) {
      from = dataLength - perPage;
      to = dataLength;
    }

    return data.slice(from, to)
  }

  get style() {
    const { data, indexAt } = this.props;
    const missingHeight = this.state.missingHeight;
    if(!missingHeight) return;
    const percent = indexAt / data.length * 100;
    const top = percent / 100 * missingHeight;
    return { top: `-${top}px` }
  }

  render() {
    const {columns, rowRenderer, select } = this.props;

    return(
      <div className="table-list">
        <Items columns={columns} data={this.data} rowRenderer={rowRenderer} select={select} style={this.style}  />
      </div>
    )
  }

  componentDidMount() {
    this.findSelected()
    this.calculateTop();
  }

  componentDidUpdate(prevProps, prevState) {
    if(prevProps.selected!==this.props.selected) {
      this.findSelected()
    }
  }
}
