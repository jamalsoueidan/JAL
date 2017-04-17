import React from 'react'
import { findDOMNode } from 'react-dom'
import debounce from 'utils/debounce'

export default (WrappedComponent) => class extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      clientWidth: 0,
      clientHeight: 0
    }

    this.onResize = debounce(this.onResize.bind(this), 500).bind(this)
  }

  onResize() {
    const node = findDOMNode(this);
    const clientWidth = node.clientWidth
    const clientHeight = node.clientHeight
    this.setState({clientHeight, clientWidth})
  }

  render() {
    const { clientHeight, clientWidth } = this.state;
    return <WrappedComponent clientHeight={clientHeight} clientWidth={clientWidth} {...this.props} />
  }

  componentDidMount() {
    this.onResize();
    window.addEventListener('resize', this.onResize, false)
  }

  componentWillUnmount() {
    window.removeEventListener('resize', this.onResize, false)
  }
}
