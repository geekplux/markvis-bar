function addStyle (css) {
  const head = document.head || document.getElementsByTagName('head')[0];
  const style = document.createElement('style');

  style.type = 'text/css';
  if (style.styleSheet){
    style.styleSheet.cssText = css;
  } else {
    style.appendChild(document.createTextNode(css));
  }

  head.appendChild(style);
}

function bar ({
  data,
  d3,
  d3node,
  selector: _selector = '#chart',
  container: _container = `
    <div id="container">
      <h2>Bar Chart</h2>
      <div id="chart"></div>
    </div>
  `,
  style: _style = '',
  width: _width = 960,
  height: _height = 500,
  margin: _margin = { top: 20, right: 20, bottom: 30, left: 40 },
  barColor: _barColor = 'steelblue',
  barHoverColor: _barHoverColor = 'brown',
  export: _export = false,
} = {}) {
  const _svgStyles = `
    .bar { fill: ${_barColor}; }
    .bar:hover { fill: ${_barHoverColor}; }
  ` + _style;

  let _d3;
  let d3n;
  let svg;
  let _div;

  if (d3node) {
    d3n = new d3node({
      selector: _selector,
      styles: _svgStyles,
      container: _container
    });
    _d3 = d3n.d3;
    svg = d3n.createSVG();
  } else {
    _div = document.createElement('div');
    _div.innerHTML = _container;
    _d3 = d3;
    svg = _d3.select(_div).select('#chart').append('svg');
    addStyle(_svgStyles);
  }

  const width = _width - _margin.left - _margin.right;
  const height = _height - _margin.top - _margin.bottom;

  svg.attr('width', _width)
    .attr('height', _height)
    .append('g')
    .attr('transform', `translate(${_margin.left}, ${_margin.top})`);

  // set the ranges
  const x = _d3.scaleBand()
        .range([0, width])
        .padding(0.1);

  const y = _d3.scaleLinear()
        .range([height, 0]);

  x.domain(data.map((d) => d.key));
  y.domain([0, _d3.max(data, (d) => d.value)]);

  // append the rectangles for the bar chart
  svg.selectAll('.bar')
    .data(data)
    .enter().append('rect')
    .attr('class', 'bar')
    .attr('x', (d) => x(d.key))
    .attr('width', x.bandwidth())
    .attr('y', (d) => y(d.value))
    .attr('height', (d) => height - y(d.value));

  // add the x Axis
  svg.append('g')
    .attr('transform', `translate(0,${height})`)
    .call(_d3.axisBottom(x));

  // add the y Axis
  svg.append('g').call(_d3.axisLeft(y));

  let result;
  if (d3node) {
    if (_export) result = d3n;
    else result = d3n.chartHTML();
  } else result = _div.querySelector('#container').innerHTML;

  return result;
}

module.exports = bar;
