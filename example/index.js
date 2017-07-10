/**
 * @fileOverview A example performed how to use markvis-bar
 * @name index.js<markvis-bar/example>
 * @author GeekPlux
 * @license MIT
 */
const d3node = require('d3-node')
const output = require('d3node-output')
const markvisBar = require('../src')

/**
 * Generate random data to a array
 * @param {number} n array length
 */
const gen = n => {
  const data = []

  for (let i = 0; i < n; ++i) {
    data.push({
      key: i,
      value: Math.max(10, Math.floor(Math.random() * 100))
    })
  }

  return data
}

// Create output files
output('./example/output', markvisBar({ data: gen(20), d3node, export: true }))
