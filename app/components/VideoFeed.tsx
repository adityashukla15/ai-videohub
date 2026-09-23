import type { IVideo } from "@/models/video.model";
import VideoComponent from "./VideoComponent";

interface VideoFeedProps {
  videos: IVideo[];
}

export default function VideoFeed({ videos }: VideoFeedProps) {
  return (
    <div className="video-grid">
      {videos.map((video) => (
        <VideoComponent key={video._id?.toString()} video={video} />
      ))}

      {videos.length === 0 && (
        <div className="empty-state">
          <span className="empty-state__eyebrow">Nothing here yet</span>
          <p>Your next great idea can be the first reel in the room.</p>
          <a className="button button--dark" href="/upload">Upload a reel</a>
        </div>
      )}
    </div>
  );
}