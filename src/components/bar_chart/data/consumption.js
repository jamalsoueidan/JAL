import Overlay from './overlay'
import * as d3 from 'd3'

export default class Consumption extends Overlay {
  get top() {
    return parseFloat(this.data['_top'])
  }

  get min() {
    return d3.min(this.bars, d => parseFloat(d._value))
  }

  get max() {
    return d3.max(this.bars, d => parseFloat(d._value))
  }

  get average() {
    return parseFloat(this.data['_average'])
  }
}
