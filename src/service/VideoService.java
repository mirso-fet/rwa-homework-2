package service;

import javax.persistence.*;
import javax.servlet.http.HttpServletResponse;

import java.util.*;
import java.util.List;
import java.util.Random;
import model.Video;
import model.VideoPair;
import model.VideoShare;
import model.VotePair;


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
	
	
	
	
	
	
	
	
	public static VideoPair getPair(String firstVideoYTID, String secondVideoYTID)
	{
		try {
	   
			EntityManager em = PersistenceContextHandler.getEMF().createEntityManager();
		
		
			TypedQuery<Video> getVideoQuery = em.createNamedQuery("Video.getVideoByYoutubeID", Video.class);
			
			getVideoQuery.setParameter("youtubeID", firstVideoYTID);
			List<Video> videoList = getVideoQuery.getResultList();
			
			if(videoList.size() == 0)
				return null;
			
			Video firstVideo = videoList.get(0);
			
			
			getVideoQuery.setParameter("youtubeID", secondVideoYTID);
			videoList = getVideoQuery.getResultList();
			
			if(videoList.size() == 0)
				return null;
			
			Video secondVideo = videoList.get(0);
			
			
			em.close();
			
			return new VideoPair(firstVideo, secondVideo);
		
		} catch (Throwable t) {
		    System.out.println("VideoService.getNewPair()");
		    throw t;
		}
		
	}
	
	
	
	public static boolean voteForVideo(VotePair votePair)
	{
		try {
			   
			EntityManager em = PersistenceContextHandler.getEMF().createEntityManager();
		
		
			TypedQuery<Video> getVideoQuery = em.createNamedQuery("Video.getVideoByYoutubeID", Video.class);
			
			getVideoQuery.setParameter("youtubeID", votePair.likedVideoID);
			List<Video> videoList = getVideoQuery.getResultList();
			
			if(videoList.size() == 0)
				return false;
			
			Video likedVideo = videoList.get(0);
			
			
			getVideoQuery.setParameter("youtubeID", votePair.dislikedVideoID);
			videoList = getVideoQuery.getResultList();
			
			if(videoList.size() == 0)
				return false;
			
			Video dislikedVideo = videoList.get(0);
			
			likedVideo.positiveVote();
			dislikedVideo.negativeVote();
			
			em.getTransaction().begin();
			
			em.persist(likedVideo);
			em.persist(dislikedVideo);
			
			em.getTransaction().commit();
			
			
			
			em.close();
			
			return true;
		
		} catch (Throwable t) {
		    System.out.println("VideoService.voteForVideo()");
		    throw t;
		}
		
	}
	
	
	
	
	
	
	
	
	
	
	

	
	
}
