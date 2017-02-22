//http://nicolashery.com/integrating-d3js-visualizations-in-a-react-app/

import * as d3 from 'd3'

const margin = {top: 20, right: 20, bottom: 30, left: 80};
var d3Chart = {};

d3Chart.create = function(el, props, state) {
  var svg = d3.select(el).append('svg')
      .attr('class', 'd3')
      .attr('width', props.width)
      .attr('height', props.height);

  svg.append('g')
      .attr('class', 'd3-points');


  //this.update(el, state);
};


d3Chart.update = function(el, state) {
  // Re-compute the scales, and render the data points

};

d3Chart.destroy = function(el) {
  // Any clean-up would go here
  // in this example there is nothing to do
};

export default d3Chart
