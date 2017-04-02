import React from 'react'

export default class Column extends React.Component {
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

  shouldComponentUpdate() {
    return false;
  }

  render() {
    const { item } = this.props;
    return(<td onClick={this.onClick.bind(this)}>{item.displayName}</td>)
  }
}
