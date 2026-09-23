"use client";
import { useRouter } from "next/navigation";
import React, { useState } from "react";

function RegisterPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const router = useRouter();

  const handleSumit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (password !== confirmPassword) {
      alert("passwords do not match");
      return;
    }

    try {
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

      console.log(data);
      router.push("/login");
    } catch (error) {
      console.error(error);
    }
  };

  return React.createElement(
    "div",
    null,
    React.createElement("h1", null, "Register"),
    React.createElement(
      "form",
      { onSubmit: handleSumit },
      React.createElement("input", {
        type: "email",
        placeholder: "Email",
        value: email,
        onChange: (e: React.ChangeEvent<HTMLInputElement>) =>
          setEmail(e.target.value),
      }),
      React.createElement("input", {
        type: "password",
        placeholder: "Password",
        value: password,
        onChange: (e: React.ChangeEvent<HTMLInputElement>) =>
          setPassword(e.target.value),
      }),
      React.createElement("input", {
        type: "password",
        placeholder: "Confirm Password",
        value: confirmPassword,
        onChange: (e: React.ChangeEvent<HTMLInputElement>) =>
          setConfirmPassword(e.target.value),
      }),
      React.createElement("button", { type: "submit" }, "Register")
    ),
    React.createElement(
      "div",
      null,
      React.createElement(
        "p",
        null,
        "Already have an account? ",
        React.createElement("a", { href: "/login" }, "Login")
      )
    )
  );
}

export default RegisterPage;