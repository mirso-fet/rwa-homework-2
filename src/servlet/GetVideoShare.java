package servlet;

import java.io.IOException;
import javax.servlet.*;
import javax.servlet.http.*;
import javax.servlet.annotation.WebServlet;

import com.google.gson.Gson;
import service.VideoService;
import model.VideoShare;

@WebServlet("/GetVideoShare")
public class GetVideoShare extends HttpServlet {

	public GetVideoShare() {
		super();
	}
	
	
	
	protected void doGet(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException 
	{
		String videoShareID = request.getParameter("videoShareID");
		
		if(videoShareID == null)
		{
			response.sendError(HttpServletResponse.SC_BAD_REQUEST);
			return;
		}
		
		VideoShare videoShare = VideoService.getVideoShare(videoShareID);
		/*
		if(videoShare == null)
		{
			response.sendError(HttpServletResponse.SC_BAD_REQUEST);
			return;
		}
		*/
		response.setContentType("application/json");
		response.setCharacterEncoding("UTF-8");
		if(videoShare != null)
			response.getWriter().write(new Gson().toJson(videoShare));
		else
			response.getWriter().write(new Gson().toJson("Invalid videoShareID"));
	
	}
	
	
	
	protected void doPost(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException 
	{
		doGet(request, response);
	}


}
