import React from 'react'
import { findDOMNode } from 'react-dom'
import Header from './header'
import Items from './items'

export default class Content extends React.Component {
  scrollToSelected() {
    const { selected, rowIndexToScrollPosition, data } = this.props
    if(!selected) return;
    const keys = Object.keys(selected);
    const index = data.findIndex((item) => keys.every(key => selected[key] === item[key]))
    rowIndexToScrollPosition(index)
  }

  render() {
    return(<Items {...this.props} />)
  }

  componentDidMount() {
    this.scrollToSelected()
  }

  componentDidUpdate(prevProps) {
    if(prevProps.selected!==this.props.selected) {
      this.scrollToSelected()
    }
  }
}
