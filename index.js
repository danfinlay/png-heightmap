var binaryXHR = require('binary-xhr')
var PNGReader = require('./png.js') // it doesnt work with browserify so we vendor it for now
var worldHeight = 128

function loadImage(url, cb) {
  binaryXHR(url, function(err, data) {
    if (err) return cb(err)
    var reader = new PNGReader(data)
    reader.parse(function(png){
      cb(false, png)
    })
  })
}

function getPixel(pngReader, x, y) {
	var i = pngReader.colors * pngReader.bitDepth / 8 * (y * pngReader.width + x);
	return pngReader.pixels[i+1]
};

function getCoordinate(x, y, z) {
  x = ~~scale(x, -(worldHeight / 2), (worldHeight / 2), 0, this.width)
  y = ~~scale(y, -(worldHeight / 2), (worldHeight / 2), 0, worldHeight)
  z = ~~scale(z, -(worldHeight / 2), (worldHeight / 2), 0, this.height)
  var pixel = getPixel(this, x, z)
  var height = ~~scale(pixel, 0, 255, 0, worldHeight / 5)
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
    window.png = pngData
    var returnFunc = getCoordinate.bind(pngData)
    returnFunc.data = pngData
    cb(err, returnFunc)
  })
}

exports.loadImage = loadImage