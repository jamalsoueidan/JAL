import React from 'react'
import Column from './column'

class THead extends React.Component {
  render() {
    const { rowHeight, sort, columns } = this.props;
    const style = {height: `${rowHeight}px`, lineHeight: `${rowHeight}px`}

    return(
      <tr key="thead" style={style}>
        {columns.filter(c=>c.visibility).map((c, index, array) => {
          let props = {}

          if(index === (array.length-1)) {
            props.columns = columns;
            props.showFilter = true;
            props.showResize = false;
          }

          return(<Column key={c.attribute} item={c} sort={sort} {...props} />)
        })}
      </tr>
    )
  }
}

export default THead
