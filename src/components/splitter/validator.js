const panes = (props, propName, componentName) => {
  componentName = componentName || 'splitter';

  if (props[propName]) {
    const value = props[propName];
    if( value.constructor !== Array ) {
      return new Error(propName + ' in ' + componentName + " is not array");
    }

    const children = props.children;
    if( children.length > value.length ) {
      return new Error(`${propName} in ${componentName} don't contain ${children.length} numbers, that's what we found ${value}`);
    }

    const sum = value.reduce((acc, val) => acc + val, 0)
    if(sum !== 100) {
      return new Error(`The total sum in ${propName} in ${componentName} must be 100, we recieved ${sum}`);
    }
  }

  return null;
}

export default { panes }
