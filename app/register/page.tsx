"use client";
import { useRouter } from "next/navigation";
import React, { useState } from "react";
import Link from "next/link";
import { useNotification } from "../components/Notification";

function RegisterPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const router = useRouter();
  const { showNotification } = useNotification();
  const [loading, setLoading] = useState(false);

  const handleSumit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (password !== confirmPassword) {
      showNotification("Passwords do not match", "warning");
      return;
    }

    try {
      setLoading(true);
      // react-query
      // loading, error, debounce
      const res = await fetch("/api/auth/register", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email,
          password,
        }),
      });
      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.error || "Registration failed");
      }

      showNotification(data.message || "Account created", "success");
      router.push("/login");
    } catch (error) {
      showNotification(error instanceof Error ? error.message : "Registration failed", "error");
    } finally {
      setLoading(false);
    }
  };

  return <div className="auth-shell"><div className="auth-panel"><Link className="brand" href="/"><span className="brand-mark">R</span> Reelspace</Link><span className="eyebrow">JOIN THE ROOM</span><h1>Make a little<br /><em>noise.</em></h1><form className="auth-form" onSubmit={handleSumit}><div className="field-group"><label htmlFor="email">Email</label><input id="email" required type="email" placeholder="you@example.com" value={email} onChange={(event) => setEmail(event.target.value)} /></div><div className="field-group"><label htmlFor="password">Password</label><input id="password" required minLength={8} type="password" placeholder="At least 8 characters" value={password} onChange={(event) => setPassword(event.target.value)} /></div><div className="field-group"><label htmlFor="confirmPassword">Confirm password</label><input id="confirmPassword" required type="password" value={confirmPassword} onChange={(event) => setConfirmPassword(event.target.value)} /></div><button className="button button--dark button--full" disabled={loading} type="submit">{loading ? "Creating..." : "Create account"}</button></form><p className="auth-switch">Already have an account? <Link href="/login">Sign in</Link></p></div></div>;
}

export default RegisterPage;