package model;

import javax.persistence.*;

@Entity(name = "Video")
@Table(name = "VIDEO")
@NamedQueries({
	@NamedQuery(name = "Video.getVideoByYoutubeID",
				query = "SELECT v FROM Video v WHERE v.videoYoutubeID = :youtubeID"),
	
	@NamedQuery(name = "Video.getVideoCount",
				query = "SELECT COUNT(v) FROM Video v"),
	
	@NamedQuery(name = "Video.getAll",
				query = "SELECT v FROM Video v")
})
public class Video {

	@Id
	@GeneratedValue
	@Column(name = "VIDEO_DATABASE_ID")
	private Long videoDatabaseID;

	
	@Column(name = "VIDEO_YOUTUBE_ID", nullable = false, unique = true)
	private String videoYoutubeID;

	
	@Column(name = "VIDEO_LIKES", nullable = false)
	private Long videoLikes;
	
	
	@Column(name = "VIDEO_DISLIKES", nullable = false)
	private Long videoDislikes;
	
	
	
	
	
	public void positiveVote() {
		++videoLikes;
	}
		
	public void negativeVote() {
		++videoDislikes;
	}

	public String getYoutubeID() {
		return videoYoutubeID;
	}
	
	
	
	
	public Video() {
		// provided because of the need of 'JPA'
	}
	
	public Video(String youtubeID, Long posVote, Long negVote) {
		videoYoutubeID = youtubeID;
		videoLikes = posVote < 0 ? 0 : posVote;
		videoDislikes = negVote < 0 ? 0 : negVote;
	}
	
	
	public Video(String youtubeID) {
		videoYoutubeID = youtubeID;
		videoLikes = 0l;
		videoDislikes = 0l;
	}
	
	
}
