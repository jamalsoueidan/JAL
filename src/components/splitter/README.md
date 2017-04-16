# Splitter

Create vertically and horizontally moveable splitter bar.

![](https://github.com/jamalsoueidan/react-application-library/blob/master/src/components/splitter/screenshot.png?raw=true)


## Examples

```js
class Example extends React.Component {
  render() {
    return(
      <div className="example">
        <Splitter orientation="vertical">
          <div>row 1</div>
          <div>row 2</div>
          <Splitter orientation="horizontal">
            <div>column 1</div>
            <div>column 2</div>
            <div>column 3</div>
            <div>column 4</div>
          </Splitter>
          <div>row 4</div>
        </Splitter>
      </div>
    )
  }
}
```

## TODO

- Responsive add touch events
- Use debounce when resizing
-
