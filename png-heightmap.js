console.log("Starting png-heightmap.")

var fs = require('fs'),
    PNG = require('pngjs').PNG,
    theImage,
	heightMod = 32

function loadImage(url, cb){
	fs.createReadStream('url')
    .pipe(new PNG({
        filterType: 4
    }))
    .on('parsed', function() {
    	console.log("Image parsed with width: "+this.width+" and height: "+this.height);
    	theImage = this

    	return generate

    	//Sample image inversion:
        // for (var y = 0; y < this.height; y++) {
        //     for (var x = 0; x < this.width; x++) {
        //         var idx = (this.width * y + x) << 2;

        //         // invert color
        //         this.data[idx] = 255 - this.data[idx];
        //         this.data[idx+1] = 255 - this.data[idx+1];
        //         this.data[idx+2] = 255 - this.data[idx+2];

        //         // and reduce opacity
        //         this.data[idx+3] = this.data[idx+3] >> 1;
        //     }
        // }
        //Sample image saving:
        //this.pack().pipe(fs.createWriteStream('out.png'));
        
    });
}

function modulateHeight(mod){
	heightMod = mod
}

function generate(x,y,z){
	var idx = (this.width * y + x) << 2;
	var pitch = this.data[idx]+this.data[idx+1]+this.data[idx+2]
	return pitch / heightMod
}

exports.loadImage = loadImage;
exports.modulateHeight = modulateHeight;