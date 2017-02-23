import SVG from './svg'
import React from 'react'
import ReactDOM from 'react-dom'
import * as data from './data.js'

export default class extends React.Component {
  constructor(props) {
    super(props)
    this.svg = new SVG({
      width: "100%",
      height: "100%"
    }, data);
  }

  componentDidMount() {
    this.svg.enter(ReactDOM.findDOMNode(this), data);
    this.svg.toggle(this.props)
  }

  componentDidUpdate() {
    this.svg.update(ReactDOM.findDOMNode(this), data);
    this.svg.toggle(this.props)
  }

  componentWillUnmount() {
    this.svg.exit(ReactDOM.findDOMNode(this));
  }

  render() {
    return (
      <div className="Chart"></div>
    );
  }
}
