import { collection, getDocs } from "firebase/firestore";
import React, { useEffect, useState } from "react";
import { db } from "../firebaseConfig";
import ThumbUpIcon from "@mui/icons-material/ThumbUp";

function AllBlogs() {
  const [blogs, setBlogs] = useState([]);

  useEffect(() => {
    const getAllBlogs = async () => {
      const querySnapshot = await getDocs(collection(db, "blogs"));
      const allBlogs = querySnapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));
      setBlogs(allBlogs);
    };
    getAllBlogs();
  }, []);

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 p-4">
      {blogs.map((blog) => (
        <div key={blog.id} className="bg-white shadow-lg rounded-lg p-4">
          <h3 className="text-xl font-bold mb-2">{blog.heading}</h3>
          <p className="text-gray-700">{blog.content}</p>
          <div className="flex items-center gap-x-2">
            <button>
              <ThumbUpIcon color="primary" />
            </button>
            <p className="text-gray-700 text-xl font-bold">{blog.likes}</p>
          </div>
        </div>
      ))}
    </div>
  );
}

export default AllBlogs;
