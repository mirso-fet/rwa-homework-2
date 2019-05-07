package model;

public class VideoPair {

	private Video firstVideo;
	private Video secondVideo;
	
	
	
	public Video getFirstVideo() { return firstVideo; }
	public Video getSecondVideo() { return secondVideo; }
	
	
	
	public VideoPair(Video fv, Video sv)
	{
		firstVideo = fv;
		secondVideo = sv;
	}
	
}
