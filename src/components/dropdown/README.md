# Dropdown

Dropdown/tooltip component.

## Examples

Here is simple example! We are using DropdownManager to handle all dropdowns on the page, DropdownManager will toggle the element.

```js
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
        <div ref="link" className="link" onClick={this.onClick.bind(this)}>click me</div>
        <Dropdown ref="dropdown">example</Dropdown>
      </div>
    )
  }
}
```

If you like to have more control over the dropdown element, but use this only if you would like to be able to show more then one dropdown at the time.

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
    return(
      <div>
        <div ref="link" className="link" onClick={this.onClick.bind(this)}>click me</div>
        <Dropdown ref="dropdown">dropdown</Dropdown>
      </div>
    )
  }
}
```

Last thing, if you would like to have the option to click anywhere on the screen to hide any dropdown, you can listen on dropdownManager, keep in mind you have to toggle the dropdowns using dropdownManger.toggle method!

```js
export default class extends React.Component {
  constructor() {
    super(...arguments)
    this.onClick = this.onClick.bind(this);
  }

  componentDidMount() {
    DropdownManager.getInstance().addListener('show', this.show.bind(this))
  }

  componentWillUnmount() {
    DropdownManager.getInstance().removeListener('show', this.show.bind(this))
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
    ...
  }
}
```

## Customization

Depending on where the dropdown element will be positioned, the element will get special className (.dropdown.centerTop, .dropdown.centerBottom, .dropdown.leftTop etc).

You can style those and get the look and feel you need!
