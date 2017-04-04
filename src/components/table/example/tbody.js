import React from 'react'

class TBody extends React.Component {
  render() {
    const { item, selected } = this.props;
    let style = this.props.style;

    /*if(selected && selected.id === item.id) {
      style["backgroundColor"] = "#ff0040"
    }*/

    return(
      <tr style={style}>
        <td>{item.id}</td>
        <td>{item.first_name}</td>
        <td>{item.last_name}</td>
        <td>{item.gender}</td>
      </tr>
    )
  }
}

export default TBody
