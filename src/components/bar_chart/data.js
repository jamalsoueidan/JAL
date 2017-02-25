import * as d3 from 'd3'

export default class Data {
  constructor(data) {
    this._ebutler = data['ebutler']
    this._body = this._ebutler['body']
    this._graph = this._body['graph']
    this._consumption = this._graph['consumption']
    this.reverse();
  }

  reverse() {
    let reverse = []
    for(var i = this.consumption['bar'].length-1; i >= 0; i--) {
        reverse.push(this.consumption['bar'][i]);
    }
    this._bar = reverse;
  }
  get consumption() {
    return this._consumption;
  }

  get min() {
    return d3.min(this.bar, d => parseFloat(d._value))
  }

  get max() {
    return parseFloat(this._consumption['_top'])
  }

  get average() {
    return parseFloat(this._consumption['_average'])
  }

  get bar() {
    return this._bar
  }
}
