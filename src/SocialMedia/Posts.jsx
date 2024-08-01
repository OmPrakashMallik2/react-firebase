import React, { useEffect, useState } from "react";
import {
  collection,
  getDocs,
  deleteDoc,
  doc,
  updateDoc,
} from "firebase/firestore";
import { db } from "../firebaseConfig";
import { useAuth } from "./AuthContext";
import { Avatar } from "@mui/material";
import ThumbUpIcon from "@mui/icons-material/ThumbUp";
import DeleteIcon from "@mui/icons-material/Delete";
import { red } from "@mui/material/colors";

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
    setPosts(
      posts.map((post) =>
        post.id === postId
          ? { ...post, likes: [...likes, currentUser.uid] }
          : post
      )
    );
  };

  return (
    <div className="grid grid-cols-2 gap-2 p-3 bg-blue-100 rounded">
      {posts.map((post) => (
        <div key={post.id} className="bg-white p-3 rounded-lg shadow-md">
          <div className="flex gap-1 items-center p-1 rounded">
            <Avatar />
            <p className="text-lg font-semibold text-gray-600 mb-2">
              {post.username}
            </p>
          </div>

          <div className="bg-neutral-100 p-2 rounded-sm">
            <h3 className="text-lg font-semibold">{post.title}</h3>
            <p className="">{post.content}</p>
          </div>

          <div className="flex justify-between items-center p-2">
            <div className="flex gap-1">
              <button onClick={() => handleLike(post.id, post.likes)}>
                <ThumbUpIcon color="primary" />
              </button>
              <p className="text-xl font-bold">{post.likes.length}</p>
            </div>
            {currentUser.uid === post.userId && (
              <button onClick={() => handleDelete(post.id)}>
                <DeleteIcon sx={{ color: red[400] }} />
              </button>
            )}
          </div>
        </div>
      ))}
    </div>
  );
}
