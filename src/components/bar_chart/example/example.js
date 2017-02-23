import React from 'react';
import BarChart from 'bar_chart'
import chart1 from './data.js'
import chart2 from './data1.js'
import chart3 from './data2.js'

require('./stylesheet.css')

export default class extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      hideText: true,
      hideAverage: true,
      hideLastYear: true
    }
  }

  addValues() {
    this.setState({
      hideText: !this.state.hideText,
      hideAverage: !this.state.hideAverage,
      hideLastYear: !this.state.hideLastYear
    })
  }

  render() {
    return(
      <div>
        <button onClick={this.addValues.bind(this)}>Values</button>
        <div className="overflow">
          <div className="float">
            <BarChart data={chart1} {...this.state} />
          </div>
          <div className="float">
            <BarChart data={chart2} {...this.state} />
          </div>
          <div className="float">
            <BarChart data={chart3} margins={{left: 70, right: 20, top: 20, bottom: 20}} {...this.state} />
          </div>
        </div>
        <BarChart data={chart1} {...this.state} width="500" height="500" />
      </div>
    )
  }
}
