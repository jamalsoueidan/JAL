import React from 'react'
import { List, ListItem } from 'components/list'
import { routeNode } from 'react-router5';

require('./stylesheet.css')

const data = ["item", "item", "item"]

class Example extends React.Component {
  render() {
    const { route } = this.props;
    return(
      <div>
        <List data={data}/>

        <List className="customList" data={data} options={{obj1: "something"}} itemRenderer={(item, options) => <div>{item} {options.obj1}</div>} />

        <List>
          <ListItem className="header">
            Header
          </ListItem>
          <List className="items" data={data} itemRenderer={(item) => {
            <span className="testerne">{item}</span>
          }}/>
        </List>
      </div>
    )
  }
}

export default routeNode('')(Example);
