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

        <List data={data} itemRenderer={(item) => <div>{item}</div>} />

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
