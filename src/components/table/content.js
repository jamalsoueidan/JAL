import React from 'react'
import { findDOMNode } from 'react-dom'

export default class Content extends React.Component {
  constructor(props) {
    super(props)
    this.data = props.data;
    this.state = {
      columns: props.columns
    }
  }

  /* This method is called when "selected" props is set */
  scrollToSelected() {
    const { selected, rowIndexToScrollPosition, rowHeight } = this.props
    if(!selected) return;
    const keys = Object.keys(selected);
    const index = this.data.findIndex((item) => keys.every(key => selected[key] === item[key]))
    rowIndexToScrollPosition(index)
  }

  sort(callback) {
    this.setState({sort: callback});
  }

  filter(columns) {
    this.setState({columns})
  }

  get tbody() {
    const { rowPosition, rowHeight, rowRenderer, perPage, selected } = this.props;
    const columns = this.state.columns;
    const style = {height: `${rowHeight}px`, lineHeight: `${rowHeight}px`};

    if(this.data.length===0) {
      return rowRenderer(null, {
        type: 'thead', style
      })
    }

    const data = this.data;
    let from = Math.ceil( rowPosition );
    let to = perPage+from;
    if(to>=data.length) {
      from = data.length - perPage;
      to = data.length;
    }

    return data.slice(from, to).map(item => rowRenderer(item, {type: 'tbody', style, selected, columns}));
  }

  get thead() {
    const { rowRenderer, rowHeight } = this.props;
    const columns = this.state.columns;
    if(!columns) return;
    const style = {height: `${rowHeight}px`, lineHeight: `${rowHeight}px`};
    return rowRenderer(null, {type: 'thead', rowHeight, sort: this.sort.bind(this), filter: this.filter.bind(this), columns, style})
  }

  render() {
    const { rowPosition, rowHeight, perPage, tableHeight } = this.props;
    const length = this.data.length - perPage;
    const percent = (rowPosition / length * 100);
    const top = percent / 100 * ((rowHeight * (perPage+1)) - tableHeight)

    return(
      <div className="content">
        <div className="content-header">
        {this.thead}
        </div>
        <div className="content-body">
          <div className="content-items" style={{top: `-${top}px`}}>
            {this.tbody}
          </div>
        </div>
      </div>
    )
  }

  componentDidMount() {
    this.scrollToSelected()
  }

  componentWillUpdate(nextProps, nextState) {
    if(nextProps.data!== this.props.data) {
      this.data = nextProps.data;
    }

    if(nextState.sort !== this.state.sort) {
      const sort = nextState.sort
      this.data = this.data.sort(sort);
    }
  }

  componentDidUpdate(prevProps) {
    if(prevProps.selected!==this.props.selected) {
      this.scrollToSelected()
    }
  }
}
