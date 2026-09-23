"use client";
import { signIn } from "next-auth/react";
import { useRouter } from "next/navigation";
import React, { useState } from "react";

function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const result = await signIn("credentials", {
      email,
      password,
      redirect: false,
    });

    if (result?.error) {
      console.log(result.error);
    } else {
      router.push("/");
    }
  };

  return React.createElement(
    "div",
    null,
    React.createElement("h1", null, "Login"),
    React.createElement(
      "form",
      { onSubmit: handleSubmit },
      React.createElement("input", {
        type: "email",
        value: email,
        onChange: (e: React.ChangeEvent<HTMLInputElement>) =>
          setEmail(e.target.value),
      }),
      React.createElement("input", {
        type: "password",
        value: password,
        onChange: (e: React.ChangeEvent<HTMLInputElement>) =>
          setPassword(e.target.value),
      }),
      React.createElement("button", { type: "submit" }, "Login")
    ),
    React.createElement(
      "div",
      null,
      "Don't have an account ?",
      React.createElement(
        "button",
        { onClick: () => router.push("/register") },
        "Register"
      )
    )
  );
}

export default LoginPage;