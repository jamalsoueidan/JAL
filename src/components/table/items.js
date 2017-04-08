import React from 'react'
import { findDOMNode } from 'react-dom'

export default class Items extends React.Component {
  get data() {
    const { perPage, rowPosition, data} = this.props;

    let from = Math.ceil( rowPosition );
    let to = perPage+from;
    if(to>=data.length) {
      from = data.length - perPage;
      to = data.length;
    }

    return data.slice(from, to)
  }

  get style() {
    const { rowPosition, rowHeight, perPage, tableHeight, data } = this.props;
    const length = data.length - perPage;
    const percent = (rowPosition / length * 100);
    return { top: percent / 100 * ((rowHeight * (perPage+1)) - tableHeight) + "px" }
  }

  get items() {
    const { rowRenderer, columns, selected, rowHeight } = this.props;
    return this.data.map(item => (
      <div key={item.id} className="item" style={{ height: `${rowHeight}px` }}>
        { rowRenderer(item, {type: 'item', selected, columns}) }
      </div>
    ));
  }

  render() {
    return(
      <div className="content-items" style={this.style}>
        {this.items}
      </div>
    )
  }
}
