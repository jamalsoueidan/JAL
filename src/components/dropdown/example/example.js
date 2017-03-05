import React from 'react';
import { Dropdown, DropdownManager } from 'components/dropdown'

require('./stylesheet.css')

const LinkControl = class extends React.Component {
  constructor() {
    super(...arguments)
    this.state = {
      visible: false
    }
  }

  onClick(evt) {
    let isVisible = this.state.visible
    let { dropdown, link } = this.refs
    if(isVisible) {
      dropdown.hide();
    } else {
      dropdown.show(link);
    }

    this.setState({visible: !isVisible})
  }

  render() {
    return(
      <div>
        <div ref="link" className="link" style={this.props.style} onClick={this.onClick.bind(this)}>{this.props.name}</div>
        <Dropdown ref="dropdown">{this.props.children}</Dropdown>
      </div>
    )
  }
}

const LinkManager = class extends React.Component {
  onClick(evt) {
    DropdownManager.toggle({
      dropdown: this.refs.dropdown,
      target: this.refs.link
    })
  }

  render() {
    return(
      <div>
        <div ref="link" className="link" style={this.props.style} onClick={this.onClick.bind(this)}>{this.props.name}</div>
        <Dropdown ref="dropdown">{this.props.children}</Dropdown>
      </div>
    )
  }
}


export default class extends React.Component {
  constructor() {
    super(...arguments)
    this.onClick = this.onClick.bind(this);
  }

  componentDidMount() {
    DropdownManager.getInstance().addListener('show', this.show.bind(this))
  }

  componentWillUnmount() {
    DropdownManager.getInstance().removeAllListeners('show')
    document.removeEventListener('click', this.onClick, false)
  }

  show() {
    document.addEventListener('click', this.onClick, false)
  }

  onClick(evt) {
    let d = DropdownManager.getInstance()
    if (d.current && evt.target !== d.current.target) {
      d.hide();
    }
    document.removeEventListener('click', this.onClick, false)
  }

  render() {
    return(
      <div>
        <LinkControl style={{left: "0px", bottom: "0px", position: "absolute"}} name="Bottom Left"><div>okasd </div></LinkControl>
        <LinkControl style={{right: "0px", top: "0px", position: "absolute"}} name="Top Right">DOWN NOW</LinkControl>
        <LinkManager style={{right: "0px", bottom: "0px", position: "absolute"}} name="Bottom right">Jamal Soueidan</LinkManager>
        <LinkManager style={{left: "50%", top: "10%", position: "absolute"}} name="Top center">Jamal <br />Soueidan</LinkManager>
        <LinkManager style={{left: "50%", top: "80%", position: "absolute"}} name="Bottom center">Jamal GETINSTANCE <br />Soueidan</LinkManager>
        <LinkManager name="Top left"><div>=====================</div></LinkManager>
      </div>
    )
  }
}
