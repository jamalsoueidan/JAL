import d3Chart from './chart'
import React from 'react'
import ReactDOM from 'react-dom'


export default class extends React.Component {
  componentDidMount() {
    d3Chart.create(ReactDOM.findDOMNode(this), {
      width: '100%',
      height: '300px'
    }, this.getChartState());
  }

  componentDidUpdate() {
    d3Chart.update(ReactDOM.findDOMNode(this), this.getChartState());
  }

  getChartState() {
    return {
      data: this.props.data,
      domain: this.props.domain
    };
  }

  componentWillUnmount() {
    d3Chart.destroy(ReactDOM.findDOMNode(this));
  }

  render() {
    return (
      <div className="Chart"></div>
    );
  }
}
