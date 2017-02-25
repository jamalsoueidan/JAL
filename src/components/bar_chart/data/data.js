import * as d3 from 'd3'
import Overlay from './overlay'
import Consumption from './consumption'

export default class Data {
  constructor(data) {
    this._ebutler = data['ebutler']
    this._body = this._ebutler['body']
    this._graph = this._body['graph']
    this._consumption = new Consumption(this._graph['consumption'])
    this._overlays = this._graph['overlays']
  }

  findOverlay(id) {
    if(!this._overlays) return null;
    let _overlay = this._overlays['overlay'].find(o => parseInt(o['_id']) === id )
    if(!_overlay) return null;
    return new Overlay(_overlay);
  }

  get consumption() {
    return this._consumption;
  }

  get cooling() {
    if(this._cooling) return this._cooling;
    return this._cooling = this.findOverlay(6)
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
