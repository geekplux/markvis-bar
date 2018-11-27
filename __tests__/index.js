import d3node from 'd3-node'
import bar from '../src/index'

const data = [
  { key: 1, value: 1 },
  { key: 2, value: 2 },
  { key: 3, value: 3 },
  { key: 4, value: 4 },
  { key: 5, value: 5 }
]
const result = `<div id=\"chart\"><svg xmlns=\"http://www.w3.org/2000/svg\" width=\"960\" height=\"500\"><defs><style type=\"text/css\"><![CDATA[
    .bar { fill: steelblue; }
    .bar:hover { fill: brown; }
   ]]></style></defs><g transform=\"translate(20, 20)\"><rect class=\"bar\" x=\"18.03921568627453\" width=\"162.35294117647058\" y=\"368\" height=\"92\"></rect><rect class=\"bar\" x=\"198.4313725490196\" width=\"162.35294117647058\" y=\"276\" height=\"184\"></rect><rect class=\"bar\" x=\"378.8235294117647\" width=\"162.35294117647058\" y=\"184\" height=\"276\"></rect><rect class=\"bar\" x=\"559.2156862745098\" width=\"162.35294117647058\" y=\"92\" height=\"368\"></rect><rect class=\"bar\" x=\"739.6078431372548\" width=\"162.35294117647058\" y=\"0\" height=\"460\"></rect><g transform=\"translate(0,460)\" fill=\"none\" font-size=\"10\" font-family=\"sans-serif\" text-anchor=\"middle\"><path class=\"domain\" stroke=\"#000\" d=\"M0.5,6V0.5H920.5V6\"></path><g class=\"tick\" opacity=\"1\" transform=\"translate(99.21568627450982,0)\"><line stroke=\"#000\" y2=\"6\" x1=\"0.5\" x2=\"0.5\"></line><text fill=\"#000\" y=\"9\" x=\"0.5\" dy=\"0.71em\">1</text></g><g class=\"tick\" opacity=\"1\" transform=\"translate(279.6078431372549,0)\"><line stroke=\"#000\" y2=\"6\" x1=\"0.5\" x2=\"0.5\"></line><text fill=\"#000\" y=\"9\" x=\"0.5\" dy=\"0.71em\">2</text></g><g class=\"tick\" opacity=\"1\" transform=\"translate(460,0)\"><line stroke=\"#000\" y2=\"6\" x1=\"0.5\" x2=\"0.5\"></line><text fill=\"#000\" y=\"9\" x=\"0.5\" dy=\"0.71em\">3</text></g><g class=\"tick\" opacity=\"1\" transform=\"translate(640.3921568627451,0)\"><line stroke=\"#000\" y2=\"6\" x1=\"0.5\" x2=\"0.5\"></line><text fill=\"#000\" y=\"9\" x=\"0.5\" dy=\"0.71em\">4</text></g><g class=\"tick\" opacity=\"1\" transform=\"translate(820.78431372549,0)\"><line stroke=\"#000\" y2=\"6\" x1=\"0.5\" x2=\"0.5\"></line><text fill=\"#000\" y=\"9\" x=\"0.5\" dy=\"0.71em\">5</text></g></g><g fill=\"none\" font-size=\"10\" font-family=\"sans-serif\" text-anchor=\"end\"><path class=\"domain\" stroke=\"#000\" d=\"M-6,460.5H0.5V0.5H-6\"></path><g class=\"tick\" opacity=\"1\" transform=\"translate(0,460)\"><line stroke=\"#000\" x2=\"-6\" y1=\"0.5\" y2=\"0.5\"></line><text fill=\"#000\" x=\"-9\" y=\"0.5\" dy=\"0.32em\">0.0</text></g><g class=\"tick\" opacity=\"1\" transform=\"translate(0,414)\"><line stroke=\"#000\" x2=\"-6\" y1=\"0.5\" y2=\"0.5\"></line><text fill=\"#000\" x=\"-9\" y=\"0.5\" dy=\"0.32em\">0.5</text></g><g class=\"tick\" opacity=\"1\" transform=\"translate(0,368)\"><line stroke=\"#000\" x2=\"-6\" y1=\"0.5\" y2=\"0.5\"></line><text fill=\"#000\" x=\"-9\" y=\"0.5\" dy=\"0.32em\">1.0</text></g><g class=\"tick\" opacity=\"1\" transform=\"translate(0,322)\"><line stroke=\"#000\" x2=\"-6\" y1=\"0.5\" y2=\"0.5\"></line><text fill=\"#000\" x=\"-9\" y=\"0.5\" dy=\"0.32em\">1.5</text></g><g class=\"tick\" opacity=\"1\" transform=\"translate(0,276)\"><line stroke=\"#000\" x2=\"-6\" y1=\"0.5\" y2=\"0.5\"></line><text fill=\"#000\" x=\"-9\" y=\"0.5\" dy=\"0.32em\">2.0</text></g><g class=\"tick\" opacity=\"1\" transform=\"translate(0,230)\"><line stroke=\"#000\" x2=\"-6\" y1=\"0.5\" y2=\"0.5\"></line><text fill=\"#000\" x=\"-9\" y=\"0.5\" dy=\"0.32em\">2.5</text></g><g class=\"tick\" opacity=\"1\" transform=\"translate(0,184)\"><line stroke=\"#000\" x2=\"-6\" y1=\"0.5\" y2=\"0.5\"></line><text fill=\"#000\" x=\"-9\" y=\"0.5\" dy=\"0.32em\">3.0</text></g><g class=\"tick\" opacity=\"1\" transform=\"translate(0,138)\"><line stroke=\"#000\" x2=\"-6\" y1=\"0.5\" y2=\"0.5\"></line><text fill=\"#000\" x=\"-9\" y=\"0.5\" dy=\"0.32em\">3.5</text></g><g class=\"tick\" opacity=\"1\" transform=\"translate(0,92)\"><line stroke=\"#000\" x2=\"-6\" y1=\"0.5\" y2=\"0.5\"></line><text fill=\"#000\" x=\"-9\" y=\"0.5\" dy=\"0.32em\">4.0</text></g><g class=\"tick\" opacity=\"1\" transform=\"translate(0,46)\"><line stroke=\"#000\" x2=\"-6\" y1=\"0.5\" y2=\"0.5\"></line><text fill=\"#000\" x=\"-9\" y=\"0.5\" dy=\"0.32em\">4.5</text></g><g class=\"tick\" opacity=\"1\" transform=\"translate(0,0)\"><line stroke=\"#000\" x2=\"-6\" y1=\"0.5\" y2=\"0.5\"></line><text fill=\"#000\" x=\"-9\" y=\"0.5\" dy=\"0.32em\">5.0</text></g></g></g></svg></div>`

function removeAllSpace (str) {
  return str.replace(/\s+/g, '')
}

test('bar chart generator', () => {
  expect(bar).toBeDefined()
  expect(removeAllSpace(bar({ data, d3node, showValues: false }))).toBe(removeAllSpace(result))
})
