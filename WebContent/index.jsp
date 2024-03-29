<%@ page language="java" contentType="text/html; charset=UTF-8"
    pageEncoding="UTF-8"%>

<!doctype html>
<html lang="en">
	<head>
		<!-- Required meta tags -->
		<meta charset="utf-8">
		<meta name="viewport" content="width=device-width, initial-scale=1, shrink-to-fit=no">

		<!-- Bootstrap CSS -->
		<link rel="stylesheet" href="https://stackpath.bootstrapcdn.com/bootstrap/4.3.1/css/bootstrap.min.css" integrity="sha384-ggOyR0iXCbMQv3Xipma34MD+dH/1fQ784/j6cY/iJTQUOhcWr7x9JvoRxT2MZw1T" crossorigin="anonymous">

		<!-- Font Awesome -->
		<link rel="stylesheet" href="https://use.fontawesome.com/releases/v5.8.1/css/all.css" integrity="sha384-50oBUHEmvpQ+1lW4y57PTFmhCaXp0ML5d60M1M7uH2+nqUivzIebhndOJK28anvf" crossorigin="anonymous">

		<!-- DANEDAN animation-->
		<link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/animate.css/3.7.0/animate.min.css">

		<!-- My CSS style -->
		<link rel="stylesheet" href="rwa.css">

		
		<script src="https://code.jquery.com/jquery-3.2.1.slim.min.js" integrity="sha384-KJ3o2DKtIkvYIK3UENzmM7KCkRr/rE9/Qpg6aAZGJwFDMVNA/GpGFF93hXpG5KkN" crossorigin="anonymous"></script>
		<script src="https://cdnjs.cloudflare.com/ajax/libs/popper.js/1.12.9/umd/popper.min.js" integrity="sha384-ApNbgh9B+Y1QKtv3Rn7W3mgPxhU9K/ScQsAP7hUibX39j7fakFPskvXusvfa0b4Q" crossorigin="anonymous"></script>
		<script src="https://maxcdn.bootstrapcdn.com/bootstrap/4.0.0/js/bootstrap.min.js" integrity="sha384-JZR6Spejh4U02d8jOt6vLEHfe/JQGiRRSQQxSfFWpi1MquVdAyjUar5+76PVCmYl" crossorigin="anonymous"></script>
				
		
		<title>VVC</title>

	</head>


	<body>





		<!-- START Navigation bar -->

		<div class="container-fluid fixed-top">
			<nav class="navbar d-flex glossy-black-bg mx-n3">


				<!-- Logo or name for the page -->
				<a class="navbar-brand navifont black-glossy-navbar-font" href="#">
					<i class="fa fa-play navbar-fs" aria-hidden="true"></i>
					<span class="navbar-fs">VIDEO VOTING COMPETITION</span>
				</a>


				<div class="d-flex flex-grow-1 text-right">
					<!-- ml-auto: left margin auto to shift elements to the right of navigation bar -->
					<!-- flex-nowrap: all elements will be in one row -->
					<!-- navbar-nav: parent class to nav list -->
					<ul class="navbar-nav ml-auto flex-nowrap flex-row">


						<!-- nav-item: class for nav-item -->
						<li class="nav-item d-flex align-middle pt-1">
							<!-- Font Awesome class for icons -->
							<a href="ranking.jsp" class="d-flex align-middle">
								<span class="fas fa-bars fa-lg px-3 navicon navbar-fs"></span>
							</a>
						</li>

						<!-- nav-item: class for nav-item -->
						<li class="nav-item d-flex align-middle pt-1">
							<!-- Font Awesome class for icons -->
							<span class="fas fa-sync-alt fa-lg px-3 navicon navbar-fs spin" id="refresh-btn" onclick="rotateRefreshBtn(); getNewVideoPair(); resetButtonState()"></span>
						</li>

						<li class="nav-item d-flex align-middle pt-1">
							<span class="fas fa-share-alt fa-lg px-3 navicon navbar-fs"></span>
						</li>

					</ul>
				</div>
			</nav>
		</div>
		<!-- END Navigation bar -->








		<div class="container-fluid">
			<div class="row">




				<!-- VIDEO 1 -->
				<div class="col-6 p-5" id="firstVideo" data="">


					<div class="row">		

						<div class="col-1"></div>

						<div class="col-10 px-0 black-glossy-video">

							<div id="carouselExampleControls" class="carousel slide video-opacity" data-ride="carousel" data-interval="0">
								<div class="carousel-inner">



									<div class="carousel-item active">
										<div class="embed-responsive embed-responsive-16by9">
											<iframe allowFullScreen="allowFullScreen" 
									 src=about:blank" 
									 allowtransparency="true" frameborder="0">
											</iframe>
										</div>
									</div>				

								</div>
							</div>
						</div>

						<div class="col-1"></div>

					</div>	


					<!-- VOTE BTN LEFT -->	
					<div class="row py-2">

						<div class="col-1"></div>

						<div class="col-10 text-center px-0" onclick="leftButtonClickAnimation()"
															onmouseenter="leftButtonMouseEnterAnimation()"
															onmouseleave="leftButtonMouseLeaveAnimation()">

							<div id="vote-button-left-text" class="justify-content-center">	
								<span class="py-2 fas fa-heart black-glossy-sfonts"></span>
							</div>
				
							<div id="vote-button-left-fill-bar" style="width:0%"></div>
				
							<div id="vote-button-left-background"></div>

						</div>

						<div class="col-1"></div>

					</div>
					<!-- -->

				</div>



				<!-- VIDEO 2-->	

				<div class="col-6 p-5" id="secondVideo" data="">


					<div class="row">		

						<div class="col-1"></div>

						<div class="col-10 px-0 black-glossy-video">

							<div id="carouselExampleControls" class="carousel slide video-opacity" data-ride="carousel" data-interval="0">
								<div class="carousel-inner">



									<div class="carousel-item active">
										<div class="embed-responsive embed-responsive-16by9">
										 
											<iframe allowFullScreen="allowFullScreen" 
												 src="about:blank" 
													allowtransparency="true" frameborder="0">
											</iframe>
											
										</div>
									</div>				

								</div>
							</div>
						</div>

						<div class="col-1"></div>

					</div>	


					<!-- VOTE BTN RIGHT -->		
					<div class="row py-2">

						<div class="col-1"></div>

						<div class="col-10 text-center px-0" onclick="rightButtonClickAnimation()"
															 onmouseenter="rightButtonMouseEnterAnimation()"
															 onmouseleave="rightButtonMouseLeaveAnimation()">

							<div id="vote-button-right-text" class="justify-content-center">	
								<span class="py-2 fas fa-heart black-glossy-sfonts"></span>
							</div>
				
							<div id="vote-button-right-fill-bar" style="width:0%"></div>
				
							<div id="vote-button-right-background"></div>

						</div>

						<div class="col-1"></div>

					</div>
				 	<!-- -->

				</div>
	
		</div>




			<div class="row glossy-black-bg justify-content-center py-2 py-md-3 py-lg-4">
				<div class="col-6 text-center">

					<div class="row pb-3">
						<div class="col-12">
							<span class="fas fa-bars fa-fs"></span>
						<!-- <span class="fas fa-music fa-fs"></span> --> 
						</div>
					</div>

					<div class="row">
						<div class="col-12">
							<!-- <h1 class="animated infinite bounce delay-2s">Example</h1> -->
							<a class="h1 animated pulse special-anim black-glossy-sfonts" href="#top5">TOP 5</a>
							<!-- <a class="h2 special-font animated infinite bounce delay-2s" href="#top5">TOP 5</a> -->
						</div>
					</div>

				</div>
			</div>


		</div>









		<!-- TEMPLATE ELEMENT START -->
				<div class="row py-4 py-lg-5 notdisplay" id="top5-template">
				<div class="col-12">
				
					<div class="row mb-n3" sytle="z-index: 100;">
						<div class="col-5"></div>
						<div class="col-2 black-glossy-rank text-center">1</div>
						<div class="col-5"></div>
					</div>
	
					
					<div class="row d-flex black-glossy py-3 py-md-1_5 py-lg-2 title-margin">
						<div class="col-3">	
							<div class="circle-img-div">
								<img class="round-video-img" src="https://img.youtube.com/vi/S-sJp1FfG7Q/hqdefault.jpg"/>
							</div>
						</div>
						<div class="col-7 d-flex justify-content-center align-items-center my-n3">
							<div class="row black-glossy-title min-height-35 align-middle">
								<div class="col-12 title">
									Migos - Bad and Boujee ft Lil Uzi Vert [Official Video]
								</div>
							</div>
						</div>
					</div>
				

					<div class="row my-n4" sytle="z-index: 100;">
						<div class="col-3"></div>
						<div class="col-6 black-glossy-video-stat mt-2 mt-sm-1 mt-md-1 mt-lg-0"
					 																	state = "none"
					 																	rating = "90"
					 																	width = "0"
																						onmouseenter="videoStatEnterAnimation(this)"
																						onmouseleave="videoStatLeaveAnimation(this)">

							<div class="row" style="margin: -5px; padding: 5px;">
								<div class="col-12 text-center black-glossy-video-stat-padding video-stat-text">
									0/0
						 		</div>
								<div class="col-12 black-glossy-video-stat-padding black-glossy-video-stat-left-bar" style="width:0%; left: -3%"></div>
								<div class="col-12 black-glossy-video-stat-padding black-glossy-video-stat-right-bar" style="width:0%; left: 103%;"></div>
				
							</div>
						
						</div>
						<div class="col-3"></div>
					</div>
	

				</div>
			</div>



			<!-- TEMPLATE ELEMENT END -->





		<!-- START TOP 5 LIST -->
		<div class="container py-5">
			<div class="row">
				<div class="col-1 col-sm-0"></div>
		
				<div class="col-10 col-sm-12" id="top5">


					<!--  PLACE WHERE DYNAMICLY WILL BE ADDED RANK LIST -->
			
				</div>
				
				<div class="col-1 col-sm-0"></div>
			</div>
		</div>
		<!-- END TOP 5 LIST -->



		<div class="container-fluid">
			<div class="row glossy-black-bg text-center py-1 py-sm-2 py-md-3 py-lg-4">
				<div class="col-3"></div>
				<div class="col-6">
					<a class="h1 fet-logo-style" href="https://fet.ba">
						FET
					</a>
				</div>
				<div class="col-3"></div>
			</div>
		</div>

		<!-- MY JAVASCRIPT-->
    	<script type="text/javascript" src="communication.js"></script>
    	<script type="text/javascript" src="animation.js"></script>


	 	<!-- GOOGLE API JAVASCRIPT -->
	 	<script async defer src="https://apis.google.com/js/api.js" 
	 		<% 
	 			String firstVideoYTID = request.getParameter("firstVideoID");
	 			String secondVideoYTID = request.getParameter("secondVideoID");
	 			
	 			if(firstVideoYTID == null || secondVideoYTID == null)
	 				out.println("onload=\"this.onload=function(){};handleClientLoadNewVideoPair()\""); //handleClientLoadNewVideoPair
	 			else
	 				out.println("onload=\"this.onload=function(){};handleClientLoadOldVideoPair(\'" + firstVideoYTID + "\',\'" + secondVideoYTID + "\')\"");
	 		%>
	 		onreadystatechange="if (this.readyState === 'complete') this.onload()">
  		</script> 


	</body>
	
</html>
