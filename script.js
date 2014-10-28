










window.onload = function(){

	var image = new Image();

	image.onload = function() {

		var sprite = document.getElementById("sprite");
		var spriteWidth = sprite.width; 
		var spriteHeight = sprite.height; 

		var tempCanvasElement = document.createElement("canvas");
		tempCanvasElement.id = "sprite"; 
		tempCanvasElement.width = spriteWidth; 
		tempCanvasElement.height = spriteHeight; 

		var tempCanvasCtx = tempCanvasElement.getContext("2d"); 

		tempCanvasCtx.fillStyle = "white"; 
		tempCanvasCtx.fillRect(0, 0, spriteWidth, spriteHeight);

		tempCanvasCtx.drawImage(image,0,0,spriteWidth, spriteHeight);

		var pixelData = tempCanvasCtx.getImageData(0, 0, spriteWidth, spriteHeight);
		var colourData = pixelData.data; 

		// console.log(pixelData); 

		//color vars 
		var r, g, b, shade;
		var character, lineCount = 0, line = ""; 

		for(var i = 0; i < colourData.length; i = i+4){

			r = colourData[i]; 
			g = colourData[i+1];
			b = colourData[i+2];

			shade = r + g + b;

			if(shade > 700) character = " "; //almost white
			else if(shade > 200) character = ".";
			// else if(shade > 39) character = ":";
			// else if(shade > 38) character = "*";
			else if(shade > 546) character = "+";
			else if(shade > 10) character = "#";
			else if(shade > 5) character = "W";
			else character = "@"; //almost black



			if(lineCount > 80 && lineCount < 140) {
				if(i != 0 && (i/4)%spriteWidth == 0) //if the pointer reaches end of pixel-line
				{
				ascii.appendChild(document.createTextNode(line));
				//newline
				ascii.appendChild(document.createElement("br"));
				//emptying line for the next row of pixels.
				line = "";
				lineCount++; 
				console.log(lineCount);
				}

				line += character; 

			}	

		} 

		

		sprite.parentNode.insertBefore(tempCanvasElement, sprite);

	}

	image.crossOrigin="anonymous";
    image.src="http://i.imgur.com/EdxaL7x.gif";

     // $("#ascii").clone().appendTo("body");

}




// var tempCanvasElement = document.getElementById("tempCanvas"); 
// 	tempCanvasElement.width = spriteWidth; 
// 	tempCanvasElement.height = spriteHeight;

// var tempCanvas = tempCanvasElement.getContext("2d");

// tempCanvas.fillStyle = "white"; 
// tempCanvas.fillRect(0,0,spriteWidth,spriteHeight);

// tempCanvas.drawImage(sprite, 0, 0, spriteWidth, spriteHeight);

// tempCanvas.getImageData(0, 0, spriteWidth, spriteHeight);




