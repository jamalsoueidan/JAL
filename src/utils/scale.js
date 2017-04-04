// https://bl.ocks.org/aubergene/7791133
// This is a function
const Normalizer = (min, max) => (val) => {
  return (val - min) / (max - min);
}

// This is another
const Interpolater = (min, max, clamp) => (val) => {
  val = min + (max - min) * val;
  return clamp ? Math.min(Math.max(val, min), max) : val;
}

// This is a third
const Scale = () => {
  var domain = new Normalizer(0, 1);
  var range = new Interpolater(0, 1);
  var s = (val) => {
    return range(domain(val));
  };
  s.domain = (min, max) => {
    if (!arguments.length) return domain;
    domain = new Normalizer(min, max)
    return s
  };
  s.range = (min, max, clamp) => {
    if (!arguments.length) return range;
    range = new Interpolater(min, max, clamp)
    return s
  };
  return s;
}

export default Scale
