import ReactDOM from 'react-dom'

const findDOMNode = ReactDOM.findDOMNode

export default class {
  constructor(options) {
    this.options = options
  }

  getClassName() {
    return this.className
  }

  getStyle() {
    let { target, dropdown } = this.options;
    target = findDOMNode(target).getBoundingClientRect()
    dropdown = findDOMNode(dropdown).getBoundingClientRect()

    // DEFAULT BOTTOM/CENTER
    let left = target.left + ( target.width / 2 ) - ( dropdown.width / 2 );
    let top  = target.bottom;

    this.className = "center"
    // out left side?
    if( left < 0 ) {
      this.className = "left"
      left = target.left;
    }

    // out right side?
    let outRight = left+dropdown.width > window.innerWidth
    if ( outRight ) {
      this.className = "right"
      left = window.innerWidth - dropdown.width
    }

    // out bottom?
    let outBottom = top+dropdown.height > window.innerHeight
    if ( outBottom ) {
      this.className += "Top"
      top = target.top - dropdown.height
    } else {
      this.className += "Bottom"
    }

    return {
      left: left,
      top: top,
      position: 'fixed'
    }
  }
}
