/**
 * @fileOverview Generate bar chart for markvis
 * @name index.js<src>
 * @author GeekPlux
 * @license MIT
 */
import { addStyle } from './utils.js'

/**
 *
 * @param {array} data
 * @param {object} d3 d3 will get in browser environment
 * @param {function} D3Node D3Node will get in node environment
 * @param {string} selector DOM selector in container
 * @param {string} container DOM contained the visualization result
 * @param {string} style Bar chart style
 * @param {number} width
 * @param {number} height
 * @param {object} margin
 * @param {string} barColor
 * @param {string} barHoverColor
 * @param {boolean} export Whether to export to a PNG image
 * @returns {}
 */
export default function bar ({
  data,
  d3,
  d3node: D3Node,
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
  margin: _margin = { top: 20, right: 20, bottom: 20, left: 20 },
  barColor: _barColor = 'steelblue',
  barHoverColor: _barHoverColor = 'brown',
  export: _export = false
} = {}) {
  const _svgStyles = `
    .bar { fill: ${_barColor}; }
    .bar:hover { fill: ${_barHoverColor}; }
  ` + _style

  let _d3 // Instance of d3
  let d3n // Instance of D3Node
  let svg // SVG element held the bar chart
  let _div // Temporary DOM element used to operate

  const isNodeEnv = () => D3Node // To check node environment

  if (isNodeEnv) {
    // Node environment
    d3n = new D3Node({
      selector: _selector,
      styles: _svgStyles,
      container: _container
    })
    _d3 = d3n.d3
    svg = d3n.createSVG()
  } else {
    // Browser environment
    _div = document.createElement('div')
    _div.innerHTML = _container
    _d3 = d3
    svg = _d3.select(_div).select('#chart').append('svg')
    addStyle(_svgStyles) // Add style for bar chart in browser
  }

  const width = _width - _margin.left - _margin.right
  const height = _height - _margin.top - _margin.bottom

  const g = svg.attr('width', _width)
        .attr('height', _height)
        .append('g')
        .attr('transform', `translate(${_margin.left}, ${_margin.top})`)

  // Set the ranges
  const x = _d3.scaleBand()
        .range([0, width])
        .padding(0.1)

  const y = _d3.scaleLinear()
        .range([height, 0])

  x.domain(data.map(d => d.key))
  y.domain([0, _d3.max(data, d => d.value)])

  // Append the rectangles for the bar chart
  g.selectAll('.bar')
    .data(data)
    .enter().append('rect')
    .attr('class', 'bar')
    .attr('x', d => x(d.key))
    .attr('width', x.bandwidth())
    .attr('y', d => y(d.value))
    .attr('height', d => height - y(d.value))

  // Add the x Axis
  g.append('g')
    .attr('transform', `translate(0,${height})`)
    .call(_d3.axisBottom(x))

  // Add the y Axis
  g.append('g').call(_d3.axisLeft(y))

  let result
  if (isNodeEnv) {
    if (_export) result = d3n
    else result = d3n.chartHTML()
  } else result = _div.querySelector('#container').innerHTML

  return result
}
