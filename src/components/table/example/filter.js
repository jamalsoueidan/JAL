import React from 'react'
import { Dropdown, DropdownManager } from 'components/dropdown'

const LinkControl = class extends React.Component {
  constructor() {
    super(...arguments)
    this.state = {
      visible: false
    }
  }

  onClick(evt) {
    evt.preventDefault();
    evt.stopPropagation();

    let isVisible = this.state.visible
    let { dropdown, link } = this.refs
    if(isVisible) {
      dropdown.hide();
    } else {
      dropdown.show(link);
    }

    this.setState({visible: !isVisible})
  }

  render() {
    const {columns} = this.props;
    return(
      <div className="filter">
        <div ref="link" className="link" onClick={this.onClick.bind(this)}>X</div>
        <Dropdown ref="dropdown">
        {columns.map(c=> {
          return(<div key={c.attribute}><label htmlFor={c.attribute}><input id={c.attribute} type="checkbox" name={c.attribute} onChange={() => c.visibility = !c.visibility} checked={(c.visibility ? "checked" : "")}/>{c.displayName}</label></div>)
        })}
        </Dropdown>
      </div>
    )
  }
}

export default LinkControl
