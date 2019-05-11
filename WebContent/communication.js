var APIkey = "AIzaSyD-8Rv2NLpVsceAHSQ7kwwV3oAzDUNkUlA";


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
		}
				 
		getVideoInfo(videoYTIDs).then(function(result) {
					 
			var videoInfo = result;
					 
			for (var i = 0; i < arrayLength; i++) 
			{
				var video = data[i];
						 
				var title = videoInfo.find(function(element) { return element.id == video.videoYoutubeID; }).title;
						 
				var newTopListItem = top5ListTemplate.cloneNode("true");
						 
				newTopListItem.classList.remove("notdisplay");		 
						
				newTopListItem.getElementsByClassName("black-glossy-video-stat")[0].setAttribute("rating", Math.round(video.videoScore * 100));		 
				
				newTopListItem.getElementsByClassName("title")[0].textContent = title;//title;
						 
				newTopListItem.getElementsByClassName("round-video-img")[0].setAttribute("src", "https://img.youtube.com/vi/" + video.videoYoutubeID + "/hqdefault.jpg");
						 
				newTopListItem.getElementsByClassName("video-stat-text")[0].textContent = video.videoLikes + "/" + video.videoDislikes;
			
				newTopListItem.getElementsByClassName("black-glossy-rank")[0].textContent = i + 1;
						 
				top5List.appendChild(newTopListItem);
			}
					 
					 				 
		});;
	});
 }
 
 
 
 
 
 
 
 function generateRankingList() {
	
	 	var rankingTemplate = document.getElementById("ranking-template");
		var rankingList = document.getElementById("rankingList");
		var pageNumber = rankingList.getAttribute("pageNumber");
		var URL = "http://localhost:8080/RWA_HOMEWORK_2/GetVideoByRating?startPosition=" + (pageNumber-1) * 10 + "&maxVideoCount=10";
		
		fetchJSONFile(URL, function(data) {
					 
			
			var arrayLength = data.length;
					 
			var videoYTIDs = [];
					 
			for(var i = 0 ; i < arrayLength; ++i)
			{
				var video = data[i];
				videoYTIDs.push(video.videoYoutubeID);
			}
					 
			getVideoInfo(videoYTIDs).then(function(result) {
						 
				var videoInfo = result;
						 
				for (var i = 0; i < arrayLength; i++) 
				{
					var video = data[i];
							 
					var title = videoInfo.find(function(element) { return element.id == video.videoYoutubeID; }).title;
							 
					var newRankingListItem = rankingTemplate.cloneNode("true");
							 
					newRankingListItem.classList.remove("notdisplay");		 
							
					newRankingListItem.getElementsByClassName("black-glossy-video-stat")[0].setAttribute("rating", Math.round(video.videoScore * 100));		 
					
					newRankingListItem.getElementsByClassName("title")[0].textContent = title;//title;
							 
					newRankingListItem.getElementsByClassName("round-video-img")[0].setAttribute("src", "https://img.youtube.com/vi/" + video.videoYoutubeID + "/hqdefault.jpg");
							 
					newRankingListItem.getElementsByClassName("video-stat-text")[0].textContent = video.videoLikes + "/" + video.videoDislikes;
				
					newRankingListItem.getElementsByClassName("black-glossy-rank")[0].textContent = (pageNumber-1) * 10 + i + 1;
							 
					rankingList.appendChild(newRankingListItem);
				}						 
						 				 
		});;
	});
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
	});
 }
 
 
 
 
 
 
 
function getVideoPair(firstVideoYTID, secondVideoYTID) {
	 
	 URL = "http://localhost:8080/RWA_HOMEWORK_2/GetVideoPair" + "?" + "firstVideoID=" + firstVideoYTID + "&" + 
	 																   "secondVideoID=" + secondVideoYTID;
	 
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
	 });
 }








function handleClientLoadNewVideoPair() {
  gapi.load('client', initClientNewVideoPair);
}

function initClientNewVideoPair() {
	 gapi.client.setApiKey(APIkey);
	 gapi.client.load("https://www.googleapis.com/discovery/v1/apis/youtube/v3/rest").then(function() {
		 //getVideoInfo(videoIDsList);
		 getNewVideoPair();
		 generateTOP5List();
	 });
 
}








function handleClientLoadOldVideoPair(firstVideoYTID, secondVideoYTID) {
	 	
	var initFunction = function() {	initClientOldVideoPair(firstVideoYTID, secondVideoYTID); }
	 gapi.load('client', initFunction);
}


function initClientOldVideoPair(firstVideoYTID, secondVideoYTID) {
	 console.log(firstVideoYTID, "    ", secondVideoYTID);
	 gapi.client.setApiKey(APIkey);
	 gapi.client.load("https://www.googleapis.com/discovery/v1/apis/youtube/v3/rest").then(function() {
		 getVideoPair(firstVideoYTID, secondVideoYTID);
		 generateTOP5List();
	 });
}







function handleClientRankingLoad() {
	gapi.load('client', initClientRankingLoad);	
}


function initClientRankingLoad() {
	 gapi.client.setApiKey(APIkey);
	 gapi.client.load("https://www.googleapis.com/discovery/v1/apis/youtube/v3/rest").then(function() {
		 generateRankingList();
	 });
}







function getVideoInfo(videoIDs) {
	 
	var idParams = "";
	var retValue = [];

	for(var id in videoIDs)	
		idParams += videoIDs[id] + ','; 

	idParams = idParams.substring(0, idParams.length - 1);


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
