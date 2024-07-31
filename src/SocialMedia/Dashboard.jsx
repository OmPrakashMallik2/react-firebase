import React from "react";
import CreatePost from "./CreatePost";
import Posts from "./Posts";
import { useAuth } from "./AuthContext";
import { useNavigate } from "react-router-dom";

export default function Dashboard() {
  const { logout } = useAuth();
  const navigate = useNavigate();

  async function handleLogout() {
    try {
      await logout();
      navigate("/login");
    } catch {
      console.log("Failed to log out");
    }
  }

  return (
    <div className="max-w-4xl mx-auto p-4 bg-white rounded-lg shadow-md mt-8">
      <div>{useAuth.name}</div>
      <div className="flex justify-end mb-4">
        <button
          onClick={handleLogout}
          className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600 transition duration-200"
        >
          Log Out
        </button>
      </div>
      <CreatePost />
      <Posts />
    </div>
  );
}
