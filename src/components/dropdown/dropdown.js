import React from 'react'
import ToDropdown from './to_dropdown'
import cn from 'classNames'

export default ToDropdown(class extends React.Component {
  render() {
    let { style, children } = this.props
    let className = cn("dropdown", this.props.className)
    return(
      <div className={className} style={style}>
        {children}
      </div>
    )
  }
})
