import React from 'react';
import BarChart from 'bar_chart'
import chart1 from './data.js'
import chart2 from './data1.js'
import day from './day.js'
import time from './time.js'

require('./stylesheet.css')

export default class extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      hideText: true,
      hideAverage: true,
      hideLastYear: true,
      hideStandby: true
    }
  }

  showValues() {
    this.setState({
      hideText: !this.state.hideText
    })
  }

  showAverage() {
    this.setState({
      hideAverage: !this.state.hideAverage
    })
  }

  showStandby() {
    this.setState({
      hideStandby: !this.state.hideStandby
    })
  }

  showLastYear() {
    this.setState({
      hideLastYear: !this.state.hideLastYear
    })
  }

  render() {

    let margin = {left: 70, right: 20, top: 5, bottom: 5};

    return(
      <div>
        <button onClick={this.showValues.bind(this)}>Sæjleværdier</button>
        <button onClick={this.showAverage.bind(this)}>Gennemsnit</button>
        <button onClick={this.showStandby.bind(this)}>Standbyforbrug</button>
        <button onClick={this.showLastYear.bind(this)}>Sidste år</button>
        <h1>Responsive</h1>
        <div className="overflow">
          <div className="float">
            <BarChart className="el" data={time} {...this.state} />
          </div>
          <div className="float">
            <BarChart className="water" data={day} {...this.state} />
          </div>
          <div className="float">
            <BarChart className="heat" data={chart2} margins={margin} {...this.state} hideAxisX />
          </div>
        </div>
        <h1>Fixed</h1>
        <BarChart data={chart1} {...this.state} width="500" height="500" />
      </div>
    )
  }
}
