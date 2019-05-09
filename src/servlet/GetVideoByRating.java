package servlet;

import java.io.IOException;
import java.util.List;

import javax.servlet.*;
import javax.servlet.http.*;
import javax.servlet.annotation.WebServlet;

import com.google.gson.Gson;
import service.VideoService;
import model.VideoPair;
import model.Video;

@WebServlet("/GetVideoByRating")
public class GetVideoByRating extends HttpServlet {

	public GetVideoByRating() {
		super();
	}
	
	
	
	protected void doGet(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException 
	{
		String startPosString = request.getParameter("startPosition");
		String maxVideoCountString = request.getParameter("maxVideoCount");
		
		Integer startPos;
		Integer maxVideoCount;
		
		if(startPosString == null || maxVideoCountString == null)
		{
			System.out.println("Invalid parametars");
			response.sendError(HttpServletResponse.SC_BAD_REQUEST);
			return;
		}
		
		
		try {
			startPos = Integer.parseInt(startPosString);
			maxVideoCount = Integer.parseInt(maxVideoCountString);
		}
		catch(Exception e)
		{
			System.out.println("Invalid parametars value, not integers");
			response.sendError(HttpServletResponse.SC_BAD_REQUEST);
			return;
		}
		
		if(startPos < 0 || maxVideoCount <= 0)
		{
			System.out.println("Invalid parametars value, need to be >= 0 and > 0");
			response.sendError(HttpServletResponse.SC_BAD_REQUEST);
			return;
		}
		
		if(maxVideoCount > 20)
			maxVideoCount = 20;
		
		
		List<Video> videoList = VideoService.getVideoByRanking(startPos, maxVideoCount);
		
		response.setContentType("application/json");
		response.setCharacterEncoding("UTF-8");
		if(videoList != null)
			response.getWriter().write(new Gson().toJson(videoList));
		else
			response.getWriter().write(new Gson().toJson("Error in DB communication"));
			
	}
	
	
	
	protected void doPost(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException 
	{
		doGet(request, response);
	}


}
