import React, { useRef, useState } from "react";
import { useAuth } from "./AuthContext";

export default function Signup() {
  const emailRef = useRef();
  const passwordRef = useRef();
  const { signup } = useAuth();
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  async function handleSubmit(e) {
    e.preventDefault();
    try {
      setError("");
      setLoading(true);
      await signup(emailRef.current.value, passwordRef.current.value);
    } catch (error) {
      if (error.code === "auth/email-already-in-use") {
        setError("This email is already associated with an account.");
      } else {
        setError("Failed to create an account. Please try again.");
      }
      console.error("Signup error:", error);
    }

    setLoading(false);
  }

  return (
    <div className="bg-white p-6 rounded-lg shadow-md max-w-md mx-auto mt-8">
      <h2 className="text-2xl font-semibold mb-4">Sign Up</h2>
      {error && <p className="text-red-500">{error}</p>}
      <form onSubmit={handleSubmit} className="space-y-4">
        <input
          type="email"
          ref={emailRef}
          required
          placeholder="Email"
          className="w-full p-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
        <input
          type="password"
          ref={passwordRef}
          required
          placeholder="Password"
          className="w-full p-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
        <button
          disabled={loading}
          type="submit"
          className="w-full bg-blue-500 text-white py-2 rounded hover:bg-blue-600 transition duration-200 disabled:opacity-50"
        >
          Sign Up
        </button>
      </form>
    </div>
  );
}
