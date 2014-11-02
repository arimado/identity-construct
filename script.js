
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
		var totalColourData = [];  
		var charData = []; 
		var currentShadeData = []; 
		var currentString = ''; 
		var randChar = '';
		shadeDataGot = true; 
		var shadeDataHeavy = [], shadeDataMedium = [], shadeDataNull = [];

		var shadeData_1 = [];
		var shadeData_2 = []; 
		var shadeData_3 = []; 
		var shadeData_4 = []; 
		var shadeData_5 = [];  

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

		//testColoutDataArray 
		var colourLine = ""; 
		var colourTestElement = document.getElementById("colourTest"); 

		//intitalise charData array 
		for(var i = 0; i < colourData.length; i = i+4) charData.push(" "); 

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

		function printTotalColourData() {
			for(var i = 0; i < totalColourData.length; i++) {
				if(i !=0 && i%spriteWidth == 0) {
						colourTestElement.appendChild(document.createTextNode(colourLine));
						//newline
						colourTestElement.appendChild(document.createElement("br"));
						//emptying line for the next row of pixels.
						colourline = "";
				} else {
					colourLine += totalColourData[i];
				} 
			}
		}

		function getShadeData() {
			for(var i = 0; i < colourData.length; i = i+4){
				//get colour data 
				r = colourData[i]; 
				g = colourData[i+1];
				b = colourData[i+2];
				shade = r + g + b;
				//create shade data

				totalColourData.push(shade); 

				// if(shade > 700) {
				// 	shadeData.push(0); 
				// } else if(shade > 200) {
				// 	shadeData.push(1); 
				// } else if(shade > 5) {
				// 	shadeData.push(2);
				// }

				if(shade == 765) {
					shadeData.push(0); 
				} else if(shade == 612) {
					shadeData.push(1);
				} else if(shade == 459) {
					shadeData.push(2);
				} else if(shade == 306) {
					shadeData.push(3);
				} else if(shade == 153) {
					shadeData.push(4);
				} else if(shade == 0) {
					shadeData.push(5);
				} 

			} 

			// console.log('shadeData length: ' + shadeData.length); 

			// console.log('colour data length: ' + colourData.length);

			var colourArray = []; 

			for(var i = 0; i < totalColourData.length; i++) {
				if($.inArray(totalColourData[i], colourArray) == -1) {
					colourArray.push(totalColourData[i]); 
				} 
			}

			// console.log(colourArray); 

			if(shadeDataGot) {
				for(var i = 0; i < shadeData.length; i++) {
					// put these things into arrays that clear themeselves 
					

					if(shadeData[i] == 5) {
						shadeData_5.push(i)
					}
						
					if(shadeData[i] == 4) {
						shadeData_4.push(i)
					}

					if(shadeData[i] == 3) {
						shadeData_3.push(i)
					}

					if(shadeData[i] == 2) {
						shadeData_2.push(i); 
					} 
					if(shadeData[i] == 1) {
						shadeData_1.push(i);
					} 
					if(shadeData[i] == 0) {
						shadeDataNull.push(i);
					} 
				}

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
					var randHeavyShadeIndex = Math.floor(Math.random() * shadeData_5.length); 
					charData[shadeData_5[randHeavyShadeIndex]] = currentStringHeavy[randHeavyIndex].toUpperCase();
				}
				if(currentStringMedium.length > 0) {
					var randMediumIndex = Math.floor(Math.random() * currentStringMedium.length); 
					var randMediumShadeIndex = Math.floor(Math.random() * shadeData_1.length); 
					charData[shadeData_1[randMediumShadeIndex]] = currentStringMedium[randMediumIndex].toLowerCase();;
				} 

				// var randShadeIndex_3 = Math.floor(Math.random() * shadeData_3.length); 
				// charData[shadeData_3[randShadeIndex_3]] = 'X';

				// var randShadeIndex_4 = Math.floor(Math.random() * shadeData_4.length); 
				// charData[shadeData_4[randShadeIndex_4]] = '#';

				// var randShadeIndex_2 = Math.floor(Math.random() * shadeData_2.length); 
				// charData[shadeData_2[randShadeIndex_2]] = '@';

				// var randMediumShadeIndex = Math.floor(Math.random() * shadeDataMedium.length); 
				// charData[shadeDataMedium[randMediumShadeIndex]] = 'W';




			}
			currentStringHeavy = []; 
			currentStringMedium = []; 
		} 

		function insertStars() {
			for(var i = 0; i < 500; i++) {
				if(statusCount < 1) {
					var randNullShadeIndex = Math.floor(Math.random() * shadeDataNull.length); 
					charData[shadeDataNull[randNullShadeIndex]] = '.'; 
				}
			}
		}
		function printChars() {

			//intialises: shadeData,shadeDataHeavy, shadeDataMedium 
			getShadeData(); 

			//filter charac
			filterChars(); 

			//insert characters into relevant arrays 
			insertChars(); 

			insertStars(); 

			//printChars 
			printCharData(); 

			var frames = 10, container, frame_width;

			var starFrames = 3, starContainer, starFrame_width;

			if(!animInitiated) {
				//ascii animation
				frames = 10;
				container = document.getElementById("AnimContainer");
				frame_width = parseInt(window.getComputedStyle(container).width)/frames;
				container.style.width = frame_width+"px"; 
				ascii.style.marginLeft = "0";  
				animInitiated = true;
			}

			//print colour Data 
			// printTotalColourData(); 


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
			} 
		} 

		sprite.parentNode.insertBefore(tempCanvasElement, sprite);

	}

	image.crossOrigin="anonymous";
    image.src="http://i.imgur.com/v1wbj9D.gif";

    //more colours head_template_h
    //http://i.imgur.com/v1wbj9D.gif
    //current

    //original colours 
    //http://i.imgur.com/doTCC1W.gif

    //new head
    //http://i.imgur.com/tVuGGup.gif
}




// var tempCanvasElement = document.getElementById("tempCanvas"); 
// 	tempCanvasElement.width = spriteWidth; 
// 	tempCanvasElement.height = spriteHeight;

// var tempCanvas = tempCanvasElement.getContext("2d");

// tempCanvas.fillStyle = "white"; 
// tempCanvas.fillRect(0,0,spriteWidth,spriteHeight);

// tempCanvas.drawImage(sprite, 0, 0, spriteWidth, spriteHeight);

// tempCanvas.getImageData(0, 0, spriteWidth, spriteHeight);




