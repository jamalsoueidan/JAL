# React Application Library

Developing some components that I can reuse on different projects I'm developing for customers!

## Components

- [BarChart](https://github.com/jamalsoueidan/react-application-library/tree/master/src/components/barchart)

Custom graph in d3.js

- [Dropdown](https://github.com/jamalsoueidan/react-application-library/tree/master/src/components/dropdown)

Dropdown component

- [List](https://github.com/jamalsoueidan/react-application-library/tree/master/src/components/list)

List renderer items

- [Table](https://github.com/jamalsoueidan/react-application-library/tree/master/src/components/table)

Optimized for performance renderer items, simple table!

- [TableX](https://github.com/jamalsoueidan/react-application-library/tree/master/src/components/table_x)

This is build on our previous table with sorting, resize columns, filtering columns, paginate, etc.

# Rules

## 1
Events that are added as props must be named as "nameHandler", callback should be named "onName".

```js
<Any resizeHandler={this.onResize} />
```

## 2

Every filename must be named as the component name.

```js
// splitter.js
class Splitter {}
```

## 3

Push responsibility out!

If method have more then 1 responsibility, divide the method, if the class have too many responsibilities then divide the class.

... more to come
