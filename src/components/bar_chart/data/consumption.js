import Overlay from './overlay'
import * as d3 from 'd3'

export default class Consumption extends Overlay {
  get top() {
    return parseFloat(this.data['_top'])
  }

  get average() {
    return parseFloat(this.data['_average'])
  }
}
