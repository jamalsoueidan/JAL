import React from 'react'

class TBody extends React.Component {
  render() {
    const { item, selected, columns } = this.props;
    let style = this.props.style;

    if(selected && selected.id === item.id) {
      style = { ...style, backgroundColor: "#ff0040" }
    }

    return(
      <tr style={style}>
        {columns.filter(c=>c.visibility).map(c => {
          return(<td key={c.attribute}>{item[c.attribute]}</td>)
        })}
      </tr>
    )
  }
}

export default TBody
