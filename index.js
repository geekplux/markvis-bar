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
} = {}) {
  const _svgStyles = `
    .bar { fill: ${_barColor}; }
    .bar:hover { fill: ${_barHoverColor}; }
  `;

  let _d3;
  let d3n;
  let svg;

  if (d3node) {
    d3n = new d3node({
      selector: _selector,
      styles: _svgStyles + _style,
      container: _container
    });
    _d3 = d3n.d3;
    svg = d3n.createSVG();
  } else {
    _d3 = d3;
    svg = d3.select('#chart').append('svg');
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
  if (d3node) result = d3n.chartHTML();
  else result = _d3.select('#chart').html();
  return result;
}

module.exports = bar;
