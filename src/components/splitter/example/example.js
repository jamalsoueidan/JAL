import React from 'react'
import Splitter from 'components/splitter'

require('./stylesheet.css')

class Example extends React.Component {
  render() {
    return(
      <div className="example">
        <Splitter direction="row">
          <div>1</div>
          <div>2</div>
          <div>3</div>
          <div>4</div>
        </Splitter>
      </div>
    )
  }
}

export default Example
