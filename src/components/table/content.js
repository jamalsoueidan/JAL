import React from 'react'
import { findDOMNode } from 'react-dom'
import Header from './header'
import List from 'components/list'

export default class Content extends React.Component {
  constructor(props) {
    super(props);
    this.state = { options: { columns: props.columns, select: props.select, setOptions: this.setOptions.bind(this) } };
  }

  get data() {
    const { data, perPage, indexAt} = this.props;
    const dataLength = data.length

    //perPage
    const percent = Math.floor(indexAt / data.length * 100)
    const divide = Math.ceil(percent / 100 * perPage);

    let from = indexAt - divide;
    let to = from + perPage;
    if(to >= dataLength) {
      from = dataLength - perPage;
      to = dataLength;
    }

    return data.slice(from, to)
  }

  get top() {
    const { clientHeight, scrollHeight } = this.state;

    if(!clientHeight || !scrollHeight) return 0;
    const { data, indexAt } = this.props;
    const percent = indexAt / data.length * 100;
    return percent / 100 * (clientHeight - scrollHeight);
  }

  setOptions(option) {
    this.setState({options: { ...this.state.options, ...option }})
  }

  findSelected() {
    const { data, select, selectHandler } = this.props
    if(!select) return;
    const keys = Object.keys(select);
    const index = data.findIndex((item) => keys.every(key => select[key] === item[key])) + 1;
    selectHandler(index)
  }

  render() {
    const { rowRenderer } = this.props;
    return <List className="table-list" style={{ position: "absolute", top: `-${this.top}px` }} itemRenderer={rowRenderer} data={this.data} options={{...this.state.options, type: 'item'}} ref="list" />
  }

  componentDidMount() {
    this.findSelected()
  }

  componentDidUpdate(prevProps, prevState) {
    if(prevProps.select!==this.props.select) {
      this.findSelected()
    }

    if(prevProps.scrollHeight !== this.props.scrollHeight) {
      const clientHeight = findDOMNode(this).clientHeight;
      this.setState({clientHeight, scrollHeight: this.props.scrollHeight})
    }

    if(prevProps.clientWidth !== this.props.clientWidth || prevProps.clientHeight !== this.props.clientHeight) {
      const SCHeight = this.SCHeight
      if(this.state.clientHeight !== SCHeight.clientHeight) {
        this.setState(SCHeight)
      }
    }
  }
}
