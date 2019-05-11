function videoStatEnterAnimation(this_element) {
	var state = this_element.getAttribute("state");
	var rating = this_element.getAttribute("rating");
				
	var leftFillBar = this_element.getElementsByClassName("black-glossy-video-stat-left-bar")[0];
	var rightFillBar = this_element.getElementsByClassName("black-glossy-video-stat-right-bar")[0];
		 
	this_element.setAttribute("state", "enter");
					
	var leftFillBarWidth = parseInt(leftFillBar.style.width);
	var rightFillBarWidth = parseInt(rightFillBar.style.width);

	var width = leftFillBarWidth;

	var id = setInterval(frame, 6);
	
	function frame() {
		if (this_element.getAttribute("width") > 100 || this_element.getAttribute("state") != "enter") 
		{
			clearInterval(id);
		} 
		else 
		{
			var width = this_element.getAttribute("width");
			width++;	
			this_element.setAttribute("width", width);
			leftFillBar.style.width = (width * rating / 100 + 3) + '%';
			rightFillBar.style.width = (width * (100 - rating) / 100 + 3) + '%';
			rightFillBar.style.left = (100 - width * (100 - rating) / 100) + '%'; 
		}
	}
}













function videoStatLeaveAnimation(this_element) {
	var state = this_element.getAttribute("state");
	var rating = this_element.getAttribute("rating");

				
	var leftFillBar = this_element.getElementsByClassName("black-glossy-video-stat-left-bar")[0];
	var rightFillBar = this_element.getElementsByClassName("black-glossy-video-stat-right-bar")[0];
		 
	this_element.setAttribute("state", "leave");
				
			
	var leftFillBarWidth = parseInt(leftFillBar.style.width);
	var rightFillBarWidth = parseInt(rightFillBar.style.width);

				
	var id = setInterval(frame, 8);
			
	function frame() {
		if (this_element.getAttribute("width") < 0 || this_element.getAttribute("state") != "leave") 
		{
			clearInterval(id);
		}
		else
		{
			var width = this_element.getAttribute("width");
			width--;
			this_element.setAttribute("width", width);
			leftFillBar.style.width = (width * rating / 100 + 3) + '%';
			rightFillBar.style.width = (width * (100 - rating) / 100 + 3) + '%';
			rightFillBar.style.left = (100 - width * (100 - rating) / 100 + (3 * (100 - width) / 100) ) + '%'; 
		}
	}
}














var leftButtonState = "none";
var rightButtonState = "none"; 




function resetButtonState() {
	leftButtonState = "none";
	rightButtonState = "none";
	
	var fillbarLeft = document.getElementById("vote-button-left-fill-bar"); 
	var textLeft =  document.getElementById("vote-button-left-text");
	
	var fillbarRight = document.getElementById("vote-button-right-fill-bar"); 
	var textRight =  document.getElementById("vote-button-right-text");
	
	textLeft.style.color = "#ffffff";
	textRight.style.color = "#ffffff";
	
	fillbarLeft.style.width = "0%";
	fillbarRight.style.width = "0%";
}








function leftButtonClickAnimation() {

	if(leftButtonState == "click" || rightButtonState == "click")
		return;
	
	voteLeftVideo();
	
	var fillbar = document.getElementById("vote-button-left-fill-bar"); 
	var text =  document.getElementById("vote-button-left-text");
	  
	text.style.color = "#ff0000";
	leftButtonState = "click"; 

	var width = parseInt(fillbar.style.width);
	var id = setInterval(frame, 8);

	function frame() {
		if (width >= 100) {
			clearInterval(id);
		} else {
			width++; 
			fillbar.style.width = width + '%'; 
		}
	}
}









function leftButtonMouseEnterAnimation() {

	if(leftButtonState == "click" || rightButtonState == "click")
		return;
	
	var fillbar = document.getElementById("vote-button-left-fill-bar"); 
	var text =  document.getElementById("vote-button-left-text");
	  
	text.style.color = "#ff0000";
	leftButtonState = "enter";	

	var width = parseInt(fillbar.style.width);
	var id = setInterval(frame, 8);

	function frame() {
		if (width >= 100 || leftButtonState != "enter") {
			clearInterval(id);
		} else {
			width++; 
			fillbar.style.width = width + '%'; 
		}
	}
}






function leftButtonMouseLeaveAnimation() {

	if(leftButtonState == "click" || rightButtonState == "click")
		return;
	
	var fillbar = document.getElementById("vote-button-left-fill-bar"); 
	var text =  document.getElementById("vote-button-left-text");
	  
	text.style.color = "#ffffff";
	leftButtonState = "leave"; 

	var width = parseInt(fillbar.style.width);
	var id = setInterval(frame, 8);

	function frame() {
		if (width == 0 || leftButtonState != "leave") {
			clearInterval(id);
		} else {
			width--; 
			fillbar.style.width = width + '%'; 
		}
	}
}








function rightButtonClickAnimation() {

	if(leftButtonState == "click" || rightButtonState == "click")
		return;
	
	voteRightVideo();
	
	var fillbar = document.getElementById("vote-button-right-fill-bar"); 
	var text =  document.getElementById("vote-button-right-text");
	  
	text.style.color = "#ff0000";
	rightButtonState = "click"; 

	var width = parseInt(fillbar.style.width);
	var id = setInterval(frame, 8);

	function frame() {
		if (width >= 100) {
			clearInterval(id);
		} else {
			width++; 
			fillbar.style.width = width + '%'; 
		}
	}
}








function rightButtonMouseEnterAnimation() {

	if(leftButtonState == "click" || rightButtonState == "click")
		return;
	
	var fillbar = document.getElementById("vote-button-right-fill-bar"); 
	var text =  document.getElementById("vote-button-right-text");
	  
	text.style.color = "#ff0000";
	rightButtonState = "enter";	

	var width = parseInt(fillbar.style.width);
	var id = setInterval(frame, 8);

	function frame() {
		if (width >= 100 || rightButtonState != "enter") {
			clearInterval(id);
		} else {
			width++; 
			fillbar.style.width = width + '%'; 
		}
	}
}







function rightButtonMouseLeaveAnimation() {

	if(leftButtonState == "click" || rightButtonState == "click")
		return;
	
	var fillbar = document.getElementById("vote-button-right-fill-bar"); 
	var text =  document.getElementById("vote-button-right-text");
	  
	text.style.color = "#ffffff";
	rightButtonState = "leave"; 

	var width = parseInt(fillbar.style.width);
	var id = setInterval(frame, 8);

	function frame() {
		if (width == 0 || rightButtonState != "leave") {
			clearInterval(id);
		} else {
			width--; 
			fillbar.style.width = width + '%'; 
		}
	}
}





function voteLeftVideo() {
	
	var likedVideoYTID = document.getElementById("firstVideo").getAttribute("data");
	var dislikedVideoYTID = document.getElementById("secondVideo").getAttribute("data");
	
	var votePair = { likedVideoID: likedVideoYTID, dislikedVideoID: dislikedVideoYTID };
	
	console.log(JSON.stringify(votePair));
	
	var httpRequest = new XMLHttpRequest();
	
	httpRequest.onreadystatechange = function() {
	    if (this.readyState == 4 && this.status == 200) {
	      console.log("Successfull vote");
	    }
	  };
	  
	httpRequest.open("POST", "http://localhost:8080/RWA_HOMEWORK_2/VoteVideoPair", true);
	httpRequest.send(JSON.stringify(votePair));
}







function voteRightVideo() {
	var likedVideoYTID = document.getElementById("secondVideo").getAttribute("data");
	var dislikedVideoYTID = document.getElementById("firstVideo").getAttribute("data");
	
	var votePair = { likedVideoID: likedVideoYTID, dislikedVideoID: dislikedVideoYTID };
	
	console.log(JSON.stringify(votePair));
	
	var httpRequest = new XMLHttpRequest();
	
	httpRequest.onreadystatechange = function() {
	    if (this.readyState == 4 && this.status == 200) {
	      console.log("Successfull vote");
	    }
	  };
	  
	httpRequest.open("POST", "http://localhost:8080/RWA_HOMEWORK_2/VoteVideoPair", true);
	httpRequest.send(JSON.stringify(votePair));
}






function rotateRefreshBtn() {
	var rotateBtn = document.getElementById("refresh-btn");
	rotateBtn.classList.toggle("activeSpin");

}
