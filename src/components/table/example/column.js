import React from 'react'
import { findDOMNode } from 'react-dom'
import Resize from './resize'

class Column extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      a: -1,
      b: 1
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

  onResize(totalMovement) {
    if(!totalMovement) {
      this.width = findDOMNode(this).clientWidth;
      return;
    }
    let width = this.width;
    width += totalMovement;
    this.setState({width})
  }

  get renderResize() {
    const { showResize } = this.props;

    if(!showResize) {
      return;
    }

    return(<Resize onResize={this.onResize.bind(this)} />)
  }

  render() {
    const { item } = this.props;
    const { width } = this.state
    return(
      <td style={{width}} onClick={this.onClick.bind(this)}>
        <div>{item.displayName}</div>
        {this.renderResize}
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
