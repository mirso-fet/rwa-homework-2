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
				query = "SELECT v FROM Video v"),
	
	@NamedQuery(name = "Video.getAllByRank",
				query = "SELECT v FROM Video v ORDER BY v.videoScore DESC")
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
	
	@Column(name = "VIDEO_SCORE", nullable = false)
	private Double videoScore;
	
	
	
	
	
	public void positiveVote() {
		++videoLikes;
		updateVideoScore();
	}
		
	public void negativeVote() {
		++videoDislikes;
		updateVideoScore();
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
		updateVideoScore();
	}
	
	
	public Video(String youtubeID) {
		videoYoutubeID = youtubeID;
		videoLikes = 0l;
		videoDislikes = 0l;
	}
	
	
	private void updateVideoScore() {
		Double pos = videoLikes.doubleValue();
		Double neg = videoDislikes.doubleValue();
		Double tot = pos + neg;
		
		videoScore = ((pos + 1.9208) / tot - 1.96 * Math.sqrt(((pos * neg) / tot +  0.9604) / tot / tot))/(1 + 3.8416 / tot);
	}
	
}
