"use client";

import { useEffect, useState } from "react";
import Header from "./components/Header";
import VideoFeed from "./components/VideoFeed";
import type { IVideo } from "@/models/video.model";
import { useNotification } from "./components/Notification";

export default function Home() {
  const [videos, setVideos] = useState<IVideo[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const { showNotification } = useNotification();

  useEffect(() => {
    const loadVideos = async () => {
      try {
        const response = await fetch("/api/video", { cache: "no-store" });
        if (!response.ok) throw new Error("Unable to load the video feed");
        setVideos((await response.json()) as IVideo[]);
      } catch {
        setError("We could not load the feed. Please try again.");
        showNotification("Could not load the video feed", "error");
      } finally {
        setLoading(false);
      }
    };
    void loadVideos();
  }, [showNotification]);

  return (
    <div className="app-shell">
      <Header />
      <main className="page-wrap">
        <section className="hero-row">
          <div>
            <span className="eyebrow">THE CREATOR FEED</span>
            <h1>Small screens.<br /><em>Big energy.</em></h1>
            <p className="hero-copy">A calm corner for bold short-form video. Watch what is moving, then add something of your own.</p>
          </div>
          <div className="hero-note"><strong>{videos.length.toString().padStart(2, "0")}</strong><span>reels<br />in the room</span></div>
        </section>
        <section className="feed-section">
          <div className="section-heading"><div><span className="eyebrow">LATEST DROPS</span><h2>Made to be watched</h2></div><a className="button button--outline" href="/upload">+ Add a reel</a></div>
          {loading ? <div className="loading-grid" aria-label="Loading videos">{[1, 2, 3].map((item) => <div className="skeleton-card" key={item} />)}</div> : error ? <div className="error-state">{error}</div> : <VideoFeed videos={videos} />}
        </section>
      </main>
    </div>
  );
}
