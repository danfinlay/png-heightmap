//var createTerrain = require('voxel-perlin-terrain');
var heightmap = require('../')
var createEngine = require('voxel-engine');

var chunkDistance = 2
var chunkSize = 32
var pngUrl = prompt("Type the URL of a greyscale png or nothing for a cat.  Numbers 1-7 are surprises.")||'cat.png'
var errCount = 0

var coolDepthMapList = [
	'cat.png',
	'http://upload.wikimedia.org/wikipedia/commons/3/3e/Stereogram_Tut_Shark_Depthmap.png',
	'http://lroc.sese.asu.edu/news/uploads/per.88.gamma.png',
	'http://nick.onetwenty.org/wp-content/uploads/2009/12/depth.png',
	'http://nick.onetwenty.org/wp-content/uploads/2009/12/depth.png',
	'http://www.3dsbuzz.com/wp-content/uploads/2010/09/luigi1-300x230.png',
	'http://vision.ucsd.edu/kriegman-grp/research/ibr/rabbit-depth.png',
	'http://upload.wikimedia.org/wikipedia/commons/thumb/5/56/Newworldmap_grayscale.svg/800px-Newworldmap_grayscale.svg.png',
	'https://raw.github.com/maxogden/voxel-engine/master/demo/logo-white.png'
]

function generateFromUrl(aUrl){
	pngUrl=aUrl||'cat.png'
	if(typeof parseInt(pngUrl)===typeof 1 && coolDepthMapList[parseInt(pngUrl)]!==undefined){
		console.log("Number identified: "+pngUrl+" fetching "+coolDepthMapList[parseInt(pngUrl)])
		pngUrl=coolDepthMapList[parseInt(pngUrl)];
	}

	console.log("Fetching url "+pngUrl)
	heightmap(pngUrl, chunkDistance * 2 * chunkSize , function(err, pngGenerate) {
  
	  	if(err){
	  		if(err==="no response"){
	  			if(errCount>0){
	  				pngUrl = prompt("Sorry, that png had a problem.  Try again?  Leave blank for a cat, type 1 for a shark.") ||'cat.png'
	  				generateFromUrl(pngUrl)
	  				errCount=0
	  			}else{
	  				if(pngUrl.startsWith('http://')) pngUrl=pngUrl.slice(7,pngUrl.length)
	  				pngUrl='http://www.corsproxy.com/'+pngUrl
	  				console.log("trying "+pngUrl+" instead.")
	  				generateFromUrl(pngUrl)
	  				errCount+=1
	  			}
	  		}else{
	  			console.log("Error is:" + err)
		  		pngUrl = prompt("Sorry, that png had a problem.  Try again?  Leave blank for a cat, type 1 for a shark.") ||'cat.png'
		  		generateFromUrl(pngUrl)
	  		}
	  	}else{
	  		initGame(pngGenerate)
	  	}
	})
		
}

function initGame(pngGenerator){
	var game = createEngine({
	    generate:pngGenerator,
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

generateFromUrl(pngUrl)

