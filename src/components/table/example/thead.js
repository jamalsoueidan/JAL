import React from 'react'
import Column from './column'

class THead extends React.Component {
  render() {
    const { rowHeight, sort, item } = this.props;
    const style = {height: `${rowHeight}px`, lineHeight: `${rowHeight}px`}

    return(
      <tr key="thead" style={style}>
        <Column item={item[0]} sort={sort} />
        <Column item={item[1]} sort={sort} />
        <Column item={item[2]} sort={sort} />
        <Column item={item[3]} sort={sort} showResize={false} />
      </tr>
    )
  }
}

export default THead
