package service;

import javax.persistence.*;
import java.util.*;
import java.util.List;
import java.util.Random;
import model.Video;
import model.VideoPair;
import model.VideoShare;


public class VideoService {
	
	
	private static Random random = new Random();
	
	
	
	
	
	
	
	public static VideoPair getNewPair()
	{
		try {
	   
			EntityManager em = PersistenceContextHandler.getEMF().createEntityManager();
		
			TypedQuery<Long> videoCountQuery = em.createNamedQuery("Video.getVideoCount", Long.class);
			Long videoCount = videoCountQuery.getSingleResult();
		
		
			//LOG
			System.out.println("Video count: " + videoCount);
		
		
			int firstVideoHash = random.nextInt(Math.toIntExact(videoCount));
			int secondVideoHash;
		
			while((secondVideoHash = random.nextInt(Math.toIntExact(videoCount))) == firstVideoHash);
		
		
			//LOG
			System.out.println("First video hash: " + firstVideoHash);
			System.out.println("Second video hash: " + secondVideoHash);
		
		
			TypedQuery<Video> getRandomVideoQuery = em.createNamedQuery("Video.getAll", Video.class);
			getRandomVideoQuery.setMaxResults(1);
		  
			getRandomVideoQuery.setFirstResult(firstVideoHash);
			Video firstVideo = getRandomVideoQuery.getSingleResult();
		
		
		
			getRandomVideoQuery.setFirstResult(secondVideoHash);
			Video secondVideo = getRandomVideoQuery.getSingleResult();
		
			em.close();
			
			return new VideoPair(firstVideo, secondVideo);
		
		} catch (Throwable t) {
		    System.out.println("VideoService.getNewPair()");
		    throw t;
		}
		
	}
	
	
	
	
	public static VideoShare getVideoShare(String videoShareID)
	{
		try {
			
			System.out.println("VideoShareID: " + videoShareID);
			   
			EntityManager em = PersistenceContextHandler.getEMF().createEntityManager();
		
			TypedQuery<VideoShare> getVideoShareQuery = em.createNamedQuery("VideoShare.getVideoByHashID", VideoShare.class);
			getVideoShareQuery.setParameter("videoHashID", videoShareID);
			List<VideoShare> videoShareList = getVideoShareQuery.getResultList();
			
			if(videoShareList.size() == 0)
				return null;
			else
				return videoShareList.get(0);
			
		} catch (Throwable t) {
			System.out.println("VideoService.getVideoShare()");
			throw t;
		}
	}
	
	
	
	
	
	
	
	
	
	
	
	
	
	

	
	
}
