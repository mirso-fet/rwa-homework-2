package model;

import javax.persistence.*;
import java.math.BigInteger; 
import java.security.MessageDigest; 
import java.security.NoSuchAlgorithmException;
import java.util.Random; 


@Entity(name = "VideoShare")
@Table(name = "VIDEO_SHARE")
@NamedQueries({
	@NamedQuery(name = "VideoShare.getVideoByHashID",
				query = "SELECT vs FROM VideoShare vs " + 
						"JOIN vs.firstVideo fv " +
						"JOIN vs.secondVideo sv " +
						"WHERE vs.hashID = :videoHashID"),
	
	@NamedQuery(name = "VideoShare.getAll",
				query = "SELECT vs FROM VideoShare vs")
	
})
public class VideoShare {
	
	private static Random random = new Random();
	
	@Id
	@GeneratedValue
	@Column(name = "VIDEO_SHARE_DATABASE_ID")
	private Long videoShareDatabaseID;
	
	
	@ManyToOne(cascade = CascadeType.PERSIST, fetch = FetchType.LAZY)
	@JoinColumn(name = "VIDEO_SHARE_FIRST_VIDEO_ID", referencedColumnName = "VIDEO_DATABASE_ID",  nullable = false)
	private Video firstVideo;
	
	
	@ManyToOne(cascade = CascadeType.PERSIST, fetch = FetchType.LAZY)
	@JoinColumn(name = "VIDEO_SHARE_SECOND_VIDEO_ID", referencedColumnName = "VIDEO_DATABASE_ID",  nullable = false)
	private Video secondVideo;
	
	
	@Column(name = "USER_SELECTION")
	private Boolean userSelection;
	
	
	@Column(name = "HASH_ID",  nullable = false, unique = true)
	private String hashID;
	
	
	@Column(name = "USER_MESSAGE", nullable = false)
	private String userMessage;
	
	
	
	
	
	public void setVideoSelection(Boolean sel) {
		userSelection = sel;
	}
	
	public Video getFirstVideo() {
		return firstVideo;
	}
	
	public Video getSecondVideo() {
		return secondVideo;
	}
	
	public String getFirstVideoYoutubeID() {
		return firstVideo.getYoutubeID();
	}
	
	public String getSecondVideoYoutubeID() {
		return secondVideo.getYoutubeID();
	}
	
	public String getHash() {
		return hashID;
	}
	
	public String getUserMessage() {
		return userMessage;
	}
	
	@Override
	public String toString() {
		return firstVideo.getYoutubeID() + " " + secondVideo.getYoutubeID();
	}
	
	
	
	
	
	public VideoShare() {
		// provided because of the need of 'JPA'
	}
	
	
	public VideoShare(Video frstVideo, Video secVideo, String uMsg) {
		firstVideo = frstVideo;
		secondVideo = secVideo;
		
		hashID = firstVideo.getYoutubeID() + getSHA(random.nextLong() + "MirsoRWA") + secondVideo.getYoutubeID() + random.nextLong();
		
		// LOG
		System.out.println("hashID: " + hashID);
		
		userMessage = uMsg;
	}
	
	
	
	// maybe be used
	public static String getSHA(String input) { 
	  
		try { 
			// Static getInstance method is called with hashing SHA 
			MessageDigest md = MessageDigest.getInstance("SHA-256"); 
	  
	        // digest() method called 
	        // to calculate message digest of an input 
	        // and return array of byte 
	        byte[] messageDigest = md.digest(input.getBytes()); 
	  
	        // Convert byte array into signum representation 
	        BigInteger no = new BigInteger(1, messageDigest); 
	  
	        // Convert message digest into hex value 
	        String hashtext = no.toString(16); 
	  
	        while (hashtext.length() < 32) { 
	        	hashtext = "0" + hashtext; 
	        } 
	  
	        return hashtext; 
	    } // For specifying wrong message digest algorithms 
	    catch (NoSuchAlgorithmException e) { 
	    	
	    	System.out.println("Exception thrown" + " for incorrect algorithm: " + e); 
	  
	        return null; 
	    } 
	} 
	
}
