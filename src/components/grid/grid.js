import React from 'react'

require('./stylesheet.css')

class GridList extends React.Component {
  get renderItems() {
     const {items} = this.props;
     const from = 0;
     const to = 20;
     return items.slice(from, to).map(i => {
       return(<div key={i.id} style={{height: "20px", border: "1px solid #000"}}>{i.name}</div>)
     })
   }

   render() {
     return(
       <div className="grid">
         <GridList />
       </div>
     )
   }

   componentDidMount() {
     const node = findDOMNode(this)
   }
}

export default GridList
