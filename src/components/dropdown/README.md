# Dropdown

Dropdown/tooltip component.

## Examples

Here is simple example! We are using DropdownManager to handle all dropdowns on the page, DropdownManager will toggle the element.

```js
const LinkManager = class extends React.Component {
  onClick(evt) {
    DropdownManager.toggle({
      element: this.refs.dropdown,
      target: this.refs.link
    })
  }

  render() {
    return(<div>
        <div ref="link" className="link" style={this.props.style} onClick={this.onClick.bind(this)}>{this.props.name}</div>
        <Dropdown ref="dropdown">{this.props.children}</Dropdown>
        </div>)
  }
}
```

If you like to have more control over the element use directly Dropdown!

```js
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
    return(<div>
        <div ref="link" className="link" style={this.props.style} onClick={this.onClick.bind(this)}>{this.props.name}</div>
        <Dropdown ref="dropdown">{this.props.children}</Dropdown>
        </div>)
  }
}
```

## Customization

Depending on where the dropdown element will be positioned, the element will get special className (.dropdown.centerTop, .dropdown.centerBottom, .dropdown.leftTop etc).

You can style those and get the look and feel you need! 
