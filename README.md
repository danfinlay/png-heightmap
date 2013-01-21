Convert pngs to heightmaps in Voxel.js!  For example:

```javascript
var heightmap = require('png-heightmap')

var chunkDistance = 2
var chunkSize = 32

heightmap('simple_sf.png', chunkDistance * 2 * chunkSize , function(err, pngGenerate) {
  var game = createGame({
    generate: pngGenerate
  })
})
```
