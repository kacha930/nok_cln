import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function Login() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  const handleLogin = (e) => {
    e.preventDefault();

    if (
      (username === "admin" && password === "1234") ||
      (username === "nokia" && password === "wifi123")
    ) {
      localStorage.setItem("nokiaUser", JSON.stringify({ username }));
      localStorage.setItem("isLoggedIn", "true");

      // Show animation
      setIsLoading(true);

      // After 4 seconds, navigate to home
      setTimeout(() => {
        navigate("/home");
      }, 4000);
    } else {
      setError("Invalid username or password");
    }
  };

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-white">
        <div className="flex flex-col items-center">
          {/* Animated blue circle */}
          <div className="relative w-24 h-24">
            <div className="absolute inset-0 rounded-full border-4 border-blue-400 opacity-40 animate-ping"></div>
            <div className="absolute inset-2 rounded-full border-4 border-blue-500 animate-spin border-t-transparent"></div>
            <div className="absolute inset-4 bg-blue-500 rounded-full"></div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 to-white p-6">
      <div className="w-full max-w-md mobile-card">
        <div className="flex flex-col items-center mb-6">
          <div className="h-10 w-24 bg-gray-100 rounded flex items-center justify-center text-sm text-gray-600">
            NOKIA
          </div>
          <h1 className="text-2xl font-semibold mt-4 text-nokia-blue">
            Nokia WiFi
          </h1>
          <p className="text-sm text-gray-500 mt-1">
            Sign in with the credentials on your Gateway
          </p>
        </div>

        {error && (
          <div className="bg-red-50 text-red-600 border border-red-100 rounded p-2 mb-4 text-sm">
            {error}
          </div>
        )}

        <form onSubmit={handleLogin} className="space-y-4">
          <input
            className="w-full border rounded px-3 py-2"
            placeholder="Username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            required
          />
          <input
            className="w-full border rounded px-3 py-2"
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
          <button className="w-full bg-blue-600 text-white py-2 rounded font-medium">
            Log in
          </button>
        </form>

        <div className="mt-4 text-center text-xs text-gray-400">
          Demo credentials: <strong>admin / 1234</strong>
        </div>
      </div>
    </div>
  );
}
