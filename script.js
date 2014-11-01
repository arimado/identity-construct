
window.onload = function(){
	var image = new Image();

	image.onload = function() {

		$("#submitButton").click(function(){
			console.log('clicked draw button')
			ascii.innerHTML = ''; 
			getText();
			printChars(); 
			statusCount++; 
		});

		var statusCount = 0; 

		var inputBox = $("#inputBox");
		var inputBoxElement = $("#inputBox")[0]; 

		var stars = document.getElementById("stars");  
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

		//star vars

		var nullData = [];
		var starLine = ""; 

		//color vars 
		var r, g, b, shade;
		var character, wrappedChar, wrappedLine, lastPixel = 0, lineCount = 0, pixelCount = 0, line = "";
		var shadeData = [];  
		var charData = []; 
		var currentShadeData = []; 
		var currentString = ''; 
		var randChar = '';
		shadeDataGot = true; 
		var shadeDataHeavy = [], shadeDataMedium = [], shadeDataNull = [];
		var currentStringHeavy, currentStringMedium; 

		var currentStringHeavy = [], currentStringMedium = []; 


		var heavyString = 'abcdeghkmnopqrswxyzABCDEFGHIJKLMNOPQRSTUVWXYZ1234567890#%@&';
		var mediumString = 'fijlt=';
		var lightString = "~!^*-+()'"; 

		var heavyChars = [];
		var mediumChars = []; 
		var lightChars = [];

		//animation vars
		var animInitiated = false; 

		//intitalise charData array 
		for(var i = 0; i < colourData.length; i = i+4) charData.push(" "); 

		//initialise nullData array
		for(var i = 0; i < colourData.length; i = i+4) nullData.push(" "); 

		console.log('just spaces');
		console.log(nullData);

		
		for(var i = 0; i < 500; i++) {
			var randNullDataIndex = Math.floor(Math.random() * nullData.length)
			nullData[randNullDataIndex] = '.'; 
		} 
		console.log(nullData.length);

		function printStars() {
			for(var i = 0; i < nullData.length; i++) {
				if(i !=0 && i%spriteWidth == 0) {
						stars.appendChild(document.createTextNode(starLine));
						//newline
						stars.appendChild(document.createElement("br"));
						//emptying starline for the next row of pixels.
						starLine = "";
				} else {
					starLine += nullData[i]; 
				} 
			}
		} 

		function getText() {
			currentString = inputBox.val(); 
			console.log(inputBox.val());
		}

		//print intitial data 
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
			console.log('chars printed');
		}

		function getShadeData() {
			for(var i = 0; i < colourData.length; i = i+4){
				//get colour data 
				r = colourData[i]; 
				g = colourData[i+1];
				b = colourData[i+2];
				shade = r + g + b;
				//create shade data
				if(shade > 700) {
					shadeData.push(0); 
				} else if(shade > 200) {
					shadeData.push(1); 
				} else if(shade > 5) {
					shadeData.push(2);
				}
			} 

			if(shadeDataGot) {
				for(var i = 0; i < shadeData.length; i++) {
					// put these things into arrays that clear themeselves 
					if(shadeData[i] == 2) {
						shadeDataHeavy.push(i); 
					} 
					if(shadeData[i] == 1) {
						shadeDataMedium.push(i);
					} 
					if(shadeData[i] == 0) {
						shadeDataNull.push(i);
					} 
				}

				console.log(shadeDataHeavy); 
				console.log(shadeDataMedium);

				shadeDataGot = false;
			}
		}

		function filterChars() {
			var csIndex;
			for(csIndex = 0; csIndex < currentString.length; csIndex++) {
				var currentChar; 
				//get heavy characters and append to a heavy character array
				for(var i = 0; i < heavyString.length; i++) {
					if(currentString[csIndex] == heavyString[i]){ 
						currentStringHeavy.push(currentString[csIndex]); 
					}
				}
				//get medium characters and append to a medium character array
				for(var i = 0; i < mediumString.length; i++) {
					if(currentString[csIndex] == mediumString[i]){ 
						currentStringMedium.push(currentString[csIndex]); 
					}
				}
				//get null characters and append to a null character array
				// do i need to do this? 
			} 	

			// console.log('currentStringHeavy: ' + currentStringHeavy);
			// console.log('currentStringMedium: ' + currentStringMedium);
		}

		function insertChars() {
			for(var i = 0; i < 500; i++) {
				if(currentStringHeavy.length > 0) {
					var randHeavyIndex = Math.floor(Math.random() * currentStringHeavy.length); 
					var randHeavyShadeIndex = Math.floor(Math.random() * shadeDataHeavy.length); 
					charData[shadeDataHeavy[randHeavyShadeIndex]] = currentStringHeavy[randHeavyIndex].toUpperCase();
				}
				if(currentStringMedium.length > 0) {
					var randMediumIndex = Math.floor(Math.random() * currentStringMedium.length); 
					var randMediumShadeIndex = Math.floor(Math.random() * shadeDataMedium.length); 
					charData[shadeDataMedium[randMediumShadeIndex]] = currentStringMedium[randMediumIndex].toLowerCase();;
				} 
				if(statusCount < 4) {
					var randNullShadeIndex = Math.floor(Math.random() * shadeDataNull.length); 
					charData[shadeDataNull[randNullShadeIndex]] = '.'; 
				}
			}
			currentStringHeavy = []; 
			currentStringMedium = []; 
		} 

		function printChars() {

			//intialises: shadeData,shadeDataHeavy, shadeDataMedium 
			getShadeData(); 

			//filter charac
			filterChars(); 

			//insert characters into relevant arrays 
			insertChars(); 

			//printStars
			//printStars(); 

			//printChars 
			printCharData(); 

			//sprite.parentNode.insertBefore(tempCanvasElement, sprite);


			var frames = 10, container, frame_width;

			var starFrames = 3, starContainer, starFrame_width;

			if(!animInitiated) {
				//ascii animation
				frames = 10;
				container = document.getElementById("AnimContainer");
				frame_width = parseInt(window.getComputedStyle(container).width)/frames;
				container.style.width = frame_width+"px"; 
				ascii.style.marginLeft = "0"; 

				//star animation
				// starFrames = 3;
				// starContainer = document.getElementById("wrapper");
				// starFrame_width = parseInt(window.getComputedStyle(starContainer).width)/frames;
				// starContainer.style.width = starFrame_width+"px"; 
				// stars.style.marginLeft = "0"; 

				animInitiated = true;
			}



			setInterval(loop, 1000/10); 

			function loop() {


				var currentMarginLeft = parseFloat(ascii.style.marginLeft); 
				var currentStarMarginLeft = parseFloat(stars.style.marginLeft); 
				
				if(currentMarginLeft == frame_width*(frames-1)*-1) {
					ascii.style.marginLeft = "0"; 
					//stars.style.marginLeft = "0"; 
				} else {
					ascii.style.marginLeft = (currentMarginLeft - frame_width) + "px"; 
					//stars.style.marginLeft = (currentMarginLeft - frame_width) + "px"; 
				}

				// if(currentStarMarginLeft == starFrame_width*(starFrames-1)*-1) {
				// 	stars.style.marginLeft = "0"; 
				// } else {
				// 	stars.style.marginLeft = (currentMarginLeft - frame_width) + "px"; 
				// }


			}


		} 
	}

	image.crossOrigin="anonymous";
    image.src="http://i.imgur.com/xRwvsxT.gif";

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




