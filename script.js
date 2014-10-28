










window.onload = function(){

	var image = new Image();

	image.onload = function() {

		$("#submitButton").click(function(){
			console.log('clicked draw button')

			printChars(); 

		});

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
		var character, wrappedChar, lastPixel = 0, lineCount = 0, pixelCount = 0, line = ""; 

		function printChars() {



			for(var i = 0; i < colourData.length; i = i+4){
				
				//get colour data 
				r = colourData[i]; 
				g = colourData[i+1];
				b = colourData[i+2];
				shade = r + g + b;



				if(shade > 700) character = "."; //almost white
				else if(shade > 200) character = ".";
				// else if(shade > 39) character = ":";
				// else if(shade > 38) character = "*";
				else if(shade > 546) character = " .";
				else if(shade > 10) character = ".";
				else if(shade > 5) character = ".";
				else character = "."; //almost black 

				

				
				if(i != 0 && (i/4)%spriteWidth == 0) {
					ascii.appendChild(document.createTextNode(line));
					//newline
					ascii.appendChild(document.createElement("br"));
					//emptying line for the next row of pixels.
					line = "";
					lineCount++; 
					console.log(lineCount);
				}


				wrappedChar = '<span class="char">' + character + '</span>'; 

				line += wrappedChar; 




				pixelCount++;
				
			} 
			lastPixel = i
			console.log(pixelCount);

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




