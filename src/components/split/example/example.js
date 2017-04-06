import React from 'react'
import { Split, Pane } from 'components/split'

require('./stylesheet.css')

class Example extends React.Component {
  render() {
    return(
      <div className="example">
        <Split direction="row">
          <div>1</div>
          <div>2</div>
          <div>3</div>
          <div>4</div>
        </Split>
      </div>
    )
  }
}

export default Example
