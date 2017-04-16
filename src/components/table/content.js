import React from 'react'
import { findDOMNode } from 'react-dom'
import Header from './header'
import List from 'components/list'

export default class Content extends React.Component {
  constructor(props) {
    super(props);
    this.state = { options: { columns: props.columns, select: props.select, setOptions: this.setOptions.bind(this) } };
  }

  findSelected() {
    const { data, select, selectHandler } = this.props
    if(!select) return;
    const keys = Object.keys(select);
    const index = data.findIndex((item) => keys.every(key => select[key] === item[key]))
    selectHandler(index-25)
  }

  get node() {
    return findDOMNode(this);
  }

  get scrollHeight() {
    const node = findDOMNode(this);
    return this.state.scrollHeight || this.node.scrollHeight
  }

  get missingHeight() {
    const node = findDOMNode(this);
    return this.scrollHeight - this.node.clientHeight;
  }

  calculateTop() {
    if(!this.state.scrollHeight) {
      this.setState({scrollHeight: this.scrollHeight})
    }

    this.setState({missingHeight: this.missingHeight})
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

  setOptions(option) {
    this.setState({options: { ...this.state.options, ...option }})
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
    const { rowRenderer } = this.props;

    return(
      <div className="table-content">
        <Header rowRenderer={rowRenderer} options={{...this.state.options, type: 'header'}} />
        <div className="table-body">
          <List className="table-list" style={this.style} itemRenderer={rowRenderer} data={this.data} options={{...this.state.options, type: 'item'}} />
        </div>
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

    if(this.missingHeight !== this.state.missingHeight) {
      this.calculateTop();
    }
  }
}
