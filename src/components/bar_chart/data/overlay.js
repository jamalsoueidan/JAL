import * as d3 from 'd3'

export default class Overlay {
    constructor(data) {
      this.data = data;
      this._bars = this.reverse(this.data['bar'])
      this._extend = d3.extent(this._bars, d => parseFloat(d._value));
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
      return this._extend[0]
    }

    get max() {
      return this._extend[1]
    }

    getAttr(name) {
      return this.data[name]
    }
}
