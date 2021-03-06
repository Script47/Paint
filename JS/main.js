		function getElement(elementName) {
			return document.getElementById(elementName);
		}
		
		function getSaveData(name) {
			return localStorage.getItem(name);
		}
		
		var canvas = getElement("canvas");
		var context = canvas.getContext("2d");
		
		// Mechanics
		var mouseUp = false;		
		var mouseDown = false;
		var mouseMove = false;
		
		// Brush size
		var brushSize = 8;
		var eraserSize = 8;
		
		// Colours
		var brushColour = "black";
		var bgColour = "white";
		var eraserColour = "white";
		
		// Tools
		var brush = 1;
		var eraser = 0;
	
		$(document).ready(function() {
			$("#loading").fadeOut("slow");
		});
	
		$(document).ready(function() {
			$("#closed").click(function() {
				$("#open").toggle("slow");
			
			});
		});
		
		window.onload = function load() {
			setInterval(function() {
				eraserColour = bgColour;
				if(bgColour == "white") {
					$("#canvas").css("border", "1px solid black");
				} else {
					$("#canvas").css("border", "none");					
				}
			}, 1);	
			
			if(!getSaveData("canvas")) {
				
			} else {
				var image = new Image();
				image.src = getSaveData("canvas");
				
				context.drawImage(image, 0, 0);
			}
		}
		
		canvas.addEventListener("mousedown", checkMouseDown);
		
		function checkMouseDown() {
			mouseDown = true;
			mouseUp = false;
			if(mouseDown == true && mouseUp == false) {
				canvas.addEventListener("mousemove", draw);
			}
		}
		
		function changeMouseStatus() {
			mouseUp = true;
			if(mouseUp == true) {
				mouseDown = false;
			}
		}
		
		function draw(event) {
			mouseMove = true;	
			var x = event.clientX-canvas.offsetLeft;
			var y = event.clientY-canvas.offsetTop;			
			if(mouseMove == true && mouseDown == true) {
			
				if(brush == 1) {
					context.fillStyle = brushColour;
				} else if(eraser == 1) {
					context.fillStyle = eraserColour;
				}
				if(brush == 1) {				
					context.fillRect(x, y, brushSize, brushSize);
				} else if(eraser == 1) {
					context.fillRect(x, y, eraserSize, eraserSize);
				}					
				canvas.addEventListener("mouseup", changeMouseStatus);
				canvas.addEventListener("mouseleave", function() {
					mouseDown = false;
					mouseMove = false;
					mouseUp = true;
				});
			}
		} 
		
		setInterval(function() {
			console.log("Mouse Down: "+mouseDown);
			console.log("Mouse Up: "+mouseUp);
			console.log("Mouse Move: "+mouseMove);			
		}, 1000);
		
		function clearCanvas() {
			context.fillStyle = bgColour;
			context.fillRect(0, 0, canvas.width, canvas.height);				
		}
		
		function changeSize(buttonID) {
			if(brush == 1) {
				brushSize = buttonID;
			} else if(eraser == 1) {
				eraserSize = buttonID;
			}
		}
		
		function changeBrushColour(brushButtonColour) {
			brushColour = brushButtonColour;
		}
		
		function changeBGColour(bgButtonColour) {	
			bgColour = bgButtonColour;
			context.fillStyle = bgColour;
			context.fillRect(0, 0, canvas.width, canvas.height);				
		}
		
		function setBrush() {
			brush = 1;
			eraser = 0;
		}
		
		function setEraser() {
			brush = 0;
			eraser = 1;
		}
		
		function saveImage() {
			localStorage.setItem("canvas", canvas.toDataURL())
		}
		
		function viewImage() {
			var image = getSaveData("canvas");
			window.open(image, 'new_window', 'height=800, width=1000');
		}	
		
		function deleteSave() {
			localStorage.removeItem("canvas");
		}
