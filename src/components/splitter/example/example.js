import React from 'react'
import Splitter from 'components/splitter'

require('./stylesheet.css')

class Example extends React.Component {
  render() {
    return(
      <div className="example">
        <Splitter direction="row">
          <div>row 1</div>
          <div>row 2</div>
          <Splitter direction="column">
            <div>column 1</div>
            <div>column 2</div>
            <div>column 3</div>
            <div>column 4</div>
          </Splitter>
          <div>row 4</div>
        </Splitter>
      </div>
    )
  }
}

export default Example
