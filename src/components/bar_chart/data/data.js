import * as d3 from 'd3'
import Overlay from './overlay'
import Consumption from './consumption'

const OVERLAYS = [{ name: 'cooling', id: 6 }, { name: 'standby', id: 3 }, { name: 'last_year', id: 5 }]

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

  // TODO: check if overlay exists
  getOverlay(name) {
    let _overlay = OVERLAYS.find(o => o.name === name)
    return findOverlay(_overlay.id)
  }

  get consumption() {
    return this._consumption;
  }

  get temperature() {
    if(this._temperature) return this._temperature;
    return this._temperature = this.findOverlay(7)
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
