"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import FileUpload from "./FileUpload";
import { useNotification } from "./Notification";
import type { UploadResponse } from "@imagekit/next";

function VideoUploadForm() {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [upload, setUpload] = useState<UploadResponse | null>(null);
  const [saving, setSaving] = useState(false);
  const router = useRouter();
  const { showNotification } = useNotification();

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (!upload?.url) return showNotification("Choose a video first", "warning");
    setSaving(true);
    try {
      const response = await fetch("/api/video", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ title, description, videoUrl: upload.url, thumbnailUrl: upload.url }),
      });
      const data = (await response.json()) as { error?: string };
      if (!response.ok) throw new Error(data.error || "Could not publish reel");
      showNotification("Your reel is live", "success");
      router.push("/");
    } catch (error) {
      showNotification(error instanceof Error ? error.message : "Could not publish reel", "error");
    } finally {
      setSaving(false);
    }
  };

  return (
    <form className="upload-form" onSubmit={handleSubmit}>
      <div className="field-group"><label htmlFor="title">Title</label><input id="title" required value={title} onChange={(event) => setTitle(event.target.value)} placeholder="Give your reel a name" /></div>
      <div className="field-group"><label htmlFor="description">Description</label><textarea id="description" required value={description} onChange={(event) => setDescription(event.target.value)} placeholder="What should people notice?" rows={4} /></div>
      <div className="field-group"><label>Video file</label><div className="upload-dropzone"><FileUpload fileType="video" onSuccess={setUpload} />{upload?.name && <span className="upload-ready">Ready: {upload.name}</span>}</div></div>
      <button className="button button--dark button--full" disabled={saving || !upload?.url} type="submit">{saving ? "Publishing..." : "Publish reel"}</button>
    </form>
  );
}

export default VideoUploadForm;