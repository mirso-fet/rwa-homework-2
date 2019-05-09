package servlet;

import java.io.BufferedReader;
import java.io.IOException;
import javax.servlet.*;
import javax.servlet.http.*;
import javax.servlet.annotation.WebServlet;

import com.google.gson.*;

import service.VideoService;
import model.VotePair;


@WebServlet("/VoteVideoPair")
public class VoteVideoPair extends HttpServlet {

	public VoteVideoPair() {
		super();
	}
	
	
	protected void doGet(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException 
	{
		
		StringBuffer jb = new StringBuffer();
		String line = null;
		 
		try {
			BufferedReader reader = request.getReader();
		    while ((line = reader.readLine()) != null)
		      jb.append(line);
		} 
		catch (Exception e) 
		{  
			System.out.println("Error while reading JSON");
			response.sendError(HttpServletResponse.SC_SERVICE_UNAVAILABLE);
			return;
		}
		
		
		VotePair votePair;
		
		
		try {
			votePair = new Gson().fromJson(jb.toString(), VotePair.class);
		}
		catch(Exception e)
		{
			System.out.println("Error while reading JSON");
			response.sendError(HttpServletResponse.SC_BAD_REQUEST);
			return;
		}
			

		if(votePair.likedVideoID.isEmpty() || votePair.dislikedVideoID.isEmpty())
		{
			System.out.println("Error in JSON file");
			response.sendError(HttpServletResponse.SC_BAD_REQUEST);
			return;
		}
		
		
		
		if(!VideoService.voteForVideo(votePair))
		{
			System.out.println("Error with YOUTUBE VIDEO ID");
			response.sendError(HttpServletResponse.SC_BAD_REQUEST);
			return;
		}
			
	}
	
	
	
	protected void doPost(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException 
	{
		doGet(request, response);
	}
}

