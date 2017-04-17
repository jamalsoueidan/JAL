import React from 'react'

export default class Row extends React.Component {
  render() {
    const { item, selected, columns, panes } = this.props;

    return(
      <div className="row">
        {columns.filter(c=>c.visibility).map((c, index) => {
          let style = {}
          if(panes) {
            style["width"] = panes[index].length + "%"
            style["flex"] = "auto"
          }
          
          return(
            <div key={c.attribute} className="column" style={style}>
              <div className="attribute">{c.displayName}:</div>
              <div className="value">{item[c.attribute]}</div>
            </div>)
        })}
      </div>
    )
  }
}
