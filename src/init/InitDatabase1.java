package init;

import java.util.Random;

import javax.persistence.*;
import model.Video;
import model.VideoShare;

public class InitDatabase1 {
	
	private static final String PERSISTENCE_UNIT_NAME = "SQL_project";
	private static final Long MAX_VIDEO_VOTES = 10000l;
	private static EntityManagerFactory emf;
	private static Random random = new Random();

	private static String videoIDs[] = { "S-sJp1FfG7Q", "Hm1YFszJWbQ", "gGSH_0o-D7g",
										 "2CGv2Ud-KoE", "82NBsCOQoi4", "hLWGlq_2qbk",
										 "7_tWN9Iei7Y", "YFD2PPAqNbw", "5-MT5zeY6CU",
										 "k_UOuSklNL4", "quxTnEEETbo", "3X9LvC9WkkQ",
										 "NF65d49Vqeg", "1W5BA0lDVLM", "cedoBlUvBlI",
										 "papuvlVeZg8", "o1tj2zJ2Wvg", "7kUNjyjEwJY"};
	
	
	public static void main(String[] args) 
	{
		emf = Persistence.createEntityManagerFactory(PERSISTENCE_UNIT_NAME);
		EntityManager em = emf.createEntityManager();

		
		
		// Add videos to the database
		
		em.getTransaction().begin();
		
		for(String videoID : videoIDs)
		{
			em.persist(new Video(videoID, 
					 			 random.nextLong() % MAX_VIDEO_VOTES, 
					 			 random.nextLong() % MAX_VIDEO_VOTES));
		}
		
		
		em.getTransaction().commit();
		
		
		
		
		
		
		
		em.getTransaction().begin();

		int firstVideoHash, secondVideoHash;
		Video firstVideo, secondVideo;
		
		TypedQuery<Long> videoCountQuery = em.createNamedQuery("Video.getVideoCount", Long.class);
		Long videoCount = videoCountQuery.getSingleResult();
		
		TypedQuery<Video> getRandomVideoQuery = em.createNamedQuery("Video.getAll", Video.class);
		getRandomVideoQuery.setMaxResults(1);
	  
		
		for(int i = 0; i < 20; ++i)
		{
			firstVideoHash = random.nextInt(Math.toIntExact(videoCount));
			while((secondVideoHash = random.nextInt(Math.toIntExact(videoCount))) == firstVideoHash);
		
			
			getRandomVideoQuery.setFirstResult(firstVideoHash);
			firstVideo = getRandomVideoQuery.getSingleResult();
			
			getRandomVideoQuery.setFirstResult(secondVideoHash);
			secondVideo = getRandomVideoQuery.getSingleResult();
			
			em.persist(new VideoShare(firstVideo, secondVideo, "Hellou Msg!"));
		}
		
		
		em.getTransaction().commit();
		
		
		
		
		
		em.close();
		emf.close();
	}

}
