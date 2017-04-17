import React from 'react'
import Splitter from 'components/splitter'

require('./stylesheet.css')

class Example extends React.Component {
  render() {
    return(
      <div className="example">
        <Splitter orientation="vertical">
          <div>row 1</div>
          <div>row 2</div>
          <Splitter orientation="horizontal">
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
