//http://nicolashery.com/integrating-d3js-visualizations-in-a-react-app/

import * as d3 from 'd3'
import * as json from './data'

const margin = {top: 20, right: 20, bottom: 30, left: 80};

class SVG {
  constructor(props, state) {
    this.width = props.width
    this.height = props.height
    this.state = state
  }

  setScale() {
    let { width, height } = this.getAreaSize()
    this.scale = {
      x: d3.scaleLinear().range([0, width]).domain([0, 3000]),
      y: d3.scaleBand().range([height, 0]).domain(this.getYAxisData()).padding(0.1)
    }
  }

  getYAxisData() {
    return this.state.data.map(function(d) { return d._label; })
  }

  getData() {
    return this.state.data
  }

  getAreaSize() {
    return {
      width: this.width - margin.left - margin.right,
      height: this.height - margin.top - margin.bottom,
    }
  }

  setDimension() {
    if(this.width === "100%") {
      let { width, height } = this.el.getBoundingClientRect()
      this.width = width
      this.height = height
    }
  }

  addSVG() {
    this.svg = d3.select(this.el)
                 .append('svg')
                 .attr('class', 'd3')
                 .attr('width', this.width)
                 .attr('height', this.height);

  }

  // http://1.bp.blogspot.com/-Z2pJ6B-WaQg/UNkKJcSf4xI/AAAAAAAAAJo/2Z9z-0pU6iA/s1600/canvassetup.png
  addArea() {
    this.area = this.svg.append("g").attr("transform", "translate(" + margin.left + "," + margin.top + ")");
  }

  addAxises() {
    let { width, height } = this.getAreaSize();
    let { x, y } = this.scale

    this.area.append("g").attr("transform", "translate(0," + height + ")").call(d3.axisBottom(x))
    this.area.append("g").call(d3.axisLeft(y))
  }

  addRects() {
    let { x, y } = this.scale

    this.area.append('g').selectAll(".rect")
                         .data(this.getData())
                         .enter().append("rect")
                         .attr("height", y.bandwidth())
                         .attr("y", function(d) { return y(d._label); })
                         .attr("width", function(d) { return x(d._value); })
  }

  toggle(actions) {
    this.toggleValues(actions.showValues)
    this.toggleAverage(actions.showAverage)
  }

  toggleValues(show) {
    if (!show) {
      this.area.select("g.text").remove()
      return;
    }

    let { x, y } = this.scale
    this.area.append('g').attr('class', 'text').selectAll("text")
            .data(this.getData())
            .enter()
            .append("text")
            .attr("x", function(d) { return x(d._value)+1; })
            .attr("y", function(d) {
              return y(d._label)+(y.bandwidth()/2);
            })
            .attr("dy", "3px")
            .attr("font-size", "12px")
            .text(function(d) { return d._value === "" ? "?" : d._value; })
  }

  toggleAverage(show) {
    if(!show) {
      this.area.select("g.line").remove()
      return;
    }

    let { x, y } = this.scale
    let { height } = this.getAreaSize()

    this.area.append('g').attr('class', 'line').append("line")
      .attr('stroke', 'red')
      .attr('stroke-width', '2')
      .attr('stroke-linecap', 'butt')
      .attr('stroke-opacity', 0.5)
      .attr("x1", x(this.state.consumption._average))
      .attr("y1", height)
      .attr("x2", x(this.state.consumption._average))
      .attr("y2", 0);
  }

  enter(el) {
    this.el = el
    this.setDimension();
    this.setScale();
    this.addSVG();
    this.addArea();
    this.addAxises();
    this.addRects();
  }

  update(el) {

  }

  exit(el) {

  }
}

export default SVG
