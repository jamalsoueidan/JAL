import React from 'react'
import { findDOMNode } from 'react-dom'

export default class Items extends React.Component {
  constructor(props) {
    super(props)
    this.data = props.data;
  }

  /* This method is called when "selected" props is set */
  scrollToSelected() {
    const { selected, rowIndexToScrollPosition, rowHeight } = this.props
    if(!selected) return;
    const keys = Object.keys(selected);
    const index = this.data.findIndex((item) => keys.every(key => selected[key] === item[key]))
    rowIndexToScrollPosition(index)
  }

  get tbody() {
    const { rowPosition, rowHeight, rowRenderer, perPage, selected, columns } = this.props;
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

  render() {
    const { rowPosition, rowHeight, perPage, tableHeight } = this.props;
    const length = this.data.length - perPage;
    const percent = (rowPosition / length * 100);
    const top = percent / 100 * ((rowHeight * (perPage+1)) - tableHeight)

    return(
      <div className="content-items" style={{top: `-${top}px`}}>
        {this.tbody}
      </div>
    )
  }

  componentDidMount() {
    this.scrollToSelected()
  }

  componentDidUpdate(prevProps) {
    if(prevProps.selected!==this.props.selected) {
      this.scrollToSelected()
    }
  }
}
