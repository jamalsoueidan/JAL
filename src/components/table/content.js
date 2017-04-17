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
    const percent = indexAt / data.length * 100
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
    if(!this.state.scrollHeight) return;
    const { data, indexAt } = this.props;
    const leftScrollHeight = this.state.scrollHeight - this.state.clientHeight;
    const percent = indexAt / data.length * 100;
    return percent / 100 * leftScrollHeight;
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

    return(
      <div className="table-content">
        <Header rowRenderer={rowRenderer} options={{...this.state.options, type: 'header'}} />
        <div className="table-body" ref="body">
          <List className="table-list" style={{ top: `-${this.top}px` }} itemRenderer={rowRenderer} data={this.data} options={{...this.state.options, type: 'item'}} ref="list" />
        </div>
      </div>
    )
  }

  get SCHeight() {
    const scrollHeight = findDOMNode(this.refs.list).scrollHeight;
    const clientHeight = findDOMNode(this.refs.body).clientHeight
    return {scrollHeight, clientHeight};
  }

  componentDidMount() {
    this.findSelected()

    if(!this.state.scrollHeight) {
      this.setState(this.SCHeight)
    }
  }

  componentDidUpdate(prevProps, prevState) {
    if(prevProps.selected!==this.props.selected) {
      this.findSelected()
    }

    if(prevProps.clientWidth !== this.props.clientWidth) {
      const SCHeight = this.SCHeight
      if(this.state.scrollHeight !== SCHeight.scrollHeight) {
        this.setState(SCHeight)
      }
    }
  }
}
