import React from 'react'
import Column from './column'

class THead extends React.Component {
  render() {
    const { rowHeight, sort, columns, filter, style } = this.props;

    return(
      <tr key="thead">
        {columns.filter(c=>c.visibility).map((c, index, array) => {
          let props = {style: style}

          if(index === (array.length-1)) {
            props.columns = columns;
            props.showFilter = true;
            props.showResize = false;
          }

          return(<Column key={c.attribute} item={c} sort={sort} filter={filter} {...props} />)
        })}
      </tr>
    )
  }
}

export default THead