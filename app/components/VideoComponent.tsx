import type { IVideo } from "@/models/video.model";

export default function VideoComponent({ video }: { video: IVideo }) {
  return (
    <article className="video-card">
      <div className="video-card__media">
        <video
          src={video.videoUrl}
          poster={video.thumbnailUrl}
          controls={video.controls ?? true}
          preload="metadata"
          playsInline
        />
      </div>
      <div className="video-card__body">
        <h2>{video.title}</h2>
        <p>{video.description}</p>
      </div>
    </article>
  );
}