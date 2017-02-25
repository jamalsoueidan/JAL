import * as d3 from 'd3'

export default class Overlay {
    constructor(data) {
      this.data = data;
      this._bars = this.reverse(this.data['bar'])
    }

    reverse(data) {
      let arr = []
      for(var i = data.length-1; i >= 0; i--) {
          arr.push(data[i]);
      }
      return arr;
    }

    get bars() {
      return this._bars;
    }

    get id() {
      return parseInt(this.data['_id'])
    }

    get min() {
      return d3.min(this.bars, d => parseFloat(d._value))
    }

    get max() {
      return d3.max(this.bars, d => parseFloat(d._value))
    }

    getAttr(name) {
      console.log(this.data);
      return this.data[name]
    }
}
