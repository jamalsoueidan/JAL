import React from 'react'
import { findDOMNode } from 'react-dom'

class Items extends React.Component {
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
    const scrollPercent = this.props.scrollPercent;
    const missingHeight = this.state.missingHeight;
    if(!missingHeight) return;
    const top = scrollPercent / 100 * missingHeight;
    return { top: `-${top}px` }
  }

  get items() {
    const { rowRenderer, columns, select } = this.props;
    return this.data.map(item => (
      <div key={item.id} className="item">
        { rowRenderer(item, {type: 'item', select, columns}) }
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
    this.findSelected()
    const node = findDOMNode(this);
    const missingHeight = node.scrollHeight - node.clientHeight;
    this.setState({missingHeight})
  }

  componentDidUpdate(prevProps, prevState) {
    if(prevProps.selected!==this.props.selected) {
      this.findSelected()
    }
  }
}

Items.propTypes = {
  columns: React.PropTypes.array,
  data: React.PropTypes.array.isRequired,
  // render data from index,
  indexAt: React.PropTypes.number,
  rowRenderer: React.PropTypes.func.isRequired,
  select: React.PropTypes.object,
  selectHandler: React.PropTypes.func
};

export default Items
