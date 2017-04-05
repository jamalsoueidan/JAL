import React from 'react'
import { Split, Pane } from 'components/split'

require('./stylesheet.css')

class Example extends React.Component {
  render() {
    return(
      <Split direction="horizontal">
        <div>jamal</div>
        <div>ahmad</div>
        <div>ahmad</div>
      </Split>
    )
  }
}

export default Example
