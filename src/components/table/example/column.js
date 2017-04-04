import React from 'react'
import { findDOMNode } from 'react-dom'
import Resize from './resize'
import Filter from './filter'

class Column extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      a: 1,
      b: -1
    }
  }

  onClick() {
    const { sort } = this.props;
    if(this.state.a>0) {
      this.setState({
        a: -1,
        b: 1
      })
    } else {
      this.setState({
        a: 1,
        b: -1
      })
    }
    sort(this.sort.bind(this))
  }

  sort(a,b) {
    const item = this.props.item;
    const attribute = item.attribute;

    if ( a[attribute] < b[attribute] )
        return this.state.a;
    if ( a[attribute] > b[attribute] )
        return this.state.b;

    return 0;
  }

  onResize(clientX) {
    const width = clientX - findDOMNode(this).offsetLeft
    this.setState({width})
  }

  get renderResize() {
    const { showResize } = this.props;
    if(!showResize) return;
    return(<Resize onResize={this.onResize.bind(this)} />)
  }

  get renderFilter() {
    const { showFilter, columns } = this.props;
    if(!showFilter) return;
    return(<Filter columns={columns} />)
  }

  get style() {
    const { width } = this.state
    if(!width) return {};
    return {width}
  }

  render() {
    const { item } = this.props;

    return(
      <td style={this.style}>
        <div className="displayName" onClick={this.onClick.bind(this)}>{item.displayName}</div>
        {this.renderResize}
        {this.renderFilter}
      </td>
    )
  }

  componentDidMount() {
    this.width = findDOMNode(this).clientWidth
  }
}

Column.propTypes = {
  showResize: React.PropTypes.bool
};

Column.defaultProps = {
  showResize: true
};

export default Column
