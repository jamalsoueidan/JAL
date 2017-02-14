import { EventEmitter } from 'fbemitter'

class DropdownManager extends EventEmitter {
  toggle(options) {
    const exist = this.current && this.current.dropdown === options.dropdown
    if(exist) {
      this.hide();
    } else {
      this.show(options)
    }
  }

  hide() {
    let dropdown = this.current.dropdown
    dropdown.hide();
    this.current = null;
    this.emit('hide', this)
  }

  show(options) {
    if(this.current) {
      this.current.dropdown.hide();
    }

    this.current = options
    this.current.dropdown.show(options.target)
    this.emit('show', this)
  }

  static getInstance() {
    if(!this.instance)
      this.instance = new DropdownManager();
    return this.instance;
  }

  static toggle(options) {
    const instance = DropdownManager.getInstance()
    instance.toggle(options)
  }
}

export default DropdownManager
