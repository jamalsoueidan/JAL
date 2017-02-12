import React from 'react'
import ReactDOM from 'react-dom'

const Application = class extends React.Component {
  render() {
    return(<div>test</div>)
  }
}

ReactDOM.render(<Application />, document.getElementById('application'))
