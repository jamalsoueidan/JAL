import * as d3 from 'd3'

export default class Data {
  constructor(data) {
    this._ebutler = data['ebutler']
    this._body = this._ebutler['body']
    this._graph = this._body['graph']
    this._consumption = this._graph['consumption']
    this._overlays = this._graph['overlays']
    this._bar = this.reverse(this.consumption['bar']);
  }

  reverse(data) {
    let reverse = []
    for(var i = data.length-1; i >= 0; i--) {
        reverse.push(data[i]);
    }
    return reverse;
  }
  get consumption() {
    return this._consumption;
  }

  get min() {
    return d3.min(this.bar, d => parseFloat(d._value))
  }

  get top() {
    return parseFloat(this._consumption['_top'])
  }
  
  get max() {
    return d3.max(this.bar, d => parseFloat(d._value))
  }

  get average() {
    return parseFloat(this._consumption['_average'])
  }

  get bar() {
    return this._bar
  }

  findOverlay(id) {
    if(!this._overlays) return null;
    let _overlay = this._overlays['overlay'].find(o => parseInt(o['_id']) === id )
    if(!_overlay) return null;
    return this.reverse(_overlay['bar']);
  }

  get standby() {
    if(this._standby) return this._standby;
    return this._standby = this.findOverlay(3)
  }

  get lastYear() {
    if(this._lastYear) return this._lastYear;
    return this._lastYear = this.findOverlay(5)
  }
}
