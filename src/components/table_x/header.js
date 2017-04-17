import React from 'react'
import { Splitter } from 'components'

const HeaderColumn = ({column, onClick}) => (
  <div className="column">
    <div className="displayName" onClick={() => onClick(column)}>{column.displayName}</div>
  </div>
)

class Header extends React.Component {
  constructor(props) {
    super(props)
    this.onClick = this.onClick.bind(this)
  }

  onClick(column) {
    this.props.onSort(column.attribute)
  }

  onDragEnd(panes) {
    this.props.setOptions({panes})
  }

  render() {
    const { rowHeight, columns } = this.props;

    return(
      <Splitter onDragEnd={this.onDragEnd.bind(this)}>
        {columns.filter(c=>c.visibility).map(column => {
          return(<HeaderColumn key={column.attribute} column={column} onClick={this.onClick} />)
        })}
      </Splitter>
    )
  }
}

export default Header
