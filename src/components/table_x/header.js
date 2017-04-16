import React from 'react'
import Column from './column'
import { Splitter } from 'components'

class Header extends React.Component {
  onDragEnd(panes) {
    this.props.setOptions({panes})
  }

  render() {
    const { rowHeight, columns, filter, style } = this.props;

    return(
      <Splitter onDragEnd={this.onDragEnd.bind(this)}>
        {columns.filter(c=>c.visibility).map((c, index, array) => {
          let props = {style: style}

          if(index === (array.length-1)) {
            props.columns = columns;
            props.showFilter = true;
            props.showResize = false;
          }

          return(<Column key={c.attribute} item={c} filter={filter} {...props} />)
        })}
      </Splitter>
    )
  }
}

export default Header
