import React from 'react'
import { List, Item } from 'list'

require('./stylesheet.css')

const data = [1,2,3,4,5,6]

export default class extends React.Component {
  render() {
    return(
      <div>
        <List data={data} itemRenderer={(item) => item}/>

        <List>
          <Item className="header">
            Header
          </Item>
          <List className="items" data={data} itemRenderer={(item) => item} />
        </List>
      </div>
    )
  }
}
