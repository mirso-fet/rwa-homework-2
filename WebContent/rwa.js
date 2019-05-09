function loadScript(url, callback)
{
    // Adding the script tag to the head as suggested before
    var head = document.head;
    var script = document.createElement('script');
    script.type = 'text/javascript';
    script.src = url;

    // Then bind the event to the callback function.
    // There are several events for cross browser compatibility.
    script.onreadystatechange = callback;
    script.onload = callback;

    // Fire the loading
    head.appendChild(script);
}

	
	var APIkey = "AIzaSyD-8Rv2NLpVsceAHSQ7kwwV3oAzDUNkUlA";
	
	var videoList = [ { id: "S-sJp1FfG7Q", rank: "1" },
					  { id: "HPs5SPWtXmo", rank: "2" }
				    ];


	var videoIDsList = [];


	videoList.forEach(function(item){
		console.log(item);
		videoIDsList.push(item.id);
	});


	console.log("VideoIDsList: ", videoIDsList);

	
	function loadClient() {
		gapi.client.setApiKey(APIkey);
		return gapi.client.load("https://www.googleapis.com/discovery/v1/apis/youtube/v3/rest")
        	.then(function() { console.log("GAPI client loaded for API"); },
        		  function(err) { console.error("Error loading GAPI client for API", err); });
	}
 




	// Make sure the client is loaded before calling this method.
	function execute() {
		return gapi.client.youtube.videos.list({
			"part": "snippet",
			"id": "S-sJp1FfG7Q,HPs5SPWtXmo"
		})
        .then(function(response) {
                // Handle the results here (response.result has the parsed body).
                console.log("Response", response);
              },
              function(err) { console.error("Execute error", err); });
	}
 

	function getVideoInfo(videoIDs) {


		var idParam = "";

	 	for(var id in videoIDs)	
		 idParam += videoIDs[id] + ','; 

	 	idParam = idParam.substring(0, idParam.length - 1);



	 	return gapi.client.youtube.videos.list({
	 				"part": "snippet",
	 				"id": idParam
	 			})
	 			.then(function(response) {
	 				// Handle the results here (response.result has the parsed body).
	 					console.log("Response", response);
	 					getVideoInfoProcessResponse(response);
	 				  },
	 				  function(err) { console.error("Execute error", err); });
		}
 


	function getVideoInfoProcessResponse(response) {
		

		var items = response.result.items;

		items.forEach(function(elem){
			console.log(elem.id + " " + elem.snippet.localized.title);
			var top5ListTemplate = document.getElementById("top5-template");
			var top5List = document.getElementById("top5");
			var newItem = top5ListTemplate.cloneNode("true");
	
			newItem.classList.remove("invisible");
			
			var elem = newItem.getElementsByClassName("black-glossy-video-stat")[0];
			var theCSSprop = window.getComputedStyle(elem, null).getPropertyValue("left");
			console.log("OLEEE: ", theCSSprop);

			

			newItem.getElementsByClassName("title")[0].textContent = elem.snippet.localized.title;

			var statBox = newItem.getElementsByClassName("black-glossy-video-stat")[0];
			console.log("statbox: ", statBox);

			var newItemCS = window.getComputedStyle(statBox, null);
			var propval = newItemCS.getPropertyValue("fontSize");	
			console.log("prop-val: ", propval);
			console.log("CS: ", newItemCS);

			top5List.appendChild(newItem);
			console.log(top5List);
		});
	}
	
	 var googleApiClientReady = function() {
        
		 var loadApi = function() {
               return new Promise(function(resolve,reject){
                       gapi.client.setApiKey('AIzaSyD-8Rv2NLpVsceAHSQ7kwwV3oAzDUNkUlA');
                       gapi.client.load("https://www.googleapis.com/discovery/v1/apis/youtube/v3/rest");
               });
         };
         
         loadApi().then(function() {
        	 Console.log("HAHAHAHA");
        	 getVideoInfo(videoIDsList);
         });
         
         loadApi();
       
	 };

	 
	 
	 
	 
	// Load auth2 library
	 function handleClientLoadNewPair() {
	   gapi.load('client', initClient);
	 }

	 // Init API client library and set up sign in listeners
	 function initClient() {
		 gapi.client.setApiKey(APIkey);
		 gapi.client.load("https://www.googleapis.com/discovery/v1/apis/youtube/v3/rest").then(function() {
			 //getVideoInfo(videoIDsList);
			 getNewVideoPair();
			 generateTOP5List();
		 });
	  
	 }
	
	 
	 function handleClientLoadOldPair(firstVideoYTID, secondVideoYTID) {
		 	console.log("LOADING API");
		 	
		 	 console.log(firstVideoYTID, "    ", secondVideoYTID);
			 
		 	
		 	var initFunction = function() {
		 		initClient2(firstVideoYTID, secondVideoYTID);
		 		console.log(firstVideoYTID, "    ", secondVideoYTID);
				 
		 	}
		 	
		   gapi.load('client', initFunction);
		 }
	 
	 function initClient2(firstVideoYTID, secondVideoYTID) {
		 console.log(firstVideoYTID, "    ", secondVideoYTID);
		 gapi.client.setApiKey(APIkey);
		 gapi.client.load("https://www.googleapis.com/discovery/v1/apis/youtube/v3/rest").then(function() {
			 //getVideoInfo(videoIDsList);
			 getVideoPair(firstVideoYTID, secondVideoYTID);
			 generateTOP5List();
		 });
	  
	 }
	 
	 
	 
	 
	 function fetchJSONFile(path, callback) {
		    var httpRequest = new XMLHttpRequest();
		    httpRequest.onreadystatechange = function() {
		        if (httpRequest.readyState === 4) {
		            if (httpRequest.status === 200) {
		                var data = JSON.parse(httpRequest.responseText);
		                if (callback) callback(data);
		            }
		        }
		    };
		    httpRequest.open('GET', path);
		    httpRequest.send(); 
		}
	 
	 function getNewVideoPair() {
		 fetchJSONFile("http://localhost:8080/RWA_HOMEWORK_2/GetRandomVideoPair", function(data) {
			 
				var firstVideo = document.getElementById("firstVideo");
				var secondVideo = document.getElementById("secondVideo");
				
				firstVideo.setAttribute("data", data.firstVideo.videoYoutubeID);
				secondVideo.setAttribute("data", data.secondVideo.videoYoutubeID);
				
				var firstIframe = firstVideo.querySelector("iframe");
				var secondIframe = secondVideo.querySelector("iframe");
				
				firstIframe.setAttribute("src", "https://www.youtube.com/embed/" + data.firstVideo.videoYoutubeID + "?ecver=1&amp;iv_load_policy=1&amp;yt:stretch=16:9&amp;autohide=1&amp;color=red&amp;hd=1");
				secondIframe.setAttribute("src", "https://www.youtube.com/embed/" + data.secondVideo.videoYoutubeID + "?ecver=1&amp;iv_load_policy=1&amp;yt:stretch=16:9&amp;autohide=1&amp;color=red&amp;hd=1");
				
				console.log(firstIframe);
			    console.log(data);
			 
			 
		 });
	 }
	 
	 
	 function getVideoPair(firstVideoYTID, secondVideoYTID) {
		 
		 URL = "http://localhost:8080/RWA_HOMEWORK_2/GetVideoPair" + "?" + "firstVideoID=" + firstVideoYTID + "&" + 
		 																   "secondVideoID=" + secondVideoYTID;
		 
		 console.log(firstVideoYTID, "    ", secondVideoYTID);
		 
		 fetchJSONFile(URL, function(data) {
			 
				var firstVideo = document.getElementById("firstVideo");
				var secondVideo = document.getElementById("secondVideo");
				
				console.log("Data: ", data);
				
				firstVideo.setAttribute("data", data.firstVideo.videoYoutubeID);
				secondVideo.setAttribute("data", data.secondVideo.videoYoutubeID);
				
				var firstIframe = firstVideo.querySelector("iframe");
				var secondIframe = secondVideo.querySelector("iframe");
				
				firstIframe.setAttribute("src", "https://www.youtube.com/embed/" + data.firstVideo.videoYoutubeID + "?ecver=1&amp;iv_load_policy=1&amp;yt:stretch=16:9&amp;autohide=1&amp;color=red&amp;hd=1");
				secondIframe.setAttribute("src", "https://www.youtube.com/embed/" + data.secondVideo.videoYoutubeID + "?ecver=1&amp;iv_load_policy=1&amp;yt:stretch=16:9&amp;autohide=1&amp;color=red&amp;hd=1");
				
				console.log(firstIframe);
			    console.log(data);
			 
			 
		 });
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
	
		
		 function getVideoInfo(videoIDs) {
			 
			 var idParams = "";
			 var retValue = [];

			 for(var id in videoIDs)	
				 idParams += videoIDs[id] + ','; 

			 idParams = idParams.substring(0, idParams.length - 1);
			 
			 console.log("YOUTUBE IDs: ", videoIDs);



		    return gapi.client.youtube.videos.list({
		    			"part": "snippet",
		    			"id": idParams
		    		})
		    		.then(function(response) {
		                
		    			var items = response.result.items;

		    			items.forEach(function(elem){
		    				retValue.push({id: elem.id, title: elem.snippet.localized.title});
		    			});
		    			
		    			return retValue;

		              },
		              function(err) { console.error("Execute error", err); });
		  }

	 
		
		function generateTOP5List() {
			
			 URL = "http://localhost:8080/RWA_HOMEWORK_2/GetVideoByRating?startPosition=0&maxVideoCount=5";

			 fetchJSONFile(URL, function(data) {
				 
				 var top5ListTemplate = document.getElementById("top5-template");
				 var top5List = document.getElementById("top5");
				 var arrayLength = data.length;
				 
				 var videoYTIDs = [];
				 
				 for(var i = 0 ; i < arrayLength; ++i)
				{
					 var video = data[i];
					 
					 videoYTIDs.push(video.videoYoutubeID);
					 console.log(video.videoYoutubeID);
				}
					 
				 var videoInfo = getVideoInfo(videoYTIDs);
				 
				 console.log("VIDEO INFO: ", videoInfo);
				 
				 for (var i = 0; i < arrayLength; i++) 
				 {
					 var video = data[i];
					 var newTopListItem = top5ListTemplate.cloneNode("true");
					 
					 newTopListItem.classList.remove("invisible");
					 
					 newTopListItem.getElementsByClassName("title")[0].textContent = "TITLE";
					 
					 newTopListItem.getElementsByClassName("round-video-img")[0].setAttribute("src", "https://img.youtube.com/vi/" + video.videoYoutubeID + "/hqdefault.jpg");
					 
					 newTopListItem.getElementsByClassName("black-glossy-video-stat")[0].textContent = video.videoLikes + "/" + video.videoDislikes;
		
					 newTopListItem.getElementsByClassName("black-glossy-rank")[0].textContent = i + 1;
					 
					 top5List.appendChild(newTopListItem);
				 }
			 });
		}
			

	 
	 

