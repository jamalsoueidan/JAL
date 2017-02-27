import React from 'react'
import { List, Item } from 'list'

require('./stylesheet.css')

const data = ["item", "item", "item"]

export default class extends React.Component {
  render() {
    return(
      <div>
        <List data={data}/>

        <List data={data} itemRenderer={(item) => <div>{item}</div>} />

        <List>
          <Item className="header">
            Header
          </Item>
          <List className="items" data={data} itemRenderer={(item) => <span className="testerne">{item}</span>} />
        </List>
      </div>
    )
  }
}
