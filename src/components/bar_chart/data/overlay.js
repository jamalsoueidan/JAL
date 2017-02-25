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
}
