//var createTerrain = require('voxel-perlin-terrain');
var heightmap = require('../')
var createEngine = require('voxel-engine');

var chunkDistance = 2
var chunkSize = 32
var pngUrl = prompt("Type the URL of a greyscale png or nothing for a cat.")||'cat.png'

var coolDepthMapList = [
	'cat.png',
	'http://upload.wikimedia.org/wikipedia/commons/3/3e/Stereogram_Tut_Shark_Depthmap.png'
]

function generateFromUrl(aUrl){

	pngUrl=aUrl||'cat.png'
	if(parseInt(pngUrl)===1||parseInt(pngUrl)===2||parseInt(pngUrl)===3||parseInt(pngUrl)===4){
		console.log("Number identified: "+pngUrl+" fetching "+coolDepthMapList[parseInt(pngUrl)])
		pngUrl=coolDepthMapList[parseInt(pngUrl)];
	}

	console.log("Fetching url "+aUrl)
	heightmap(pngUrl, chunkDistance * 2 * chunkSize , function(err, pngGenerate) {
  
	  	if(err){
	  		pngUrl = prompt("Sorry, that png had a problem.  Try again?  Leave blank for a cat, type 1 for a shark.") ||'cat.png'
	  		generateFromUrl(pngUrl)
	  	}else{
	  		var game = createEngine({
			    generate:pngGenerate,
			    //chunkDistance: 2,
			    materials: [ 'grass_top', 'tree_side', 'leaves_opaque' ],
			    texturePath: './textures/'
			});

			game.controls.pitchObject.rotation.x = -1.5;
			game.appendTo('#container');
			window.game = game;

			var explode = require('voxel-debris')(game);
			game.on('mousedown', function (pos) {
			    if (erase) explode(pos)
			    else game.createBlock(pos, 1)
			});

			window.addEventListener('keydown', ctrlToggle);
			window.addEventListener('keyup', ctrlToggle);

			var erase = true
			function ctrlToggle (ev) { erase = !ev.ctrlKey }
			game.requestPointerLock('canvas');

		}
	})
		
}

generateFromUrl(pngUrl)

