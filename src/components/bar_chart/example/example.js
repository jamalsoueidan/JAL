import React from 'react';
import BarChart from 'bar_chart'

require('./stylesheet.css')

var sampleData = [
  {id: '5fbmzmtc', x: 7, y: 41, z: 6},
  {id: 's4f8phwm', x: 11, y: 45, z: 9}
];

var domain = {x: [0, 30], y: [0, 100] }

export default class extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      hideText: true,
      hideLine: true
    }
  }

  addValues() {
    this.setState({
      hideText: !this.state.hideText,
      hideLine: !this.state.hideLine
    })
  }

  render() {
    return(
      <div>
        <button onClick={this.addValues.bind(this)}>Values</button>
        <div className="overflow">
          <div className="float">
            <BarChart data={sampleData} domain={domain} {...this.state} />
          </div>
          <div className="float">
            <BarChart data={sampleData} domain={domain} {...this.state} />
          </div>
          <div className="float">
            <BarChart data={sampleData} domain={domain} {...this.state} />
          </div>
        </div>
        <BarChart data={sampleData} domain={domain} {...this.state} width="500" height="500" />
      </div>
    )
  }
}
