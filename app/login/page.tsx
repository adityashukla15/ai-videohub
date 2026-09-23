"use client";
import { signIn } from "next-auth/react";
import { useRouter } from "next/navigation";
import React, { useState } from "react";
import Link from "next/link";
import { useNotification } from "../components/Notification";

function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const router = useRouter();
  const { showNotification } = useNotification();
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    setLoading(true);
    const result = await signIn("credentials", {
      email,
      password,
      redirect: false,
    });

    setLoading(false);
    if (result?.error) {
      showNotification("Email or password is incorrect", "error");
    } else {
      router.push("/");
    }
  };

  return <div className="auth-shell"><div className="auth-panel"><Link className="brand" href="/"><span className="brand-mark">R</span> Reelspace</Link><span className="eyebrow">WELCOME BACK</span><h1>Pick up where<br /><em>you left off.</em></h1><form className="auth-form" onSubmit={handleSubmit}><div className="field-group"><label htmlFor="email">Email</label><input id="email" required type="email" value={email} onChange={(event) => setEmail(event.target.value)} /></div><div className="field-group"><label htmlFor="password">Password</label><input id="password" required type="password" value={password} onChange={(event) => setPassword(event.target.value)} /></div><button className="button button--dark button--full" disabled={loading} type="submit">{loading ? "Signing in..." : "Sign in"}</button></form><p className="auth-switch">New here? <Link href="/register">Create an account</Link></p></div></div>;
}

export default LoginPage;