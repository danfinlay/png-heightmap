var binaryXHR = require('binary-xhr')
var PNGReader = require('png.js')
var worldHeight = 128

function loadImage(url, cb) {
  binaryXHR(url, function(err, data) {
    if (err) return cb(err)
    var reader = new PNGReader(data)
    reader.parse(function(err, png){
      if (err) return cb(err)
      return cb(false, png)
    })
  })
}

function getCoordinate(x, y, z) {
  x = ~~scale(x, -(worldHeight / 2), (worldHeight / 2), 0, this.width)
  y = ~~scale(y, -(worldHeight / 2), (worldHeight / 2), 0, worldHeight)
  z = ~~scale(z, -(worldHeight / 2), (worldHeight / 2), 0, this.height)
  var pixel = this.getPixel(x, z)[0]
  var height = ~~scale(pixel, 0, 255, worldHeight/5, 0)
  if (y < 1) return 2
  return y > height ? 0 : 1 
}

function scale( x, fromLow, fromHigh, toLow, toHigh ) {
  return ( x - fromLow ) * ( toHigh - toLow ) / ( fromHigh - fromLow ) + toLow
}

module.exports = function(url, height, cb) {
  if (typeof height === 'function') cb = height
  if (height) worldHeight = height
  loadImage(url, function(err, pngData) {
    if (err) return console.log(err)
    window.png = pngData
    var returnFunc = getCoordinate.bind(pngData)
    returnFunc.data = pngData
    cb(err, returnFunc)
  })
}

exports.loadImage = loadImage