import React, { useEffect, useState } from "react";
import { collection, getDocs, deleteDoc, doc, updateDoc } from "firebase/firestore";
import { db } from "../firebaseConfig";
import { useAuth } from "./AuthContext"; 

export default function Posts() {
  const [posts, setPosts] = useState([]);
  const { currentUser } = useAuth();

  useEffect(() => {
    const fetchPosts = async () => {
      const querySnapshot = await getDocs(collection(db, "posts"));
      const postsData = querySnapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));
      setPosts(postsData);
    };
    fetchPosts();
  }, []);

  const handleDelete = async (postId) => {
    await deleteDoc(doc(db, "posts", postId));
    setPosts(posts.filter((post) => post.id !== postId));
  };

  const handleLike = async (postId, likes) => {
    if (likes.includes(currentUser.uid)) {
      console.log("User has already liked this post.");
      return;
    }
    const postRef = doc(db, "posts", postId);
    await updateDoc(postRef, {
      likes: [...likes, currentUser.uid],
    });
    setPosts(posts.map((post) => (post.id === postId ? { ...post, likes: [...likes, currentUser.uid] } : post)));
  };

  return (
    <div className="space-y-4">
      {posts.map((post) => (
        <div key={post.id} className="bg-white p-4 rounded-lg shadow-md">
          <h3 className="text-xl font-semibold mb-2">{post.title}</h3>
          <p className="mb-4">{post.content}</p>
          <p className="text-gray-600 mb-2">Posted by: {post.username}</p>
          <p className="text-gray-600 mb-4">Likes: {post.likes.length}</p>
          <div className="flex justify-between items-center">
            <button 
              onClick={() => handleLike(post.id, post.likes)} 
              className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 transition duration-200"
            >
              Like
            </button>
            {currentUser.uid === post.userId && (
              <button 
                onClick={() => handleDelete(post.id)} 
                className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600 transition duration-200"
              >
                Delete
              </button>
            )}
          </div>
        </div>
      ))}
    </div>
  );
}
