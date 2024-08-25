"use client";
import { useState, useCallback } from "react";
import { signIn } from "next-auth/react";
import { useRouter } from "next/navigation";

export default function AuthPage() {
  const [isRegister, setIsRegister] = useState(false);
  const [formData, setFormData] = useState({ email: "", password: "", username: "" });
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const toggleAuthMode = useCallback(() => {
    setIsRegister((prevMode) => !prevMode);
  }, []);

  const handleInputChange = useCallback((e) => {
    setFormData((prevData) => ({
      ...prevData,
      [e.target.id]: e.target.value,
    }));
  }, []);

  const handleSubmit = useCallback(
    async (e) => {
      e.preventDefault();
      setLoading(true);

      try {
        if (isRegister) {
          const res = await fetch("/api/auth/register", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(formData),
          });

          const data = await res.json();
          setLoading(false);

          if (res.ok) {
            alert("Registration successful!");
            setIsRegister(false);
          } else {
            alert(data.message || "Registration failed.");
          }
        } else {
          const res = await signIn("credentials", {
            redirect: false,
            email: formData.email,
            password: formData.password,
          });

          setLoading(false);

          if (res?.error) {
            alert(res.error);
          } else {
            router.push("/");
          }
        }
      } catch (error) {
        setLoading(false);
        alert("Something went wrong. Please try again.");
      }
    },
    [isRegister, formData, router]
  );

  const handleGoogleSignIn = useCallback(() => {
    signIn("google", { callbackUrl: "/", prompt: "select_account" });
  }, []);

  return (
    <div className="min-h-screen flex flex-col justify-center items-center bg-background text-text">
      <h1 className="text-5xl font-extrabold mb-6">{isRegister ? "Register" : "Login"}</h1>
      <form onSubmit={handleSubmit} className="bg-background-light p-8 rounded-lg shadow-lg w-full max-w-md">
        {isRegister && (
          <div className="mb-4">
            <label htmlFor="username" className="block text-text-muted mb-2">
              Username
            </label>
            <input
              type="text"
              id="username"
              value={formData.username}
              onChange={handleInputChange}
              className="w-full px-4 py-2 bg-background text-text border border-background-dark rounded-md focus:outline-none focus:ring-2 focus:ring-primary-light"
              required
            />
          </div>
        )}
        <div className="mb-4">
          <label htmlFor="email" className="block text-text-muted mb-2">
            Email
          </label>
          <input
            type="email"
            id="email"
            value={formData.email}
            onChange={handleInputChange}
            className="w-full px-4 py-2 bg-background text-text border border-background-dark rounded-md focus:outline-none focus:ring-2 focus:ring-primary-light"
            required
          />
        </div>
        <div className="mb-6">
          <label htmlFor="password" className="block text-text-muted mb-2">
            Password
          </label>
          <input
            type="password"
            id="password"
            value={formData.password}
            onChange={handleInputChange}
            className="w-full px-4 py-2 bg-background text-text border border-background-dark rounded-md focus:outline-none focus:ring-2 focus:ring-primary-light"
            required
          />
        </div>
        <button
          type="submit"
          className="w-full bg-primary text-white py-3 rounded-md hover:bg-primary-dark transition-transform duration-300 ease-in-out transform hover:scale-105 shadow-lg focus:outline-none focus:ring-2 focus:ring-primary-light"
          disabled={loading}
        >
          {loading ? "Processing..." : isRegister ? "Register" : "Login"}
        </button>
        {!isRegister && (
          <button
            type="button"
            onClick={handleGoogleSignIn}
            className="w-full mt-4 bg-red-500 text-white py-3 rounded-md hover:bg-red-600 transition-transform duration-300 ease-in-out transform hover:scale-105 shadow-lg focus:outline-none focus:ring-2 focus:ring-red-400"
            disabled={loading}
          >
            Sign in with Google
          </button>
        )}
        <p
          className="text-center text-text-muted mt-6 cursor-pointer hover:text-primary-light"
          onClick={toggleAuthMode}
        >
          {isRegister ? "Already have an account? Login" : "Don't have an account? Register"}
        </p>
      </form>
    </div>
  );
}
