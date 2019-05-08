package servlet;

import java.io.IOException;
import javax.servlet.*;
import javax.servlet.http.*;
import javax.servlet.annotation.WebServlet;

import com.google.gson.Gson;
import service.VideoService;
import model.VideoPair;

@WebServlet("/GetVideoPair")
public class GetVideoPair extends HttpServlet {

	public GetVideoPair() {
		super();
	}
	
	
	
	protected void doGet(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException 
	{
		String firstVideoYTID = request.getParameter("firstVideoID");
		String secondVideoYTID = request.getParameter("secondVideoID");
		
		if(firstVideoYTID == null || secondVideoYTID == null)
		{
			response.sendError(HttpServletResponse.SC_BAD_REQUEST);
			return;
		}
		
		VideoPair videoPair = VideoService.getPair(firstVideoYTID, secondVideoYTID);
		
		response.setContentType("application/json");
		response.setCharacterEncoding("UTF-8");
		if(videoPair != null)
			response.getWriter().write(new Gson().toJson(VideoService.getNewPair()));
		else
			response.getWriter().write(new Gson().toJson("Invalid videos IDs"));
			
	}
	
	
	
	protected void doPost(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException 
	{
		doGet(request, response);
	}


}
