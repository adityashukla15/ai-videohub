"use client";

import VideoUploadForm from "../components/VideoUploadForm";
import Header from "../components/Header";

export default function VideoUploadPage() {
  return (
    <div className="app-shell"><Header />
      <div className="page-wrap upload-page">
        <span className="eyebrow">PUBLISH SOMETHING</span>
        <h1>Put it in motion.</h1>
        <p className="hero-copy">Share a vertical video with the room. Keep it clear, keep it yours.</p>
        <VideoUploadForm />
      </div>
    </div>
  );
}