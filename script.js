










window.onload = function(){

	var image = new Image();

	image.onload = function() {

		$("#submitButton").click(function(){
			console.log('clicked draw button')

			printChars(); 

		});

		var ascii = document.getElementById("ascii");

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
		var character, wrappedChar, wrappedLine, lastPixel = 0, lineCount = 0, pixelCount = 0, line = "";
		var shadeData = [];  
		var charData = []; 
		var currentShadeData = []; 

		function printCharData() {
			for(var i = 0; i < charData.length; i++) {
				if(i !=0 && i%spriteWidth == 0) {
						ascii.appendChild(document.createTextNode(line));
						//newline
						ascii.appendChild(document.createElement("br"));
						//emptying line for the next row of pixels.
						line = "";
				} else {
					line += charData[i];
				} 
			}
		}

		function printChars() {

			//intitalise charData array 
			for(var i = 0; i < colourData.length; i = i+4) charData.push("."); 

			//print charData array 
			printCharData(); 

			//intialise shadeData array 
			for(var i = 0; i < colourData.length; i = i+4){
				
				//get colour data 
				r = colourData[i]; 
				g = colourData[i+1];
				b = colourData[i+2];
				shade = r + g + b;

				//create shade data
				if(shade > 700) {
					character = "."; 
					shadeData.push(0); 
				} else if(shade > 200) {
					character = "+"; 
					shadeData.push(1); 
				} else if(shade > 5) {
					character = "@"; 
					shadeData.push(2);
				}
				
			} 

			// var elementPos = shadeData.map(function(x) {return x; }).indexOf(2);
			// var objectFound = shadeData[elementPos];



			for(var i = 0; i < shadeData.length; i++) {
				if(shadeData[i] == 2) {
					currentShadeData.push(i); 
				}
			}


			for(var i = 0; i < 1000; i++) {
				charData[i] = 'poo';
			}

			ascii.innerHTML(''); 

			printCharData(); 


			// for(var i = 0; currentShadeData.length; i++) {
			// 	charData[currentShadeData[i]] = 2;
			// }




			

		}

		

		

		sprite.parentNode.insertBefore(tempCanvasElement, sprite);

	}

	image.crossOrigin="anonymous";
    image.src="http://i.imgur.com/rVoh5VA.gif";

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




