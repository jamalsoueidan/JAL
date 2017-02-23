import SVG from './svg'
import React from 'react'
import ReactDOM from 'react-dom'
import * as data from './data.js'

export default class extends React.Component {
  constructor(props) {
    super(props)
    this.svg = new SVG({
      width: 600,
      height: 600
    }, data);
  }

  componentDidMount() {
    this.svg.enter(ReactDOM.findDOMNode(this), data);
  }

  componentDidUpdate() {
    this.svg.update(ReactDOM.findDOMNode(this), data);
  }

  componentWillUnmount() {
    this.svg.exist(ReactDOM.findDOMNode(this));
  }

  render() {
    return (
      <div className="Chart"></div>
    );
  }
}
