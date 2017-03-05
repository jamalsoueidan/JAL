import React from 'react'
import { BaseLink, withRoute } from 'react-router5';

class LinkTo extends React.Component {
  onClick(evt) {
    const { router, name, params, options } = this.props;
    evt.preventDefault();
    router.navigate(name, params, options);
  }

  render() {
    return(<a href="#" onClick={this.onClick.bind(this)}>{this.props.children}</a>)
  }
}

export default withRoute(LinkTo)
