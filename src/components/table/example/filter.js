import React from 'react'
import FilterIcon from './filter_icon'
import { Dropdown, DropdownManager } from 'components/dropdown'

const LinkControl = class extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      visible: false
    }
  }

  onClick(evt) {
    evt.preventDefault();
    evt.stopPropagation();

    this.setState({visible: !this.state.visible})
  }

  //TODO: Needs refactoring.
  onChange(column) {
    const { columns, filter } = this.props;
    if(column.visibility && columns.filter(c => c.visibility).length===1) {
      return;
    }

    const newColumns = [...columns].map(c => {
      if(c.attribute === column.attribute) {
        c.visibility = (c.visibility ? false : true);
      }
      return c;
    })

    filter(newColumns)
  }

  render() {
    const {columns} = this.props;
    return(
      <div className="filter">
        <div className="filter-image" onClick={this.onClick.bind(this)}>
          <FilterIcon />
        </div>
        <div className="filter-list" style={{display: (this.state.visible?"block":"none")}}>
          {columns.map(c=> {
            return(<div key={c.attribute}><label htmlFor={c.attribute}><input id={c.attribute} type="checkbox" name={c.attribute} checked={c.visibility} onChange={this.onChange.bind(this, c)} />{c.displayName}</label></div>)
          })}
        </div>
      </div>
    )
  }
}

export default LinkControl
