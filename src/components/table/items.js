import React from 'react'
import { findDOMNode } from 'react-dom'

class Items extends React.Component {
  get items() {
    const { rowRenderer, data, columns, select } = this.props;
    return data.map(item => (
      <div key={item.id} className="item">
        { rowRenderer(item, {type: 'item', select, columns}) }
      </div>
    ));
  }

  render() {
    return(
      <div className="table-list-items" style={this.props.style}>
        {this.items}
      </div>
    )
  }
}

Items.propTypes = {
  columns: React.PropTypes.array,
  data: React.PropTypes.array.isRequired,
  rowRenderer: React.PropTypes.func.isRequired,
  select: React.PropTypes.object,
};

export default Items
