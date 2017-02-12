const DropdownManager = class {
  toggle(options) {
    const exist = this.current && this.current.element === options.element
    if(exist) {
      this.hide();
    } else {
      this.show(options)
    }
  }

  hide() {
    let element = this.current.element
    element.hide();
    this.current = null;
  }

  show(options) {
    if(this.current) {
      this.current.element.hide();
    }

    this.current = options
    this.current.element.show(options.target)
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
